import { NextRequest, NextResponse } from "next/server";

import { markNotificationsAsRead } from "@/lib/server/notification-service";
import {
  createErrorResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const body = (await request.json()) as unknown;
    const result = await markNotificationsAsRead(user.id, body);
    return NextResponse.json(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
