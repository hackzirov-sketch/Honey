import { NextRequest, NextResponse } from "next/server";

import { deleteNotificationById } from "@/lib/server/notification-service";
import {
  createErrorResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { id } = await context.params;
    await deleteNotificationById(user.id, id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return createErrorResponse(error);
  }
}
