import { NextRequest, NextResponse } from "next/server";

import {
  clearNotifications,
  listNotifications,
} from "@/lib/server/notification-service";
import {
  createErrorResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { searchParams } = new URL(request.url);
    const result = await listNotifications({
      userId: user.id,
      cursor: searchParams.get("cursor") ?? undefined,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : undefined,
      type: searchParams.get("type") ?? undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const result = await clearNotifications(user.id);
    return NextResponse.json(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
