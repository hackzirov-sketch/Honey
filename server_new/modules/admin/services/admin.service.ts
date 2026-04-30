import { prisma } from "../../../config/prisma";
import { NotFoundError, ForbiddenError } from "../../../errors";
import { logger } from "../../../utils/logger";
import { auditService } from "../../audit/services/audit.service";
import type {
  DashboardStats,
  SafeReport,
  PublicUser,
  PaginatedResult,
  SafeAuditLog,
  UpdateUserInput,
} from "../../../types";
import type { Prisma } from "@prisma/client";
import type { ReportStatus } from "@prisma/client";

const log = logger.info("AdminService");

// ── Dashboard ─────────────────────────────────────────────────

async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalUsers,
    verifiedUsers,
    bannedUsers,
    totalMessages,
    totalStreams,
    totalMeetings,
    totalReports,
    pendingReports,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isVerified: true } }),
    prisma.user.count({ where: { isBanned: true } }),
    prisma.message.count({ where: { isDeleted: false } }),
    prisma.stream.count(),
    prisma.meetingRoom.count(),
    prisma.report.count(),
    prisma.report.count({ where: { status: "PENDING" } }),
  ]);

  return {
    totalUsers,
    verifiedUsers,
    bannedUsers,
    totalMessages,
    totalStreams,
    totalMeetings,
    totalReports,
    pendingReports,
  };
}

// ── User Management ───────────────────────────────────────────

interface AdminUserFilters {
  search?: string;
  isVerified?: boolean;
  isBanned?: boolean;
  isStaff?: boolean;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

async function getUsers(
  cursor?: string,
  limit: number = 50,
  filters?: AdminUserFilters,
): Promise<PaginatedResult<PublicUser>> {
  const where: Prisma.UserWhereInput = {};

  if (filters?.search) {
    where.OR = [
      { username: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
      {
        profile: {
          OR: [
            { firstName: { contains: filters.search, mode: "insensitive" } },
            { lastName: { contains: filters.search, mode: "insensitive" } },
            { username: { contains: filters.search, mode: "insensitive" } },
          ],
        },
      },
    ];
  }

  if (filters?.isVerified !== undefined) where.isVerified = filters.isVerified;
  if (filters?.isBanned !== undefined) where.isBanned = filters.isBanned;
  if (filters?.isStaff !== undefined) where.isStaff = filters.isStaff;

  if (cursor) {
    where.createdAt = { lt: new Date(cursor) };
  }

  const sortField = (filters?.sortBy ?? "createdAt") as keyof Prisma.UserOrderByWithRelationInput;
  const sortDirection = filters?.sortOrder ?? "desc";

  const users = await prisma.user.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      bannerUrl: true,
      bio: true,
      isVerified: true,
      isStaff: true,
      isSuperuser: true,
      lastSeen: true,
      createdAt: true,
    },
    orderBy: { [sortField]: sortDirection },
    take: limit + 1,
  });

  const hasMore = users.length > limit;
  const data = hasMore ? users.slice(0, limit) : users;

  return {
    data: data as PublicUser[],
    nextCursor: hasMore
      ? data[data.length - 1].createdAt.toISOString()
      : null,
    hasMore,
  };
}

async function updateUser(
  userId: string,
  data: UpdateUserInput & { bio?: string },
  adminId: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<PublicUser> {
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, isSuperuser: true },
  });

  if (!target) {
    throw new NotFoundError("User", userId);
  }

  // Prevent non-superuser from modifying superuser
  if (target.isSuperuser && data.isSuperuser === false) {
    throw new ForbiddenError("Cannot remove superuser status");
  }

  const updateData: Prisma.UserUpdateInput = {};

  if (data.isVerified !== undefined) updateData.isVerified = data.isVerified;
  if (data.isStaff !== undefined) updateData.isStaff = data.isStaff;
  if (data.isSuperuser !== undefined) updateData.isSuperuser = data.isSuperuser;
  if (data.isBanned !== undefined) updateData.isBanned = data.isBanned;
  if (data.banReason !== undefined) updateData.banReason = data.banReason;
  if (data.bio !== undefined) updateData.bio = data.bio;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      bannerUrl: true,
      bio: true,
      isVerified: true,
      isStaff: true,
      isSuperuser: true,
      lastSeen: true,
      createdAt: true,
    },
  });

  await auditService.log({
    userId: adminId,
    action: "admin.update_user",
    targetType: "user",
    targetId: userId,
    details: { changes: Object.keys(updateData) },
    ipAddress,
    userAgent,
  });

  log.info("Admin updated user", {
    adminId,
    targetId: userId,
    changes: Object.keys(updateData),
  });

  return updated as PublicUser;
}

