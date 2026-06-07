"use client";

import { mundialData } from "@/lib/data";
import { CanalesCard } from "@/components/canales-card";

export default function CanalesPage() {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-md mb-xl">
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-primary neon-border-cyan">
          <div className="typo-stat-lg text-primary font-bold tracking-tight neon-text-cyan">104</div>
          <div className="typo-label-caps text-text-muted">PARTIDOS</div>
        </div>
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-chile-blue">
          <div className="typo-stat-lg text-on-surface font-bold tracking-tight">52</div>
          <div className="typo-label-caps text-text-muted">CHV (CL)</div>
        </div>
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-pitch-green neon-border-green">
          <div className="typo-stat-lg text-secondary font-bold tracking-tight neon-text-green">52</div>
          <div className="typo-label-caps text-text-muted">GLOBO (BR)</div>
        </div>
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-error neon-border-red">
          <div className="typo-stat-lg text-error font-bold tracking-tight neon-text-red">104</div>
          <div className="typo-label-caps text-text-muted">CAZÉTV (BR)</div>
        </div>
        <div className="glass-card p-lg rounded-xl text-center border-b-2 border-primary neon-border-cyan">
          <div className="typo-stat-lg text-on-surface font-bold tracking-tight">30</div>
          <div className="typo-label-caps text-text-muted">DISNEY+</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-lg">
        {Object.entries(mundialData.canales_por_pais).map(([pais, data]) => (
          <CanalesCard key={pais} pais={pais} data={data} />
        ))}
      </div>
    </section>
  );
}
