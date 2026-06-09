import { getSession } from "@/lib/auth";
import { verifyToken } from "@/lib/auth-edge";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Intentar con cookie primero
  let payload = await getSession();

  // Si no hay cookie, intentar con Authorization header (localStorage)
  if (!payload) {
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      payload = await verifyToken(token);
    }
  }

  if (!payload) {
    return NextResponse.json({ loggedIn: false });
  }

  return NextResponse.json({ loggedIn: true, email: payload.email });
}
