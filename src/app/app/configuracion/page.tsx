"use client";

import { cn } from "@/lib/utils";

export default function ConfiguracionPage() {
  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="typo-headline-lg text-primary neon-text-cyan uppercase mb-lg text-center">
        ⚙️ Configuración
      </h1>

      <div className="glass-card rounded-xl p-lg space-y-lg border border-white/10">
        {/* Notificaciones */}
        <div>
          <h2 className="typo-label-caps text-primary uppercase mb-4 flex items-center gap-2 neon-text-cyan">
            <span className="material-symbols-outlined text-sm">notifications</span>
            Notificaciones
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-md bg-white/5 rounded-lg border border-white/5 cursor-pointer">
              <div>
                <div className="typo-body-md">Recordatorio de partidos</div>
                <div className="typo-body-md text-text-muted text-sm">Recibe avisos 30 min antes de cada partido</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-primary w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between p-md bg-white/5 rounded-lg border border-white/5 cursor-pointer">
              <div>
                <div className="typo-body-md">Resultados en vivo</div>
                <div className="typo-body-md text-text-muted text-sm">Notificaciones de goles y resultados</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-primary w-5 h-5 rounded" />
            </label>
          </div>
        </div>

        {/* Preferencias */}
        <div className="border-t border-white/5 pt-lg">
          <h2 className="typo-label-caps text-primary uppercase mb-4 flex items-center gap-2 neon-text-cyan">
            <span className="material-symbols-outlined text-sm">palette</span>
            Preferencias
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-md bg-white/5 rounded-lg border border-white/5 cursor-pointer">
              <div className="typo-body-md">Modo oscuro</div>
              <input type="checkbox" defaultChecked disabled className="accent-primary w-5 h-5 rounded opacity-50" />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
