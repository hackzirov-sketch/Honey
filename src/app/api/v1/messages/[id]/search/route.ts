import { NextRequest } from "next/server";

import { searchConversationMessages } from "@/lib/server/message-service";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const result = await searchConversationMessages({
      userId: user.id,
      conversationId: id,
      query: { q: searchParams.get("q") ?? "" },
    });
    return createSuccessResponse(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
