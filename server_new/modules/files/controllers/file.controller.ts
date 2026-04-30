import type { Request, Response, NextFunction } from "express";
import { fileService } from "../services/file.service";
import { uploadFileDtoSchema, fileListQuerySchema } from "../dto/file.dto";
import { ValidationError } from "../../../errors";
import { AuthenticatedRequest, FileUploadCategory } from "../../../types";

async function uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const file = (req as unknown as { file?: Express.Multer.File }).file;

    if (!file) {
      throw new ValidationError({ file: ["File is required"] });
    }

    const type: FileUploadCategory =
      (req.body?.type as FileUploadCategory) ?? "message";

    // Validate the type field via Zod
    uploadFileDtoSchema.parse({ type });

    const result = await fileService.uploadFile(authReq.user.id, file, type);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getFile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const file = await fileService.getFile(id);
    res.json(file);
  } catch (error) {
    next(error);
  }
}

async function deleteFile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const { id } = req.params;

    const result = await fileService.deleteFile(authReq.user.id, id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getFilesByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const dto = fileListQuerySchema.parse({
      cursor: req.query.cursor as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    });

    const result = await fileService.getFilesByUser(
      authReq.user.id,
      dto.cursor,
      dto.limit,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export const fileController = {
  uploadFile,
  getFile,
  deleteFile,
  getFilesByUser,
};
