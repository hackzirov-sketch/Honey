import type { Request } from "express";
import type { User, Notification, FileMetadata, AuditLog, PrivacySetting, Report } from "@prisma/client";

// ── Auth ───────────────────────────────────────────────────────
export interface JwtPayload {
  userId: string;
  username: string;
  jti?: string;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// ── Pagination ─────────────────────────────────────────────────
export interface CursorResult<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CursorPagination {
  cursor?: string;
  limit?: number;
}

// ── User ───────────────────────────────────────────────────────
export type PublicUser = Pick<
  User,
  "id" | "username" | "email" | "avatarUrl" | "bannerUrl" | "bio" | "isVerified" | "isStaff" | "isSuperuser" | "lastSeen" | "createdAt"
>;

export type UserProfileWithRelations = PublicUser & {
  profile: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    location: string | null;
    website: string | null;
    socialLinks: Record<string, unknown> | null;
  } | null;
  privacy: {
    id: string;
    whoCanMessage: string;
    whoCanSeeLastSeen: string;
    whoCanSeeOnline: string;
    whoCanAddToGroups: string;
    profileVisibility: string;
    readReceiptsEnabled: boolean;
  } | null;
};

export type SafeUser = PublicUser & {
  profile: {
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    location: string | null;
    website: string | null;
    socialLinks: Record<string, unknown> | null;
  } | null;
};

// ── Notification ───────────────────────────────────────────────
export type SafeNotification = Pick<
  Notification,
  "id" | "type" | "title" | "body" | "payload" | "isRead" | "readAt" | "createdAt"
> & {
  sender: {
    id: string;
    username: string;
    avatarUrl: string | null;
  } | null;
};

// ── File ───────────────────────────────────────────────────────
export type SafeFile = Pick<
  FileMetadata,
  "id" | "originalName" | "storedName" | "mimeType" | "fileSize" | "storagePath" | "thumbnailPath" | "width" | "height" | "duration" | "createdAt"
>;

// ── Audit ──────────────────────────────────────────────────────
export type SafeAuditLog = Pick<
  AuditLog,
  "id" | "userId" | "action" | "targetType" | "targetId" | "details" | "ipAddress" | "userAgent" | "createdAt"
>;

// ── Privacy ────────────────────────────────────────────────────
export type PrivacyVisibility = "everyone" | "contacts" | "nobody";
export type ProfileVisibility = "public" | "contacts" | "private";

export type SafePrivacySetting = Pick<
  PrivacySetting,
  "id" | "whoCanMessage" | "whoCanSeeLastSeen" | "whoCanSeeOnline" | "whoCanAddToGroups" | "profileVisibility" | "readReceiptsEnabled" | "createdAt" | "updatedAt"
>;

// ── Admin ──────────────────────────────────────────────────────
export type DashboardStats = {
  totalUsers: number;
  verifiedUsers: number;
  bannedUsers: number;
  totalMessages: number;
  totalStreams: number;
  totalMeetings: number;
  totalReports: number;
  pendingReports: number;
};

export type SafeReport = Pick<
  Report,
  "id" | "reporterId" | "reportedUserId" | "targetId" | "targetType" | "reason" | "status" | "reviewedBy" | "reviewedAt" | "createdAt"
> & {
  reporter: { id: string; username: string; avatarUrl: string | null };
  reportedUser: { id: string; username: string; avatarUrl: string | null };
  reviewer: { id: string; username: string } | null;
};

// ── Conversations & Messaging ──────────────────────────────────
export type ConversationType = 'PRIVATE' | 'GROUP' | 'CHANNEL';
export type MemberRole = 'OWNER' | 'ADMIN' | 'MEMBER';
export type MessageType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FILE' | 'VOICE' | 'LOCATION';

// ── Misc ───────────────────────────────────────────────────────
export type FileUploadCategory = "avatar" | "banner" | "message" | "video" | "voice" | "document";

export type NotificationType =
  | "message"
  | "reaction"
  | "follow"
  | "mention"
  | "group_invite"
  | "stream_start"
  | "meeting_invite"
  | "report_resolved"
  | "system";

export type ReportStatus = "PENDING" | "REVIEWING" | "RESOLVED" | "DISMISSED";

export type CreateNotificationInput = {
  recipientId: string;
  senderId?: string;
  type: NotificationType;
  title: string;
  body?: string;
  payload?: Record<string, unknown>;
};

export type UpdateUserInput = {
  isVerified?: boolean;
  isStaff?: boolean;
  isSuperuser?: boolean;
  isBanned?: boolean;
  banReason?: string;
};

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
