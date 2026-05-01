import { NextRequest } from "next/server";

import { LoginDtoSchema } from "@server/modules/auth/dto/auth.dto";
import { loginUser } from "@/lib/server/auth-service";
import {
  attachSessionCookies,
  createErrorResponse,
  createSuccessResponse,
  parseJsonBody,
} from "@/lib/server/api";

export async function POST(request: NextRequest) {
  try {
    const dto = await parseJsonBody(request, LoginDtoSchema);
    const result = await loginUser(dto, {
      userAgent: request.headers.get("user-agent") ?? undefined,
      ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
    });
    const response = createSuccessResponse(result);
    attachSessionCookies(response, result.tokens);
    return response;
  } catch (error) {
    return createErrorResponse(error);
  }
}
