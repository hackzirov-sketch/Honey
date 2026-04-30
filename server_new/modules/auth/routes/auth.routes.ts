import { Router } from "express";
import { authRateLimiter } from "../../../middleware/rateLimit";
import { authenticate } from "../guards/auth.guard";
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

/**
 * PATCH /password
 * Change the authenticated user's password.
 * Requires current password verification.
 */
router.patch("/password", authenticate, authController.changePassword);

/**
 * DELETE /account
 * Soft-delete the authenticated user's account.
 */
router.delete("/account", authenticate, authController.deleteAccount);

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
