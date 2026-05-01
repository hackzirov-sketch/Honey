// =============================================================================
// Honey Web App — Main Entry Point
// =============================================================================
// Production-ready Express + Socket.IO server with:
//   - Helmet security headers
//   - CORS whitelist
//   - Request logging with X-Request-ID
//   - Zod validation middleware
//   - Redis-backed rate limiting
//   - JWT authentication
//   - Socket.IO with Redis adapter
//   - Graceful shutdown
// =============================================================================

import express from 'express';
import { createServer } from 'http';
import { config } from './config';
import { redis } from './config/redis';
import { applySecurityMiddleware } from './middleware/security';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './errors/handler';
import { logger } from './utils/logger';
import { setupSocket } from './socket';
import type { HoneyIOServer } from './socket/types';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const RedisAdapter = (() => {
  try {
    return require('@socket.io/redis-adapter').createAdapter;
  } catch {
    return null;
  }
})();

// ─── Route Modules ───────────────────────────────────────────────────────────

import { authRoutes } from './modules/auth/routes/auth.routes';
import { userRoutes } from './modules/users/routes/user.routes';
import { conversationRoutes } from './modules/conversations/routes/conversation.routes';
import { messageRoutes } from './modules/messages/routes/message.routes';
import { callRoutes } from './modules/calls/routes/call.routes';
import { streamRoutes } from './modules/streams/routes/stream.routes';
import { notificationRoutes } from './modules/notifications/routes/notification.routes';
import { fileRoutes } from './modules/files/routes/file.routes';
import { privacyRoutes } from './modules/privacy/routes/privacy.routes';
import { auditRoutes } from './modules/audit/routes/audit.routes';
import { adminRoutes } from './modules/admin/routes/admin.routes';
import { integrationRoutes } from './modules/integrations/routes/integration.routes';
import {
  legacyChatRoutes,
  legacyLiveRoutes,
  legacyVideoRoutes,
  legacyCommentRoutes,
} from './modules/compat/routes/legacy.routes';

// ─── App Bootstrap ───────────────────────────────────────────────────────────

const app = express();

// 1. Security (helmet, CORS, body parsing, trust proxy)
applySecurityMiddleware(app);

// 2. Request logger (assigns X-Request-ID, logs method/path/status/duration)
app.use(requestLogger);

// 3. Health check (public, no auth)
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      uptime: process.uptime(),
    },
  });
});

// 4. API Routes — /api/v1/*
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/conversations', conversationRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/calls', callRoutes);
app.use('/api/v1/streams', streamRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/files', fileRoutes);
app.use('/api/v1/privacy', privacyRoutes);
app.use('/api/v1/audit', auditRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/integrations', integrationRoutes);
app.use('/api/v1/chat', legacyChatRoutes);
app.use('/api/v1/live', legacyLiveRoutes);
app.use('/api/v1/video', legacyVideoRoutes);
app.use('/api/v1/comment', legacyCommentRoutes);

// 5. 404 catch-all for unmatched API routes
app.use('/api', (_req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Route not found' },
  });
});

// 6. Global error handler (must be last middleware)
app.use(errorHandler);

// ─── HTTP + Socket.IO Server ─────────────────────────────────────────────────

const httpServer = createServer(app);

let io: HoneyIOServer;

async function initServer(): Promise<void> {
  try {
    // Connect Redis
    await redis.connect();
    logger.info('Redis connected', { url: config.REDIS_URL });
  } catch (err) {
    logger.warn('Redis connection failed — running without Redis', {
      error: err instanceof Error ? err.message : String(err),
    });
  }

  // Setup Socket.IO with all handlers
  io = setupSocket(httpServer);

  // Store io instance on app for route handlers to access
  app.set('io', io);

  httpServer.listen(config.PORT, () => {
    logger.info(`Honey API server running on http://localhost:${config.PORT}`, {
      port: config.PORT,
      env: config.NODE_ENV,
      apiVersion: 'v1',
    });
    logger.info('API Routes registered:', {
      routes: [
        'GET  /api/health',
        'POST /api/v1/auth/register',
        'POST /api/v1/auth/login',
        'POST /api/v1/auth/refresh',
        'POST /api/v1/auth/logout',
        'GET  /api/v1/auth/me',
        'GET  /api/v1/users/me',
        'GET  /api/v1/users/:username',
        'PATCH /api/v1/users/profile',
        'GET  /api/v1/conversations',
        'POST /api/v1/conversations',
        'GET  /api/v1/messages/:conversationId',
        'POST /api/v1/messages/:conversationId',
        'POST /api/v1/calls',
        'POST /api/v1/calls/join',
        'GET  /api/v1/streams',
        'POST /api/v1/streams',
        'GET  /api/v1/notifications',
        'POST /api/v1/files/upload',
        'GET  /api/v1/privacy',
        'PATCH /api/v1/privacy',
        'GET  /api/v1/admin/stats',
        'GET  /api/v1/integrations/status',
      ],
    });
  });
}

// ─── Graceful Shutdown ───────────────────────────────────────────────────────

const shutdownSignals: readonly NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

for (const signal of shutdownSignals) {
  process.on(signal, () => {
    logger.info(`Received ${signal}, shutting down gracefully...`);

    // Stop accepting new connections
    if (io) {
      io.close();
    }

    httpServer.close(() => {
      logger.info('HTTP server closed');
    });

    void redis.quit().finally(() => {
      logger.info('Shutdown complete');
      process.exit(0);
    });

    // Force exit after 10 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10_000);
  });
}

// ─── Error Handling ──────────────────────────────────────────────────────────

process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught exception', {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled rejection', {
    reason: reason instanceof Error ? reason.message : String(reason),
  });
  process.exit(1);
});

// ─── Boot ─────────────────────────────────────────────────────────────────────

initServer().catch((err: Error) => {
  logger.error('Failed to start server', {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});
