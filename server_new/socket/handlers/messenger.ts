// =============================================================================
// Honey — Socket.IO Messenger Handler
// =============================================================================
// Handles all messaging-related socket events: send, edit, delete, react,
// typing indicators, read receipts, and conversation room management.
// =============================================================================

import { redis, key } from '../../config/redis';
import { prisma } from '../../config/prisma';
import { SocketError, ErrorCode } from '../../errors';
import { logger } from '../../utils/logger';
import type {
  HoneySocket,
  HoneyIOServer,
  MessageSendData,
  MessageEditData,
  MessageDeleteData,
  MessageReactData,
  TypingData,
  MessageReadData,
  MessagePayload,
  ReactionPayload,
} from '../types';

// ---- Constants --------------------------------------------------------------

const MESSAGE_RATE_LIMIT = 30; // messages per 60 seconds
const TYPING_DEBOUNCE_MS = 3000;
const REACTION_COOLDOWN_MS = 1000;
const MAX_CONTENT_LENGTH = 10000;

// ---- Room naming helpers ----------------------------------------------------

function conversationRoom(conversationId: string): string {
  return `conversation:${conversationId}`;
}

function userRoom(userId: string): string {
  return `user:${userId}`;
}

// ---- Typing tracker ---------------------------------------------------------

const typingTimers = new Map<string, ReturnType<typeof setTimeout>>();

function clearTypingTimer(socketId: string, conversationId: string): void {
  const timerKey = `${socketId}:${conversationId}`;
  const existing = typingTimers.get(timerKey);
  if (existing) {
    clearTimeout(existing);
    typingTimers.delete(timerKey);
  }
}

// ---- Helper: serialize message for broadcast --------------------------------

async function serializeMessagePayload(
  message: {
    id: string;
    conversationId: string;
    senderId: string;
    content: string | null;
    type: string;
    replyToId: string | null;
    isEdited: boolean;
    createdAt: Date;
    isDeleted: boolean;
  },
  includeSender = false,
): Promise<MessagePayload> {
  const payload: MessagePayload = {
    id: message.id,
    conversationId: message.conversationId,
    senderId: message.senderId,
    content: message.content,
    type: message.type,
    replyToId: message.replyToId,
    isEdited: message.isEdited,
    createdAt: message.createdAt.toISOString(),
  };

  if (includeSender) {
    const sender = await prisma.user.findUnique({
      where: { id: message.senderId },
      select: { id: true, username: true, avatarUrl: true },
    });
    if (sender) {
      payload.sender = {
        id: sender.id,
        username: sender.username,
        avatarUrl: sender.avatarUrl,
      };
    }
  }

  // Load attachments
  const attachments = await prisma.messageAttachment.findMany({
    where: { messageId: message.id },
    select: {
      id: true,
      type: true,
      fileName: true,
      fileSize: true,
      thumbnailUrl: true,
    },
  });

  if (attachments.length > 0) {
    payload.attachments = attachments.map((a) => ({
      id: a.id,
      type: a.type,
      fileName: a.fileName,
      fileSize: Number(a.fileSize),
      thumbnailUrl: a.thumbnailUrl,
    }));
  }

  return payload;
}

// ---- Handler: message:send --------------------------------------------------

