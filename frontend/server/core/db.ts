import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";
import { config } from "./config";

fs.mkdirSync(path.dirname(config.databasePath), { recursive: true });

export const sqlite = new Database(config.databasePath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const orm = drizzle(sqlite, { schema });

export function nowIso() {
  return new Date().toISOString();
}

export function createId(prefix = "") {
  const id = crypto.randomUUID();
  return prefix ? `${prefix}_${id}` : id;
}

export function initDb() {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      password_hash TEXT NOT NULL,
      avatar TEXT,
      picture TEXT,
      bio TEXT,
      is_verified INTEGER NOT NULL DEFAULT 0,
      is_staff INTEGER NOT NULL DEFAULT 0,
      is_superuser INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS auth_tokens (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      jti TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      revoked INTEGER NOT NULL DEFAULT 0,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS email_verifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      consumed INTEGER NOT NULL DEFAULT 0,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY, name TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS genres (id TEXT PRIMARY KEY, name TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      description TEXT,
      image TEXT,
      youtube_url TEXT,
      library_url TEXT,
      file TEXT,
      is_premium INTEGER NOT NULL DEFAULT 0,
      avg_rating REAL NOT NULL DEFAULT 0,
      year INTEGER,
      language TEXT,
      pages INTEGER,
      category_id TEXT,
      genre_id TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS user_books (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      book_id TEXT NOT NULL,
      is_read INTEGER NOT NULL DEFAULT 0,
      downloaded_at TEXT NOT NULL,
      UNIQUE(user_id, book_id)
    );
    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      user_a_id TEXT NOT NULL,
      user_b_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS groups (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      group_type TEXT NOT NULL DEFAULT 'group',
      avatar TEXT,
      admin_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS group_members (
      id TEXT PRIMARY KEY,
      group_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'member',
      created_at TEXT NOT NULL,
      UNIQUE(group_id, user_id)
    );
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      chat_id TEXT,
      group_id TEXT,
      sender_id TEXT NOT NULL,
      content TEXT NOT NULL,
      message_type TEXT NOT NULL DEFAULT 'text',
      file TEXT,
      created_at TEXT NOT NULL,
      deleted_at TEXT
    );
    CREATE TABLE IF NOT EXISTS video_categories (id TEXT PRIMARY KEY, name TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS videos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      video TEXT,
      video_embed TEXT,
      cover TEXT,
      uploader_id TEXT,
      category_id TEXT,
      likes_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS video_likes (
      id TEXT PRIMARY KEY,
      video_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(video_id, user_id)
    );
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      video_id TEXT,
      book_id TEXT,
      text TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS live_sessions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      streamer_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled',
      cover TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS live_participants (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      is_muted INTEGER NOT NULL DEFAULT 0,
      is_camera_off INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      UNIQUE(session_id, user_id)
    );
    CREATE TABLE IF NOT EXISTS live_messages (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  seedDefaults();
}

function seedDefaults() {
  const stamp = nowIso();
  const count = sqlite.prepare("SELECT COUNT(*) AS count FROM categories").get() as { count: number };
  if (count.count === 0) {
    for (const name of ["Dasturlash", "Biznes", "Til o'rganish", "Psixologiya"]) {
      sqlite.prepare("INSERT INTO categories (id, name, created_at) VALUES (?, ?, ?)").run(createId("cat"), name, stamp);
    }
  }

  const genreCount = sqlite.prepare("SELECT COUNT(*) AS count FROM genres").get() as { count: number };
  if (genreCount.count === 0) {
    for (const name of ["Texnologiya", "Ta'lim", "Motivatsiya", "Ilmiy"]) {
      sqlite.prepare("INSERT INTO genres (id, name, created_at) VALUES (?, ?, ?)").run(createId("gen"), name, stamp);
    }
  }

  const videoCategoryCount = sqlite.prepare("SELECT COUNT(*) AS count FROM video_categories").get() as { count: number };
  if (videoCategoryCount.count === 0) {
    for (const name of ["Darslar", "Webinar", "AI", "Frontend"]) {
      sqlite.prepare("INSERT INTO video_categories (id, name, created_at) VALUES (?, ?, ?)").run(createId("vcat"), name, stamp);
    }
  }
}

export function dbHealth() {
  sqlite.prepare("SELECT 1").get();
  return { status: "ok", driver: "sqlite", path: config.databasePath };
}
