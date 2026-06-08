"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.loggedIn) router.replace("/app");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-xl p-xl border border-primary/10 shadow-2xl text-center">
          <p className="typo-body-lg text-text-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValido = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password }),
        redirect: "manual", // no seguir redirect automático
      });

      if (res.ok || res.status === 302 || res.status === 307) {
        // Login exitoso, redirigir manualmente
        // La cookie ya está seteada por el route handler
        window.location.href = "/app";
        return;
      }

      const data = await res.json();
      setError(data.error || "Error al iniciar sesión");
    } catch {
      setError("Error de conexión");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-gutter">
      <div className="glass-card rounded-xl border border-primary/10 shadow-2xl p-xl w-full sm:max-w-2/3 md:max-w-1/3">
        <div className="text-center mb-lg">
          <div className="text-3xl mb-2">⚽</div>
          <h1 className="typo-headline-lg text-primary neon-text-cyan uppercase">
            Iniciar Sesión
          </h1>
          <p className="typo-body-md text-text-muted mt-2">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-md">
          <div>
            <label
              htmlFor="email"
              className="typo-label-caps text-text-muted uppercase block mb-2"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
                mail
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="tu@correo.cl"
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-surface-navy border rounded-xl typo-body-md focus:outline-none focus:ring-1 transition-all placeholder:text-text-muted",
                  error
                    ? "border-error/50 focus:border-error focus:ring-error/30"
                    : "border-white/10 focus:border-primary focus:ring-primary/30"
                )}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="typo-label-caps text-text-muted uppercase block mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
                lock
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className={cn(
                  "w-full pl-10 pr-12 py-3 bg-surface-navy border rounded-xl typo-body-md focus:outline-none focus:ring-1 transition-all placeholder:text-text-muted",
                  error
                    ? "border-error/50 focus:border-error focus:ring-error/30"
                    : "border-white/10 focus:border-primary focus:ring-primary/30"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors cursor-pointer"
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-error/10 border border-error/20">
              <span className="material-symbols-outlined text-error text-sm">
                error
              </span>
              <span className="typo-body-md text-error">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!emailValido || !passwordValido || pending}
            className={cn(
              "w-full py-3 rounded-xl typo-label-caps uppercase tracking-wider transition-all cursor-pointer",
              emailValido && passwordValido && !pending
                ? "bg-primary text-on-primary neon-glow-cyan hover:scale-[1.02]"
                : "bg-surface-container-high text-text-muted cursor-not-allowed"
            )}
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
