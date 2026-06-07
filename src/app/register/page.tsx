"use client";

import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { registerAction } from "@/app/actions/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const registerWithState = async (_prev: { error: string } | null, formData: FormData) => registerAction(formData);
  const [state, formAction, pending] = useActionState(registerWithState, null);

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValido = password.length >= 6;
  const passwordsMatch = password === confirmPassword;
  const puedeEnviar = emailValido && passwordValido && passwordsMatch;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLocalError("");
    if (!passwordsMatch) {
      e.preventDefault();
      setLocalError("Las contraseñas no coinciden");
      return;
    }
  };

  const error = localError || state?.error;

  return (
    <div className="min-h-screen flex items-center justify-center px-gutter">
      <div className="glass-card rounded-xl border border-primary/10 shadow-2xl p-xl w-full max-w-md">
        <div className="text-center mb-lg">
          <div className="text-3xl mb-2">⚽</div>
          <h1 className="typo-headline-lg text-primary neon-text-cyan uppercase">
            Crear Cuenta
          </h1>
          <p className="typo-body-md text-text-muted mt-2">
            Regístrate para recibir notificaciones de los partidos
          </p>
        </div>

        <form action={formAction} onSubmit={handleSubmit} className="space-y-md">
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="typo-label-caps text-text-muted uppercase block mb-2"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
                lock
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la contraseña"
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-surface-navy border rounded-xl typo-body-md focus:outline-none focus:ring-1 transition-all placeholder:text-text-muted",
                  error
                    ? "border-error/50 focus:border-error focus:ring-error/30"
                    : "border-white/10 focus:border-primary focus:ring-primary/30"
                )}
              />
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
            disabled={!puedeEnviar || pending}
            className={cn(
              "w-full py-3 rounded-xl typo-label-caps uppercase tracking-wider transition-all cursor-pointer",
              puedeEnviar && !pending
                ? "bg-primary text-on-primary neon-glow-cyan hover:scale-[1.02]"
                : "bg-surface-container-high text-text-muted cursor-not-allowed"
            )}
          >
            {pending ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="typo-body-md text-text-muted text-center mt-lg">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/"
            className="text-primary neon-text-cyan hover:underline cursor-pointer"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
