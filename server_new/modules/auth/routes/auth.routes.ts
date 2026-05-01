import { Router, type NextFunction, type Request, type Response } from "express";
import { authRateLimiter } from "../../../middleware/rateLimit";
import { authenticate, optionalAuth } from "../guards/auth.guard";
import { authController } from "../controllers/auth.controller";

const router = Router();

// ─── Public Routes (rate-limited) ─────────────────────────────────────────────

/**
 * POST /register
 * Create a new user account.
 * Rate limited to prevent abuse.
 */
router.post("/register", authRateLimiter, authController.register);

/**
 * POST /login
 * Authenticate with email/username + password.
 * Rate limited to prevent brute-force attacks.
 */
router.post("/login", authRateLimiter, authController.login);

/**
 * POST /refresh
 * Exchange a valid refresh token for a new token pair.
 * Rate limited to prevent token abuse.
 */
router.post("/refresh", authRateLimiter, authController.refresh);

/**
 * POST /verify-email/request
 * Request email verification token (auth optional).
 */
router.post(
  "/verify-email/request",
  authRateLimiter,
  optionalAuth,
  authController.requestEmailVerification,
);

/**
 * POST /forgot-password
 * Request a password reset email.
 * Rate limited to prevent email spam.
 */
router.post("/forgot-password", authRateLimiter, authController.forgotPassword);

/**
 * POST /reset-password
 * Reset password using a token from forgot-password flow.
 * Not rate-limited separately (token acts as protection).
 */
router.post("/reset-password", authController.resetPassword);

// Legacy compatibility: old clients used /token/refresh with refresh or refresh_token body key
router.post(
  "/token/refresh",
  authRateLimiter,
  (req: Request, res: Response, next: NextFunction) => {
    const refreshToken =
      typeof req.body?.refreshToken === "string"
        ? req.body.refreshToken
        : typeof req.body?.refresh === "string"
          ? req.body.refresh
          : typeof req.body?.refresh_token === "string"
            ? req.body.refresh_token
            : "";
    req.body = { refreshToken };
    authController.refresh(req, res, next);
  },
);

// Legacy compatibility: email verification was required in old backend
router.post("/verify-email", authRateLimiter, authController.verifyEmail);
router.post("/email/verify", authRateLimiter, authController.verifyEmail);
router.post(
  "/email/verify/request",
  authRateLimiter,
  optionalAuth,
  authController.requestEmailVerification,
);

// ─── Protected Routes (require authentication) ───────────────────────────────

/**
 * POST /logout
 * Deactivate the current session.
 */
router.post("/logout", authenticate, authController.logout);

/**
 * GET /me
 * Fetch the authenticated user's full profile.
 */
router.get("/me", authenticate, authController.me);

/**
 * PATCH /profile
 * Update the authenticated user's profile fields.
 */
router.patch("/profile", authenticate, authController.updateProfile);

// Legacy compatibility aliases
router.get("/profile", authenticate, authController.me);
router.patch("/profile/update", authenticate, authController.updateProfile);

/**
 * PATCH /password
 * Change the authenticated user's password.
 * Requires current password verification.
 */
router.patch("/password", authenticate, authController.changePassword);

// Legacy compatibility: old body keys old_password/new_password/confirm_password
router.post(
  "/profile/change-password",
  authenticate,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = {
      currentPassword:
        typeof req.body?.currentPassword === "string"
          ? req.body.currentPassword
          : typeof req.body?.old_password === "string"
            ? req.body.old_password
            : "",
      newPassword:
        typeof req.body?.newPassword === "string"
          ? req.body.newPassword
          : typeof req.body?.new_password === "string"
            ? req.body.new_password
            : "",
    };
    authController.changePassword(req, res, next);
  },
);

/**
 * DELETE /account
 * Soft-delete the authenticated user's account.
 */
router.delete("/account", authenticate, authController.deleteAccount);
router.delete("/profile/delete", authenticate, authController.deleteAccount);

router.get("/profile/stats", authenticate, (_req, res) => {
  res.json({
    success: true,
    data: {
      books_count: 0,
      messages_count: 0,
      live_sessions_count: 0,
      achievements_count: 0,
    },
  });
});

// ─── Session Management (require authentication) ──────────────────────────────

/**
 * GET /sessions
 * List all sessions (active + inactive) for the authenticated user.
 */
router.get("/sessions", authenticate, authController.getSessions);

/**
 * DELETE /sessions/:sessionId
 * Revoke a specific session by ID.
 */
router.delete(
  "/sessions/:sessionId",
  authenticate,
  authController.revokeSession,
);

export const authRoutes = router;
export default router;
