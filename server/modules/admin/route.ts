import { Router } from "express";
import bcrypt from "bcryptjs";
import { createId, nowIso, sqlite } from "../../core/db";
import { asyncHandler, HttpError } from "../../core/http";
import { authRequired, staffRequired } from "../../core/middleware";

const PUBLIC_USER_FIELDS = "id, username, name, email, phone, avatar, picture, is_verified, is_staff, is_superuser, created_at";

function deleteUserCascade(userId: string) {
  const ph = "?";
  const chatIds = (sqlite.prepare("SELECT id FROM chats WHERE user_a_id = ? OR user_b_id = ?").all(userId, userId) as any[]).map(r => r.id);
  const videoIds = (sqlite.prepare("SELECT id FROM videos WHERE uploader_id = ?").all(userId) as any[]).map(r => r.id);
  const liveSessionIds = (sqlite.prepare("SELECT id FROM live_sessions WHERE streamer_id = ?").all(userId) as any[]).map(r => r.id);
  const groupIds = (sqlite.prepare("SELECT id FROM groups WHERE admin_id = ?").all(userId) as any[]).map(r => r.id);

  const delIn = (table: string, col: string, ids: string[]) => {
    if (!ids.length) return;
    const p = ids.map(() => "?").join(",");
    sqlite.prepare(`DELETE FROM ${table} WHERE ${col} IN (${p})`).run(...ids);
  };

  const tx = sqlite.transaction(() => {
    delIn("messages", "chat_id", chatIds);
    delIn("messages", "group_id", groupIds);
    sqlite.prepare("DELETE FROM messages WHERE sender_id = ?").run(userId);
    delIn("video_likes", "video_id", videoIds);
    delIn("comments", "video_id", videoIds);
    delIn("videos", "id", videoIds);
    delIn("live_messages", "session_id", liveSessionIds);
    delIn("live_participants", "session_id", liveSessionIds);
    delIn("live_sessions", "id", liveSessionIds);
    delIn("group_members", "group_id", groupIds);
    delIn("groups", "id", groupIds);
    delIn("chats", "id", chatIds);
    sqlite.prepare("DELETE FROM video_likes WHERE user_id = ?").run(userId);
    sqlite.prepare("DELETE FROM comments WHERE user_id = ?").run(userId);
    sqlite.prepare("DELETE FROM user_books WHERE user_id = ?").run(userId);
    sqlite.prepare("DELETE FROM group_members WHERE user_id = ?").run(userId);
    sqlite.prepare("DELETE FROM live_participants WHERE user_id = ?").run(userId);
    sqlite.prepare("DELETE FROM live_messages WHERE user_id = ?").run(userId);
    sqlite.prepare("DELETE FROM email_verifications WHERE user_id = ?").run(userId);
    sqlite.prepare("DELETE FROM auth_tokens WHERE user_id = ?").run(userId);
    sqlite.prepare("DELETE FROM users WHERE id = ?").run(userId);
  });
  tx();
}

