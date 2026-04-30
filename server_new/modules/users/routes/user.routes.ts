import { Router } from "express";
import multer from "multer";
import { userController } from "../controllers/user.controller";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for avatar/banner"));
    }
  },
});

/**
 * @route   GET /users/me
 * @desc    Get authenticated user's full profile
 */
router.get("/me", userController.getMe);

/**
 * @route   GET /users/:username
 * @desc    Get public profile by username
 */
router.get("/:username", userController.getUserByUsername);

/**
 * @route   PATCH /users/profile
 * @desc    Update authenticated user's profile
 */
router.patch("/profile", userController.updateProfile);

/**
 * @route   PATCH /users/avatar
 * @desc    Update avatar image
 */
router.patch("/avatar", upload.single("file"), userController.updateAvatar);

/**
 * @route   PATCH /users/banner
 * @desc    Update banner image
 */
router.patch("/banner", upload.single("file"), userController.updateBanner);

/**
 * @route   GET /users/search
 * @desc    Search users by query
 */
router.get("/search", userController.searchUsers);

/**
 * @route   GET /users/:id/stats
 * @desc    Get user statistics
 */
router.get("/:id/stats", userController.getUserStats);

export const userRoutes = router;
