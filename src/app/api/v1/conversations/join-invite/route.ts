import { NextRequest } from "next/server";

import { joinConversationByInvite } from "@/lib/server/conversation-service";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const body = (await request.json()) as unknown;
    const conversation = await joinConversationByInvite(user.id, body);
    return createSuccessResponse(conversation, { status: 201 });
  } catch (error) {
    return createErrorResponse(error);
  }
}
