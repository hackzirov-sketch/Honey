// =============================================================================
// Honey — Socket.IO Calls / Meetings Handler
// =============================================================================
// WebRTC signaling, meeting state management, host actions, meeting chat,
// and participant lifecycle (join/leave/kick/promote/mute).
// =============================================================================

import { redis, key } from '../../config/redis';
import { prisma } from '../../config/prisma';
import { SocketError, ErrorCode } from '../../errors';
import { logger } from '../../utils/logger';
import type {
  HoneySocket,
  HoneyIOServer,
  MeetingJoinData,
  MeetingLeaveData,
  WebRTCRelayData,
  IceCandidateData,
  MeetingToggleData,
  MeetingCameraData,
  MeetingScreenShareData,
  MeetingHandData,
  MeetingChatSendData,
  MeetingHostActionData,
  MeetingParticipantPayload,
} from '../types';

// ---- Constants --------------------------------------------------------------

const MEETING_ROOM_PREFIX = 'meeting:';
const MAX_MEETING_CHAT_LENGTH = 500;
const SIGNALING_RATE_LIMIT_MAX = 60; // signals per 10 seconds
const SIGNALING_RATE_LIMIT_WINDOW_MS = 10_000;

// ---- Helpers ----------------------------------------------------------------

function meetingRoom(meetingId: string): string {
  return `${MEETING_ROOM_PREFIX}${meetingId}`;
}

/**
 * Look up the socket.id of a specific user within a meeting room.
 * Used to relay WebRTC signals to the correct socket.
 */
async function findUserSocketInRoom(
  io: HoneyIOServer,
  meetingId: string,
  targetUserId: string,
): Promise<string | null> {
  const roomName = meetingRoom(meetingId);
  const sockets = await io.in(roomName).fetchSockets();

  for (const s of sockets) {
    const data = s.data as { userId?: string };
    if (data.userId === targetUserId) {
      return s.id;
    }
  }

  return null;
}

/**
 * Get the list of participants currently in the meeting room,
 * excluding a specific user (used for peer discovery on join).
 */
async function getPeersInRoom(
  io: HoneyIOServer,
  meetingId: string,
  excludeUserId: string,
): Promise<MeetingParticipantPayload[]> {
  const roomName = meetingRoom(meetingId);
  const sockets = await io.in(roomName).fetchSockets();
  const peers: MeetingParticipantPayload[] = [];

  for (const s of sockets) {
    const data = s.data as { userId?: string; username?: string };
    if (data.userId && data.userId !== excludeUserId) {
      const user = await prisma.user.findUnique({
        where: { id: data.userId },
        select: { username: true, avatarUrl: true },
      });
      if (user) {
        // Look up role from DB
        const participant = await prisma.meetingParticipant.findUnique({
          where: {
            roomId_userId: { roomId: meetingId, userId: data.userId },
          },
          select: { role: true },
        });

        peers.push({
          userId: data.userId,
          username: user.username,
          avatarUrl: user.avatarUrl,
          role: participant?.role ?? 'PARTICIPANT',
        });
      }
    }
  }

  return peers;
}

/**
 * Verify that both the sender and target user are participants in the meeting.
 * Returns the sender's participant record or throws.
 */
async function verifyBothInMeeting(
  meetingId: string,
  senderUserId: string,
  targetUserId: string,
): Promise<void> {
  const [senderParticipation, targetParticipation] = await Promise.all([
    prisma.meetingParticipant.findUnique({
      where: { roomId_userId: { roomId: meetingId, userId: senderUserId } },
      select: { status: true },
    }),
    prisma.meetingParticipant.findUnique({
      where: { roomId_userId: { roomId: meetingId, userId: targetUserId } },
      select: { status: true },
    }),
  ]);

  if (!senderParticipation) {
    throw new SocketError(ErrorCode.FORBIDDEN, 'You are not in this meeting');
  }

  if (!targetParticipation) {
    throw new SocketError(ErrorCode.NOT_FOUND, 'Target user is not in this meeting');
  }
}

