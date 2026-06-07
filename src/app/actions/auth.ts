"use server";

import { createUser, getUserByEmail } from "@/lib/queries";
import {
  createToken,
  hashPassword,
  setSession,
  verifyPassword,
} from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validaciones
  if (!email?.trim() || !password) {
    return { error: "Todos los campos son obligatorios" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Correo electrónico inválido" };
  }
  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres" };
  }

  // Buscar usuario
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "Credenciales inválidas" };
  }

  // Verificar password
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return { error: "Credenciales inválidas" };
  }

  // Crear sesión
  const token = await createToken({ id: user.id, email: user.email });
  await setSession(token);

  redirect("/app");
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email?.trim() || !password) {
    return { error: "Todos los campos son obligatorios" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Correo electrónico inválido" };
  }
  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres" };
  }

  // Verificar si ya existe
  const existing = await getUserByEmail(email);
  if (existing) {
    return { error: "Este correo ya está registrado" };
  }

  // Crear usuario
  const hashed = await hashPassword(password);
  await createUser(email, hashed);

  // Iniciar sesión automáticamente
  const user = await getUserByEmail(email);
  const token = await createToken({ id: user!.id, email: user!.email });
  await setSession(token);

  redirect("/app");
}
