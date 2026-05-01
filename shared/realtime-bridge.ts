export const REALTIME_BRIDGE_CHANNEL = "honey:realtime:bridge";

export interface BridgeMessageAttachmentPayload {
  id: string;
  type: string;
  fileName: string;
  fileSize: number;
  thumbnailUrl: string | null;
}

export interface BridgeMessageSenderPayload {
  id: string;
  username: string;
  avatarUrl: string | null;
}

export interface BridgeReactionPayload {
  id: string;
  userId: string;
  username: string;
  emoji: string;
}

export interface BridgeMessagePayload {
  id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  type: string;
  replyToId: string | null;
  isEdited: boolean;
  createdAt: string;
  sender?: BridgeMessageSenderPayload;
  attachments?: BridgeMessageAttachmentPayload[];
}

export interface BridgeNotificationPayload {
  id: string;
  type: string;
  title: string;
  body?: string;
  payload?: Record<string, unknown>;
  createdAt: string;
}

export type RealtimeBridgeEvent =
  | {
      type: "message:new";
      conversationId: string;
      message: BridgeMessagePayload;
    }
  | {
      type: "message:updated";
      conversationId: string;
      message: BridgeMessagePayload;
    }
  | {
      type: "message:deleted";
      conversationId: string;
      messageId: string;
      deletedBy: string;
    }
  | {
      type: "reaction:updated";
      conversationId: string;
      messageId: string;
      reactions: BridgeReactionPayload[];
    }
  | {
      type: "reaction:add";
      conversationId: string;
      messageId: string;
      userId: string;
      emoji: string;
    }
  | {
      type: "reaction:remove";
      conversationId: string;
      messageId: string;
      userId: string;
      emoji: string;
    }
  | {
      type: "message:read";
      conversationId: string;
      userId: string;
      lastReadMessageId: string;
    }
  | {
      type: "notification:new";
      userId: string;
      notification: BridgeNotificationPayload;
    };