/**
 * Check if a signaling event is rate-limited for this user.
 * Uses Redis INCR with TTL.
 */
async function isSignalingRateLimited(
  userId: string,
  meetingId: string,
): Promise<boolean> {
  const redisKey = key('signaling:rate', userId, meetingId);
  const count = await redis.incr(redisKey);

  if (count === 1) {
    await redis.expire(redisKey, Math.ceil(SIGNALING_RATE_LIMIT_WINDOW_MS / 1000));
  }

  return count > SIGNALING_RATE_LIMIT_MAX;
}

// ---- Handler: meeting:join --------------------------------------------------

async function handleMeetingJoin(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MeetingJoinData,
): Promise<void> {
  const { meetingId } = data;
  const userId: string = socket.data.userId;

  if (!meetingId) {
    socket.emit('error', {
      event: 'meeting:join',
      message: 'meetingId is required',
    });
    return;
  }

  // Verify meeting exists
  const meeting = await prisma.meetingRoom.findUnique({
    where: { id: meetingId },
    select: {
      status: true,
      maxParticipants: true,
      meetingLink: true,
    },
  });

  if (!meeting) {
    socket.emit('error', {
      event: 'meeting:join',
      message: 'Meeting not found',
    });
    return;
  }

  if (meeting.status === 'ENDED' || meeting.status === 'CANCELLED') {
    socket.emit('error', {
      event: 'meeting:join',
      message: `Meeting is ${meeting.status.toLowerCase()}`,
    });
    return;
  }

  // Verify user is a participant (or auto-add if they have the link)
  let participant = await prisma.meetingParticipant.findUnique({
    where: { roomId_userId: { roomId: meetingId, userId } },
    select: {
      id: true,
      role: true,
      status: true,
      isMuted: true,
      isCameraOff: true,
    },
  });

  if (!participant) {
    // Check if meeting has reached max capacity
    const activeCount = await prisma.meetingParticipant.count({
      where: {
        roomId: meetingId,
        status: { in: ['WAITING', 'APPROVED'] },
      },
    });

    if (activeCount >= meeting.maxParticipants) {
      socket.emit('error', {
        event: 'meeting:join',
        message: 'Meeting is full',
      });
      return;
    }

    // Auto-create participant
    participant = await prisma.meetingParticipant.create({
      data: {
        roomId: meetingId,
        userId,
        status: meeting.waitingRoom ? 'WAITING' : 'APPROVED',
        isCameraOff: true,
      },
      select: {
        id: true,
        role: true,
        status: true,
        isMuted: true,
        isCameraOff: true,
      },
    });
  }

  // Update participant status to APPROVED
  if (participant.status === 'WAITING') {
    // In a waiting room scenario, notify the host
    const hostSocket = await findUserSocketInRoom(io, meetingId, meeting.hostId);
    if (hostSocket) {
      // Could emit a specific event; for now, auto-approve
      await prisma.meetingParticipant.update({
        where: { id: participant.id },
        data: { status: 'APPROVED' },
      });
    }
  }

  // Update DB: set joinedAt, clear leftAt
  await prisma.meetingParticipant.update({
    where: { id: participant.id },
    data: {
      status: 'APPROVED',
      joinedAt: new Date(),
      leftAt: null,
    },
  });

  // Update meeting status to ACTIVE if not already
  if (meeting.status === 'SCHEDULED') {
    await prisma.meetingRoom.update({
      where: { id: meetingId },
      data: { status: 'ACTIVE', startedAt: new Date() },
    });
  }

  // Join the Socket.IO room
  await socket.join(meetingRoom(meetingId));
  socket.data.activeMeetingId = meetingId;

  // Get sender's user info for broadcast
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, avatarUrl: true },
  });

  if (user) {
    const participantPayload: MeetingParticipantPayload = {
      userId,
      username: user.username,
      avatarUrl: user.avatarUrl,
      role: participant.role,
    };

    // Tell the room that a new participant joined
    io.to(meetingRoom(meetingId)).emit('participant:joined', participantPayload);
  }

  // Send the list of existing peers to the new joiner
  const peers = await getPeersInRoom(io, meetingId, userId);
  for (const peer of peers) {
    socket.emit('participant:joined', peer);
  }

  logger.info('socket:meeting:join', {
    socketId: socket.id,
    userId,
    meetingId,
  });
}

