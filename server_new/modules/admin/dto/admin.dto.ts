import { z } from "zod";

export const adminGetUsersQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.number().int().min(1).max(100).default(50),
  search: z.string().optional(),
  isVerified: z.enum(["true", "false"]).optional().transform((v) => v === "true"),
  isBanned: z.enum(["true", "false"]).optional().transform((v) => v === "true"),
  isStaff: z.enum(["true", "false"]).optional().transform((v) => v === "true"),
  sortBy: z.enum(["createdAt", "username", "lastSeen"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type AdminGetUsersQuery = z.infer<typeof adminGetUsersQuerySchema>;

export const adminUpdateUserSchema = z.object({
  isVerified: z.boolean().optional(),
  isStaff: z.boolean().optional(),
  isSuperuser: z.boolean().optional(),
  isBanned: z.boolean().optional(),
  banReason: z.string().max(500).optional(),
  bio: z.string().max(500).optional(),
});

export type AdminUpdateUserDto = z.infer<typeof adminUpdateUserSchema>;

export const adminBanUserSchema = z.object({
  reason: z.string().min(1).max(500),
});

export type AdminBanUserDto = z.infer<typeof adminBanUserSchema>;

export const adminReviewReportSchema = z.object({
  status: z.enum(["REVIEWING", "RESOLVED", "DISMISSED"]),
  note: z.string().max(1000).optional(),
});

export type AdminReviewReportDto = z.infer<typeof adminReviewReportSchema>;

export const adminGetReportsQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.number().int().min(1).max(100).default(50),
  status: z.enum(["PENDING", "REVIEWING", "RESOLVED", "DISMISSED"]).optional(),
});

export type AdminGetReportsQuery = z.infer<typeof adminGetReportsQuerySchema>;

export const adminGetAuditLogsQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.number().int().min(1).max(100).default(50),
  userId: z.string().uuid().optional(),
  action: z.string().optional(),
  targetType: z.string().optional(),
  targetId: z.string().optional(),
});

export type AdminGetAuditLogsQuery = z.infer<typeof adminGetAuditLogsQuerySchema>;
