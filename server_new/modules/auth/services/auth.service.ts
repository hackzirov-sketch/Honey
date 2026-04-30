import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { prisma } from '../../../config/prisma';
import { config } from '../../../config';
import { AppError, AuthError, ConflictError, NotFoundError, ValidationError } from '../../../errors';
import { logger } from '../../../utils/logger';
import type {
  RegisterDto,
  LoginDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateProfileDto,
  DeviceInfo,
} from "../dto/auth.dto";

// ─── JWT Payload Types ────────────────────────────────────────────────────────

interface AccessTokenPayload {
  userId: string;
  username: string;
  jti: string;
  type: "access";
}

interface RefreshTokenPayload {
  userId: string;
  jti: string;
  type: "refresh";
}

// ─── Public Types ─────────────────────────────────────────────────────────────

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticatedUser {
  id: string;
  username: string;
  email: string;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  website: string | null;
  location: string | null;
  isVerified: boolean;
  isBanned: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  lastSeen: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionInfo {
  id: string;
  userId: string;
  jti: string;
  userAgent: string | null;
  ipAddress: string | null;
  isActive: boolean;
  lastRefreshedAt: Date | null;
  createdAt: Date;
  expiresAt: Date;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BCRYPT_ROUNDS = 12;
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY_DAYS = 7;
const RESET_TOKEN_EXPIRY_SECONDS = 3600; // 1 hour

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toAuthenticatedUser(
  user: {
    id: string;
    username: string;
    email: string;
    username: string | null;
    bio: string | null;
    avatarUrl: string | null;
    website: string | null;
    location: string | null;
    isVerified: boolean;
    isBanned: boolean;
    isStaff: boolean;
    isSuperuser: boolean;
    lastSeen: Date | null;
    createdAt: Date;
    updatedAt: Date;
  },
): AuthenticatedUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    username: user.username,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    website: user.website,
    location: user.location,
    isVerified: user.isVerified,
    isBanned: user.isBanned,
    isStaff: user.isStaff,
    isSuperuser: user.isSuperuser,
    lastSeen: user.lastSeen,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function calculateRefreshExpiry(): Date {
  const date = new Date();
  date.setDate(date.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);
  return date;
}

// ─── Auth Service ─────────────────────────────────────────────────────────────

export const authService = {
  /**
   * Register a new user.
   * Checks uniqueness, hashes password, creates user + profile + privacy settings,
   * creates a session, and returns tokens + user.
   */
  async register(data: RegisterDto): Promise<{ tokens: TokenPair; user: AuthenticatedUser }> {
    const normalizedEmail = data.email.toLowerCase().trim();
    const normalizedUsername = data.username.toLowerCase().trim();

    // ── Uniqueness checks ────────────────────────────────────────────────────
    const existingByEmail = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existingByEmail) {
      throw new ConflictError("Email is already registered");
    }

    const existingByUsername = await prisma.user.findUnique({
      where: { username: normalizedUsername },
    });
    if (existingByUsername) {
      throw new ConflictError("Username is already taken");
    }

    // ── Hash password ────────────────────────────────────────────────────────
    const passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

    // ── Create user with profile and privacy settings in a transaction ────────
    const user = await prisma.$transaction(async (tx) => {
      return tx.user.create({
        data: {
          username: normalizedUsername,
          email: normalizedEmail,
          passwordHash,
          profile: {
            create: {},
          },
        },
      });
    });

    // ── Generate tokens ──────────────────────────────────────────────────────
    const tokens = await authService.generateTokenPair(user.id, user.username);

    // ── Store session ────────────────────────────────────────────────────────
    const refreshPayload = jwt.verify(
      tokens.refreshToken,
      config.JWT_SECRET,
    ) as RefreshTokenPayload;

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: calculateRefreshExpiry(),
      },
    });

    logger.info(`User registered: ${user.id} (${user.username})`);

    return { tokens, user: toAuthenticatedUser(user) };
  },

  /**
   * Login with email/username and password.
   * Finds user, verifies password, checks ban status,
   * creates session + refresh token, returns tokens + user.
   */
  async login(
    emailOrUsername: string,
    password: string,
    deviceInfo?: DeviceInfo,
  ): Promise<{ tokens: TokenPair; user: AuthenticatedUser }> {
    const normalizedLogin = emailOrUsername.trim().toLowerCase();

    // ── Find user by email or username ───────────────────────────────────────
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedLogin },
          { username: normalizedLogin },
        ],
      },
    });

    if (!user) {
      // Use a generic message to prevent user enumeration
      throw new AuthError("Invalid email/username or password");
    }

    // ── Verify password ──────────────────────────────────────────────────────
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AuthError("Invalid email/username or password");
    }

    // ── Check ban status ─────────────────────────────────────────────────────
    if (user.isBanned) {
      throw new AuthError("This account has been suspended");
    }

    // ── Generate tokens ──────────────────────────────────────────────────────
    const tokens = await authService.generateTokenPair(user.id, user.username);

    // ── Store session ────────────────────────────────────────────────────────
    const refreshPayload = jwt.verify(
      tokens.refreshToken,
      config.JWT_SECRET,
    ) as RefreshTokenPayload;

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        userAgent: deviceInfo?.userAgent ?? null,
        ipAddress: deviceInfo?.ipAddress ?? null,
        expiresAt: calculateRefreshExpiry(),
      },
    });

    // ── Update last seen ─────────────────────────────────────────────────────
    await prisma.user.update({
      where: { id: user.id },
      data: { lastSeen: new Date() },
    });

    logger.info(`User logged in: ${user.id} (${user.username})`);

    return { tokens, user: toAuthenticatedUser(user) };
  },

  /**
   * Refresh an access token using a refresh token.
   * Verifies the refresh token, checks it's not revoked or expired,
   * rotates the token pair, and returns new tokens.
   */
  async refreshToken(refreshToken: string): Promise<TokenPair> {
    // ── Verify the refresh token JWT ─────────────────────────────────────────
    let payload: RefreshTokenPayload;
    try {
      payload = jwt.verify(refreshToken, config.JWT_SECRET) as RefreshTokenPayload;
    } catch {
      throw new AuthError("Invalid refresh token");
    }

    if (payload.type !== "refresh") {
      throw new AuthError("Invalid token type");
    }

    // ── Find the session in DB ───────────────────────────────────────────────
    const session = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: { select: { id: true, username: true, isBanned: true } } },
    });

    if (!session) {
      throw new AuthError("Session not found");
    }

    // ── Check if revoked ─────────────────────────────────────────────────────
    if (!session.isActive) {
      throw new AuthError("Refresh token has been revoked");
    }

    // ── Check if expired ─────────────────────────────────────────────────────
    if (session.expiresAt < new Date()) {
      await prisma.refreshToken.update({
        where: { id: session.id },
        data: { isRevoked: true },
      });
      throw new AuthError("Refresh token has expired");
    }

    // ── Check if user is banned ──────────────────────────────────────────────
    if (session.user.isBanned) {
      await prisma.refreshToken.updateMany({
        where: { userId: session.userId },
        data: { isRevoked: true },
      });
      throw new AuthError("This account has been suspended");
    }

    // ── Revoke the old refresh token (rotation) ──────────────────────────────
    await prisma.refreshToken.update({
      where: { id: session.id },
      data: {
        isRevoked: true,
        
      },
    });

    // ── Generate new token pair ──────────────────────────────────────────────
    const tokens = await authService.generateTokenPair(
      session.userId,
      session.user.username,
    );

    // ── Create new session for the new refresh token ─────────────────────────
    const newRefreshPayload = jwt.verify(
      tokens.refreshToken,
      config.JWT_SECRET,
    ) as RefreshTokenPayload;

    await prisma.refreshToken.create({
      data: {
        userId: session.userId,
        token: tokens.refreshToken,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        expiresAt: calculateRefreshExpiry(),
      },
    });

    logger.info(`Token refreshed for user: ${session.userId}`);

    return tokens;
  },

  /**
   * Logout: deactivate a specific session (or all sessions for the user).
   */
  async logout(userId: string, sessionId: string | null): Promise<void> {
    if (sessionId) {
      await prisma.refreshToken.updateMany({
        where: { id: sessionId, userId, isRevoked: false },
        data: { isRevoked: true },
      });
    } else {
      await prisma.refreshToken.updateMany({
        where: { userId, isRevoked: false },
        data: { isRevoked: true },
      });
    }

    logger.info(`User logged out: ${userId}`);
  },

  /**
   * Revoke all active sessions for a user, optionally keeping the current one.
   * Returns the count of revoked sessions.
   */
  async revokeAllSessions(userId: string, currentSessionId?: string): Promise<number> {
    const whereClause: {
      userId: string;
      isActive: boolean;
      id?: { not: string };
    } = {
      userId,
      isRevoked: false,
    };

    if (currentSessionId) {
      whereClause.id = { not: currentSessionId };
    }

    const result = await prisma.refreshToken.updateMany({
      where: whereClause,
      data: { isRevoked: true },
    });

    logger.info(`Revoked ${result.count} sessions for user: ${userId}`);

    return result.count;
  },

  /**
   * Change the user's password.
   * Verifies the current password, hashes the new one, updates, and revokes all sessions.
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, passwordHash: true },
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    // ── Verify current password ──────────────────────────────────────────────
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash,
    );
    if (!isCurrentPasswordValid) {
      throw new ValidationError({ currentPassword: ["Current password is incorrect"] });
    }

    // ── Hash new password ────────────────────────────────────────────────────
    const newPasswordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    // ── Update password in a transaction with session revocation ─────────────
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash },
      });

      // Revoke all sessions (force re-login on all devices)
      await tx.session.updateMany({
        where: { userId, isRevoked: false },
        data: { isRevoked: true },
      });
    });

    logger.info(`Password changed for user: ${userId}`);
  },

  /**
   * Initiate the forgot-password flow.
   * Generates a reset token, stores it with an expiry, and (in production) sends an email.
   * Always returns success to prevent email enumeration.
   */
  async forgotPassword(email: string): Promise<void> {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, email: true },
    });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      logger.info(`Forgot password requested for non-existent email: ${normalizedEmail}`);
      return;
    }

    // ── Generate a secure reset token ────────────────────────────────────────
    const resetToken = uuidv4();

    // ── Store reset token with expiry ────────────────────────────────────────
    // Uses the PasswordReset model in the database.
    // In production, you could also store this in Redis with TTL for faster lookups:
    //   await redis.set(`password_reset:${resetToken}`, user.id, 'EX', RESET_TOKEN_EXPIRY_SECONDS);
    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        email: user.email,
        code: resetToken.slice(0, 6),
        expiresAt: new Date(Date.now() + RESET_TOKEN_EXPIRY_SECONDS * 1000),
      },
    });

    // ── Send email (structure ready for integration) ─────────────────────────
    // In production, integrate with your email service:
    //   await sendPasswordResetEmail(user.email, resetToken);
    logger.info(`Password reset token generated for user: ${user.id} (${user.email})`);
  },

  /**
   * Reset a user's password using a token from the forgot-password flow.
   * Verifies the token, updates the password, and revokes all sessions.
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // ── Look up the reset record ─────────────────────────────────────────────
    const resetRecord = await prisma.emailVerification.findFirst({
      where: {
        code: token.slice(0, 6),
        isConsumed: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!resetRecord) {
      throw new ValidationError({ token: ["Invalid or expired reset token"] });
    }

    // ── Mark token as used ───────────────────────────────────────────────────
    await prisma.emailVerification.update({
      where: { id: resetRecord.id },
      data: { isConsumed: true },
    });

    // ── Hash new password and update user ────────────────────────────────────
    const newPasswordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: resetRecord.userId },
        data: { passwordHash: newPasswordHash },
      });

      // Revoke all active sessions (force re-login everywhere)
      await tx.session.updateMany({
        where: { userId: resetRecord.userId, isRevoked: false },
        data: { isRevoked: true },
      });
    });

    logger.info(`Password reset completed for user: ${resetRecord.userId}`);
  },

  /**
   * Soft-delete a user account.
   * Bans the account, anonymizes personal data, clears profile, and deactivates sessions.
   */
  async deleteAccount(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    const anonymizedSuffix = uuidv4().slice(0, 8);

    await prisma.$transaction(async (tx) => {
      // Ban the user and anonymize personal data
      await tx.user.update({
        where: { id: userId },
        data: {
          isBanned: true,
          email: `deleted_${anonymizedSuffix}@honey.invalid`,
          username: `deleted_${anonymizedSuffix}`,
          username: null,
          bio: null,
          avatarUrl: null,
          bannerUrl: null,
          passwordHash: await bcrypt.hash(uuidv4(), BCRYPT_ROUNDS),
        },
      });

      // Clear profile data
      await tx.profile.upsert({
        where: { userId },
        create: {
          userId,
          bio: null,
          avatarUrl: null,
          website: null,
          location: null,
          firstName: null,
          lastName: null,
          username: null,
        },
        update: {
          bio: null,
          avatarUrl: null,
          website: null,
          location: null,
          firstName: null,
          lastName: null,
          username: null,
          socialLinks: null,
        },
      });

      // Deactivate all sessions
      await tx.session.updateMany({
        where: { userId },
        data: { isRevoked: true },
      });
    });

    logger.info(`Account soft-deleted for user: ${userId}`);
  },

  /**
   * Generate a new JWT access/refresh token pair for a user.
   * Access token: 15 min, payload = { userId, username, jti, type: 'access' }
   * Refresh token: 7 days, payload = { userId, jti, type: 'refresh' }
   */
  async generateTokenPair(userId: string, username: string): Promise<TokenPair> {
    const accessJti = uuidv4();
    const refreshJti = uuidv4();

    const accessToken = jwt.sign(
      {
        userId,
        username,
        jti: accessJti,
        type: "access",
      } satisfies AccessTokenPayload,
      config.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY },
    );

    const refreshToken = jwt.sign(
      {
        userId,
        jti: refreshJti,
        type: "refresh",
      } satisfies RefreshTokenPayload,
      config.JWT_SECRET,
      { expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d` },
    );

    return { accessToken, refreshToken };
  },

  /**
   * List all sessions (active and inactive) for a user, ordered by creation date.
   */
  async getSessions(userId: string): Promise<SessionInfo[]> {
    const sessions = await prisma.refreshToken.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return sessions.map((session) => ({
      id: session.id,
      userId: session.userId,
      jti: session.token.slice(0, 8),
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
      isActive: session.isActive,
      lastRefreshedAt: session.lastRefreshedAt,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
    }));
  },

  /**
   * Revoke a specific session by ID. Verifies the session belongs to the user.
   */
  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const session = await prisma.refreshToken.findFirst({
      where: { id: sessionId, userId },
      select: { id: true },
    });

    if (!session) {
      throw new NotFoundError("Session");
    }

    await prisma.refreshToken.update({
      where: { id: sessionId },
      data: { isRevoked: true },
    });

    logger.info(`Session revoked: ${sessionId} for user: ${userId}`);
  },

  /**
   * Update a user's profile fields.
   * Supports updating user-level fields (displayName) and profile-level fields
   * (bio, avatarUrl, website, location, firstName, lastName).
   */
  async updateProfile(
    userId: string,
    data: UpdateProfileDto,
  ): Promise<AuthenticatedUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    // ── Build user-level update data ─────────────────────────────────────────
    const userUpdateData: Record<string, unknown> = { updatedAt: new Date() };
    if (data.username !== undefined) {
      userUpdateData.displayName = data.username;
    }

    // ── Build profile-level update data ──────────────────────────────────────
    const profileUpdateData: Record<string, unknown> = {};
    if (data.bio !== undefined) profileUpdateData.bio = data.bio || null;
    if (data.avatarUrl !== undefined) profileUpdateData.avatarUrl = data.avatarUrl || null;
    if (data.website !== undefined) profileUpdateData.website = data.website || null;
    if (data.location !== undefined) profileUpdateData.location = data.location || null;
    if (data.firstName !== undefined) profileUpdateData.firstName = data.firstName || null;
    if (data.lastName !== undefined) profileUpdateData.lastName = data.lastName || null;

    // ── Update in a transaction ──────────────────────────────────────────────
    const updatedUser = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: userUpdateData,
      });

      if (Object.keys(profileUpdateData).length > 0) {
        if (user.profile) {
          await tx.profile.update({
            where: { userId },
            data: profileUpdateData,
          });
        } else {
          await tx.profile.create({
            data: { userId, ...profileUpdateData },
          });
        }
      }

      return tx.user.findUnique({
        where: { id: userId },
      });
    });

    if (!updatedUser) {
      throw new AppError("Failed to retrieve user after update", 500);
    }

    logger.info(`Profile updated for user: ${userId}`);

    return toAuthenticatedUser(updatedUser);
  },

  /**
   * Fetch a user by ID and return a sanitized AuthenticatedUser object.
   */
  async getUserById(userId: string): Promise<AuthenticatedUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    return toAuthenticatedUser(user);
  },
};
