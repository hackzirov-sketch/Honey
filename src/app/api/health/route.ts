import { createSuccessResponse } from "@/lib/server/api";

export async function GET() {
  return createSuccessResponse({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "2.1.0-next",
    uptime: process.uptime(),
    runtime: "next",
  });
}