// ---- Handler: meeting:leave -------------------------------------------------

async function handleMeetingLeave(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MeetingLeaveData,
): Promise<void> {
  const { meetingId } = data;
  const userId: string = socket.data.userId;

  if (!meetingId) return;

  // Leave the Socket.IO room
  await socket.leave(meetingRoom(meetingId));
  socket.data.activeMeetingId = null;

  // Update participant status in DB
  await prisma.meetingParticipant
    .update({
      where: { roomId_userId: { roomId: meetingId, userId } },
      data: { status: 'LEFT', leftAt: new Date() },
    })
    .catch(() => {
      // Participant may not exist (already left)
    });

  // Broadcast to room
  io.to(meetingRoom(meetingId)).emit('participant:left', {
    meetingId,
    userId,
  });

  // Check if meeting is now empty
  const remainingSockets = await io.in(meetingRoom(meetingId)).fetchSockets();
  if (remainingSockets.length === 0) {
    // Last participant left — end the meeting
    await prisma.meetingRoom.update({
      where: { id: meetingId },
      data: { status: 'ENDED', endedAt: new Date() },
    });

    // Remove any lingering rate limit keys
    const pattern = key('signaling:rate', '*', meetingId);
    const matchingKeys = await redis.keys(pattern);
    if (matchingKeys.length > 0) {
      await redis.del(...matchingKeys);
    }

    logger.info('socket:meeting:ended (last participant left)', {
      meetingId,
    });
  }

  logger.debug('socket:meeting:leave', {
    socketId: socket.id,
    userId,
    meetingId,
  });
}

// ---- Handler: webrtc:offer --------------------------------------------------

async function handleWebRTCOffer(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: WebRTCRelayData,
): Promise<void> {
  const { meetingId, targetUserId, sdp } = data;
  const userId: string = socket.data.userId;

  if (!meetingId || !targetUserId || !sdp) {
    socket.emit('error', {
      event: 'webrtc:offer',
      message: 'meetingId, targetUserId, and sdp are required',
    });
    return;
  }

  // Rate limit signaling
  const rateLimited = await isSignalingRateLimited(userId, meetingId);
  if (rateLimited) {
    socket.emit('error', {
      event: 'webrtc:offer',
      message: 'Signaling rate limit exceeded',
    });
    return;
  }

  // Verify both users are in the meeting
  try {
    await verifyBothInMeeting(meetingId, userId, targetUserId);
  } catch (err) {
    const message = err instanceof SocketError ? err.message : 'Verification failed';
    socket.emit('error', { event: 'webrtc:offer', message });
    return;
  }

  // Find target socket and relay
  const targetSocketId = await findUserSocketInRoom(io, meetingId, targetUserId);
  if (!targetSocketId) {
    socket.emit('error', {
      event: 'webrtc:offer',
      message: 'Target user is not connected to this meeting',
    });
    return;
  }

  io.to(targetSocketId).emit('webrtc:offer', {
    fromUserId: userId,
    sdp,
  });

  logger.debug('socket:webrtc:offer', {
    socketId: socket.id,
    fromUserId: userId,
    targetUserId,
    meetingId,
  });
}

// ---- Handler: webrtc:answer -------------------------------------------------