export function adminRoutes() {
  const router = Router();

  router.use(authRequired, staffRequired);

  router.get("/users/", asyncHandler(async (_req, res) => {
    const rows = sqlite.prepare(`
      SELECT ${PUBLIC_USER_FIELDS}
      FROM users
      ORDER BY created_at DESC
    `).all();
    res.json(rows);
  }));

  router.post("/users/", asyncHandler(async (req, res) => {
    const { username, email, password, phone, name, is_staff, is_superuser, is_verified } = req.body || {};

    if (!username || typeof username !== "string" || username.trim().length < 3) {
      throw new HttpError(400, "Username kamida 3 ta belgi");
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new HttpError(400, "Email noto'g'ri");
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      throw new HttpError(400, "Parol kamida 6 ta belgi");
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (sqlite.prepare("SELECT id FROM users WHERE LOWER(email) = ?").get(cleanEmail)) {
      throw new HttpError(400, "Email allaqachon mavjud");
    }
    if (sqlite.prepare("SELECT id FROM users WHERE username = ?").get(cleanUsername)) {
      throw new HttpError(400, "Username allaqachon mavjud");
    }
    if (is_superuser && !req.user!.is_superuser) {
      throw new HttpError(403, "Faqat superuser yangi superuser yarata oladi");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = createId("usr");
    const now = nowIso();
    sqlite.prepare(`
      INSERT INTO users (id, username, name, email, phone, password_hash, is_verified, is_staff, is_superuser, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      cleanUsername,
      (name && String(name).trim()) || cleanUsername,
      cleanEmail,
      phone || null,
      passwordHash,
      is_verified === false ? 0 : 1,
      is_staff ? 1 : 0,
      is_superuser ? 1 : 0,
      now,
      now,
    );
    const created = sqlite.prepare(`SELECT ${PUBLIC_USER_FIELDS} FROM users WHERE id = ?`).get(id);
    res.status(201).json(created);
  }));

  router.patch("/users/:id/", asyncHandler(async (req, res) => {
    const id = req.params.id;
    const target = sqlite.prepare("SELECT * FROM users WHERE id = ?").get(id) as any;
    if (!target) throw new HttpError(404, "Foydalanuvchi topilmadi");

    const { username, email, phone, name, is_staff, is_superuser, is_verified, password } = req.body || {};
    const updates: string[] = [];
    const values: any[] = [];

    if (username !== undefined) {
      const u = String(username).trim();
      if (u.length < 3) throw new HttpError(400, "Username kamida 3 ta belgi");
      if (u !== target.username) {
        if (sqlite.prepare("SELECT id FROM users WHERE username = ? AND id != ?").get(u, id)) {
          throw new HttpError(400, "Username band");
        }
        updates.push("username = ?"); values.push(u);
      }
    }
    if (email !== undefined) {
      const e = String(email).trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new HttpError(400, "Email noto'g'ri");
      if (e !== String(target.email).toLowerCase()) {
        if (sqlite.prepare("SELECT id FROM users WHERE LOWER(email) = ? AND id != ?").get(e, id)) {
          throw new HttpError(400, "Email band");
        }
        updates.push("email = ?"); values.push(e);
      }
    }
    if (phone !== undefined) { updates.push("phone = ?"); values.push(phone || null); }
    if (name !== undefined) { updates.push("name = ?"); values.push(String(name).trim() || target.username); }
    if (typeof is_verified === "boolean") {
      updates.push("is_verified = ?"); values.push(is_verified ? 1 : 0);
    }
    if (typeof is_staff === "boolean") {
      if (target.is_superuser && !is_staff) throw new HttpError(400, "Superuserdan staff huquqini olib bo'lmaydi");
      updates.push("is_staff = ?"); values.push(is_staff ? 1 : 0);
    }
    if (typeof is_superuser === "boolean") {
      if (!req.user!.is_superuser) throw new HttpError(403, "Faqat superuser superuser huquqini o'zgartira oladi");
      if (req.user!.id === id && !is_superuser) throw new HttpError(400, "O'zingizdan superuser huquqini olib tashlay olmaysiz");
      updates.push("is_superuser = ?"); values.push(is_superuser ? 1 : 0);
      if (is_superuser) { updates.push("is_staff = ?"); values.push(1); }
    }
    if (password !== undefined && password !== "" && password !== null) {
      if (String(password).length < 6) throw new HttpError(400, "Parol kamida 6 ta belgi");
      updates.push("password_hash = ?"); values.push(await bcrypt.hash(String(password), 12));
    }

    if (updates.length > 0) {
      updates.push("updated_at = ?"); values.push(nowIso());
      values.push(id);
      sqlite.prepare(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`).run(...values);
    }

    const updated = sqlite.prepare(`SELECT ${PUBLIC_USER_FIELDS} FROM users WHERE id = ?`).get(id);
    res.json(updated);
  }));

  router.delete("/users/:id/", asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const target = sqlite.prepare("SELECT id, is_superuser FROM users WHERE id = ?").get(id) as any;
    if (!target) throw new HttpError(404, "Foydalanuvchi topilmadi");
    if (req.user!.id === id) throw new HttpError(400, "O'zingizni o'chira olmaysiz");
    if (target.is_superuser) throw new HttpError(400, "Superuserni o'chirib bo'lmaydi");
    deleteUserCascade(id);
    res.json({ message: "O'chirildi" });
  }));

  router.get("/pending-registrations/", asyncHandler(async (_req, res) => {
    const rows = sqlite.prepare(`
      SELECT id, username, email, phone, expires_at, created_at
      FROM pending_registrations
      ORDER BY created_at DESC
    `).all();
    res.json(rows);
  }));

  router.delete("/pending-registrations/:id/", asyncHandler(async (req, res) => {
    const r = sqlite.prepare("DELETE FROM pending_registrations WHERE id = ?").run(req.params.id);
    if (r.changes === 0) throw new HttpError(404, "Topilmadi");
    res.json({ message: "O'chirildi" });
  }));

  router.get("/stats/", asyncHandler(async (_req, res) => {
    const stat = (sql: string) => (sqlite.prepare(sql).get() as { c: number }).c;
    res.json({
      users_total: stat("SELECT COUNT(*) AS c FROM users"),
      users_verified: stat("SELECT COUNT(*) AS c FROM users WHERE is_verified = 1"),
      users_admin: stat("SELECT COUNT(*) AS c FROM users WHERE is_staff = 1 OR is_superuser = 1"),
      pending_registrations: stat("SELECT COUNT(*) AS c FROM pending_registrations"),
      videos_total: stat("SELECT COUNT(*) AS c FROM videos"),
      books_total: stat("SELECT COUNT(*) AS c FROM books"),
      live_sessions_total: stat("SELECT COUNT(*) AS c FROM live_sessions"),
      messages_total: stat("SELECT COUNT(*) AS c FROM messages WHERE deleted_at IS NULL"),
    });
  }));

  return router;
}
