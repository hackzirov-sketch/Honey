import Redis, { type Redis as RedisClient } from 'ioredis';
import { config } from './index';

interface StoreEntry {
  value: string;
  expiresAt: number | null;
}

interface RedisPipelineCompat {
  zremrangebyscore(key: string, min: number, max: number): RedisPipelineCompat;
  zadd(key: string, score: number, member: string): RedisPipelineCompat;
  zcard(key: string): RedisPipelineCompat;
  pexpire(key: string, ms: number): RedisPipelineCompat;
  exec(): Promise<Array<[Error | null, number]>>;
}

function createNoopPipeline(): RedisPipelineCompat {
  return {
    zremrangebyscore() {
      return this;
    },
    zadd() {
      return this;
    },
    zcard() {
      return this;
    },
    pexpire() {
      return this;
    },
    async exec() {
      return [[null, 0]];
    },
  };
}

interface RedisCompat {
  kind: 'memory' | 'redis';
  connect(): Promise<void>;
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ...args: unknown[]): Promise<'OK' | null>;
  del(...keys: string[]): Promise<number>;
  exists(key: string): Promise<number>;
  incr(key: string): Promise<number>;
  decr(key: string): Promise<number>;
  keys(pattern: string): Promise<string[]>;
  expire(key: string, seconds: number): Promise<number>;
  ttl(key: string): Promise<number>;
  ping(): Promise<string>;
  quit(): Promise<'OK'>;
  disconnect(): Promise<void>;
  duplicate(): RedisCompat;
  pipeline?(): RedisPipelineCompat;
  sadd?(key: string, ...members: string[]): Promise<number>;
  smembers?(key: string): Promise<string[]>;
  on(event: string, cb: (...args: unknown[]) => void): void;
  once(event: string, cb: (...args: unknown[]) => void): void;
}

const memoryKvStore = new Map<string, StoreEntry>();
const memorySetStore = new Map<string, Set<string>>();

function cleanupExpired(): void {
  const now = Date.now();
  for (const [entryKey, entry] of memoryKvStore.entries()) {
    if (entry.expiresAt !== null && entry.expiresAt < now) {
      memoryKvStore.delete(entryKey);
    }
  }
}

const cleanupInterval = setInterval(cleanupExpired, 60_000);
cleanupInterval.unref();

class MemoryRedisClient implements RedisCompat {
  kind: 'memory' = 'memory';

  constructor(private readonly rejectConnect: boolean = false) {}

  async connect(): Promise<void> {
    if (this.rejectConnect) {
      throw new Error('In-memory Redis fallback does not support pub/sub adapter');
    }
    console.warn('[Redis] Using in-memory fallback store');
  }

  async get(key: string): Promise<string | null> {
    const entry = memoryKvStore.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== null && entry.expiresAt < Date.now()) {
      memoryKvStore.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ...args: unknown[]): Promise<'OK' | null> {
    let expiresAt: number | null = null;
    for (let index = 0; index < args.length; index++) {
      const token = args[index];
      const next = args[index + 1];
      if (token === 'EX' && typeof next === 'number') {
        expiresAt = Date.now() + next * 1000;
      } else if (token === 'PX' && typeof next === 'number') {
        expiresAt = Date.now() + next;
      }
    }
    memoryKvStore.set(key, { value, expiresAt });
    return 'OK';
  }

  async del(...keys: string[]): Promise<number> {
    let deleted = 0;
    for (const singleKey of keys) {
      if (memoryKvStore.delete(singleKey)) deleted++;
      memorySetStore.delete(singleKey);
    }
    return deleted;
  }

  async exists(key: string): Promise<number> {
    const value = await this.get(key);
    return value === null ? 0 : 1;
  }

  async incr(key: string): Promise<number> {
    const current = parseInt((await this.get(key)) ?? '0', 10);
    const nextValue = Number.isNaN(current) ? 1 : current + 1;
    const currentEntry = memoryKvStore.get(key);
    memoryKvStore.set(key, {
      value: String(nextValue),
      expiresAt: currentEntry?.expiresAt ?? null,
    });
    return nextValue;
  }

  async decr(key: string): Promise<number> {
    const current = parseInt((await this.get(key)) ?? '0', 10);
    const nextValue = Math.max(0, Number.isNaN(current) ? 0 : current - 1);
    const currentEntry = memoryKvStore.get(key);
    memoryKvStore.set(key, {
      value: String(nextValue),
      expiresAt: currentEntry?.expiresAt ?? null,
    });
    return nextValue;
  }

  async keys(pattern: string): Promise<string[]> {
    const regex = new RegExp(`^${pattern.replace(/\*/g, '.*').replace(/\?/g, '.')}$`);
    const result: string[] = [];
    for (const candidate of memoryKvStore.keys()) {
      if (!regex.test(candidate)) continue;
      const value = await this.get(candidate);
      if (value !== null) result.push(candidate);
    }
    return result;
  }

  async expire(key: string, seconds: number): Promise<number> {
    const entry = memoryKvStore.get(key);
    if (!entry) return 0;
    entry.expiresAt = Date.now() + seconds * 1000;
    return 1;
  }

  async ttl(key: string): Promise<number> {
    const entry = memoryKvStore.get(key);
    if (!entry) return -2;
    if (entry.expiresAt === null) return -1;
    const remaining = Math.floor((entry.expiresAt - Date.now()) / 1000);
    return remaining >= 0 ? remaining : -2;
  }

  async ping(): Promise<string> {
    return 'PONG';
  }

  async quit(): Promise<'OK'> {
    memoryKvStore.clear();
    memorySetStore.clear();
    return 'OK';
  }

  async disconnect(): Promise<void> {
    memoryKvStore.clear();
    memorySetStore.clear();
  }