async function handleWebRTCAnswer(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: WebRTCRelayData,
): Promise<void> {
  const { meetingId, targetUserId, sdp } = data;
  const userId: string = socket.data.userId;

  if (!meetingId || !targetUserId || !sdp) {
    socket.emit('error', {
      event: 'webrtc:answer',
      message: 'meetingId, targetUserId, and sdp are required',
    });
    return;
  }

  const rateLimited = await isSignalingRateLimited(userId, meetingId);
  if (rateLimited) {
    socket.emit('error', {
      event: 'webrtc:answer',
      message: 'Signaling rate limit exceeded',
    });
    return;
  }

  try {
    await verifyBothInMeeting(meetingId, userId, targetUserId);
  } catch (err) {
    const message = err instanceof SocketError ? err.message : 'Verification failed';
    socket.emit('error', { event: 'webrtc:answer', message });
    return;
  }

  const targetSocketId = await findUserSocketInRoom(io, meetingId, targetUserId);
  if (!targetSocketId) {
    socket.emit('error', {
      event: 'webrtc:answer',
      message: 'Target user is not connected to this meeting',
    });
    return;
  }

  io.to(targetSocketId).emit('webrtc:answer', {
    fromUserId: userId,
    sdp,
  });
}

// ---- Handler: webrtc:ice-candidate ------------------------------------------

async function handleIceCandidate(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: IceCandidateData,
): Promise<void> {
  const { meetingId, targetUserId, candidate } = data;
  const userId: string = socket.data.userId;

  if (!meetingId || !targetUserId || !candidate) {
    socket.emit('error', {
      event: 'webrtc:ice-candidate',
      message: 'meetingId, targetUserId, and candidate are required',
    });
    return;
  }

  const rateLimited = await isSignalingRateLimited(userId, meetingId);
  if (rateLimited) {
    socket.emit('error', {
      event: 'webrtc:ice-candidate',
      message: 'Signaling rate limit exceeded',
    });
    return;
  }

  try {
    await verifyBothInMeeting(meetingId, userId, targetUserId);
  } catch (err) {
    const message = err instanceof SocketError ? err.message : 'Verification failed';
    socket.emit('error', { event: 'webrtc:ice-candidate', message });
    return;
  }

  const targetSocketId = await findUserSocketInRoom(io, meetingId, targetUserId);
  if (!targetSocketId) {
    // ICE candidates are best-effort; don't error if target is gone
    return;
  }

  io.to(targetSocketId).emit('webrtc:ice-candidate', {
    fromUserId: userId,
    candidate,
  });
}

// ---- Handler: webrtc:renegotiate --------------------------------------------

async function handleWebRTCRenegotiate(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: WebRTCRelayData,
): Promise<void> {
  const { meetingId, targetUserId, sdp } = data;
  const userId: string = socket.data.userId;

  if (!meetingId || !targetUserId || !sdp) {
    socket.emit('error', {
      event: 'webrtc:renegotiate',
      message: 'meetingId, targetUserId, and sdp are required',
    });
    return;
  }

  const rateLimited = await isSignalingRateLimited(userId, meetingId);
  if (rateLimited) {
    socket.emit('error', {
      event: 'webrtc:renegotiate',
      message: 'Signaling rate limit exceeded',
    });
    return;
  }

  try {
    await verifyBothInMeeting(meetingId, userId, targetUserId);
  } catch (err) {
    const message = err instanceof SocketError ? err.message : 'Verification failed';
    socket.emit('error', { event: 'webrtc:renegotiate', message });
    return;
  }

  const targetSocketId = await findUserSocketInRoom(io, meetingId, targetUserId);
  if (!targetSocketId) {
    socket.emit('error', {
      event: 'webrtc:renegotiate',
      message: 'Target user is not connected to this meeting',
    });
    return;
  }

  io.to(targetSocketId).emit('webrtc:renegotiate', {
    fromUserId: userId,
    sdp,
  });

  logger.debug('socket:webrtc:renegotiate', {
    socketId: socket.id,
    fromUserId: userId,
    targetUserId,
    meetingId,
  });
}

