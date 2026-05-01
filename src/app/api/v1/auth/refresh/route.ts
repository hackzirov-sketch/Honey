import { NextRequest } from "next/server";

import { refreshUserSession } from "@/lib/server/auth-service";
import {
  attachSessionCookies,
  createErrorResponse,
  createSuccessResponse,
  resolveRefreshToken,
} from "@/lib/server/api";
import { ValidationError } from "@server/errors";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = await resolveRefreshToken(request);
    if (!refreshToken) {
      throw new ValidationError("Validation failed", {
        refreshToken: ["Refresh token is required"],
      });
    }

    const tokens = await refreshUserSession(refreshToken);
    const response = createSuccessResponse(tokens);
    attachSessionCookies(response, tokens);
    return response;
  } catch (error) {
    return createErrorResponse(error);
  }
}
