// =============================================================================
// Honey — Socket.IO Main Setup
// =============================================================================
// Creates the Socket.IO server, applies middleware, registers handlers,
// and manages the connection / disconnection lifecycle including
// reconnection support for missed messages.
// =============================================================================

import type { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { redis } from '../config/redis';
import { config } from '../config';
import { logger } from '../utils/logger';
import { authenticateSocket } from './middleware';
import { registerMessengerHandlers } from './handlers/messenger';
import { registerPresenceHandlers } from './handlers/presence';
import { registerCallHandlers } from './handlers/calls';
import { registerStreamHandlers } from './handlers/streams';
import { setupRedisBridge } from './redis-bridge';
import type { HoneyIOServer, HoneySocket, MessagePayload } from './types';

// ---- Constants --------------------------------------------------------------

const RECONNECTION_MESSAGE_BUFFER_MS = 300_000; // 5 minutes
const MISSED_MESSAGES_KEY_PREFIX = 'missed:messages:';
const LAST_SEEN_KEY_PREFIX = 'last:seen:';

// ---- Create Server ----------------------------------------------------------

/**
 * Sets up the Socket.IO server with all middleware and handlers.
 *
 * @param httpServer - The Node.js HTTP server to attach to.
 * @returns The configured Socket.IO server instance.
 */
export function setupSocket(httpServer: HttpServer): HoneyIOServer {
  const io = new Server<
    import('./types').ClientToServerEvents,
    import('./types').ServerToClientEvents,
    import('./types').InterServerEvents,
    import('./types').AuthenticatedSocketData
  >(httpServer, {
    cors: {
      origin: config.FRONTEND_URL.split(',').map((o) => o.trim()),
      credentials: true,
      methods: ['GET', 'POST'],
    },
    // Transports: prefer websocket, fall back to polling
    transports: ['websocket', 'polling'],
    // Ping timeout and interval for detecting dead connections
    pingTimeout: 20_000,
    pingInterval: 10_000,
    // Allow connections from up to 5 sockets per user
    maxHttpBufferSize: 1e6, // 1 MB
  }) as HoneyIOServer;

  // ---- Redis Adapter (optional — falls back to in-memory) ------------------

  try {
    if (redis.kind === 'redis') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createAdapter } = require('@socket.io/redis-adapter');
      const pubClient = redis.duplicate();
      const subClient = pubClient.duplicate();

      void pubClient.connect().then(() => {
        return subClient.connect();
      }).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        logger.info('socket:redis adapter connected');
      }).catch(() => {
        logger.warn('socket: no Redis adapter, using in-memory mode');
      });
    } else {
      logger.warn('socket: Redis unavailable, using in-memory socket adapter');
    }
  } catch {
    logger.info('socket: @socket.io/redis-adapter not installed, using in-memory mode');
  }

  // ---- Authentication Middleware --------------------------------------------

  io.use(authenticateSocket);

  // ---- Register Handlers ----------------------------------------------------

  registerMessengerHandlers(io);
  registerPresenceHandlers(io);
  registerCallHandlers(io);
  registerStreamHandlers(io);
  void setupRedisBridge(io);

  // ---- Connection / Disconnection -------------------------------------------

  io.on('connection', handleConnection);

  logger.info('socket:server initialized');

  return io;
}

// ---- Connection Handler -----------------------------------------------------

/**
 * Handles the full connection lifecycle: sets up the lastSeen tracker,
 * handles reconnection (delivers missed messages), and manages cleanup
 * on disconnect.
 */
function handleConnection(socket: HoneySocket): void {
  const userId: string = socket.data.userId;
  const connectedAt: number = socket.data.connectedAt;

  logger.info('socket:connected', {
    socketId: socket.id,
    userId,
  });

  // Track last seen for this user (used for reconnection missed-message recovery)
  trackLastSeen(userId, connectedAt);

  // Handle reconnection: deliver missed messages
  void deliverMissedMessages(socket, userId);

  // Auth verify handler (client can re-verify after connect)
  socket.on('auth:verify', (_token: string, callback) => {
    callback({ userId });
  });

  // Disconnect handler
  socket.on('disconnect', (reason: string) => {
    logger.info('socket:disconnected', {
      socketId: socket.id,
      userId,
      reason,
      duration: Date.now() - connectedAt,
    });
  });
}

