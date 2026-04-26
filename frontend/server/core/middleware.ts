import rateLimit from "express-rate-limit";
import type { NextFunction, Request, Response } from "express";
import { sqlite } from "./db";
import { HttpError } from "./http";
import { toPublicUser, verifyToken, type AuthUser } from "./jwt";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authRequired(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return next(new HttpError(401, "Authentication credentials were not provided."));

  try {
    const payload = verifyToken(token, "access");
    const row = sqlite.prepare("SELECT * FROM users WHERE id = ?").get(payload.sub) as any;
    if (!row) return next(new HttpError(401, "User not found"));
    req.user = toPublicUser(row);
    return next();
  } catch {
    return next(new HttpError(401, "Token is invalid or expired"));
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return next();
  try {
    const payload = verifyToken(token, "access");
    const row = sqlite.prepare("SELECT * FROM users WHERE id = ?").get(payload.sub) as any;
    if (row) req.user = toPublicUser(row);
  } catch {
    // optional auth intentionally ignores bad tokens
  }
  return next();
}

export function staffRequired(req: Request, _res: Response, next: NextFunction) {
  if (!req.user?.is_staff && !req.user?.is_superuser) {
    return next(new HttpError(403, "Admin huquqi kerak"));
  }
  return next();
}

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  standardHeaders: true,
  legacyHeaders: false,
});

export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { message: "Siz juda ko'p so'rov yubordingiz. Iltimos birozdan so'ng qayta urinib ko'ring." },
});
