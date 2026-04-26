import { Router } from "express";
import { asyncHandler } from "../../core/http";
import { authRequired, staffRequired } from "../../core/middleware";
import { createBookSchema, downloadBookSchema } from "./schema";
import { libraryService } from "./service";

export function libraryRoutes() {
  const router = Router();

  router.get("/books/", authRequired, (req, res) => {
    res.json(libraryService.listBooks(String(req.query.search || ""), req.query.category ? String(req.query.category) : undefined));
  });
  router.post("/books/", authRequired, staffRequired, asyncHandler(async (req, res) => {
    res.status(201).json(libraryService.createBook(createBookSchema.parse(req.body)));
  }));
  router.get("/books/:id/", authRequired, (req, res) => res.json(libraryService.getBook(String(req.params.id))));

  router.get("/user-books/", authRequired, (req, res) => res.json(libraryService.userBooks(req.user!.id)));
  router.post("/user-books/download/", authRequired, (req, res) => {
    const data = downloadBookSchema.parse(req.body);
    res.status(201).json(libraryService.downloadBook(req.user!.id, data.book_id));
  });
  router.delete("/user-books/:id/", authRequired, (req, res) => {
    libraryService.removeUserBook(req.user!.id, String(req.params.id));
    res.status(204).end();
  });

  router.get("/categories/", (_req, res) => res.json(libraryService.categories()));
  router.get("/genres/", (_req, res) => res.json(libraryService.genres()));

  return router;
}