async function banUser(
  userId: string,
  reason: string,
  adminId: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ banned: boolean; reason: string }> {
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, isSuperuser: true },
  });

  if (!target) {
    throw new NotFoundError("User", userId);
  }

  if (target.isSuperuser) {
    throw new ForbiddenError("Cannot ban a superuser");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      isBanned: true,
      banReason: reason,
    },
  });

  await auditService.log({
    userId: adminId,
    action: "admin.ban_user",
    targetType: "user",
    targetId: userId,
    details: { reason },
    ipAddress,
    userAgent,
  });

  log.info("Admin banned user", { adminId, targetId: userId, reason });

  return { banned: true, reason };
}

async function unbanUser(
  userId: string,
  adminId: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ banned: boolean }> {
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!target) {
    throw new NotFoundError("User", userId);
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      isBanned: false,
      banReason: null,
    },
  });

  await auditService.log({
    userId: adminId,
    action: "admin.unban_user",
    targetType: "user",
    targetId: userId,
    ipAddress,
    userAgent,
  });

  log.info("Admin unbanned user", { adminId, targetId: userId });

  return { banned: false };
}

async function deleteUser(
  userId: string,
  adminId: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ deleted: boolean }> {
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, isSuperuser: true },
  });

  if (!target) {
    throw new NotFoundError("User", userId);
  }

  if (target.isSuperuser) {
    throw new ForbiddenError("Cannot delete a superuser");
  }

  // Hard delete with cascade (Prisma handles cascading deletes)
  await prisma.user.delete({
    where: { id: userId },
  });

  await auditService.log({
    userId: adminId,
    action: "admin.delete_user",
    targetType: "user",
    targetId: userId,
    ipAddress,
    userAgent,
  });

  log.info("Admin deleted user", { adminId, targetId: userId });

  return { deleted: true };
}

// ── Reports ───────────────────────────────────────────────────

async function getReports(
  cursor?: string,
  limit: number = 50,
  status?: ReportStatus,
): Promise<PaginatedResult<SafeReport>> {
  const where: Prisma.ReportWhereInput = {};
  if (status) where.status = status;
  if (cursor) where.createdAt = { lt: new Date(cursor) };

  const reports = await prisma.report.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    select: {
      id: true,
      reporterId: true,
      reportedUserId: true,
      targetId: true,
      targetType: true,
      reason: true,
      status: true,
      reviewedBy: true,
      reviewedAt: true,
      createdAt: true,
      reporter: {
        select: { id: true, username: true, avatarUrl: true },
      },
      reportedUser: {
        select: { id: true, username: true, avatarUrl: true },
      },
      reviewer: {
        select: { id: true, username: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = reports.length > limit;
  const data = hasMore ? reports.slice(0, limit) : reports;

  return {
    data: data as unknown as SafeReport[],
    nextCursor: hasMore
      ? data[data.length - 1].createdAt.toISOString()
      : null,
    hasMore,
  };
}

async function reviewReport(
  reportId: string,
  status: ReportStatus,
  adminId: string,
  note?: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<SafeReport> {
  const report = await prisma.report.findUnique({
    where: { id: reportId },
    select: { id: true },
  });

  if (!report) {
    throw new NotFoundError("Report", reportId);
  }

  const updated = await prisma.report.update({
    where: { id: reportId },
    data: {
      status,
      reviewedBy: adminId,
      reviewedAt: new Date(),
    },
    select: {
      id: true,
      reporterId: true,
      reportedUserId: true,
      targetId: true,
      targetType: true,
      reason: true,
      status: true,
      reviewedBy: true,
      reviewedAt: true,
      createdAt: true,
      reporter: {
        select: { id: true, username: true, avatarUrl: true },
      },
      reportedUser: {
        select: { id: true, username: true, avatarUrl: true },
      },
      reviewer: {
        select: { id: true, username: true },
      },
    },
  });

  await auditService.log({
    userId: adminId,
    action: "admin.review_report",
    targetType: "report",
    targetId: reportId,
    details: { status, note },
    ipAddress,
    userAgent,
  });

  log.info("Admin reviewed report", { adminId, reportId, status });

  return updated as unknown as SafeReport;
}

// ── Audit Logs ────────────────────────────────────────────────

async function getAuditLogs(
  cursor?: string,
  limit: number = 50,
  filters?: {
    userId?: string;
    action?: string;
    targetType?: string;
    targetId?: string;
  },
): Promise<PaginatedResult<SafeAuditLog>> {
  return auditService.getAuditLogs(cursor, limit, filters);
}

export const adminService = {
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
