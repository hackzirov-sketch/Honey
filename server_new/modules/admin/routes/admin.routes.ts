import { Router } from "express";
import { adminController } from "../controllers/admin.controller";

const router = Router();

// ── All routes require staff role ─────────────────────────────
// (auth middleware should be applied at the app level before mounting this router)

/**
 * @route   GET /admin/stats
 * @desc    Dashboard statistics
 */
router.get("/stats", adminController.getDashboardStats);

/**
 * @route   GET /admin/users
 * @desc    List all users with filters
 */
router.get("/users", adminController.getUsers);

/**
 * @route   PATCH /admin/users/:id
 * @desc    Update user (verify, role change, etc.)
 */
router.patch("/users/:id", adminController.updateUser);

/**
 * @route   POST /admin/users/:id/ban
 * @desc    Ban user with reason
 */
router.post("/users/:id/ban", adminController.banUser);

/**
 * @route   POST /admin/users/:id/unban
 * @desc    Unban user
 */
router.post("/users/:id/unban", adminController.unbanUser);

/**
 * @route   DELETE /admin/users/:id
 * @desc    Hard delete user with cascade
 */
router.delete("/users/:id", adminController.deleteUser);

/**
 * @route   GET /admin/reports
 * @desc    List reports
 */
router.get("/reports", adminController.getReports);

/**
 * @route   PATCH /admin/reports/:id
 * @desc    Review report (update status)
 */
router.patch("/reports/:id", adminController.reviewReport);

/**
 * @route   GET /admin/audit-logs
 * @desc    List audit logs
 */
router.get("/audit-logs", adminController.getAuditLogs);

export const adminRoutes = router;
