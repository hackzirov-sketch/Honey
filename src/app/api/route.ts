import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      service: "Honey Next API",
      version: "2.1.0-next",
      migratedModules: ["health", "auth", "users"],
    },
  });
}
