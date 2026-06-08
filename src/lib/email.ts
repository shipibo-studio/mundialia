import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL || "MundialIA 2026 <noreply@andalaosa.cl>";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("[email] Error sending email:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Envía un recordatorio de partido.
 */
export async function sendMatchReminder({
  to,
  partidoNombre,
  grupo,
  horaChile,
  horaBrasil,
  sede,
  canalesChile,
  canalesBrasil,
}: {
  to: string;
  partidoNombre: string;
  grupo: string;
  horaChile: string;
  horaBrasil: string;
  sede: string;
  canalesChile?: string;
  canalesBrasil?: string;
}) {
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0a0e16;
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      color: #e0e2ee;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .header h1 {
      font-size: 28px;
      color: #00f2ff;
      margin: 0;
      text-shadow: 0 0 10px rgba(0,242,255,0.5);
    }
    .header p {
      color: #849495;
      margin: 8px 0 0;
    }
    .card {
      background: #10131c;
      border: 1px solid rgba(0,242,255,0.2);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 16px;
      box-shadow: 0 0 15px rgba(0,242,255,0.1);
    }
    .card h2 {
      font-size: 20px;
      color: #00f2ff;
      margin: 0 0 4px;
    }
    .grupo {
      font-size: 12px;
      color: #00f2ff;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .row:last-child { border-bottom: none; }
    .label { color: #849495; font-size: 13px; }
    .value { color: #e0e2ee; font-size: 14px; font-weight: 600; }
    .canales { margin-top: 16px; }
    .canales h3 {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 8px;
    }
    .canales .chile { color: #0070ff; }
    .canales .brasil { color: #00f2ff; }
    .canales span {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 12px;
      margin: 2px 4px 2px 0;
    }
    .footer {
      text-align: center;
      color: #849495;
      font-size: 12px;
      margin-top: 24px;
    }
    .footer a { color: #00f2ff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚽ Mundial 2026</h1>
      <p>Notificación de partido</p>
    </div>
    <div class="card">
      <div class="grupo">Grupo ${grupo}</div>
      <h2>${partidoNombre}</h2>
      <div class="row">
        <span class="label">🇨🇱 Hora Chile</span>
        <span class="value">${horaChile}</span>
      </div>
      <div class="row">
        <span class="label">🇧🇷 Hora Brasil</span>
        <span class="value">${horaBrasil}</span>
      </div>
      <div class="row">
        <span class="label">📍 Sede</span>
        <span class="value">${sede}</span>
      </div>
      ${canalesChile ? `
      <div class="canales">
        <h3 class="chile">🇨🇱 Cobertura Chile</h3>
        <span style="background:rgba(0,112,255,0.15); color:#0070ff; border:1px solid rgba(0,112,255,0.3);">${canalesChile}</span>
      </div>` : ""}
      ${canalesBrasil ? `
      <div class="canales">
        <h3 class="brasil">🇧🇷 Cobertura Brasil</h3>
        <span style="background:rgba(0,242,255,0.15); color:#00f2ff; border:1px solid rgba(0,242,255,0.3);">${canalesBrasil}</span>
      </div>` : ""}
    </div>
    <div class="footer">
      <p>Recibes este correo porque activaste las notificaciones en <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}">MundialIA 2026</a></p>
      <p>Desuscríbete desde la configuración de la app.</p>
    </div>
  </div>
</body>
</html>`;

  return sendEmail({
    to,
    subject: `⚽ ${partidoNombre} — Grupo ${grupo}`,
    html,
  });
}
