import crypto from 'crypto';
import { CursorResult } from '../types';

// ─── Random generators ─────────────────────────────────────────────────────────

const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomString(length: number): string {
  const bytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHANUM[bytes[i]! % ALPHANUM.length];
  }
  return result;
}

/** Generate a random 10-character meeting link slug. */
export function generateMeetingLink(): string {
  return randomString(10);
}

/** Generate a random 16-character stream key. */
export function generateStreamKey(): string {
  return randomString(16);
}

/** Generate a random 12-character invite link slug. */
export function generateInviteLink(): string {
  return randomString(12);
}

// ─── Sanitisation ──────────────────────────────────────────────────────────────

const ESCAPED_CHAR_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

const ESCAPE_REGEX = /[&<>"'/]/g;

/**
 * Basic XSS sanitisation – escapes HTML special characters.
 * For rich content sanitisation, consider using a library like `DOMPurify`.
 */
export function sanitizeHtml(input: string): string {
  return input.replace(ESCAPE_REGEX, (ch) => ESCAPED_CHAR_MAP[ch] ?? ch);
}

// ─── Formatting ────────────────────────────────────────────────────────────────

const SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

/**
 * Convert bytes into a human-readable file-size string.
 * @example formatFileSize(1536000) → "1.46 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 0) return '0 B';
  if (bytes === 0) return '0 B';

  const k = 1024;
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    SIZE_UNITS.length - 1,
  );
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(i === 0 ? 0 : 2)} ${SIZE_UNITS[i]}`;
}

// ─── MIME helpers ──────────────────────────────────────────────────────────────

/**
 * Check whether a MIME type matches an allowed list.
 * Supports exact match and wildcard subtypes (e.g. `"image/*"`).
 *
 * @example isAllowedFileType('image/png', ['image/*', 'application/pdf']) → true
 */
export function isAllowedFileType(mimeType: string, allowed: string[]): boolean {
  return allowed.some((pattern) => {
    if (pattern.endsWith('/*')) {
      const major = pattern.slice(0, -2);
      return mimeType.startsWith(`${major}/`);
    }
    return mimeType === pattern;
  });
}

// ─── Cursor pagination ─────────────────────────────────────────────────────────

/**
 * Decode a base64url cursor into its raw string value.
 * Returns `null` when the cursor is falsy.
 */
function decodeCursor(cursor: string | undefined | null): string | null {
  if (!cursor) return null;
  try {
    return Buffer.from(cursor, 'base64url').toString('utf-8');
  } catch {
    return null;
  }
}

/**
 * Encode a raw string into a base64url cursor.
 */
function encodeCursor(value: string): string {
  return Buffer.from(value, 'utf-8').toString('base64url');
}

interface PaginateOptions {
  /** Base64url cursor from the client (usually `req.query.cursor`). */
  cursor?: string;
  /** Maximum number of items to return. Clamped between 1 and 100. */
  limit: number;
}

interface PaginateResult {
  /** Decoded raw cursor value (or null). */
  decodedCursor: string | null;
  /** Clamped take limit. */
  take: number;
  /** Encode a value into a next-cursor token. */
  encodeNextCursor: (value: string) => string;
}

/**
 * Parse and normalise cursor-based pagination parameters.
 *
 * @example
 * const { decodedCursor, take, encodeNextCursor } = paginate(req.query.cursor as string, 20);
 * const items = await prisma.post.findMany({ take, cursor: decodedCursor ? { id: decodedCursor } : undefined });
 * const nextCursor = items.length > take ? encodeNextCursor(items[take - 1].id) : null;
 */
export function paginate(cursor?: string, limit: number = 20): PaginateResult {
  const clampedLimit = Math.max(1, Math.min(limit, 100));
  return {
    decodedCursor: decodeCursor(cursor),
    take: clampedLimit + 1, // fetch one extra to determine `hasMore`
    encodeNextCursor,
  };
}

/**
 * Convenience helper – builds the final `CursorResult<T>` from an over-fetched
 * array (where you requested `take + 1` items).
 */
export function buildCursorResult<T>(
  items: T[],
  take: number,         // the original `take` returned from `paginate` (which is limit + 1)
  encodeNextCursor: (value: string) => string,
  getId: (item: T) => string,
): CursorResult<T> {
  const hasMore = items.length > take - 1; // take was clamped_limit + 1
  const sliced = hasMore ? items.slice(0, take - 1) : items;
  const nextCursor = hasMore && sliced.length > 0
    ? encodeNextCursor(getId(sliced[sliced.length - 1]!))
    : null;

  return {
    items: sliced,
    nextCursor,
    hasMore,
  };
}
