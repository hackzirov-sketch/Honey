import { createId, nowIso, sqlite } from "../../core/db";

export const liveRepo = {
  getSession(id: string) {
    return sqlite.prepare("SELECT * FROM live_sessions WHERE id = ?").get(id) as any;
  },
  createSession(data: any, userId: string) {
    const id = createId("live");
    const stamp = nowIso();
    sqlite.prepare(`
      INSERT INTO live_sessions (id, title, description, streamer_id, status, cover, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, data.title, data.description || "", userId, data.status || "scheduled", data.cover || null, stamp, stamp);
    return this.getSession(id);
  },
};
