import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { conversationController } from '../controllers/conversation.controller';
import type { AuthenticatedRequest } from '../../../types';

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

// All routes require authentication except join-invite
router.use(requireAuth);

// ─── Block / Unblock (must be before /:id to avoid route shadowing) ────
router.post('/block/:userId', conversationController.blockUser);
router.delete('/block/:userId', conversationController.unblockUser);
router.get('/blocked', conversationController.getBlockedUsers);

// ─── Conversation CRUD ──────────────────────────────────────────────────
router.get('/', conversationController.getConversations);
router.post('/', conversationController.createConversation);
router.post('/join-invite', conversationController.joinByInvite);
router.get('/:id', conversationController.getConversation);
router.patch('/:id', conversationController.updateConversation);
router.delete('/:id', conversationController.deleteConversation);

// ─── Members ────────────────────────────────────────────────────────────
router.post('/:id/members', conversationController.addMember);
router.delete('/:id/members/:userId', conversationController.removeMember);
router.patch('/:id/members/:userId', conversationController.updateMember);

// ─── Mute ───────────────────────────────────────────────────────────────
router.patch('/:id/mute', conversationController.toggleMute);

// ─── Archive ────────────────────────────────────────────────────────────
router.patch('/:id/archive', conversationController.archiveConversation);

export const conversationRoutes = router;
export default router;
