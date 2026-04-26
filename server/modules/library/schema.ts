import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  youtube_url: z.string().optional(),
  library_url: z.string().optional(),
  file: z.string().optional(),
  is_premium: z.boolean().optional(),
  year: z.coerce.number().optional(),
  language: z.string().optional(),
  pages: z.coerce.number().optional(),
  category_id: z.string().optional(),
  genre_id: z.string().optional(),
});

export const downloadBookSchema = z.object({
  book_id: z.string().min(1),
});
