import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

type UploadedFile = {
  buffer: Buffer;
  originalname?: string;
};

export const uploadRoot = path.resolve(process.cwd(), "uploads");

function safeFileName(originalName?: string) {
  const parsed = path.parse(originalName || "file");
  const base = (parsed.name || "file")
    .replace(/[^\w.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "file";
  const ext = parsed.ext.replace(/[^\w.]+/g, "").slice(0, 16).toLowerCase();
  return `${Date.now()}-${randomUUID()}-${base}${ext}`;
}

export function saveUploadedFile(file?: UploadedFile | null) {
  if (!file) return null;

  fs.mkdirSync(uploadRoot, { recursive: true });
  const filename = safeFileName(file.originalname);
  const destination = path.resolve(uploadRoot, filename);
  const allowedPrefix = `${uploadRoot}${path.sep}`;

  if (!destination.startsWith(allowedPrefix)) {
    throw new Error("Invalid upload path");
  }

  fs.writeFileSync(destination, file.buffer);
  return `/uploads/${encodeURIComponent(filename)}`;
}
