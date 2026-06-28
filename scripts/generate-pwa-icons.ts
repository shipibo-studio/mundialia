/**
 * Script para generar PNG icons PWA desde el SVG.
 * Uso: npx tsx scripts/generate-pwa-icons.ts
 *
 * Requisito: tener instalado sharp
 *   pnpm add -D sharp
 */

import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const SIZES = [192, 512];
const SVG_PATH = join(import.meta.dirname, "..", "public", "icons", "icon.svg");
const OUT_DIR = join(import.meta.dirname, "..", "public", "icons");

async function generate() {
  const svgBuffer = readFileSync(SVG_PATH);

  for (const size of SIZES) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(OUT_DIR, `icon-${size}x${size}.png`));

    console.log(`✅ icon-${size}x${size}.png generated`);
  }

  console.log("🎉 All PWA icons generated!");
}

generate().catch(console.error);
