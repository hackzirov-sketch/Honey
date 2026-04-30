import fs from "fs";
import path from "path";
import crypto from "crypto";
import { prisma } from "../../../config/prisma";
import { env } from "../../../config";
import { NotFoundError, ForbiddenError, ValidationError } from "../../../errors";
import { logger } from "../../../utils/logger";
import type { SafeFile, FileUploadCategory, PaginatedResult } from "../../../types";

const log = logger.info("FileService");

// ── MIME type categories ──────────────────────────────────────
const ALLOWED_MIME_TYPES: Record<FileUploadCategory, string[]> = {
  avatar: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
  banner: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
  message: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "audio/webm",
    "application/pdf",
    "application/msword",
    "text/plain",
  ],
  video: [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ],
  voice: [
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "audio/webm",
  ],
  document: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
  ],
};

// ── File size limits in bytes ─────────────────────────────────
const FILE_SIZE_LIMITS: Record<FileUploadCategory, number> = {
  avatar: 5 * 1024 * 1024,       // 5MB
  banner: 10 * 1024 * 1024,      // 10MB
  message: 10 * 1024 * 1024,     // 10MB for message images
  video: 100 * 1024 * 1024,      // 100MB
  voice: 20 * 1024 * 1024,       // 20MB
  document: 50 * 1024 * 1024,    // 50MB
};

function validateMimeType(mimeType: string, category: FileUploadCategory): void {
  const allowed = ALLOWED_MIME_TYPES[category];
  if (!allowed.includes(mimeType)) {
    throw new ValidationError({
      file: [`File type "${mimeType}" is not allowed for ${category}. Allowed: ${allowed.join(", ")}`],
    });
  }
}

function validateFileSize(fileSize: number, category: FileUploadCategory): void {
  const limit = FILE_SIZE_LIMITS[category];
  if (fileSize > limit) {
    const limitMB = Math.round(limit / (1024 * 1024));
    throw new ValidationError({
      file: [`File size exceeds the ${limitMB}MB limit for ${category} uploads`],
    });
  }
}

function generateStoredName(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  const unique = crypto.randomUUID();
  const timestamp = Date.now().toString(36);
  return `${timestamp}-${unique}${ext}`;
}

function getSubDirectory(category: FileUploadCategory): string {
  switch (category) {
    case "avatar":
      return "avatars";
    case "banner":
      return "banners";
    case "message":
      return "messages";
    case "video":
      return "videos";
    case "voice":
      return "voice";
    case "document":
      return "documents";
  }
}

async function uploadFile(
  userId: string,
  file: Express.Multer.File,
  type: FileUploadCategory = "message",
): Promise<SafeFile> {
  // Validate
  validateMimeType(file.mimetype, type);
  validateFileSize(file.size, type);

  const storedName = generateStoredName(file.originalname);
  const subDir = getSubDirectory(type);
  const storagePath = path.join(config.UPLOAD_PATH, subDir, storedName);
  const fullStoragePath = path.resolve(storagePath);

  // Ensure directory exists
  const dirPath = path.dirname(fullStoragePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Save file to disk
  fs.writeFileSync(fullStoragePath, file.buffer);

  // Compute checksum
  const hash = crypto.createHash("sha256");
  hash.update(file.buffer);
  const checksum = hash.digest("hex");

  // Create database record
  const metadata = await prisma.fileMetadata.create({
    data: {
      uploaderId: userId,
      originalName: file.originalname,
      storedName,
      mimeType: file.mimetype,
      fileSize: BigInt(file.size),
      storagePath,
    },
  });

  log.info("File uploaded", {
    fileId: metadata.id,
    userId,
    type,
    size: file.size,
    mimeType: file.mimetype,
  });

  return {
    id: metadata.id,
    originalName: metadata.originalName,
    storedName: metadata.storedName,
    mimeType: metadata.mimeType,
    fileSize: metadata.fileSize,
    storagePath: metadata.storagePath,
    thumbnailPath: metadata.thumbnailPath,
    width: metadata.width,
    height: metadata.height,
    duration: metadata.duration,
    createdAt: metadata.createdAt,
  };
}

async function getFile(fileId: string): Promise<SafeFile> {
  const metadata = await prisma.fileMetadata.findUnique({
    where: { id: fileId },
  });

  if (!metadata) {
    throw new NotFoundError("File", fileId);
  }

  return {
    id: metadata.id,
    originalName: metadata.originalName,
    storedName: metadata.storedName,
    mimeType: metadata.mimeType,
    fileSize: metadata.fileSize,
    storagePath: metadata.storagePath,
    thumbnailPath: metadata.thumbnailPath,
    width: metadata.width,
    height: metadata.height,
    duration: metadata.duration,
    createdAt: metadata.createdAt,
  };
}

async function deleteFile(
  userId: string,
  fileId: string,
): Promise<{ deleted: boolean }> {
  const metadata = await prisma.fileMetadata.findUnique({
    where: { id: fileId },
    select: { uploaderId: true, storagePath: true },
  });

  if (!metadata) {
    throw new NotFoundError("File", fileId);
  }

  if (metadata.uploaderId !== userId) {
    throw new ForbiddenError("You can only delete your own files");
  }

  // Delete from disk
  const fullPath = path.resolve(metadata.storagePath);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      log.warn("Failed to delete file from disk", {
        path: fullPath,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // Delete from database
  await prisma.fileMetadata.delete({
    where: { id: fileId },
  });

  log.info("File deleted", { fileId, userId });

  return { deleted: true };
}

async function getFilesByUser(
  userId: string,
  cursor?: string,
  limit: number = 30,
): Promise<PaginatedResult<SafeFile>> {
  const where = cursor
    ? { uploaderId: userId, createdAt: { lt: new Date(cursor) } }
    : { uploaderId: userId };

  const files = await prisma.fileMetadata.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = files.length > limit;
  const data = hasMore ? files.slice(0, limit) : files;

  return {
    data: data.map((f) => ({
      id: f.id,
      originalName: f.originalName,
      storedName: f.storedName,
      mimeType: f.mimeType,
      fileSize: f.fileSize,
      storagePath: f.storagePath,
      thumbnailPath: f.thumbnailPath,
      width: f.width,
      height: f.height,
      duration: f.duration,
      createdAt: f.createdAt,
    })),
    nextCursor: hasMore
      ? data[data.length - 1].createdAt.toISOString()
      : null,
    hasMore,
  };
}

export const fileService = {
  uploadFile,
  getFile,
  deleteFile,
  getFilesByUser,
  ALLOWED_MIME_TYPES,
  FILE_SIZE_LIMITS,
};
