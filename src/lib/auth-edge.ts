import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "fallback-secret-no-usar-en-prod"
);

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { id: string; email: string };
  } catch {
    return null;
  }
}
