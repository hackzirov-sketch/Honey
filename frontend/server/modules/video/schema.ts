import { z } from "zod";

export const createVideoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  video: z.string().optional(),
  video_url: z.string().optional(),
  youtube_url: z.string().optional(),
  instagram_url: z.string().optional(),
  video_embed: z.string().optional(),
  cover: z.string().optional(),
  category_id: z.string().optional(),
  category: z.string().optional(),
  source_type: z.enum(["file", "youtube", "instagram", "external"]).optional(),
});

export const createVideoCategorySchema = z.object({
  name: z.string().min(1),
});

export const createVideoCommentSchema = z.object({
  text: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  comment: z.string().min(1).optional(),
});
