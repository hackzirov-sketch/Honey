import { NextRequest, NextResponse } from "next/server";

import {
  createConversation,
  listConversations,
} from "@/lib/server/conversation-service";
import {
  createErrorResponse,
  createSuccessResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { searchParams } = new URL(request.url);
    const result = await listConversations({
      userId: user.id,
      cursor: searchParams.get("cursor") ?? undefined,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : undefined,
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

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const body = (await request.json()) as unknown;
    const conversation = await createConversation(user.id, body);
    return createSuccessResponse(conversation, { status: 201 });
  } catch (error) {
    return createErrorResponse(error);
  }
}
