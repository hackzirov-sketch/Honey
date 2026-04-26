import { createId, nowIso, sqlite } from "../../core/db";

export const videoRepo = {
  list(search?: string) {
    if (search) {
      return sqlite.prepare("SELECT * FROM videos WHERE lower(title) LIKE lower(?) ORDER BY created_at DESC").all(`%${search}%`) as any[];
    }
    return sqlite.prepare("SELECT * FROM videos ORDER BY created_at DESC").all() as any[];
  },
  get(id: string) {
    return sqlite.prepare("SELECT * FROM videos WHERE id = ?").get(id) as any;
  },
  create(data: any, userId: string) {
    const id = createId("vid");
    sqlite.prepare(`
      INSERT INTO videos (id, title, description, video, video_embed, cover, uploader_id, category_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, data.title, data.description || "", data.video || null, data.video_embed || null, data.cover || null, userId, data.category_id || null, nowIso());
    return this.get(id);
  },
};
