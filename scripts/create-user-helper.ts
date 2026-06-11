import sql from "@/lib/db";
import { hashPassword } from "@/lib/auth";

async function createUser(email: string, password: string) {
  try {
    if (!email || !password) {
      console.error("❌ Email y contraseña son requeridos");
      process.exit(1);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.error("❌ Email inválido");
      process.exit(1);
    }

    if (password.length < 6) {
      console.error("❌ La contraseña debe tener al menos 6 caracteres");
      process.exit(1);
    }

    // Hashear contraseña usando la función del proyecto
    const passwordHash = await hashPassword(password);

    // Insertar usuario
    const [user] = await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING id, email, created_at
    `;

    console.log("✅ Usuario creado exitosamente");
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Creado: ${user.created_at}`);
  } catch (error: any) {
    if (error.code === "23505") {
      console.error("❌ Error: El email ya existe en la BD");
    } else {
      console.error("❌ Error:", error.message);
    }
    process.exit(1);
  }
}

const [, , email, password] = process.argv;
createUser(email, password);
