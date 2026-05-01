import { NextRequest } from "next/server";

import { getOwnUserProfile } from "@/lib/server/user-service";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const profile = await getOwnUserProfile(user.id);
    return createSuccessResponse(profile);
  } catch (error) {
    return createErrorResponse(error);
  }
}
