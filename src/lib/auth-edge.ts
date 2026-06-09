import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "fallback-secret-no-usar-en-prod"
);

export async function verifyToken(token: string) {
  try {
    console.log("[auth-edge] Verifying token, length:", token.length);
    console.log("[auth-edge] Secret configured:", process.env.NEXTAUTH_SECRET ? "YES" : "NO (using fallback)");

    const { payload } = await jwtVerify(token, SECRET);
    console.log("[auth-edge] Token verified successfully for:", payload.email);
    return payload as { id: string; email: string };
  } catch (err) {
    console.error("[auth-edge] Token verification failed:", err instanceof Error ? err.message : "Unknown error");
    return null;
  }
}
