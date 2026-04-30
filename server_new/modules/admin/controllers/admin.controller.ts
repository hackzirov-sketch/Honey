import type { Request, Response, NextFunction } from "express";
import { adminService } from "../services/admin.service";
import {
  adminGetUsersQuerySchema,
  adminUpdateUserSchema,
  adminBanUserSchema,
  adminReviewReportSchema,
  adminGetReportsQuerySchema,
  adminGetAuditLogsQuerySchema,
} from "../dto/admin.dto";
import { ValidationError } from "../../../errors";
import { AuthenticatedRequest } from "../../../types";
import type { ReportStatus } from "@prisma/client";

function getClientInfo(req: Request) {
  return {
    ipAddress: req.ip ?? req.headers["x-forwarded-for"] as string | undefined,
    userAgent: req.headers["user-agent"] as string | undefined,
  };
}

// ── Dashboard ─────────────────────────────────────────────────

async function getDashboardStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}

// ── User Management ───────────────────────────────────────────

async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = adminGetUsersQuerySchema.parse({
      cursor: req.query.cursor as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      search: req.query.search as string | undefined,
      isVerified: req.query.isVerified as string | undefined,
      isBanned: req.query.isBanned as string | undefined,
      isStaff: req.query.isStaff as string | undefined,
      sortBy: req.query.sortBy as string | undefined,
      sortOrder: req.query.sortOrder as string | undefined,
    });

    const result = await adminService.getUsers(query.cursor, query.limit, {
      search: query.search,
      isVerified: query.isVerified,
      isBanned: query.isBanned,
      isStaff: query.isStaff,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const { id } = req.params;
    const result = adminUpdateUserSchema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path.join("."));
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }
      throw new ValidationError(details);
    }

    const { ipAddress, userAgent } = getClientInfo(req);

    const user = await adminService.updateUser(
      id,
      result.data,
      authReq.user.id,
      ipAddress,
      userAgent,
    );

    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function banUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const { id } = req.params;
    const result = adminBanUserSchema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path.join("."));
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }
      throw new ValidationError(details);
    }

    const { ipAddress, userAgent } = getClientInfo(req);

    const outcome = await adminService.banUser(
      id,
      result.data.reason,
      authReq.user.id,
      ipAddress,
      userAgent,
    );

    res.json(outcome);
  } catch (error) {
    next(error);
  }
}

async function unbanUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const { id } = req.params;
    const { ipAddress, userAgent } = getClientInfo(req);

    const outcome = await adminService.unbanUser(
      id,
      authReq.user.id,
      ipAddress,
      userAgent,
    );

    res.json(outcome);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const { id } = req.params;
    const { ipAddress, userAgent } = getClientInfo(req);

    const outcome = await adminService.deleteUser(
      id,
      authReq.user.id,
      ipAddress,
      userAgent,
    );

    res.json(outcome);
  } catch (error) {
    next(error);
  }
}

// ── Reports ───────────────────────────────────────────────────

async function getReports(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = adminGetReportsQuerySchema.parse({
      cursor: req.query.cursor as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      status: req.query.status as string | undefined,
    });

    const result = await adminService.getReports(query.cursor, query.limit, query.status);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function reviewReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const { id } = req.params;
    const result = adminReviewReportSchema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path.join("."));
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }
      throw new ValidationError(details);
    }

    const { ipAddress, userAgent } = getClientInfo(req);

    const report = await adminService.reviewReport(
      id,
      result.data.status as ReportStatus,
      authReq.user.id,
      result.data.note,
      ipAddress,
      userAgent,
    );

    res.json(report);
  } catch (error) {
    next(error);
  }
}

// ── Audit Logs ────────────────────────────────────────────────

async function getAuditLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = adminGetAuditLogsQuerySchema.parse({
      cursor: req.query.cursor as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      userId: req.query.userId as string | undefined,
      action: req.query.action as string | undefined,
      targetType: req.query.targetType as string | undefined,
      targetId: req.query.targetId as string | undefined,
    });

    const result = await adminService.getAuditLogs(query.cursor, query.limit, {
      userId: query.userId,
      action: query.action,
      targetType: query.targetType,
      targetId: query.targetId,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export const adminController = {
  getDashboardStats,
  getUsers,
  updateUser,
  banUser,
  unbanUser,
  deleteUser,
  getReports,
  reviewReport,
  getAuditLogs,
};
