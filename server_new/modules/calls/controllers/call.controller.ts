// =============================================================================
// Honey — Call / Meeting Controller
// =============================================================================
// Express request handlers for the meeting module. No `any`.
// =============================================================================

import type { Request, Response, NextFunction } from 'express';
import { callService } from '../services/call.service';
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

export const callController = {
  // ---------------------------------------------------------------------------
  // createMeeting
  // ---------------------------------------------------------------------------

  createMeeting: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meeting = await callService.createMeeting(userId, req.body);
    res.status(201).json({ success: true, data: meeting });
  }),

  // ---------------------------------------------------------------------------
  // getMeeting
  // ---------------------------------------------------------------------------

  getMeeting: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const meeting = await callService.getMeeting(userId, meetingId);
    res.json({ success: true, data: meeting });
  }),

  // ---------------------------------------------------------------------------
  // updateMeeting
  // ---------------------------------------------------------------------------

  updateMeeting: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const meeting = await callService.updateMeeting(userId, meetingId, req.body);
    res.json({ success: true, data: meeting });
  }),

  // ---------------------------------------------------------------------------
  // cancelMeeting
  // ---------------------------------------------------------------------------

  cancelMeeting: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const meeting = await callService.cancelMeeting(userId, meetingId);
    res.json({ success: true, data: meeting });
  }),

  // ---------------------------------------------------------------------------
  // startMeeting
  // ---------------------------------------------------------------------------

  startMeeting: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const meeting = await callService.startMeeting(userId, meetingId);
    res.json({ success: true, data: meeting });
  }),

  // ---------------------------------------------------------------------------
  // endMeeting
  // ---------------------------------------------------------------------------

  endMeeting: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const meeting = await callService.endMeeting(userId, meetingId);
    res.json({ success: true, data: meeting });
  }),

  // ---------------------------------------------------------------------------
  // joinMeeting
  // ---------------------------------------------------------------------------

  joinMeeting: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const { meetingLink } = req.body;

    if (!meetingLink || typeof meetingLink !== 'string') {
      throw new ValidationError('meetingLink is required');
    }

    const meeting = await callService.joinMeeting(userId, meetingLink);
    res.status(200).json({ success: true, data: meeting });
  }),

  // ---------------------------------------------------------------------------
  // getParticipants
  // ---------------------------------------------------------------------------

  getParticipants: asyncHandler(async (req: Request, res: Response) => {
    const meetingId = req.params.id;
    const participants = await callService.getParticipants(meetingId);
    res.json({ success: true, data: participants });
  }),

  // ---------------------------------------------------------------------------
  // approveParticipant
  // ---------------------------------------------------------------------------

  approveParticipant: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const participantId = req.params.participantId;
    const participant = await callService.approveParticipant(userId, meetingId, participantId);
    res.json({ success: true, data: participant });
  }),

  // ---------------------------------------------------------------------------
  // rejectParticipant
  // ---------------------------------------------------------------------------

  rejectParticipant: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const participantId = req.params.participantId;
    const participant = await callService.rejectParticipant(userId, meetingId, participantId);
    res.json({ success: true, data: participant });
  }),

  // ---------------------------------------------------------------------------
  // leaveMeeting
  // ---------------------------------------------------------------------------

  leaveMeeting: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const result = await callService.leaveMeeting(userId, meetingId);
    res.json({ success: true, data: result });
  }),

  // ---------------------------------------------------------------------------
  // kickParticipant
  // ---------------------------------------------------------------------------

  kickParticipant: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const targetUserId = req.params.userId;
    const participant = await callService.kickParticipant(userId, meetingId, targetUserId);
    res.json({ success: true, data: participant });
  }),

  // ---------------------------------------------------------------------------
  // muteParticipant
  // ---------------------------------------------------------------------------

  muteParticipant: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const targetUserId = req.params.userId;
    const participant = await callService.muteParticipant(userId, meetingId, targetUserId);
    res.json({ success: true, data: participant });
  }),

  // ---------------------------------------------------------------------------
  // toggleSelfMute
  // ---------------------------------------------------------------------------

  toggleSelfMute: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const { isMuted } = req.body;

    if (typeof isMuted !== 'boolean') {
      throw new ValidationError('isMuted must be a boolean');
    }

    const participant = await callService.toggleSelfMute(userId, meetingId, isMuted);
    res.json({ success: true, data: participant });
  }),

  // ---------------------------------------------------------------------------
  // toggleSelfCamera
  // ---------------------------------------------------------------------------

  toggleSelfCamera: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const { isCameraOff } = req.body;

    if (typeof isCameraOff !== 'boolean') {
      throw new ValidationError('isCameraOff must be a boolean');
    }

    const participant = await callService.toggleSelfCamera(userId, meetingId, isCameraOff);
    res.json({ success: true, data: participant });
  }),

  // ---------------------------------------------------------------------------
  // promoteToCoHost
  // ---------------------------------------------------------------------------

  promoteToCoHost: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const targetUserId = req.params.userId;
    const participant = await callService.promoteToCoHost(userId, meetingId, targetUserId);
    res.json({ success: true, data: participant });
  }),

  // ---------------------------------------------------------------------------
  // getMeetingChat
  // ---------------------------------------------------------------------------

  getMeetingChat: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const cursor = req.query.cursor as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;

    const result = await callService.getMeetingChat(userId, meetingId, cursor, limit);
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
  // sendMeetingChat
  // ---------------------------------------------------------------------------

  sendMeetingChat: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;
    const meetingId = req.params.id;
    const { content } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      throw new ValidationError('Message content is required');
    }

    if (content.length > 2000) {
      throw new ValidationError('Message must be at most 2000 characters');
    }

    const message = await callService.sendMeetingChat(userId, meetingId, { content: content.trim() });
    res.status(201).json({ success: true, data: message });
  }),
};
