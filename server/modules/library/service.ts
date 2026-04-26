import { createId, nowIso, sqlite } from "../../core/db";
import { HttpError } from "../../core/http";
import { serializeBook } from "../../core/serializers";
import { libraryRepo } from "./repo";

export const libraryService = {
  listBooks(search?: string, category?: string) {
    return libraryRepo.listBooks(search, category).map(serializeBook);
  },
  getBook(id: string) {
    const book = libraryRepo.getBook(id);
    if (!book) throw new HttpError(404, "Book not found");
    return serializeBook(book);
  },
  createBook(data: any) {
    return serializeBook(libraryRepo.createBook(data));
  },
  userBooks(userId: string) {
    const rows = sqlite.prepare(`
      SELECT ub.*, b.title, b.author, b.description, b.image, b.youtube_url, b.library_url, b.file, b.is_premium,
             b.avg_rating, b.year, b.language, b.pages, b.category_id, b.genre_id, b.created_at AS book_created_at
      FROM user_books ub
      JOIN books b ON b.id = ub.book_id
      WHERE ub.user_id = ?
      ORDER BY ub.downloaded_at DESC
    `).all(userId) as any[];
    return rows.map((row) => ({
      id: row.id,
      downloaded_at: row.downloaded_at,
      is_read: !!row.is_read,
      book: serializeBook({
        id: row.book_id,
        title: row.title,
        author: row.author,
        description: row.description,
        image: row.image,
        youtube_url: row.youtube_url,
        library_url: row.library_url,
        file: row.file,
        is_premium: row.is_premium,
        avg_rating: row.avg_rating,
        year: row.year,
        language: row.language,
        pages: row.pages,
        category_id: row.category_id,
        genre_id: row.genre_id,
        created_at: row.book_created_at,
      }),
    }));
  },
  downloadBook(userId: string, bookId: string) {
    if (!libraryRepo.getBook(bookId)) throw new HttpError(404, "Book not found");
    try {
      sqlite.prepare("INSERT INTO user_books (id, user_id, book_id, is_read, downloaded_at) VALUES (?, ?, ?, 0, ?)")
        .run(createId("ub"), userId, bookId, nowIso());
    } catch {
      // Already saved is not fatal for the frontend flow.
    }
    return { message: "Kitob mening kitoblarimga qo'shildi" };
  },
  removeUserBook(userId: string, id: string) {
    sqlite.prepare("DELETE FROM user_books WHERE id = ? AND user_id = ?").run(id, userId);
  },
  categories() {
    return sqlite.prepare("SELECT id, name FROM categories ORDER BY name").all();
  },
  genres() {
    return sqlite.prepare("SELECT id, name FROM genres ORDER BY name").all();
  },
};
