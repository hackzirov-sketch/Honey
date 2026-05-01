import { NextRequest, NextResponse } from "next/server";

const PROXY_BASE_URL = (
  process.env.INTERNAL_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5000"
).replace(/\/$/, "");

interface ProxyContext {
  params: Promise<{ path: string[] }>;
}

async function proxyRequest(
  request: NextRequest,
  context: ProxyContext,
): Promise<NextResponse> {
  const { path } = await context.params;
  const incomingUrl = new URL(request.url);
  const targetUrl = `${PROXY_BASE_URL}/api/v1/${path.join("/")}${incomingUrl.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("x-honey-proxy", "next-app");

  const init: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = await request.arrayBuffer();
    init.duplex = "half";
  }

  const upstream = await fetch(targetUrl, init);
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("transfer-encoding");
  responseHeaders.delete("connection");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function POST(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function PUT(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}
