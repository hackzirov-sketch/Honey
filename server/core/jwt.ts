import jwt from "jsonwebtoken";
import { createId, nowIso, sqlite } from "./db";
import { config } from "./config";

export type AuthUser = {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  picture?: string | null;
  bio?: string | null;
  is_verified: boolean;
  is_staff: boolean;
  is_superuser: boolean;
};

type TokenPayload = {
  sub: string;
  type: "access" | "refresh";
  jti: string;
};

export function toPublicUser(row: any): AuthUser {
  return {
    id: row.id,
    username: row.username,
    name: row.name || row.username,
    email: row.email,
    phone: row.phone,
    avatar: row.avatar,
    picture: row.picture || row.avatar,
    bio: row.bio,
    is_verified: !!row.is_verified,
    is_staff: !!row.is_staff,
    is_superuser: !!row.is_superuser,
  };
}

export function signToken(userId: string, type: "access" | "refresh") {
  const jti = createId("jti");
  const expiresIn = type === "access" ? `${config.accessMinutes}m` : `${config.refreshDays}d`;
  const token = jwt.sign({ sub: userId, type, jti } satisfies TokenPayload, config.jwtSecret, { expiresIn } as jwt.SignOptions);
  const expiresAt = new Date(Date.now() + (type === "access" ? config.accessMinutes * 60_000 : config.refreshDays * 86_400_000)).toISOString();

  sqlite.prepare(`
    INSERT INTO auth_tokens (id, user_id, jti, type, revoked, expires_at, created_at)
    VALUES (?, ?, ?, ?, 0, ?, ?)
  `).run(createId("tok"), userId, jti, type, expiresAt, nowIso());

  return token;
}

export function issuePair(userId: string) {
  return {
    access: signToken(userId, "access"),
    refresh: signToken(userId, "refresh"),
  };
}

export function verifyToken(token: string, expectedType: "access" | "refresh" = "access") {
  const payload = jwt.verify(token, config.jwtSecret) as TokenPayload;
  if (payload.type !== expectedType) throw new Error("Invalid token type");
  const stored = sqlite.prepare("SELECT * FROM auth_tokens WHERE jti = ? AND type = ?").get(payload.jti, expectedType) as any;
  if (!stored || stored.revoked) throw new Error("Token revoked");
  if (new Date(stored.expires_at).getTime() <= Date.now()) throw new Error("Token expired");
  return payload;
}

export function revokeTokenString(token: string) {
  try {
    const payload = jwt.verify(token, config.jwtSecret) as TokenPayload;
    sqlite.prepare("UPDATE auth_tokens SET revoked = 1 WHERE jti = ?").run(payload.jti);
  } catch {
    // Logout should stay idempotent.
  }
}
