import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthError, ForbiddenError } from '../errors';
import { JwtPayload, AuthenticatedRequest, MemberRole } from '../types';
import { logger } from '../utils/logger';

// ─── Helpers ───────────────────────────────────────────────────────────────────

function extractToken(header: string | undefined): string | null {
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1];
}

function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    if (decoded.type !== 'access') {
      throw new AuthError('Invalid token type');
    }
    return decoded;
  } catch (err) {
    if (err instanceof AuthError) throw err;
    throw new AuthError('Invalid or expired token');
  }
}

// ─── Middleware ─────────────────────────────────────────────────────────────────

/**
 * Verify JWT from the Authorization header and attach the payload to
 * `req.user`.  Rejects the request with 401 when authentication fails.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const token = extractToken(req.headers.authorization);
  if (!token) {
    throw new AuthError('Authorization header missing');
  }

  const payload = verifyToken(token);
  (req as AuthenticatedRequest).user = payload;
  next();
}

/**
 * Same as `authenticate` but does **not** reject the request when no token
 * is present.  If a valid token is found, `req.user` will be set; otherwise
 * the request continues as unauthenticated.
 */
export function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const token = extractToken(req.headers.authorization);
  if (!token) {
    next();
    return;
  }

  try {
    const payload = verifyToken(token);
    (req as AuthenticatedRequest).user = payload;
  } catch {
    // Silently ignore – user is treated as unauthenticated
    logger.debug('optionalAuth: invalid token, continuing unauthenticated');
  }

  next();
}

/**
 * Require one or more specific roles.  Must be placed **after** `authenticate`.
 *
 * @example router.delete('/users/:id', authenticate, requireRole('admin'), handler)
 */
export function requireRole(...roles: MemberRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;
    // This should never happen if middleware is ordered correctly
    if (!user) {
      throw new AuthError('Authentication required');
    }

    // In the future `user.role` can be added to the JWT payload.
    // For now we accept a `role` claim that may be present on the token.
    const userRole = (user as JwtPayload & { role?: MemberRole }).role;

    if (!userRole || !roles.includes(userRole)) {
      throw new ForbiddenError(
        `Requires one of the following roles: ${roles.join(', ')}`,
      );
    }

    next();
  };
}

/**
 * Resource-level ownership check.
 *
 * `getResourceId` extracts an identifier from the request (e.g. `req.params.id`).
 * `getOwnerId` asynchronously resolves that identifier to an owner userId string.
 *
 * Must be placed **after** `authenticate`.
 */
export function authorizeResource(
  getResourceId: (req: Request) => string,
  getOwnerId: (resourceId: string) => Promise<string>,
) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = (req as AuthenticatedRequest).user;
      if (!user) {
        throw new AuthError('Authentication required');
      }

      const resourceId = getResourceId(req);
      const ownerId = await getOwnerId(resourceId);

      if (ownerId !== user.userId) {
        throw new ForbiddenError('You do not own this resource');
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
