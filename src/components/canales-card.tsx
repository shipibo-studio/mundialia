import type { CanalesPais } from "@/types";

interface CanalesCardProps {
  pais: string;
  data: CanalesPais;
}

export function CanalesCard({ pais, data }: CanalesCardProps) {
  const flag = pais === "Chile" ? "🇨🇱" : "🇧🇷";

  return (
    <div className="glass-card rounded-xl p-lg space-y-lg">
      <div className="flex items-center gap-md border-b border-white/5 pb-4">
        <div className="w-12 h-12 rounded-full bg-surface-navy flex items-center justify-center text-2xl shadow-inner border border-white/10">
          {flag}
        </div>
        <div>
          <h3 className="typo-headline-lg text-primary neon-text-cyan">
            {pais.toUpperCase()}
          </h3>
          <p className="typo-body-md text-text-muted leading-tight">
            {data.nota}
          </p>
        </div>
      </div>

      <div className="space-y-lg">
        {/* TV Abierta */}
        <div>
          <div className="typo-label-caps text-primary mb-3 flex items-center gap-2 neon-text-cyan uppercase">
            <span className="material-symbols-outlined text-sm">
              settings_input_antenna
            </span>
            TV ABIERTA
          </div>
          <div className="grid gap-xs">
            {data.television_abierta.map((ch) => (
              <div
                key={ch.canal}
                className="flex justify-between items-center p-md bg-white/5 rounded-lg border border-white/5"
              >
                <span className="typo-body-lg">{ch.canal}</span>
                <span className="typo-body-md text-text-muted">
                  {ch.partidos}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TV Pago / Streaming */}
        <div>
          <div className="typo-label-caps text-chile-blue mb-3 flex items-center gap-2 uppercase">
            <span className="material-symbols-outlined text-sm">
              credit_card
            </span>
            TV PAGO / STREAMING
          </div>
          <div className="grid gap-xs">
            {data.television_pago.map((ch) => (
              <div
                key={ch.canal}
                className="flex justify-between items-center p-md bg-white/5 rounded-lg border border-white/5"
              >
                <span className="typo-body-lg">{ch.canal}</span>
                <span className="typo-body-md text-text-muted text-right">
                  {ch.partidos}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube */}
        <div>
          <div className="typo-label-caps text-error mb-3 flex items-center gap-2 neon-text-red uppercase">
            <span className="material-symbols-outlined text-sm">
              play_circle
            </span>
            YOUTUBE
          </div>
          <div className="grid gap-xs">
            {data.youtube.map((ch) => (
              <div
                key={ch.canal}
                className="flex justify-between items-center p-md bg-error/10 rounded-lg border border-error/20"
              >
                <span className="typo-body-lg text-error neon-text-red">
                  {ch.canal}
                </span>
                <span className="typo-body-md text-error/80">
                  {ch.partidos || ch.contenido}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
