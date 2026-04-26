import { z } from "zod";

export const commentSchema = z.object({
  text: z.string().min(1),
  video_id: z.string().optional(),
  book_id: z.string().optional(),
});
