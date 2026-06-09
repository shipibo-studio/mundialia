import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-edge";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;

  // Debug detallado con timestamp
  const allCookies = request.cookies.getAll();
  const timestamp = new Date().toISOString();
  console.log(`[proxy ${timestamp}] ${pathname}`);
  console.log(`[proxy] Cookie header:`, request.headers.get("cookie") || "none");
  console.log(`[proxy] All cookies parsed:`, allCookies.map(c => `${c.name}=${c.value.substring(0, 10)}...`).join(", ") || "none");
  console.log(`[proxy] Session token: ${token ? "✓ present" : "✗ MISSING"}`);

  if (!token) {
    console.error(`[proxy] ❌ No token found, redirecting to login`);
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyToken(token);
  if (!payload) {
    console.error(`[proxy] ❌ Invalid token, redirecting to login`);
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log(`[proxy] ✅ Token valid for user: ${payload.email}`);
  
  // Refrescar la cookie en cada request para evitar que Safari iOS la elimine
  const response = NextResponse.next();
  const maxAge = 60 * 60 * 24 * 7;
  const expires = new Date(Date.now() + maxAge * 1000);
  
  response.cookies.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge,
    expires,
    path: "/",
  });
  
  return response;
}

export const config = {
  matcher: ["/app/:path*"],
};
