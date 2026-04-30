import { z } from "zod";

export const getNotificationsDtoSchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(30),
  type: z.string().max(50).optional(),
});

export type GetNotificationsDto = z.infer<typeof getNotificationsDtoSchema>;

export const markReadDtoSchema = z.object({
  notificationIds: z.array(z.string().uuid()).optional(),
  markAll: z.boolean().optional(),
});

export type MarkReadDto = z.infer<typeof markReadDtoSchema>;

export const notificationPreferencesSchema = z.object({
  message: z.boolean().optional().default(true),
  reaction: z.boolean().optional().default(true),
  follow: z.boolean().optional().default(true),
  mention: z.boolean().optional().default(true),
  groupInvite: z.boolean().optional().default(true),
  streamStart: z.boolean().optional().default(false),
  meetingInvite: z.boolean().optional().default(true),
  system: z.boolean().optional().default(true),
});

export type NotificationPreferences = z.infer<typeof notificationPreferencesSchema>;
