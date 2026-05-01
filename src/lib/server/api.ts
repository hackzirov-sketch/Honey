import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ZodError, type ZodSchema } from "zod";

import { config } from "@server/config";
import {
  AppError,
  AuthError,
  InternalError,
  ValidationError,
  isAppError,
} from "@server/errors";
import { prisma } from "@server/config/prisma";

const ACCESS_COOKIE_NAME = "honey_access_token";
const REFRESH_COOKIE_NAME = "honey_refresh_token";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

interface AccessTokenPayload {
  userId: string;
  username: string;
  type: "access" | "refresh";
  jti?: string;
}

interface EnvelopeOptions {
  status?: number;
  headers?: HeadersInit;
}

export interface RouteContext<TParams extends Record<string, string | string[]>> {
  params: Promise<TParams>;
}

export function createSuccessResponse<T>(
  data: T,
  options: EnvelopeOptions = {},
): NextResponse {
  const response = NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status: options.status ?? 200,
      headers: options.headers,
    },
  );

  return response;
}

function normalizeValidationError(error: ZodError): ValidationError {
  const details: Record<string, string[]> = {};
  const fieldErrors = error.flatten().fieldErrors;

  for (const [field, rawMessages] of Object.entries(fieldErrors)) {
    const messages = Array.isArray(rawMessages)
      ? rawMessages.filter((message): message is string => typeof message === "string")
      : [];
    if (messages.length > 0) {
      details[field] = messages;
    }
  }

  return new ValidationError("Validation failed", details);
}

export function createErrorResponse(error: unknown): NextResponse {
  const appError = error instanceof ZodError
    ? normalizeValidationError(error)
    : isAppError(error)
      ? error
      : new InternalError(
          config.isProduction
            ? "An unexpected error occurred"
            : error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        );

  return NextResponse.json(
    {
      success: false,
      error: {
        code: appError.code,
        message: appError.message,
        ...(appError.details ? { details: appError.details } : {}),
      },
    },
    { status: appError.statusCode },
  );
}

export async function parseJsonBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
): Promise<T> {
  const body = (await request.json()) as unknown;
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw normalizeValidationError(error);
    }
    throw error;
  }
}

export function getBearerToken(request: NextRequest): string | null {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return null;
  }

  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

export function attachSessionCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string },
): void {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: config.isProduction,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };

  response.cookies.set(ACCESS_COOKIE_NAME, tokens.accessToken, cookieOptions);
  response.cookies.set(REFRESH_COOKIE_NAME, tokens.refreshToken, cookieOptions);
}

export function clearSessionCookies(response: NextResponse): void {
  response.cookies.set(ACCESS_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: config.isProduction,
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(REFRESH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: config.isProduction,
    path: "/",
    maxAge: 0,
  });
}

export async function resolveAccessToken(
  request: NextRequest,
): Promise<string | null> {
  const bearer = getBearerToken(request);
  if (bearer) {
    return bearer;
  }

  return (await cookies()).get(ACCESS_COOKIE_NAME)?.value ?? null;
}

export async function resolveRefreshToken(
  request: NextRequest,
): Promise<string | null> {
  try {
    const body = (await request.clone().json()) as { refreshToken?: string };
    if (typeof body.refreshToken === "string" && body.refreshToken.length > 0) {
      return body.refreshToken;
    }
  } catch {
    // Ignore invalid/missing JSON and fall back to cookies.
  }

  return (await cookies()).get(REFRESH_COOKIE_NAME)?.value ?? null;
}

export async function requireAuthenticatedUser(request: NextRequest): Promise<{
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
}> {
  const token = await resolveAccessToken(request);
  if (!token) {
    throw new AuthError("Authorization header missing");
  }

  let payload: AccessTokenPayload;
  try {
    payload = jwt.verify(token, config.JWT_SECRET) as AccessTokenPayload;
  } catch {
    throw new AuthError("Invalid or expired token");
  }

  if (payload.type !== "access") {
    throw new AuthError("Invalid token type");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
      email: true,
      isVerified: true,
      isStaff: true,
      isSuperuser: true,
      isBanned: true,
    },
  });

  if (!user) {
    throw new AuthError("User not found");
  }

  if (user.isBanned) {
    throw new AppError("This account has been suspended", 401, "AUTHENTICATION_ERROR");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    isVerified: user.isVerified,
    isStaff: user.isStaff,
    isSuperuser: user.isSuperuser,
  };
}
