import { NextRequest, NextResponse } from "next/server";
import { sendMatchReminder } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { to } = await request.json();

  if (!to) {
    return NextResponse.json({ error: "Falta el destinatario (to)" }, { status: 400 });
  }

  try {
    const data = await sendMatchReminder({
      to,
      partidoNombre: "Chile vs. Brasil",
      grupo: "A",
      horaChile: "15:00",
      horaBrasil: "16:00",
      sede: "Estadio Maracanã, Río de Janeiro",
      canalesChile: "Chilevisión, DSports",
      canalesBrasil: "Globo, CazéTV (YouTube)",
    });

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
