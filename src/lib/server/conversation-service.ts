import { ConversationType, MemberRole, Prisma } from "@prisma/client";

import { prisma } from "@server/config/prisma";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@server/errors";
import {
  createConversationSchema,
  joinByInviteSchema,
  updateConversationSchema,
} from "@server/modules/conversations/dto/conversation.dto";

function normalizeArchivedUsers(value: Prisma.JsonValue): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      return [];
    }
  }

  return [];
}

function buildInviteLink(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let index = 0; index < 16; index += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

async function requireMembership(userId: string, conversationId: string) {
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
    throw new ForbiddenError("You are not a member of this conversation");
  }

  return membership;
}

function requireOwnerOrAdmin(role: MemberRole) {
  if (role !== MemberRole.OWNER && role !== MemberRole.ADMIN) {
    throw new ForbiddenError("Only OWNER or ADMIN can perform this action");
  }
}

export async function listConversations(input: {
  userId: string;
  cursor?: string;
  limit?: number;
}) {
  const limit = Math.min(Math.max(input.limit ?? 50, 1), 100);
  const conversations = await prisma.conversation.findMany({
    where: {
      deletedAt: null,
      members: {
        some: { userId: input.userId },
      },
      ...(input.cursor ? { id: { lt: input.cursor } } : {}),
    },
    select: {
      id: true,
      type: true,
      name: true,
      avatarUrl: true,
      description: true,
      inviteLink: true,
      isArchivedBy: true,
      lastMessageAt: true,
      createdAt: true,
      members: {
        select: {
          id: true,
        },
      },
      messages: {
        where: { isDeleted: false },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          id: true,
          content: true,
          type: true,
          senderId: true,
          createdAt: true,
          sender: {
            select: {
              username: true,
            },
          },
        },
      },
      readReceipts: {
        where: { userId: input.userId },
        select: { lastReadMessageId: true },
        take: 1,
      },
    },
    orderBy: [
      { lastMessageAt: "desc" },
      { createdAt: "desc" },
    ],
    take: limit + 1,
  });

  const hasMore = conversations.length > limit;
  const data = hasMore ? conversations.slice(0, limit) : conversations;

  const enriched = await Promise.all(
    data.map(async (conversation) => {
      const lastReadMessageId = conversation.readReceipts[0]?.lastReadMessageId;
      let unreadCount = 0;

      if (lastReadMessageId) {
        const lastReadMessage = await prisma.message.findUnique({
          where: { id: lastReadMessageId },
          select: { createdAt: true },
        });
        unreadCount = await prisma.message.count({
          where: {
            conversationId: conversation.id,
            isDeleted: false,
            senderId: { not: input.userId },
            createdAt: {
              gt: lastReadMessage?.createdAt ?? new Date(0),
            },
          },
        });
      } else {
        unreadCount = await prisma.message.count({
          where: {
            conversationId: conversation.id,
            isDeleted: false,
            senderId: { not: input.userId },
          },
        });
      }

      return {
        id: conversation.id,
        type: conversation.type,
        name: conversation.name,
        avatarUrl: conversation.avatarUrl,
        description: conversation.description,
        inviteLink: conversation.inviteLink,
        lastMessageAt: conversation.lastMessageAt,
        isArchived: normalizeArchivedUsers(conversation.isArchivedBy).includes(input.userId),
        memberCount: conversation.members.length,
        unreadCount,
        lastMessage: conversation.messages[0]
          ? {
              id: conversation.messages[0].id,
              content: conversation.messages[0].content,
              type: conversation.messages[0].type,
              senderId: conversation.messages[0].senderId,
              senderUsername: conversation.messages[0].sender.username,
              createdAt: conversation.messages[0].createdAt,
            }
          : null,
      };
    }),
  );

  return {
    items: enriched,
    nextCursor: hasMore ? data[data.length - 1]?.id ?? null : null,
    hasMore,
  };
}