// ---- Handler: meeting:mute --------------------------------------------------

async function handleMeetingMute(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MeetingToggleData,
): Promise<void> {
  const { meetingId, isMuted } = data;
  const userId: string = socket.data.userId;

  if (!meetingId) {
    socket.emit('error', {
      event: 'meeting:mute',
      message: 'meetingId is required',
    });
    return;
  }

  const participant = await prisma.meetingParticipant.findUnique({
    where: { roomId_userId: { roomId: meetingId, userId } },
    select: { id: true },
  });

  if (!participant) {
    socket.emit('error', {
      event: 'meeting:mute',
      message: 'You are not in this meeting',
    });
    return;
  }

  await prisma.meetingParticipant.update({
    where: { id: participant.id },
    data: { isMuted },
  });

  io.to(meetingRoom(meetingId)).emit('meeting:state', {
    meetingId,
    userId,
    isMuted,
    isCameraOff: false, // Only update mute; client merges state
    isScreenSharing: false,
  });
}

// ---- Handler: meeting:camera ------------------------------------------------

async function handleMeetingCamera(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MeetingCameraData,
): Promise<void> {
  const { meetingId, isCameraOff } = data;
  const userId: string = socket.data.userId;

  if (!meetingId) {
    socket.emit('error', {
      event: 'meeting:camera',
      message: 'meetingId is required',
    });
    return;
  }

  const participant = await prisma.meetingParticipant.findUnique({
    where: { roomId_userId: { roomId: meetingId, userId } },
    select: { id: true },
  });

  if (!participant) {
    socket.emit('error', {
      event: 'meeting:camera',
      message: 'You are not in this meeting',
    });
    return;
  }

  await prisma.meetingParticipant.update({
    where: { id: participant.id },
    data: { isCameraOff },
  });

  io.to(meetingRoom(meetingId)).emit('meeting:state', {
    meetingId,
    userId,
    isMuted: false,
    isCameraOff,
    isScreenSharing: false,
  });
}

// ---- Handler: meeting:screen-share ------------------------------------------

async function handleMeetingScreenShare(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MeetingScreenShareData,
): Promise<void> {
  const { meetingId, isSharing } = data;
  const userId: string = socket.data.userId;

  if (!meetingId) {
    socket.emit('error', {
      event: 'meeting:screen-share',
      message: 'meetingId is required',
    });
    return;
  }

  const participant = await prisma.meetingParticipant.findUnique({
    where: { roomId_userId: { roomId: meetingId, userId } },
    select: { id: true },
  });

  if (!participant) {
    socket.emit('error', {
      event: 'meeting:screen-share',
      message: 'You are not in this meeting',
    });
    return;
  }

  await prisma.meetingParticipant.update({
    where: { id: participant.id },
    data: { isScreenSharing: isSharing },
  });

  // Prevent duplicate screen shares: if this user starts sharing,
  // tell everyone else to stop sharing (single sharer model)
  if (isSharing) {
    const otherSharing = await prisma.meetingParticipant.findMany({
      where: {
        roomId: meetingId,
        userId: { not: userId },
        isScreenSharing: true,
      },
      select: { id: true, userId: true },
    });

    for (const other of otherSharing) {
      await prisma.meetingParticipant.update({
        where: { id: other.id },
        data: { isScreenSharing: false },
      });
    }
  }

  io.to(meetingRoom(meetingId)).emit('meeting:state', {
    meetingId,
    userId,
    isMuted: false,
    isCameraOff: false,
    isScreenSharing: isSharing,
  });
}

// ---- Handler: meeting:raise-hand --------------------------------------------

