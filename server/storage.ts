import { createId, nowIso, sqlite } from "./core/db";
import { toPublicUser } from "./core/jwt";
import type { ChatHistory, InsertChatHistory, InsertUser, User } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  logChat(chat: InsertChatHistory): Promise<ChatHistory>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return sqlite.prepare("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return sqlite.prepare("SELECT * FROM users WHERE lower(email) = lower(?)").get(email) as User | undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = createId("usr");
    const stamp = nowIso();
    sqlite.prepare(`
      INSERT INTO users (id, username, name, email, phone, password_hash, avatar, picture, is_verified, is_staff, is_superuser, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      user.username,
      user.name || user.username,
      user.email,
      user.phone || null,
      user.passwordHash,
      user.avatar || null,
      user.picture || user.avatar || null,
      user.isVerified ? 1 : 0,
      user.isStaff ? 1 : 0,
      user.isSuperuser ? 1 : 0,
      stamp,
      stamp,
    );
    return (await this.getUser(id))!;
  }

  async logChat(chat: InsertChatHistory): Promise<ChatHistory> {
    return { ...chat, id: createId("hist"), timestamp: nowIso() };
  }
}

export const storage = new DatabaseStorage();
