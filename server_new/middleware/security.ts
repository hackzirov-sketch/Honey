import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from '../config';

/**
 * Apply security-related middleware to the Express app.
 */
export function applySecurityMiddleware(app: Express): void {
  // ─── Trust proxy ────────────────────────────────────────────────────────────
  app.set('trust proxy', 1);

  // ─── Helmet (CSP, XSS, etc.) ────────────────────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'blob:'],
          fontSrc: ["'self'"],
          connectSrc: ["'self'", ...(config.isDevelopment ? ['ws:', 'wss:'] : [])],
          mediaSrc: ["'self'", 'blob:'],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false, // Needed for certain file-upload flows
      hsts: config.isProduction
        ? { maxAge: 31_536_000, includeSubDomains: true, preload: true }
        : false,
    }),
  );

  // ─── CORS ────────────────────────────────────────────────────────────────────
  const allowedOrigins = config.FRONTEND_URL.split(',').map((o) => o.trim());

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, server-to-server)
        if (!origin) {
          callback(null, true);
          return;
        }

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Request-ID',
        'X-Device-ID',
      ],
      exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
      credentials: true,
      maxAge: 86400, // 24 hours preflight cache
    }),
  );

  // ─── Body parsing limits ────────────────────────────────────────────────────
  app.use(express.json({ limit: config.MAX_FILE_SIZE }));
  app.use(express.urlencoded({ extended: true, limit: config.MAX_FILE_SIZE }));
}
