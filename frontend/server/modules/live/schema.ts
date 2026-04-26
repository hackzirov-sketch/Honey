import { z } from "zod";

export const createLiveSessionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["scheduled", "live", "finished"]).optional().default("scheduled"),
  cover: z.string().optional(),
});

export const liveMessageSchema = z.object({
  text: z.string().min(1),
});
