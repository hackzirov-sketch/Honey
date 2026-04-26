import { Router } from "express";
import { sqlite } from "../../core/db";
import { asyncHandler, HttpError } from "../../core/http";
import { authRequired, staffRequired } from "../../core/middleware";

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
      SELECT id, username, name, email, phone, avatar, picture, is_verified, is_staff, is_superuser, created_at
      FROM users
      ORDER BY created_at DESC
    `).all();
    res.json(rows);
  }));

  router.delete("/users/:id/", asyncHandler(async (req, res) => {
    const id = req.params.id;
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
