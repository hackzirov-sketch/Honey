import { NextRequest } from "next/server";

import { updateOwnUserProfile } from "@/lib/server/user-service";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const body = (await request.json()) as unknown;
    const profile = await updateOwnUserProfile(user.id, body);
    return createSuccessResponse(profile);
  } catch (error) {
    return createErrorResponse(error);
  }
}
