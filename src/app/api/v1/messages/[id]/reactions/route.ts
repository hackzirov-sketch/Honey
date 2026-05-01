import { NextRequest } from "next/server";

import { toggleReaction } from "@/lib/server/message-service";
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
    const result = await toggleReaction({
      userId: user.id,
      messageId: id,
      bodyOrQuery: body,
      mode: "add",
    });
    return createSuccessResponse(result);
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
    const { searchParams } = new URL(request.url);
    const result = await toggleReaction({
      userId: user.id,
      messageId: id,
      bodyOrQuery: { emoji: searchParams.get("emoji") ?? "" },
      mode: "remove",
    });
    return createSuccessResponse(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
