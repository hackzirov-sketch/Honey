import { NextRequest } from "next/server";

import { markConversationAsRead } from "@/lib/server/message-service";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    const body = (await request.json()) as unknown;
    const result = await markConversationAsRead({
      userId: user.id,
      conversationId: id,
      body,
    });
    return createSuccessResponse(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
