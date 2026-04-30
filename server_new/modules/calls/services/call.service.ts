// =============================================================================
// Honey — Call / Meeting Service
// =============================================================================
// Full meeting lifecycle management. No `any`. Strict TypeScript throughout.
// =============================================================================

import { prisma } from '../../../config/prisma';
import { NotFoundError, ForbiddenError, ValidationError, BadRequestError, InternalError } from '../../../errors';
import { logger } from '../../../utils/logger';
import { generateMeetingLink } from '../../../utils/helpers';
import {
  CreateMeetingDto,
  UpdateMeetingDto,
  SendMeetingChatDto,
} from '../dto/call.dto';

// =============================================================================
// Internal helpers
// =============================================================================

const MEETING_INCLUDE = {
  host: {
    select: { id: true, username: true, avatarUrl: true },
  },
  participants: {
    include: {
      user: {
        select: { id: true, username: true, avatarUrl: true },
      },
    },
    where: { status: { not: 'REJECTED' as const } },
  },
} as const;

const CHAT_MESSAGE_INCLUDE = {
  sender: {
    select: { id: true, username: true, avatarUrl: true },
  },
} as const;

interface ParticipantWithUser {
  id: string;
  roomId: string;
  userId: string;
  role: 'HOST' | 'CO_HOST' | 'PARTICIPANT';
  status: 'WAITING' | 'APPROVED' | 'REJECTED' | 'LEFT';
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  joinedAt: Date;
  leftAt: Date | null;
  user: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
}

/**
 * Find a meeting room by id and throw if not found.
 */
async function findMeetingRoom(meetingId: string) {
  const room = await prisma.meetingRoom.findUnique({
    where: { id: meetingId },
    include: MEETING_INCLUDE,
  });
  if (!room) {
    throw new NotFoundError('Meeting room', meetingId);
  }
  return room;
}

/**
 * Find a participant record. Throws if not found.
 */
async function findParticipant(meetingId: string, userId: string) {
  const participant = await prisma.meetingParticipant.findUnique({
    where: {
      roomId_userId: { roomId: meetingId, userId },
    },
    include: {
      user: {
        select: { id: true, username: true, avatarUrl: true },
      },
    },
  });
  if (!participant) {
    throw new NotFoundError('Participant', `${meetingId}/${userId}`);
  }
  return participant;
}

/**
 * Assert that the requesting user has HOST or CO_HOST role.
 */
function assertHostOrCoHost(
  participants: ParticipantWithUser[],
  userId: string,
): void {
  const participant = participants.find((p) => p.userId === userId);
  if (!participant) {
    throw new ForbiddenError('You are not a participant of this meeting');
  }
  if (participant.role !== 'HOST' && participant.role !== 'CO_HOST') {
    throw new ForbiddenError('Only the host or co-host can perform this action');
  }
}

/**
 * Assert that the requesting user is the HOST.
 */
function assertHost(
  participants: ParticipantWithUser[],
  userId: string,
): void {
  const participant = participants.find((p) => p.userId === userId);
  if (!participant) {
    throw new ForbiddenError('You are not a participant of this meeting');
  }
  if (participant.role !== 'HOST') {
    throw new ForbiddenError('Only the host can perform this action');
  }
}

// =============================================================================
// Service
// =============================================================================

