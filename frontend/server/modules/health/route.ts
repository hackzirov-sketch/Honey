import { Router } from "express";
import { dbHealth } from "../../core/db";

export function healthRoutes() {
  const router = Router();
  router.get("/health", (_req, res) => res.json({ status: "ok" }));
  router.get("/health/db", (_req, res) => res.json(dbHealth()));
  return router;
}
