import { NextRequest, NextResponse } from "next/server";

import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/lib/server/notification-service";
import {
  createErrorResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const result = await getNotificationPreferences(user.id);
    return NextResponse.json(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const body = (await request.json()) as unknown;
    const result = await updateNotificationPreferences(user.id, body);
    return NextResponse.json(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
