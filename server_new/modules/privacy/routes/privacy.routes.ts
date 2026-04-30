import { Router } from "express";
import { privacyController } from "../controllers/privacy.controller";

const router = Router();

/**
 * @route   GET /privacy
 * @desc    Get authenticated user's privacy settings
 */
router.get("/", privacyController.getPrivacySettings);

/**
 * @route   PATCH /privacy
 * @desc    Update authenticated user's privacy settings
 */
router.patch("/", privacyController.updatePrivacySettings);

export const privacyRoutes = router;
