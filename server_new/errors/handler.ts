import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { AppError, isAppError, InternalError } from './index';
import { logger } from '../utils/logger';

function getRequestId(req: Request): string {
  return (req.headers['x-request-id'] as string) ?? 'unknown';
}

/**
 * Global Express error-handler middleware.
 * MUST be registered after all routes.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const requestId = getRequestId(req);

  // Normalise unknown errors into our own shape
  const appError: AppError = isAppError(err)
    ? err
    : new InternalError(
        config.isProduction
          ? 'An unexpected error occurred'
          : err.message,
        config.isProduction ? undefined : { stack: err.stack },
      );

  // Build the standardised response body
  const body = {
    success: false as const,
    error: {
      code: appError.code,
      message: appError.message,
      ...(appError.details ? { details: appError.details } : {}),
    },
  };

  // Log the error with the request ID for tracing
  if (appError.statusCode >= 500) {
    logger.error(`[${requestId}] ${err.stack ?? err.message}`, {
      requestId,
      statusCode: appError.statusCode,
      path: req.originalUrl,
      method: req.method,
    });
  } else {
    logger.warn(`[${requestId}] ${appError.code}: ${appError.message}`, {
      requestId,
      statusCode: appError.statusCode,
      path: req.originalUrl,
      method: req.method,
    });
  }

  res.status(appError.statusCode).json(body);
}
