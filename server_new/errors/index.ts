// ─── Base application error ────────────────────────────────────────────────────

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details: unknown;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    details?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details ?? undefined;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── 400 – Bad Request ────────────────────────────────────────────────────────

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400, 'BAD_REQUEST');
  }
}

// ─── 400 – Validation ──────────────────────────────────────────────────────────

export class ValidationError extends AppError {
  constructor(
    message = 'Validation failed',
    details?: Record<string, string[]>,
  ) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

// ─── 401 – Authentication ──────────────────────────────────────────────────────

export class AuthError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

/** Alias for backward compatibility */
export { AuthError as UnauthorizedError };

// ─── 403 – Forbidden ───────────────────────────────────────────────────────────

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403, 'FORBIDDEN');
  }
}

// ─── 404 – Not Found ───────────────────────────────────────────────────────────

export class NotFoundError extends AppError {
  constructor(resource = 'Resource', id?: string) {
    const message = id
      ? `${resource} with id "${id}" not found`
      : `${resource} not found`;
    super(message, 404, 'NOT_FOUND');
  }
}

// ─── 409 – Conflict ────────────────────────────────────────────────────────────

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT');
  }
}

// ─── 429 – Rate Limited ────────────────────────────────────────────────────────

export class RateLimitError extends AppError {
  constructor(
    message = 'Too many requests, please try again later',
    details?: { retryAfter: number },
  ) {
    super(message, 429, 'RATE_LIMITED', details);
  }
}

// ─── 500 – Internal ────────────────────────────────────────────────────────────

export class InternalError extends AppError {
  constructor(message = 'An unexpected error occurred', details?: unknown) {
    super(message, 500, 'INTERNAL_ERROR', details);
  }
}

// ─── Socket Errors ──────────────────────────────────────────────────────────────

export enum ErrorCode {
  AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  BAD_REQUEST = 'BAD_REQUEST',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  CONFLICT = 'CONFLICT',
}

export class SocketError extends Error {
  public readonly code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.name = 'SocketError';
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── Type guard ─────────────────────────────────────────────────────────────────

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
