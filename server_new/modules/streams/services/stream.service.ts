// =============================================================================
// Honey — Stream Service
// =============================================================================
// Full stream lifecycle management with Redis viewer counts. No `any`.
// =============================================================================

import { prisma } from '../../../config/prisma';
import { redis, key } from '../../../config/redis';
import { NotFoundError, ForbiddenError, ValidationError, BadRequestError } from '../../../errors';
import { logger } from '../../../utils/logger';
import { generateStreamKey } from '../../../utils/helpers';
import { CreateStreamDto, UpdateStreamDto } from '../dto/stream.dto';

// =============================================================================
// Constants
// =============================================================================

const VIEWER_COUNT_TTL = 86400; // 24 hours in seconds

const STREAM_INCLUDE = {
  creator: {
    select: {
      id: true,
      username: true,
      avatarUrl: true,
    },
  },
  _count: {
    select: {
      comments: true,
      reactions: true,
      bookmarks: true,
    },
  },
} as const;

const COMMENT_INCLUDE = {
  user: {
    select: {
      id: true,
      username: true,
      avatarUrl: true,
    },
  },
} as const;

const BOOKMARK_INCLUDE = {
  stream: {
    include: {
      creator: {
        select: { id: true, username: true, avatarUrl: true },
      },
    },
  },
} as const;

// =============================================================================
// Internal helpers
// =============================================================================

/**
 * Find a stream by id. Verifies ownership or public access depending on context.
 */
async function findStream(streamId: string) {
  const stream = await prisma.stream.findUnique({
    where: { id: streamId, deletedAt: null },
    include: STREAM_INCLUDE,
  });

  if (!stream) {
    throw new NotFoundError('Stream', streamId);
  }

  return stream;
}

/**
 * Verify the user is the creator of the stream.
 */
function assertCreator(stream: { creatorId: string }, userId: string): void {
  if (stream.creatorId !== userId) {
    throw new ForbiddenError('Only the creator can perform this action');
  }
}

// =============================================================================
// Service
// =============================================================================

