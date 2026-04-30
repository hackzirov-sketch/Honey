import { Prisma, MemberRole } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import { config } from '../../../config';
import { AppError, NotFoundError, ForbiddenError, ValidationError, ConflictError } from '../../../errors';
import { logger } from '../../../utils/logger';
import { redis, key } from '../../../config/redis';
import type { CursorResult } from '../../../types';
import type { SendMessageInput, EditMessageInput, ReactToMessageInput } from '../dto/message.dto';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface EmitFunction {
  (event: string, data: unknown): void;
}

interface MessageWithRelations {
  id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  type: string;
  replyToId: string | null;
  forwardedFromId: string | null;
  isEdited: boolean;
  editedAt: Date | null;
  isDeleted: boolean;
  deletedAt: Date | null;
  deletedBy: string | null;
  idempotencyKey: string | null;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    id: string;
    username: string | null;
    avatarUrl: string | null;
  } | null;
  reactions: {
    id: string;
    userId: string;
    emoji: string;
    createdAt: Date;
    user: {
      id: string;
      username: string | null;
    };
  }[];
  attachments: {
    id: string;
    fileId: string;
    type: string;
    fileName: string;
    fileSize: bigint;
    mimeType: string;
    thumbnailUrl: string | null;
    width: number | null;
    height: number | null;
    duration: number | null;
  }[];
  replyTo: {
    id: string;
    content: string | null;
    type: string;
    senderId: string;
    createdAt: Date;
    sender: {
      id: string;
      username: string | null;
    };
  } | null;
  forwardedFrom: {
    id: string;
    content: string | null;
    type: string;
    senderId: string;
    createdAt: Date;
    sender: {
      id: string;
      username: string | null;
    };
  } | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

async function requireMembership(
  userId: string,
  conversationId: string,
): Promise<{ role: MemberRole; isMuted: boolean; mutedUntil: Date | null }> {
  const membership = await prisma.conversationMember.findUnique({
    where: {
      userId_conversationId: { userId, conversationId },
    },
    select: {
      role: true,
      isMuted: true,
      mutedUntil: true,
    },
  });

  if (!membership) {
    throw new ForbiddenError('You are not a member of this conversation');
  }

  return membership;
}

function isMutedActive(isMuted: boolean, mutedUntil: Date | null): boolean {
  if (!isMuted) return false;
  if (!mutedUntil) return true; // Permanently muted
  return mutedUntil.getTime() > Date.now();
}

// ─── Service ────────────────────────────────────────────────────────────────

