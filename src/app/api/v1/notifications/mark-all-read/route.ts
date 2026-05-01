import { NextRequest, NextResponse } from "next/server";

import { markNotificationsAsRead } from "@/lib/server/notification-service";
import {
  createErrorResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const result = await markNotificationsAsRead(user.id, { markAll: true });
    return NextResponse.json(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
