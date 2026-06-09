import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-edge";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;

  // Debug detallado
  const allCookies = request.cookies.getAll();
  console.log(`[proxy] ${pathname}`);
  console.log(`[proxy] All cookies:`, allCookies.map(c => c.name).join(", ") || "none");
  console.log(`[proxy] Session token: ${token ? "✓ present (" + token.substring(0, 20) + "...)" : "✗ MISSING"}`);

  if (!token) {
    console.log(`[proxy] ❌ No token found, redirecting to login`);
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyToken(token);
  if (!payload) {
    console.log(`[proxy] ❌ Invalid token, redirecting to login`);
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log(`[proxy] ✅ Token valid for user: ${payload.email}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