async function handleMeetingRaiseHand(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MeetingHandData,
): Promise<void> {
  const { meetingId } = data;
  const userId: string = socket.data.userId;

  if (!meetingId) return;

  // Verify participant
  const participant = await prisma.meetingParticipant.findUnique({
    where: { roomId_userId: { roomId: meetingId, userId } },
    select: { id: true },
  });

  if (!participant) {
    socket.emit('error', {
      event: 'meeting:raise-hand',
      message: 'You are not in this meeting',
    });
    return;
  }

  io.to(meetingRoom(meetingId)).emit('meeting:hand', {
    meetingId,
    userId,
  });
}

// ---- Handler: meeting:chat --------------------------------------------------

async function handleMeetingChat(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MeetingChatSendData,
): Promise<void> {
  const { meetingId, content } = data;
  const userId: string = socket.data.userId;

  if (!meetingId || !content || content.trim().length === 0) {
    socket.emit('error', {
      event: 'meeting:chat',
      message: 'meetingId and non-empty content are required',
    });
    return;
  }

  if (content.length > MAX_MEETING_CHAT_LENGTH) {
    socket.emit('error', {
      event: 'meeting:chat',
      message: `Message exceeds maximum length of ${MAX_MEETING_CHAT_LENGTH} characters`,
    });
    return;
  }

  // Verify participant
  const participant = await prisma.meetingParticipant.findUnique({
    where: { roomId_userId: { roomId: meetingId, userId } },
    select: { id: true, status: true },
  });

  if (!participant || participant.status !== 'APPROVED') {
    socket.emit('error', {
      event: 'meeting:chat',
      message: 'You are not an active participant in this meeting',
    });
    return;
  }

  // Save to DB
  const chatMessage = await prisma.meetingChatMessage.create({
    data: {
      roomId: meetingId,
      senderId: userId,
      content: content.trim(),
    },
  });

  // Broadcast to room
  io.to(meetingRoom(meetingId)).emit('meeting:chat', {
    meetingId,
    userId,
    content: chatMessage.content,
    createdAt: chatMessage.createdAt.toISOString(),
  });
}

// ---- Handler: meeting:host-action -------------------------------------------

async function handleMeetingHostAction(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MeetingHostActionData,
): Promise<void> {
  const { meetingId, targetUserId, action } = data;
  const userId: string = socket.data.userId;

  if (!meetingId || !targetUserId || !action) {
    socket.emit('error', {
      event: 'meeting:host-action',
      message: 'meetingId, targetUserId, and action are required',
    });
    return;
  }

  if (!['kick', 'mute', 'promote'].includes(action)) {
    socket.emit('error', {
      event: 'meeting:host-action',
      message: 'Action must be "kick", "mute", or "promote"',
    });
    return;
  }

  // Verify the actor is the host or a co-host
  const actor = await prisma.meetingParticipant.findUnique({
    where: { roomId_userId: { roomId: meetingId, userId } },
    select: { role: true },
  });

  if (!actor || (actor.role !== 'HOST' && actor.role !== 'CO_HOST')) {
    socket.emit('error', {
      event: 'meeting:host-action',
      message: 'Only the host or co-host can perform this action',
    });
    return;
  }

  // Verify the target is a participant
  const target = await prisma.meetingParticipant.findUnique({
    where: { roomId_userId: { roomId: meetingId, userId: targetUserId } },
    select: { id: true, role: true },
  });

  if (!target) {
    socket.emit('error', {
      event: 'meeting:host-action',
      message: 'Target user is not in this meeting',
    });
    return;
  }

  // Prevent host from demoting themselves or kicking themselves
  if (targetUserId === userId) {
    socket.emit('error', {
      event: 'meeting:host-action',
      message: 'You cannot perform this action on yourself',
    });
    return;
  }

  // Prevent co-host from kicking or demoting host
  if (actor.role === 'CO_HOST' && target.role === 'HOST') {
    socket.emit('error', {
      event: 'meeting:host-action',
      message: 'A co-host cannot perform actions on the host',
    });
    return;
  }

  switch (action) {
    case 'kick': {
      await prisma.meetingParticipant.update({
        where: { id: target.id },
        data: { status: 'LEFT', leftAt: new Date() },
      });

      // Remove target from the Socket.IO room
      const targetSocketId = await findUserSocketInRoom(io, meetingId, targetUserId);
      if (targetSocketId) {
        io.to(targetSocketId).emit('meeting:ended', {
          meetingId,
          reason: 'You have been removed from the meeting by the host',
        });
        io.sockets.sockets.get(targetSocketId)?.leave(meetingRoom(meetingId));
      }

      logger.info('socket:meeting:host-action:kick', {
        meetingId,
        actorUserId: userId,
        targetUserId,
      });
      break;
    }

    case 'mute': {
      await prisma.meetingParticipant.update({
        where: { id: target.id },
        data: { isMuted: true },
      });

      io.to(meetingRoom(meetingId)).emit('meeting:state', {
        meetingId,
        userId: targetUserId,
        isMuted: true,
        isCameraOff: false,
        isScreenSharing: false,
      });

      logger.info('socket:meeting:host-action:mute', {
        meetingId,
        actorUserId: userId,
        targetUserId,
      });
      break;
    }

    case 'promote': {
      // Promote PARTICIPANT → CO_HOST
      if (target.role === 'PARTICIPANT') {
        await prisma.meetingParticipant.update({
          where: { id: target.id },
          data: { role: 'CO_HOST' },
        });
      } else {
        socket.emit('error', {
          event: 'meeting:host-action',
          message: 'User can only be promoted from PARTICIPANT to CO_HOST',
        });
        return;
      }

      logger.info('socket:meeting:host-action:promote', {
        meetingId,
        actorUserId: userId,
        targetUserId,
      });
      break;
    }
  }

  // Broadcast the host action to the room
  io.to(meetingRoom(meetingId)).emit('meeting:host-action', {
    meetingId,
    targetUserId,
    action,
  });
}

