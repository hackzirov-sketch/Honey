import type { Request, Response, NextFunction } from "express";
import { privacyService } from "../services/privacy.service";
import { updatePrivacyDtoSchema } from "../dto/privacy.dto";
import { ValidationError } from "../../../errors";
import { AuthenticatedRequest } from "../../../types";

async function getPrivacySettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const settings = await privacyService.getPrivacySettings(authReq.user.id);
    res.json(settings);
  } catch (error) {
    next(error);
  }
}

async function updatePrivacySettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authReq = req as AuthenticatedRequest;
    const result = updatePrivacyDtoSchema.safeParse(req.body);

    if (!result.success) {
      const details: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path.join("."));
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
      }
      throw new ValidationError(details);
    }

    const settings = await privacyService.updatePrivacySettings(
      authReq.user.id,
      result.data,
    );
    res.json(settings);
  } catch (error) {
    next(error);
  }
}

export const privacyController = {
  getPrivacySettings,
  updatePrivacySettings,
};
