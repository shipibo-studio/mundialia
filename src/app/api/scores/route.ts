import { NextResponse } from "next/server";
import { mundialData } from "@/lib/data";
import { getResultados } from "@/lib/api-scores";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * GET /api/scores
 *
 * Devuelve los resultados de partidos ya finalizados desde OpenLigaDB.
 * Response: { scores: Record<numero_partido, "local-visitante"> }
 *
 * Ejemplo: { "scores": { "1": "2-0", "2": "2-1", "3": "1-1", "4": "4-1" } }
 */
export async function GET() {
  try {
    // Extraer todos los partidos del fixture
    const partidos: { numero: number; partido: string }[] = [];

    // Fase de grupos
    for (const jornada of mundialData.fixture.fase_grupos) {
      if (jornada.partidos) {
        for (const p of jornada.partidos) {
          partidos.push({ numero: p.numero, partido: p.partido });
        }
      }
    }

    // Fase eliminatoria (si tiene partidos con numero)
    const eliminatorias = mundialData.fixture.fase_eliminatoria;
    for (const key of Object.keys(eliminatorias) as Array<keyof typeof eliminatorias>) {
      const fase = eliminatorias[key];
      if (fase && "numero" in fase) {
        const f = fase as any;
        partidos.push({ numero: f.numero, partido: f.partido });
      }
    }

    const resultados = await getResultados(partidos);
    const scores: Record<number, string> = {};
    for (const [num, score] of resultados) {
      scores[num] = score;
    }

    return NextResponse.json({ scores });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json(
      { scores: {}, error: "Error al obtener resultados" },
      { status: 500 }
    );
  }
}