// ---- Last Seen Tracking -----------------------------------------------------

/**
 * Stores the timestamp of the user's most recent connection in Redis.
 * Used to compute which messages were missed during disconnection.
 */
async function trackLastSeen(userId: string, timestamp: number): Promise<void> {
  try {
    await redis.set(
      `${LAST_SEEN_KEY_PREFIX}${userId}`,
      String(timestamp),
      'EX',
      Math.ceil(RECONNECTION_MESSAGE_BUFFER_MS / 1000) * 2,
    );
  } catch (err) {
    logger.error('socket: trackLastSeen failed', {
      userId,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---- Missed Message Delivery ------------------------------------------------

/**
 * On reconnection, checks for messages the user missed since their last
 * disconnect and delivers them. Messages are buffered in a Redis list.
 *
 * The approach:
 *  1. Read the `lastSeen` timestamp from Redis
 *  2. Query the DB for messages in the user's conversations since that timestamp
 *  3. Deliver them to the client via `message:new` events
 *  4. Update lastSeen to now
 */
async function deliverMissedMessages(
  socket: HoneySocket,
  userId: string,
): Promise<void> {
  try {
    const lastSeenKey = `${LAST_SEEN_KEY_PREFIX}${userId}`;
    const rawLastSeen = await redis.get(lastSeenKey);

    if (!rawLastSeen) {
      // First connection or expired — no missed messages to deliver
      return;
    }

    const lastSeenTimestamp = new Date(Number(rawLastSeen));
    const now = new Date();

    // Only look for messages missed in the last 5 minutes
    const cutoffDate = new Date(
      Math.max(
        lastSeenTimestamp.getTime(),
        now.getTime() - RECONNECTION_MESSAGE_BUFFER_MS,
      ),
    );

    // Find all conversation IDs the user belongs to
    const memberships = await import('../config/prisma').then((m) =>
      m.prisma.conversationMember.findMany({
        where: { userId },
        select: { conversationId: true },
      }),
    );

    if (memberships.length === 0) return;

    const conversationIds = memberships.map((m) => m.conversationId);

    // Fetch missed messages
    const missedMessages = await import('../config/prisma').then((m) =>
      m.prisma.message.findMany({
        where: {
          conversationId: { in: conversationIds },
          createdAt: { gt: cutoffDate },
          senderId: { not: userId },
          isDeleted: false,
        },
        include: {
          sender: {
            select: { id: true, username: true, avatarUrl: true },
          },
          attachments: {
            select: {
              id: true,
              type: true,
              fileName: true,
              fileSize: true,
              thumbnailUrl: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
        take: 100, // Cap at 100 missed messages
      }),
    );

    if (missedMessages.length > 0) {
      logger.info('socket:delivering missed messages', {
        userId: socket.data.userId,
        count: missedMessages.length,
      });

      for (const msg of missedMessages) {
        const payload: MessagePayload = {
          id: msg.id,
          conversationId: msg.conversationId,
          senderId: msg.senderId,
          content: msg.content,
          type: msg.type,
          replyToId: msg.replyToId,
          isEdited: msg.isEdited,
          createdAt: msg.createdAt.toISOString(),
          sender: msg.sender
            ? {
                id: msg.sender.id,
                username: msg.sender.username,
                avatarUrl: msg.sender.avatarUrl,
              }
            : undefined,
          attachments: msg.attachments.map((a) => ({
            id: a.id,
            type: a.type,
            fileName: a.fileName,
            fileSize: Number(a.fileSize),
            thumbnailUrl: a.thumbnailUrl,
          })),
        };

        socket.emit('message:new', payload);
      }
    }

    // Update lastSeen
    await trackLastSeen(userId, Date.now());
  } catch (err) {
    logger.error('socket:deliverMissedMessages failed', {
      userId,
      error: err instanceof Error ? err.message : String(err),
    });
    // Non-critical — do not disconnect the user
  }
}
