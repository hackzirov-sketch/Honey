import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { messageController } from '../controllers/message.controller';

/**
 * Authentication middleware.
 * Assumes `req.user` is set by upstream middleware (e.g., JWT verification).
 */
function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    const err = new Error('Authentication required');
    Object.assign(err, { status: 401, code: 'UNAUTHORIZED' });
    next(err);
    return;
  }
  next();
}

const router = Router();

// All routes require authentication
router.use(requireAuth);

// ─── Message CRUD ──────────────────────────────────────────────────────
router.get('/:conversationId', messageController.getMessages);
router.post('/:conversationId', messageController.sendMessage);
router.patch('/:messageId', messageController.editMessage);
router.delete('/:messageId', messageController.deleteMessage);

// ─── Reactions ─────────────────────────────────────────────────────────
router.post('/:messageId/reactions', messageController.reactToMessage);
router.delete('/:messageId/reactions', messageController.removeReaction);

// ─── Pins ──────────────────────────────────────────────────────────────
router.post('/:messageId/pin', messageController.pinMessage);
router.delete('/:messageId/pin', messageController.unpinMessage);

// ─── Search ────────────────────────────────────────────────────────────
router.get('/:conversationId/search', messageController.searchMessages);

// ─── Forward ───────────────────────────────────────────────────────────
router.post('/:messageId/forward', messageController.forwardMessage);

// ─── Read Receipts ─────────────────────────────────────────────────────
router.post('/:conversationId/read', messageController.markAsRead);

export const messageRoutes = router;
export default router;
