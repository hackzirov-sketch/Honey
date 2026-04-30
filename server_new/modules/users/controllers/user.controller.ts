import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import {
  updateUserDtoSchema,
  changePasswordDtoSchema,
  searchUsersDtoSchema,
} from "../dto/user.dto";
import { ValidationError, NotFoundError } from "../../../errors";
import { AuthenticatedRequest } from "../../../types";

async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const profile = await userService.getUserProfile(authReq.user.id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

async function getUserByUsername(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username } = req.params;
    const authReq = req as AuthenticatedRequest;
    const viewerId = authReq.user?.id;

    if (!username || username.length < 1) {
      res.status(400).json({ message: "Username is required" });
      return;
    }

    const profile = await userService.getUserByUsername(username, viewerId);
    res.json(profile);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    next(error);
  }
}

async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const result = updateUserDtoSchema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path.join("."));
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }
      throw new ValidationError(details);
    }

    const profile = await userService.updateProfile(authReq.user.id, result.data);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

async function updateAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const file = (req as unknown as { file?: Express.Multer.File }).file;

    if (!file) {
      throw new ValidationError({ file: ["File is required"] });
    }

    // In production, save file to storage and get URL
    // For now, construct URL from stored path
    const fileUrl = `/uploads/${file.filename}`;
    const result = await userService.updateAvatar(authReq.user.id, fileUrl);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateBanner(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const file = (req as unknown as { file?: Express.Multer.File }).file;

    if (!file) {
      throw new ValidationError({ file: ["File is required"] });
    }

    const fileUrl = `/uploads/${file.filename}`;
    const result = await userService.updateBanner(authReq.user.id, fileUrl);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function searchUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = req.query.q as string | undefined;

    if (!query || query.length < 2) {
      res.status(400).json({ message: "Search query must be at least 2 characters" });
      return;
    }

    const dto = searchUsersDtoSchema.parse({
      query,
      cursor: req.query.cursor as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    });

    const result = await userService.searchUsers(dto.query, dto.cursor, dto.limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getUserStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const stats = await userService.getUserStats(id);
    res.json(stats);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    next(error);
  }
}

async function changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const result = changePasswordDtoSchema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path.join("."));
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }
      throw new ValidationError(details);
    }

    await userService.changePassword(
      authReq.user.id,
      result.data.currentPassword,
      result.data.newPassword,
    );
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
}

export const userController = {
  getMe,
  getUserByUsername,
  updateProfile,
  updateAvatar,
  updateBanner,
  searchUsers,
  getUserStats,
  changePassword,
};
