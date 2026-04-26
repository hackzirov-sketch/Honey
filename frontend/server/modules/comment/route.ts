import { Router } from "express";
import { authRequired } from "../../core/middleware";
import { commentSchema } from "./schema";
import { commentService } from "./service";

export function commentRoutes() {
  const router = Router();
  router.post("/", authRequired, (req, res) => {
    res.status(201).json(commentService.create(req.user!.id, commentSchema.parse(req.body)));
  });
  return router;
}
