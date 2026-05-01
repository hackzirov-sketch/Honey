import { NextRequest } from "next/server";

import { getAuthUserById } from "@/lib/server/auth-service";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const profile = await getAuthUserById(user.id);
    return createSuccessResponse(profile);
  } catch (error) {
    return createErrorResponse(error);
  }
}
