import { NextRequest } from "next/server";

import { toggleArchivedConversation } from "@/lib/server/conversation-service";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    const result = await toggleArchivedConversation(user.id, id);
    return createSuccessResponse(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
