import type { FaseEliminatoria } from "@/types";

interface KnockoutCardProps {
  fase: FaseEliminatoria;
}

export function KnockoutCard({ fase }: KnockoutCardProps) {
  return (
    <div className="glass-card rounded-xl p-lg relative overflow-hidden group border-white/5">
      <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <span className="material-symbols-outlined text-[120px] text-primary">
          trophy
        </span>
      </div>
      <div className="typo-label-caps text-primary mb-2 uppercase tracking-widest neon-text-cyan">
        {fase.partidos}
      </div>
      <h3 className="typo-headline-lg mb-1">{fase.fase}</h3>
      <div className="flex items-center gap-xs text-text-muted mb-6">
        <span className="material-symbols-outlined text-sm">
          calendar_month
        </span>
        <span className="typo-body-md">{fase.fecha}</span>
      </div>
      {fase.sede ? (
        <div className="flex items-center gap-xs text-on-surface-variant bg-white/5 p-3 rounded-lg border border-primary/20 neon-border-cyan">
          <span className="material-symbols-outlined text-sm text-primary neon-text-cyan">
            location_on
          </span>
          <span className="typo-body-md">{fase.sede}</span>
        </div>
      ) : (
        <div className="flex items-center gap-xs text-text-muted italic bg-white/5 p-3 rounded-lg border border-white/5">
          <span className="material-symbols-outlined text-sm">info</span>
          <span className="typo-body-md">Múltiples Sedes</span>
        </div>
      )}
    </div>
  );
}
