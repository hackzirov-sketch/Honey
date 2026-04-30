import { prisma } from "../../../config/prisma";
import { logger } from "../../../utils/logger";
import type { SafeAuditLog, PaginatedResult } from "../../../types";

const log = logger.info("AuditService");

interface LogParams {
  userId?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

async function logAction(params: LogParams): Promise<SafeAuditLog> {
  const entry = await prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      targetType: params.targetType,
      targetId: params.targetId,
      details: params.details ?? undefined,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    },
  });

  log.info("Audit log created", {
    id: entry.id,
    action: entry.action,
    targetType: entry.targetType,
    targetId: entry.targetId,
    userId: entry.userId,
  });

  return {
    id: entry.id,
    userId: entry.userId,
    action: entry.action,
    targetType: entry.targetType,
    targetId: entry.targetId,
    details: entry.details as Record<string, unknown> | null,
    ipAddress: entry.ipAddress,
    userAgent: entry.userAgent,
    createdAt: entry.createdAt,
  };
}

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
  const where: {
    action?: string;
    userId?: string;
    targetType?: string;
    targetId?: string;
    createdAt?: { lt: Date };
  } = {};

  if (filters?.userId) where.userId = filters.userId;
  if (filters?.action) where.action = filters.action;
  if (filters?.targetType) where.targetType = filters.targetType;
  if (filters?.targetId) where.targetId = filters.targetId;
  if (cursor) where.createdAt = { lt: new Date(cursor) };

  const logs = await prisma.auditLog.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = logs.length > limit;
  const data = hasMore ? logs.slice(0, limit) : logs;

  return {
    data: data.map((l) => ({
      id: l.id,
      userId: l.userId,
      action: l.action,
      targetType: l.targetType,
      targetId: l.targetId,
      details: l.details as Record<string, unknown> | null,
      ipAddress: l.ipAddress,
      userAgent: l.userAgent,
      createdAt: l.createdAt,
    })),
    nextCursor: hasMore
      ? data[data.length - 1].createdAt.toISOString()
      : null,
    hasMore,
  };
}

async function getAuditLogById(logId: string): Promise<SafeAuditLog> {
  const entry = await prisma.auditLog.findUnique({
    where: { id: logId },
  });

  if (!entry) {
    const { NotFoundError } = await import("../../../errors");
    throw new NotFoundError("AuditLog", logId);
  }

  return {
    id: entry.id,
    userId: entry.userId,
    action: entry.action,
    targetType: entry.targetType,
    targetId: entry.targetId,
    details: entry.details as Record<string, unknown> | null,
    ipAddress: entry.ipAddress,
    userAgent: entry.userAgent,
    createdAt: entry.createdAt,
  };
}

export const auditService = {
  log: logAction,
  getAuditLogs,
  getAuditLogById,
};
