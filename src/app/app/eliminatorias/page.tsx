"use client";

import { mundialData } from "@/lib/data";
import { KnockoutCard } from "@/components/knockout-card";
import { cn } from "@/lib/utils";

// Datos del bracket según PDF brasileño
const bracketData = {
  segundaFase: [
    { slot: "29/06 · 14h", sede: "Houston", llave: "1º Grupo C vs 2º Grupo F" },
    { slot: "29/06 · 17h30", sede: "Foxborough", llave: "1º Grupo E vs 3º Grupo (A,B,C,D,F)" },
    { slot: "30/06 · 14h", sede: "Dallas", llave: "2º Grupo E vs 2º Grupo I" },
    { slot: "30/06 · 18h", sede: "East Rutherford", llave: "1º Grupo I vs 3º Grupo (C,D,F,G,H)" },
    { slot: "30/06 · 22h", sede: "Ciudad de México", llave: "1º Grupo A vs 3º Grupo (C,E,F,H,I)" },
    { slot: "01/07 · 13h", sede: "Atlanta", llave: "1º Grupo L vs 3º Grupo (E,H,I,J,K)" },
    { slot: "01/07 · 17h", sede: "Seattle", llave: "1º Grupo G vs 3º Grupo (A,E,H,I,J)" },
    { slot: "01/07 · 21h", sede: "Santa Clara", llave: "1º Grupo D vs 3º Grupo (B,E,F,I,J)" },
    { slot: "02/07 · 16h", sede: "Inglewood", llave: "1º Grupo H vs 2º Grupo J" },
    { slot: "02/07 · 20h", sede: "Toronto", llave: "2º Grupo K vs 2º Grupo L" },
    { slot: "03/07 · 0h", sede: "Vancouver", llave: "1º Grupo B vs 3º Grupo (E,F,G,I,J)" },
    { slot: "03/07 · 15h", sede: "Dallas", llave: "2º Grupo D vs 2º Grupo G" },
    { slot: "03/07 · 19h", sede: "Miami", llave: "1º Grupo J vs 2º Grupo H" },
    { slot: "03/07 · 22h30", sede: "Kansas City", llave: "1º Grupo K vs 3º Grupo (D,E,I,J,L)" },
  ],
  octavos: [
    { slot: "04/07 · 14h", sede: "Houston", llave: "Ganador SF1 vs Ganador SF2" },
    { slot: "04/07 · 18h", sede: "Filadelfia", llave: "Ganador SF3 vs Ganador SF4" },
    { slot: "05/07 · 17h", sede: "East Rutherford", llave: "Ganador SF5 vs Ganador SF6" },
    { slot: "05/07 · 21h", sede: "Ciudad de México", llave: "Ganador SF7 vs Ganador SF8" },
    { slot: "06/07 · 16h", sede: "Dallas", llave: "Ganador SF9 vs Ganador SF10" },
    { slot: "06/07 · 21h", sede: "Seattle", llave: "Ganador SF11 vs Ganador SF12" },
    { slot: "07/07 · 13h", sede: "Atlanta", llave: "Ganador SF13 vs Ganador SF14" },
    { slot: "07/07 · 17h", sede: "Vancouver", llave: "Ganador SF15 vs --" },
  ],
  cuartos: [
    { slot: "09/07 · 17h", sede: "Foxborough", llave: "Ganador O1 vs Ganador O2" },
    { slot: "10/07 · 18h", sede: "Inglewood", llave: "Ganador O3 vs Ganador O4" },
    { slot: "11/07 · 18h", sede: "Miami", llave: "Ganador O5 vs Ganador O6" },
    { slot: "11/07 · 22h", sede: "Kansas City", llave: "Ganador O7 vs Ganador O8" },
  ],
};

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

export default function EliminatoriasPage() {
  const fases = Object.entries(mundialData.fixture.fase_eliminatoria);

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

      {/* Bracket — Segunda Fase */}
      <div className="mt-xl pt-xl border-t border-white/5">
        <BracketSection
          title="🔹 Segunda Fase"
          matches={bracketData.segundaFase}
          color="text-primary neon-text-cyan"
        />
      </div>

      <div className="border-t border-white/5 pt-xl">
        <BracketSection
          title="🔸 Octavos de Final"
          matches={bracketData.octavos}
          color="text-chile-blue"
        />
      </div>

      <div className="border-t border-white/5 pt-xl">
        <BracketSection
          title="🔹 Cuartos de Final"
          matches={bracketData.cuartos}
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
