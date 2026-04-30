import { Router } from "express";
import multer from "multer";
import { fileController } from "../controllers/file.controller";
import { config } from "../../../config";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.MAX_FILE_SIZE,
  },
});

/**
 * @route   POST /files/upload
 * @desc    Upload a file (multipart form)
 */
router.post("/upload", upload.single("file"), fileController.uploadFile);

/**
 * @route   GET /files
 * @desc    List authenticated user's uploads (paginated)
 */
router.get("/", fileController.getFilesByUser);

/**
 * @route   GET /files/:id
 * @desc    Get file metadata
 */
router.get("/:id", fileController.getFile);

/**
 * @route   DELETE /files/:id
 * @desc    Delete a file (only uploader can delete)
 */
router.delete("/:id", fileController.deleteFile);

export const fileRoutes = router;