export async function createConversation(userId: string, input: unknown) {
  const dto = createConversationSchema.parse(input);

  if (dto.type === "PRIVATE") {
    const targetUserId = dto.memberIds?.[0];
    if (!targetUserId) {
      throw new ValidationError("Validation failed", {
        memberIds: ["Exactly one member ID is required for PRIVATE conversations"],
      });
    }

    if (targetUserId === userId) {
      throw new ValidationError("Validation failed", {
        memberIds: ["Cannot create a private conversation with yourself"],
      });
    }

    const [targetUser, block, existing] = await Promise.all([
      prisma.user.findUnique({
        where: { id: targetUserId },
        select: { id: true },
      }),
      prisma.block.findFirst({
        where: {
          OR: [
            { blockerId: userId, blockedId: targetUserId },
            { blockerId: targetUserId, blockedId: userId },
          ],
        },
      }),
      prisma.conversation.findMany({
        where: {
          type: ConversationType.PRIVATE,
          deletedAt: null,
          members: {
            some: {
              userId,
            },
          },
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
      }),
    ]);

    if (!targetUser) {
      throw new NotFoundError("Target user");
    }

    if (block) {
      throw new ForbiddenError("Cannot create conversation: user is blocked");
    }

    const existingPrivate = existing.find((conversation) => {
      const memberIds = conversation.members.map((member) => member.userId);
      return memberIds.length === 2 && memberIds.includes(targetUserId);
    });

    if (existingPrivate) {
      return existingPrivate;
    }

    return prisma.conversation.create({
      data: {
        type: ConversationType.PRIVATE,
        createdBy: userId,
        members: {
          createMany: {
            data: [
              { userId, role: MemberRole.MEMBER },
              { userId: targetUserId, role: MemberRole.MEMBER },
            ],
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
  }

  const memberIds = dto.memberIds ?? [];
  const existingUsers = await prisma.user.findMany({
    where: { id: { in: memberIds } },
    select: { id: true },
  });
  const existingUserIds = new Set(existingUsers.map((user) => user.id));
  const missingIds = memberIds.filter((memberId) => !existingUserIds.has(memberId));

  if (missingIds.length > 0) {
    throw new NotFoundError(`Users not found: ${missingIds.join(", ")}`);
  }

  const blocks = await prisma.block.findMany({
    where: {
      OR: [
        { blockerId: userId, blockedId: { in: memberIds } },
        { blockedId: userId, blockerId: { in: memberIds } },
      ],
    },
  });

  if (blocks.length > 0) {
    throw new ConflictError("Cannot add blocked users");
  }

  let inviteLink = buildInviteLink();
  for (let attempts = 0; attempts < 5; attempts += 1) {
    const existingInvite = await prisma.conversation.findUnique({
      where: { inviteLink },
      select: { id: true },
    });
    if (!existingInvite) {
      break;
    }
    inviteLink = buildInviteLink();
  }

  return prisma.conversation.create({
    data: {
      type: dto.type,
      name: dto.name,
      avatarUrl: dto.avatarUrl,
      description: dto.description,
      inviteLink,
      createdBy: userId,
      members: {
        createMany: {
          data: [
            { userId, role: MemberRole.OWNER },
            ...memberIds.map((memberId) => ({
              userId: memberId,
              role: MemberRole.MEMBER,
            })),
          ],
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });
}

export async function getConversationDetails(userId: string, conversationId: string) {
  const membership = await requireMembership(userId, conversationId);
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
        orderBy: [{ role: "asc" }, { joinedAt: "asc" }],
      },
    },
  });

  if (!conversation) {
    throw new NotFoundError("Conversation");
  }

  return {
    ...conversation,
    isArchived: normalizeArchivedUsers(conversation.isArchivedBy).includes(userId),
    myRole: membership.role,
  };
}

export async function updateConversation(userId: string, conversationId: string, input: unknown) {
  const dto = updateConversationSchema.parse(input);
  const membership = await requireMembership(userId, conversationId);

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: { type: true },
  });

  if (!conversation) {
    throw new NotFoundError("Conversation");
  }

  if (conversation.type === ConversationType.PRIVATE) {
    throw new ValidationError("Validation failed", {
      type: ["Only GROUP or CHANNEL conversations can be updated"],
    });
  }

  requireOwnerOrAdmin(membership.role);

  return prisma.conversation.update({
    where: { id: conversationId },
    data: {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.avatarUrl !== undefined ? { avatarUrl: dto.avatarUrl } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });
}

export async function leaveConversation(userId: string, conversationId: string) {
  const membership = await requireMembership(userId, conversationId);
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: { type: true },
  });

  if (!conversation) {
    throw new NotFoundError("Conversation");
  }

  if (conversation.type === ConversationType.PRIVATE) {
    await prisma.conversationMember.delete({
      where: { id: membership.id },
    });
    const remaining = await prisma.conversationMember.count({
      where: { conversationId },
    });
    if (remaining === 0) {
      await prisma.conversation.delete({
        where: { id: conversationId },
      });
    }
    return;
  }

  if (membership.role === MemberRole.OWNER) {
    const memberCount = await prisma.conversationMember.count({
      where: { conversationId },
    });
    if (memberCount > 1) {
      throw new ValidationError("Validation failed", {
        role: ["OWNER must transfer ownership or remove all members before leaving"],
      });
    }
  }

  await prisma.conversationMember.delete({
    where: { id: membership.id },
  });

  const remaining = await prisma.conversationMember.count({
    where: { conversationId },
  });
  if (remaining === 0) {
    await prisma.conversation.delete({
      where: { id: conversationId },
    });
  }
}

export async function joinConversationByInvite(userId: string, input: unknown) {
  const dto = joinByInviteSchema.parse(input);
  const conversation = await prisma.conversation.findUnique({
    where: { inviteLink: dto.inviteLink },
    include: {
      members: {
        select: { userId: true },
      },
    },
  });

  if (!conversation) {
    throw new NotFoundError("Conversation");
  }

  if (conversation.type === ConversationType.PRIVATE) {
    throw new ForbiddenError("Cannot join a private conversation via invite link");
  }

  if (conversation.members.some((member) => member.userId === userId)) {
    throw new ConflictError("You are already a member of this conversation");
  }

  const blocked = await prisma.block.findFirst({
    where: {
      OR: [
        { blockerId: userId, blockedId: { in: conversation.members.map((member) => member.userId) } },
        { blockedId: userId, blockerId: { in: conversation.members.map((member) => member.userId) } },
      ],
    },
  });

  if (blocked) {
    throw new ForbiddenError("Cannot join: you have been blocked by a member");
  }

  await prisma.conversationMember.create({
    data: {
      userId,
      conversationId: conversation.id,
      role: MemberRole.MEMBER,
    },
  });

  return getConversationDetails(userId, conversation.id);
}

export async function toggleArchivedConversation(userId: string, conversationId: string) {
  await requireMembership(userId, conversationId);
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: { isArchivedBy: true },
  });

  if (!conversation) {
    throw new NotFoundError("Conversation");
  }

  const archivedBy = normalizeArchivedUsers(conversation.isArchivedBy);
  const index = archivedBy.indexOf(userId);
  const isArchived = index === -1;

  if (isArchived) {
    archivedBy.push(userId);
  } else {
    archivedBy.splice(index, 1);
  }

  await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      isArchivedBy: archivedBy as Prisma.InputJsonValue,
    },
  });

  return { isArchived };
}
