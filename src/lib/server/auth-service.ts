import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { prisma } from "@server/config/prisma";
import { config } from "@server/config";
import { AuthError, ConflictError, NotFoundError, ValidationError } from "@server/errors";
import {
  ChangePasswordDtoSchema,
  LoginDtoSchema,
  RefreshDtoSchema,
  RegisterDtoSchema,
  type LoginDto,
  type RegisterDto,
} from "@server/modules/auth/dto/auth.dto";

const ACCESS_TOKEN_EXPIRY = config.JWT_ACCESS_EXPIRES;
const REFRESH_TOKEN_EXPIRY_DAYS = 7;
const BCRYPT_ROUNDS = 12;

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

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserPayload {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
  isVerified: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  createdAt: string;
  lastSeen: string | null;
}

function mapAuthUser(user: {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
  isVerified: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  createdAt: Date;
  lastSeen: Date | null;
}): AuthUserPayload {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    isVerified: user.isVerified,
    isStaff: user.isStaff,
    isSuperuser: user.isSuperuser,
    createdAt: user.createdAt.toISOString(),
    lastSeen: user.lastSeen?.toISOString() ?? null,
  };
}

function calculateRefreshExpiry(): Date {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);
  return expiresAt;
}

function signTokens(userId: string, username: string): AuthTokens {
  const accessToken = jwt.sign(
    {
      userId,
      username,
      jti: uuidv4(),
      type: "access",
    } satisfies AccessTokenPayload,
    config.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY },
  );

  const refreshToken = jwt.sign(
    {
      userId,
      jti: uuidv4(),
      type: "refresh",
    } satisfies RefreshTokenPayload,
    config.JWT_SECRET,
    { expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d` },
  );

  return { accessToken, refreshToken };
}

export async function registerUser(input: RegisterDto) {
  const dto = RegisterDtoSchema.parse(input);
  const email = dto.email.toLowerCase().trim();
  const username = dto.username.toLowerCase().trim();

  const [emailExists, usernameExists] = await Promise.all([
    prisma.user.findUnique({ where: { email }, select: { id: true } }),
    prisma.user.findUnique({ where: { username }, select: { id: true } }),
  ]);

  if (emailExists) {
    throw new ConflictError("Email is already registered");
  }

  if (usernameExists) {
    throw new ConflictError("Username is already taken");
  }

  const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
      profile: {
        create: {},
      },
    },
  });

  const tokens = signTokens(user.id, user.username);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: tokens.refreshToken,
      expiresAt: calculateRefreshExpiry(),
    },
  });

  return {
    tokens,
    user: mapAuthUser(user),
  };
}

export async function loginUser(input: LoginDto, deviceInfo?: { userAgent?: string; ipAddress?: string }) {
  const dto = LoginDtoSchema.parse(input);
  const normalized = dto.emailOrUsername.toLowerCase().trim();
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: normalized }, { username: normalized }],
    },
  });

  if (!user) {
    throw new AuthError("Invalid email/username or password");
  }

  if (user.isBanned) {
    throw new AuthError("This account has been suspended");
  }

  const valid = await bcrypt.compare(dto.password, user.passwordHash);
  if (!valid) {
    throw new AuthError("Invalid email/username or password");
  }

  const tokens = signTokens(user.id, user.username);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: tokens.refreshToken,
      userAgent: deviceInfo?.userAgent ?? null,
      ipAddress: deviceInfo?.ipAddress ?? null,
      expiresAt: calculateRefreshExpiry(),
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastSeen: new Date() },
  });

  return {
    tokens,
    user: mapAuthUser(user),
  };
}

export async function refreshUserSession(refreshToken: string): Promise<AuthTokens> {
  const dto = RefreshDtoSchema.parse({ refreshToken });
  let payload: RefreshTokenPayload;
  try {
    payload = jwt.verify(dto.refreshToken, config.JWT_SECRET) as RefreshTokenPayload;
  } catch {
    throw new AuthError("Invalid refresh token");
  }

  const session = await prisma.refreshToken.findUnique({
    where: { token: dto.refreshToken },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          isBanned: true,
        },
      },
    },
  });

  if (!session || session.isRevoked || session.expiresAt < new Date()) {
    throw new AuthError("Refresh token is invalid or expired");
  }

  if (payload.type !== "refresh") {
    throw new AuthError("Invalid token type");
  }

  if (session.user.isBanned) {
    throw new AuthError("This account has been suspended");
  }

  await prisma.refreshToken.update({
    where: { id: session.id },
    data: { isRevoked: true },
  });

  const tokens = signTokens(session.user.id, session.user.username);
  await prisma.refreshToken.create({
    data: {
      userId: session.user.id,
      token: tokens.refreshToken,
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
      expiresAt: calculateRefreshExpiry(),
    },
  });

  return tokens;
}

export async function logoutUser(userId: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: {
      userId,
      isRevoked: false,
    },
    data: {
      isRevoked: true,
    },
  });
}

export async function getAuthUserById(userId: string): Promise<AuthUserPayload> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      avatarUrl: true,
      isVerified: true,
      isStaff: true,
      isSuperuser: true,
      createdAt: true,
      lastSeen: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  return mapAuthUser(user);
}

export async function changeUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const dto = ChangePasswordDtoSchema.parse({ currentPassword, newPassword });
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, passwordHash: true },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  const valid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
  if (!valid) {
    throw new ValidationError("Validation failed", {
      currentPassword: ["Current password is incorrect"],
    });
  }

  const passwordHash = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    }),
    prisma.refreshToken.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    }),
  ]);
}
