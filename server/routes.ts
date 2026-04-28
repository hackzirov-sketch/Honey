import type { Express } from "express";
import type { Server } from "http";
import { initDb } from "./core/db";
import { adminRoutes } from "./modules/admin/route";
import { authRoutes } from "./modules/auth/route";
import { chatRoutes } from "./modules/chat/route";
import { commentRoutes } from "./modules/comment/route";
import { healthRoutes } from "./modules/health/route";
import { integrationRoutes } from "./modules/integrations/route";
import { libraryRoutes } from "./modules/library/route";
import { liveRoutes } from "./modules/live/route";
import { videoRoutes } from "./modules/video/route";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  initDb();

  app.use(healthRoutes());
  app.use("/api/v1/auth", authRoutes());
  app.use("/api/v1/library", libraryRoutes());
  app.use("/api/v1/chat", chatRoutes());
  app.use("/api/v1/video", videoRoutes());
  app.use("/api/v1/live", liveRoutes());
  app.use("/api/v1/comment", commentRoutes());
  app.use("/api/v1/admin", adminRoutes());
  app.use("/api/v1/integrations", integrationRoutes());

  return httpServer;
}
