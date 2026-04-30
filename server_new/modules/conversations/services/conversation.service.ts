import { Prisma, ConversationType, MemberRole } from '@prisma/client';
import { prisma } from '../../../config/prisma';
import { config } from '../../../config';
import { AppError, NotFoundError, ForbiddenError, ValidationError, ConflictError } from '../../../errors';
import { logger } from '../../../utils/logger';
import { redis, key } from '../../../config/redis';
import type { CursorResult } from '../../../types';
import type {
  CreateConversationInput,
  UpdateConversationInput,
  JoinByInviteInput,
  AddMemberInput,
  UpdateMemberInput,
  ToggleMuteInput,
} from '../dto/conversation.dto';

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateInviteLink(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

interface MembershipCheck {
  membership: {
    id: string;
    role: MemberRole;
    isMuted: boolean;
    mutedUntil: Date | null;
  };
}

async function requireMembership(
  userId: string,
  conversationId: string,
): Promise<MembershipCheck> {
  const membership = await prisma.conversationMember.findUnique({
    where: {
      userId_conversationId: { userId, conversationId },
    },
    select: {
      id: true,
      role: true,
      isMuted: true,
      mutedUntil: true,
    },
  });

  if (!membership) {
    throw new ForbiddenError('You are not a member of this conversation');
  }

  return { membership };
}

function requireOwnerOrAdmin(role: MemberRole): void {
  if (role !== MemberRole.OWNER && role !== MemberRole.ADMIN) {
    throw new ForbiddenError('Only OWNER or ADMIN can perform this action');
  }
}

function requireOwner(role: MemberRole): void {
  if (role !== MemberRole.OWNER) {
    throw new ForbiddenError('Only OWNER can perform this action');
  }
}

// ─── Conversation list item shape ───────────────────────────────────────────

interface ConversationListItem {
  id: string;
  type: ConversationType;
  name: string | null;
  avatarUrl: string | null;
  description: string | null;
  lastMessageAt: Date | null;
  isArchived: boolean;
  memberCount: number;
  lastMessage: {
    id: string;
    content: string | null;
    type: string;
    senderId: string;
    senderUsername: string | null;
    createdAt: Date;
  } | null;
  unreadCount: number;
}

// ─── Service ────────────────────────────────────────────────────────────────

export const conversationService = {
  /**
   * List conversations where user is a member.
   * Ordered by lastMessageAt desc with cursor-based pagination.
   */
  async getConversations(
    userId: string,
    cursor: string | undefined,
    limit: number,
  ): Promise<CursorResult<ConversationListItem>> {
    const parsedLimit = Math.min(Math.max(limit, 1), 100);

    const whereClause: Prisma.ConversationWhereInput = {
      members: { some: { userId } },
      deletedAt: null,
    };

    if (cursor) {
      const cursorConversation = await prisma.conversation.findUnique({
        where: { id: cursor },
        select: { lastMessageAt: true },
      });

      if (!cursorConversation) {
        throw new ValidationError('Invalid cursor');
      }

      whereClause.OR = [
        { lastMessageAt: { lt: cursorConversation.lastMessageAt } },
        {
          lastMessageAt: cursorConversation.lastMessageAt,
          createdAt: { lt: cursor },
        },
      ];
    }

    const conversations = await prisma.conversation.findMany({
      where: whereClause,
      select: {
        id: true,
        type: true,
        name: true,
        avatarUrl: true,
        description: true,
        lastMessageAt: true,
        isArchivedBy: true,
        createdAt: true,
        members: { select: { id: true } },
        messages: {
          where: { isDeleted: false },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
            content: true,
            type: true,
            senderId: true,
            sender: { select: { username: true } },
            createdAt: true,
          },
        },
        readReceipts: {
          where: { userId },
          select: { lastReadMessageId: true },
          take: 1,
        },
      },
      orderBy: [
        { lastMessageAt: { sort: 'desc', nulls: 'last' } },
        { createdAt: 'desc' },
      ],
      take: parsedLimit + 1,
    });

    let hasMore = false;
    if (conversations.length > parsedLimit) {
      hasMore = true;
      conversations.pop();
    }

    const items: ConversationListItem[] = await Promise.all(
      conversations.map(async (conv) => {
        const archivedBy: string[] = Array.isArray(conv.isArchivedBy)
          ? (conv.isArchivedBy as string[])
          : [];
        const isArchived = archivedBy.includes(userId);

        // Count unread messages
        let unreadCount = 0;
        const lastReadId = conv.readReceipts[0]?.lastReadMessageId;
        if (lastReadId) {
          unreadCount = await prisma.message.count({
            where: {
              conversationId: conv.id,
              isDeleted: false,
              senderId: { not: userId },
              createdAt: {
                gt: (
                  await prisma.message.findUnique({
                    where: { id: lastReadId },
                    select: { createdAt: true },
                  })
                )?.createdAt ?? new Date(0),
              },
            },
          });
        } else {
          unreadCount = await prisma.message.count({
            where: {
              conversationId: conv.id,
              isDeleted: false,
              senderId: { not: userId },
            },
          });
        }

        const lastMsg = conv.messages[0];

        return {
          id: conv.id,
          type: conv.type,
          name: conv.name,
          avatarUrl: conv.avatarUrl,
          description: conv.description,
          lastMessageAt: conv.lastMessageAt,
          isArchived,
          memberCount: conv.members.length,
          lastMessage: lastMsg
            ? {
                id: lastMsg.id,
                content: lastMsg.content,
                type: lastMsg.type,
                senderId: lastMsg.senderId,
                senderUsername: lastMsg.sender.username,
                createdAt: lastMsg.createdAt,
              }
            : null,
          unreadCount,
        };
      }),
    );

    // Sort: archived at bottom
    items.sort((a, b) => {
      if (a.isArchived !== b.isArchived) {
        return a.isArchived ? 1 : -1;
      }
      return 0;
    });

    const nextCursor = hasMore && conversations.length > 0
      ? conversations[conversations.length - 1].id
      : null;

    return { items, nextCursor, hasMore };
  },

  /**
   * Create a new conversation.
   * PRIVATE: checks for existing conversation and block status.
   * GROUP/CHANNEL: creates with invite link.
   */
  async createConversation(userId: string, data: CreateConversationInput) {
    if (data.type === 'PRIVATE') {
      const targetUserId = data.memberIds![0];

      if (targetUserId === userId) {
        throw new ValidationError('Cannot create a private conversation with yourself');
      }

      // Check target user exists
      const targetUser = await prisma.user.findUnique({
        where: { id: targetUserId },
        select: { id: true },
      });
      if (!targetUser) {
        throw new NotFoundError('Target user not found');
      }

      // Check block status (both directions)
      const existingBlock = await prisma.block.findFirst({
        where: {
          OR: [
            { blockerId: userId, blockedId: targetUserId },
            { blockerId: targetUserId, blockedId: userId },
          ],
        },
      });
      if (existingBlock) {
        throw new ForbiddenError('Cannot create conversation: user is blocked');
      }

      // Check for existing private conversation
      const existingConv = await prisma.conversation.findFirst({
        where: {
          type: 'PRIVATE',
          members: {
            every: {
              userId: { in: [userId, targetUserId] },
            },
          },
        },
        include: {
          members: { select: { userId: true } },
        },
      });

      if (existingConv && existingConv.members.length === 2) {
        // Return existing conversation
        const convWithMembers = await prisma.conversation.findUnique({
          where: { id: existingConv.id },
          include: {
            members: {
              include: { user: { select: { id: true, username: true, avatarUrl: true } } },
            },
          },
        });
        if (convWithMembers) {
          return convWithMembers;
        }
      }

      // Create new private conversation
      const conversation = await prisma.conversation.create({
        data: {
          type: 'PRIVATE',
          createdBy: userId,
          members: {
            createMany: {
              data: [
                { userId, role: 'MEMBER' },
                { userId: targetUserId, role: 'MEMBER' },
              ],
            },
          },
        },
        include: {
          members: {
            include: { user: { select: { id: true, username: true, avatarUrl: true } } },
          },
        },
      });

      logger.info('Private conversation created', {
        conversationId: conversation.id,
        creatorId: userId,
        targetUserId,
      });

      return conversation;
    }

    // GROUP or CHANNEL
    const inviteLink = generateInviteLink();

    const conversation = await prisma.$transaction(async (tx) => {
      // Ensure unique invite link (collision retry)
      let link = inviteLink;
      let attempts = 0;
      while (attempts < 5) {
        const existing = await tx.conversation.findUnique({
          where: { inviteLink: link },
          select: { id: true },
        });
        if (!existing) break;
        link = generateInviteLink();
        attempts++;
      }

      // Validate all member IDs exist
      const memberIds = data.memberIds ?? [];
      const existingUsers = await tx.user.findMany({
        where: { id: { in: memberIds } },
        select: { id: true },
      });
      const existingUserIds = new Set(existingUsers.map((u) => u.id));

      const missingIds = memberIds.filter((id) => !existingUserIds.has(id));
      if (missingIds.length > 0) {
        throw new NotFoundError(
          `Users not found: ${missingIds.join(', ')}`,
        );
      }

      // Check none of the members have blocked the creator or vice versa
      if (memberIds.length > 0) {
        const blocks = await tx.block.findMany({
          where: {
            OR: [
              { blockerId: userId, blockedId: { in: memberIds } },
              { blockedId: userId, blockerId: { in: memberIds } },
            ],
          },
          select: { blockerId: true, blockedId: true },
        });
        if (blocks.length > 0) {
          const blockedUserIds = blocks.map(
            (b) => b.blockerId === userId ? b.blockedId : b.blockerId,
          );
          throw new ConflictError(
            `Cannot add blocked users: ${blockedUserIds.join(', ')}`,
          );
        }
      }

      return tx.conversation.create({
        data: {
          type: data.type,
          name: data.name,
          avatarUrl: data.avatarUrl,
          description: data.description,
          inviteLink: link,
          createdBy: userId,
          members: {
            createMany: {
              data: [
                { userId, role: 'OWNER' },
                ...memberIds.map((mId) => ({ userId: mId, role: 'MEMBER' as const })),
              ],
            },
          },
        },
        include: {
          members: {
            include: { user: { select: { id: true, username: true, avatarUrl: true } } },
          },
        },
      });
    });

    logger.info(`${data.type} conversation created`, {
      conversationId: conversation.id,
      creatorId: userId,
      memberCount: conversation.members.length,
    });

    return conversation;
  },

  /**
   * Get a single conversation with member info.
   */
  async getConversation(userId: string, conversationId: string) {
    const { membership } = await requireMembership(userId, conversationId);

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
                lastSeen: true,
              },
            },
          },
          orderBy: [{ role: 'asc' }, { joinedAt: 'asc' }],
        },
        pinnedMessages: {
          include: {
            pinnedByUser: {
              select: { id: true, username: true },
            },
          },
          orderBy: { pinnedAt: 'desc' },
          take: 50,
        },
      },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    // Check if current user has archived it
    const archivedBy: string[] = Array.isArray(conversation.isArchivedBy)
      ? (conversation.isArchivedBy as string[])
      : [];

    return {
      ...conversation,
      isArchived: archivedBy.includes(userId),
      myRole: membership.role,
    };
  },

  /**
   * Update conversation (name, avatar, description). OWNER/ADMIN only for GROUP/CHANNEL.
   */
  async updateConversation(
    userId: string,
    conversationId: string,
    data: UpdateConversationInput,
  ) {
    const { membership } = await requireMembership(userId, conversationId);

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { type: true },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    if (conversation.type !== 'GROUP' && conversation.type !== 'CHANNEL') {
      throw new ValidationError('Only GROUP or CHANNEL conversations can be updated');
    }

    requireOwnerOrAdmin(membership.role);

    const updated = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
        ...(data.description !== undefined && { description: data.description }),
      },
      include: {
        members: {
          include: { user: { select: { id: true, username: true, avatarUrl: true } } },
        },
      },
    });

    logger.info('Conversation updated', {
      conversationId,
      updatedBy: userId,
      fields: Object.keys(data),
    });

    return updated;
  },

  /**
   * Delete a conversation.
   * OWNER only for GROUP/CHANNEL, any member for PRIVATE.
   */
  async deleteConversation(userId: string, conversationId: string) {
    const { membership } = await requireMembership(userId, conversationId);

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { type: true },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    if (conversation.type === 'GROUP' || conversation.type === 'CHANNEL') {
      requireOwner(membership.role);
    }

    await prisma.$transaction(async (tx) => {
      await tx.pinnedMessage.deleteMany({ where: { conversationId } });
      await tx.readReceipt.deleteMany({ where: { conversationId } });
      await tx.messageReaction.deleteMany({
        where: {
          message: { conversationId },
        },
      });
      await tx.messageAttachment.deleteMany({
        where: {
          message: { conversationId },
        },
      });
      await tx.message.deleteMany({ where: { conversationId } });
      await tx.conversationMember.deleteMany({ where: { conversationId } });
      await tx.conversation.delete({ where: { id: conversationId } });
    });

    logger.info('Conversation deleted', {
      conversationId,
      deletedBy: userId,
      type: conversation.type,
    });

    return { success: true };
  },

  /**
   * Join a conversation by invite link.
   */
  async joinByInvite(userId: string, data: JoinByInviteInput) {
    const conversation = await prisma.conversation.findUnique({
      where: { inviteLink: data.inviteLink },
      select: {
        id: true,
        type: true,
        name: true,
        members: { select: { userId: true } },
      },
    });

    if (!conversation) {
      throw new NotFoundError('Invalid or expired invite link');
    }

    if (conversation.type === 'PRIVATE') {
      throw new ForbiddenError('Cannot join a private conversation via invite link');
    }

    // Check if already a member
    const isAlreadyMember = conversation.members.some((m) => m.userId === userId);
    if (isAlreadyMember) {
      throw new ConflictError('You are already a member of this conversation');
    }

    // Check block status
    const existingBlock = await prisma.block.findFirst({
      where: {
        OR: [
          { blockerId: userId, blockedId: { in: conversation.members.map((m) => m.userId) } },
          { blockedId: userId, blockerId: { in: conversation.members.map((m) => m.userId) } },
        ],
      },
      select: { id: true },
    });

    if (existingBlock) {
      throw new ForbiddenError('Cannot join: you have been blocked by a member');
    }

    await prisma.conversationMember.create({
      data: {
        userId,
        conversationId: conversation.id,
        role: 'MEMBER',
      },
    });

    const joined = await prisma.conversation.findUnique({
      where: { id: conversation.id },
      include: {
        members: {
          include: { user: { select: { id: true, username: true, avatarUrl: true } } },
        },
      },
    });

    logger.info('User joined conversation via invite', {
      conversationId: conversation.id,
      userId,
    });

    return joined;
  },

  /**
   * Add a member to a conversation. OWNER/ADMIN only.
   */
  async addMember(
    userId: string,
    conversationId: string,
    targetUserId: string,
    data: { role?: 'ADMIN' | 'MEMBER' },
  ) {
    const { membership } = await requireMembership(userId, conversationId);
    requireOwnerOrAdmin(membership.role);

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { type: true },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    if (conversation.type === 'PRIVATE') {
      throw new ValidationError('Cannot add members to a private conversation');
    }

    // Check target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true },
    });
    if (!targetUser) {
      throw new NotFoundError('Target user not found');
    }

    // Check target is not already a member
    const existingMember = await prisma.conversationMember.findUnique({
      where: {
        userId_conversationId: { userId: targetUserId, conversationId },
      },
    });
    if (existingMember) {
      throw new ConflictError('User is already a member of this conversation');
    }

    // Check block status
    const existingBlock = await prisma.block.findFirst({
      where: {
        OR: [
          { blockerId: userId, blockedId: targetUserId },
          { blockerId: targetUserId, blockedId: userId },
        ],
      },
    });
    if (existingBlock) {
      throw new ForbiddenError('Cannot add a blocked user');
    }

    // Check group member limit
    if (conversation.type === 'GROUP') {
      const memberCount = await prisma.conversationMember.count({
        where: { conversationId },
      });
      if (memberCount >= 200) {
        throw new ValidationError('Group has reached the maximum member limit of 200');
      }
    }

    const member = await prisma.conversationMember.create({
      data: {
        userId: targetUserId,
        conversationId,
        role: data.role ?? 'MEMBER',
      },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    logger.info('Member added to conversation', {
      conversationId,
      targetUserId,
      addedBy: userId,
      role: member.role,
    });

    return member;
  },

  /**
   * Remove a member from a conversation. OWNER/ADMIN only. Cannot remove OWNER.
   */
  async removeMember(
    userId: string,
    conversationId: string,
    targetUserId: string,
  ) {
    const { membership } = await requireMembership(userId, conversationId);
    requireOwnerOrAdmin(membership.role);

    if (userId === targetUserId) {
      // Use leaveConversation instead
      throw new ValidationError('Use leave endpoint to leave a conversation');
    }

    const targetMember = await prisma.conversationMember.findUnique({
      where: {
        userId_conversationId: { userId: targetUserId, conversationId },
      },
      select: { role: true },
    });

    if (!targetMember) {
      throw new NotFoundError('User is not a member of this conversation');
    }

    if (targetMember.role === 'OWNER') {
      throw new ForbiddenError('Cannot remove the OWNER of a conversation');
    }

    // Admin cannot remove another admin (only OWNER can)
    if (membership.role === 'ADMIN' && targetMember.role === 'ADMIN') {
      throw new ForbiddenError('Only OWNER can remove an ADMIN');
    }

    await prisma.conversationMember.delete({
      where: {
        userId_conversationId: { userId: targetUserId, conversationId },
      },
    });

    logger.info('Member removed from conversation', {
      conversationId,
      targetUserId,
      removedBy: userId,
    });

    return { success: true };
  },

  /**
   * Leave a conversation. If last member, delete conversation.
   */
  async leaveConversation(userId: string, conversationId: string) {
    const { membership } = await requireMembership(userId, conversationId);

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { type: true },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    if (conversation.type === 'PRIVATE') {
      // For private, just delete membership and soft-delete the conversation
      await prisma.conversationMember.delete({
        where: { id: membership.id },
      });

      // Check if other member still exists
      const remainingMembers = await prisma.conversationMember.count({
        where: { conversationId },
      });

      if (remainingMembers === 0) {
        await prisma.conversation.delete({ where: { id: conversationId } });
      }

      return { success: true };
    }

    // For GROUP/CHANNEL, OWNER cannot leave if there are other members
    if (membership.role === 'OWNER') {
      const memberCount = await prisma.conversationMember.count({
        where: { conversationId },
      });

      if (memberCount > 1) {
        throw new ValidationError(
          'OWNER must transfer ownership or remove all members before leaving',
        );
      }
    }

    await prisma.conversationMember.delete({
      where: { id: membership.id },
    });

    // Check remaining members
    const remainingMembers = await prisma.conversationMember.count({
      where: { conversationId },
    });

    if (remainingMembers === 0) {
      await prisma.conversation.delete({ where: { id: conversationId } });
      logger.info('Conversation auto-deleted (no members left)', {
        conversationId,
      });
    }

    logger.info('User left conversation', {
      conversationId,
      userId,
    });

    return { success: true };
  },

  /**
   * Update a member's role. OWNER only.
   */
  async updateMemberRole(
    userId: string,
    conversationId: string,
    targetUserId: string,
    data: UpdateMemberInput,
  ) {
    const { membership } = await requireMembership(userId, conversationId);
    requireOwner(membership.role);

    const targetMember = await prisma.conversationMember.findUnique({
      where: {
        userId_conversationId: { userId: targetUserId, conversationId },
      },
      select: { role: true },
    });

    if (!targetMember) {
      throw new NotFoundError('User is not a member of this conversation');
    }

    if (targetUserId === userId && data.role) {
      // Cannot change own role
      throw new ForbiddenError('Cannot change your own role');
    }

    const updateData: Prisma.ConversationMemberUpdateInput = {};

    if (data.role !== undefined) {
      updateData.role = data.role;
    }

    if (Object.keys(updateData).length === 0) {
      throw new ValidationError('At least one field must be provided');
    }

    const updated = await prisma.conversationMember.update({
      where: {
        userId_conversationId: { userId: targetUserId, conversationId },
      },
      data: updateData,
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    logger.info('Member role updated', {
      conversationId,
      targetUserId,
      updatedBy: userId,
      newRole: updated.role,
    });

    return updated;
  },

  /**
   * Toggle self-mute on a conversation.
   */
  async toggleMute(
    userId: string,
    conversationId: string,
    data: ToggleMuteInput,
  ) {
    await requireMembership(userId, conversationId);

    const updated = await prisma.conversationMember.update({
      where: {
        userId_conversationId: { userId, conversationId },
      },
      data: {
        isMuted: data.isMuted,
        mutedUntil: data.mutedUntil ? new Date(data.mutedUntil) : null,
      },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    return updated;
  },

  // ─── Block / Unblock ──────────────────────────────────────────────────────

  /**
   * Block a user.
   */
  async blockUser(userId: string, targetUserId: string) {
    if (userId === targetUserId) {
      throw new ValidationError('Cannot block yourself');
    }

    // Check target exists
    const target = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true },
    });
    if (!target) {
      throw new NotFoundError('User not found');
    }

    // Check not already blocked
    const existing = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: { blockerId: userId, blockedId: targetUserId },
      },
    });

    if (existing) {
      throw new ConflictError('User is already blocked');
    }

    await prisma.block.create({
      data: {
        blockerId: userId,
        blockedId: targetUserId,
      },
    });

    logger.info('User blocked', {
      blockerId: userId,
      blockedId: targetUserId,
    });

    return { success: true };
  },

  /**
   * Unblock a user.
   */
  async unblockUser(userId: string, targetUserId: string) {
    const existing = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: { blockerId: userId, blockedId: targetUserId },
      },
    });

    if (!existing) {
      throw new NotFoundError('User is not blocked');
    }

    await prisma.block.delete({
      where: { id: existing.id },
    });

    logger.info('User unblocked', {
      blockerId: userId,
      blockedId: targetUserId,
    });

    return { success: true };
  },

  /**
   * Get list of users blocked by the current user.
   */
  async getBlockedUsers(userId: string) {
    const blocks = await prisma.block.findMany({
      where: { blockerId: userId },
      include: {
        blocked: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            bio: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return blocks.map((b) => ({
      id: b.id,
      blockedUser: b.blocked,
      createdAt: b.createdAt,
    }));
  },

  // ─── Archive ──────────────────────────────────────────────────────────────

  /**
   * Toggle archive status for the current user.
   */
  async archiveConversation(userId: string, conversationId: string) {
    await requireMembership(userId, conversationId);

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { isArchivedBy: true },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const archivedBy: string[] = Array.isArray(conversation.isArchivedBy)
      ? (conversation.isArchivedBy as string[])
      : [];

    const index = archivedBy.indexOf(userId);
    const isNowArchived = index === -1;

    if (isNowArchived) {
      archivedBy.push(userId);
    } else {
      archivedBy.splice(index, 1);
    }

    await prisma.conversation.update({
      where: { id: conversationId },
      data: { isArchivedBy: archivedBy as unknown as Prisma.InputJsonValue },
    });

    return { isArchived: isNowArchived };
  },
};
