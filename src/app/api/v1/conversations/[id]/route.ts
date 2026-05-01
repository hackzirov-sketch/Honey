import { NextRequest, NextResponse } from "next/server";

import {
  getConversationDetails,
  leaveConversation,
  updateConversation,
} from "@/lib/server/conversation-service";
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
    const conversation = await getConversationDetails(user.id, id);
    return createSuccessResponse(conversation);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    const body = (await request.json()) as unknown;
    const conversation = await updateConversation(user.id, id, body);
    return createSuccessResponse(conversation);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    await leaveConversation(user.id, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return createErrorResponse(error);
  }
}