async function handleMessageSend(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MessageSendData,
): Promise<void> {
  const { conversationId, content, type, replyToId, idempotencyKey } = data;
  const userId: string = socket.data.userId;

  if (!conversationId || !content || content.trim().length === 0) {
    socket.emit('error', {
      event: 'message:send',
      message: 'conversationId and non-empty content are required',
    });
    return;
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    socket.emit('error', {
      event: 'message:send',
      message: `Content exceeds maximum length of ${MAX_CONTENT_LENGTH} characters`,
    });
    return;
  }

  // Verify membership
  const membership = await prisma.conversationMember.findUnique({
    where: {
      userId_conversationId: { userId, conversationId },
    },
    select: {
      id: true,
      isBanned: true,
      isMuted: true,
      mutedUntil: true,
      conversation: {
        select: { deletedAt: true },
      },
    },
  });

  if (!membership) {
    socket.emit('error', {
      event: 'message:send',
      message: 'You are not a member of this conversation',
    });
    return;
  }

  if (membership.isBanned) {
    socket.emit('error', {
      event: 'message:send',
      message: 'You are banned from this conversation',
    });
    return;
  }

  if (membership.conversation.deletedAt) {
    socket.emit('error', {
      event: 'message:send',
      message: 'This conversation has been deleted',
    });
    return;
  }

  // Check block status (for private conversations)
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: { type: true },
  });

  if (conversation?.type === 'PRIVATE') {
    const otherMember = await prisma.conversationMember.findFirst({
      where: {
        conversationId,
        userId: { not: userId },
      },
      select: { userId: true },
    });

    if (otherMember) {
      const blockedByOther = await prisma.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: otherMember.userId,
            blockedId: userId,
          },
        },
      });

      if (blockedByOther) {
        socket.emit('error', {
          event: 'message:send',
          message: 'Cannot send messages to this user',
        });
        return;
      }
    }
  }

  // Check idempotency key (deduplication)
  if (idempotencyKey) {
    const existingKey = await redis.get(
      key('idempotency', idempotencyKey),
    );

    if (existingKey) {
      // Already processed — return the existing message
      try {
        const existingMessage = await prisma.message.findUnique({
          where: { id: existingKey },
        });
        if (existingMessage && !existingMessage.isDeleted) {
          const payload = await serializeMessagePayload(existingMessage, true);
          socket.emit('message:new', payload);
          return;
        }
      } catch {
        // If lookup fails, proceed to create a new message
      }
    }
  }

  // Validate reply target
  if (replyToId) {
    const replyMessage = await prisma.message.findUnique({
      where: { id: replyToId },
      select: {
        conversationId: true,
        isDeleted: true,
        deletedAt: true,
      },
    });

    if (!replyMessage || replyMessage.isDeleted || replyMessage.conversationId !== conversationId) {
      socket.emit('error', {
        event: 'message:send',
        message: 'Invalid reply target',
      });
      return;
    }
  }

  // Create message
  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId: userId,
      content: content.trim(),
      type: type.toUpperCase(),
      replyToId: replyToId ?? null,
      idempotencyKey: idempotencyKey ?? null,
    },
  });

  // Store idempotency key → messageId (TTL: 24h)
  if (idempotencyKey) {
    await redis.set(
      key('idempotency', idempotencyKey),
      message.id,
      'EX',
      86400,
    );
  }

  // Update conversation's lastMessageAt
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date() },
  });

  // Broadcast to conversation room
  const roomName = conversationRoom(conversationId);
  const payload = await serializeMessagePayload(message, true);
  io.to(roomName).emit('message:new', payload);

  logger.debug('socket:message:send', {
    socketId: socket.id,
    userId,
    conversationId,
    messageId: message.id,
  });

  // Create notifications for offline / non-focused members
  await notifyOfflineMembers(io, conversationId, userId, message);
}

// ---- Handler: message:edit --------------------------------------------------

async function handleMessageEdit(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MessageEditData,
): Promise<void> {
  const { messageId, content } = data;
  const userId: string = socket.data.userId;

  if (!messageId || !content || content.trim().length === 0) {
    socket.emit('error', {
      event: 'message:edit',
      message: 'messageId and non-empty content are required',
    });
    return;
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    socket.emit('error', {
      event: 'message:edit',
      message: `Content exceeds maximum length of ${MAX_CONTENT_LENGTH} characters`,
    });
    return;
  }

  const message = await prisma.message.findUnique({
    where: { id: messageId },
    select: {
      senderId: true,
      conversationId: true,
      isDeleted: true,
      deletedAt: true,
    },
  });

  if (!message || message.isDeleted) {
    socket.emit('error', {
      event: 'message:edit',
      message: 'Message not found or deleted',
    });
    return;
  }

  if (message.senderId !== userId) {
    socket.emit('error', {
      event: 'message:edit',
      message: 'You can only edit your own messages',
    });
    return;
  }

  const updated = await prisma.message.update({
    where: { id: messageId },
    data: {
      content: content.trim(),
      isEdited: true,
      editedAt: new Date(),
    },
  });

  const payload = await serializeMessagePayload(updated, true);
  io.to(conversationRoom(message.conversationId)).emit('message:updated', payload);

  logger.debug('socket:message:edit', {
    socketId: socket.id,
    userId,
    messageId,
    conversationId: message.conversationId,
  });
}

// ---- Handler: message:delete ------------------------------------------------

async function handleMessageDelete(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MessageDeleteData,
): Promise<void> {
  const { messageId } = data;
  const userId: string = socket.data.userId;

  if (!messageId) {
    socket.emit('error', {
      event: 'message:delete',
      message: 'messageId is required',
    });
    return;
  }

  const message = await prisma.message.findUnique({
    where: { id: messageId },
    select: {
      senderId: true,
      conversationId: true,
      isDeleted: true,
    },
  });

  if (!message || message.isDeleted) {
    socket.emit('error', {
      event: 'message:delete',
      message: 'Message not found or already deleted',
    });
    return;
  }

  // Verify ownership or admin role
  const isOwner = message.senderId === userId;

  if (!isOwner) {
    const member = await prisma.conversationMember.findUnique({
      where: {
        userId_conversationId: { userId, conversationId: message.conversationId },
      },
      select: { role: true },
    });

    if (!member || (member.role !== 'OWNER' && member.role !== 'ADMIN')) {
      socket.emit('error', {
        event: 'message:delete',
        message: 'Only the sender or an admin can delete this message',
      });
      return;
    }
  }

  await prisma.message.update({
    where: { id: messageId },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: userId,
      content: null,
    },
  });

  const roomName = conversationRoom(message.conversationId);
  io.to(roomName).emit('message:deleted', {
    messageId,
    conversationId: message.conversationId,
    deletedBy: userId,
  });

  logger.debug('socket:message:delete', {
    socketId: socket.id,
    userId,
    messageId,
    conversationId: message.conversationId,
  });
}

