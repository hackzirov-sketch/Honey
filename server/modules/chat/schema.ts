import { z } from "zod";

export const createChatSchema = z.object({
  user_id: z.string().or(z.number()).transform(String),
});

export const createGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  group_type: z.enum(["group", "channel"]).optional().default("group"),
});

export const sendMessageSchema = z.object({
  content: z.string().min(1),
  message_type: z.string().optional().default("text"),
  reply_to_id: z.string().optional().nullable(),
});

export const editMessageSchema = z.object({
  content: z.string().min(1),
});
