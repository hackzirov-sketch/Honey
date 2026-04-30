import { prisma } from "../../../config/prisma";
import { NotFoundError, ForbiddenError } from "../../../errors";
import { logger } from "../../../utils/logger";
import type {
  SafeNotification,
  PaginatedResult,
  CreateNotificationInput,
} from "../../../types";

const log = logger.info("NotificationService");

async function getNotifications(
  userId: string,
  cursor?: string,
  limit: number = 30,
  type?: string,
): Promise<PaginatedResult<SafeNotification>> {
  const where: Parameters<typeof prisma.notification.findMany>[0]["where"] = {
    recipientId: userId,
    ...(type ? { type } : {}),
    ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
  };

  const notifications = await prisma.notification.findMany({
    where,
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
    take: limit + 1,
  });

  const hasMore = notifications.length > limit;
  const data = hasMore ? notifications.slice(0, limit) : notifications;

  return {
    data: data as unknown as SafeNotification[],
    nextCursor: hasMore
      ? data[data.length - 1].createdAt.toISOString()
      : null,
    hasMore,
  };
}

async function markAsRead(
  userId: string,
  notificationIds: string[],
): Promise<{ marked: number }> {
  const result = await prisma.notification.updateMany({
    where: {
      id: { in: notificationIds },
      recipientId: userId,
      isRead: false,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });

  log.info("Notifications marked as read", {
    userId,
    count: result.count,
  });

  return { marked: result.count };
}

async function markAllAsRead(userId: string): Promise<{ marked: number }> {
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

  log.info("All notifications marked as read", {
    userId,
    count: result.count,
  });

  return { marked: result.count };
}

async function getUnreadCount(userId: string): Promise<{ count: number }> {
  const count = await prisma.notification.count({
    where: {
      recipientId: userId,
      isRead: false,
    },
  });

  return { count };
}

async function createNotification(
  data: CreateNotificationInput,
): Promise<SafeNotification> {
  const notification = await prisma.notification.create({
    data: {
      recipientId: data.recipientId,
      senderId: data.senderId,
      type: data.type,
      title: data.title,
      body: data.body,
      payload: data.payload,
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

  log.info("Notification created", {
    id: notification.id,
    type: notification.type,
    recipientId: data.recipientId,
  });

  return notification as unknown as SafeNotification;
}

async function deleteNotification(
  userId: string,
  notificationId: string,
): Promise<void> {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    select: { recipientId: true },
  });

  if (!notification) {
    throw new NotFoundError("Notification", notificationId);
  }

  if (notification.recipientId !== userId) {
    throw new ForbiddenError("You can only delete your own notifications");
  }

  await prisma.notification.delete({
    where: { id: notificationId },
  });

  log.info("Notification deleted", { notificationId, userId });
}

async function clearAllNotifications(userId: string): Promise<{ deleted: number }> {
  const result = await prisma.notification.deleteMany({
    where: { recipientId: userId },
  });

  log.info("All notifications cleared", { userId, count: result.count });

  return { deleted: result.count };
}

interface NotificationPreferences {
  [key: string]: boolean;
}

async function getPreferences(userId: string): Promise<NotificationPreferences> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  // Preferences are stored as a JSON field on the user model conceptually.
  // Since the current schema doesn't have a dedicated column,
  // we use a simple in-memory default.
  // In a production setup, you would add a `notificationPreferences` JSON column.
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

  return defaultPreferences;
}

async function updatePreferences(
  userId: string,
  preferences: NotificationPreferences,
): Promise<NotificationPreferences> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  // In production, persist to a dedicated column on the User model.
  // For now, merge with defaults and return.
  const defaults = await getPreferences(userId);
  const merged = { ...defaults, ...preferences };

  log.info("Notification preferences updated", { userId, preferences: merged });

  return merged;
}

export const notificationService = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  createNotification,
  deleteNotification,
  clearAllNotifications,
  getPreferences,
  updatePreferences,
};
