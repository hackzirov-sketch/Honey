import { z } from 'zod';

// ─── Create Conversation ────────────────────────────────────────────────────

const uuid = z.string().uuid();

export const createConversationSchema = z
  .object({
    type: z.enum(['PRIVATE', 'GROUP', 'CHANNEL']),
    name: z.string().trim().max(200).optional(),
    avatarUrl: z.string().url().max(512).optional(),
    description: z.string().max(500).optional(),
    memberIds: z.array(uuid).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'PRIVATE') {
      if (!data.memberIds || data.memberIds.length !== 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Exactly one member ID is required for PRIVATE conversations',
          path: ['memberIds'],
        });
      }
      if (data.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Name is not allowed for PRIVATE conversations',
          path: ['name'],
        });
      }
    }

    if (data.type === 'GROUP' || data.type === 'CHANNEL') {
      if (!data.name || data.name.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Name is required for ${data.type} conversations`,
          path: ['name'],
        });
      }

      if (!data.memberIds || data.memberIds.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `At least one member ID is required for ${data.type} conversations`,
          path: ['memberIds'],
        });
      }
    }

    if (data.type === 'GROUP' && data.memberIds && data.memberIds.length > 200) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'GROUP conversations can have at most 200 members',
        path: ['memberIds'],
      });
    }
  });

export type CreateConversationInput = z.infer<typeof createConversationSchema>;

// ─── Update Conversation ────────────────────────────────────────────────────

export const updateConversationSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    avatarUrl: z.string().url().max(512).nullable().optional(),
    description: z.string().max(500).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateConversationInput = z.infer<typeof updateConversationSchema>;

// ─── Join by Invite ─────────────────────────────────────────────────────────

export const joinByInviteSchema = z.object({
  inviteLink: z.string().min(1).max(64),
});

export type JoinByInviteInput = z.infer<typeof joinByInviteSchema>;

// ─── Add Member ─────────────────────────────────────────────────────────────

export const addMemberSchema = z.object({
  userId: uuid,
  role: z.enum(['ADMIN', 'MEMBER']).optional().default('MEMBER'),
});

export type AddMemberInput = z.infer<typeof addMemberSchema>;

// ─── Update Member Role ─────────────────────────────────────────────────────

export const updateMemberSchema = z.object({
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER']).optional(),
  isMuted: z.boolean().optional(),
});

export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;

// ─── Toggle Mute ────────────────────────────────────────────────────────────

export const toggleMuteSchema = z.object({
  isMuted: z.boolean(),
  mutedUntil: z.string().datetime({ offset: true }).nullable().optional(),
});

export type ToggleMuteInput = z.infer<typeof toggleMuteSchema>;

// ─── Forward Message ────────────────────────────────────────────────────────

export const forwardMessageSchema = z.object({
  targetConversationId: uuid,
});

export type ForwardMessageInput = z.infer<typeof forwardMessageSchema>;

// ─── Mark as Read ───────────────────────────────────────────────────────────

export const markAsReadSchema = z.object({
  messageId: uuid,
});

export type MarkAsReadInput = z.infer<typeof markAsReadSchema>;