export const callService = {
  // ---------------------------------------------------------------------------
  // createMeeting
  // ---------------------------------------------------------------------------

  async createMeeting(userId: string, data: CreateMeetingDto) {
    logger.info('Creating meeting', { userId });

    // Verify user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User', userId);
    }

    // Generate a unique meeting link
    let meetingLink = generateMeetingLink();
    let linkExists = await prisma.meetingRoom.findUnique({
      where: { meetingLink },
    });

    // Retry up to 5 times on collision
    let attempts = 0;
    while (linkExists && attempts < 5) {
      meetingLink = generateMeetingLink();
      linkExists = await prisma.meetingRoom.findUnique({
        where: { meetingLink },
      });
      attempts++;
    }

    if (linkExists) {
      throw new InternalError('Failed to generate a unique meeting link');
    }

    // Create the room and host participant in a transaction
    const room = await prisma.$transaction(async (tx) => {
      const created = await tx.meetingRoom.create({
        data: {
          hostId: userId,
          title: data.title ?? null,
          description: data.description ?? null,
          meetingLink,
          scheduledAt: data.scheduledAt ?? null,
          maxParticipants: data.maxParticipants ?? 50,
          waitingRoom: data.waitingRoom ?? false,
        },
        include: MEETING_INCLUDE,
      });

      // Create host participant
      await tx.meetingParticipant.create({
        data: {
          roomId: created.id,
          userId,
          role: 'HOST',
          status: 'APPROVED',
        },
      });

      return created;
    });

    logger.info('Meeting created', { meetingId: room.id, meetingLink: room.meetingLink });
    return room;
  },

  // ---------------------------------------------------------------------------
  // getMeeting
  // ---------------------------------------------------------------------------

  async getMeeting(_userId: string, meetingId: string) {
    const room = await findMeetingRoom(meetingId);
    return room;
  },

  // ---------------------------------------------------------------------------
  // getMeetingByLink
  // ---------------------------------------------------------------------------

  async getMeetingByLink(meetingLink: string) {
    const room = await prisma.meetingRoom.findUnique({
      where: { meetingLink },
      include: MEETING_INCLUDE,
    });

    if (!room) {
      throw new NotFoundError('Meeting room');
    }

    return room;
  },

  // ---------------------------------------------------------------------------
  // updateMeeting
  // ---------------------------------------------------------------------------

  async updateMeeting(userId: string, meetingId: string, data: UpdateMeetingDto) {
    const room = await findMeetingRoom(meetingId);

    // Verify user is the host
    if (room.hostId !== userId) {
      throw new ForbiddenError('Only the host can update the meeting');
    }

    // Prevent updating if meeting is already active or ended
    if (room.status === 'ACTIVE') {
      throw new BadRequestError('Cannot update a meeting that is currently active');
    }
    if (room.status === 'ENDED') {
      throw new BadRequestError('Cannot update a meeting that has already ended');
    }

    const updated = await prisma.meetingRoom.update({
      where: { id: meetingId },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.scheduledAt !== undefined && { scheduledAt: data.scheduledAt }),
        ...(data.maxParticipants !== undefined && { maxParticipants: data.maxParticipants }),
        ...(data.waitingRoom !== undefined && { waitingRoom: data.waitingRoom }),
      },
      include: MEETING_INCLUDE,
    });

    logger.info('Meeting updated', { meetingId, userId });
    return updated;
  },

  // ---------------------------------------------------------------------------
  // cancelMeeting
  // ---------------------------------------------------------------------------

  async cancelMeeting(userId: string, meetingId: string) {
    const room = await findMeetingRoom(meetingId);

    if (room.hostId !== userId) {
      throw new ForbiddenError('Only the host can cancel the meeting');
    }

    if (room.status === 'ENDED' || room.status === 'CANCELLED') {
      throw new BadRequestError('Meeting is already ended or cancelled');
    }

    const updated = await prisma.meetingRoom.update({
      where: { id: meetingId },
      data: { status: 'CANCELLED' },
      include: MEETING_INCLUDE,
    });

    logger.info('Meeting cancelled', { meetingId, userId });
    return updated;
  },

  // ---------------------------------------------------------------------------
  // startMeeting
  // ---------------------------------------------------------------------------

  async startMeeting(userId: string, meetingId: string) {
    const room = await findMeetingRoom(meetingId);

    if (room.hostId !== userId) {
      throw new ForbiddenError('Only the host can start the meeting');
    }

    if (room.status === 'ACTIVE') {
      throw new BadRequestError('Meeting is already active');
    }
    if (room.status === 'ENDED' || room.status === 'CANCELLED') {
      throw new BadRequestError('Cannot start a meeting that has already ended or been cancelled');
    }

    const updated = await prisma.meetingRoom.update({
      where: { id: meetingId },
      data: {
        status: 'ACTIVE',
        startedAt: new Date(),
      },
      include: MEETING_INCLUDE,
    });

    logger.info('Meeting started', { meetingId, userId });
    return updated;
  },

  // ---------------------------------------------------------------------------
  // endMeeting
  // ---------------------------------------------------------------------------

  async endMeeting(userId: string, meetingId: string) {
    const room = await findMeetingRoom(meetingId);

    if (room.hostId !== userId) {
      throw new ForbiddenError('Only the host can end the meeting');
    }

    if (room.status !== 'ACTIVE') {
      throw new BadRequestError('Can only end an active meeting');
    }

    const now = new Date();
    const startedAt = room.startedAt ?? now;

    const updated = await prisma.$transaction(async (tx) => {
      // Update all active participants with their leftAt time
      await tx.meetingParticipant.updateMany({
        where: {
          roomId: meetingId,
          status: 'APPROVED',
          leftAt: null,
        },
        data: { leftAt: now, status: 'LEFT' },
      });

      // Update all waiting participants
      await tx.meetingParticipant.updateMany({
        where: {
          roomId: meetingId,
          status: 'WAITING',
          leftAt: null,
        },
        data: { leftAt: now, status: 'LEFT' },
      });

      // Update the room
      return tx.meetingRoom.update({
        where: { id: meetingId },
        data: {
          status: 'ENDED',
          endedAt: now,
        },
        include: MEETING_INCLUDE,
      });
    });

    logger.info('Meeting ended', {
      meetingId,
      userId,
      duration: Math.round((now.getTime() - startedAt.getTime()) / 1000),
    });

    return updated;
  },

  // ---------------------------------------------------------------------------
  // joinMeeting
  // ---------------------------------------------------------------------------

  async joinMeeting(userId: string, meetingLink: string) {
    // Verify user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User', userId);
    }

    // Find room by link
    const room = await prisma.meetingRoom.findUnique({
      where: { meetingLink },
      include: {
        ...MEETING_INCLUDE,
        participants: {
          where: { status: { not: 'REJECTED' as const } },
        },
      },
    });

    if (!room) {
      throw new NotFoundError('Meeting room');
    }

    // Check if meeting is joinable
    if (room.status === 'CANCELLED') {
      throw new BadRequestError('This meeting has been cancelled');
    }
    if (room.status === 'ENDED') {
      throw new BadRequestError('This meeting has already ended');
    }

    // Check if user is already a participant (non-rejected)
    const existingParticipant = room.participants.find((p) => p.userId === userId);
    if (existingParticipant) {
      if (existingParticipant.status === 'APPROVED') {
        return room;
      }
      if (existingParticipant.status === 'WAITING') {
        return room;
      }
      if (existingParticipant.status === 'LEFT') {
        // Re-join: update existing participant
        const rejoined = await prisma.meetingParticipant.update({
          where: { id: existingParticipant.id },
          data: {
            status: room.waitingRoom ? 'WAITING' : 'APPROVED',
            leftAt: null,
            joinedAt: new Date(),
          },
        });
        return prisma.meetingRoom.findUnique({
          where: { id: room.id },
          include: MEETING_INCLUDE,
        }) as Promise<NonNullable<typeof room>>;
      }
    }

    // Check max participants (count only APPROVED, non-left)
    const activeParticipants = room.participants.filter(
      (p) => p.status === 'APPROVED' && p.leftAt === null,
    );
    if (activeParticipants.length >= room.maxParticipants) {
      throw new ValidationError('Meeting has reached the maximum number of participants');
    }

    // Determine initial status
    const initialStatus = room.waitingRoom ? 'WAITING' : 'APPROVED';

    // Create participant
    await prisma.meetingParticipant.create({
      data: {
        roomId: room.id,
        userId,
        role: 'PARTICIPANT',
        status: initialStatus,
      },
    });

    logger.info('User joined meeting', {
      meetingId: room.id,
      userId,
      waitingRoom: room.waitingRoom,
    });

    // Return updated room
    return prisma.meetingRoom.findUnique({
      where: { id: room.id },
      include: MEETING_INCLUDE,
    }) as Promise<NonNullable<typeof room>>;
  },

  // ---------------------------------------------------------------------------
  // approveParticipant
  // ---------------------------------------------------------------------------

  async approveParticipant(userId: string, meetingId: string, participantId: string) {
    const room = await findMeetingRoom(meetingId);
    assertHostOrCoHost(room.participants as ParticipantWithUser[], userId);

    const participant = await prisma.meetingParticipant.findUnique({
      where: { id: participantId },
    });

    if (!participant || participant.roomId !== meetingId) {
      throw new NotFoundError('Participant', participantId);
    }

    if (participant.status !== 'WAITING') {
      throw new BadRequestError('Participant is not in the waiting room');
    }

    const updated = await prisma.meetingParticipant.update({
      where: { id: participantId },
      data: { status: 'APPROVED' },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    logger.info('Participant approved', { meetingId, participantId, approvedBy: userId });
    return updated;
  },

  // ---------------------------------------------------------------------------
  // rejectParticipant
  // ---------------------------------------------------------------------------

  async rejectParticipant(userId: string, meetingId: string, participantId: string) {
    const room = await findMeetingRoom(meetingId);
    assertHostOrCoHost(room.participants as ParticipantWithUser[], userId);

    const participant = await prisma.meetingParticipant.findUnique({
      where: { id: participantId },
    });

    if (!participant || participant.roomId !== meetingId) {
      throw new NotFoundError('Participant', participantId);
    }

    if (participant.status !== 'WAITING') {
      throw new BadRequestError('Participant is not in the waiting room');
    }

    const updated = await prisma.meetingParticipant.update({
      where: { id: participantId },
      data: { status: 'REJECTED' },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    logger.info('Participant rejected', { meetingId, participantId, rejectedBy: userId });
    return updated;
  },

  // ---------------------------------------------------------------------------
  // leaveMeeting
  // ---------------------------------------------------------------------------

  async leaveMeeting(userId: string, meetingId: string) {
    const room = await findMeetingRoom(meetingId);

    const participant = room.participants.find((p) => p.userId === userId);
    if (!participant) {
      throw new NotFoundError('Participant');
    }

    if (participant.status === 'LEFT') {
      throw new BadRequestError('You have already left this meeting');
    }

    const now = new Date();

    await prisma.meetingParticipant.update({
      where: { id: participant.id },
      data: { leftAt: now, status: 'LEFT' },
    });

    // If the host left, check for co-host to transfer, or end the meeting
    if (participant.role === 'HOST' && room.status === 'ACTIVE') {
      const coHosts = room.participants.filter(
        (p) => p.role === 'CO_HOST' && p.userId !== userId && p.status === 'APPROVED' && p.leftAt === null,
      );

      if (coHosts.length > 0) {
        // Transfer host role to the first co-host
        const newHost = coHosts[0];
        await prisma.meetingParticipant.update({
          where: { id: newHost.id },
          data: { role: 'HOST' },
        });

        logger.info('Meeting host transferred to co-host', {
          meetingId,
          newHostId: newHost.userId,
        });
      } else {
        // No co-host available — end the meeting
        await prisma.$transaction(async (tx) => {
          await tx.meetingParticipant.updateMany({
            where: {
              roomId: meetingId,
              status: 'APPROVED',
              leftAt: null,
            },
            data: { leftAt: now, status: 'LEFT' },
          });

          await tx.meetingRoom.update({
            where: { id: meetingId },
            data: { status: 'ENDED', endedAt: now },
          });
        });

        logger.info('Meeting ended (host left, no co-host)', { meetingId, userId });
      }
    }

    logger.info('User left meeting', { meetingId, userId });
    return { success: true, message: 'You have left the meeting' };
  },

  // ---------------------------------------------------------------------------
  // kickParticipant
  // ---------------------------------------------------------------------------

  async kickParticipant(userId: string, meetingId: string, targetUserId: string) {
    const room = await findMeetingRoom(meetingId);
    assertHostOrCoHost(room.participants as ParticipantWithUser[], userId);

    // Cannot kick yourself
    if (userId === targetUserId) {
      throw new BadRequestError('You cannot kick yourself');
    }

    const targetParticipant = await prisma.meetingParticipant.findUnique({
      where: {
        roomId_userId: { roomId: meetingId, userId: targetUserId },
      },
    });

    if (!targetParticipant) {
      throw new NotFoundError('Participant');
    }

    if (targetParticipant.status === 'LEFT' || targetParticipant.status === 'REJECTED') {
      throw new BadRequestError('Participant is already removed');
    }

    // Cannot kick the host
    const targetRole = targetParticipant.role;
    if (targetRole === 'HOST') {
      throw new ForbiddenError('Cannot kick the host');
    }
    // Co-host cannot kick another co-host
    if (targetRole === 'CO_HOST') {
      const actorParticipant = room.participants.find((p) => p.userId === userId);
      if (actorParticipant?.role === 'CO_HOST') {
        throw new ForbiddenError('Co-hosts cannot kick other co-hosts');
      }
    }

    const updated = await prisma.meetingParticipant.update({
      where: { id: targetParticipant.id },
      data: { leftAt: new Date(), status: 'LEFT' },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    logger.info('Participant kicked', { meetingId, targetUserId, kickedBy: userId });
    return updated;
  },

  // ---------------------------------------------------------------------------
  // muteParticipant
  // ---------------------------------------------------------------------------

  async muteParticipant(userId: string, meetingId: string, targetUserId: string) {
    const room = await findMeetingRoom(meetingId);
    assertHostOrCoHost(room.participants as ParticipantWithUser[], userId);

    if (userId === targetUserId) {
      throw new BadRequestError('Use the self-mute endpoint to mute yourself');
    }

    const targetParticipant = await prisma.meetingParticipant.findUnique({
      where: {
        roomId_userId: { roomId: meetingId, userId: targetUserId },
      },
    });

    if (!targetParticipant) {
      throw new NotFoundError('Participant');
    }

    if (targetParticipant.status !== 'APPROVED') {
      throw new BadRequestError('Participant is not currently in the meeting');
    }

    const updated = await prisma.meetingParticipant.update({
      where: { id: targetParticipant.id },
      data: { isMuted: true },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    logger.info('Participant muted by host/co-host', {
      meetingId,
      targetUserId,
      mutedBy: userId,
    });

    return updated;
  },

  // ---------------------------------------------------------------------------
  // toggleSelfMute
  // ---------------------------------------------------------------------------

  async toggleSelfMute(userId: string, meetingId: string, isMuted: boolean) {
    const participant = await findParticipant(meetingId, userId);

    if (participant.status !== 'APPROVED') {
      throw new BadRequestError('You are not currently in the meeting');
    }

    const updated = await prisma.meetingParticipant.update({
      where: { id: participant.id },
      data: { isMuted },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    return updated;
  },

  // ---------------------------------------------------------------------------
  // toggleSelfCamera
  // ---------------------------------------------------------------------------

  async toggleSelfCamera(userId: string, meetingId: string, isCameraOff: boolean) {
    const participant = await findParticipant(meetingId, userId);

    if (participant.status !== 'APPROVED') {
      throw new BadRequestError('You are not currently in the meeting');
    }

    const updated = await prisma.meetingParticipant.update({
      where: { id: participant.id },
      data: { isCameraOff },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    return updated;
  },

  // ---------------------------------------------------------------------------
  // getParticipants
  // ---------------------------------------------------------------------------

  async getParticipants(meetingId: string) {
    const room = await findMeetingRoom(meetingId);

    return room.participants;
  },

  // ---------------------------------------------------------------------------
  // promoteToCoHost
  // ---------------------------------------------------------------------------

  async promoteToCoHost(userId: string, meetingId: string, targetUserId: string) {
    const room = await findMeetingRoom(meetingId);
    assertHost(room.participants as ParticipantWithUser[], userId);

    if (userId === targetUserId) {
      throw new BadRequestError('You are already the host');
    }

    const targetParticipant = await prisma.meetingParticipant.findUnique({
      where: {
        roomId_userId: { roomId: meetingId, userId: targetUserId },
      },
    });

    if (!targetParticipant) {
      throw new NotFoundError('Participant');
    }

    if (targetParticipant.role === 'HOST') {
      throw new BadRequestError('User is already the host');
    }

    if (targetParticipant.role === 'CO_HOST') {
      throw new BadRequestError('User is already a co-host');
    }

    if (targetParticipant.status !== 'APPROVED') {
      throw new BadRequestError('Can only promote active participants');
    }

    const updated = await prisma.meetingParticipant.update({
      where: { id: targetParticipant.id },
      data: { role: 'CO_HOST' },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    logger.info('Participant promoted to co-host', {
      meetingId,
      targetUserId,
      promotedBy: userId,
    });

    return updated;
  },

  // ---------------------------------------------------------------------------
  // getMeetingChat
  // ---------------------------------------------------------------------------

  async getMeetingChat(
    _userId: string,
    meetingId: string,
    cursor?: string,
    limit: number = 50,
  ) {
    // Verify meeting exists
    await findMeetingRoom(meetingId);

    const parsedLimit = Math.min(Math.max(limit, 1), 100);

    const messages = await prisma.meetingChatMessage.findMany({
      where: {
        roomId: meetingId,
        isDeleted: false,
        ...(cursor && {
          createdAt: { lt: new Date(cursor) },
        }),
      },
      orderBy: { createdAt: 'desc' },
      take: parsedLimit,
      include: CHAT_MESSAGE_INCLUDE,
    });

    const nextCursor = messages.length === parsedLimit
      ? messages[messages.length - 1].createdAt.toISOString()
      : null;

    return {
      items: messages.reverse(), // Return chronological order
      nextCursor,
      hasMore: nextCursor !== null,
    };
  },

  // ---------------------------------------------------------------------------
  // sendMeetingChat
  // ---------------------------------------------------------------------------

  async sendMeetingChat(
    userId: string,
    meetingId: string,
    data: SendMeetingChatDto,
  ) {
    // Verify meeting exists and is active
    const room = await findMeetingRoom(meetingId);

    if (room.status !== 'ACTIVE') {
      throw new BadRequestError('Meeting chat is only available when the meeting is active');
    }

    // Verify user is an approved participant
    const participant = room.participants.find((p) => p.userId === userId);
    if (!participant || participant.status !== 'APPROVED') {
      throw new ForbiddenError('Only approved participants can send chat messages');
    }

    const message = await prisma.meetingChatMessage.create({
      data: {
        roomId: meetingId,
        senderId: userId,
        content: data.content,
      },
      include: CHAT_MESSAGE_INCLUDE,
    });

    logger.debug('Meeting chat message sent', {
      meetingId,
      senderId: userId,
      messageId: message.id,
    });

    return message;
  },
};

// ─── Re-export for import convenience ────────────────────────────────────────
