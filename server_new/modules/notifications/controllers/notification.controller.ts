import type { Request, Response, NextFunction } from "express";
import { notificationService } from "../services/notification.service";
import {
  getNotificationsDtoSchema,
  markReadDtoSchema,
  notificationPreferencesSchema,
} from "../dto/notification.dto";
import { ValidationError } from "../../../errors";
import { AuthenticatedRequest } from "../../../types";

async function getNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const dto = getNotificationsDtoSchema.parse({
      cursor: req.query.cursor as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      type: req.query.type as string | undefined,
    });

    const result = await notificationService.getNotifications(
      authReq.user.id,
      dto.cursor,
      dto.limit,
      dto.type,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getUnreadCount(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const result = await notificationService.getUnreadCount(authReq.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const result = markReadDtoSchema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path.join("."));
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }
      throw new ValidationError(details);
    }

    const { notificationIds, markAll } = result.data;

    if (markAll) {
      const outcome = await notificationService.markAllAsRead(authReq.user.id);
      res.json({ ...outcome, message: "All notifications marked as read" });
      return;
    }

    if (!notificationIds || notificationIds.length === 0) {
      throw new ValidationError({
        notificationIds: ["Provide notificationIds or set markAll to true"],
      });
    }

    const outcome = await notificationService.markAsRead(authReq.user.id, notificationIds);
    res.json(outcome);
  } catch (error) {
    next(error);
  }
}

async function deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const { id } = req.params;

    await notificationService.deleteNotification(authReq.user.id, id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function clearAllNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const result = await notificationService.clearAllNotifications(authReq.user.id);
    res.json({ ...result, message: "All notifications cleared" });
  } catch (error) {
    next(error);
  }
}

async function getPreferences(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const preferences = await notificationService.getPreferences(authReq.user.id);
    res.json(preferences);
  } catch (error) {
    next(error);
  }
}

async function updatePreferences(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const result = notificationPreferencesSchema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path.join("."));
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }
      throw new ValidationError(details);
    }

    const preferences = await notificationService.updatePreferences(
      authReq.user.id,
      result.data,
    );
    res.json(preferences);
  } catch (error) {
    next(error);
  }
}

export const notificationController = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
  getPreferences,
  updatePreferences,
};
