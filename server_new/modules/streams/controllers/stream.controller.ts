// =============================================================================
// Honey — Stream Controller
// =============================================================================
// Express request handlers for the stream module. No `any`.
// =============================================================================

import type { Request, Response, NextFunction } from 'express';
import { streamService } from '../services/stream.service';
import { ValidationError } from '../../../errors';
import type { AuthenticatedRequest } from '../../../types';

// =============================================================================
// Type-safe handler wrapper
// =============================================================================

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

function asyncHandler(fn: AsyncRequestHandler): AsyncRequestHandler {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// =============================================================================
// Controllers
// =============================================================================

export const streamController = {
  // ---------------------------------------------------------------------------
  // getStreams (feed) — supports optional auth
  // ---------------------------------------------------------------------------

  getStreams: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user ? (req as AuthenticatedRequest).user.id : undefined;
    const filters = {
      cursor: req.query.cursor as string | undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
      type: req.query.type as 'VIDEO' | 'LIVE' | 'SHORT' | undefined,
      category: req.query.category as string | undefined,
      creatorId: req.query.creatorId as string | undefined,
      sortBy: req.query.sortBy as 'latest' | 'popular' | undefined,
    };

    const result = await streamService.getStreams(userId, filters);
    res.json({
      success: true,
      data: result.items,
      meta: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
      },
    });
  }),

  // ---------------------------------------------------------------------------
  // createStream
  // ---------------------------------------------------------------------------

  createStream: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const stream = await streamService.createStream(userId, req.body);
    res.status(201).json({ success: true, data: stream });
  }),

  // ---------------------------------------------------------------------------
  // searchStreams — supports optional auth
  // ---------------------------------------------------------------------------

  searchStreams: asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.q as string | undefined;

    if (!query || query.trim().length === 0) {
      throw new ValidationError('Search query "q" is required');
    }

    const cursor = req.query.cursor as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;

    const result = await streamService.searchStreams(query.trim(), cursor, limit);
    res.json({
      success: true,
      data: result.items,
      meta: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
        query: result.query,
      },
    });
  }),

  // ---------------------------------------------------------------------------
  // getStream — supports optional auth
  // ---------------------------------------------------------------------------

  getStream: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user ? (req as AuthenticatedRequest).user.id : undefined;
    const streamId = req.params.id;
    const stream = await streamService.getStream(userId, streamId);
    res.json({ success: true, data: stream });
  }),

  // ---------------------------------------------------------------------------
  // updateStream
  // ---------------------------------------------------------------------------

  updateStream: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const stream = await streamService.updateStream(userId, streamId, req.body);
    res.json({ success: true, data: stream });
  }),

  // ---------------------------------------------------------------------------
  // deleteStream
  // ---------------------------------------------------------------------------

  deleteStream: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const stream = await streamService.deleteStream(userId, streamId);
    res.json({ success: true, data: stream });
  }),

  // ---------------------------------------------------------------------------
  // startLiveStream
  // ---------------------------------------------------------------------------

  startLiveStream: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const stream = await streamService.startLiveStream(userId, streamId);
    res.json({ success: true, data: stream });
  }),

  // ---------------------------------------------------------------------------
  // endLiveStream
  // ---------------------------------------------------------------------------

  endLiveStream: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const stream = await streamService.endLiveStream(userId, streamId);
    res.json({ success: true, data: stream });
  }),

  // ---------------------------------------------------------------------------
  // toggleLike
  // ---------------------------------------------------------------------------

  toggleLike: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const result = await streamService.toggleLike(userId, streamId);
    res.json({ success: true, data: result });
  }),

  // ---------------------------------------------------------------------------
  // toggleBookmark
  // ---------------------------------------------------------------------------

  toggleBookmark: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const result = await streamService.toggleBookmark(userId, streamId);
    res.json({ success: true, data: result });
  }),

  // ---------------------------------------------------------------------------
  // getComments
  // ---------------------------------------------------------------------------

  getComments: asyncHandler(async (req: Request, res: Response) => {
    const streamId = req.params.id;
    const cursor = req.query.cursor as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    const result = await streamService.getComments(streamId, cursor, limit);
    res.json({
      success: true,
      data: result.items,
      meta: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
      },
    });
  }),

  // ---------------------------------------------------------------------------
  // addComment
  // ---------------------------------------------------------------------------

  addComment: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const { content } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      throw new ValidationError('Comment content is required');
    }

    if (content.trim().length > 1000) {
      throw new ValidationError('Comment must be at most 1000 characters');
    }

    const comment = await streamService.addComment(userId, streamId, content.trim());
    res.status(201).json({ success: true, data: comment });
  }),

  // ---------------------------------------------------------------------------
  // deleteComment
  // ---------------------------------------------------------------------------

  deleteComment: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const commentId = req.params.commentId;
    const result = await streamService.deleteComment(userId, streamId, commentId);
    res.json({ success: true, data: result });
  }),

  // ---------------------------------------------------------------------------
  // addReaction
  // ---------------------------------------------------------------------------

  addReaction: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const { type } = req.body;

    if (!type || typeof type !== 'string' || type.trim().length === 0) {
      throw new ValidationError('Reaction type is required');
    }

    if (type.trim().length > 32) {
      throw new ValidationError('Reaction type must be at most 32 characters');
    }

    const result = await streamService.addReaction(userId, streamId, type.trim());
    res.json({ success: true, data: result });
  }),

  // ---------------------------------------------------------------------------
  // removeReaction
  // ---------------------------------------------------------------------------

  removeReaction: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const streamId = req.params.id;
    const type = req.query.type as string | undefined;

    if (!type || typeof type !== 'string' || type.trim().length === 0) {
      throw new ValidationError('Reaction type (query param "type") is required');
    }

    const result = await streamService.removeReaction(userId, streamId, type.trim());
    res.json({ success: true, data: result });
  }),

  // ---------------------------------------------------------------------------
  // getUserBookmarks
  // ---------------------------------------------------------------------------

  getUserBookmarks: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const cursor = req.query.cursor as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    const result = await streamService.getUserBookmarks(userId, cursor, limit);
    res.json({
      success: true,
      data: result.items,
      meta: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
      },
    });
  }),

  // ---------------------------------------------------------------------------
  // getViewerCount
  // ---------------------------------------------------------------------------

  getViewerCount: asyncHandler(async (req: Request, res: Response) => {
    const streamId = req.params.id;
    const count = await streamService.getViewerCount(streamId);
    res.json({ success: true, data: { streamId, viewerCount: count } });
  }),
};
