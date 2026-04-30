// =============================================================================
// Honey — Call / Meeting Routes
// =============================================================================
// Express router for the meeting module. All routes require authentication.
// =============================================================================

import { Router } from 'express';
import { authRequired } from '../../../middleware';
import { callController } from '../controllers/call.controller';

const router = Router();

// All call routes require authentication
router.use(authRequired);

// ─── Meeting CRUD ────────────────────────────────────────────────────────────

router.post('/', callController.createMeeting);
router.get('/:id', callController.getMeeting);
router.patch('/:id', callController.updateMeeting);
router.delete('/:id', callController.cancelMeeting);

// ─── Meeting Lifecycle ───────────────────────────────────────────────────────

router.post('/:id/start', callController.startMeeting);
router.post('/:id/end', callController.endMeeting);

// ─── Join / Leave ────────────────────────────────────────────────────────────

router.post('/join', callController.joinMeeting);
router.post('/:id/leave', callController.leaveMeeting);

// ─── Participants ────────────────────────────────────────────────────────────

router.get('/:id/participants', callController.getParticipants);
router.post('/:id/approve/:participantId', callController.approveParticipant);
router.post('/:id/reject/:participantId', callController.rejectParticipant);
router.post('/:id/kick/:userId', callController.kickParticipant);
router.post('/:id/mute/:userId', callController.muteParticipant);
router.post('/:id/promote/:userId', callController.promoteToCoHost);

// ─── Self Controls ───────────────────────────────────────────────────────────

router.post('/:id/self-mute', callController.toggleSelfMute);
router.post('/:id/self-camera', callController.toggleSelfCamera);

// ─── Meeting Chat ────────────────────────────────────────────────────────────

router.get('/:id/chat', callController.getMeetingChat);
router.post('/:id/chat', callController.sendMeetingChat);

export { router as callRoutes };
