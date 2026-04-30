import { Router } from "express";
import { auditService } from "../services/audit.service";
import { AuthenticatedRequest } from "../../../types";

const router = Router();

/**
 * @route   GET /audit
 * @desc    List audit logs (admin only, paginated)
 * @query   cursor, limit, userId, action, targetType, targetId
 */
router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit ?? 50), 100);

    const result = await auditService.getAuditLogs(
      req.query.cursor as string | undefined,
      limit,
      {
        userId: req.query.userId as string | undefined,
        action: req.query.action as string | undefined,
        targetType: req.query.targetType as string | undefined,
        targetId: req.query.targetId as string | undefined,
      },
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /audit/:id
 * @desc    Get single audit log entry
 */
router.get("/:id", async (req, res, next) => {
  try {
    const entry = await auditService.getAuditLogById(req.params.id);
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

export const auditRoutes = router;
