import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-edge";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;
  const authHeader = request.headers.get("authorization");

  console.log(`[proxy] ${pathname} | cookie: ${token ? "✓" : "✗"} | header: ${authHeader ? "✓" : "✗"}`);

  // No redirigir — el cliente maneja auth via localStorage
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
