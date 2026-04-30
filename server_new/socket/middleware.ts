// =============================================================================
// Honey — Socket.IO Middleware
// =============================================================================
// Authentication & rate-limiting middleware for Socket.IO connections.
// =============================================================================

import type { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { redis, key } from '../config/redis';
import { config } from '../config';
import { logger } from '../utils/logger';
import { SocketError, ErrorCode } from '../errors';
import type { HoneySocket } from './types';

// ---- Token Payload ----------------------------------------------------------

interface JwtTokenPayload {
  sub: string;
  type: 'access' | 'refresh';
  jti: string;
  iat?: number;
  exp?: number;
}

// ---- Auth Middleware ---------------------------------------------------------

/**
 * Extracts and verifies JWT from the handshake.
 *
 * Token location priority:
 *   1. `handshake.auth.token`
 *   2. `handshake.headers.authorization` (Bearer scheme)
 *
 * On success, attaches `userId` and `username` to `socket.data`.
 * Rejects unauthenticated connections with a descriptive error.
 */
export function authenticateSocket(
  socket: HoneySocket,
  next: NextFunction,
): void {
  const rawToken =
    (socket.handshake.auth?.token as string | undefined) ??
    extractBearerToken(socket.handshake.headers.authorization);

  if (!rawToken) {
    const err = new SocketError(
      ErrorCode.AUTH_UNAUTHORIZED,
      'No authentication token provided',
    );
    logger.warn('socket:auth failed — no token', { socketId: socket.id });
    return next(err);
  }

  let payload: JwtTokenPayload;

  try {
    payload = jwt.verify(rawToken, config.JWT_SECRET) as JwtTokenPayload;
  } catch (verifyErr) {
    const message =
      verifyErr instanceof jwt.TokenExpiredError
        ? 'Token expired'
        : verifyErr instanceof jwt.JsonWebTokenError
          ? 'Invalid token'
          : 'Token verification failed';

    logger.warn('socket:auth failed', {
      socketId: socket.id,
      reason: message,
    });

    return next(new SocketError(ErrorCode.AUTH_UNAUTHORIZED, message));
  }

  if (payload.type !== 'access') {
    logger.warn('socket:auth failed — wrong token type', {
      socketId: socket.id,
      type: payload.type,
    });
    return next(
      new SocketError(ErrorCode.AUTH_UNAUTHORIZED, 'Expected access token'),
    );
  }

  // Attach authenticated data to the socket
  socket.data.userId = payload.sub;
  socket.data.username = payload.sub; // resolved later if needed
  socket.data.connectedAt = Date.now();
  socket.data.activeMeetingId = null;
  socket.data.activeStreamIds = new Set<string>();

  logger.info('socket:auth success', {
    socketId: socket.id,
    userId: payload.sub,
  });

  next();
}

// ---- Rate Limiter -----------------------------------------------------------

const RATE_LIMIT_PREFIX = 'socket:ratelimit';

/**
 * Creates a rate-limiting middleware for a specific socket event.
 *
 * Uses Redis sliding-window counter: for each `windowMs` we atomically
 * INCR a key and set an EXPIRY on first insert.
 *
 * @param event     - The socket event name (used as part of the Redis key).
 * @param maxPerWindow - Maximum number of calls allowed within the window.
 * @param windowMs  - Window duration in milliseconds.
 * @returns A Socket.IO middleware function.
 */
export function rateLimitSocket(
  event: string,
  maxPerWindow: number,
  windowMs: number,
) {
  const windowSeconds = Math.ceil(windowMs / 1000);

  return async (socket: HoneySocket, next: NextFunction): Promise<void> => {
    const userId: string = socket.data.userId;
    if (!userId) {
      return next(new SocketError(ErrorCode.AUTH_UNAUTHORIZED, 'Not authenticated'));
    }

    const redisKey = key(
      RATE_LIMIT_PREFIX,
      userId,
      event,
    );

    try {
      const current = await redis.incr(redisKey);

      // First request — set TTL
      if (current === 1) {
        await redis.expire(redisKey, windowSeconds);
      }

      if (current > maxPerWindow) {
        logger.warn('socket:rate-limit exceeded', {
          socketId: socket.id,
          userId,
          event,
          current,
          max: maxPerWindow,
        });
        return next(
          new SocketError(
            ErrorCode.RATE_LIMIT_EXCEEDED,
            `Rate limit exceeded for "${event}". Try again later.`,
          ),
        );
      }

      next();
    } catch (redisErr) {
      // If Redis is down, allow the request through (fail-open)
      logger.error('socket:rate-limit redis error', {
        socketId: socket.id,
        event,
        error: redisErr instanceof Error ? redisErr.message : String(redisErr),
      });
      next();
    }
  };
}

// ---- Helpers ----------------------------------------------------------------

/**
 * Extracts a token from an `Authorization: Bearer <token>` header.
 */
function extractBearerToken(header: string | string[] | undefined): string | undefined {
  if (typeof header !== 'string') return undefined;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? undefined;
}
