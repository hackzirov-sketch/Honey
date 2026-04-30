import { Router } from "express";
import { notificationController } from "../controllers/notification.controller";

const router = Router();

/**
 * @route   GET /notifications
 * @desc    List notifications (paginated, newest first)
 */
router.get("/", notificationController.getNotifications);

/**
 * @route   GET /notifications/unread-count
 * @desc    Get unread notification count
 */
router.get("/unread-count", notificationController.getUnreadCount);

/**
 * @route   GET /notifications/preferences
 * @desc    Get notification preferences
 */
router.get("/preferences", notificationController.getPreferences);

/**
 * @route   POST /notifications/mark-read
 * @desc    Mark specific notifications as read, or mark all
 */
router.post("/mark-read", notificationController.markAsRead);

/**
 * @route   POST /notifications/mark-all-read
 * @desc    Mark all notifications as read (alias)
 */
router.post("/mark-all-read", async (req, res, next) => {
  // Reuse markAsRead controller with markAll: true
  req.body = { markAll: true };
  await notificationController.markAsRead(req, res, next);
});

/**
 * @route   PATCH /notifications/preferences
 * @desc    Update notification preferences
 */
router.patch("/preferences", notificationController.updatePreferences);

/**
 * @route   DELETE /notifications/:id
 * @desc    Delete a specific notification
 */
router.delete("/:id", notificationController.deleteNotification);

/**
 * @route   DELETE /notifications
 * @desc    Clear all notifications
 */
router.delete("/", notificationController.clearAllNotifications);

export const notificationRoutes = router;
