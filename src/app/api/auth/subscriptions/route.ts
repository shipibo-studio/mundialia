import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ subscribed: {} });
  }

  const { partidos }: { partidos: number[] } = await request.json();

  if (!partidos?.length) {
    return NextResponse.json({ subscribed: {} });
  }

  const rows = await sql`
    SELECT partido_numero FROM notifications
    WHERE user_id = ${session.id}
      AND partido_numero = ANY(${partidos}::int[])
      AND activa = TRUE
  `;

  const subscribed: Record<number, boolean> = {};
  for (const p of partidos) {
    subscribed[p] = false;
  }
  for (const row of rows as { partido_numero: number }[]) {
    subscribed[row.partido_numero] = true;
  }

  return NextResponse.json({ subscribed });
}
