import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { conversationService } from '../services/conversation.service';
import {
  createConversationSchema,
  updateConversationSchema,
  joinByInviteSchema,
  addMemberSchema,
  updateMemberSchema,
  toggleMuteSchema,
} from '../dto/conversation.dto';
import type { AuthenticatedRequest } from '../../../types';

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

export const conversationController = {
  /**
   * GET / → list conversations
   */
  async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const cursor = req.query.cursor as string | undefined;
      const limit = parseInt(req.query.limit as string, 10) || 50;

      const result = await conversationService.getConversations(userId, cursor, limit);
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
   * POST / → create conversation
   */
  async createConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const data = parseBody(createConversationSchema, req.body);

      const conversation = await conversationService.createConversation(userId, data);
      res.status(201).json({ success: true, data: conversation });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /join-invite → join by invite link
   */
  async joinByInvite(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const data = parseBody(joinByInviteSchema, req.body);

      const conversation = await conversationService.joinByInvite(userId, data);
      res.status(201).json({ success: true, data: conversation });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /:id → get single conversation
   */
  async getConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id } = req.params;

      const conversation = await conversationService.getConversation(userId, id);
      res.json({ success: true, data: conversation });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /:id → update conversation
   */
  async updateConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const data = parseBody(updateConversationSchema, req.body);

      const conversation = await conversationService.updateConversation(userId, id, data);
      res.json({ success: true, data: conversation });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /:id → delete/leave conversation
   */
  async deleteConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id } = req.params;

      await conversationService.leaveConversation(userId, id);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /:id/members → add member
   */
  async addMember(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const data = parseBody(addMemberSchema, req.body);

      const member = await conversationService.addMember(userId, id, data.userId, {
        role: data.role,
      });
      res.status(201).json({ success: true, data: member });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /:id/members/:userId → remove member
   */
  async removeMember(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id, userId: targetUserId } = req.params;

      await conversationService.removeMember(userId, id, targetUserId);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /:id/members/:userId → update member role
   */
  async updateMember(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id, userId: targetUserId } = req.params;
      const data = parseBody(updateMemberSchema, req.body);

      const member = await conversationService.updateMemberRole(userId, id, targetUserId, data);
      res.json({ success: true, data: member });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /:id/mute → toggle mute
   */
  async toggleMute(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const data = parseBody(toggleMuteSchema, req.body);

      const member = await conversationService.toggleMute(userId, id, data);
      res.json({ success: true, data: member });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /block/:userId → block user
   */
  async blockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { userId: targetUserId } = req.params;

      await conversationService.blockUser(userId, targetUserId);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /block/:userId → unblock user
   */
  async unblockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { userId: targetUserId } = req.params;

      await conversationService.unblockUser(userId, targetUserId);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /blocked → list blocked users
   */
  async getBlockedUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);

      const blocks = await conversationService.getBlockedUsers(userId);
      res.json({ success: true, data: blocks });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /:id/archive → toggle archive
   */
  async archiveConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id } = req.params;

      const result = await conversationService.archiveConversation(userId, id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};
