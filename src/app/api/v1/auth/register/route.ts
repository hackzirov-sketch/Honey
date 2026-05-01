import { NextRequest } from "next/server";

import { RegisterDtoSchema } from "@server/modules/auth/dto/auth.dto";
import { registerUser } from "@/lib/server/auth-service";
import {
  attachSessionCookies,
  createErrorResponse,
  createSuccessResponse,
  parseJsonBody,
} from "@/lib/server/api";

export async function POST(request: NextRequest) {
  try {
    const dto = await parseJsonBody(request, RegisterDtoSchema);
    const result = await registerUser(dto);
    const response = createSuccessResponse(result, { status: 201 });
    attachSessionCookies(response, result.tokens);
    return response;
  } catch (error) {
    return createErrorResponse(error);
  }
}
