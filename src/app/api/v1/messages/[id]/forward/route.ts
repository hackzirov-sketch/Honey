import { NextRequest } from "next/server";

import { forwardMessage } from "@/lib/server/message-service";
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
    const message = await forwardMessage({
      userId: user.id,
      messageId: id,
      body,
    });
    return createSuccessResponse(message, { status: 201 });
  } catch (error) {
    return createErrorResponse(error);
  }
}