export const messageService = {
  /**
   * Get messages in a conversation with cursor-based pagination.
   * Messages are fetched DESC in DB, returned ASC to the client.
   * Soft-deleted messages are only shown to the deleter.
   */
  async getMessages(
    userId: string,
    conversationId: string,
    cursor: string | undefined,
    limit: number,
  ): Promise<CursorResult<MessageWithRelations>> {
    await requireMembership(userId, conversationId);

    const parsedLimit = Math.min(Math.max(limit, 1), 100);

    const whereClause: Prisma.MessageWhereInput = {
      conversationId,
    };

    if (cursor) {
      const cursorMessage = await prisma.message.findUnique({
        where: { id: cursor },
        select: { createdAt: true },
      });

      if (!cursorMessage) {
        throw new ValidationError('Invalid cursor');
      }

      whereClause.createdAt = { lt: cursorMessage.createdAt };
    }

    // Fetch in DESC order (newest first), then reverse for ASC response
    const messages = await prisma.message.findMany({
      where: whereClause,
      include: {
        sender: {
          select: { id: true, username: true, avatarUrl: true },
        },
        reactions: {
          include: {
            user: { select: { id: true, username: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
        attachments: {
          orderBy: { createdAt: 'asc' },
        },
        replyTo: {
          select: {
            id: true,
            content: true,
            type: true,
            senderId: true,
            createdAt: true,
            sender: { select: { id: true, username: true } },
          },
        },
        forwardedFrom: {
          select: {
            id: true,
            content: true,
            type: true,
            senderId: true,
            createdAt: true,
            sender: { select: { id: true, username: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: parsedLimit + 1,
    });

    let hasMore = false;
    if (messages.length > parsedLimit) {
      hasMore = true;
      messages.pop();
    }

    // Filter soft-deleted messages: only show to the deleter
    const filteredMessages = messages.filter((msg) => {
      if (!msg.isDeleted) return true;
      return msg.deletedBy === userId;
    });

    // Map deleted messages that aren't the user's to a placeholder
    const finalMessages: MessageWithRelations[] = messages.map((msg) => {
      if (msg.isDeleted && msg.deletedBy !== userId) {
        return {
          ...msg,
          content: null,
          type: 'SYSTEM',
          attachments: [],
          reactions: [],
          replyTo: null,
          forwardedFrom: null,
        } as MessageWithRelations;
      }
      return msg as MessageWithRelations;
    });

    // Reverse to ASC order
    finalMessages.reverse();

    const nextCursor = hasMore && messages.length > 0
      ? messages[messages.length - 1].id
      : null;

    return { items: finalMessages, nextCursor, hasMore };
  },

  /**
   * Send a message in a conversation.
   * Checks membership, block status, mute status, and channel permissions.
   * Handles idempotency keys. Emits Socket.IO events.
   */
  async sendMessage(
    userId: string,
    conversationId: string,
    data: SendMessageInput,
    emit: EmitFunction,
  ) {
    const membership = await requireMembership(userId, conversationId);

    // Check not muted
    if (isMutedActive(membership.isMuted, membership.mutedUntil)) {
      throw new ForbiddenError('You are muted in this conversation');
    }

    // Check not blocked (for private conversations)
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { type: true },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    if (conversation.type === 'PRIVATE') {
      const otherMembers = await prisma.conversationMember.findMany({
        where: {
          conversationId,
          userId: { not: userId },
        },
        select: { userId: true },
      });

      const otherUserIds = otherMembers.map((m) => m.userId);

      const block = await prisma.block.findFirst({
        where: {
          OR: [
            { blockerId: userId, blockedId: { in: otherUserIds } },
            { blockerId: { in: otherUserIds }, blockedId: userId },
          ],
        },
      });

      if (block) {
        throw new ForbiddenError('Cannot send messages: you or the recipient is blocked');
      }
    }

    // Check channel permissions (only OWNER/ADMIN can send)
    if (conversation.type === 'CHANNEL') {
      if (membership.role !== MemberRole.OWNER && membership.role !== MemberRole.ADMIN) {
        throw new ForbiddenError('Only OWNER or ADMIN can send messages in a channel');
      }
    }

    // Check idempotency key
    if (data.idempotencyKey) {
      const existingMessage = await prisma.message.findUnique({
        where: { idempotencyKey: data.idempotencyKey },
        include: {
          sender: { select: { id: true, username: true, avatarUrl: true } },
          reactions: {
            include: { user: { select: { id: true, username: true } } },
          },
          attachments: true,
          replyTo: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
          forwardedFrom: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
        },
      });

      if (existingMessage) {
        return existingMessage as MessageWithRelations;
      }
    }

    // Validate replyTo belongs to same conversation
    if (data.replyToId) {
      const replyTarget = await prisma.message.findUnique({
        where: { id: data.replyToId },
        select: { conversationId: true, isDeleted: true },
      });

      if (!replyTarget || replyTarget.isDeleted) {
        throw new ValidationError('Reply target not found or has been deleted');
      }

      if (replyTarget.conversationId !== conversationId) {
        throw new ValidationError('Reply target must be in the same conversation');
      }
    }

    // Validate forwardedFrom
    if (data.forwardedFromId) {
      const forwardTarget = await prisma.message.findUnique({
        where: { id: data.forwardedFromId },
        select: { isDeleted: true },
      });

      if (!forwardTarget || forwardTarget.isDeleted) {
        throw new ValidationError('Forwarded message not found or has been deleted');
      }
    }

    // Create message with attachments in a transaction
    const message = await prisma.$transaction(async (tx) => {
      const created = await tx.message.create({
        data: {
          conversationId,
          senderId: userId,
          content: data.content,
          type: data.type,
          replyToId: data.replyToId,
          forwardedFromId: data.forwardedFromId,
          idempotencyKey: data.idempotencyKey,
        },
        include: {
          sender: { select: { id: true, username: true, avatarUrl: true } },
          reactions: {
            include: { user: { select: { id: true, username: true } } },
          },
          replyTo: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
          forwardedFrom: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
        },
      });

      // Create attachments if provided
      if (data.attachments && data.attachments.length > 0) {
        await tx.messageAttachment.createMany({
          data: data.attachments.map((att) => ({
            messageId: created.id,
            fileId: att.fileId,
            type: att.type,
            fileName: '', // Will be populated from FileMetadata if needed
            fileSize: BigInt(0),
            mimeType: '',
          })),
        });
      }

      // Update conversation's lastMessageAt
      await tx.conversation.update({
        where: { id: conversationId },
        data: { lastMessageAt: new Date() },
      });

      // Re-fetch with attachments
      return tx.message.findUnique({
        where: { id: created.id },
        include: {
          sender: { select: { id: true, username: true, avatarUrl: true } },
          reactions: {
            include: { user: { select: { id: true, username: true } } },
          },
          attachments: true,
          replyTo: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
          forwardedFrom: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
        },
      });
    });

    if (!message) {
      throw new AppError('Failed to create message');
    }

    // Emit Socket.IO event
    emit('conversation:message', {
      conversationId,
      message,
    });

    // Create notifications for offline receivers
    try {
      const members = await prisma.conversationMember.findMany({
        where: {
          conversationId,
          userId: { not: userId },
        },
        select: { userId: true },
      });

      for (const member of members) {
        await prisma.notification.create({
          data: {
            recipientId: member.userId,
            senderId: userId,
            type: 'NEW_MESSAGE',
            title: 'New Message',
            body: data.content?.slice(0, 100) ?? 'Sent an attachment',
            payload: {
              conversationId,
              messageId: message.id,
              messageType: message.type,
            } as Prisma.InputJsonValue,
          },
        });
      }
    } catch (notificationError) {
      // Non-critical: log and continue
      logger.warn('Failed to create message notifications', {
        conversationId,
        messageId: message.id,
        error: notificationError instanceof Error ? notificationError.message : 'Unknown',
      });
    }

    logger.info('Message sent', {
      messageId: message.id,
      conversationId,
      senderId: userId,
      type: message.type,
    });

    return message as MessageWithRelations;
  },

  /**
   * Edit a message. Only the sender can edit.
   */
  async editMessage(
    userId: string,
    messageId: string,
    data: EditMessageInput,
    emit: EmitFunction,
  ) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        senderId: true,
        conversationId: true,
        isDeleted: true,
        type: true,
      },
    });

    if (!message) {
      throw new NotFoundError('Message not found');
    }

    if (message.isDeleted) {
      throw new ValidationError('Cannot edit a deleted message');
    }

    if (message.senderId !== userId) {
      throw new ForbiddenError('Only the sender can edit this message');
    }

    // Only TEXT messages can be edited
    if (message.type !== 'TEXT') {
      throw new ValidationError('Only text messages can be edited');
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: {
        content: data.content,
        isEdited: true,
        editedAt: new Date(),
      },
      include: {
        sender: { select: { id: true, username: true, avatarUrl: true } },
        reactions: {
          include: { user: { select: { id: true, username: true } } },
        },
        attachments: true,
        replyTo: {
          select: {
            id: true, content: true, type: true, senderId: true, createdAt: true,
            sender: { select: { id: true, username: true } },
          },
        },
        forwardedFrom: {
          select: {
            id: true, content: true, type: true, senderId: true, createdAt: true,
            sender: { select: { id: true, username: true } },
          },
        },
      },
    });

    emit('conversation:message_updated', {
      conversationId: message.conversationId,
      message: updated,
    });

    logger.info('Message edited', {
      messageId,
      editedBy: userId,
    });

    return updated as MessageWithRelations;
  },

  /**
   * Soft-delete a message.
   * Sender can delete their own message.
   * OWNER/ADMIN can delete any message in GROUP/CHANNEL.
   */
  async deleteMessage(
    userId: string,
    messageId: string,
    emit: EmitFunction,
  ) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        senderId: true,
        conversationId: true,
        isDeleted: true,
      },
    });

    if (!message) {
      throw new NotFoundError('Message not found');
    }

    if (message.isDeleted) {
      throw new ValidationError('Message is already deleted');
    }

    if (message.senderId !== userId) {
      // Check if user is OWNER/ADMIN in the conversation
      const membership = await requireMembership(userId, message.conversationId);
      const conversation = await prisma.conversation.findUnique({
        where: { id: message.conversationId },
        select: { type: true },
      });

      if (!conversation || conversation.type === 'PRIVATE') {
        throw new ForbiddenError('Only the sender can delete messages in private conversations');
      }

      if (membership.role !== MemberRole.OWNER && membership.role !== MemberRole.ADMIN) {
        throw new ForbiddenError('Only OWNER or ADMIN can delete others\' messages');
      }
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId,
      },
    });

    emit('conversation:message_deleted', {
      conversationId: message.conversationId,
      messageId: message.id,
      deletedBy: userId,
    });

    logger.info('Message deleted', {
      messageId,
      deletedBy: userId,
    });

    return { success: true, messageId: updated.id };
  },

  /**
   * Hard-delete a message (admin/cleanup only).
   */
  async hardDeleteMessage(userId: string, messageId: string) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      select: { id: true, conversationId: true },
    });

    if (!message) {
      throw new NotFoundError('Message not found');
    }

    await prisma.$transaction(async (tx) => {
      await tx.messageReaction.deleteMany({ where: { messageId } });
      await tx.messageAttachment.deleteMany({ where: { messageId } });
      await tx.message.delete({ where: { id: messageId } });
    });

    logger.info('Message hard-deleted', {
      messageId,
      deletedBy: userId,
    });

    return { success: true };
  },

  /**
   * Toggle a reaction on a message.
   * If the user already has this emoji, remove it. Otherwise, add it.
   */
  async reactToMessage(
    userId: string,
    messageId: string,
    data: ReactToMessageInput,
    emit: EmitFunction,
  ) {
    // Verify message exists and user can access it
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        conversationId: true,
        isDeleted: true,
      },
    });

    if (!message) {
      throw new NotFoundError('Message not found');
    }

    if (message.isDeleted) {
      throw new ValidationError('Cannot react to a deleted message');
    }

    await requireMembership(userId, message.conversationId);

    // Check for existing reaction
    const existingReaction = await prisma.messageReaction.findUnique({
      where: {
        messageId_userId_emoji: {
          messageId,
          userId,
          emoji: data.emoji,
        },
      },
    });

    let toggled = false;

    if (existingReaction) {
      // Remove reaction
      await prisma.messageReaction.delete({
        where: { id: existingReaction.id },
      });
      toggled = false;
    } else {
      // Add reaction
      await prisma.messageReaction.create({
        data: {
          messageId,
          userId,
          emoji: data.emoji,
        },
      });
      toggled = true;
    }

    // Fetch updated reactions
    const updatedReactions = await prisma.messageReaction.findMany({
      where: { messageId },
      include: { user: { select: { id: true, username: true } } },
      orderBy: { createdAt: 'asc' },
    });

    emit('conversation:message_reaction', {
      conversationId: message.conversationId,
      messageId,
      userId,
      emoji: data.emoji,
      action: toggled ? 'added' : 'removed',
      reactions: updatedReactions,
    });

    return {
      success: true,
      action: toggled ? 'added' as const : 'removed' as const,
      reactions: updatedReactions,
    };
  },

  /**
   * Pin a message. OWNER/ADMIN only.
   */
  async pinMessage(
    userId: string,
    conversationId: string,
    messageId: string,
    emit: EmitFunction,
  ) {
    const membership = await requireMembership(userId, conversationId);
    if (membership.role !== MemberRole.OWNER && membership.role !== MemberRole.ADMIN) {
      throw new ForbiddenError('Only OWNER or ADMIN can pin messages');
    }

    // Verify message exists in this conversation
    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
        conversationId,
        isDeleted: false,
      },
      select: { id: true },
    });

    if (!message) {
      throw new NotFoundError('Message not found in this conversation');
    }

    // Check not already pinned
    const existingPin = await prisma.pinnedMessage.findUnique({
      where: {
        conversationId_messageId: { conversationId, messageId },
      },
    });

    if (existingPin) {
      throw new ConflictError('Message is already pinned');
    }

    const pinned = await prisma.pinnedMessage.create({
      data: {
        conversationId,
        messageId,
        pinnedBy: userId,
      },
      include: {
        message: {
          include: {
            sender: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
      },
    });

    emit('conversation:message_pinned', {
      conversationId,
      pinnedMessage: pinned,
    });

    return pinned;
  },

  /**
   * Unpin a message. OWNER/ADMIN only.
   */
  async unpinMessage(
    userId: string,
    conversationId: string,
    messageId: string,
    emit: EmitFunction,
  ) {
    const membership = await requireMembership(userId, conversationId);
    if (membership.role !== MemberRole.OWNER && membership.role !== MemberRole.ADMIN) {
      throw new ForbiddenError('Only OWNER or ADMIN can unpin messages');
    }

    const existingPin = await prisma.pinnedMessage.findUnique({
      where: {
        conversationId_messageId: { conversationId, messageId },
      },
    });

    if (!existingPin) {
      throw new NotFoundError('Message is not pinned');
    }

    await prisma.pinnedMessage.delete({
      where: { id: existingPin.id },
    });

    emit('conversation:message_unpinned', {
      conversationId,
      messageId,
    });

    return { success: true };
  },

  /**
   * Search messages in a conversation using ILIKE.
   */
  async searchMessages(
    userId: string,
    conversationId: string,
    query: string,
  ): Promise<MessageWithRelations[]> {
    await requireMembership(userId, conversationId);

    if (query.trim().length === 0) {
      return [];
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        isDeleted: false,
        content: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        sender: { select: { id: true, username: true, avatarUrl: true } },
        reactions: {
          include: { user: { select: { id: true, username: true } } },
        },
        attachments: true,
        replyTo: {
          select: {
            id: true, content: true, type: true, senderId: true, createdAt: true,
            sender: { select: { id: true, username: true } },
          },
        },
        forwardedFrom: {
          select: {
            id: true, content: true, type: true, senderId: true, createdAt: true,
            sender: { select: { id: true, username: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return messages as MessageWithRelations[];
  },

  /**
   * Forward a message to another conversation.
   */
  async forwardMessage(
    userId: string,
    messageId: string,
    targetConversationId: string,
    emit: EmitFunction,
  ) {
    // Verify the original message exists and user can access it
    const originalMessage = await prisma.message.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        conversationId: true,
        senderId: true,
        content: true,
        type: true,
        isDeleted: true,
        attachments: {
          select: {
            fileId: true,
            type: true,
            fileName: true,
            fileSize: true,
            mimeType: true,
            thumbnailUrl: true,
            width: true,
            height: true,
            duration: true,
          },
        },
      },
    });

    if (!originalMessage) {
      throw new NotFoundError('Original message not found');
    }

    if (originalMessage.isDeleted) {
      throw new ValidationError('Cannot forward a deleted message');
    }

    // Check membership in source conversation
    await requireMembership(userId, originalMessage.conversationId);

    // Check membership in target conversation
    const targetMembership = await requireMembership(userId, targetConversationId);

    // Check channel permissions for target
    const targetConversation = await prisma.conversation.findUnique({
      where: { id: targetConversationId },
      select: { type: true },
    });

    if (targetConversation?.type === 'CHANNEL') {
      if (
        targetMembership.role !== MemberRole.OWNER &&
        targetMembership.role !== MemberRole.ADMIN
      ) {
        throw new ForbiddenError('Only OWNER or ADMIN can forward to a channel');
      }
    }

    // Cannot forward to the same conversation
    if (originalMessage.conversationId === targetConversationId) {
      throw new ValidationError('Cannot forward a message to the same conversation');
    }

    // Create forwarded message in a transaction
    const forwarded = await prisma.$transaction(async (tx) => {
      const created = await tx.message.create({
        data: {
          conversationId: targetConversationId,
          senderId: userId,
          content: originalMessage.content,
          type: originalMessage.type,
          forwardedFromId: messageId,
        },
        include: {
          sender: { select: { id: true, username: true, avatarUrl: true } },
          reactions: {
            include: { user: { select: { id: true, username: true } } },
          },
          replyTo: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
          forwardedFrom: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
        },
      });

      // Copy attachments
      if (originalMessage.attachments.length > 0) {
        await tx.messageAttachment.createMany({
          data: originalMessage.attachments.map((att) => ({
            messageId: created.id,
            fileId: att.fileId,
            type: att.type,
            fileName: att.fileName,
            fileSize: att.fileSize,
            mimeType: att.mimeType,
            thumbnailUrl: att.thumbnailUrl,
            width: att.width,
            height: att.height,
            duration: att.duration,
          })),
        });
      }

      // Update conversation's lastMessageAt
      await tx.conversation.update({
        where: { id: targetConversationId },
        data: { lastMessageAt: new Date() },
      });

      // Re-fetch with attachments
      return tx.message.findUnique({
        where: { id: created.id },
        include: {
          sender: { select: { id: true, username: true, avatarUrl: true } },
          reactions: {
            include: { user: { select: { id: true, username: true } } },
          },
          attachments: true,
          replyTo: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
          forwardedFrom: {
            select: {
              id: true, content: true, type: true, senderId: true, createdAt: true,
              sender: { select: { id: true, username: true } },
            },
          },
        },
      });
    });

    if (!forwarded) {
      throw new AppError('Failed to forward message');
    }

    emit('conversation:message', {
      conversationId: targetConversationId,
      message: forwarded,
    });

    logger.info('Message forwarded', {
      originalMessageId: messageId,
      newMessageId: forwarded.id,
      targetConversationId,
      forwardedBy: userId,
    });

    return forwarded as MessageWithRelations;
  },

  /**
   * Mark messages in a conversation as read up to a specific message.
   */
  async markAsRead(
    userId: string,
    conversationId: string,
    messageId: string,
  ) {
    await requireMembership(userId, conversationId);

    // Verify the message exists in this conversation
    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
        conversationId,
        isDeleted: false,
      },
      select: { id: true, createdAt: true },
    });

    if (!message) {
      throw new NotFoundError('Message not found in this conversation');
    }

    // Upsert read receipt
    const receipt = await prisma.readReceipt.upsert({
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

    return { success: true, lastReadMessageId: receipt.lastReadMessageId };
  },

  /**
   * Get unread message count for a user in a conversation.
   */
  async getUnreadCount(
    userId: string,
    conversationId: string,
  ): Promise<{ count: number }> {
    await requireMembership(userId, conversationId);

    const receipt = await prisma.readReceipt.findUnique({
      where: {
        conversationId_userId: { conversationId, userId },
      },
      select: { lastReadMessageId: true },
    });

    let count: number;

    if (!receipt) {
      // No receipt means all messages are unread
      count = await prisma.message.count({
        where: {
          conversationId,
          isDeleted: false,
          senderId: { not: userId },
        },
      });
    } else {
      const lastReadMessage = await prisma.message.findUnique({
        where: { id: receipt.lastReadMessageId },
        select: { createdAt: true },
      });

      count = await prisma.message.count({
        where: {
          conversationId,
          isDeleted: false,
          senderId: { not: userId },
          createdAt: {
            gt: lastReadMessage?.createdAt ?? new Date(0),
          },
        },
      });
    }

    return { count };
  },
};
