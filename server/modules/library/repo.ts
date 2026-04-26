import { createId, nowIso, sqlite } from "../../core/db";

export const libraryRepo = {
  listBooks(search?: string, category?: string) {
    const filters: string[] = [];
    const params: unknown[] = [];
    if (search) {
      filters.push("(lower(title) LIKE lower(?) OR lower(author) LIKE lower(?))");
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      filters.push("category_id = ?");
      params.push(category);
    }
    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    return sqlite.prepare(`SELECT * FROM books ${where} ORDER BY created_at DESC`).all(...params) as any[];
  },
  getBook(id: string) {
    return sqlite.prepare("SELECT * FROM books WHERE id = ?").get(id) as any;
  },
  createBook(data: any) {
    const id = createId("book");
    sqlite.prepare(`
      INSERT INTO books (id, title, author, description, image, youtube_url, library_url, file, is_premium, year, language, pages, category_id, genre_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.title,
      data.author,
      data.description || "",
      data.image || null,
      data.youtube_url || null,
      data.library_url || null,
      data.file || null,
      data.is_premium ? 1 : 0,
      data.year || null,
      data.language || null,
      data.pages || null,
      data.category_id || null,
      data.genre_id || null,
      nowIso(),
    );
    return this.getBook(id);
  },
};
