import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  avatar: text("avatar"),
  picture: text("picture"),
  bio: text("bio"),
  isVerified: integer("is_verified", { mode: "boolean" }).notNull().default(false),
  isStaff: integer("is_staff", { mode: "boolean" }).notNull().default(false),
  isSuperuser: integer("is_superuser", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => ({
  emailIdx: uniqueIndex("users_email_idx").on(table.email),
  usernameIdx: uniqueIndex("users_username_idx").on(table.username),
}));

export const authTokens = sqliteTable("auth_tokens", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  jti: text("jti").notNull(),
  type: text("type", { enum: ["refresh", "access"] }).notNull(),
  revoked: integer("revoked", { mode: "boolean" }).notNull().default(false),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => ({
  jtiIdx: uniqueIndex("auth_tokens_jti_idx").on(table.jti),
}));

export const emailVerifications = sqliteTable("email_verifications", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  email: text("email").notNull(),
  code: text("code").notNull(),
  consumed: integer("consumed", { mode: "boolean" }).notNull().default(false),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
});

export const pendingRegistrations = sqliteTable("pending_registrations", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  code: text("code").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => ({
  emailIdx: uniqueIndex("pending_registrations_email_idx").on(table.email),
}));

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull(),
});

export const genres = sqliteTable("genres", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull(),
});

export const books = sqliteTable("books", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description"),
  image: text("image"),
  youtubeUrl: text("youtube_url"),
  libraryUrl: text("library_url"),
  file: text("file"),
  isPremium: integer("is_premium", { mode: "boolean" }).notNull().default(false),
  avgRating: real("avg_rating").notNull().default(0),
  year: integer("year"),
  language: text("language"),
  pages: integer("pages"),
  categoryId: text("category_id").references(() => categories.id),
  genreId: text("genre_id").references(() => genres.id),
  createdAt: text("created_at").notNull(),
});

export const userBooks = sqliteTable("user_books", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  bookId: text("book_id").notNull().references(() => books.id),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  downloadedAt: text("downloaded_at").notNull(),
}, (table) => ({
  uniqueUserBook: uniqueIndex("user_books_unique_idx").on(table.userId, table.bookId),
}));

export const chats = sqliteTable("chats", {
  id: text("id").primaryKey(),
  userAId: text("user_a_id").notNull().references(() => users.id),
  userBId: text("user_b_id").notNull().references(() => users.id),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const groups = sqliteTable("groups", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  groupType: text("group_type", { enum: ["group", "channel"] }).notNull().default("group"),
  avatar: text("avatar"),
  adminId: text("admin_id").notNull().references(() => users.id),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const groupMembers = sqliteTable("group_members", {
  id: text("id").primaryKey(),
  groupId: text("group_id").notNull().references(() => groups.id),
  userId: text("user_id").notNull().references(() => users.id),
  role: text("role").notNull().default("member"),
  createdAt: text("created_at").notNull(),
}, (table) => ({
  uniqueGroupMember: uniqueIndex("group_members_unique_idx").on(table.groupId, table.userId),
}));

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  chatId: text("chat_id").references(() => chats.id),
  groupId: text("group_id").references(() => groups.id),
  senderId: text("sender_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  messageType: text("message_type").notNull().default("text"),
  file: text("file"),
  createdAt: text("created_at").notNull(),
  deletedAt: text("deleted_at"),
});

export const videoCategories = sqliteTable("video_categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull(),
});

export const videos = sqliteTable("videos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  video: text("video"),
  videoEmbed: text("video_embed"),
  cover: text("cover"),
  uploaderId: text("uploader_id").references(() => users.id),
  categoryId: text("category_id").references(() => videoCategories.id),
  likesCount: integer("likes_count").notNull().default(0),
  createdAt: text("created_at").notNull(),
});

export const videoLikes = sqliteTable("video_likes", {
  id: text("id").primaryKey(),
  videoId: text("video_id").notNull().references(() => videos.id),
  userId: text("user_id").notNull().references(() => users.id),
  createdAt: text("created_at").notNull(),
}, (table) => ({
  uniqueVideoLike: uniqueIndex("video_likes_unique_idx").on(table.videoId, table.userId),
}));

export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  videoId: text("video_id").references(() => videos.id),
  bookId: text("book_id").references(() => books.id),
  text: text("text").notNull(),
  createdAt: text("created_at").notNull(),
});

export const liveSessions = sqliteTable("live_sessions", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  streamerId: text("streamer_id").notNull().references(() => users.id),
  status: text("status", { enum: ["scheduled", "live", "finished"] }).notNull().default("scheduled"),
  cover: text("cover"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const liveParticipants = sqliteTable("live_participants", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => liveSessions.id),
  userId: text("user_id").notNull().references(() => users.id),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull().default("pending"),
  isMuted: integer("is_muted", { mode: "boolean" }).notNull().default(false),
  isCameraOff: integer("is_camera_off", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
}, (table) => ({
  uniqueParticipant: uniqueIndex("live_participants_unique_idx").on(table.sessionId, table.userId),
}));

export const liveMessages = sqliteTable("live_messages", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => liveSessions.id),
  userId: text("user_id").notNull().references(() => users.id),
  text: text("text").notNull(),
  createdAt: text("created_at").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userBooks: many(userBooks),
  messages: many(messages),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertChatHistorySchema = z.object({
  userId: z.string().optional(),
  message: z.string(),
  response: z.string(),
});
export type InsertChatHistory = z.infer<typeof insertChatHistorySchema>;
export type ChatHistory = InsertChatHistory & { id: string; timestamp: string };
