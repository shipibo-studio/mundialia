import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-edge";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;

  console.log(`[proxy] ${pathname} | token: ${token ? "✓ present" : "✗ missing"}`);

  if (!token) {
    console.log(`[proxy] No token found, redirecting to login`);
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyToken(token);
  if (!payload) {
    console.log(`[proxy] Invalid token, redirecting to login`);
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log(`[proxy] Token valid for user: ${payload.email}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
