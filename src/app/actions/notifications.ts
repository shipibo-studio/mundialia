"use server";

import { createNotification, deactivateNotification } from "@/lib/queries";
import { getSession } from "@/lib/auth";

export async function toggleSubscription(
  partidoNumero: number,
  subscribe: boolean,
  token?: string
): Promise<{ ok: boolean; error?: string }> {
  const session = await getSession(token);
  if (!session) {
    return { ok: false, error: "Debes iniciar sesión" };
  }

  const sql = (await import("@/lib/db")).default;

  try {
    if (subscribe) {
      // UPSERT: si ya existe (activa o no), la reactiva; si no, la crea
      await sql`
        INSERT INTO notifications (user_id, partido_numero, tipo_notificacion, activa)
        VALUES (${session.id}, ${partidoNumero}, 'email', TRUE)
        ON CONFLICT (user_id, partido_numero, tipo_notificacion)
        DO UPDATE SET activa = TRUE, updated_at = NOW()
      `;
      return { ok: true };
    } else {
      const [notif] = await sql`
        SELECT id FROM notifications
        WHERE user_id = ${session.id}
          AND partido_numero = ${partidoNumero}
          AND activa = TRUE
        LIMIT 1
      `;
      if (notif) {
        await deactivateNotification(notif.id);
      }
      return { ok: true };
    }
  } catch (err: any) {
    return { ok: false, error: "Error al guardar la suscripción" };
  }
}

export async function getSubscriptionStatus(
  partidoNumero: number,
  token?: string
): Promise<{ subscribed: boolean }> {
  const session = await getSession(token);
  if (!session) {
    return { subscribed: false };
  }

  const sql = (await import("@/lib/db")).default;
  const [notif] = await sql`
    SELECT id FROM notifications
    WHERE user_id = ${session.id}
      AND partido_numero = ${partidoNumero}
      AND activa = TRUE
    LIMIT 1
  `;

  return { subscribed: !!notif };
}
