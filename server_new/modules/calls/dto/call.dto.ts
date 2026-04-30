// =============================================================================
// Honey — Call / Meeting DTOs
// =============================================================================
// Zod validation schemas for the meeting module. No `any`.
// =============================================================================

import { z } from 'zod';

// ─── Create Meeting ──────────────────────────────────────────────────────────

export const CreateMeetingDtoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must be at least 1 character')
    .max(200, 'Title must be at most 200 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be at most 500 characters')
    .optional(),
  scheduledAt: z
    .string()
    .datetime({ offset: true })
    .or(z.date())
    .optional()
    .transform((val) => (typeof val === 'string' ? new Date(val) : val)),
  maxParticipants: z
    .number()
    .int()
    .min(1, 'Must allow at least 1 participant')
    .max(500, 'Maximum 500 participants allowed')
    .optional(),
  waitingRoom: z.boolean().optional(),
});

export type CreateMeetingDto = z.infer<typeof CreateMeetingDtoSchema>;

// ─── Update Meeting ──────────────────────────────────────────────────────────

export const UpdateMeetingDtoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must be at least 1 character')
    .max(200, 'Title must be at most 200 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be at most 500 characters')
    .optional(),
  scheduledAt: z
    .string()
    .datetime({ offset: true })
    .or(z.date())
    .nullable()
    .optional()
    .transform((val) => (typeof val === 'string' ? new Date(val) : val)),
  maxParticipants: z
    .number()
    .int()
    .min(1, 'Must allow at least 1 participant')
    .max(500, 'Maximum 500 participants allowed')
    .optional(),
  waitingRoom: z.boolean().optional(),
});

export type UpdateMeetingDto = z.infer<typeof UpdateMeetingDtoSchema>;

// ─── Join Meeting ────────────────────────────────────────────────────────────

export const JoinMeetingDtoSchema = z.object({
  meetingLink: z
    .string()
    .min(1, 'Meeting link is required')
    .max(64, 'Invalid meeting link'),
});

export type JoinMeetingDto = z.infer<typeof JoinMeetingDtoSchema>;

// ─── Toggle Self Mute ────────────────────────────────────────────────────────

export const ToggleSelfMuteDtoSchema = z.object({
  isMuted: z.boolean(),
});

export type ToggleSelfMuteDto = z.infer<typeof ToggleSelfMuteDtoSchema>;

// ─── Toggle Self Camera ──────────────────────────────────────────────────────

export const ToggleSelfCameraDtoSchema = z.object({
  isCameraOff: z.boolean(),
});

export type ToggleSelfCameraDto = z.infer<typeof ToggleSelfCameraDtoSchema>;

// ─── Send Meeting Chat ───────────────────────────────────────────────────────

export const SendMeetingChatDtoSchema = z.object({
  content: z
    .string()
    .min(1, 'Message content is required')
    .max(2000, 'Message must be at most 2000 characters'),
});

export type SendMeetingChatDto = z.infer<typeof SendMeetingChatDtoSchema>;
