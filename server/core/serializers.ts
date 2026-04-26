import { sqlite } from "./db";
import { toPublicUser } from "./jwt";
import { detectLinkPreview, detectVideoSource, isLocalUploadUrl } from "./link-preview";

export function categoryById(id?: string | null) {
  if (!id) return null;
  return sqlite.prepare("SELECT id, name FROM categories WHERE id = ?").get(id) || null;
}

export function genreById(id?: string | null) {
  if (!id) return null;
  return sqlite.prepare("SELECT id, name FROM genres WHERE id = ?").get(id) || null;
}

export function videoCategoryById(id?: string | null) {
  if (!id) return null;
  return sqlite.prepare("SELECT id, name FROM video_categories WHERE id = ?").get(id) || null;
}

export function userById(id?: string | null) {
  if (!id) return null;
  const row = sqlite.prepare("SELECT * FROM users WHERE id = ?").get(id) as any;
  return row ? toPublicUser(row) : null;
}

export function serializeBook(row: any) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    description: row.description || "",
    image: row.image,
    youtube_url: row.youtube_url,
    library_url: row.library_url,
    file: row.file,
    is_premium: !!row.is_premium,
    avg_rating: Number(row.avg_rating || 0),
    year: row.year,
    language: row.language,
    pages: row.pages,
    category: categoryById(row.category_id),
    genre: genreById(row.genre_id),
    created_at: row.created_at,
  };
}

export function serializeMessage(row: any) {
  return {
    id: row.id,
    content: row.content,
    sender: userById(row.sender_id),
    created_at: row.created_at,
    message_type: row.message_type || "text",
    file: row.file,
    link_preview: detectLinkPreview(row.content),
  };
}

export function serializeVideo(row: any) {
  const category = videoCategoryById(row.category_id) as any;
  const comments = sqlite.prepare(`
    SELECT c.id, c.text, c.created_at, u.id AS user_id, u.username, u.email, u.avatar
    FROM comments c
    LEFT JOIN users u ON u.id = c.user_id
    WHERE c.video_id = ?
    ORDER BY c.created_at ASC
  `).all(row.id) as any[];
  const sourceType = detectVideoSource(row.video, row.video_embed);

  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    video: row.video,
    video_embed: row.video_embed,
    file: isLocalUploadUrl(row.video) ? row.video : null,
    cover: row.cover,
    uploader: userById(row.uploader_id),
    category,
    category_name: category?.name || null,
    source_type: sourceType,
    likes_count: Number(row.likes_count || 0),
    views: Number(row.views || 0),
    is_liked: false,
    comments: comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      created_at: comment.created_at,
      user: comment.user_id
        ? {
            id: comment.user_id,
            username: comment.username,
            email: comment.email,
            avatar: comment.avatar,
          }
        : null,
    })),
    created_at: row.created_at,
  };
}

export function serializeLiveSession(row: any) {
  const participants = sqlite
    .prepare("SELECT COUNT(*) AS count FROM live_participants WHERE session_id = ? AND status = 'approved'")
    .get(row.id) as { count: number };
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    streamer: userById(row.streamer_id),
    status: row.status,
    participants_count: participants.count,
    cover: row.cover,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
