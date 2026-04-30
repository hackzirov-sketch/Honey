// =============================================================================
// Honey — Stream DTOs
// =============================================================================
// Zod validation schemas for the stream module. No `any`.
// =============================================================================

import { z } from 'zod';

// ─── Create Stream ───────────────────────────────────────────────────────────

export const CreateStreamDtoSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be at most 200 characters'),
  description: z
    .string()
    .max(2000, 'Description must be at most 2000 characters')
    .optional(),
  type: z.enum(['VIDEO', 'LIVE', 'SHORT'], {
    errorMap: () => ({ message: 'Type must be one of: VIDEO, LIVE, SHORT' }),
  }),
  category: z
    .string()
    .max(100, 'Category must be at most 100 characters')
    .optional(),
  tags: z
    .array(
      z.string().max(50, 'Each tag must be at most 50 characters'),
    )
    .max(20, 'Maximum 20 tags allowed')
    .optional(),
  isPublic: z.boolean().optional(),
});

export type CreateStreamDto = z.infer<typeof CreateStreamDtoSchema>;

// ─── Update Stream ───────────────────────────────────────────────────────────

export const UpdateStreamDtoSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be at most 200 characters')
    .optional(),
  description: z
    .string()
    .max(2000, 'Description must be at most 2000 characters')
    .optional(),
  category: z
    .string()
    .max(100, 'Category must be at most 100 characters')
    .optional(),
  tags: z
    .array(
      z.string().max(50, 'Each tag must be at most 50 characters'),
    )
    .max(20, 'Maximum 20 tags allowed')
    .optional(),
  isPublic: z.boolean().optional(),
  isCommentsOn: z.boolean().optional(),
  thumbnailUrl: z
    .string()
    .url('Invalid thumbnail URL')
    .max(512, 'Thumbnail URL must be at most 512 characters')
    .optional()
    .or(z.literal('')),
});

export type UpdateStreamDto = z.infer<typeof UpdateStreamDtoSchema>;

// ─── Get Streams (feed) ──────────────────────────────────────────────────────

export const GetStreamsDtoSchema = z.object({
  cursor: z.string().optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(20)
    .optional(),
  type: z.enum(['VIDEO', 'LIVE', 'SHORT']).optional(),
  category: z.string().max(100).optional(),
  creatorId: z.string().uuid().optional(),
  sortBy: z.enum(['latest', 'popular']).optional(),
});

export type GetStreamsDto = z.infer<typeof GetStreamsDtoSchema>;

// ─── Create Comment ──────────────────────────────────────────────────────────

export const CreateCommentDtoSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment must be at least 1 character')
    .max(1000, 'Comment must be at most 1000 characters'),
});

export type CreateCommentDto = z.infer<typeof CreateCommentDtoSchema>;

// ─── Stream Reaction ─────────────────────────────────────────────────────────

export const StreamReactionDtoSchema = z.object({
  type: z
    .string()
    .min(1, 'Reaction type is required')
    .max(32, 'Reaction type must be at most 32 characters'),
});

export type StreamReactionDto = z.infer<typeof StreamReactionDtoSchema>;
