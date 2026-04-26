import { createId, nowIso, sqlite } from "../../core/db";
import { HttpError } from "../../core/http";
import { resolveVideoEmbedUrl } from "../../core/link-preview";
import { serializeMessage, serializeVideo } from "../../core/serializers";
import { videoRepo } from "./repo";

export const videoService = {
  list(search?: string) {
    return videoRepo.list(search).map(serializeVideo);
  },
  create(data: any, userId: string) {
    const video = data.video || data.video_url || data.youtube_url || data.instagram_url || null;
    const videoEmbed = resolveVideoEmbedUrl(video, data.video_embed);
    const categoryId = data.category_id || data.category || null;

    if (!video && !videoEmbed) {
      throw new HttpError(400, "Video fayli yoki YouTube/Instagram havolasi kerak");
    }

    return serializeVideo(videoRepo.create({
      ...data,
      video,
      video_embed: videoEmbed,
      category_id: categoryId,
    }, userId));
  },
  delete(id: string, userId: string, isStaff: boolean) {
    const row = videoRepo.get(id);
    if (!row) throw new HttpError(404, "Video not found");
    if (!isStaff && row.uploader_id !== userId) throw new HttpError(403, "Forbidden");
    sqlite.prepare("DELETE FROM videos WHERE id = ?").run(id);
  },
  like(id: string, userId: string) {
    if (!videoRepo.get(id)) throw new HttpError(404, "Video not found");
    try {
      sqlite.prepare("INSERT INTO video_likes (id, video_id, user_id, created_at) VALUES (?, ?, ?, ?)")
        .run(createId("vlike"), id, userId, nowIso());
      sqlite.prepare("UPDATE videos SET likes_count = likes_count + 1 WHERE id = ?").run(id);
    } catch {
      sqlite.prepare("DELETE FROM video_likes WHERE video_id = ? AND user_id = ?").run(id, userId);
      sqlite.prepare("UPDATE videos SET likes_count = max(likes_count - 1, 0) WHERE id = ?").run(id);
    }
    return serializeVideo(videoRepo.get(id));
  },
  comment(id: string, userId: string, text: string) {
    if (!videoRepo.get(id)) throw new HttpError(404, "Video not found");
    const commentId = createId("com");
    sqlite.prepare("INSERT INTO comments (id, user_id, video_id, text, created_at) VALUES (?, ?, ?, ?, ?)")
      .run(commentId, userId, id, text, nowIso());
    return {
      id: commentId,
      text,
      user: sqlite.prepare("SELECT id, username, email, avatar FROM users WHERE id = ?").get(userId),
      created_at: nowIso(),
    };
  },
  categories() {
    return sqlite.prepare("SELECT id, name FROM video_categories ORDER BY name").all();
  },
  createCategory(name: string) {
    const id = createId("vcat");
    sqlite.prepare("INSERT INTO video_categories (id, name, created_at) VALUES (?, ?, ?)").run(id, name, nowIso());
    return sqlite.prepare("SELECT id, name FROM video_categories WHERE id = ?").get(id);
  },
};
