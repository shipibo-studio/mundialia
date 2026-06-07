"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buscarCanal } from "@/lib/canales";
import type { Partido } from "@/types";
import { useAuth } from "@/components/auth-provider";
import { useSubscriptions } from "@/components/subscriptions-provider";
import { useToast } from "@/components/ui/toast";

function BadgeLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-transform inline-flex items-center gap-0.5"
      onClick={(e) => e.stopPropagation()}
      title={label}
    >
      {icon}
    </a>
  );
}

function CanalBadge({ nombre, className }: { nombre: string; className?: string }) {
  const canal = buscarCanal(nombre);

  return (
    <span className={cn(className, "inline-flex items-center gap-1")}>
      {nombre}
      {canal?.sitio && <BadgeLink href={canal.sitio} icon="🌐" label={`${nombre} - Sitio web`} />}
      {canal?.youtube && <BadgeLink href={canal.youtube} icon="▶️" label={`${nombre} - YouTube`} />}
    </span>
  );
}

interface MatchCardProps {
  partido: Partido;
}

export function MatchCard({ partido }: MatchCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const { loggedIn } = useAuth();
  const { subscribed, setOptimistic } = useSubscriptions();
  const { showToast } = useToast();
  const p = partido;

  const isSubscribed = subscribed[p.numero] ?? false;

  const handleToggle = async () => {
    setSubLoading(true);
    // Optimistic update
    setOptimistic(p.numero, !isSubscribed);
    const { toggleSubscription } = await import("@/app/actions/notifications");
    const result = await toggleSubscription(p.numero, !isSubscribed);
    if (result.ok) {
      showToast(
        !isSubscribed
          ? `🔔 Grupo ${p.grupo}: ${p.partido}`
          : `🔕 Grupo ${p.grupo}: ${p.partido}`,
        "success"
      );
    } else {
      // Revert on error
      setOptimistic(p.numero, isSubscribed);
      showToast(result.error || "Error al guardar", "error");
    }
    setSubLoading(false);
  };

  const isBrasil = p.nota?.toLowerCase().includes("brasil") ?? false;
  const isInaugural = p.nota?.toLowerCase().includes("inaugural") ?? false;

  const accentColorClass = isSubscribed
    ? "bg-fucsia"
    : isInaugural
      ? "bg-error"
      : isBrasil
        ? "bg-pitch-green"
        : "bg-primary/20";

  const cardBorderClass = isSubscribed
    ? "neon-border-fucsia"
    : isInaugural
      ? "neon-border-red"
      : isBrasil
        ? "neon-border-green"
        : "border-primary/10";

  const iconColorClass = isSubscribed
    ? "text-fucsia neon-text-fucsia"
    : isInaugural
      ? "text-error neon-text-red"
      : isBrasil
        ? "text-secondary-fixed-dim neon-text-green"
        : "text-primary neon-text-cyan";

  return (
    <div
      className={cn(
        "glass-card rounded-xl overflow-hidden border match-card-transition",
        cardBorderClass
      )}
    >
      <div className="flex cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={cn("w-1.5 shrink-0", accentColorClass)} />
        <div className="flex-1 p-md flex flex-col md:flex-row md:items-center justify-between gap-md">
          <div className="flex items-center gap-md flex-1 min-w-0">
            <div
              className={cn(
                "w-10 h-10 rounded-lg bg-surface-navy flex items-center justify-center typo-headline-md shrink-0",
                iconColorClass
              )}
            >
              #{p.numero}
            </div>
            <div className="min-w-0">
              <div className="typo-label-caps text-primary mb-0.5 neon-text-cyan uppercase">
                GRUPO {p.grupo}
              </div>
              <div className="typo-body-lg text-on-surface truncate">
                {p.partido}
              </div>
            </div>
            {isInaugural && (
              <span className="shrink-0 px-2 py-0.5 rounded bg-error/20 text-error text-[10px] font-bold uppercase tracking-wider neon-text-red">
                Inaugural
              </span>
            )}
          </div>
          <div className="flex items-center justify-center gap-xl md:border-l border-white/10 md:pl-xl shrink-0">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-xs">🇨🇱</span>
                <span className="typo-headline-md">
                  {p.hora_chile}
                </span>
              </div>
              <div className="typo-label-caps text-text-muted uppercase">
                CHILE
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-xs">🇧🇷</span>
                <span className="typo-headline-md">
                  {p.hora_brasil}
                </span>
              </div>
              <div className="typo-label-caps text-text-muted uppercase">
                BRASIL
              </div>
            </div>
            <span
              className={cn(
                "material-symbols-outlined text-text-muted transition-transform duration-300",
                expanded && "rotate-180"
              )}
            >
              expand_more
            </span>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="bg-surface-navy border-t border-white/5 p-lg">
          <div className="grid md:grid-cols-3 gap-lg">
            <div className="col-span-1">
              <div className="typo-label-caps text-text-muted mb-2 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>
                Sede
              </div>
              <div className="typo-body-md">{p.sede}</div>
            </div>
            <div className="col-span-2 grid md:grid-cols-2 gap-md">
              <div className="space-y-3">
                <div className="typo-label-caps text-chile-blue uppercase">
                  🇨🇱 Cobertura Chile
                </div>
                <div className="flex flex-wrap gap-xs">
                  {p.canales_chile ? (
                    <>
                      {p.canales_chile.abierta?.map((c) => (
                        <CanalBadge
                          key={c}
                          nombre={c}
                          className="px-3 py-1 rounded bg-white/5 text-xs border border-white/10"
                        />
                      ))}
                      {p.canales_chile.pago?.map((c) => (
                        <CanalBadge
                          key={c}
                          nombre={c}
                          className="px-3 py-1 rounded bg-chile-blue/20 text-white text-xs border border-chile-blue/30"
                        />
                      ))}
                    </>
                  ) : (
                    <span className="text-xs text-text-muted italic">
                      Consultar operador local
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <div className="typo-label-caps text-primary uppercase neon-text-cyan">
                  🇧🇷 Cobertura Brasil
                </div>
                <div className="flex flex-wrap gap-xs">
                  {p.canales_brasil ? (
                    <>
                      {p.canales_brasil.abierta?.map((c) => (
                        <CanalBadge
                          key={c}
                          nombre={c}
                          className="px-3 py-1 rounded bg-primary/20 text-white text-xs border border-primary/30"
                        />
                      ))}
                      {p.canales_brasil.youtube?.map((c) => (
                        <CanalBadge
                          key={c}
                          nombre={c}
                          className="px-3 py-1 rounded bg-error/20 text-error text-xs border border-error/30"
                        />
                      ))}
                    </>
                  ) : (
                    <span className="text-xs text-text-muted italic">
                      CazéTV (YouTube) / Globo
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Subscribe checkbox */}
          {loggedIn && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <label
                className="flex items-center gap-3 cursor-pointer group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isSubscribed}
                    disabled={subLoading}
                    onChange={handleToggle}
                    className="sr-only peer"
                  />
                  <div
                    className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
                      "peer-checked:neon-border-fucsia peer-checked:bg-fucsia/20",
                      "border-white/20 group-hover:border-fucsia/50",
                      subLoading && "opacity-50"
                    )}
                  >
                    {isSubscribed && (
                      <span className="material-symbols-outlined text-xs text-fucsia neon-text-fucsia">
                        check
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={cn(
                    "typo-body-md transition-all duration-200",
                    isSubscribed
                      ? "text-fucsia neon-text-fucsia"
                      : "text-text-muted group-hover:text-fucsia"
                  )}
                >
                  {isSubscribed
                    ? "🔔 Notificaciones activadas"
                    : "🔕 Notificarme"}
                </span>
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
