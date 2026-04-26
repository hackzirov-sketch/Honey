import { z } from "zod";

export const aiChatSchema = z.object({
  message: z.string().min(1).max(3000),
  systemInstruction: z.string().optional(),
});

export const aiSearchSchema = z.object({
  query: z.string().min(1).max(500),
});

export const aiImproveSchema = z.object({
  text: z.string().min(1).max(3000),
});
