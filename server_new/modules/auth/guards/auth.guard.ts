import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from '../../../config';
import { AuthError } from '../../../errors';
import { prisma } from '../../../config/prisma';
import { logger } from '../../../utils/logger';

// ─── JWT Payload Type ─────────────────────────────────────────────────────────

interface AccessTokenPayload {
  userId: string;
  username: string;
  jti: string;
  type: "access";
}

// ─── Express Request Extension ────────────────────────────────────────────────

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      sessionJti?: string;
    }
  }
}

// ─── Authenticate Middleware ──────────────────────────────────────────────────

/**
 * Verifies the Bearer JWT access token from the Authorization header.
 * On success, attaches `req.userId` and `req.sessionJti` and calls next().
 * On failure, passes an AuthError to next().
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AuthError("Authentication credentials were not provided"));
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return next(new AuthError("Authentication credentials were not provided"));
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as AccessTokenPayload;

    if (payload.type !== "access") {
      return next(new AuthError("Invalid token type"));
    }

    // Verify the user still exists and is not banned
    prisma.user
      .findUnique({
        where: { id: payload.userId },
        select: { id: true, isBanned: true },
      })
      .then((user) => {
        if (!user) {
          return next(new AuthError("User not found"));
        }

        if (user.isBanned) {
          return next(new AuthError("This account has been suspended"));
        }

        req.userId = payload.userId;
        req.sessionJti = payload.jti;
        next();
      })
      .catch((dbError: unknown) => {
        logger.error("Unexpected error during auth verification", {
          error: dbError instanceof Error ? dbError.message : String(dbError),
        });
        next(new AuthError("Authentication failed"));
      });
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AuthError("Access token has expired"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AuthError("Invalid access token"));
    }
    logger.error("Unexpected error during JWT verification", {
      error: error instanceof Error ? error.message : String(error),
    });
    next(new AuthError("Authentication failed"));
  }
}

// ─── Optional Auth Middleware ─────────────────────────────────────────────────

/**
 * Like `authenticate` but does NOT reject unauthenticated requests.
 * If a valid token is present, `req.userId` is set; otherwise the request
 * proceeds without authentication.
 */
export function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as AccessTokenPayload;

    if (payload.type !== "access") {
      return next();
    }

    prisma.user
      .findUnique({
        where: { id: payload.userId },
        select: { id: true, isBanned: true },
      })
      .then((user) => {
        if (user && !user.isBanned) {
          req.userId = payload.userId;
          req.sessionJti = payload.jti;
        }
        next();
      })
      .catch(() => {
        // Swallow errors for optional auth — treat as unauthenticated
        next();
      });
  } catch {
    // Swallow errors for optional auth
    next();
  }
}

// ─── Role Guard Factory ──────────────────────────────────────────────────────

/**
 * Returns middleware that checks if the authenticated user has one of the
 * allowed roles. Must be placed AFTER `authenticate`.
 *
 * @param roles - Array of role strings that are permitted (e.g., ["ADMIN", "MODERATOR"])
 *
 * @example
 * router.delete(
 *   "/admin/users/:id",
 *   authenticate,
 *   requireRoles(["ADMIN"]),
 *   adminController.deleteUser,
 * );
 */
export function requireRoles(roles: string[]) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
      return next(new AuthError("Authentication required"));
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, isStaff: true, isSuperuser: true },
      });

      if (!user) {
        return next(new AuthError("User not found"));
      }

      // Map role strings to user flags for flexibility
      const userRoles: string[] = [];
      if (user.isSuperuser) userRoles.push("SUPERUSER", "ADMIN");
      if (user.isStaff) userRoles.push("STAFF", "MODERATOR");
      userRoles.push("USER");

      const hasRequiredRole = roles.some((role) =>
        userRoles.includes(role.toUpperCase()),
      );

      if (!hasRequiredRole) {
        return next(
          new AuthError(
            `Insufficient permissions. Required: ${roles.join(", ")}`,
          ),
        );
      }

      next();
    } catch (error: unknown) {
      logger.error("Error checking user role", {
        error: error instanceof Error ? error.message : String(error),
      });
      next(new AuthError("Authorization check failed"));
    }
  };
}
