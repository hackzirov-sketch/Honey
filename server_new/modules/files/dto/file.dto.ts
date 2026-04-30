import { z } from "zod";

export const uploadFileDtoSchema = z.object({
  type: z.enum(["avatar", "banner", "message", "video", "voice", "document"]).default("message"),
});

export type UploadFileDto = z.infer<typeof uploadFileDtoSchema>;

export const fileListQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .default(30),
});

export type FileListQuery = z.infer<typeof fileListQuerySchema>;
