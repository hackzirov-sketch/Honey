import { NextRequest } from "next/server";

import { AuthError } from "@server/errors";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";
import { getPublicUserByUsername } from "@/lib/server/user-service";

interface UserRouteParams {
  username: string;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<UserRouteParams> },
) {
  try {
    const { username } = await context.params;
    let viewerId: string | undefined;

    try {
      const user = await requireAuthenticatedUser(request);
      viewerId = user.id;
    } catch (error) {
      if (!(error instanceof AuthError)) {
        throw error;
      }
    }

    const profile = await getPublicUserByUsername(username, viewerId);
    return createSuccessResponse(profile);
  } catch (error) {
    return createErrorResponse(error);
  }
}
