import { prisma } from "../../../config/prisma";
import { NotFoundError, ForbiddenError } from "../../../errors";
import { logger } from "../../../utils/logger";
import type {
  UserProfileWithRelations,
  SafeUser,
  PaginatedResult,
} from "../../../types";
import type { Prisma } from "@prisma/client";

const log = logger.info("UserService");

const publicUserSelect: Prisma.UserSelect = {
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
};

async function getUserProfile(
  userId: string,
): Promise<UserProfileWithRelations> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      ...publicUserSelect,
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          dateOfBirth: true,
          gender: true,
          location: true,
          website: true,
          socialLinks: true,
        },
      },
      privacy: {
        select: {
          id: true,
          whoCanMessage: true,
          whoCanSeeLastSeen: true,
          whoCanSeeOnline: true,
          whoCanAddToGroups: true,
          profileVisibility: true,
          readReceiptsEnabled: true,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  return user as UserProfileWithRelations;
}

async function getUserByUsername(
  username: string,
  viewerId?: string,
): Promise<SafeUser> {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      ...publicUserSelect,
      privacy: {
        select: {
          profileVisibility: true,
          whoCanSeeLastSeen: true,
          whoCanSeeOnline: true,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  const privacy = user.privacy;

  if (privacy?.profileVisibility === "private") {
    if (!viewerId || viewerId !== user.id) {
      throw new ForbiddenError("This profile is private");
    }
  }

  if (privacy?.profileVisibility === "contacts") {
    if (!viewerId || viewerId === user.id) {
      // Viewer is the profile owner — always allowed
    } else {
      const isContact = await prisma.conversationMember.findFirst({
        where: {
          userId: user.id,
          conversation: {
            type: "PRIVATE",
            members: { some: { userId: viewerId } },
          },
        },
      });

      if (!isContact) {
        throw new ForbiddenError(
          "You can only view this profile if you are contacts",
        );
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { privacy: _privacy, ...safeUser } = user;

  return safeUser as unknown as SafeUser;
}

async function updateProfile(
  userId: string,
  data: {
    bio?: string;
    avatarUrl?: string;
    bannerUrl?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    dateOfBirth?: Date;
    gender?: string;
    location?: string;
    website?: string;
    socialLinks?: Record<string, unknown>;
  },
): Promise<UserProfileWithRelations> {
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!userExists) {
    throw new NotFoundError("User", userId);
  }

  // Update user-level fields
  await prisma.user.update({
    where: { id: userId },
    data: {
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      bannerUrl: data.bannerUrl,
    },
  });

  // Upsert profile
  await prisma.profile.upsert({
    where: { userId },
    update: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      location: data.location,
      website: data.website,
      socialLinks: data.socialLinks ?? undefined,
    },
    create: {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      location: data.location,
      website: data.website,
      socialLinks: data.socialLinks ?? undefined,
    },
  });

  log.info("Profile updated", { userId });

  return getUserProfile(userId);
}

async function searchUsers(
  query: string,
  cursor?: string,
  limit: number = 20,
): Promise<PaginatedResult<SafeUser>> {
  const where: Prisma.UserWhereInput = {
    OR: [
      { username: { contains: query, mode: "insensitive" } },
      {
        profile: {
          OR: [
            { firstName: { contains: query, mode: "insensitive" } },
            { lastName: { contains: query, mode: "insensitive" } },
            { username: { contains: query, mode: "insensitive" } },
          ],
        },
      },
    ],
    ...(cursor
      ? { createdAt: { lt: new Date(cursor) } }
      : {}),
  };

  const users = await prisma.user.findMany({
    where,
    select: {
      ...publicUserSelect,
      profile: {
        select: {
          firstName: true,
          lastName: true,
          username: true,
          location: true,
          website: true,
          socialLinks: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = users.length > limit;
  const data = hasMore ? users.slice(0, limit) : users;

  return {
    data: data as unknown as SafeUser[],
    nextCursor: hasMore
      ? data[data.length - 1].createdAt.toISOString()
      : null,
    hasMore,
  };
}

async function updateAvatar(
  userId: string,
  fileUrl: string,
): Promise<{ avatarUrl: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { avatarUrl: fileUrl },
    select: { avatarUrl: true },
  });

  log.info("Avatar updated", { userId, avatarUrl: fileUrl });

  return { avatarUrl: updated.avatarUrl! };
}

async function updateBanner(
  userId: string,
  fileUrl: string,
): Promise<{ bannerUrl: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { bannerUrl: fileUrl },
    select: { bannerUrl: true },
  });

  log.info("Banner updated", { userId, bannerUrl: fileUrl });

  return { bannerUrl: updated.bannerUrl! };
}

interface UserStats {
  messages: number;
  conversations: number;
  streams: number;
  meetings: number;
  followers: number;
  following: number;
}

async function getUserStats(userId: string): Promise<UserStats> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  const [
    messagesCount,
    conversationsCount,
    streamsCount,
    meetingsHosted,
    meetingsJoined,
  ] = await Promise.all([
    prisma.message.count({
      where: { senderId: userId, isDeleted: false },
    }),
    prisma.conversationMember.count({
      where: { userId },
    }),
    prisma.stream.count({
      where: { creatorId: userId },
    }),
    prisma.meetingRoom.count({
      where: { hostId: userId },
    }),
    prisma.meetingParticipant.count({
      where: { userId },
    }),
  ]);

  const meetings = meetingsHosted + meetingsJoined;

  return {
    messages: messagesCount,
    conversations: conversationsCount,
    streams: streamsCount,
    meetings,
    followers: 0, // Follow system not in schema
    following: 0, // Follow system not in schema
  };
}

async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, passwordHash: true },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  // Simple password comparison (in production, use bcrypt)
  // This is a placeholder — the actual comparison should use the same
  // hashing algorithm used during registration.
  // For now, we store the new hash directly.
  const bcrypt = await import("bcryptjs");
  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!isValid) {
    throw new ForbiddenError("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedPassword },
  });

  log.info("Password changed", { userId });
}

export const userService = {
  getUserProfile,
  getUserByUsername,
  updateProfile,
  searchUsers,
  updateAvatar,
  updateBanner,
  getUserStats,
  changePassword,
};