export const streamService = {
  // ---------------------------------------------------------------------------
  // createStream
  // ---------------------------------------------------------------------------

  async createStream(userId: string, data: CreateStreamDto) {
    logger.info('Creating stream', { userId, type: data.type });

    // Verify user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User', userId);
    }

    // For LIVE type, generate a stream key upfront
    const streamKey = data.type === 'LIVE' ? generateStreamKey() : null;

    const stream = await prisma.stream.create({
      data: {
        creatorId: userId,
        title: data.title,
        description: data.description ?? null,
        type: data.type,
        status: 'DRAFT',
        streamKey,
        category: data.category ?? null,
        tags: data.tags ?? [],
        isPublic: data.isPublic ?? true,
      },
      include: STREAM_INCLUDE,
    });

    logger.info('Stream created', { streamId: stream.id, type: stream.type });
    return stream;
  },

  // ---------------------------------------------------------------------------
  // updateStream
  // ---------------------------------------------------------------------------

  async updateStream(userId: string, streamId: string, data: UpdateStreamDto) {
    const stream = await findStream(streamId);
    assertCreator(stream, userId);

    const updateData: Record<string, unknown> = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.isPublic !== undefined) updateData.isPublic = data.isPublic;
    if (data.isCommentsOn !== undefined) updateData.isCommentsOn = data.isCommentsOn;
    if (data.thumbnailUrl !== undefined) updateData.thumbnailUrl = data.thumbnailUrl || null;

    const updated = await prisma.stream.update({
      where: { id: streamId },
      data: updateData,
      include: STREAM_INCLUDE,
    });

    logger.info('Stream updated', { streamId, userId });
    return updated;
  },

  // ---------------------------------------------------------------------------
  // deleteStream
  // ---------------------------------------------------------------------------

  async deleteStream(userId: string, streamId: string) {
    const stream = await findStream(streamId);

    // Allow creator or check if user is admin/staff
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const isCreator = stream.creatorId === userId;
    const isAdmin = user?.isStaff === true || user?.isSuperuser === true;

    if (!isCreator && !isAdmin) {
      throw new ForbiddenError('Only the creator or an admin can delete this stream');
    }

    const deleted = await prisma.stream.update({
      where: { id: streamId },
      data: { deletedAt: new Date() },
      include: STREAM_INCLUDE,
    });

    // Clean up Redis viewer count
    try {
      await redis.del(key('stream', streamId, 'viewers'));
    } catch (redisErr) {
      logger.warn('Failed to clean up Redis viewer count on delete', {
        streamId,
        error: (redisErr as Error).message,
      });
    }

    logger.info('Stream deleted', { streamId, userId });
    return deleted;
  },

  // ---------------------------------------------------------------------------
  // getStream
  // ---------------------------------------------------------------------------

  async getStream(userId: string | undefined, streamId: string) {
    const stream = await findStream(streamId);

    // If not public, only creator can view
    if (!stream.isPublic) {
      if (!userId || stream.creatorId !== userId) {
        throw new ForbiddenError('This stream is private');
      }
    }

    // Check bookmark status if user is authenticated
    let isBookmarked = false;
    if (userId) {
      const bookmark = await prisma.streamBookmark.findUnique({
        where: {
          streamId_userId: { streamId, userId },
        },
      });
      isBookmarked = bookmark !== null;
    }

    return {
      ...stream,
      isBookmarked,
    };
  },

  // ---------------------------------------------------------------------------
  // getStreams (paginated feed)
  // ---------------------------------------------------------------------------

  async getStreams(
    userId: string | undefined,
    filters: {
      cursor?: string;
      limit?: number;
      type?: 'VIDEO' | 'LIVE' | 'SHORT';
      category?: string;
      creatorId?: string;
      sortBy?: 'latest' | 'popular';
    },
  ) {
    const limit = Math.min(Math.max(filters.limit ?? 20, 1), 50);
    const cursor = filters.cursor;

    // Build where clause
    const where: Record<string, unknown> = {
      deletedAt: null,
      status: { in: ['PUBLISHED', 'LIVE', 'ENDED'] as const },
      isPublic: true,
    };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.creatorId) {
      where.creatorId = filters.creatorId;
    }

    // Build cursor condition
    const cursorCondition = cursor
      ? { createdAt: { lt: new Date(cursor) } }
      : {};

    // Determine sort order
    const orderBy = filters.sortBy === 'popular'
      ? [{ likeCount: 'desc' as const }, { createdAt: 'desc' as const }]
      : [{ createdAt: 'desc' as const }];

    const streams = await prisma.stream.findMany({
      where: { ...where, ...cursorCondition },
      orderBy,
      take: limit + 1,
      include: {
        ...STREAM_INCLUDE,
        ...(userId && {
          bookmarks: {
            where: { userId },
            select: { id: true },
          },
        }),
      },
    });

    const hasMore = streams.length > limit;
    const items = hasMore ? streams.slice(0, limit) : streams;
    const nextCursor = hasMore
      ? items[items.length - 1].createdAt.toISOString()
      : null;

    // Transform: add isBookmarked flag
    const transformedItems = items.map((stream) => ({
      ...stream,
      isBookmarked: userId
        ? (stream.bookmarks as { id: string }[] | undefined)?.length > 0
        : false,
      bookmarks: undefined, // Remove bookmarks array from response
    }));

    return {
      items: transformedItems,
      nextCursor,
      hasMore,
    };
  },

  // ---------------------------------------------------------------------------
  // startLiveStream
  // ---------------------------------------------------------------------------

  async startLiveStream(userId: string, streamId: string) {
    const stream = await findStream(streamId);
    assertCreator(stream, userId);

    if (stream.type !== 'LIVE') {
      throw new BadRequestError('Only LIVE type streams can be started');
    }

    if (stream.status === 'LIVE') {
      throw new BadRequestError('Stream is already live');
    }

    if (stream.status === 'ENDED') {
      throw new BadRequestError('This stream has already ended');
    }

    // Generate or re-generate stream key
    const streamKeyValue = stream.streamKey ?? generateStreamKey();

    const updated = await prisma.stream.update({
      where: { id: streamId },
      data: {
        status: 'LIVE',
        startedAt: new Date(),
        streamKey: streamKeyValue,
      },
      include: STREAM_INCLUDE,
    });

    // Reset viewer count in Redis
    try {
      await redis.set(key('stream', streamId, 'viewers'), '0', 'EX', VIEWER_COUNT_TTL);
    } catch (redisErr) {
      logger.warn('Failed to reset Redis viewer count', {
        streamId,
        error: (redisErr as Error).message,
      });
    }

    logger.info('Live stream started', { streamId, userId });
    return updated;
  },

  // ---------------------------------------------------------------------------
  // endLiveStream
  // ---------------------------------------------------------------------------

  async endLiveStream(userId: string, streamId: string) {
    const stream = await findStream(streamId);
    assertCreator(stream, userId);

    if (stream.type !== 'LIVE') {
      throw new BadRequestError('Only LIVE type streams can be ended');
    }

    if (stream.status !== 'LIVE') {
      throw new BadRequestError('Stream is not currently live');
    }

    // Sync viewer count from Redis to DB before ending
    try {
      const viewerCountStr = await redis.get(key('stream', streamId, 'viewers'));
      const viewerCount = viewerCountStr ? parseInt(viewerCountStr, 10) : 0;
      if (!Number.isNaN(viewerCount) && viewerCount > 0) {
        await prisma.stream.update({
          where: { id: streamId },
          data: { viewerCount },
        });
      }
    } catch (redisErr) {
      logger.warn('Failed to sync viewer count from Redis', {
        streamId,
        error: (redisErr as Error).message,
      });
    }

    const now = new Date();
    const startedAt = stream.startedAt ?? now;

    const updated = await prisma.stream.update({
      where: { id: streamId },
      data: {
        status: 'ENDED',
        endedAt: now,
        // Calculate duration in seconds
        duration: Math.round((now.getTime() - startedAt.getTime()) / 1000),
      },
      include: STREAM_INCLUDE,
    });

    logger.info('Live stream ended', {
      streamId,
      userId,
      duration: updated.duration,
    });

    return updated;
  },

  // ---------------------------------------------------------------------------
  // toggleLike
  // ---------------------------------------------------------------------------

  async toggleLike(userId: string, streamId: string) {
    const stream = await findStream(streamId);

    // Check if like reaction already exists
    const existingReaction = await prisma.streamReaction.findUnique({
      where: {
        streamId_userId_type: { streamId, userId, type: 'like' },
      },
    });

    return prisma.$transaction(async (tx) => {
      if (existingReaction) {
        // Unlike: remove reaction and decrement count
        await tx.streamReaction.delete({
          where: { id: existingReaction.id },
        });
        await tx.stream.update({
          where: { id: streamId },
          data: { likeCount: { decrement: 1 } },
        });
        logger.debug('Stream unliked', { streamId, userId });
        return { liked: false };
      } else {
        // Like: add reaction and increment count
        await tx.streamReaction.create({
          data: {
            streamId,
            userId,
            type: 'like',
          },
        });
        await tx.stream.update({
          where: { id: streamId },
          data: { likeCount: { increment: 1 } },
        });
        logger.debug('Stream liked', { streamId, userId });
        return { liked: true };
      }
    });
  },

  // ---------------------------------------------------------------------------
  // toggleBookmark
  // ---------------------------------------------------------------------------

  async toggleBookmark(userId: string, streamId: string) {
    // Verify stream exists
    await findStream(streamId);

    const existing = await prisma.streamBookmark.findUnique({
      where: {
        streamId_userId: { streamId, userId },
      },
    });

    if (existing) {
      await prisma.streamBookmark.delete({
        where: { id: existing.id },
      });
      logger.debug('Stream unbookmarked', { streamId, userId });
      return { bookmarked: false };
    } else {
      await prisma.streamBookmark.create({
        data: { streamId, userId },
      });
      logger.debug('Stream bookmarked', { streamId, userId });
      return { bookmarked: true };
    }
  },

  // ---------------------------------------------------------------------------
  // getUserBookmarks
  // ---------------------------------------------------------------------------

  async getUserBookmarks(
    userId: string,
    cursor?: string,
    limit: number = 20,
  ) {
    const parsedLimit = Math.min(Math.max(limit, 1), 50);

    const where: Record<string, unknown> = {
      userId,
      stream: { deletedAt: null },
    };

    if (cursor) {
      (where as Record<string, unknown>).createdAt = { lt: new Date(cursor) };
    }

    const bookmarks = await prisma.streamBookmark.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parsedLimit + 1,
      include: BOOKMARK_INCLUDE,
    });

    const hasMore = bookmarks.length > parsedLimit;
    const items = hasMore ? bookmarks.slice(0, parsedLimit) : bookmarks;
    const nextCursor = hasMore
      ? items[items.length - 1].createdAt.toISOString()
      : null;

    return {
      items,
      nextCursor,
      hasMore,
    };
  },

  // ---------------------------------------------------------------------------
  // getComments
  // ---------------------------------------------------------------------------

  async getComments(
    streamId: string,
    cursor?: string,
    limit: number = 20,
  ) {
    // Verify stream exists
    await findStream(streamId);

    const parsedLimit = Math.min(Math.max(limit, 1), 100);

    const where: Record<string, unknown> = {
      streamId,
      isDeleted: false,
    };

    if (cursor) {
      (where as Record<string, unknown>).createdAt = { lt: new Date(cursor) };
    }

    const comments = await prisma.streamComment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parsedLimit + 1,
      include: COMMENT_INCLUDE,
    });

    const hasMore = comments.length > parsedLimit;
    const items = hasMore ? comments.slice(0, parsedLimit) : comments;
    const nextCursor = hasMore
      ? items[items.length - 1].createdAt.toISOString()
      : null;

    return {
      items: items.reverse(), // Chronological order
      nextCursor,
      hasMore,
    };
  },

  // ---------------------------------------------------------------------------
  // addComment
  // ---------------------------------------------------------------------------

  async addComment(userId: string, streamId: string, content: string) {
    const stream = await findStream(streamId);

    if (!stream.isCommentsOn) {
      throw new BadRequestError('Comments are disabled for this stream');
    }

    const comment = await prisma.$transaction(async (tx) => {
      const created = await tx.streamComment.create({
        data: {
          streamId,
          userId,
          content,
        },
        include: COMMENT_INCLUDE,
      });

      await tx.stream.update({
        where: { id: streamId },
        data: { commentCount: { increment: 1 } },
      });

      return created;
    });

    logger.debug('Stream comment added', {
      streamId,
      userId,
      commentId: comment.id,
    });

    return comment;
  },

  // ---------------------------------------------------------------------------
  // deleteComment
  // ---------------------------------------------------------------------------

  async deleteComment(
    userId: string,
    streamId: string,
    commentId: string,
  ) {
    const stream = await findStream(streamId);

    const comment = await prisma.streamComment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.streamId !== streamId) {
      throw new NotFoundError('Comment', commentId);
    }

    if (comment.isDeleted) {
      throw new BadRequestError('Comment has already been deleted');
    }

    // Only comment owner, stream creator, or admin can delete
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const isCommentOwner = comment.userId === userId;
    const isStreamCreator = stream.creatorId === userId;
    const isAdmin = user?.isStaff === true || user?.isSuperuser === true;

    if (!isCommentOwner && !isStreamCreator && !isAdmin) {
      throw new ForbiddenError('You do not have permission to delete this comment');
    }

    await prisma.$transaction(async (tx) => {
      await tx.streamComment.update({
        where: { id: commentId },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          content: '[deleted]',
        },
      });

      await tx.stream.update({
        where: { id: streamId },
        data: { commentCount: { decrement: 1 } },
      });
    });

    logger.debug('Stream comment deleted', {
      streamId,
      commentId,
      deletedBy: userId,
    });

    return { success: true, message: 'Comment deleted' };
  },

  // ---------------------------------------------------------------------------
  // addReaction
  // ---------------------------------------------------------------------------

  async addReaction(userId: string, streamId: string, type: string) {
    await findStream(streamId);

    try {
      await prisma.streamReaction.create({
        data: { streamId, userId, type },
      });
      logger.debug('Stream reaction added', { streamId, userId, type });
      return { reacted: true };
    } catch {
      // Unique constraint violation → already reacted with this type
      return { reacted: false, message: 'Already reacted with this type' };
    }
  },

  // ---------------------------------------------------------------------------
  // removeReaction
  // ---------------------------------------------------------------------------

  async removeReaction(userId: string, streamId: string, type: string) {
    await findStream(streamId);

    const reaction = await prisma.streamReaction.findUnique({
      where: {
        streamId_userId_type: { streamId, userId, type },
      },
    });

    if (!reaction) {
      return { removed: false, message: 'Reaction not found' };
    }

    await prisma.streamReaction.delete({
      where: { id: reaction.id },
    });

    logger.debug('Stream reaction removed', { streamId, userId, type });
    return { removed: true };
  },

  // ---------------------------------------------------------------------------
  // getViewerCount (from Redis)
  // ---------------------------------------------------------------------------

  async getViewerCount(streamId: string): Promise<number> {
    try {
      const countStr = await redis.get(key('stream', streamId, 'viewers'));
      return countStr ? parseInt(countStr, 10) : 0;
    } catch (redisErr) {
      logger.warn('Failed to get viewer count from Redis', {
        streamId,
        error: (redisErr as Error).message,
      });
      // Fallback: return DB value
      const stream = await prisma.stream.findUnique({
        where: { id: streamId },
        select: { viewerCount: true },
      });
      return stream?.viewerCount ?? 0;
    }
  },

  // ---------------------------------------------------------------------------
  // incrementViewerCount
  // ---------------------------------------------------------------------------

  async incrementViewerCount(streamId: string): Promise<number> {
    try {
      const newCount = await redis.incr(key('stream', streamId, 'viewers'));
      // Set TTL on first increment
      if (newCount === 1) {
        await redis.expire(key('stream', streamId, 'viewers'), VIEWER_COUNT_TTL);
      }
      return newCount;
    } catch (redisErr) {
      logger.warn('Failed to increment viewer count in Redis', {
        streamId,
        error: (redisErr as Error).message,
      });
      return 0;
    }
  },

  // ---------------------------------------------------------------------------
  // decrementViewerCount
  // ---------------------------------------------------------------------------

  async decrementViewerCount(streamId: string): Promise<number> {
    try {
      const viewerKey = key('stream', streamId, 'viewers');
      const current = await redis.get(viewerKey);
      if (!current || parseInt(current, 10) <= 0) {
        return 0;
      }
      const newCount = await redis.decr(viewerKey);
      return Math.max(newCount, 0);
    } catch (redisErr) {
      logger.warn('Failed to decrement viewer count in Redis', {
        streamId,
        error: (redisErr as Error).message,
      });
      return 0;
    }
  },

  // ---------------------------------------------------------------------------
  // searchStreams
  // ---------------------------------------------------------------------------

  async searchStreams(
    query: string,
    cursor?: string,
    limit: number = 20,
  ) {
    const parsedLimit = Math.min(Math.max(limit, 1), 50);

    const cursorCondition = cursor
      ? { createdAt: { lt: new Date(cursor) } }
      : {};

    const streams = await prisma.stream.findMany({
      where: {
        deletedAt: null,
        status: { in: ['PUBLISHED', 'LIVE', 'ENDED'] as const },
        isPublic: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' as const } },
          { description: { contains: query, mode: 'insensitive' as const } },
        ],
        ...cursorCondition,
      },
      orderBy: { createdAt: 'desc' },
      take: parsedLimit + 1,
      include: STREAM_INCLUDE,
    });

    const hasMore = streams.length > parsedLimit;
    const items = hasMore ? streams.slice(0, parsedLimit) : streams;
    const nextCursor = hasMore
      ? items[items.length - 1].createdAt.toISOString()
      : null;

    return {
      items,
      nextCursor,
      hasMore,
      query,
    };
  },
};
