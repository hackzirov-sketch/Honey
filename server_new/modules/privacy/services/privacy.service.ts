import { prisma } from "../../../config/prisma";
import { NotFoundError } from "../../../errors";
import { logger } from "../../../utils/logger";
import type { SafePrivacySetting } from "../../../types";
import type { UpdatePrivacyDto } from "../dto/privacy.dto";

const log = logger.info("PrivacyService");

async function getPrivacySettings(userId: string): Promise<SafePrivacySetting> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  let settings = await prisma.privacySetting.findUnique({
    where: { userId },
  });

  if (!settings) {
    settings = await prisma.privacySetting.create({
      data: { userId },
    });
  }

  return {
    id: settings.id,
    whoCanMessage: settings.whoCanMessage,
    whoCanSeeLastSeen: settings.whoCanSeeLastSeen,
    whoCanSeeOnline: settings.whoCanSeeOnline,
    whoCanAddToGroups: settings.whoCanAddToGroups,
    profileVisibility: settings.profileVisibility,
    readReceiptsEnabled: settings.readReceiptsEnabled,
    createdAt: settings.createdAt,
    updatedAt: settings.updatedAt,
  };
}

async function updatePrivacySettings(
  userId: string,
  data: UpdatePrivacyDto,
): Promise<SafePrivacySetting> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("User", userId);
  }

  const updateData: {
    whoCanMessage?: string;
    whoCanSeeLastSeen?: string;
    whoCanSeeOnline?: string;
    whoCanAddToGroups?: string;
    profileVisibility?: string;
    readReceiptsEnabled?: boolean;
  } = {};

  if (data.whoCanMessage !== undefined) updateData.whoCanMessage = data.whoCanMessage;
  if (data.whoCanSeeLastSeen !== undefined) updateData.whoCanSeeLastSeen = data.whoCanSeeLastSeen;
  if (data.whoCanSeeOnline !== undefined) updateData.whoCanSeeOnline = data.whoCanSeeOnline;
  if (data.whoCanAddToGroups !== undefined) updateData.whoCanAddToGroups = data.whoCanAddToGroups;
  if (data.profileVisibility !== undefined) updateData.profileVisibility = data.profileVisibility;
  if (data.readReceiptsEnabled !== undefined) updateData.readReceiptsEnabled = data.readReceiptsEnabled;

  const settings = await prisma.privacySetting.upsert({
    where: { userId },
    update: updateData,
    create: {
      userId,
      ...updateData,
    },
  });

  log.info("Privacy settings updated", { userId, changes: Object.keys(updateData) });

  return {
    id: settings.id,
    whoCanMessage: settings.whoCanMessage,
    whoCanSeeLastSeen: settings.whoCanSeeLastSeen,
    whoCanSeeOnline: settings.whoCanSeeOnline,
    whoCanAddToGroups: settings.whoCanAddToGroups,
    profileVisibility: settings.profileVisibility,
    readReceiptsEnabled: settings.readReceiptsEnabled,
    createdAt: settings.createdAt,
    updatedAt: settings.updatedAt,
  };
}

async function canSendMessage(senderId: string, targetId: string): Promise<boolean> {
  if (senderId === targetId) return true;

  const settings = await prisma.privacySetting.findUnique({
    where: { userId: targetId },
  });

  if (!settings) return true; // Default: everyone can message

  if (settings.whoCanMessage === "everyone") return true;
  if (settings.whoCanMessage === "nobody") return false;

  // "contacts" — check if they share a conversation
  if (settings.whoCanMessage === "contacts") {
    const sharedConversation = await prisma.conversationMember.findFirst({
      where: {
        userId: targetId,
        conversation: {
          type: "PRIVATE",
          members: { some: { userId: senderId } },
        },
      },
    });
    return !!sharedConversation;
  }

  return true;
}

async function canViewProfile(
  viewerId: string | undefined,
  targetId: string,
): Promise<boolean> {
  if (!viewerId) {
    // Non-authenticated users can only see public profiles
    const settings = await prisma.privacySetting.findUnique({
      where: { userId: targetId },
    });
    return settings?.profileVisibility === "public" ?? true;
  }

  if (viewerId === targetId) return true;

  const settings = await prisma.privacySetting.findUnique({
    where: { userId: targetId },
  });

  if (!settings) return true; // Default: public

  if (settings.profileVisibility === "public") return true;
  if (settings.profileVisibility === "private") return false;

  // "contacts"
  if (settings.profileVisibility === "contacts") {
    const sharedConversation = await prisma.conversationMember.findFirst({
      where: {
        userId: targetId,
        conversation: {
          type: "PRIVATE",
          members: { some: { userId: viewerId } },
        },
      },
    });
    return !!sharedConversation;
  }

  return true;
}

async function canSeeLastSeen(
  viewerId: string,
  targetId: string,
): Promise<boolean> {
  if (viewerId === targetId) return true;

  const settings = await prisma.privacySetting.findUnique({
    where: { userId: targetId },
  });

  if (!settings) return true;

  if (settings.whoCanSeeLastSeen === "everyone") return true;
  if (settings.whoCanSeeLastSeen === "nobody") return false;

  // "contacts"
  if (settings.whoCanSeeLastSeen === "contacts") {
    const sharedConversation = await prisma.conversationMember.findFirst({
      where: {
        userId: targetId,
        conversation: {
          type: "PRIVATE",
          members: { some: { userId: viewerId } },
        },
      },
    });
    return !!sharedConversation;
  }

  return true;
}

async function canSeeOnline(
  viewerId: string,
  targetId: string,
): Promise<boolean> {
  if (viewerId === targetId) return true;

  const settings = await prisma.privacySetting.findUnique({
    where: { userId: targetId },
  });

  if (!settings) return true;

  if (settings.whoCanSeeOnline === "everyone") return true;
  if (settings.whoCanSeeOnline === "nobody") return false;

  // "contacts"
  if (settings.whoCanSeeOnline === "contacts") {
    const sharedConversation = await prisma.conversationMember.findFirst({
      where: {
        userId: targetId,
        conversation: {
          type: "PRIVATE",
          members: { some: { userId: viewerId } },
        },
      },
    });
    return !!sharedConversation;
  }

  return true;
}

async function canAddToGroup(
  adderId: string,
  targetId: string,
): Promise<boolean> {
  if (adderId === targetId) return false;

  const settings = await prisma.privacySetting.findUnique({
    where: { userId: targetId },
  });

  if (!settings) return true;

  if (settings.whoCanAddToGroups === "everyone") return true;
  if (settings.whoCanAddToGroups === "nobody") return false;

  // "contacts"
  if (settings.whoCanAddToGroups === "contacts") {
    const sharedConversation = await prisma.conversationMember.findFirst({
      where: {
        userId: targetId,
        conversation: {
          type: "PRIVATE",
          members: { some: { userId: adderId } },
        },
      },
    });
    return !!sharedConversation;
  }

  return true;
}

export const privacyService = {
  getPrivacySettings,
  updatePrivacySettings,
  canSendMessage,
  canViewProfile,
  canSeeLastSeen,
  canSeeOnline,
  canAddToGroup,
};
