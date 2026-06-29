import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { mundialData } from "@/lib/data";
import { sendEmail } from "@/lib/email";
import { buscarCanal } from "@/lib/canales";
import type { Partido, EliminatoriaMatch, MatchChannels } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

type CronMatch = {
  numero: number;
  partido: string;
  grupo?: string;          // "SEGUNDA FASE" para eliminatoria
  hora_chile: string;
  hora_brasil: string;
  sede: string;
  canales_chile?: MatchChannels;
  canales_brasil?: MatchChannels;
};

function chileToday(): string {
  const ahora = new Date();
  const chileOffset = -4 * 60;
  const chileDate = new Date(ahora.getTime() + (ahora.getTimezoneOffset() + chileOffset) * 60000);
  return chileDate.toISOString().slice(0, 10);
}

function getTodayMatches(today: string): CronMatch[] {
  const matches: CronMatch[] = [];

  // Fase de grupos
  for (const jornada of mundialData.fixture.fase_grupos) {
    if (jornada.fecha === today && jornada.partidos) {
      for (const p of jornada.partidos) {
        matches.push(p);
      }
    }
  }

  // Segunda Fase (eliminatorias)
  const sf = mundialData.fixture.fase_eliminatoria.segunda_fase;
  const sfChannels = { canales_chile: sf.canales_chile, canales_brasil: sf.canales_brasil };
  if (Array.isArray(sf.partidos)) {
    for (const p of sf.partidos) {
      if (p.fecha === today) {
        matches.push({
          ...p,
          grupo: "SEGUNDA FASE",
          canales_chile: p.canales_chile ?? sfChannels.canales_chile,
          canales_brasil: p.canales_brasil ?? sfChannels.canales_brasil,
        } as CronMatch);
      }
    }
  }

  return matches;
}

function canalLink(nombre: string): string {
  const info = buscarCanal(nombre);
  const label = info?.nombre ?? nombre;
  const url = info?.sitio ?? info?.youtube;
  return url
    ? `<a href="${url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">${label}</a>`
    : label;
}

function formatCanales(p: CronMatch): { chile: string; brasil: string } {
  const chile: string[] = [];
  const brasil: string[] = [];

  if (p.canales_chile) {
    if (p.canales_chile.abierta) chile.push(...p.canales_chile.abierta.map(canalLink));
    if (p.canales_chile.pago) chile.push(...p.canales_chile.pago.map(canalLink));
  }
  if (p.canales_brasil) {
    if (p.canales_brasil.abierta) brasil.push(...p.canales_brasil.abierta.map(canalLink));
    if (p.canales_brasil.pago) brasil.push(...p.canales_brasil.pago.map(canalLink));
    if (p.canales_brasil.youtube) brasil.push(...p.canales_brasil.youtube.map(canalLink));
  }

  return {
    chile: chile.join(" · "),
    brasil: brasil.join(" · "),
  };
}

function formatFechaEsp(fecha: string): string {
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const d = new Date(fecha + "T12:00:00-04:00");
  return `${dias[d.getDay()]} ${d.getDate()} de ${meses[d.getMonth()]}`;
}

