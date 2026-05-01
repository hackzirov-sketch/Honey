import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors";
import { ZodError } from "zod";
import { config } from "../../../config";
import { authService, type AuthenticatedUser, type TokenPair, type SessionInfo } from "../services/auth.service";
import { authRecoveryService } from "../services/auth-recovery.service";
import {
  RegisterDtoSchema,
  LoginDtoSchema,
  RefreshDtoSchema,
  ChangePasswordDtoSchema,
  ForgotPasswordDtoSchema,
  ResetPasswordDtoSchema,
  RequestEmailVerificationDtoSchema,
  VerifyEmailDtoSchema,
  UpdateProfileDtoSchema,
} from "../dto/auth.dto";
import type {
  RegisterDto,
  LoginDto,
  RefreshDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  RequestEmailVerificationDto,
  VerifyEmailDto,
  UpdateProfileDto,
} from "../dto/auth.dto";

// ─── Extend Express Request ───────────────────────────────────────────────────

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      sessionJti?: string;
    }
  }
}

// ─── Response Helpers ────────────────────────────────────────────────────────

function sendSuccess(res: Response, data: unknown, statusCode: number = 200): void {
  res.status(statusCode).json({
    success: true,
    data,
  });
}

// ─── Zod validation helper ───────────────────────────────────────────────────

function parseDto<T>(schema: { parse: (data: unknown) => T }, body: unknown): T {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const details: Record<string, string[]> = {};
      const fieldErrors = error.flatten().fieldErrors;
      for (const [field, messages] of Object.entries(fieldErrors)) {
        if (messages && messages.length > 0) {
          details[field] = messages;
        }
      }
      throw new AppError("Validation failed", 400, "VALIDATION_ERROR", details);
    }
    throw error;
  }
}

// ─── Auth Controllers ────────────────────────────────────────────────────────

