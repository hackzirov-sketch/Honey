import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../../../config/prisma';
import { config } from '../../../config';
import { NotFoundError, ValidationError } from '../../../errors';
import { logger } from '../../../utils/logger';

const EMAIL_VERIFICATION_PREFIX = 'verify:';
const PASSWORD_RESET_PREFIX = 'reset:';
const EMAIL_VERIFICATION_TTL_MINUTES = 30;
const PASSWORD_RESET_TTL_MINUTES = 60;
const BCRYPT_ROUNDS = 12;

interface RecoveryResult {
  queued: boolean;
  devToken?: string;
  expiresAt?: Date;
}

function createToken(): string {
  return crypto.randomBytes(24).toString('hex');
}

function createExpiry(minutes: number): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

function resolveStoredCode(prefix: string, rawToken: string): string {
  const normalized = rawToken.trim();
  if (normalized.startsWith(prefix)) {
    return normalized;
  }
  return `${prefix}${normalized}`;
}

function devToken(token: string): string | undefined {
  return config.isProduction ? undefined : token;
}

export const authRecoveryService = {
  async issueEmailVerificationForUserId(userId: string): Promise<RecoveryResult> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, isVerified: true },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    if (user.isVerified) {
      return { queued: true };
    }

    const token = createToken();
    const expiresAt = createExpiry(EMAIL_VERIFICATION_TTL_MINUTES);
    const code = `${EMAIL_VERIFICATION_PREFIX}${token}`;

    await prisma.$transaction(async (tx) => {
      await tx.emailVerification.updateMany({
        where: {
          userId: user.id,
          isConsumed: false,
          expiresAt: { gt: new Date() },
          code: { startsWith: EMAIL_VERIFICATION_PREFIX },
        },
        data: { isConsumed: true },
      });

      await tx.emailVerification.create({
        data: {
          userId: user.id,
          email: user.email,
          code,
          expiresAt,
        },
      });
    });

    logger.info(`Email verification token issued for user: ${user.id}`);

    return {
      queued: true,
      devToken: devToken(token),
      expiresAt,
    };
  },

  async requestEmailVerificationByEmail(email: string): Promise<RecoveryResult> {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, isVerified: true },
    });

    if (!user) {
      logger.info(`Verification requested for missing email: ${normalizedEmail}`);
      return { queued: true };
    }

    if (user.isVerified) {
      return { queued: true };
    }

    return this.issueEmailVerificationForUserId(user.id);
  },

  async verifyEmailToken(rawToken: string): Promise<{ userId: string; email: string }> {
    const code = resolveStoredCode(EMAIL_VERIFICATION_PREFIX, rawToken);

    const verification = await prisma.emailVerification.findFirst({
      where: {
        code,
        isConsumed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!verification) {
      throw new ValidationError('Invalid or expired verification token');
    }

    await prisma.$transaction(async (tx) => {
      await tx.emailVerification.update({
        where: { id: verification.id },
        data: { isConsumed: true },
      });

      await tx.user.update({
        where: { id: verification.userId },
        data: { isVerified: true },
      });
    });

    logger.info(`Email verified for user: ${verification.userId}`);

    return {
      userId: verification.userId,
      email: verification.email,
    };
  },

  async requestPasswordReset(email: string): Promise<RecoveryResult> {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, email: true },
    });

    if (!user) {
      logger.info(`Password reset requested for missing email: ${normalizedEmail}`);
      return { queued: true };
    }

    const token = createToken();
    const code = `${PASSWORD_RESET_PREFIX}${token}`;
    const expiresAt = createExpiry(PASSWORD_RESET_TTL_MINUTES);

    await prisma.$transaction(async (tx) => {
      await tx.emailVerification.updateMany({
        where: {
          userId: user.id,
          isConsumed: false,
          expiresAt: { gt: new Date() },
          code: { startsWith: PASSWORD_RESET_PREFIX },
        },
        data: { isConsumed: true },
      });

      await tx.emailVerification.create({
        data: {
          userId: user.id,
          email: user.email,
          code,
          expiresAt,
        },
      });
    });

    logger.info(`Password reset token issued for user: ${user.id}`);

    return {
      queued: true,
      devToken: devToken(token),
      expiresAt,
    };
  },

  async resetPasswordWithToken(rawToken: string, newPassword: string): Promise<void> {
    const code = resolveStoredCode(PASSWORD_RESET_PREFIX, rawToken);

    const resetRecord = await prisma.emailVerification.findFirst({
      where: {
        code,
        isConsumed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!resetRecord) {
      throw new ValidationError('Invalid or expired reset token');
    }

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await prisma.$transaction(async (tx) => {
      await tx.emailVerification.update({
        where: { id: resetRecord.id },
        data: { isConsumed: true },
      });

      await tx.user.update({
        where: { id: resetRecord.userId },
        data: { passwordHash },
      });

      await tx.refreshToken.updateMany({
        where: { userId: resetRecord.userId, isRevoked: false },
        data: { isRevoked: true },
      });
    });

    logger.info(`Password reset completed for user: ${resetRecord.userId}`);
  },
};
