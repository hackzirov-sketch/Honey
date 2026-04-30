// =============================================================================
// Honey — Stream Routes
// =============================================================================
// Express router for the stream module.
// GET / (feed) and GET /search support optional auth;
// all other routes require authentication.
// =============================================================================

import { Router } from 'express';
import { authRequired, optionalAuth } from '../../../middleware';
import { streamController } from '../controllers/stream.controller';

const router = Router();

// ─── Public / Optional Auth ──────────────────────────────────────────────────

// GET / → list streams (feed) — optional auth for bookmark status
router.get('/', optionalAuth, streamController.getStreams);

// GET /search → search streams — optional auth
router.get('/search', optionalAuth, streamController.searchStreams);

// GET /bookmarks → user's bookmarked streams — requires auth
router.get('/bookmarks', authRequired, streamController.getUserBookmarks);

// ─── Require Auth ────────────────────────────────────────────────────────────

router.use(authRequired);

// ─── Stream CRUD ─────────────────────────────────────────────────────────────

router.post('/', streamController.createStream);
router.get('/:id', streamController.getStream);
router.patch('/:id', streamController.updateStream);
router.delete('/:id', streamController.deleteStream);

// ─── Live Stream Controls ────────────────────────────────────────────────────

router.post('/:id/start-live', streamController.startLiveStream);
router.post('/:id/end-live', streamController.endLiveStream);

// ─── Interactions ────────────────────────────────────────────────────────────

router.post('/:id/like', streamController.toggleLike);
router.post('/:id/bookmark', streamController.toggleBookmark);
router.get('/:id/viewers', streamController.getViewerCount);

// ─── Comments ────────────────────────────────────────────────────────────────

router.get('/:id/comments', streamController.getComments);
router.post('/:id/comments', streamController.addComment);
router.delete('/:id/comments/:commentId', streamController.deleteComment);

// ─── Reactions ───────────────────────────────────────────────────────────────

router.post('/:id/reactions', streamController.addReaction);
router.delete('/:id/reactions', streamController.removeReaction);

export { router as streamRoutes };
