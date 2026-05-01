import { Request, Response, NextFunction, RequestHandler } from 'express';
import { redis } from '../config/redis';
import { RateLimitError } from '../errors';
import { config } from '../config';

// ─── Options ───────────────────────────────────────────────────────────────────

interface RateLimiterOptions {
  /** Time window in milliseconds */
  windowMs: number;
  /** Max requests per window */
  max: number;
  /** Redis key prefix */
  keyPrefix: string;
  /** Custom error message */
  message?: string;
}

interface RateLimitResult {
  remaining: number;
  resetMs: number;
}

interface RedisPipeline {
  zremrangebyscore(key: string, min: number, max: number): RedisPipeline;
  zadd(key: string, score: number, member: string): RedisPipeline;
  zcard(key: string): RedisPipeline;
  pexpire(key: string, ms: number): RedisPipeline;
  exec(): Promise<Array<[Error | null, number]>>;
}

function getRedisPipeline(): RedisPipeline | null {
  if (redis.kind !== 'redis') {
    return null;
  }
  const candidate = redis as unknown as { pipeline?: () => RedisPipeline };
  if (typeof candidate.pipeline !== 'function') {
    return null;
  }
  return candidate.pipeline();
}

// ─── Core limiter factory ──────────────────────────────────────────────────────

export function createRateLimiter(
  options: RateLimiterOptions,
): RequestHandler {
  const { windowMs, max, keyPrefix, message } = options;
  const bypassHeaderName = 'x-honey-test-bypass';

  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const bypassHeader = req.headers[bypassHeaderName];
      if (config.NODE_ENV !== 'production' && bypassHeader === '1') {
        next();
        return;
      }

      const identifier =
        (req as Request & { user?: { userId: string } }).user?.userId ??
        req.ip ??
        'anonymous';

      const redisKey = `${keyPrefix}:${identifier}`;
      const now = Date.now();
      const pipeline = getRedisPipeline();

      let currentCount = 0;
      if (!pipeline) {
        // In-memory fallback (fixed window)
        const bucket = `${redisKey}:fw:${Math.floor(now / windowMs)}`;
        currentCount = await redis.incr(bucket);
        if (currentCount === 1) {
          await redis.expire(bucket, Math.ceil(windowMs / 1000));
        }
      } else {
        const windowStart = now - windowMs;
        pipeline.zremrangebyscore(redisKey, 0, windowStart);
        pipeline.zadd(redisKey, now, `${now}:${Math.random()}`);
        pipeline.zcard(redisKey);
        pipeline.pexpire(redisKey, windowMs + 1000);

        const results = await pipeline.exec();
        if (!results || results.length < 3) {
          next(new RateLimitError('Rate limit check failed'));
          return;
        }
        currentCount = results[2]?.[1] ?? 0;
      }

      const result: RateLimitResult = {
        remaining: Math.max(0, max - currentCount),
        resetMs: windowMs,
      };

      // Attach rate-limit info to the response headers
      _res.set({
        'X-RateLimit-Limit': String(max),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(now / 1000) + Math.ceil(windowMs / 1000)),
      });

      if (currentCount > max) {
        next(
          new RateLimitError(
            message ?? 'Too many requests, please try again later',
            { retryAfter: Math.ceil(windowMs / 1000) },
          ),
        );
        return;
      }

      next();
    } catch (err) {
      // If Redis is down, allow the request through (fail-open)
      console.error('[RateLimiter] Redis error, failing open:', (err as Error).message);
      next();
    }
  };
}

// ─── Pre-configured limiters ───────────────────────────────────────────────────

/** Authentication endpoints – 5 requests per 15 minutes */
export const authRateLimiter = createRateLimiter({
  windowMs: config.rateLimit.authWindowMs,
  max: config.rateLimit.authMax,
  keyPrefix: 'ratelimit:auth',
  message: 'Too many authentication attempts. Please try again later.',
});

/** General API – 100 requests per minute */
export const apiRateLimiter = createRateLimiter({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  keyPrefix: 'ratelimit:api',
});

/**
 * Socket.IO event rate limiter.
 *
 * Returns a function that checks whether the given socket/user has exceeded
 * the limit.  Returns `true` if the request should be **rejected**.
 */
export function socketRateLimiter(): (
  identifier: string,
) => Promise<boolean> {
  const { windowMs, max } = config.rateLimit;
  const keyPrefix = 'ratelimit:socket';

  return async (identifier: string): Promise<boolean> => {
    try {
      const redisKey = `${keyPrefix}:${identifier}`;
      const now = Date.now();
      const pipeline = getRedisPipeline();

      let currentCount = 0;
      if (!pipeline) {
        const bucket = `${redisKey}:fw:${Math.floor(now / windowMs)}`;
        currentCount = await redis.incr(bucket);
        if (currentCount === 1) {
          await redis.expire(bucket, Math.ceil(windowMs / 1000));
        }
      } else {
        const windowStart = now - windowMs;
        pipeline.zremrangebyscore(redisKey, 0, windowStart);
        pipeline.zadd(redisKey, now, `${now}:${Math.random()}`);
        pipeline.zcard(redisKey);
        pipeline.pexpire(redisKey, windowMs + 1000);

        const results = await pipeline.exec();
        if (!results || results.length < 3) return false;
        currentCount = results[2]?.[1] ?? 0;
      }

      return currentCount > max;
    } catch {
      // Fail-open
      return false;
    }
  };
}
