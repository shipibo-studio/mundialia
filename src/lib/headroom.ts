import { compress } from "headroom-ai";
import type { HeadroomConfig } from "headroom-ai";

/**
 * Headroom SDK configurado para DeepSeek V4 Flash
 * (compatible con API OpenAI)
 *
 * Uso:
 * ```ts
 * import { comprimirContexto } from "@/lib/headroom";
 *
 * const resultado = await comprimirContexto(messages);
 * console.log(`Tokens ahorrados: ${resultado.tokensSaved}`);
 * ```
 */

const headroomConfig: HeadroomConfig = {
  defaultMode: "optimize",
  smartCrusher: {
    enabled: true,
    minItemsToAnalyze: 5,
    maxItemsAfterCrush: 10,
    varianceThreshold: 2.0,
    relevance: { tier: "hybrid", relevanceThreshold: 0.25 },
    anchor: { anchorBudgetPct: 0.25 },
  },
  ccr: { enabled: true, injectTool: true },
  cacheOptimizer: { enabled: true, autoDetectProvider: true },
  intelligentContext: {
    enabled: true,
    useImportanceScoring: true,
    keepSystem: true,
    keepLastTurns: 2,
    outputBufferTokens: 4000,
  },
};

const MODELO_DEEPSEEK = "deepseek-chat";

export interface CompressResult {
  compressed: string;
  tokensBefore: number;
  tokensAfter: number;
  tokensSaved: number;
}

/**
 * Comprime mensajes usando Headroom + DeepSeek V4 Flash
 * @param messages - Array de mensajes a comprimir
 * @returns Resultado con texto comprimido y stats de tokens
 */
export async function comprimirContexto(
  messages: { role: string; content: string }[]
): Promise<CompressResult> {
  const result = await compress(messages, {
    model: MODELO_DEEPSEEK,
    config: headroomConfig,
  });

  return {
    compressed: result.compressed as string,
    tokensBefore: result.tokensBefore,
    tokensAfter: result.tokensAfter,
    tokensSaved: result.tokensSaved,
  };
}

/**
 * Versión simplificada: comprime un texto largo
 */
export async function comprimirTexto(texto: string): Promise<CompressResult> {
  return comprimirContexto([{ role: "user", content: texto }]);
}
