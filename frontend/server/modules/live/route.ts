import { Router } from "express";
import { authRequired } from "../../core/middleware";
import { createLiveSessionSchema, liveMessageSchema } from "./schema";
import { liveService } from "./service";

export function liveRoutes() {
  const router = Router();
  router.get("/sessions/", authRequired, (_req, res) => res.json(liveService.sessions()));
  router.post("/sessions/", authRequired, (req, res) => {
    res.status(201).json(liveService.create(createLiveSessionSchema.parse(req.body), req.user!.id));
  });
  router.get("/sessions/:id/", authRequired, (req, res) => {
    res.json(liveService.sessions().find((s) => s.id === String(req.params.id)));
  });
  router.post("/sessions/:id/join_request/", authRequired, (req, res) => res.json(liveService.join(String(req.params.id), req.user!.id)));
  router.post("/sessions/:id/join/", authRequired, (req, res) => res.json(liveService.join(String(req.params.id), req.user!.id)));
  router.get("/sessions/:id/participants/", authRequired, (req, res) => res.json(liveService.participants(String(req.params.id))));
  router.post("/sessions/:id/approve-participant/:participantId/", authRequired, (req, res) => {
    res.json(liveService.approve(String(req.params.id), String(req.params.participantId), req.user!.id));
  });
  router.get("/sessions/:id/messages/", authRequired, (req, res) => res.json(liveService.messages(String(req.params.id))));
  router.post("/sessions/:id/send_message/", authRequired, (req, res) => {
    const data = liveMessageSchema.parse(req.body);
    res.status(201).json(liveService.send(String(req.params.id), req.user!.id, data.text));
  });
  router.post("/sessions/:id/start_stream/", authRequired, (req, res) => res.json(liveService.start(String(req.params.id), req.user!.id)));
  router.post("/sessions/:id/end_stream/", authRequired, (req, res) => res.json(liveService.end(String(req.params.id), req.user!.id)));
  return router;
}
