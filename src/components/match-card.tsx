"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Partido } from "@/types";

interface MatchCardProps {
  partido: Partido;
}

export function MatchCard({ partido }: MatchCardProps) {
  const [expanded, setExpanded] = useState(false);
  const p = partido;

  const isBrasil = p.nota?.toLowerCase().includes("brasil") ?? false;
  const isInaugural = p.nota?.toLowerCase().includes("inaugural") ?? false;

  const accentColorClass = isInaugural
    ? "bg-error"
    : isBrasil
      ? "bg-pitch-green"
      : "bg-primary/20";

  const cardBorderClass = isInaugural
    ? "neon-border-red"
    : isBrasil
      ? "neon-border-green"
      : "border-primary/10";

  const iconColorClass = isInaugural
    ? "text-error neon-text-red"
    : isBrasil
      ? "text-secondary-fixed-dim neon-text-green"
      : "text-primary neon-text-cyan";

  return (
    <div
      className={cn(
        "glass-card rounded-xl overflow-hidden border match-card-transition cursor-pointer hover:shadow-xl hover:scale-[1.01]",
        cardBorderClass
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex">
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
            {isBrasil && (
              <span className="shrink-0 px-2 py-0.5 rounded bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider neon-text-green">
                Brasil
              </span>
            )}
          </div>
          <div className="flex items-center gap-xl md:border-l border-white/10 md:pl-xl shrink-0">
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
                        <span
                          key={c}
                          className="px-3 py-1 rounded bg-white/5 text-xs border border-white/10"
                        >
                          {c}
                        </span>
                      ))}
                      {p.canales_chile.pago?.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1 rounded bg-chile-blue/20 text-white text-xs border border-chile-blue/30"
                        >
                          {c}
                        </span>
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
                        <span
                          key={c}
                          className="px-3 py-1 rounded bg-primary/20 text-white text-xs border border-primary/30"
                        >
                          {c}
                        </span>
                      ))}
                      {p.canales_brasil.youtube?.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1 rounded bg-error/20 text-error text-xs border border-error/30"
                        >
                          {c}
                        </span>
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
        </div>
      )}
    </div>
  );
}
