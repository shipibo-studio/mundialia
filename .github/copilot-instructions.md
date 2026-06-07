# Mundial Notify — Project Context

## Stack
- **Framework**: Next.js 16 (Turbopack)
- **UI**: Tailwind CSS v4 (`@theme` + `@utility` en CSS, no JS config)
- **Fonts**: Sora (headings), Plus Jakarta Sans (body) — via next/font
- **Íconos**: Material Symbols Outlined (Google Fonts CDN)
- **State**: Redux Toolkit + React useState/useMemo
- **PM**: pnpm

## Design System
- Documentado en `DESIGN.md` (raíz)
- Paleta cyan neon definida en `src/app/globals.css` via `@theme`
- Custom utilities: `glass-card`, `neon-text-cyan`, `neon-glow-cyan`, `neon-border-cyan`, `match-past`, `no-scrollbar`
- Tipografía: `typo-display-hero`, `typo-headline-lg`, `typo-headline-md`, `typo-body-lg`, `typo-body-md`, `typo-label-caps`, `typo-stat-lg`, `typo-micro`
- Todos los `<button>` y `<a>` deben tener `cursor-pointer`

## Estructura
- `src/app/page.tsx` — página principal con tabs (Fixture, Canales, Eliminatorias, JSON)
- `src/app/layout.tsx` — root layout con Header, Footer, MobileNav
- `src/components/` — Header, Footer, MobileNav, Hero, MatchCard, CanalesCard, KnockoutCard
- `src/lib/data.ts` — datos del fixture (56 partidos, canales Chile/Brasil, eliminatorias)
- `src/lib/utils.ts` — `cn()`, `formatFechaCompleta()`, `formatRangoFechas()`
- `src/lib/headroom.ts` — Headroom SDK configurado para DeepSeek
- `src/types/index.ts` — tipos TypeScript

## Terminal (rtk)
Antes de cada comando shell, anteponer `rtk`:
- `rtk ls` — listar directorios (output compacto)
- `rtk tree` — árbol de directorios (token-optimizado)
- `rtk read <file>` — leer archivos con filtrado inteligente
- `rtk grep <pattern>` — grep compacto (agrupa por archivo, trunca)
- `rtk git <cmd>` — comandos git con output compacto
- `rtk err -- <cmd>` — solo errores
- `rtk summary -- <cmd>` — resumen de 2 líneas
- `rtk diff` — diff ultra-condensado
- `rtk find <args>` — find con tree compacto
- `rtk deps` — resumen de dependencias
