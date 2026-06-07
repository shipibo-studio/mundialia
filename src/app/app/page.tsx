"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { mundialData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/hero";
import { MatchCard } from "@/components/match-card";
import { KnockoutCard } from "@/components/knockout-card";
import { SubscriptionsProvider } from "@/components/subscriptions-provider";
import { formatFechaCompleta } from "@/lib/utils";
import type { Partido, Jornada } from "@/types";

const groups = [
  { id: "todos", label: "TODOS" },
  { id: "A", label: "A" }, { id: "B", label: "B" }, { id: "C", label: "C" },
  { id: "D", label: "D" }, { id: "E", label: "E" }, { id: "F", label: "F" },
  { id: "G", label: "G" }, { id: "H", label: "H" }, { id: "I", label: "I" },
  { id: "J", label: "J" }, { id: "K", label: "K" }, { id: "L", label: "L" },
];

export default function FixturePage() {
  const [activeTab, setActiveTab] = useState("fixture");
  const [filterGroup, setFilterGroup] = useState("todos");
  const [search, setSearch] = useState("");

  const filteredJornadas = useMemo(() => {
    return mundialData.fixture.fase_grupos
      .filter((j): j is Jornada & { partidos: Partido[] } => !!j.partidos)
      .map((jornada) => ({
        ...jornada,
        partidos: jornada.partidos.filter((p: Partido) => {
          const matchesGroup = filterGroup === "todos" || p.grupo === filterGroup;
          const q = search.toLowerCase();
          const matchesSearch = !q || p.partido.toLowerCase().includes(q);
          return matchesGroup && matchesSearch;
        }),
      }))
      .filter((j) => j.partidos.length > 0);
  }, [filterGroup, search]);

  const allPartidos = useMemo(() => {
    const nums: number[] = [];
    for (const j of mundialData.fixture.fase_grupos) {
      if (j.partidos) for (const p of j.partidos) nums.push(p.numero);
    }
    return nums;
  }, []);

  const hasResults = filteredJornadas.length > 0;
  const todayStr = new Date().toISOString().slice(0, 10);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && ["fixture", "eliminatorias"].includes(tab)) setActiveTab(tab);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      setActiveTab(tab && ["fixture", "eliminatorias"].includes(tab) ? tab : "fixture");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (scrolledRef.current || filterGroup !== "todos" || search) return;
    const target = document.getElementById(`jornada-${todayStr}`);
    if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); scrolledRef.current = true; }
  }, [filteredJornadas, filterGroup, search]);

  return (
    <>
      <Hero torneo={mundialData.torneo} />

      {/* Fixture */}
      <section className={activeTab !== "fixture" ? "hidden" : ""}>
        <div className="flex flex-col md:flex-row gap-lg items-end mb-lg">
          <div className="w-full md:w-auto overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-xs" id="group-filters">
              <span className="typo-label-caps font-bold text-text-muted self-center mr-2 shrink-0">GRUPOS:</span>
              {groups.map((g) => (
                <button key={g.id}
                  className={cn("whitespace-nowrap px-4 py-2 rounded-full typo-label-caps font-bold transition-all cursor-pointer",
                    filterGroup === g.id ? "bg-primary text-on-primary neon-glow-cyan" : "bg-surface-navy text-on-surface-variant border border-white/10 hover:border-primary"
                  )}
                  onClick={() => setFilterGroup(g.id)}
                >{g.label}</button>
              ))}
            </div>
          </div>
          <div className="w-full md:flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">search</span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-navy border border-white/10 rounded-xl typo-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-text-muted"
              placeholder="Buscar equipo..." value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <SubscriptionsProvider partidos={allPartidos}>
          <div className="space-y-lg">
            {hasResults ? filteredJornadas.map((jornada) => (
              <div key={jornada.fecha} id={`jornada-${jornada.fecha}`} className={cn("space-y-md", jornada.fecha && jornada.fecha < todayStr && "match-past")}>
                <div className="flex items-center gap-md border-b border-white/5 pb-2 mt-8">
                  <span className="typo-headline-md text-primary neon-text-cyan uppercase">{formatFechaCompleta(jornada.dia!, jornada.fecha!)}</span>
                  <div className="h-px bg-white/5 flex-1" />
                  <span className="typo-label-caps bg-surface-navy px-3 py-1 rounded-full border border-white/10">{jornada.partidos.length} Partidos</span>
                </div>
                <div className="grid gap-md">
                  {jornada.partidos.map((p) => (<MatchCard key={p.numero} partido={p} />))}
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-20 text-text-muted">
                <span className="material-symbols-outlined text-[42px] mb-4">search_off</span>
                <p className="typo-body-lg">No se encontraron partidos que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </SubscriptionsProvider>
      </section>

      {/* Eliminatorias */}
      <section className={activeTab !== "eliminatorias" ? "hidden" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {Object.entries(mundialData.fixture.fase_eliminatoria).map(([key, data]) => (
            <KnockoutCard key={key} nombre={key.replace(/_/g, " ")} data={data} />
          ))}
        </div>
      </section>


    </>
  );
}