// ---- Registration -----------------------------------------------------------

export function registerCallHandlers(io: HoneyIOServer): void {
  io.on('connection', (socket: HoneySocket) => {
    socket.on('meeting:join', (data: MeetingJoinData) => {
      void handleMeetingJoin(io, socket, data);
    });

    socket.on('meeting:leave', (data: MeetingLeaveData) => {
      void handleMeetingLeave(io, socket, data);
    });

    socket.on('webrtc:offer', (data: WebRTCRelayData) => {
      void handleWebRTCOffer(io, socket, data);
    });

    socket.on('webrtc:answer', (data: WebRTCRelayData) => {
      void handleWebRTCAnswer(io, socket, data);
    });

    socket.on('webrtc:ice-candidate', (data: IceCandidateData) => {
      void handleIceCandidate(io, socket, data);
    });

    socket.on('webrtc:renegotiate', (data: WebRTCRelayData) => {
      void handleWebRTCRenegotiate(io, socket, data);
    });

    socket.on('meeting:mute', (data: MeetingToggleData) => {
      void handleMeetingMute(io, socket, data);
    });

    socket.on('meeting:camera', (data: MeetingCameraData) => {
      void handleMeetingCamera(io, socket, data);
    });

    socket.on('meeting:screen-share', (data: MeetingScreenShareData) => {
      void handleMeetingScreenShare(io, socket, data);
    });

    socket.on('meeting:raise-hand', (data: MeetingHandData) => {
      void handleMeetingRaiseHand(io, socket, data);
    });

    socket.on('meeting:chat', (data: MeetingChatSendData) => {
      void handleMeetingChat(io, socket, data);
    });

    socket.on('meeting:host-action', (data: MeetingHostActionData) => {
      void handleMeetingHostAction(io, socket, data);
    });

    // Clean up on disconnect
    socket.on('disconnect', () => {
      const activeMeetingId = socket.data.activeMeetingId;
      if (activeMeetingId) {
        void handleMeetingLeave(io, socket, { meetingId: activeMeetingId });
      }
    });
  });
}
