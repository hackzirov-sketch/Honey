import { NextRequest } from "next/server";

import { logoutUser } from "@/lib/server/auth-service";
import {
  clearSessionCookies,
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    await logoutUser(user.id);
    const response = createSuccessResponse({ message: "Logged out successfully" });
    clearSessionCookies(response);
    return response;
  } catch (error) {
    return createErrorResponse(error);
  }
}
