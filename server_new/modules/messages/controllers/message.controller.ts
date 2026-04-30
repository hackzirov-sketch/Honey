import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { messageService, type EmitFunction } from '../services/message.service';
import {
  sendMessageSchema,
  editMessageSchema,
  reactToMessageSchema,
  removeReactionSchema,
  getMessagesSchema,
  searchMessagesSchema,
} from '../dto/message.dto';
import { forwardMessageSchema, markAsReadSchema } from '../../conversations/dto/conversation.dto';
import type { AuthenticatedRequest } from '../../../types';

// ─── Helpers ────────────────────────────────────────────────────────────────

function getUserId(req: Request): string {
  const user = req.user as AuthenticatedRequest['user'];
  return user.id;
}

function parseBody<T>(schema: { parse: (data: unknown) => T }, body: unknown): T {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues.map((i) => i.message).join(', ');
      throw Object.assign(new Error(message), { status: 422, code: 'VALIDATION_ERROR' });
    }
    throw error;
  }
}

function parseQuery<T>(schema: { parse: (data: unknown) => T }, query: unknown): T {
  try {
    return schema.parse(query);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues.map((i) => i.message).join(', ');
      throw Object.assign(new Error(message), { status: 422, code: 'VALIDATION_ERROR' });
    }
    throw error;
  }
}

/**
 * Create an emit function from the Socket.IO instance attached to the Express app.
 * Falls back to a no-op if Socket.IO is not available.
 */
function createEmitFn(req: Request): EmitFunction {
  // The Socket.IO instance is expected to be on app.get('io') or req.app.get('io')
  const io = req.app.get('io') as
    | { to: (room: string) => { emit: (event: string, data: unknown) => void }; emit: (event: string, data: unknown) => void }
    | undefined;

  if (!io) {
    // No-op emit for environments without Socket.IO
    return (_event: string, _data: unknown) => {};
  }

  return (event: string, data: unknown) => {
    // If the data has a conversationId, emit to that room
    const payload = data as Record<string, unknown> | null;
    if (payload && typeof payload === 'object' && 'conversationId' in payload) {
      const room = `conversation:${payload.conversationId as string}`;
      io.to(room).emit(event, data);
    } else {
      io.emit(event, data);
    }
  };
}

// ─── Controller ─────────────────────────────────────────────────────────────

export const messageController = {
  /**
   * GET /:conversationId → get messages (with cursor pagination)
   */
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { conversationId } = req.params;
      const { cursor, limit } = parseQuery(getMessagesSchema, req.query);

      const result = await messageService.getMessages(
        userId,
        conversationId,
        cursor,
        Number(limit),
      );

      res.json({
        success: true,
        data: result.items,
        meta: {
          nextCursor: result.nextCursor,
          hasMore: result.hasMore,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /:conversationId → send message
   */
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { conversationId } = req.params;
      const data = parseBody(sendMessageSchema, req.body);
      const emit = createEmitFn(req);

      const message = await messageService.sendMessage(userId, conversationId, data, emit);

      res.status(201).json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /:messageId → edit message
   */
  async editMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { messageId } = req.params;
      const data = parseBody(editMessageSchema, req.body);
      const emit = createEmitFn(req);

      const message = await messageService.editMessage(userId, messageId, data, emit);
      res.json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /:messageId → soft-delete message
   */
  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { messageId } = req.params;
      const emit = createEmitFn(req);

      const result = await messageService.deleteMessage(userId, messageId, emit);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /:messageId/reactions → react to message
   */
  async reactToMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { messageId } = req.params;
      const data = parseBody(reactToMessageSchema, req.body);
      const emit = createEmitFn(req);

      const result = await messageService.reactToMessage(userId, messageId, data, emit);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /:messageId/reactions → remove reaction (query param: emoji)
   */
  async removeReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { messageId } = req.params;
      const { emoji } = parseQuery(removeReactionSchema, req.query);
      const emit = createEmitFn(req);

      const result = await messageService.reactToMessage(
        userId,
        messageId,
        { emoji },
        emit,
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /:messageId/pin → pin message
   */
  async pinMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { messageId } = req.params;
      const { conversationId } = req.body as { conversationId: string };
      const emit = createEmitFn(req);

      if (!conversationId) {
        const err = new Error('conversationId is required in request body');
        Object.assign(err, { status: 422, code: 'VALIDATION_ERROR' });
        throw err;
      }

      const pinned = await messageService.pinMessage(userId, conversationId, messageId, emit);
      res.status(201).json({ success: true, data: pinned });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /:messageId/pin → unpin message
   */
  async unpinMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { messageId } = req.params;
      const { conversationId } = req.body as { conversationId: string };
      const emit = createEmitFn(req);

      if (!conversationId) {
        const err = new Error('conversationId is required in request body');
        Object.assign(err, { status: 422, code: 'VALIDATION_ERROR' });
        throw err;
      }

      const result = await messageService.unpinMessage(userId, conversationId, messageId, emit);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /:conversationId/search → search messages (query param: q)
   */
  async searchMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { conversationId } = req.params;
      const { q } = parseQuery(searchMessagesSchema, req.query);

      const messages = await messageService.searchMessages(userId, conversationId, q);
      res.json({ success: true, data: messages });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /:messageId/forward → forward message (body: { targetConversationId })
   */
  async forwardMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { messageId } = req.params;
      const { targetConversationId } = parseBody(forwardMessageSchema, req.body);
      const emit = createEmitFn(req);

      const message = await messageService.forwardMessage(
        userId,
        messageId,
        targetConversationId,
        emit,
      );

      res.status(201).json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /:conversationId/read → mark as read (body: { messageId })
   */
  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { conversationId } = req.params;
      const { messageId } = parseBody(markAsReadSchema, req.body);

      const result = await messageService.markAsRead(userId, conversationId, messageId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};
