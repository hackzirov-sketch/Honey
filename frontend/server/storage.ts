import { users, type User, type InsertUser, chatHistory, type InsertChatHistory, type ChatHistory } from "@shared/schema";
import { db } from "./db"; // Assumes db is set up with pg (or we can use MemStorage if db fails)
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  logChat(chat: InsertChatHistory): Promise<ChatHistory>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db!.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db!.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db!.insert(users).values(insertUser).returning();
    return user;
  }

  async logChat(chat: InsertChatHistory): Promise<ChatHistory> {
    const [entry] = await db!.insert(chatHistory).values(chat).returning();
    return entry;
  }
}

// Fallback MemStorage if needed, but we'll try to use DatabaseStorage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chats: Map<number, ChatHistory>;
  private currentUserId: number;
  private currentChatId: number;

  constructor() {
    this.users = new Map();
    this.chats = new Map();
    this.currentUserId = 1;
    this.currentChatId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date(), picture: insertUser.picture || "https://i.pravatar.cc/150", phone: insertUser.phone || null };
    this.users.set(id, user);
    return user;
  }

  async logChat(chat: InsertChatHistory): Promise<ChatHistory> {
    const id = this.currentChatId++;
    const entry: ChatHistory = { ...chat, id, timestamp: new Date(), userId: chat.userId || null };
    this.chats.set(id, entry);
    return entry;
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();
