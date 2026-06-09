import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/queries";
import { createToken, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email?.trim() || !password) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Correo electrónico inválido" },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  const token = await createToken({ id: user.id, email: user.email });

  // Cookie configurada correctamente para same-site
  const maxAge = 60 * 60 * 24 * 7; // 7 días
  const expires = new Date(Date.now() + maxAge * 1000);

  const response = NextResponse.json({ ok: true });

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax", // lax es correcto para same-site navigation
    maxAge,
    expires,
    path: "/",
  });

  const host = request.headers.get("host");
  console.log("[login] ✅ Cookie SET for user:", user.email);
  console.log("[login] Host:", host);
  console.log("[login] Token preview:", token.substring(0, 30) + "...");
  console.log("[login] Expires:", expires.toISOString());
  console.log("[login] Set-Cookie header:", response.cookies.toString());

  return response;
}
