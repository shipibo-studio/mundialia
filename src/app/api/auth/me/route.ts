import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ loggedIn: false });
  }
  return NextResponse.json({ loggedIn: true, email: session.email });
}
