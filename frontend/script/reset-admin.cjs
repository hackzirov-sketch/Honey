const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");

const dbPath = process.env.SQLITE_PATH || path.join(process.cwd(), "data", "honey.sqlite");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const rl = readline.createInterface({ input, output });

function nowIso() {
  return new Date().toISOString();
}

function id(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function normalize(value) {
  return String(value || "").trim();
}

function createUsersTable(db) {
  db.exec(`
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
  `);
}

async function main() {
  console.log("");
  console.log("Honey Admin Reset");
  console.log("DB:", dbPath);
  console.log("");

  const username = normalize(await rl.question("Admin username: "));
  const email = normalize(await rl.question("Admin email: "));
  const password = normalize(await rl.question("Yangi parol: "));

  if (!username || !email || !password) {
    throw new Error("Username, email va parol bosh bolmasligi kerak.");
  }
  if (!email.includes("@")) {
    throw new Error("Email notogri korinyapti.");
  }
  if (password.length < 6) {
    throw new Error("Parol kamida 6 ta belgidan iborat bolsin.");
  }

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  createUsersTable(db);

  const passwordHash = await bcrypt.hash(password, 12);
  const existing = db
    .prepare("SELECT * FROM users WHERE lower(email) = lower(?) OR lower(username) = lower(?) LIMIT 1")
    .get(email, username);

  if (existing) {
    db.prepare(`
      UPDATE users
      SET username = ?, name = ?, email = ?, password_hash = ?,
          is_verified = 1, is_staff = 1, is_superuser = 1, updated_at = ?
      WHERE id = ?
    `).run(username, username, email, passwordHash, nowIso(), existing.id);
    console.log("");
    console.log("Admin yangilandi:", username, `<${email}>`);
  } else {
    const stamp = nowIso();
    db.prepare(`
      INSERT INTO users (
        id, username, name, email, phone, password_hash, avatar, picture, bio,
        is_verified, is_staff, is_superuser, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, NULL, ?, NULL, NULL, NULL, 1, 1, 1, ?, ?)
    `).run(id("usr"), username, username, email, passwordHash, stamp, stamp);
    console.log("");
    console.log("Admin yaratildi:", username, `<${email}>`);
  }

  db.close();
}

main()
  .catch((error) => {
    console.error("");
    console.error("[ERROR]", error.message || error);
    process.exitCode = 1;
  })
  .finally(() => rl.close());
