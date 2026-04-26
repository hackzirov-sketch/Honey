import { Router } from "express";
import multer from "multer";
import { authRequired, staffRequired } from "../../core/middleware";
import { saveUploadedFile } from "../../core/uploads";
import { createVideoCategorySchema, createVideoCommentSchema, createVideoSchema } from "./schema";
import { videoService } from "./service";

const upload = multer({ storage: multer.memoryStorage() });

function firstFile(req: any, field: string) {
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  return files?.[field]?.[0] || null;
}

function videoBodyWithFiles(req: any) {
  const fileUrl = saveUploadedFile(firstFile(req, "file"));
  const coverUrl = saveUploadedFile(firstFile(req, "cover"));

  return {
    title: req.body?.title,
    description: req.body?.description,
    category_id: req.body?.category_id || req.body?.category,
    source_type: req.body?.source_type,
    video: fileUrl || req.body?.video || req.body?.video_url || req.body?.youtube_url || req.body?.instagram_url,
    video_url: req.body?.video_url,
    youtube_url: req.body?.youtube_url,
    instagram_url: req.body?.instagram_url,
    video_embed: req.body?.video_embed,
    cover: coverUrl || req.body?.cover,
  };
}

export function videoRoutes() {
  const router = Router();
  router.get("/videos/", (_req, res) => res.json(videoService.list(String(_req.query.search || ""))));
  router.post("/videos/", authRequired, staffRequired, upload.fields([{ name: "file", maxCount: 1 }, { name: "cover", maxCount: 1 }]), (req, res) => {
    const rawData = req.is("multipart/form-data") ? videoBodyWithFiles(req) : req.body;
    res.status(201).json(videoService.create(createVideoSchema.parse(rawData), req.user!.id));
  });
  router.delete("/videos/:id/", authRequired, (req, res) => {
    videoService.delete(String(req.params.id), req.user!.id, !!(req.user!.is_staff || req.user!.is_superuser));
    res.status(204).end();
  });
  router.post("/videos/:id/like/", authRequired, (req, res) => res.json(videoService.like(String(req.params.id), req.user!.id)));
  router.post("/videos/:id/comment/", authRequired, (req, res) => {
    const data = createVideoCommentSchema.parse(req.body);
    res.status(201).json(videoService.comment(String(req.params.id), req.user!.id, data.text || data.content || data.comment || ""));
  });
  router.get("/categories/", (_req, res) => res.json(videoService.categories()));
  router.post("/categories/", authRequired, staffRequired, (req, res) => {
    const data = createVideoCategorySchema.parse(req.body);
    res.status(201).json(videoService.createCategory(data.name));
  });
  return router;
}
