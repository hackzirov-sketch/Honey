import { NextRequest, NextResponse } from "next/server";

import { getUnreadNotificationCount } from "@/lib/server/notification-service";
import {
  createErrorResponse,
  requireAuthenticatedUser,
} from "@/lib/server/api";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const result = await getUnreadNotificationCount(user.id);
    return NextResponse.json(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