export const authController = {
  /**
   * POST /register
   * Validate registration data, create user, return tokens + user.
   */
  register(req: Request, res: Response, next: NextFunction): void {
    try {
      const dto: RegisterDto = parseDto(RegisterDtoSchema, req.body);

      void authService
        .register(dto)
        .then((result) => sendSuccess(res, result, 201))
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * POST /login
   * Validate credentials, authenticate user, return tokens + user.
   */
  login(req: Request, res: Response, next: NextFunction): void {
    try {
      const dto: LoginDto = parseDto(LoginDtoSchema, req.body);
      const deviceInfo = {
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip ?? req.socket.remoteAddress,
      };

      void authService
        .login(dto.emailOrUsername, dto.password, deviceInfo)
        .then((result) => sendSuccess(res, result, 200))
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * POST /refresh
   * Validate refresh token, rotate token pair, return new tokens.
   */
  refresh(req: Request, res: Response, next: NextFunction): void {
    try {
      const dto: RefreshDto = parseDto(RefreshDtoSchema, req.body);

      void authService
        .refreshToken(dto.refreshToken)
        .then((tokens: TokenPair) => sendSuccess(res, tokens, 200))
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * POST /verify-email/request
   * Generate and send an email verification token.
   * - If authenticated: uses current user's email.
   * - If unauthenticated: requires email in body.
   */
  requestEmailVerification(req: Request, res: Response, next: NextFunction): void {
    try {
      const dto: RequestEmailVerificationDto = parseDto(
        RequestEmailVerificationDtoSchema,
        req.body ?? {},
      );

      const userId = req.userId;

      const task = userId
        ? authRecoveryService.issueEmailVerificationForUserId(userId)
        : dto.email
          ? authRecoveryService.requestEmailVerificationByEmail(dto.email)
          : Promise.reject(
              new AppError(
                "Email is required when unauthenticated",
                400,
                "VALIDATION_ERROR",
              ),
            );

      void task
        .then((result) =>
          sendSuccess(
            res,
            {
              message:
                "If an account exists and is not verified, a verification email has been sent",
              ...(result.devToken && !config.isProduction
                ? { devVerificationToken: result.devToken, expiresAt: result.expiresAt }
                : {}),
            },
            200,
          ),
        )
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * POST /verify-email
   * Verify account email using token or code.
   */
  verifyEmail(req: Request, res: Response, next: NextFunction): void {
    try {
      const dto: VerifyEmailDto = parseDto(VerifyEmailDtoSchema, req.body ?? {});
      const token = (dto.token ?? dto.code ?? "").trim();

      void authRecoveryService
        .verifyEmailToken(token)
        .then((result) =>
          sendSuccess(
            res,
            {
              message: "Email verified successfully",
              email: result.email,
              userId: result.userId,
            },
            200,
          ),
        )
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * POST /logout
   * Requires authentication. Deactivates session and revokes refresh tokens.
   */
  logout(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.userId;
      if (!userId) {
        return next(new AppError("User not authenticated", 401));
      }

      void authService
        .logout(userId, null)
        .then(() => sendSuccess(res, { message: "Logged out successfully" }, 200))
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * GET /me
   * Requires authentication. Returns the full user profile.
   */
  me(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.userId;
      if (!userId) {
        return next(new AppError("User not authenticated", 401));
      }

      void authService
        .getUserById(userId)
        .then((user: AuthenticatedUser) => sendSuccess(res, user, 200))
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * PATCH /profile
   * Requires authentication. Updates user profile fields.
   */
  updateProfile(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.userId;
      if (!userId) {
        return next(new AppError("User not authenticated", 401));
      }

      const dto: UpdateProfileDto = parseDto(UpdateProfileDtoSchema, req.body);

      void authService
        .updateProfile(userId, dto)
        .then((user: AuthenticatedUser) => sendSuccess(res, user, 200))
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * PATCH /password
   * Requires authentication. Changes the user's password.
   */
  changePassword(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.userId;
      if (!userId) {
        return next(new AppError("User not authenticated", 401));
      }

      const dto: ChangePasswordDto = parseDto(ChangePasswordDtoSchema, req.body);

      void authService
        .changePassword(userId, dto.currentPassword, dto.newPassword)
        .then(() =>
          sendSuccess(res, { message: "Password changed successfully" }, 200),
        )
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * POST /forgot-password
   * Validates email, sends reset token. Always returns success.
   */
  forgotPassword(req: Request, res: Response, next: NextFunction): void {
    try {
      const dto: ForgotPasswordDto = parseDto(ForgotPasswordDtoSchema, req.body);

      void authRecoveryService
        .requestPasswordReset(dto.email)
        .then((result) =>
          sendSuccess(
            res,
            {
              message:
                "If an account with this email exists, a reset link has been sent",
              ...(result.devToken && !config.isProduction
                ? { devResetToken: result.devToken, expiresAt: result.expiresAt }
                : {}),
            },
            200,
          ),
        )
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * POST /reset-password
   * Validates token + new password, resets the user's password.
   */
  resetPassword(req: Request, res: Response, next: NextFunction): void {
    try {
      const dto: ResetPasswordDto = parseDto(ResetPasswordDtoSchema, req.body);

      void authRecoveryService
        .resetPasswordWithToken(dto.token, dto.newPassword)
        .then(() =>
          sendSuccess(
            res,
            { message: "Password has been reset successfully" },
            200,
          ),
        )
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * DELETE /account
   * Requires authentication. Soft-deletes the user's account.
   */
  deleteAccount(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.userId;
      if (!userId) {
        return next(new AppError("User not authenticated", 401));
      }

      void authService
        .deleteAccount(userId)
        .then(() =>
          sendSuccess(
            res,
            { message: "Account deleted successfully" },
            200,
          ),
        )
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * GET /sessions
   * Requires authentication. Lists all sessions for the user.
   */
  getSessions(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.userId;
      if (!userId) {
        return next(new AppError("User not authenticated", 401));
      }

      void authService
        .getSessions(userId)
        .then((sessions: SessionInfo[]) => sendSuccess(res, sessions, 200))
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },

  /**
   * DELETE /sessions/:sessionId
   * Requires authentication. Revokes a specific session.
   */
  revokeSession(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.userId;
      if (!userId) {
        return next(new AppError("User not authenticated", 401));
      }

      const { sessionId } = req.params;
      if (!sessionId) {
        return next(new AppError("Session ID is required", 400));
      }

      void authService
        .revokeSession(userId, sessionId)
        .then(() =>
          sendSuccess(
            res,
            { message: "Session revoked successfully" },
            200,
          ),
        )
        .catch((error: unknown) => {
          if (error instanceof AppError) return next(error);
          next(error);
        });
    } catch (error) {
      if (error instanceof AppError) return next(error);
      next(error);
    }
  },
};
