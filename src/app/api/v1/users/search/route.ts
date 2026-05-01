import { NextRequest } from "next/server";

import { searchPublicUsers } from "@/lib/server/user-service";
import { createErrorResponse, createSuccessResponse } from "@/lib/server/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await searchPublicUsers({
      query: searchParams.get("q") ?? "",
      cursor: searchParams.get("cursor") ?? undefined,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : undefined,
    });
    return createSuccessResponse(result);
  } catch (error) {
    return createErrorResponse(error);
  }
}