// ---- Handler: message:react -------------------------------------------------

async function handleMessageReact(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MessageReactData,
): Promise<void> {
  const { messageId, emoji } = data;
  const userId: string = socket.data.userId;

  if (!messageId || !emoji) {
    socket.emit('error', {
      event: 'message:react',
      message: 'messageId and emoji are required',
    });
    return;
  }

  if (emoji.length > 16) {
    socket.emit('error', {
      event: 'message:react',
      message: 'Emoji must be 16 characters or fewer',
    });
    return;
  }

  const message = await prisma.message.findUnique({
    where: { id: messageId },
    select: {
      conversationId: true,
      isDeleted: true,
    },
  });

  if (!message || message.isDeleted) {
    socket.emit('error', {
      event: 'message:react',
      message: 'Message not found or deleted',
    });
    return;
  }

  // Verify membership
  const isMember = await prisma.conversationMember.findUnique({
    where: {
      userId_conversationId: { userId, conversationId: message.conversationId },
    },
    select: { id: true },
  });

  if (!isMember) {
    socket.emit('error', {
      event: 'message:react',
      message: 'You are not a member of this conversation',
    });
    return;
  }

  // Upsert: toggle reaction (create if not exists, delete if exists)
  const existingReaction = await prisma.messageReaction.findUnique({
    where: {
      messageId_userId_emoji: { messageId, userId, emoji },
    },
  });

  if (existingReaction) {
    await prisma.messageReaction.delete({
      where: { id: existingReaction.id },
    });
  } else {
    await prisma.messageReaction.create({
      data: { messageId, userId, emoji },
    });
  }

  // Fetch all reactions for this message
  const reactions = await prisma.messageReaction.findMany({
    where: { messageId },
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  const reactionPayloads: ReactionPayload[] = reactions.map((r) => ({
    id: r.id,
    userId: r.userId,
    username: r.user.username,
    emoji: r.emoji,
  }));

  io.to(conversationRoom(message.conversationId)).emit('reaction:updated', {
    messageId,
    reactions: reactionPayloads,
  });

  logger.debug('socket:message:react', {
    socketId: socket.id,
    userId,
    messageId,
    emoji,
    removed: !!existingReaction,
  });
}

// ---- Handler: typing:start / typing:stop ------------------------------------

async function handleTypingStart(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: TypingData,
): Promise<void> {
  const { conversationId } = data;
  const userId: string = socket.data.userId;

  if (!conversationId) return;

  const roomName = conversationRoom(conversationId);

  // Clear existing timer for this socket+conversation combo
  clearTypingTimer(socket.id, conversationId);

  socket.to(roomName).emit('typing:indicator', {
    conversationId,
    userId,
    isTyping: true,
  });

  // Auto-stop typing after TYPING_DEBOUNCE_MS
  const timerKey = `${socket.id}:${conversationId}`;
  typingTimers.set(
    timerKey,
    setTimeout(() => {
      socket.to(roomName).emit('typing:indicator', {
        conversationId,
        userId,
        isTyping: false,
      });
      typingTimers.delete(timerKey);
    }, TYPING_DEBOUNCE_MS),
  );
}

async function handleTypingStop(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: TypingData,
): Promise<void> {
  const { conversationId } = data;
  const userId: string = socket.data.userId;

  if (!conversationId) return;

  clearTypingTimer(socket.id, conversationId);

  socket.to(conversationRoom(conversationId)).emit('typing:indicator', {
    conversationId,
    userId,
    isTyping: false,
  });
}

// ---- Handler: message:read --------------------------------------------------

async function handleMessageRead(
  io: HoneyIOServer,
  socket: HoneySocket,
  data: MessageReadData,
): Promise<void> {
  const { conversationId, messageId } = data;
  const userId: string = socket.data.userId;

  if (!conversationId || !messageId) {
    socket.emit('error', {
      event: 'message:read',
      message: 'conversationId and messageId are required',
    });
    return;
  }

  // Verify the message exists in the conversation
  const message = await prisma.message.findUnique({
    where: { id: messageId },
    select: { conversationId: true, isDeleted: true },
  });

  if (!message || message.conversationId !== conversationId || message.isDeleted) {
    socket.emit('error', {
      event: 'message:read',
      message: 'Invalid message',
    });
    return;
  }

  // Verify membership
  const member = await prisma.conversationMember.findUnique({
    where: {
      userId_conversationId: { userId, conversationId },
    },
    select: { id: true },
  });

  if (!member) {
    socket.emit('error', {
      event: 'message:read',
      message: 'Not a member of this conversation',
    });
    return;
  }

  // Upsert read receipt
  await prisma.readReceipt.upsert({
    where: {
      conversationId_userId: { conversationId, userId },
    },
    update: {
      lastReadMessageId: messageId,
    },
    create: {
      conversationId,
      userId,
      lastReadMessageId: messageId,
    },
  });

  // Broadcast read receipt to room (excluding sender)
  const roomName = conversationRoom(conversationId);
  socket.to(roomName).emit('message:read', {
    conversationId,
    userId,
    lastReadMessageId: messageId,
  });

  logger.debug('socket:message:read', {
    socketId: socket.id,
    userId,
    conversationId,
    messageId,
  });
}

// ---- Handler: conversation:join / conversation:leave -------------------------

async function handleConversationJoin(
  _io: HoneyIOServer,
  socket: HoneySocket,
  conversationId: string,
): Promise<void> {
  if (!conversationId) {
    socket.emit('error', {
      event: 'conversation:join',
      message: 'conversationId is required',
    });
    return;
  }

  const userId: string = socket.data.userId;

  const member = await prisma.conversationMember.findUnique({
    where: {
      userId_conversationId: { userId, conversationId },
    },
    select: { id: true },
  });

  if (!member) {
    socket.emit('error', {
      event: 'conversation:join',
      message: 'You are not a member of this conversation',
    });
    return;
  }

  await socket.join(conversationRoom(conversationId));

  logger.debug('socket:conversation:join', {
    socketId: socket.id,
    userId,
    conversationId,
  });
}

async function handleConversationLeave(
  _io: HoneyIOServer,
  socket: HoneySocket,
  conversationId: string,
): Promise<void> {
  if (!conversationId) return;

  await socket.leave(conversationRoom(conversationId));

  logger.debug('socket:conversation:leave', {
    socketId: socket.id,
    userId: socket.data.userId,
    conversationId,
  });
}

// ---- Offline notification helper --------------------------------------------

async function notifyOfflineMembers(
  io: HoneyIOServer,
  conversationId: string,
  senderId: string,
  _message: { id: string },
): Promise<void> {
  // Find all members in this conversation except the sender
  const members = await prisma.conversationMember.findMany({
    where: {
      conversationId,
      userId: { not: senderId },
      isBanned: false,
    },
    select: { userId: true },
  });

  for (const member of members) {
    // Check if the member is online via Redis
    const onlineStatus = await redis.get(key('presence', member.userId));
    const isOnline = onlineStatus !== null;

    if (!isOnline) {
      // Create a push notification record for offline users
      try {
        await prisma.notification.create({
          data: {
            recipientId: member.userId,
            senderId,
            type: 'message',
            title: 'New message',
            body: 'You received a new message',
            payload: {
              conversationId,
              messageId: _message.id,
            },
          },
        });
      } catch {
        // Notification creation is non-critical
      }
    }
  }
}

// ---- Registration -----------------------------------------------------------

export function registerMessengerHandlers(io: HoneyIOServer): void {
  io.on('connection', (socket: HoneySocket) => {
    socket.on('message:send', (data: MessageSendData) => {
      void handleMessageSend(io, socket, data);
    });

    socket.on('message:edit', (data: MessageEditData) => {
      void handleMessageEdit(io, socket, data);
    });

    socket.on('message:delete', (data: MessageDeleteData) => {
      void handleMessageDelete(io, socket, data);
    });

    socket.on('message:react', (data: MessageReactData) => {
      void handleMessageReact(io, socket, data);
    });

    socket.on('typing:start', (data: TypingData) => {
      void handleTypingStart(io, socket, data);
    });

    socket.on('typing:stop', (data: TypingData) => {
      void handleTypingStop(io, socket, data);
    });

    socket.on('message:read', (data: MessageReadData) => {
      void handleMessageRead(io, socket, data);
    });

    socket.on('conversation:join', (conversationId: string) => {
      void handleConversationJoin(io, socket, conversationId);
    });

    socket.on('conversation:leave', (conversationId: string) => {
      void handleConversationLeave(io, socket, conversationId);
    });
  });
}
