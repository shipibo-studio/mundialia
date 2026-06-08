import { compress } from "headroom-ai";

/**
 * Headroom SDK configurado para DeepSeek V4 Flash
 *
 * Uso:
 * ```ts
 * import { comprimirContexto } from "@/lib/headroom";
 *
 * const resultado = await comprimirContexto(messages);
 * console.log(`Tokens ahorrados: ${resultado.tokensSaved}`);
 * ```
 */

const MODELO_DEEPSEEK = "deepseek-chat";

export interface CompressResult {
  messages: any[];
  compressed: boolean;
  tokensBefore: number;
  tokensAfter: number;
  tokensSaved: number;
  compressionRatio: number;
  transformsApplied: string[];
  ccrHashes: string[];
}

/**
 * Comprime mensajes usando Headroom + DeepSeek V4 Flash
 * @param messages - Array de mensajes a comprimir
 * @returns Resultado con texto comprimido y stats de tokens
 */
export async function comprimirContexto(
  messages: { role: string; content: string }[]
): Promise<CompressResult> {
  return compress(messages, {
    model: MODELO_DEEPSEEK,
  });
}

/**
 * Versión simplificada: comprime un texto largo
 */
export async function comprimirTexto(texto: string): Promise<CompressResult> {
  return comprimirContexto([{ role: "user", content: texto }]);
}
