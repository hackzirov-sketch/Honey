import { createId, nowIso, sqlite } from "../../core/db";

export const commentRepo = {
  create(userId: string, data: { text: string; video_id?: string; book_id?: string }) {
    const id = createId("com");
    sqlite.prepare("INSERT INTO comments (id, user_id, video_id, book_id, text, created_at) VALUES (?, ?, ?, ?, ?, ?)")
      .run(id, userId, data.video_id || null, data.book_id || null, data.text, nowIso());
    return sqlite.prepare("SELECT * FROM comments WHERE id = ?").get(id);
  },
};
