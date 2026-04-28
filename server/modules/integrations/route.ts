import { Router } from "express";
import { asyncHandler } from "../../core/http";
import { authRequired } from "../../core/middleware";
import { openlibrary } from "./openlibrary";
import { youtube } from "./youtube";
import { instagram } from "./instagram";
import { zoom } from "./zoom";

export function integrationRoutes() {
  const router = Router();

  // ── Status: which integrations are configured ──
  router.get("/status/", (_req, res) => {
    res.json({
      openlibrary: true,
      youtube: youtube.isConfigured(),
      instagram: instagram.isConfigured(),
      zoom: zoom.isConfigured(),
    });
  });

  // ── OpenLibrary ──
  router.get("/openlibrary/search/", authRequired, asyncHandler(async (req, res) => {
    const data = await openlibrary.search(String(req.query.q || ""), Number(req.query.limit || 20));
    res.json(data);
  }));
  router.get("/openlibrary/trending/", authRequired, asyncHandler(async (req, res) => {
    const data = await openlibrary.trending(String(req.query.subject || ""));
    res.json(data);
  }));
  router.get("/openlibrary/book/", authRequired, asyncHandler(async (req, res) => {
    const key = String(req.query.key || "");
    if (!key) return res.status(400).json({ detail: "key required" });
    const data = await openlibrary.detail(key);
    res.json(data);
  }));

  // ── YouTube ──
  router.get("/youtube/search/", authRequired, asyncHandler(async (req, res) => {
    if (!youtube.isConfigured()) return res.status(503).json({ detail: "YouTube API not configured" });
    const data = await youtube.search(String(req.query.q || ""), Number(req.query.limit || 12));
    res.json(data);
  }));
  router.get("/youtube/trending/", authRequired, asyncHandler(async (req, res) => {
    if (!youtube.isConfigured()) return res.status(503).json({ detail: "YouTube API not configured" });
    const data = await youtube.trending(String(req.query.region || "UZ"), Number(req.query.limit || 24));
    res.json(data);
  }));
  router.get("/youtube/video/:id/", authRequired, asyncHandler(async (req, res) => {
    if (!youtube.isConfigured()) return res.status(503).json({ detail: "YouTube API not configured" });
    const data = await youtube.videoDetail(String(req.params.id));
    res.json(data);
  }));

  // ── Instagram ──
  router.get("/instagram/profile/", authRequired, asyncHandler(async (_req, res) => {
    if (!instagram.isConfigured()) return res.status(503).json({ detail: "Instagram API not configured" });
    res.json(await instagram.profile());
  }));
  router.get("/instagram/feed/", authRequired, asyncHandler(async (req, res) => {
    if (!instagram.isConfigured()) return res.status(503).json({ detail: "Instagram API not configured" });
    res.json(await instagram.feed(Number(req.query.limit || 12)));
  }));

  // ── Zoom ──
  router.get("/zoom/meetings/", authRequired, asyncHandler(async (_req, res) => {
    if (!zoom.isConfigured()) return res.status(503).json({ detail: "Zoom API not configured" });
    res.json(await zoom.listMeetings());
  }));
  router.post("/zoom/meetings/", authRequired, asyncHandler(async (req, res) => {
    if (!zoom.isConfigured()) return res.status(503).json({ detail: "Zoom API not configured" });
    const { topic, start_time, duration, agenda } = req.body || {};
    if (!topic) return res.status(400).json({ detail: "topic required" });
    const m = await zoom.createMeeting({ topic, start_time, duration, agenda });
    res.status(201).json(m);
  }));
  router.delete("/zoom/meetings/:id/", authRequired, asyncHandler(async (req, res) => {
    if (!zoom.isConfigured()) return res.status(503).json({ detail: "Zoom API not configured" });
    await zoom.deleteMeeting(req.params.id as string);
    res.status(204).end();
  }));

  return router;
}
