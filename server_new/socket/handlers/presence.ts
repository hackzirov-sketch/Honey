// =============================================================================
// Honey — Socket.IO Presence Handler
// =============================================================================
// Tracks user online/offline/away/busy status using Redis with TTL.
// Broadcasts presence changes to relevant conversation rooms.
// =============================================================================

import { redis, key } from '../../config/redis';
import { prisma } from '../../config/prisma';
import { logger } from '../../utils/logger';
import type {
  HoneySocket,
  HoneyIOServer,
  PresenceStatusData,
  PresenceUpdateData,
} from '../types';

// ---- Constants --------------------------------------------------------------

const PRESENCE_TTL_SECONDS = 120; // Redis key expires after 2 min of no heartbeat
const PRESENCE_RATE_LIMIT_WINDOW = 10_000; // 10 seconds
const PRESENCE_RATE_LIMIT_MAX = 1; // 1 update per 10 seconds

// ---- Helpers ----------------------------------------------------------------

interface PresenceValue {
  userId: string;
  username: string;
  status: 'online' | 'away' | 'busy';
  socketId: string;
  lastSeen: string;
}

function parsePresenceValue(raw: string | null): PresenceValue | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PresenceValue;
  } catch {
    return null;
  }
}

/**
 * Get all conversation IDs for a user (used to broadcast presence).
 */
async function getUserConversationIds(userId: string): Promise<string[]> {
  const memberships = await prisma.conversationMember.findMany({
    where: { userId },
    select: { conversationId: true },
  });
  return memberships.map((m) => m.conversationId);
}

// ---- Presence on Connect ----------------------------------------------------

/**
 * Called when a socket connects. Sets the user as online in Redis
 * and broadcasts to their conversations.
 */
export async function handlePresenceConnect(
  io: HoneyIOServer,
  socket: HoneySocket,
): Promise<void> {
  const userId: string = socket.data.userId;

  // Fetch username for presence data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });

  const username = user?.username ?? userId;
  socket.data.username = username;

  const lastSeen = new Date().toISOString();
  const presenceValue: PresenceValue = {
    userId,
    username,
    status: 'online',
    socketId: socket.id,
    lastSeen,
  };

  // Store presence in Redis with TTL (acts as heartbeat expiry)
  const redisKey = key('presence', userId);
  await redis.set(
    redisKey,
    JSON.stringify(presenceValue),
    'EX',
    PRESENCE_TTL_SECONDS,
  );

  // Update user's lastSeen in DB
  await prisma.user.update({
    where: { id: userId },
    data: { lastSeen: new Date() },
  });

  // Join the user's personal notification room
  await socket.join(`user:${userId}`);

  // Broadcast online status to all conversations
  const conversationIds = await getUserConversationIds(userId);
  const broadcastData: PresenceStatusData = { userId, lastSeen };

  for (const convId of conversationIds) {
    io.to(`conversation:${convId}`).emit('presence:online', broadcastData);
  }

  logger.debug('socket:presence:connect', {
    socketId: socket.id,
    userId,
    conversationCount: conversationIds.length,
  });
}

// ---- Presence on Disconnect -------------------------------------------------

/**
 * Called when a socket disconnects. Checks if the user has other active
 * sockets. If not, marks them as offline.
 */
export async function handlePresenceDisconnect(
  io: HoneyIOServer,
  socket: HoneySocket,
): Promise<void> {
  const userId: string = socket.data.userId;
  const username: string = socket.data.username;

  // Check if the user has other active sockets in the same server
  // (In multi-server setups, Redis adapter handles this)
  const userSockets = await io.in(`user:${userId}`).fetchSockets();
  const hasOtherSockets = userSockets.length > 0;

  if (hasOtherSockets) {
    // User still has other active connections — do not mark offline
    logger.debug('socket:presence:disconnect (still connected elsewhere)', {
      socketId: socket.id,
      userId,
      remainingSockets: userSockets.length,
    });
    return;
  }

  const lastSeen = new Date().toISOString();

  // Remove from Redis (or let it expire naturally)
  const redisKey = key('presence', userId);
  await redis.del(redisKey);

  // Update user's lastSeen in DB
  await prisma.user
    .update({
      where: { id: userId },
      data: { lastSeen: new Date() },
    })
    .catch(() => {
      // Non-critical
    });

  // Broadcast offline status to all conversations
  const conversationIds = await getUserConversationIds(userId);
  const broadcastData: PresenceStatusData = { userId, lastSeen };

  for (const convId of conversationIds) {
    io.to(`conversation:${convId}`).emit('presence:offline', broadcastData);
  }

  logger.debug('socket:presence:disconnect', {
    socketId: socket.id,
    userId,
    username,
  });
}

// ---- Handler: presence:update -----------------------------------------------

async function handlePresenceUpdate(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: PresenceUpdateData,
): Promise<void> {
  const { status } = data;
  const userId: string = socket.data.userId;
  const username: string = socket.data.username;

  if (!status || !['online', 'away', 'busy'].includes(status)) {
    socket.emit('error', {
      event: 'presence:update',
      message: 'Invalid status. Must be "online", "away", or "busy"',
    });
    return;
  }

  // Rate limit: max 1 update per 10 seconds per user
  const rateLimitKey = key('presence:ratelimit', userId);
  const currentCount = await redis.incr(rateLimitKey);

  if (currentCount === 1) {
    await redis.expire(rateLimitKey, Math.ceil(PRESENCE_RATE_LIMIT_WINDOW / 1000));
  }

  if (currentCount > PRESENCE_RATE_LIMIT_MAX) {
    socket.emit('error', {
      event: 'presence:update',
      message: 'Presence update rate limit exceeded',
    });
    return;
  }

  const lastSeen = new Date().toISOString();
  const presenceValue: PresenceValue = {
    userId,
    username,
    status,
    socketId: socket.id,
    lastSeen,
  };

  // Update Redis
  const redisKey = key('presence', userId);
  await redis.set(
    redisKey,
    JSON.stringify(presenceValue),
    'EX',
    PRESENCE_TTL_SECONDS,
  );

  // Broadcast to all conversations
  const conversationIds = await getUserConversationIds(userId);
  const broadcastData: PresenceStatusData = { userId, lastSeen };

  const eventName = status === 'online' ? 'presence:online' : 'presence:offline';

  for (const convId of conversationIds) {
    io.to(`conversation:${convId}`).emit(eventName, broadcastData);
  }

  logger.debug('socket:presence:update', {
    socketId: socket.id,
    userId,
    status,
  });
}

// ---- Registration -----------------------------------------------------------

export function registerPresenceHandlers(io: HoneyIOServer): void {
  io.on('connection', (socket: HoneySocket) => {
    // Handle connect presence
    void handlePresenceConnect(io, socket);

    // Handle disconnect presence
    socket.on('disconnect', () => {
      void handlePresenceDisconnect(io, socket);
    });

    // Presence update event
    socket.on('presence:update', (data: PresenceUpdateData) => {
      void handlePresenceUpdate(io, socket, data);
    });
  });
}
