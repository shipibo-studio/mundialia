import { buscarCanal } from "@/lib/canales";
import type { CanalesPais, CanalDetail } from "@/types";

function BadgeLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-transform inline-flex items-center"
      onClick={(e) => e.stopPropagation()}
      title={label}
    >
      {icon}
    </a>
  );
}

function CanalRow({ ch }: { ch: CanalDetail }) {
  const canal = buscarCanal(ch.canal);
  return (
    <div className="flex flex-col gap-1 p-md bg-white/5 rounded-lg border border-white/5">
        <p className="typo-body-lg flex items-center gap-1">
          {ch.canal}
          {canal?.sitio && <BadgeLink href={canal.sitio} icon="🌐" label={`${ch.canal} - Sitio web`} />}
          {canal?.youtube && <BadgeLink href={canal.youtube} icon="▶️" label={`${ch.canal} - YouTube`} />}
        </p>
        {ch.partidos && (
          <p className="typo-body-md my-2 text-text-muted shrink-0">
            {ch.partidos}
          </p>
        )}
      {(ch.resolucion || ch.plataforma_streaming || ch.streaming_gratuito || ch.nota) && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[12px] text-text-muted/70">
          {ch.resolucion && <span>📺 {ch.resolucion}</span>}
          {ch.plataforma_streaming && <span>📱 {ch.plataforma_streaming}</span>}
          {ch.streaming_gratuito && <span>🆓 {ch.streaming_gratuito}</span>}
          {ch.nota && <span>📌 {ch.nota}</span>}
        </div>
      )}
    </div>
  );
}

interface CanalesCardProps {
  pais: string;
  data: CanalesPais;
}

export function CanalesCard({ pais, data }: CanalesCardProps) {
  const flag = pais === "Chile" ? "🇨🇱" : "🇧🇷";

  return (
    <div className="glass-card rounded-xl p-lg space-y-lg">
      <div className="flex items-center gap-md border-b border-white/5 pb-4">
        <div>
          <h3 className="typo-headline-lg mb-3 text-primary neon-text-cyan">
            {flag} {pais.toUpperCase()}
          </h3>
          <p className="typo-body-md text-[14px] leading-tight">
            {data.nota}
          </p>
        </div>
      </div>

      <div className="space-y-lg">
        {/* TV Abierta */}
        <div>
          <div className="typo-label-caps text-primary mb-3 flex items-center gap-2 neon-text-cyan uppercase">
            <span className="material-symbols-outlined text-xs">
              settings_input_antenna
            </span>
            TV ABIERTA
          </div>
          <div className="grid gap-xs">
            {data.television_abierta.map((ch) => (
              <CanalRow key={ch.canal} ch={ch} />
            ))}
          </div>
        </div>

        {/* TV Pago / Streaming */}
        <div>
          <div className="typo-label-caps text-chile-blue mb-3 flex items-center gap-2 uppercase">
            <span className="material-symbols-outlined text-xs">
              credit_card
            </span>
            TV PAGO / STREAMING
          </div>
          <div className="grid gap-xs">
            {data.television_pago.map((ch) => (
              <CanalRow key={ch.canal} ch={ch} />
            ))}
          </div>
        </div>

        {/* YouTube */}
        <div>
          <div className="typo-label-caps text-error mb-3 flex items-center gap-2 neon-text-red uppercase">
            <span className="material-symbols-outlined text-xs">
              play_circle
            </span>
            YOUTUBE
          </div>
          <div className="grid gap-xs">
            {data.youtube.map((ch) => (
              <div
                key={ch.canal}
                className="flex flex-col gap-1 p-md bg-error/10 rounded-lg border border-error/20"
              >
                <p className="typo-body-lg text-error neon-text-red flex items-center gap-2">
                  <span>▶️</span> {ch.canal}
                  {buscarCanal(ch.canal)?.sitio && (
                    <BadgeLink
                      href={buscarCanal(ch.canal)!.sitio!}
                      icon="🌐"
                      label={`${ch.canal} - Sitio web`}
                    />
                  )}
                </p>
                <p className="typo-body-md my-2 text-error/80 shrink-0">
                  {ch.partidos || ch.contenido}
                </p>
                {ch.nota && <span className="text-[12px] text-error/60">📌 {ch.nota}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
