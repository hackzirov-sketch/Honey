import { Router, type NextFunction, type Request, type Response } from "express";
import { authRequired } from "../../../middleware";
import { BadRequestError } from "../../../errors";
import { integrationService } from "../services/integration.service";

const router = Router();

type AsyncRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

function asyncRoute(handler: AsyncRoute) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void handler(req, res, next).catch(next);
  };
}

function ok(res: Response, data: unknown): void {
  res.json({ success: true, data });
}

router.get(
  "/status",
  asyncRoute(async (_req, res) => {
    ok(res, integrationService.status());
  }),
);

router.get(
  "/openlibrary/search",
  asyncRoute(async (req, res) => {
    const query = String(req.query.q ?? "");
    ok(res, await integrationService.openLibrarySearch(query, req.query.limit));
  }),
);

router.get(
  "/openlibrary/trending",
  asyncRoute(async (req, res) => {
    const subject = String(req.query.subject ?? "");
    ok(res, await integrationService.openLibraryTrending(subject));
  }),
);

router.get(
  "/openlibrary/book",
  asyncRoute(async (req, res) => {
    const key = String(req.query.key ?? "");
    if (!key.trim()) {
      throw new BadRequestError("key is required");
    }
    ok(res, await integrationService.openLibraryDetail(key));
  }),
);

router.get(
  "/youtube/search",
  asyncRoute(async (req, res) => {
    const query = String(req.query.q ?? "");
    if (!query.trim()) {
      throw new BadRequestError("q is required");
    }
    ok(res, await integrationService.youtubeSearch(query, req.query.limit));
  }),
);

router.get(
  "/youtube/trending",
  asyncRoute(async (req, res) => {
    const region = String(req.query.region ?? "UZ");
    ok(res, await integrationService.youtubeTrending(region, req.query.limit));
  }),
);

router.get(
  "/youtube/video/:id",
  asyncRoute(async (req, res) => {
    const id = String(req.params.id ?? "");
    if (!id.trim()) {
      throw new BadRequestError("video id is required");
    }
    ok(res, await integrationService.youtubeDetail(id));
  }),
);

router.get(
  "/instagram/profile",
  authRequired,
  asyncRoute(async (_req, res) => {
    ok(res, await integrationService.instagramProfile());
  }),
);

router.get(
  "/instagram/feed",
  authRequired,
  asyncRoute(async (req, res) => {
    ok(res, await integrationService.instagramFeed(req.query.limit));
  }),
);

router.get(
  "/zoom/meetings",
  authRequired,
  asyncRoute(async (_req, res) => {
    ok(res, await integrationService.zoomMeetings("me"));
  }),
);

router.post(
  "/zoom/meetings",
  authRequired,
  asyncRoute(async (req, res) => {
    const topic = String(req.body?.topic ?? "").trim();
    if (!topic) {
      throw new BadRequestError("topic is required");
    }

    const start_time =
      typeof req.body?.start_time === "string" ? req.body.start_time : undefined;
    const duration =
      typeof req.body?.duration === "number" ? req.body.duration : undefined;
    const agenda = typeof req.body?.agenda === "string" ? req.body.agenda : undefined;

    const meeting = await integrationService.createZoomMeeting({
      topic,
      start_time,
      duration,
      agenda,
    });
    res.status(201).json({ success: true, data: meeting });
  }),
);

router.delete(
  "/zoom/meetings/:id",
  authRequired,
  asyncRoute(async (req, res) => {
    const id = String(req.params.id ?? "");
    if (!id.trim()) {
      throw new BadRequestError("meeting id is required");
    }
    ok(res, await integrationService.deleteZoomMeeting(id));
  }),
);

export { router as integrationRoutes };

