import bcrypt from "bcryptjs";
import { createId, nowIso, sqlite } from "../../core/db";
import { HttpError } from "../../core/http";
import { issuePair, revokeTokenString, toPublicUser, verifyToken } from "../../core/jwt";
import { sendVerificationEmail } from "../../core/mailer";
import { authRepo } from "./repo";

function code6() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export const authService = {
  async register(data: { username: string; email: string; phone?: string; password: string }) {
    if (authRepo.findUserByEmail(data.email)) {
      throw new HttpError(400, "Email already exists", { email: ["Bu email allaqachon mavjud"] });
    }
    if (authRepo.findUserByUsername(data.username)) {
      throw new HttpError(400, "Username already exists", { username: ["Bu username allaqachon mavjud"] });
    }
    const pendingByUsername = authRepo.findPendingByUsername(data.username);
    if (pendingByUsername && pendingByUsername.email.toLowerCase() !== data.email.toLowerCase()) {
      throw new HttpError(400, "Username already exists", { username: ["Bu username allaqachon mavjud"] });
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const code = code6();
    authRepo.upsertPendingRegistration({
      username: data.username,
      email: data.email,
      phone: data.phone,
      passwordHash,
      code,
    });
    await sendVerificationEmail(data.email, code);
    return { message: "Verification code sent", email: data.email };
  },

  verifyEmail(email: string, code: string) {
    const pending = authRepo.consumePending(email, code);
    if (!pending) {
      const user = authRepo.consumeVerification(email, code);
      if (!user) throw new HttpError(400, "Kod noto'g'ri yoki eskirgan");
      return { ...issuePair(user.id), user: toPublicUser(user) };
    }

    if (authRepo.findUserByEmail(pending.email)) {
      throw new HttpError(400, "Email already exists", { email: ["Bu email allaqachon mavjud"] });
    }
    if (authRepo.findUserByUsername(pending.username)) {
      throw new HttpError(400, "Username already exists", { username: ["Bu username allaqachon mavjud"] });
    }
    const isFirstUser = (sqlite.prepare("SELECT COUNT(*) AS count FROM users").get() as { count: number }).count === 0;
    const user = authRepo.createUser({
      username: pending.username,
      email: pending.email,
      phone: pending.phone,
      passwordHash: pending.password_hash,
      isVerified: true,
      isStaff: isFirstUser,
      isSuperuser: isFirstUser,
    });
    return { ...issuePair(user.id), user: toPublicUser(user) };
  },

  async login(login: string, password: string) {
    const user = authRepo.findUserByLogin(login);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new HttpError(401, "Login yoki parol xato", { detail: "Login yoki parol xato" });
    }
    return { ...issuePair(user.id), user: toPublicUser(user) };
  },

  refresh(refresh: string) {
    try {
      const payload = verifyToken(refresh, "refresh");
      return { access: issuePair(payload.sub).access };
    } catch {
      throw new HttpError(401, "Refresh token invalid");
    }
  },

  logout(access?: string, refresh?: string) {
    if (access) revokeTokenString(access);
    if (refresh) revokeTokenString(refresh);
    return { message: "Logged out" };
  },

  updateProfile(userId: string, data: any) {
    const existing = authRepo.findUserById(userId);
    if (!existing) throw new HttpError(404, "User not found");
    const username = data.username ?? existing.username;
    const name = data.name ?? username;
    sqlite.prepare(`
      UPDATE users
      SET username = ?, name = ?, phone = ?, avatar = ?, picture = ?, bio = ?, updated_at = ?
      WHERE id = ?
    `).run(
      username,
      name,
      data.phone ?? existing.phone,
      data.avatar ?? existing.avatar,
      data.picture ?? data.avatar ?? existing.picture,
      data.bio ?? existing.bio,
      nowIso(),
      userId,
    );
    return toPublicUser(authRepo.findUserById(userId));
  },

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = authRepo.findUserById(userId);
    if (!user || !(await bcrypt.compare(oldPassword, user.password_hash))) {
      throw new HttpError(400, "Eski parol noto'g'ri");
    }
    const hash = await bcrypt.hash(newPassword, 12);
    sqlite.prepare("UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?").run(hash, nowIso(), userId);
    return { message: "Password changed" };
  },

  deleteProfile(userId: string) {
    sqlite.prepare("DELETE FROM users WHERE id = ?").run(userId);
    return { message: "Deleted" };
  },

  stats(userId: string) {
    const books = sqlite.prepare("SELECT COUNT(*) AS count FROM user_books WHERE user_id = ?").get(userId) as { count: number };
    const messages = sqlite.prepare("SELECT COUNT(*) AS count FROM messages WHERE sender_id = ? AND deleted_at IS NULL").get(userId) as { count: number };
    const sessions = sqlite.prepare("SELECT COUNT(*) AS count FROM live_sessions WHERE streamer_id = ?").get(userId) as { count: number };
    return {
      books_count: books.count,
      messages_count: messages.count,
      live_sessions_count: sessions.count,
      achievements_count: books.count + sessions.count,
    };
  },

  async googleCallback(profile: { email: string; name: string; avatar?: string }) {
    let user = authRepo.findUserByEmail(profile.email);
    if (!user) {
      user = authRepo.createUser({
        username: profile.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "") || createId("google"),
        email: profile.email,
        passwordHash: await bcrypt.hash(createId("oauth"), 12),
        isVerified: true,
        avatar: profile.avatar,
      });
    }
    return { ...issuePair(user.id), user: toPublicUser(user) };
  },
};
