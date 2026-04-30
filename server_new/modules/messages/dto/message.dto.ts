import { z } from 'zod';

const uuid = z.string().uuid();

// ─── Send Message ───────────────────────────────────────────────────────────

const attachmentSchema = z.object({
  fileId: uuid,
  type: z.enum(['IMAGE', 'VIDEO', 'AUDIO', 'FILE']),
});

export const sendMessageSchema = z
  .object({
    content: z.string().max(4096).optional(),
    type: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'AUDIO', 'FILE', 'VOICE', 'LOCATION']),
    replyToId: uuid.optional(),
    forwardedFromId: uuid.optional(),
    idempotencyKey: z.string().max(64),
    attachments: z.array(attachmentSchema).max(10).optional(),
  })
  .superRefine((data, ctx) => {
    // TEXT messages require content
    if (data.type === 'TEXT' && (!data.content || data.content.trim().length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Content is required for TEXT messages',
        path: ['content'],
      });
    }

    // Non-TEXT messages require at least one attachment or content
    if (data.type !== 'TEXT' && (!data.attachments || data.attachments.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `At least one attachment is required for ${data.type} messages`,
        path: ['attachments'],
      });
    }
  });

export type SendMessageInput = z.infer<typeof sendMessageSchema>;

// ─── Edit Message ───────────────────────────────────────────────────────────

export const editMessageSchema = z.object({
  content: z.string().trim().min(1).max(4096),
});

export type EditMessageInput = z.infer<typeof editMessageSchema>;

// ─── React to Message ───────────────────────────────────────────────────────

export const reactToMessageSchema = z.object({
  emoji: z.string().min(1).max(32),
});

export type ReactToMessageInput = z.infer<typeof reactToMessageSchema>;

// ─── Remove Reaction (query param) ──────────────────────────────────────────

export const removeReactionSchema = z.object({
  emoji: z.string().min(1).max(32),
});

export type RemoveReactionInput = z.infer<typeof removeReactionSchema>;

// ─── Get Messages (query params) ────────────────────────────────────────────

export const getMessagesSchema = z.object({
  cursor: z.string().optional(),
  limit: z
    .string()
    .transform((val) => {
      const n = parseInt(val, 10);
      if (isNaN(n) || n < 1) return 50;
      return Math.min(n, 100);
    })
    .optional()
    .default('50'),
});

export type GetMessagesInput = z.infer<typeof getMessagesSchema>;

// ─── Search Messages (query param) ──────────────────────────────────────────

export const searchMessagesSchema = z.object({
  q: z.string().min(1).max(256),
});

export type SearchMessagesInput = z.infer<typeof searchMessagesSchema>;
