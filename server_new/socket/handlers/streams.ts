// =============================================================================
// Honey — Socket.IO Streams Handler
// =============================================================================
// Live stream viewer tracking, comments, and reactions.
// Uses Redis for atomic viewer counts and rate limiting.
// =============================================================================

import { redis, key } from '../../config/redis';
import { prisma } from '../../config/prisma';
import { logger } from '../../utils/logger';
import type {
  HoneySocket,
  HoneyIOServer,
  StreamJoinData,
  StreamLeaveData,
  StreamCommentSendData,
  StreamReactData,
  StreamViewerCountData,
  StreamReactionUpdateData,
  StreamCommentPayload,
} from '../types';

// ---- Constants --------------------------------------------------------------

const STREAM_ROOM_PREFIX = 'stream:';
const STREAM_VIEWER_KEY_PREFIX = 'stream:viewers:';
const STREAM_COMMENT_RATE_LIMIT_MAX = 5; // comments per second
const STREAM_COMMENT_RATE_LIMIT_WINDOW_S = 1;
const STREAM_REACTION_RATE_LIMIT_MAX = 3; // reactions per second
const STREAM_REACTION_RATE_LIMIT_WINDOW_S = 1;
const MAX_COMMENT_LENGTH = 500;
const MAX_REACTION_TYPE_LENGTH = 32;

// ---- Helpers ----------------------------------------------------------------

function streamRoom(streamId: string): string {
  return `${STREAM_ROOM_PREFIX}${streamId}`;
}

function viewerCountKey(streamId: string): string {
  return key('stream:viewers', streamId);
}

/**
 * Atomically increment viewer count (Redis INCR) and broadcast.
 * Returns the new count.
 */
async function incrementViewerCount(
  io: HoneyIOServer,
  streamId: string,
): Promise<number> {
  const countKey = viewerCountKey(streamId);
  const newCount = await redis.incr(countKey);

  // Set a generous TTL so stale counts eventually expire
  await redis.expire(countKey, 86400); // 24 hours

  // Broadcast viewer count to all viewers
  const viewerData: StreamViewerCountData = { streamId, count: newCount };
  io.to(streamRoom(streamId)).emit('stream:viewer-count', viewerData);

  return newCount;
}

/**
 * Atomically decrement viewer count (Redis DECR), minimum 0.
 * Returns the new count.
 */
async function decrementViewerCount(
  io: HoneyIOServer,
  streamId: string,
): Promise<number> {
  const countKey = viewerCountKey(streamId);
  const currentCount = await redis.get(countKey);

  if (!currentCount) {
    return 0;
  }

  const newCount = Math.max(0, Number(currentCount) - 1);

  if (newCount === 0) {
    await redis.del(countKey);
  } else {
    await redis.set(countKey, String(newCount), 'EX', 86400);
  }

  // Broadcast viewer count to all viewers
  const viewerData: StreamViewerCountData = { streamId, count: newCount };
  io.to(streamRoom(streamId)).emit('stream:viewer-count', viewerData);

  return newCount;
}

/**
 * Check if a user is rate-limited for stream comments.
 */
async function isCommentRateLimited(userId: string, streamId: string): Promise<boolean> {
  const redisKey = key('stream:comment:rate', userId, streamId);
  const count = await redis.incr(redisKey);

  if (count === 1) {
    await redis.expire(redisKey, STREAM_COMMENT_RATE_LIMIT_WINDOW_S);
  }

  return count > STREAM_COMMENT_RATE_LIMIT_MAX;
}

/**
 * Check if a user is rate-limited for stream reactions.
 */
async function isReactionRateLimited(userId: string, streamId: string): Promise<boolean> {
  const redisKey = key('stream:reaction:rate', userId, streamId);
  const count = await redis.incr(redisKey);

  if (count === 1) {
    await redis.expire(redisKey, STREAM_REACTION_RATE_LIMIT_WINDOW_S);
  }

  return count > STREAM_REACTION_RATE_LIMIT_MAX;
}

// ---- Handler: stream:join ---------------------------------------------------

async function handleStreamJoin(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: StreamJoinData,
): Promise<void> {
  const { streamId } = data;
  const userId: string = socket.data.userId;

  if (!streamId) {
    socket.emit('error', {
      event: 'stream:join',
      message: 'streamId is required',
    });
    return;
  }

  // Verify stream exists and is live
  const stream = await prisma.stream.findUnique({
    where: { id: streamId },
    select: {
      status: true,
      isCommentsOn: true,
      deletedAt: true,
    },
  });

  if (!stream || stream.deletedAt) {
    socket.emit('error', {
      event: 'stream:join',
      message: 'Stream not found',
    });
    return;
  }

  if (stream.status !== 'LIVE' && stream.status !== 'PUBLISHED') {
    socket.emit('error', {
      event: 'stream:join',
      message: 'This stream is not currently active',
    });
    return;
  }

  // Join the Socket.IO room
  await socket.join(streamRoom(streamId));
  socket.data.activeStreamIds.add(streamId);

  // Increment viewer count
  await incrementViewerCount(io, streamId);

  logger.debug('socket:stream:join', {
    socketId: socket.id,
    userId,
    streamId,
  });
}

// ---- Handler: stream:leave --------------------------------------------------

async function handleStreamLeave(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: StreamLeaveData,
): Promise<void> {
  const { streamId } = data;

  if (!streamId) return;

  await socket.leave(streamRoom(streamId));
  socket.data.activeStreamIds.delete(streamId);

  // Decrement viewer count
  await decrementViewerCount(io, streamId);

  logger.debug('socket:stream:leave', {
    socketId: socket.id,
    userId: socket.data.userId,
    streamId,
  });
}

// ---- Handler: stream:comment ------------------------------------------------

