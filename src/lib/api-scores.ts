/**
 * OpenLigaDB — Fuente de resultados en vivo para el Mundial 2026
 *
 * API gratuita, sin key. Liga: wm26, temporada: 2026
 * Docs: https://www.openligadb.de/
 *
 * OpenLigaDB usa nombres de equipos en alemán. Este módulo mapea
 * los nombres del fixture (español) a los alemanes que usa la API.
 */

const TEAM_NAMES_ES_TO_DE: Record<string, string> = {
  México: "Mexiko",
  "Corea del Sur": "Südkorea",
  "República Checa": "Tschechien",
  Canadá: "Kanada",
  "Bosnia y Herzegovina": "Bosnien und Herzegowina",
  "Estados Unidos": "USA",
  Paraguay: "Paraguay",
  Qatar: "Katar",
  Suiza: "Schweiz",
  Brasil: "Brasilien",
  Marruecos: "Marokko",
  Haití: "Haiti",
  Escocia: "Schottland",
  Australia: "Australien",
  Turquía: "Türkei",
  Alemania: "Deutschland",
  Curazao: "Curaçao",
  "Países Bajos": "Niederlande",
  Japón: "Japan",
  "Costa de Marfil": "Elfenbeinküste",
  Ecuador: "Ecuador",
  Suecia: "Schweden",
  Túnez: "Tunesien",
  España: "Spanien",
  "Cabo Verde": "Kap Verde",
  Bélgica: "Belgien",
  Egipto: "Ägypten",
  "Arabia Saudita": "Saudi Arabien",
  Uruguay: "Uruguay",
  Irán: "Iran",
  "Nueva Zelanda": "Neuseeland",
  Francia: "Frankreich",
  Senegal: "Senegal",
  Irak: "Irak",
  Noruega: "Norwegen",
  Argentina: "Argentinien",
  Argelia: "Algerien",
  Austria: "Österreich",
  Jordania: "Jordanien",
  Portugal: "Portugal",
  "RD del Congo": "DR Kongo",
  "RD de Congo": "DR Kongo",
  "República Democrática del Congo": "DR Kongo",
  Inglaterra: "England",
  Croacia: "Kroatien",
  Ghana: "Ghana",
  Panamá: "Panama",
  Uzbekistán: "Usbekistan",
  Colombia: "Kolumbien",
  Sudáfrica: "Südafrika",
};

function nombreAde(nameEs: string): string {
  return TEAM_NAMES_ES_TO_DE[nameEs] ?? nameEs;
}

/** Extrae los dos equipos de "EquipoA vs. EquipoB" */
function parsePartido(partidoStr: string): [string, string] {
  const parts = partidoStr.split(/\s+vs\.?\s+/);
  return [parts[0]?.trim() ?? "", parts[1]?.trim() ?? ""];
}

export interface OpenLigaResult {
  matchId: number;
  local: string;
  visitante: string;
  golesLocal: number;
  golesVisitante: number;
  finalizado: boolean;
}

// ─── Cache en memoria ──────────────────────────────────

let cachedData: Map<number, OpenLigaResult> | null = null;
let lastFetch = 0;
const CACHE_TTL = 60_000; // 1 minuto

/**
 * Obtiene todos los partidos de WM 2026 desde OpenLigaDB
 * y los devuelve indexados por matchID de OpenLigaDB.
 */
export async function fetchOpenLigaMatches(): Promise<Map<number, OpenLigaResult>> {
  const now = Date.now();
  if (cachedData && now - lastFetch < CACHE_TTL) {
    return cachedData;
  }

  const url = "https://api.openligadb.de/getmatchdata/wm26/2026";
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`OpenLigaDB error: ${res.status}`);
  }

  const data: any[] = await res.json();
  const map = new Map<number, OpenLigaResult>();

  for (const m of data) {
    const finalResult = m.matchResults?.find(
      (r: any) => r.resultTypeID === 2
    );

    map.set(m.matchID, {
      matchId: m.matchID,
      local: m.team1?.teamName ?? "",
      visitante: m.team2?.teamName ?? "",
      golesLocal: finalResult?.pointsTeam1 ?? 0,
      golesVisitante: finalResult?.pointsTeam2 ?? 0,
      finalizado: m.matchIsFinished ?? false,
    });
  }

  cachedData = map;
  lastFetch = now;
  return map;
}

/**
 * Busca un partido en OpenLigaDB por nombres de equipos.
 * Intenta hacer match exacto con los nombres en alemán.
 */
export function buscarResultado(
  partidoStr: string,
  openLigaMap: Map<number, OpenLigaResult>
): { resultado: string; finalizado: boolean } | null {
  const [eqLocalEs, eqVisitEs] = parsePartido(partidoStr);
  const eqLocalDe = nombreAde(eqLocalEs);
  const eqVisitDe = nombreAde(eqVisitEs);

  for (const r of openLigaMap.values()) {
    const matchLocal =
      r.local === eqLocalDe ||
      r.local.includes(eqLocalDe) ||
      eqLocalDe.includes(r.local);
    const matchVisit =
      r.visitante === eqVisitDe ||
      r.visitante.includes(eqVisitDe) ||
      eqVisitDe.includes(r.visitante);

    if (matchLocal && matchVisit) {
      if (!r.finalizado) return null;

      return {
        resultado: `${r.golesLocal}-${r.golesVisitante}`,
        finalizado: r.finalizado,
      };
    }
  }

  return null;
}

/**
 * Obtiene resultados para una lista de partidos del fixture.
 * Devuelve un mapa: número de partido → "2-0"
 */
export async function getResultados(
  partidos: { numero: number; partido: string }[]
): Promise<Map<number, string>> {
  const openLigaMap = await fetchOpenLigaMatches();
  const resultados = new Map<number, string>();

  for (const p of partidos) {
    const r = buscarResultado(p.partido, openLigaMap);
    if (r?.finalizado) {
      resultados.set(p.numero, r.resultado);
    }
  }

  return resultados;
}
