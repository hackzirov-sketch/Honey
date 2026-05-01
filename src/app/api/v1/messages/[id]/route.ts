import { NextRequest, NextResponse } from "next/server";

import {
  deleteMessage,
  editMessage,
  listMessages,
  sendMessage,
} from "@/lib/server/message-service";
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
    const result = await listMessages({
      userId: user.id,
      conversationId: id,
      cursor: searchParams.get("cursor") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    return NextResponse.json({
      success: true,
      data: result.items,
      meta: {
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
      },
    });
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    const body = (await request.json()) as unknown;
    const message = await sendMessage({
      userId: user.id,
      conversationId: id,
      body,
    });
    return createSuccessResponse(message, { status: 201 });
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
    const message = await editMessage({
      userId: user.id,
      messageId: id,
      body,
    });
    return createSuccessResponse(message);
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
    const result = await deleteMessage({
      userId: user.id,
      messageId: id,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return createErrorResponse(error);
  }
}
