import type { Prisma } from "@prisma/client";

import { prisma } from "@server/config/prisma";
import { NotFoundError, ValidationError } from "@server/errors";
import {
  getNotificationsDtoSchema,
  markReadDtoSchema,
  notificationPreferencesSchema,
  type NotificationPreferences,
} from "@server/modules/notifications/dto/notification.dto";
import { publishRealtimeEvent } from "@/lib/server/realtime-publisher";

export interface NotificationRecord {
  id: string;
  type: string;
  title: string;
  body: string | null;
  payload: Prisma.JsonValue | null;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
  sender: {
    id: string;
    username: string;
    avatarUrl: string | null;
  } | null;
}

function mapNotification(record: NotificationRecord) {
  return {
    ...record,
    payload: record.payload as Record<string, unknown> | null,
  };
}

export async function listNotifications(input: {
  userId: string;
  cursor?: string;
  limit?: number;
  type?: string;
}) {
  const dto = getNotificationsDtoSchema.parse({
    cursor: input.cursor,
    limit: input.limit,
    type: input.type,
  });

  const notifications = await prisma.notification.findMany({
    where: {
      recipientId: input.userId,
      ...(dto.type ? { type: dto.type } : {}),
      ...(dto.cursor ? { createdAt: { lt: new Date(dto.cursor) } } : {}),
    },
    select: {
      id: true,
      type: true,
      title: true,
      body: true,
      payload: true,
      isRead: true,
      readAt: true,
      createdAt: true,
      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: dto.limit + 1,
  });

  const hasMore = notifications.length > dto.limit;
  const data = hasMore ? notifications.slice(0, dto.limit) : notifications;

  return {
    data: data.map((item) => mapNotification(item as NotificationRecord)),
    nextCursor: hasMore
      ? data[data.length - 1]?.createdAt.toISOString() ?? null
      : null,
    hasMore,
  };
}

export async function getUnreadNotificationCount(userId: string) {
  const count = await prisma.notification.count({
    where: {
      recipientId: userId,
      isRead: false,
    },
  });

  return { count };
}

export async function markNotificationsAsRead(
  userId: string,
  input: unknown,
) {
  const dto = markReadDtoSchema.parse(input);
  if (dto.markAll) {
    const result = await prisma.notification.updateMany({
      where: {
        recipientId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
    return { marked: result.count, message: "All notifications marked as read" };
  }

  if (!dto.notificationIds || dto.notificationIds.length === 0) {
    throw new ValidationError("Validation failed", {
      notificationIds: ["Provide notificationIds or set markAll to true"],
    });
  }

  const result = await prisma.notification.updateMany({
    where: {
      recipientId: userId,
      id: { in: dto.notificationIds },
      isRead: false,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });

  return { marked: result.count };
}

export async function deleteNotificationById(userId: string, notificationId: string) {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    select: { id: true, recipientId: true },
  });

  if (!notification) {
    throw new NotFoundError("Notification");
  }

  if (notification.recipientId !== userId) {
    throw new NotFoundError("Notification");
  }

  await prisma.notification.delete({
    where: { id: notification.id },
  });
}

export async function clearNotifications(userId: string) {
  const result = await prisma.notification.deleteMany({
    where: { recipientId: userId },
  });

  return {
    deleted: result.count,
    message: "All notifications cleared",
  };
}

const defaultPreferences: NotificationPreferences = {
  message: true,
  reaction: true,
  follow: true,
  mention: true,
  groupInvite: true,
  streamStart: false,
  meetingInvite: true,
  system: true,
};

export async function getNotificationPreferences(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  return defaultPreferences;
}

export async function updateNotificationPreferences(
  userId: string,
  input: unknown,
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  const dto = notificationPreferencesSchema.parse(input);
  return { ...defaultPreferences, ...dto };
}

export async function createNotificationRecord(input: {
  recipientId: string;
  senderId?: string;
  type: string;
  title: string;
  body?: string;
  payload?: Record<string, unknown>;
}) {
  const notification = await prisma.notification.create({
    data: {
      recipientId: input.recipientId,
      senderId: input.senderId,
      type: input.type,
      title: input.title,
      body: input.body,
      payload: input.payload as Prisma.InputJsonValue | undefined,
    },
    select: {
      id: true,
      type: true,
      title: true,
      body: true,
      payload: true,
      isRead: true,
      readAt: true,
      createdAt: true,
      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  await publishRealtimeEvent({
    type: "notification:new",
    userId: input.recipientId,
    notification: {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      body: notification.body ?? undefined,
      payload: (notification.payload as Record<string, unknown> | null) ?? undefined,
      createdAt: notification.createdAt.toISOString(),
    },
  });

  return mapNotification(notification as NotificationRecord);
}
