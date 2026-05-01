import type { Prisma } from "@prisma/client";

import { prisma } from "@server/config/prisma";
import { ForbiddenError, NotFoundError } from "@server/errors";
import { searchUsersDtoSchema, updateUserDtoSchema } from "@server/modules/users/dto/user.dto";

type PublicUser = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  isVerified: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  lastSeen: Date | null;
  createdAt: Date;
};

async function getPrivacy(userId: string) {
  return prisma.privacySetting.findUnique({
    where: { userId },
    select: {
      id: true,
      whoCanMessage: true,
      whoCanSeeLastSeen: true,
      whoCanSeeOnline: true,
      whoCanAddToGroups: true,
      profileVisibility: true,
      readReceiptsEnabled: true,
    },
  });
}

function selectPublicUser() {
  return {
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
  } satisfies Prisma.UserSelect;
}

export async function getOwnUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      ...selectPublicUser(),
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          displayName: true,
          dateOfBirth: true,
          gender: true,
          location: true,
          website: true,
          socialLinks: true,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  const privacy = await getPrivacy(userId);
  return {
    ...user,
    privacy,
  };
}

export async function getPublicUserByUsername(username: string, viewerId?: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      ...selectPublicUser(),
      profile: {
        select: {
          firstName: true,
          lastName: true,
          displayName: true,
          location: true,
          website: true,
          socialLinks: true,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  const privacy = await getPrivacy(user.id);
  if (privacy?.profileVisibility === "private" && viewerId !== user.id) {
    throw new ForbiddenError("This profile is private");
  }

  return {
    ...user,
    lastSeen:
      privacy?.whoCanSeeLastSeen === "nobody" && viewerId !== user.id
        ? null
        : user.lastSeen,
  };
}

export async function updateOwnUserProfile(
  userId: string,
  input: unknown,
) {
  const dto = updateUserDtoSchema.parse(input);
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("User");
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        bio: dto.bio,
        avatarUrl: dto.avatarUrl,
        bannerUrl: dto.bannerUrl,
      },
    });

    await tx.profile.upsert({
      where: { userId },
      update: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        displayName: dto.displayName,
        dateOfBirth: dto.dateOfBirth,
        gender: dto.gender,
        location: dto.location,
        website: dto.website,
        socialLinks: dto.socialLinks as Prisma.InputJsonValue | undefined,
      },
      create: {
        userId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        displayName: dto.displayName,
        dateOfBirth: dto.dateOfBirth,
        gender: dto.gender,
        location: dto.location,
        website: dto.website,
        socialLinks: dto.socialLinks as Prisma.InputJsonValue | undefined,
      },
    });
  });

  return getOwnUserProfile(userId);
}

export async function searchPublicUsers(queryParams: {
  query: string;
  cursor?: string;
  limit?: number;
}) {
  const dto = searchUsersDtoSchema.parse(queryParams);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: dto.query } },
        { email: { contains: dto.query } },
        { bio: { contains: dto.query } },
        {
          profile: {
            is: {
              OR: [
                { firstName: { contains: dto.query } },
                { lastName: { contains: dto.query } },
                { displayName: { contains: dto.query } },
              ],
            },
          },
        },
      ],
      ...(dto.cursor ? { id: { lt: dto.cursor } } : {}),
    },
    select: {
      ...selectPublicUser(),
      profile: {
        select: {
          firstName: true,
          lastName: true,
          displayName: true,
          location: true,
          website: true,
          socialLinks: true,
        },
      },
    },
    orderBy: { id: "desc" },
    take: dto.limit + 1,
  });

  const hasMore = users.length > dto.limit;
  const data = hasMore ? users.slice(0, dto.limit) : users;

  return {
    data,
    nextCursor: hasMore ? data[data.length - 1]?.id ?? null : null,
    hasMore,
  };
}