  duplicate(): RedisCompat {
    return new MemoryRedisClient(true);
  }

  async sadd(key: string, ...members: string[]): Promise<number> {
    const existing = memorySetStore.get(key) ?? new Set<string>();
    const before = existing.size;
    for (const member of members) {
      existing.add(member);
    }
    memorySetStore.set(key, existing);
    return existing.size - before;
  }

  async smembers(key: string): Promise<string[]> {
    return Array.from(memorySetStore.get(key) ?? []);
  }

  on(_event: string, _cb: (...args: unknown[]) => void): void {}

  once(_event: string, _cb: (...args: unknown[]) => void): void {}
}

class RealRedisCompat implements RedisCompat {
  kind: 'redis' = 'redis';

  constructor(private readonly client: RedisClient) {}

  async connect(): Promise<void> {
    if (this.client.status !== 'ready') {
      await this.client.connect();
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ...args: unknown[]): Promise<'OK' | null> {
    if (args.length === 0) {
      return this.client.set(key, value);
    }

    const mode = typeof args[0] === 'string' ? args[0].toUpperCase() : '';
    const ttl = Number(args[1]);

    if ((mode === 'EX' || mode === 'PX') && Number.isFinite(ttl)) {
      const reply = await this.client.call('SET', key, value, mode, String(ttl));
      return typeof reply === 'string' ? (reply as 'OK') : 'OK';
    }

    return this.client.set(key, value);
  }

  async del(...keys: string[]): Promise<number> {
    return this.client.del(...keys);
  }

  async exists(key: string): Promise<number> {
    return this.client.exists(key);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async decr(key: string): Promise<number> {
    return this.client.decr(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern);
  }

  async expire(key: string, seconds: number): Promise<number> {
    return this.client.expire(key, seconds);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async ping(): Promise<string> {
    return this.client.ping();
  }

  async quit(): Promise<'OK'> {
    return this.client.quit();
  }

  async disconnect(): Promise<void> {
    this.client.disconnect();
  }

  duplicate(): RedisCompat {
    return new RealRedisCompat(this.client.duplicate({ lazyConnect: true }));
  }

  pipeline(): RedisPipelineCompat {
    return this.client.pipeline() as unknown as RedisPipelineCompat;
  }

  async sadd(key: string, ...members: string[]): Promise<number> {
    return this.client.sadd(key, ...members);
  }

  async smembers(key: string): Promise<string[]> {
    return this.client.smembers(key);
  }

  on(event: string, cb: (...args: unknown[]) => void): void {
    this.client.on(event, cb as (...args: any[]) => void);
  }

  once(event: string, cb: (...args: unknown[]) => void): void {
    this.client.once(event, cb as (...args: any[]) => void);
  }
}

let activeClient: RedisCompat = new MemoryRedisClient();

export const redis: RedisCompat = {
  get kind() {
    return activeClient.kind;
  },

  async connect(): Promise<void> {
    if (activeClient.kind === 'redis') return;

    const client = new Redis(config.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
      enableOfflineQueue: true,
    });
    client.on('error', (error) => {
      const raw = error instanceof Error ? error.message : String(error);
      const message = raw && raw.trim().length > 0 ? raw : 'connection failure';
      console.log(`[Redis] Runtime error: ${message}`);
    });

    try {
      await client.connect();
      activeClient = new RealRedisCompat(client);
      console.log(`[Redis] Connected to ${config.REDIS_URL}`);
    } catch (error) {
      client.disconnect();
      activeClient = new MemoryRedisClient();
      throw error;
    }
  },

  async get(key: string): Promise<string | null> {
    return activeClient.get(key);
  },

  async set(key: string, value: string, ...args: unknown[]): Promise<'OK' | null> {
    return activeClient.set(key, value, ...args);
  },

  async del(...keys: string[]): Promise<number> {
    return activeClient.del(...keys);
  },

  async exists(key: string): Promise<number> {
    return activeClient.exists(key);
  },

  async incr(key: string): Promise<number> {
    return activeClient.incr(key);
  },

  async decr(key: string): Promise<number> {
    return activeClient.decr(key);
  },

  async keys(pattern: string): Promise<string[]> {
    return activeClient.keys(pattern);
  },

  async expire(key: string, seconds: number): Promise<number> {
    return activeClient.expire(key, seconds);
  },

  async ttl(key: string): Promise<number> {
    return activeClient.ttl(key);
  },

  async ping(): Promise<string> {
    return activeClient.ping();
  },

  async quit(): Promise<'OK'> {
    return activeClient.quit();
  },

  async disconnect(): Promise<void> {
    return activeClient.disconnect();
  },

  duplicate(): RedisCompat {
    return activeClient.duplicate();
  },

  pipeline(): RedisPipelineCompat {
    return activeClient.pipeline ? activeClient.pipeline() : createNoopPipeline();
  },

  async sadd(key: string, ...members: string[]): Promise<number> {
    if (activeClient.sadd) {
      return activeClient.sadd(key, ...members);
    }
    return 0;
  },

  async smembers(key: string): Promise<string[]> {
    if (activeClient.smembers) {
      return activeClient.smembers(key);
    }
    return [];
  },

  on(event: string, cb: (...args: unknown[]) => void): void {
    activeClient.on(event, cb);
  },

  once(event: string, cb: (...args: unknown[]) => void): void {
    activeClient.once(event, cb);
  },
};

const REDIS_PREFIX = process.env.REDIS_PREFIX ?? 'honey';

export function nsKey(prefix: string, ...parts: string[]): string {
  return [REDIS_PREFIX, prefix, ...parts].join(':');
}

export { key };

function key(prefix: string, ...parts: string[]): string {
  return nsKey(prefix, ...parts);
}
