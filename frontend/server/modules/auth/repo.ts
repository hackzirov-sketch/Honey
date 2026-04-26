import { createId, nowIso, sqlite } from "../../core/db";

export const authRepo = {
  findUserByLogin(login: string) {
    return sqlite.prepare("SELECT * FROM users WHERE lower(email) = lower(?) OR lower(username) = lower(?)").get(login, login) as any;
  },
  findUserByEmail(email: string) {
    return sqlite.prepare("SELECT * FROM users WHERE lower(email) = lower(?)").get(email) as any;
  },
  findUserById(id: string) {
    return sqlite.prepare("SELECT * FROM users WHERE id = ?").get(id) as any;
  },
  createUser(input: {
    username: string;
    email: string;
    phone?: string;
    passwordHash: string;
    isVerified?: boolean;
    isStaff?: boolean;
    isSuperuser?: boolean;
    avatar?: string;
  }) {
    const stamp = nowIso();
    const id = createId("usr");
    sqlite.prepare(`
      INSERT INTO users (id, username, name, email, phone, password_hash, avatar, picture, is_verified, is_staff, is_superuser, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      input.username,
      input.username,
      input.email,
      input.phone || null,
      input.passwordHash,
      input.avatar || null,
      input.avatar || null,
      input.isVerified ? 1 : 0,
      input.isStaff ? 1 : 0,
      input.isSuperuser ? 1 : 0,
      stamp,
      stamp,
    );
    return this.findUserById(id);
  },
  upsertVerification(userId: string, email: string, code: string) {
    sqlite.prepare("UPDATE email_verifications SET consumed = 1 WHERE user_id = ? AND consumed = 0").run(userId);
    sqlite.prepare(`
      INSERT INTO email_verifications (id, user_id, email, code, consumed, expires_at, created_at)
      VALUES (?, ?, ?, ?, 0, ?, ?)
    `).run(createId("ver"), userId, email, code, new Date(Date.now() + 15 * 60_000).toISOString(), nowIso());
  },
  consumeVerification(email: string, code: string) {
    const row = sqlite.prepare(`
      SELECT * FROM email_verifications
      WHERE lower(email) = lower(?) AND code = ? AND consumed = 0
      ORDER BY created_at DESC LIMIT 1
    `).get(email, code) as any;
    if (!row || new Date(row.expires_at).getTime() <= Date.now()) return null;
    sqlite.prepare("UPDATE email_verifications SET consumed = 1 WHERE id = ?").run(row.id);
    sqlite.prepare("UPDATE users SET is_verified = 1, updated_at = ? WHERE id = ?").run(nowIso(), row.user_id);
    return this.findUserById(row.user_id);
  },
};
