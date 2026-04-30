import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function required(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

function numberEnv(key: string, fallback: number): number {
  const raw = process.env[key];
  if (raw === undefined) return fallback;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return fallback;
  return parsed;
}

// ─── Application ────────────────────────────────────────────────────────────────

export const config = {
  /** Application server port */
  port: numberEnv('PORT', 5000),

  /** Node environment – 'development' | 'production' | 'test' */
  nodeEnv: optional('NODE_ENV', 'development') as 'development' | 'production' | 'test',

  /** CORS whitelist (comma-separated origins) */
  frontendUrl: optional('FRONTEND_URL', 'http://localhost:3000'),

  /** Is the app running in production? */
  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  },

  /** Is the app running in development? */
  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  },

  // ─── Database ────────────────────────────────────────────────────────────────
  database: {
    url: required('DATABASE_URL'),
  },

  // ─── JWT ─────────────────────────────────────────────────────────────────────
  jwt: {
    secret: required('JWT_SECRET'),
    accessExpiresIn: optional('JWT_ACCESS_EXPIRES', '15m'),
    refreshExpiresIn: optional('JWT_REFRESH_EXPIRES', '7d'),
  },

  // ─── Redis ───────────────────────────────────────────────────────────────────
  redis: {
    url: optional('REDIS_URL', 'redis://localhost:6379'),
    prefix: optional('REDIS_PREFIX', 'honey:'),
  },

  // ─── File uploads ────────────────────────────────────────────────────────────
  upload: {
    path: optional('UPLOAD_PATH', './uploads'),
    maxFileSize: numberEnv('MAX_FILE_SIZE', 50 * 1024 * 1024), // 50 MB
  },

  // ─── Email (SMTP) ────────────────────────────────────────────────────────────
  email: {
    host: optional('EMAIL_HOST', 'smtp.ethereal.email'),
    port: numberEnv('EMAIL_PORT', 587),
    user: optional('EMAIL_USER', ''),
    password: optional('EMAIL_PASSWORD', ''),
    from: optional('EMAIL_FROM', 'noreply@honey.app'),
  },

  // ─── AI services ─────────────────────────────────────────────────────────────
  ai: {
    apiKey: optional('AI_API_KEY', ''),
    baseUrl: optional('AI_BASE_URL', 'https://api.openai.com/v1'),
    model: optional('AI_MODEL', 'gpt-4o-mini'),
    maxTokens: numberEnv('AI_MAX_TOKENS', 2048),
    temperature: numberEnv('AI_TEMPERATURE', 0.7),
  },

  // ─── Rate limiting ───────────────────────────────────────────────────────────
  rateLimit: {
    windowMs: numberEnv('RATE_LIMIT_WINDOW_MS', 60_000),   // 1 minute
    max: numberEnv('RATE_LIMIT_MAX', 100),
    authWindowMs: numberEnv('RATE_LIMIT_AUTH_WINDOW_MS', 900_000), // 15 min
    authMax: numberEnv('RATE_LIMIT_AUTH_MAX', 5),
    socketWindowMs: numberEnv('RATE_LIMIT_SOCKET_WINDOW_MS', 60_000),
    socketMax: numberEnv('RATE_LIMIT_SOCKET_MAX', 60),
  },

  // ─── Convenience aliases ─────────────────────────────────────────────────────
  get DATABASE_URL(): string {
    return this.database.url;
  },
  get JWT_SECRET(): string {
    return this.jwt.secret;
  },
  get JWT_ACCESS_EXPIRES(): string {
    return this.jwt.accessExpiresIn;
  },
  get JWT_REFRESH_EXPIRES(): string {
    return this.jwt.refreshExpiresIn;
  },
  get REDIS_URL(): string {
    return this.redis.url;
  },
  get REDIS_PREFIX(): string {
    return this.redis.prefix;
  },
  get PORT(): number {
    return this.port;
  },
  get NODE_ENV(): string {
    return this.nodeEnv;
  },
  get FRONTEND_URL(): string {
    return this.frontendUrl;
  },
  get UPLOAD_PATH(): string {
    return this.upload.path;
  },
  get MAX_FILE_SIZE(): number {
    return this.upload.maxFileSize;
  },
} as const;

export type Config = typeof config;
