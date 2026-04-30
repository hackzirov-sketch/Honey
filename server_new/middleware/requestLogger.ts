import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

/**
 * HTTP request logger middleware.
 *
 * Generates a unique request ID (X-Request-ID header), logs method, path,
 * status code, and duration for every completed request.
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const requestId = (req.headers['x-request-id'] as string) ?? uuidv4();
  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-ID', requestId);

  const start = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;

    const level =
      statusCode >= 500
        ? 'error'
        : statusCode >= 400
          ? 'warn'
          : 'info';

    logger[level](`[${requestId}] ${method} ${originalUrl} ${statusCode} ${duration}ms`, {
      requestId,
      method,
      path: originalUrl,
      status: statusCode,
      duration,
      ip,
    });
  });

  next();
}
