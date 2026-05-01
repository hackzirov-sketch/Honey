import { MemberRole, Prisma } from "@prisma/client";

import { prisma } from "@server/config/prisma";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "@server/errors";
import { forwardMessageSchema, markAsReadSchema } from "@server/modules/conversations/dto/conversation.dto";
import {
  editMessageSchema,
  getMessagesSchema,
  reactToMessageSchema,
  removeReactionSchema,
  searchMessagesSchema,
  sendMessageSchema,
} from "@server/modules/messages/dto/message.dto";
import { createNotificationRecord } from "@/lib/server/notification-service";
import { publishRealtimeEvent } from "@/lib/server/realtime-publisher";

function numberFromFileSize(value: number | bigint) {
  return typeof value === "bigint" ? Number(value) : value;
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

function isMuted(membership: { isMuted: boolean; mutedUntil: Date | null }) {
  if (!membership.isMuted) {
    return false;
  }

  if (!membership.mutedUntil) {
    return true;
  }

  return membership.mutedUntil.getTime() > Date.now();
}

async function loadMessageRecord(messageId: string) {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
      reactions: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      attachments: {
        orderBy: { createdAt: "asc" },
      },
      replyTo: {
        select: {
          id: true,
          content: true,
          type: true,
          senderId: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      forwardedFrom: {
        select: {
          id: true,
          content: true,
          type: true,
          senderId: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });

  if (!message) {
    throw new NotFoundError("Message");
  }

  return {
    ...message,
    attachments: message.attachments.map((attachment) => ({
      ...attachment,
      fileSize: numberFromFileSize(attachment.fileSize),
    })),
  };
}

function bridgeMessagePayload(message: Awaited<ReturnType<typeof loadMessageRecord>>) {
  return {
    id: message.id,
    conversationId: message.conversationId,
    senderId: message.senderId,
    content: message.content,
    type: message.type,
    replyToId: message.replyToId,
    isEdited: message.isEdited,
    createdAt: message.createdAt.toISOString(),
    sender: message.sender
      ? {
          id: message.sender.id,
          username: message.sender.username,
          avatarUrl: message.sender.avatarUrl,
        }
      : undefined,
    attachments: message.attachments.map((attachment) => ({
      id: attachment.id,
      type: attachment.type,
      fileName: attachment.fileName,
      fileSize: attachment.fileSize,
      thumbnailUrl: attachment.thumbnailUrl,
    })),
  };
}

async function notifyConversationMembers(
  conversationId: string,
  senderId: string,
  input: { title: string; body: string; payload: Record<string, unknown> },
) {
  const members = await prisma.conversationMember.findMany({
    where: {
      conversationId,
      userId: { not: senderId },
    },
    select: { userId: true },
  });

  await Promise.all(
    members.map((member) =>
      createNotificationRecord({
        recipientId: member.userId,
        senderId,
        type: "message",
        title: input.title,
        body: input.body,
        payload: input.payload,
      }),
    ),
  );
}

export async function listMessages(input: {
  userId: string;
  conversationId: string;
  cursor?: string;
  limit?: string;
}) {
  const dto = getMessagesSchema.parse({
    cursor: input.cursor,
    limit: input.limit,
  });

  await requireMembership(input.userId, input.conversationId);
  const limit = Number(dto.limit);

  const messages = await prisma.message.findMany({
    where: {
      conversationId: input.conversationId,
      ...(dto.cursor
        ? {
            createdAt: {
              lt: (
                await prisma.message.findUnique({
                  where: { id: dto.cursor },
                  select: { createdAt: true },
                })
              )?.createdAt ?? new Date(),
            },
          }
        : {}),
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
      reactions: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      attachments: {
        orderBy: { createdAt: "asc" },
      },
      replyTo: {
        select: {
          id: true,
          content: true,
          type: true,
          senderId: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      forwardedFrom: {
        select: {
          id: true,
          content: true,
          type: true,
          senderId: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = messages.length > limit;
  const sliced = hasMore ? messages.slice(0, limit) : messages;
  const data = sliced
    .map((message) => ({
      ...message,
      attachments: message.attachments.map((attachment) => ({
        ...attachment,
        fileSize: numberFromFileSize(attachment.fileSize),
      })),
    }))
    .reverse();

  return {
    items: data,
    nextCursor: hasMore ? sliced[sliced.length - 1]?.id ?? null : null,
    hasMore,
  };
}

export async function sendMessage(input: {
  userId: string;
  conversationId: string;
  body: unknown;
}) {
  const dto = sendMessageSchema.parse(input.body);
  const membership = await requireMembership(input.userId, input.conversationId);

  if (isMuted(membership)) {
    throw new ForbiddenError("You are muted in this conversation");
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id: input.conversationId },
    select: { id: true, type: true },
  });

  if (!conversation) {
    throw new NotFoundError("Conversation");
  }

  if (conversation.type === "CHANNEL") {
    if (membership.role !== MemberRole.OWNER && membership.role !== MemberRole.ADMIN) {
      throw new ForbiddenError("Only OWNER or ADMIN can send messages in a channel");
    }
  }

  if (conversation.type === "PRIVATE") {
    const otherMembers = await prisma.conversationMember.findMany({
      where: {
        conversationId: input.conversationId,
        userId: { not: input.userId },
      },
      select: { userId: true },
    });
    const block = await prisma.block.findFirst({
      where: {
        OR: [
          { blockerId: input.userId, blockedId: { in: otherMembers.map((member) => member.userId) } },
          { blockerId: { in: otherMembers.map((member) => member.userId) }, blockedId: input.userId },
        ],
      },
    });
    if (block) {
      throw new ForbiddenError("Cannot send messages: you or the recipient is blocked");
    }
  }

  if (dto.idempotencyKey) {
    const existing = await prisma.message.findUnique({
      where: { idempotencyKey: dto.idempotencyKey },
      select: { id: true },
    });
    if (existing) {
      return loadMessageRecord(existing.id);
    }
  }

  if (dto.replyToId) {
    const replyTarget = await prisma.message.findUnique({
      where: { id: dto.replyToId },
      select: { conversationId: true, isDeleted: true },
    });
    if (!replyTarget || replyTarget.isDeleted || replyTarget.conversationId !== input.conversationId) {
      throw new ValidationError("Validation failed", {
        replyToId: ["Reply target must be in the same conversation and not deleted"],
      });
    }
  }

  if (dto.forwardedFromId) {
    const forwardedTarget = await prisma.message.findUnique({
      where: { id: dto.forwardedFromId },
      select: { id: true, isDeleted: true },
    });
    if (!forwardedTarget || forwardedTarget.isDeleted) {
      throw new ValidationError("Validation failed", {
        forwardedFromId: ["Forwarded message not found or deleted"],
      });
    }
  }

  const attachmentIds = dto.attachments?.map((attachment) => attachment.fileId) ?? [];
  const fileMetadata = attachmentIds.length > 0
    ? await prisma.fileMetadata.findMany({
        where: { id: { in: attachmentIds } },
        select: {
          id: true,
          originalName: true,
          fileSize: true,
          mimeType: true,
          thumbnailPath: true,
          width: true,
          height: true,
          duration: true,
        },
      })
    : [];

  const fileMap = new Map(fileMetadata.map((file) => [file.id, file]));
  if (attachmentIds.some((fileId) => !fileMap.has(fileId))) {
    throw new ValidationError("Validation failed", {
      attachments: ["One or more attachments could not be resolved"],
    });
  }

  const created = await prisma.$transaction(async (tx) => {
    const message = await tx.message.create({
      data: {
        conversationId: input.conversationId,
        senderId: input.userId,
        content: dto.content,
        type: dto.type,
        replyToId: dto.replyToId,
        forwardedFromId: dto.forwardedFromId,
        idempotencyKey: dto.idempotencyKey,
      },
      select: { id: true },
    });

    if (dto.attachments && dto.attachments.length > 0) {
      await tx.messageAttachment.createMany({
        data: dto.attachments.map((attachment) => {
          const file = fileMap.get(attachment.fileId)!;
          return {
            messageId: message.id,
            fileId: attachment.fileId,
            type: attachment.type,
            fileName: file.originalName,
            fileSize: numberFromFileSize(file.fileSize),
            mimeType: file.mimeType,
            thumbnailUrl: file.thumbnailPath,
            width: file.width,
            height: file.height,
            duration: file.duration,
          };
        }),
      });
    }

    await tx.conversation.update({
      where: { id: input.conversationId },
      data: { lastMessageAt: new Date() },
    });

    return message.id;
  });

  const message = await loadMessageRecord(created);

  await publishRealtimeEvent({
    type: "message:new",
    conversationId: input.conversationId,
    message: bridgeMessagePayload(message),
  });

  await notifyConversationMembers(input.conversationId, input.userId, {
    title: "New message",
    body: dto.content?.slice(0, 100) ?? "Sent an attachment",
    payload: {
      conversationId: input.conversationId,
      messageId: message.id,
      messageType: message.type,
    },
  });

  return message;
}

export async function editMessage(input: {
  userId: string;
  messageId: string;
  body: unknown;
}) {
  const dto = editMessageSchema.parse(input.body);
  const existing = await prisma.message.findUnique({
    where: { id: input.messageId },
    select: {
      id: true,
      senderId: true,
      conversationId: true,
      isDeleted: true,
      type: true,
    },
  });

  if (!existing) {
    throw new NotFoundError("Message");
  }

  if (existing.isDeleted) {
    throw new ValidationError("Validation failed", {
      messageId: ["Cannot edit a deleted message"],
    });
  }

  if (existing.senderId !== input.userId) {
    throw new ForbiddenError("Only the sender can edit this message");
  }

  if (existing.type !== "TEXT") {
    throw new ValidationError("Validation failed", {
      type: ["Only text messages can be edited"],
    });
  }

  await prisma.message.update({
    where: { id: input.messageId },
    data: {
      content: dto.content,
      isEdited: true,
      editedAt: new Date(),
    },
  });

  const message = await loadMessageRecord(input.messageId);
  await publishRealtimeEvent({
    type: "message:updated",
    conversationId: existing.conversationId,
    message: bridgeMessagePayload(message),
  });

  return message;
}

export async function deleteMessage(input: {
  userId: string;
  messageId: string;
}) {
  const existing = await prisma.message.findUnique({
    where: { id: input.messageId },
    select: {
      id: true,
      senderId: true,
      conversationId: true,
      isDeleted: true,
    },
  });

  if (!existing) {
    throw new NotFoundError("Message");
  }

  if (existing.isDeleted) {
    throw new ValidationError("Validation failed", {
      messageId: ["Message is already deleted"],
    });
  }

  if (existing.senderId !== input.userId) {
    const membership = await requireMembership(input.userId, existing.conversationId);
    const conversation = await prisma.conversation.findUnique({
      where: { id: existing.conversationId },
      select: { type: true },
    });
    if (!conversation || conversation.type === "PRIVATE") {
      throw new ForbiddenError("Only the sender can delete messages in private conversations");
    }
    if (membership.role !== MemberRole.OWNER && membership.role !== MemberRole.ADMIN) {
      throw new ForbiddenError("Only OWNER or ADMIN can delete others' messages");
    }
  }

  await prisma.message.update({
    where: { id: input.messageId },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: input.userId,
      content: null,
    },
  });

  await publishRealtimeEvent({
    type: "message:deleted",
    conversationId: existing.conversationId,
    messageId: input.messageId,
    deletedBy: input.userId,
  });

  return { success: true, messageId: input.messageId };
}

export async function toggleReaction(input: {
  userId: string;
  messageId: string;
  bodyOrQuery: unknown;
  mode: "add" | "remove";
}) {
  const dto = input.mode === "remove"
    ? removeReactionSchema.parse(input.bodyOrQuery)
    : reactToMessageSchema.parse(input.bodyOrQuery);

  const message = await prisma.message.findUnique({
    where: { id: input.messageId },
    select: {
      id: true,
      conversationId: true,
      senderId: true,
      isDeleted: true,
    },
  });

  if (!message) {
    throw new NotFoundError("Message");
  }

  if (message.isDeleted) {
    throw new ValidationError("Validation failed", {
      messageId: ["Cannot react to a deleted message"],
    });
  }

  await requireMembership(input.userId, message.conversationId);

  const existing = await prisma.messageReaction.findUnique({
    where: {
      messageId_userId_emoji: {
        messageId: input.messageId,
        userId: input.userId,
        emoji: dto.emoji,
      },
    },
  });

  if (input.mode === "remove") {
    if (existing) {
      await prisma.messageReaction.delete({ where: { id: existing.id } });
    }
  } else if (!existing) {
    await prisma.messageReaction.create({
      data: {
        messageId: input.messageId,
        userId: input.userId,
        emoji: dto.emoji,
      },
    });

    if (message.senderId !== input.userId) {
      await createNotificationRecord({
        recipientId: message.senderId,
        senderId: input.userId,
        type: "reaction",
        title: "New reaction",
        body: dto.emoji,
        payload: {
          messageId: input.messageId,
          conversationId: message.conversationId,
        },
      });
    }
  }

  const reactions = await prisma.messageReaction.findMany({
    where: { messageId: input.messageId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const mappedReactions = reactions.map((reaction) => ({
    id: reaction.id,
    userId: reaction.userId,
    username: reaction.user.username,
    emoji: reaction.emoji,
  }));

  await publishRealtimeEvent({
    type: input.mode === "remove" ? "reaction:remove" : "reaction:add",
    conversationId: message.conversationId,
    messageId: input.messageId,
    userId: input.userId,
    emoji: dto.emoji,
  });
  await publishRealtimeEvent({
    type: "reaction:updated",
    conversationId: message.conversationId,
    messageId: input.messageId,
    reactions: mappedReactions,
  });

  return {
    success: true,
    action: input.mode === "remove" ? "removed" : existing ? "removed" : "added",
    reactions: mappedReactions,
  };
}

export async function forwardMessage(input: {
  userId: string;
  messageId: string;
  body: unknown;
}) {
  const dto = forwardMessageSchema.parse(input.body);
  const original = await prisma.message.findUnique({
    where: { id: input.messageId },
    include: {
      attachments: true,
    },
  });

  if (!original || original.isDeleted) {
    throw new NotFoundError("Message");
  }

  await requireMembership(input.userId, original.conversationId);
  const targetMembership = await requireMembership(input.userId, dto.targetConversationId);
  const targetConversation = await prisma.conversation.findUnique({
    where: { id: dto.targetConversationId },
    select: { type: true },
  });

  if (!targetConversation) {
    throw new NotFoundError("Conversation");
  }

  if (targetConversation.type === "CHANNEL") {
    if (targetMembership.role !== MemberRole.OWNER && targetMembership.role !== MemberRole.ADMIN) {
      throw new ForbiddenError("Only OWNER or ADMIN can forward to a channel");
    }
  }

  if (dto.targetConversationId === original.conversationId) {
    throw new ValidationError("Validation failed", {
      targetConversationId: ["Cannot forward a message to the same conversation"],
    });
  }

  const createdId = await prisma.$transaction(async (tx) => {
    const created = await tx.message.create({
      data: {
        conversationId: dto.targetConversationId,
        senderId: input.userId,
        content: original.content,
        type: original.type,
        forwardedFromId: original.id,
      },
      select: { id: true },
    });

    if (original.attachments.length > 0) {
      await tx.messageAttachment.createMany({
        data: original.attachments.map((attachment) => ({
          messageId: created.id,
          fileId: attachment.fileId,
          type: attachment.type,
          fileName: attachment.fileName,
          fileSize: numberFromFileSize(attachment.fileSize),
          mimeType: attachment.mimeType,
          thumbnailUrl: attachment.thumbnailUrl,
          width: attachment.width,
          height: attachment.height,
          duration: attachment.duration,
        })),
      });
    }

    await tx.conversation.update({
      where: { id: dto.targetConversationId },
      data: { lastMessageAt: new Date() },
    });

    return created.id;
  });

  const message = await loadMessageRecord(createdId);
  await publishRealtimeEvent({
    type: "message:new",
    conversationId: dto.targetConversationId,
    message: bridgeMessagePayload(message),
  });

  return message;
}

export async function markConversationAsRead(input: {
  userId: string;
  conversationId: string;
  body: unknown;
}) {
  const dto = markAsReadSchema.parse(input.body);
  await requireMembership(input.userId, input.conversationId);

  const message = await prisma.message.findFirst({
    where: {
      id: dto.messageId,
      conversationId: input.conversationId,
      isDeleted: false,
    },
    select: { id: true },
  });

  if (!message) {
    throw new NotFoundError("Message");
  }

  const receipt = await prisma.readReceipt.upsert({
    where: {
      conversationId_userId: {
        conversationId: input.conversationId,
        userId: input.userId,
      },
    },
    update: {
      lastReadMessageId: dto.messageId,
    },
    create: {
      conversationId: input.conversationId,
      userId: input.userId,
      lastReadMessageId: dto.messageId,
    },
  });

  await publishRealtimeEvent({
    type: "message:read",
    conversationId: input.conversationId,
    userId: input.userId,
    lastReadMessageId: receipt.lastReadMessageId,
  });

  return { success: true, lastReadMessageId: receipt.lastReadMessageId };
}

export async function searchConversationMessages(input: {
  userId: string;
  conversationId: string;
  query: unknown;
}) {
  const dto = searchMessagesSchema.parse(input.query);
  await requireMembership(input.userId, input.conversationId);

  const messages = await prisma.message.findMany({
    where: {
      conversationId: input.conversationId,
      isDeleted: false,
      content: { contains: dto.q },
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
      reactions: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      attachments: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return messages.map((message) => ({
    ...message,
    attachments: message.attachments.map((attachment) => ({
      ...attachment,
      fileSize: numberFromFileSize(attachment.fileSize),
    })),
  }));
}
