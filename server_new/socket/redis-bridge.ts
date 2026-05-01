import Redis from "ioredis";

import { config } from "../config";
import { logger } from "../utils/logger";
import type { HoneyIOServer } from "./types";
import {
  REALTIME_BRIDGE_CHANNEL,
  type RealtimeBridgeEvent,
} from "../../shared/realtime-bridge";

let bridgeSubscriber: Redis | null = null;

function conversationRoom(conversationId: string) {
  return `conversation:${conversationId}`;
}

function userRoom(userId: string) {
  return `user:${userId}`;
}

function getBridgeSubscriber() {
  if (!config.REDIS_URL) {
    return null;
  }

  if (!bridgeSubscriber) {
    bridgeSubscriber = new Redis(config.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
    });
    bridgeSubscriber.on("error", (error) => {
      logger.warn("socket:bridge redis error", {
        error: error.message,
      });
    });
  }

  return bridgeSubscriber;
}

function handleBridgeEvent(io: HoneyIOServer, event: RealtimeBridgeEvent) {
  switch (event.type) {
    case "message:new":
      io.to(conversationRoom(event.conversationId)).emit("message:new", event.message);
      io.to(conversationRoom(event.conversationId)).emit("message:delivered", {
        conversationId: event.conversationId,
        messageId: event.message.id,
        deliveredAt: new Date().toISOString(),
      });
      break;
    case "message:updated":
      io.to(conversationRoom(event.conversationId)).emit("message:updated", event.message);
      io.to(conversationRoom(event.conversationId)).emit("message:edit", event.message);
      break;
    case "message:deleted":
      io.to(conversationRoom(event.conversationId)).emit("message:deleted", {
        messageId: event.messageId,
        conversationId: event.conversationId,
        deletedBy: event.deletedBy,
      });
      io.to(conversationRoom(event.conversationId)).emit("message:delete", {
        messageId: event.messageId,
        conversationId: event.conversationId,
        deletedBy: event.deletedBy,
      });
      break;
    case "reaction:add":
      io.to(conversationRoom(event.conversationId)).emit("reaction:add", {
        messageId: event.messageId,
        userId: event.userId,
        emoji: event.emoji,
      });
      break;
    case "reaction:remove":
      io.to(conversationRoom(event.conversationId)).emit("reaction:remove", {
        messageId: event.messageId,
        userId: event.userId,
        emoji: event.emoji,
      });
      break;
    case "reaction:updated":
      io.to(conversationRoom(event.conversationId)).emit("reaction:updated", {
        messageId: event.messageId,
        reactions: event.reactions,
      });
      break;
    case "message:read":
      io.to(conversationRoom(event.conversationId)).emit("message:read", {
        conversationId: event.conversationId,
        userId: event.userId,
        lastReadMessageId: event.lastReadMessageId,
      });
      break;
    case "notification:new":
      io.to(userRoom(event.userId)).emit("notification:new", event.notification);
      break;
    default:
      break;
  }
}

export async function setupRedisBridge(io: HoneyIOServer) {
  const subscriber = getBridgeSubscriber();
  if (!subscriber) {
    logger.warn("socket:bridge disabled, REDIS_URL missing");
    return;
  }

  try {
    if (subscriber.status === "wait") {
      await subscriber.connect();
    }
    await subscriber.subscribe(REALTIME_BRIDGE_CHANNEL);
    subscriber.on("message", (channel, rawMessage) => {
      if (channel !== REALTIME_BRIDGE_CHANNEL) {
        return;
      }

      try {
        const event = JSON.parse(rawMessage) as RealtimeBridgeEvent;
        handleBridgeEvent(io, event);
      } catch (error) {
        logger.warn("socket:bridge invalid payload", {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    });
    logger.info("socket:bridge subscribed", {
      channel: REALTIME_BRIDGE_CHANNEL,
    });
  } catch (error) {
    logger.warn("socket:bridge unavailable", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
