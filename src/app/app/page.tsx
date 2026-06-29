"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { mundialData } from "@/lib/data";
import { KnockoutCard } from "@/components/knockout-card";
import { cn, formatFechaCompleta } from "@/lib/utils";
import { buscarCanal } from "@/lib/canales";
import { useSubscriptions, SubscriptionsProvider } from "@/components/subscriptions-provider";
import { useToast } from "@/components/ui/toast";
import type { EliminatoriaMatch } from "@/types";

const bracketOctavos = [
  { slot: "04/07 · 14h", sede: "Houston", llave: "Ganador SF1 vs Ganador SF2" },
  { slot: "04/07 · 18h", sede: "Filadelfia", llave: "Ganador SF3 vs Ganador SF4" },
  { slot: "05/07 · 17h", sede: "East Rutherford", llave: "Ganador SF5 vs Ganador SF6" },
  { slot: "05/07 · 21h", sede: "Ciudad de México", llave: "Ganador SF7 vs Ganador SF8" },
  { slot: "06/07 · 16h", sede: "Dallas", llave: "Ganador SF9 vs Ganador SF10" },
  { slot: "06/07 · 21h", sede: "Seattle", llave: "Ganador SF11 vs Ganador SF12" },
  { slot: "07/07 · 13h", sede: "Atlanta", llave: "Ganador SF13 vs Ganador SF14" },
  { slot: "07/07 · 17h", sede: "Vancouver", llave: "Ganador SF15 vs --" },
];

const bracketCuartos = [
  { slot: "09/07 · 17h", sede: "Foxborough", llave: "Ganador O1 vs Ganador O2" },
  { slot: "10/07 · 18h", sede: "Inglewood", llave: "Ganador O3 vs Ganador O4" },
  { slot: "11/07 · 18h", sede: "Miami", llave: "Ganador O5 vs Ganador O6" },
  { slot: "11/07 · 22h", sede: "Kansas City", llave: "Ganador O7 vs Ganador O8" },
];

