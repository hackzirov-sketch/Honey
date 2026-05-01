import Redis from "ioredis";

import { REALTIME_BRIDGE_CHANNEL, type RealtimeBridgeEvent } from "../../../shared/realtime-bridge";

let redisPublisher: Redis | null = null;

function getRedisPublisher(): Redis | null {
  const redisUrl = process.env.REDIS_URL ?? "";
  if (!redisUrl) {
    return null;
  }

  if (!redisPublisher) {
    redisPublisher = new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
    });
    redisPublisher.on("error", (error) => {
      console.warn("[realtime-publisher] redis error:", error.message);
    });
  }

  return redisPublisher;
}

export async function publishRealtimeEvent(event: RealtimeBridgeEvent): Promise<void> {
  const publisher = getRedisPublisher();
  if (!publisher) {
    return;
  }

  try {
    if (publisher.status !== "ready" && publisher.status !== "connecting") {
      await publisher.connect();
    } else if (publisher.status === "wait") {
      await publisher.connect();
    }
    await publisher.publish(REALTIME_BRIDGE_CHANNEL, JSON.stringify(event));
  } catch (error) {
    console.warn(
      "[realtime-publisher] publish failed:",
      error instanceof Error ? error.message : String(error),
    );
  }
}
