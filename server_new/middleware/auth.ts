import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { prisma } from '../config/prisma';
import { AuthError, ForbiddenError } from '../errors';
import { AuthenticatedRequest, MemberRole } from '../types';
import { logger } from '../utils/logger';

interface AccessTokenPayload {
  userId: string;
  username: string;
  type: 'access' | 'refresh';
  jti?: string;
}

function extractToken(header: string | undefined): string | null {
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1];
}

function verifyToken(token: string): AccessTokenPayload {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as AccessTokenPayload;
    if (decoded.type !== 'access') {
      throw new AuthError('Invalid token type');
    }
    return decoded;
  } catch (err) {
    if (err instanceof AuthError) throw err;
    throw new AuthError('Invalid or expired token');
  }
}

async function buildAuthUser(payload: AccessTokenPayload): Promise<AuthenticatedRequest['user']> {
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
      email: true,
      isVerified: true,
      isStaff: true,
      isSuperuser: true,
      isBanned: true,
    },
  });

  if (!user) {
    throw new AuthError('User not found');
  }

  if (user.isBanned) {
    throw new AuthError('This account has been suspended');
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    isVerified: user.isVerified,
    isStaff: user.isStaff,
    isSuperuser: user.isSuperuser,
  };
}

/**
 * Verify JWT from the Authorization header and attach a normalized authenticated
 * user object to `req.user`.
 */
export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = extractToken(req.headers.authorization);
    if (!token) {
      throw new AuthError('Authorization header missing');
    }

    const payload = verifyToken(token);
    const authReq = req as AuthenticatedRequest & {
      userId?: string;
      sessionJti?: string;
    };

    authReq.user = await buildAuthUser(payload);
    authReq.userId = authReq.user.id;
    authReq.sessionJti = payload.jti;

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Same as `authenticate` but does not reject when token is absent or invalid.
 */
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const token = extractToken(req.headers.authorization);
  if (!token) {
    next();
    return;
  }

  try {
    const payload = verifyToken(token);
    const authReq = req as AuthenticatedRequest & {
      userId?: string;
      sessionJti?: string;
    };

    authReq.user = await buildAuthUser(payload);
    authReq.userId = authReq.user.id;
    authReq.sessionJti = payload.jti;
  } catch {
    logger.debug('optionalAuth: invalid token, continuing unauthenticated');
  }

  next();
}

/**
 * Require one or more specific roles.
 */
export function requireRole(...roles: MemberRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;
    if (!user) {
      throw new AuthError('Authentication required');
    }

    const normalizedRoles: MemberRole[] = [];
    if (user.isSuperuser) normalizedRoles.push('OWNER');
    if (user.isStaff) normalizedRoles.push('ADMIN');
    normalizedRoles.push('MEMBER');

    const allowed = roles.some((role) => normalizedRoles.includes(role));
    if (!allowed) {
      throw new ForbiddenError(
        `Requires one of the following roles: ${roles.join(', ')}`,
      );
    }

    next();
  };
}

/**
 * Resource-level ownership check.
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

      if (ownerId !== user.id) {
        throw new ForbiddenError('You do not own this resource');
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