function BracketSection({ title, matches, color }: { title: string; matches: { slot: string; sede: string; llave: string }[]; color: string }) {
  return (
    <div className="mb-xl">
      <h2 className={cn("typo-headline-md uppercase mb-lg tracking-wide", color)}>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
        {matches.map((m, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-md border border-white/5 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="typo-label-caps text-primary neon-text-cyan uppercase tracking-wider">
                {m.slot}
              </span>
              <span className="typo-micro text-text-muted">{m.sede}</span>
            </div>
            <div className="typo-body-md text-on-surface font-semibold">
              {m.llave}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SegundaFaseCards({
  gruposPorFecha,
  todayStr,
  diaDesdeFecha,
  canalesChile,
  canalesBrasil,
}: {
  gruposPorFecha: [string, EliminatoriaMatch[]][];
  todayStr: string;
  diaDesdeFecha: (f: string) => string;
  canalesChile: { abierta?: string[] } | undefined;
  canalesBrasil: { abierta?: string[]; youtube?: string[] } | undefined;
}) {
  const { subscribed, setOptimistic } = useSubscriptions();
  const { showToast } = useToast();
  const [subLoading, setSubLoading] = useState<Record<number, boolean>>({});

  const handleToggle = async (p: EliminatoriaMatch) => {
    const isSub = subscribed[p.numero] ?? false;
    setSubLoading((prev) => ({ ...prev, [p.numero]: true }));
    setOptimistic(p.numero, !isSub);
    const token = localStorage.getItem("auth_token") || undefined;
    const { toggleSubscription } = await import("@/app/actions/notifications");
    const result = await toggleSubscription(p.numero, !isSub, token);
    if (result.ok) {
      showToast(
        !isSub
          ? `🔔 Segunda Fase: ${p.partido}`
          : `🔕 Segunda Fase: ${p.partido}`,
        "success"
      );
    } else {
      setOptimistic(p.numero, isSub);
      showToast(result.error || "Error al guardar", "error");
    }
    setSubLoading((prev) => ({ ...prev, [p.numero]: false }));
  };

  return (
    <div className="mt-xl pt-xl border-t border-white/5">
      <h2 className="typo-headline-md text-primary neon-text-cyan uppercase mb-lg tracking-wide">
        🔹 Segunda Fase
      </h2>

      <div className="space-y-lg">
        {gruposPorFecha.map(([fecha, matches]) => (
          <div key={fecha} id={`fecha-${fecha}`} className={cn("space-y-md", fecha < todayStr && "match-past")}>

            <div className="flex items-center gap-md border-b border-white/5 pb-2 mt-8">
              <span className="typo-headline-md text-primary neon-text-cyan uppercase">
                {formatFechaCompleta(diaDesdeFecha(fecha), fecha)}
              </span>
              <div className="h-px bg-white/5 flex-1" />
              <span className="typo-label-caps bg-surface-navy px-3 py-1 rounded-full border border-white/10">
                {matches.length} Partido{matches.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid gap-md">
              {matches.map((p) => {
                const isPast = fecha < todayStr || !!p.resultado;
                const isSubscribed = subscribed[p.numero] ?? false;
                return (
                  <div key={p.numero} id={`elim-${p.numero}`}>
                    <div className={cn(
                      "glass-card rounded-xl overflow-hidden border transition-all",
                      isSubscribed
                        ? "neon-border-fucsia"
                        : isPast
                          ? "border-white/5 opacity-80"
                          : "border-primary/20 neon-border-cyan hover:shadow-xl hover:scale-[1.01] cursor-pointer"
                    )}>
                      <div className="flex">
                        <div className={cn(
                          "w-1.5 shrink-0",
                          isSubscribed ? "bg-fucsia" : isPast ? "bg-white/20" : "bg-primary"
                        )} />
                        <div className="flex-1 p-md flex flex-col md:flex-row md:items-center justify-between gap-md">
                          <div className="flex items-center gap-md flex-1 min-w-0">
                            <div className={cn(
                              "w-10 h-10 rounded-lg bg-surface-navy flex items-center justify-center typo-headline-md shrink-0",
                              isSubscribed ? "text-fucsia neon-text-fucsia" : isPast ? "text-white/40" : "text-primary neon-text-cyan"
                            )}>
                              #{p.numero}
                            </div>
                            <div className="min-w-0">
                              <div className="typo-label-caps text-primary mb-0.5 neon-text-cyan uppercase">
                                SEGUNDA FASE
                              </div>
                              <div className="typo-body-lg text-on-surface truncate">
                                {p.partido}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-xl md:border-l border-white/10 md:pl-xl shrink-0">
                            {p.resultado ? (
                              <div className="text-center min-w-[90px]">
                                <div className="typo-headline-md text-primary neon-text-cyan font-bold tracking-widest">
                                  {p.resultado}
                                </div>
                                <div className="typo-label-caps text-text-muted uppercase">
                                  FINAL
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="text-center">
                                  <div className="flex items-center justify-center gap-1 mb-1">
                                    <span className="text-xs">🇨🇱</span>
                                    <span className="typo-headline-md">{p.hora_chile}</span>
                                  </div>
                                  <div className="typo-label-caps text-text-muted uppercase">
                                    CHILE
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="flex items-center justify-center gap-1 mb-1">
                                    <span className="text-xs">🇧🇷</span>
                                    <span className="typo-headline-md">{p.hora_brasil}</span>
                                  </div>
                                  <div className="typo-label-caps text-text-muted uppercase">
                                    BRASIL
                                  </div>
                                </div>
                              </>
                            )}
                            {!isPast && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggle(p);
                                }}
                                disabled={subLoading[p.numero]}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer",
                                  isSubscribed
                                    ? "bg-fucsia/15 border-fucsia/40 neon-border-fucsia text-fucsia neon-text-fucsia shadow-lg shadow-fucsia/10"
                                    : "bg-surface-navy border-white/10 text-text-muted hover:border-primary/30 hover:text-primary"
                                )}
                                title={isSubscribed ? "Desactivar notificación" : "Activar notificación"}
                              >
                                {subLoading[p.numero] ? (
                                  <span className="material-symbols-outlined text-base animate-spin">sync</span>
                                ) : (
                                  <span className="material-symbols-outlined text-base">
                                    {isSubscribed ? "notifications_active" : "notifications_none"}
                                  </span>
                                )}
                                <span className="typo-label-caps font-bold whitespace-nowrap">
                                  {isSubscribed ? "NOTIFICADO" : "NOTIFICAR"}
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Sede + canales */}
                      <div className="border-t border-white/5 px-md py-3 bg-surface-navy/50">
                        <div className="flex flex-wrap items-center gap-x-lg gap-y-2 text-xs">
                          <div className="flex items-center gap-1 text-text-muted">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            <span>{p.sede}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-chile-blue">🇨🇱</span>
                            {canalesChile?.abierta?.map(c => {
                              const info = buscarCanal(c);
                              return info?.sitio ? (
                                <a key={c} href={info.sitio} target="_blank" rel="noopener noreferrer" className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">{c}</a>
                              ) : (
                                <span key={c} className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{c}</span>
                              );
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-primary neon-text-cyan">🇧🇷</span>
                            {canalesBrasil?.abierta?.map(c => {
                              const info = buscarCanal(c);
                              return info?.sitio ? (
                                <a key={c} href={info.sitio} target="_blank" rel="noopener noreferrer" className="px-2 py-0.5 rounded bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors cursor-pointer">{c}</a>
                              ) : (
                                <span key={c} className="px-2 py-0.5 rounded bg-primary/20 border border-primary/30">{c}</span>
                              );
                            })}
                            {canalesBrasil?.youtube?.map(c => {
                              const info = buscarCanal(c);
                              return info?.sitio ? (
                                <a key={c} href={info.sitio} target="_blank" rel="noopener noreferrer" className="px-2 py-0.5 rounded bg-error/20 text-error border border-error/30 hover:bg-error/30 transition-colors cursor-pointer">{c}</a>
                              ) : (
                                <span key={c} className="px-2 py-0.5 rounded bg-error/20 text-error border border-error/30">{c}</span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EliminatoriasPage() {
  const segundaFase = mundialData.fixture.fase_eliminatoria.segunda_fase;
  const partidos: EliminatoriaMatch[] = Array.isArray(segundaFase.partidos) ? segundaFase.partidos : [];

  const todayStr = new Date().toLocaleDateString('en-CA');
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const scrolledRef = useRef(false);

  function diaDesdeFecha(fecha: string) {
    const d = new Date(fecha + "T12:00:00");
    return diasSemana[d.getDay()];
  }

  // Agrupar partidos por fecha
  const gruposPorFecha = useMemo(() => {
    const map = new Map<string, typeof partidos>();
    for (const p of partidos) {
      const f = p.fecha ?? "";
      if (!map.has(f)) map.set(f, []);
      map.get(f)!.push(p);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [partidos]);

  // Auto-scroll a la fecha/hora actual
  useEffect(() => {
    if (scrolledRef.current) return;
    const now = new Date();
    const todayLocal = now.toLocaleDateString('en-CA');
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    let targetId: string | null = null;
    for (const [fecha, matches] of gruposPorFecha) {
      if (fecha < todayLocal) continue;
      if (fecha === todayLocal) {
        // Buscar el primer partido de HOY que aún no haya pasado
        for (const p of matches) {
          const [h, m] = p.hora_chile.split(":").map(Number);
          if (h > currentHour || (h === currentHour && m >= currentMin)) {
            targetId = `elim-${p.numero}`;
            break;
          }
        }
        // Si todos los partidos de hoy ya pasaron, scrollear al header de hoy
        if (!targetId) {
          targetId = `fecha-${fecha}`;
        }
        break;
      } else {
        // Fecha futura: scrollear al header de esa fecha
        targetId = `fecha-${fecha}`;
        break;
      }
    }

    if (!targetId) {
      const last = gruposPorFecha[gruposPorFecha.length - 1];
      if (last) targetId = `fecha-${last[0]}`;
    }

    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          const offsetTop = target.offsetTop - 120;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
          scrolledRef.current = true;
        }, 300);
      }
    }
    scrolledRef.current = true;
  }, [gruposPorFecha]);

  const fases = Object.entries(mundialData.fixture.fase_eliminatoria);
  const allPartidos = partidos.map((p) => p.numero);

  return (
    <section>
      {/* Hero */}
      <div className="text-center mb-xl">
        <h1 className="typo-display-hero text-primary neon-text-cyan uppercase mb-2">
          🏆 Fase Eliminatoria
        </h1>
        <p className="typo-body-lg text-text-muted max-w-2xl mx-auto">
          32 equipos · 16 segunda fase · 8 octavos · 4 cuartos · 2 semifinales · 1 final
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-primary neon-border-cyan">
          <div className="typo-stat-lg text-primary font-bold tracking-tight neon-text-cyan">16</div>
          <div className="typo-label-caps text-text-muted">SEGUNDA FASE</div>
        </div>
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-chile-blue">
          <div className="typo-stat-lg text-on-surface font-bold tracking-tight">8</div>
          <div className="typo-label-caps text-text-muted">OCTAVOS</div>
        </div>
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-pitch-green neon-border-green">
          <div className="typo-stat-lg text-secondary font-bold tracking-tight neon-text-green">4</div>
          <div className="typo-label-caps text-text-muted">CUARTOS</div>
        </div>
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-error neon-border-red">
          <div className="typo-stat-lg text-error font-bold tracking-tight neon-text-red">2</div>
          <div className="typo-label-caps text-text-muted">SEMIFINALES</div>
        </div>
      </div>

      {/* Fases cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-xl">
        {fases.map(([key, data]) => (
          <KnockoutCard key={key} nombre={key.replace(/_/g, " ")} data={data} />
        ))}
      </div>

      {/* Segunda Fase — como Fixture */}
      <SubscriptionsProvider partidos={allPartidos}>
        <SegundaFaseCards
          gruposPorFecha={gruposPorFecha}
          todayStr={todayStr}
          diaDesdeFecha={diaDesdeFecha}
          canalesChile={segundaFase.canales_chile}
          canalesBrasil={segundaFase.canales_brasil}
        />
      </SubscriptionsProvider>

      <div className="border-t border-white/5 pt-xl">
        <BracketSection
          title="🔸 Octavos de Final"
          matches={bracketOctavos}
          color="text-chile-blue"
        />
      </div>

      <div className="border-t border-white/5 pt-xl">
        <BracketSection
          title="🔹 Cuartos de Final"
          matches={bracketCuartos}
          color="text-secondary neon-text-green"
        />
      </div>

      {/* Semifinales + Final bracket */}
      <div className="border-t border-white/5 pt-xl mb-xl">
        <h2 className="typo-headline-md text-error neon-text-red uppercase mb-lg tracking-wide">
          🏆 Semifinales & Final
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div className="glass-card rounded-xl p-lg border border-white/5 text-center">
            <div className="typo-label-caps text-error neon-text-red mb-2">Semifinal 1</div>
            <div className="typo-body-md">14/07 · 16h</div>
            <div className="typo-body-md text-text-muted">Dallas</div>
            <div className="typo-body-md font-semibold mt-2">Ganador C1 vs Ganador C2</div>
          </div>
          <div className="glass-card rounded-xl p-lg border border-white/5 text-center">
            <div className="typo-label-caps text-error neon-text-red mb-2">Semifinal 2</div>
            <div className="typo-body-md">15/07 · 16h</div>
            <div className="typo-body-md text-text-muted">Atlanta</div>
            <div className="typo-body-md font-semibold mt-2">Ganador C3 vs Ganador C4</div>
          </div>
        </div>

        <div className="flex justify-center mt-lg">
          <div className="glass-card rounded-xl p-xl border-2 border-primary neon-border-cyan text-center w-full">
            <div className="text-3xl mb-2">🏆</div>
            <div className="typo-label-caps text-primary neon-text-cyan mb-1">FINAL</div>
            <div className="typo-headline-lg text-primary neon-text-cyan">19/07 · 16h</div>
            <div className="typo-body-md text-text-muted">MetLife Stadium, East Rutherford</div>
            <div className="typo-body-md font-bold mt-2">Ganador SF1 vs Ganador SF2</div>
          </div>
        </div>

        <div className="flex justify-center mt-md">
          <div className="glass-card rounded-xl p-lg border border-white/5 text-center w-full">
            <div className="typo-label-caps text-text-muted mb-1">🥉 3º Lugar</div>
            <div className="typo-body-md">18/07 · 18h · Miami</div>
            <div className="typo-body-md font-semibold">Perdedor SF1 vs Perdedor SF2</div>
          </div>
        </div>
      </div>

      <p className="typo-micro text-text-muted text-center mt-xl">
        Horarios en hora de Chile (UTC-4) · Brasil (UTC-3) · Fuente: fixture oficial FIFA
      </p>
    </section>
  );
}
