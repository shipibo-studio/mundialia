import { destroySession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await destroySession();
  // Redirect al login; el cliente debe limpiar localStorage antes
  return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"));
}
