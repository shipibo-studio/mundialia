import sql from "@/lib/db";

// ─── Users ────────────────────────────────────────────

export async function createUser(email: string, passwordHash: string) {
  const [user] = await sql`
    INSERT INTO users (email, password_hash)
    VALUES (${email}, ${passwordHash})
    RETURNING id, email, created_at
  `;
  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await sql`
    SELECT id, email, password_hash, created_at
    FROM users
    WHERE email = ${email}
  `;
  return user ?? null;
}

export async function getUserById(id: string) {
  const [user] = await sql`
    SELECT id, email, created_at
    FROM users
    WHERE id = ${id}
  `;
  return user ?? null;
}

// ─── Notifications ────────────────────────────────────

export async function createNotification(
  userId: string,
  partidoNumero: number,
  tipo: string = "email"
) {
  const [notif] = await sql`
    INSERT INTO notifications (user_id, partido_numero, tipo_notificacion)
    VALUES (${userId}, ${partidoNumero}, ${tipo})
    RETURNING *
  `;
  return notif;
}

export async function getUserNotifications(userId: string) {
  return await sql`
    SELECT n.*, p.partido AS partido_nombre, p.hora_chile, p.grupo
    FROM notifications n
    LEFT JOIN partidos p ON n.partido_numero = p.numero
    WHERE n.user_id = ${userId}
    ORDER BY n.created_at DESC
  `;
}

export async function getActiveNotificationsByPartido(partidoNumero: number) {
  return await sql`
    SELECT n.*, u.email
    FROM notifications n
    JOIN users u ON n.user_id = u.id
    WHERE n.partido_numero = ${partidoNumero}
      AND n.activa = TRUE
      AND n.tipo_notificacion = 'email'
  `;
}

export async function deactivateNotification(id: string) {
  const [notif] = await sql`
    UPDATE notifications SET activa = FALSE
    WHERE id = ${id}
    RETURNING *
  `;
  return notif;
}

export async function deleteNotification(id: string) {
  await sql`
    DELETE FROM notifications WHERE id = ${id}
  `;
}