function buildDigestHtml(
  matches: (CronMatch & { canalesResume: { chile: string; brasil: string } })[]
): string {
  const today = chileToday();
  const matchCards = matches
    .map(
      (p) => `
    <div style="background:#10131c;border:1px solid rgba(0,242,255,0.2);border-radius:16px;padding:20px;margin-bottom:12px;box-shadow:0 0 15px rgba(0,242,255,0.1);">
      <div style="font-size:12px;color:#00f2ff;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;">${p.grupo || "SEGUNDA FASE"}</div>
      <div style="font-size:20px;color:#00f2ff;margin:0 0 12px;text-shadow:0 0 10px rgba(0,242,255,0.5);">${p.partido}</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="color:#849495;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">🇨🇱 Hora Chile</td><td style="color:#e0e2ee;font-weight:600;text-align:right;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${p.hora_chile}</td></tr>
        <tr><td style="color:#849495;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">🇧🇷 Hora Brasil</td><td style="color:#e0e2ee;font-weight:600;text-align:right;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${p.hora_brasil}</td></tr>
        <tr><td style="color:#849495;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">📍 Sede</td><td style="color:#e0e2ee;font-weight:600;text-align:right;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${p.sede}</td></tr>
      </table>
      ${p.canalesResume.chile
          ? `<div style="margin-top:12px;">
        <div style="font-size:11px;color:#0070ff;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">🇨🇱 Cobertura Chile</div>
        <div style="display:inline-block;padding:4px 10px;border-radius:8px;font-size:12px;background:rgba(0,112,255,0.15);color:#ffffff;border:1px solid rgba(0,112,255,0.3);">${p.canalesResume.chile}</div>
      </div>` : ""
        }
      ${p.canalesResume.brasil
          ? `<div style="margin-top:8px;">
        <div style="font-size:11px;color:#00f2ff;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">🇧🇷 Cobertura Brasil</div>
        <div style="display:inline-block;padding:4px 10px;border-radius:8px;font-size:12px;background:rgba(0,242,255,0.15);color:#00f2ff;border:1px solid rgba(0,242,255,0.3);">${p.canalesResume.brasil}</div>
      </div>` : ""
        }
    </div>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"/><style>
  body{margin:0;padding:0;background:#0a0e16;font-family:'Plus Jakarta Sans',Arial,sans-serif;color:#e0e2ee;}
  .container{max-width:600px;margin:0 auto;padding:32px 24px;}
  .header{text-align:center;margin-bottom:32px;}
  .header h1{font-size:28px;color:#00f2ff;margin:0;text-shadow:0 0 10px rgba(0,242,255,0.5);}
  .header p{color:#849495;margin:8px 0 0;font-size:14px;}
  .cta{text-align:center;margin:24px 0;}
  .cta a{display:inline-block;padding:14px 32px;background:#00f2ff;color:#002022;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:2px;}
  .footer{text-align:center;color:#849495;font-size:12px;margin-top:24px;}
  .footer a{color:#00f2ff;}
  .channel-link{color:inherit;text-decoration:none;border-bottom:1px dotted currentColor;}
  .channel-link:hover{opacity:0.8;}
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚽ MundialIA 2026</h1>
      <p>📋 ${formatFechaEsp(today)}</p>
    </div>
    ${matchCards}
    <div class="cta">
      <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}">👉 Entrar a MundialIA</a>
    </div>
    <div class="footer">
      <p>Recibes esto porque activaste notificaciones en MundialIA 2026.</p>
      <p>Desuscríbete desde la configuración de la app.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  // Validar cron secret
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET;
  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = chileToday();
  const todayFecha = formatFechaEsp(today);
  const todayMatches = getTodayMatches(today);

  if (todayMatches.length === 0) {
    console.log("[cron] No hay partidos hoy");
    return NextResponse.json({ ok: true, sent: 0, reason: "No matches today" });
  }

  const partidoNumeros = todayMatches.map((p) => p.numero);

  // Obtener usuarios con sus partidos suscritos para hoy
  const rows = await sql`
    SELECT u.id, u.email, n.partido_numero
    FROM notifications n
    JOIN users u ON n.user_id = u.id
    WHERE n.partido_numero = ANY(${partidoNumeros}::int[])
      AND n.activa = TRUE
    ORDER BY u.id, n.partido_numero
  `;

  type UserSubRow = { id: string; email: string; partido_numero: number };
  const allRows = rows as UserSubRow[];

  if (allRows.length === 0) {
    console.log("[cron] No hay usuarios suscritos a partidos de hoy");
    return NextResponse.json({ ok: true, sent: 0, reason: "No subscribers" });
  }

  // Agrupar por usuario
  const userMap = new Map<string, { email: string; partidos: number[] }>();
  for (const row of allRows) {
    if (!userMap.has(row.id)) {
      userMap.set(row.id, { email: row.email, partidos: [] });
    }
    userMap.get(row.id)!.partidos.push(row.partido_numero);
  }

  // Mapa de partido_numero → datos enriquecidos
  const matchesMap = new Map(
    todayMatches.map((p) => [
      p.numero,
      { ...p, canalesResume: formatCanales(p) },
    ])
  );

  let sent = 0;
  for (const [, user] of userMap) {
    const userMatches = user.partidos
      .map((num) => matchesMap.get(num))
      .filter(Boolean) as (CronMatch & {
        canalesResume: { chile: string; brasil: string };
      })[];

    if (userMatches.length === 0) continue;

    const html = buildDigestHtml(userMatches);
    const count = userMatches.length;

    try {
      await sendEmail({
        to: user.email,
        subject: `⚽ MundialIA — ${count} partido${count > 1 ? "s" : ""} · ${todayFecha}`,
        html,
      });
      sent++;
    } catch (err) {
      console.error(`[cron] Error sending to ${user.email}:`, err);
    }
  }

  console.log(`[cron] Digest sent to ${sent}/${userMap.size} users`);
  return NextResponse.json({ ok: true, sent, total: userMap.size });
}
