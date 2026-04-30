/**
 * Redis-compatible in-memory store.
 * Falls back to this when Redis is not available.
 * Supports basic get/set/del/expire/incr/decr operations.
 * NOT suitable for production multi-instance deployments.
 */

// Simple in-memory store with TTL support
interface StoreEntry {
  value: string;
  expiresAt: number | null; // Unix ms timestamp, null = no expiry
}

const store = new Map<string, StoreEntry>();

function cleanExpired(): void {
  const now = Date.now();
  for (const [k, entry] of store) {
    if (entry.expiresAt !== null && entry.expiresAt < now) {
      store.delete(k);
    }
  }
}

// Run cleanup every 60 seconds
setInterval(cleanExpired, 60_000);

export const redis = {
  _store: store,

  async connect(): Promise<void> {
    console.log('[MemoryStore] Connected (in-memory mode — no Redis)');
  },

  async get(key: string): Promise<string | null> {
    const entry = store.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== null && entry.expiresAt < Date.now()) {
      store.delete(key);
      return null;
    }
    return entry.value;
  },

  async set(key: string, value: string, ...args: unknown[]): Promise<'OK' | null> {
    let expiresAt: number | null = null;
    // Handle EX (seconds) and PX (milliseconds) arguments
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg === 'EX' && typeof args[i + 1] === 'number') {
        expiresAt = Date.now() + (args[i + 1] as number) * 1000;
      } else if (arg === 'PX' && typeof args[i + 1] === 'number') {
        expiresAt = Date.now() + (args[i + 1] as number);
      }
    }
    store.set(key, { value, expiresAt });
    return 'OK';
  },

  async del(...keys: string[]): Promise<number> {
    let count = 0;
    for (const k of keys) {
      if (store.delete(k)) count++;
    }
    return count;
  },

  async exists(key: string): Promise<number> {
    const entry = store.get(key);
    if (!entry) return 0;
    if (entry.expiresAt !== null && entry.expiresAt < Date.now()) {
      store.delete(key);
      return 0;
    }
    return 1;
  },

  async incr(key: string): Promise<number> {
    const entry = store.get(key);
    let current = entry ? parseInt(entry.value, 10) : 0;
    if (isNaN(current)) current = 0;
    const newVal = current + 1;
    store.set(key, { value: String(newVal), expiresAt: entry?.expiresAt });
    return newVal;
  },

  async decr(key: string): Promise<number> {
    const entry = store.get(key);
    let current = entry ? parseInt(entry.value, 10) : 0;
    if (isNaN(current)) current = 0;
    const newVal = Math.max(0, current - 1);
    store.set(key, { value: String(newVal), expiresAt: entry?.expiresAt });
    return newVal;
  },

  async keys(pattern: string): Promise<string[]> {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
    const result: string[] = [];
    for (const k of store.keys()) {
      if (regex.test(k)) {
        const entry = store.get(k)!;
        if (entry.expiresAt !== null && entry.expiresAt < Date.now()) continue;
        result.push(k);
      }
    }
    return result;
  },

  async expire(key: string, seconds: number): Promise<number> {
    const entry = store.get(key);
    if (!entry) return 0;
    entry.expiresAt = Date.now() + seconds * 1000;
    return 1;
  },

  async ttl(key: string): Promise<number> {
    const entry = store.get(key);
    if (!entry) return -2;
    if (entry.expiresAt === null) return -1;
    const remaining = Math.floor((entry.expiresAt - Date.now()) / 1000);
    return remaining > 0 ? remaining : -2;
  },

  async ping(): Promise<string> {
    return 'PONG';
  },

  async quit(): Promise<'OK'> {
    store.clear();
    return 'OK';
  },

  async disconnect(): Promise<void> {
    store.clear();
  },

  // For Socket.IO adapter compatibility
  duplicate() {
    return redis;
  },

  // Event stubs
  on(event: string, _cb: (...args: unknown[]) => void): void {
    // no-op for in-memory
  },

  once(event: string, _cb: (...args: unknown[]) => void): void {
    // no-op
  },
};

/**
 * Build a namespaced key.
 * @example key('session', userId) → "honey:session:<userId>"
 */
const REDIS_PREFIX = process.env.REDIS_PREFIX ?? 'honey:';

export function nsKey(prefix: string, ...parts: string[]): string {
  return [REDIS_PREFIX, prefix, ...parts].join(':');
}

export { key };

function key(prefix: string, ...parts: string[]): string {
  return nsKey(prefix, ...parts);
}