async function handleStreamComment(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: StreamCommentSendData,
): Promise<void> {
  const { streamId, content } = data;
  const userId: string = socket.data.userId;

  if (!streamId || !content || content.trim().length === 0) {
    socket.emit('error', {
      event: 'stream:comment',
      message: 'streamId and non-empty content are required',
    });
    return;
  }

  if (content.length > MAX_COMMENT_LENGTH) {
    socket.emit('error', {
      event: 'stream:comment',
      message: `Comment exceeds maximum length of ${MAX_COMMENT_LENGTH} characters`,
    });
    return;
  }

  // Rate limit: max 5 comments per second per user per stream
  const rateLimited = await isCommentRateLimited(userId, streamId);
  if (rateLimited) {
    socket.emit('error', {
      event: 'stream:comment',
      message: 'Comment rate limit exceeded. Slow down.',
    });
    return;
  }

  // Verify stream exists, is live, and comments are enabled
  const stream = await prisma.stream.findUnique({
    where: { id: streamId },
    select: {
      status: true,
      isCommentsOn: true,
      deletedAt: true,
    },
  });

  if (!stream || stream.deletedAt) {
    socket.emit('error', {
      event: 'stream:comment',
      message: 'Stream not found',
    });
    return;
  }

  if (stream.status !== 'LIVE' && stream.status !== 'PUBLISHED') {
    socket.emit('error', {
      event: 'stream:comment',
      message: 'Stream is not active',
    });
    return;
  }

  if (!stream.isCommentsOn) {
    socket.emit('error', {
      event: 'stream:comment',
      message: 'Comments are disabled for this stream',
    });
    return;
  }

  // Get username
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });

  const username = user?.username ?? userId;

  // Save comment to DB
  const comment = await prisma.streamComment.create({
    data: {
      streamId,
      userId,
      content: content.trim(),
    },
  });

  // Increment comment count on the stream
  await prisma.stream.update({
    where: { id: streamId },
    data: { commentCount: { increment: 1 } },
  });

  // Broadcast to all viewers
  const commentPayload: StreamCommentPayload = {
    id: comment.id,
    userId,
    username,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
  };

  io.to(streamRoom(streamId)).emit('stream:comment:new', commentPayload);

  logger.debug('socket:stream:comment', {
    socketId: socket.id,
    userId,
    streamId,
    commentId: comment.id,
  });
}

// ---- Handler: stream:react -------------------------------------------------

async function handleStreamReact(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: StreamReactData,
): Promise<void> {
  const { streamId, type: reactionType } = data;
  const userId: string = socket.data.userId;

  if (!streamId || !reactionType) {
    socket.emit('error', {
      event: 'stream:react',
      message: 'streamId and type are required',
    });
    return;
  }

  if (reactionType.length > MAX_REACTION_TYPE_LENGTH) {
    socket.emit('error', {
      event: 'stream:react',
      message: `Reaction type exceeds maximum length of ${MAX_REACTION_TYPE_LENGTH} characters`,
    });
    return;
  }

  // Rate limit
  const rateLimited = await isReactionRateLimited(userId, streamId);
  if (rateLimited) {
    socket.emit('error', {
      event: 'stream:react',
      message: 'Reaction rate limit exceeded. Slow down.',
    });
    return;
  }

  // Verify stream exists
  const stream = await prisma.stream.findUnique({
    where: { id: streamId },
    select: { status: true, deletedAt: true },
  });

  if (!stream || stream.deletedAt) {
    socket.emit('error', {
      event: 'stream:react',
      message: 'Stream not found',
    });
    return;
  }

  if (stream.status !== 'LIVE' && stream.status !== 'PUBLISHED') {
    socket.emit('error', {
      event: 'stream:react',
      message: 'Stream is not active',
    });
    return;
  }

  // Toggle: create if not exists, delete if exists
  const existingReaction = await prisma.streamReaction.findUnique({
    where: {
      streamId_userId_type: { streamId, userId, type: reactionType },
    },
  });

  if (existingReaction) {
    await prisma.streamReaction.delete({
      where: { id: existingReaction.id },
    });
  } else {
    await prisma.streamReaction.create({
      data: {
        streamId,
        userId,
        type: reactionType,
      },
    });
  }

  // Get the new count for this reaction type (atomic via DB)
  const reactionCount = await prisma.streamReaction.count({
    where: {
      streamId,
      type: reactionType,
    },
  });

  const reactionData: StreamReactionUpdateData = {
    streamId,
    type: reactionType,
    count: reactionCount,
  };

  io.to(streamRoom(streamId)).emit('stream:reaction:update', reactionData);

  logger.debug('socket:stream:react', {
    socketId: socket.id,
    userId,
    streamId,
    type: reactionType,
    removed: !!existingReaction,
    newCount: reactionCount,
  });
}

// ---- Registration -----------------------------------------------------------

export function registerStreamHandlers(io: HoneyIOServer): void {
  io.on('connection', (socket: HoneySocket) => {
    socket.on('stream:join', (data: StreamJoinData) => {
      void handleStreamJoin(io, socket, data);
    });

    socket.on('stream:leave', (data: StreamLeaveData) => {
      void handleStreamLeave(io, socket, data);
    });

    socket.on('stream:comment', (data: StreamCommentSendData) => {
      void handleStreamComment(io, socket, data);
    });

    socket.on('stream:react', (data: StreamReactData) => {
      void handleStreamReact(io, socket, data);
    });

    // Clean up on disconnect: leave all active streams
    socket.on('disconnect', () => {
      const activeStreamIds = socket.data.activeStreamIds;
      if (activeStreamIds && activeStreamIds.size > 0) {
        for (const streamId of activeStreamIds) {
          void handleStreamLeave(io, socket, { streamId });
        }
      }
    });
  });
}
