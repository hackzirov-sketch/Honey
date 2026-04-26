import { Router } from "express";
import { asyncHandler } from "../../core/http";
import { aiLimiter, authRequired } from "../../core/middleware";
import { aiChatSchema, aiImproveSchema, aiSearchSchema } from "./schema";
import { aiService } from "./service";

export function aiRoutes() {
  const router = Router();
  router.post("/chat/", authRequired, aiLimiter, asyncHandler(async (req, res) => {
    const data = aiChatSchema.parse(req.body);
    res.json(await aiService.chat(data.message, data.systemInstruction));
  }));
  router.post("/search/", authRequired, aiLimiter, asyncHandler(async (req, res) => {
    const data = aiSearchSchema.parse(req.body);
    res.json(await aiService.search(data.query));
  }));
  router.post("/improve/", authRequired, aiLimiter, asyncHandler(async (req, res) => {
    const data = aiImproveSchema.parse(req.body);
    res.json(await aiService.improve(data.text));
  }));
  return router;
}
