import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-edge";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;

  // Debug detallado con timestamp y dominio
  const allCookies = request.cookies.getAll();
  const timestamp = new Date().toISOString();
  const host = request.headers.get("host") || "unknown";
  
  console.log(`[proxy ${timestamp}] ${host}${pathname}`);
  console.log(`[proxy] Cookie header RAW:`, request.headers.get("cookie") || "❌ NONE");
  console.log(`[proxy] All cookies parsed:`, allCookies.length > 0 ? allCookies.map(c => `${c.name}=${c.value.substring(0, 15)}...`).join(", ") : "❌ NONE");
  console.log(`[proxy] Session token: ${token ? "✓ PRESENT" : "❌ MISSING"}`);

  if (!token) {
    console.error(`[proxy] ❌ No token found for ${host}${pathname}, redirecting to login`);
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
  
  // Refrescar la cookie en cada request para mantenerla activa
  const response = NextResponse.next();
  const maxAge = 60 * 60 * 24 * 7;
  const expires = new Date(Date.now() + maxAge * 1000);
  
  response.cookies.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge,
    expires,
    path: "/",
  });
  
  return response;
}

export const config = {
  matcher: ["/app/:path*"],
};
