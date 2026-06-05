import type { Torneo } from "@/types";
import { formatRangoFechas } from "@/lib/utils";

interface HeroProps {
  torneo: Torneo;
}

export function Hero({ torneo }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden rounded-xl bg-surface-navy p-lg md:p-xl mb-lg text-center border border-primary/10 shadow-2xl"
      id="hero"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% -20%, #00f2ff 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10">
        <span className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary typo-label-caps mb-4 uppercase tracking-wide font-bold neon-text-cyan">
          ⚽ Copa del Mundo
        </span>
        <h1 className="typo-display-hero md:text-[62px] text-primary font-bold tracking-tight leading-none mb-4 drop-shadow-2xl neon-text-cyan">
          MUNDIAL FIFA 2026
        </h1>
        <p className="typo-body-lg font-light text-text-muted mb-8">
          {torneo.formato}
        </p>
        <div className="flex flex-wrap justify-center gap-lg">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary neon-text-cyan">
              calendar_month
            </span>
            <span className="typo-body-md">
              {formatRangoFechas(torneo.fecha_inicio, torneo.fecha_final)}
            </span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary neon-text-cyan">
              location_on
            </span>
            <span className="typo-body-md">
              {torneo.sedes.join(" · ")}
            </span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary neon-text-cyan">
              stadium
            </span>
            <span className="typo-body-md">{torneo.formato}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
