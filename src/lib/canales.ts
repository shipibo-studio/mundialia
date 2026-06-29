/**
 * Registro central de canales.
 * Para agregar/editar canales, solo modifica este archivo.
 * Los cambios se reflejan automáticamente en todos los partidos.
 */

export interface CanalInfo {
  nombre: string;
  sitio?: string;
  youtube?: string;
}

export const canalesRegistro: Record<string, CanalInfo> = {
  // 🇨🇱 Chile
  Chilevisión: {
    nombre: "Chilevisión",
    sitio: "https://www.chilevision.cl/senal-online/",
    youtube: "https://www.youtube.com/@chilevision",
  },
  "DSports/DirecTV": {
    nombre: "DSports/DirecTV",
    sitio: "https://www.directvsports.com",
  },
  DGO: {
    nombre: "DGO",
    sitio: "https://www.dgo.com",
  },
  "Disney+": {
    nombre: "Disney+",
    sitio: "https://www.disneyplus.com",
  },
  "Chilevisión YouTube (resumen)": {
    nombre: "Chilevisión YouTube (resumen)",
    youtube: "https://www.youtube.com/@chilevision",
  },

  // 🇧🇷 Brasil
  "TV Globo": {
    nombre: "TV Globo",
    sitio: "https://futemax.studio/",
  },
  SBT: {
    nombre: "SBT",
    sitio: "https://futemax4.biz/assistir-sbt-ao-vivo-em-hd-online",
    youtube: "https://www.youtube.com/@sbtonline",
  },
  SporTV: {
    nombre: "SporTV",
    sitio: "https://sportv.globo.com",
  },
  "GE TV": {
    nombre: "GE TV",
    sitio: "https://ge.globo.com",
  },
  "N Sports": {
    nombre: "N Sports",
    sitio: "https://nsports.com.br",
  },
  "Globoplay (4K)": {
    nombre: "Globoplay (4K)",
    sitio: "https://globoplay.globo.com",
  },
  "CazéTV (en vivo)": {
    nombre: "CazéTV",
    sitio: "https://futbol-libres.su/",
  },
  "CazéTV (en vivo, 4K)": {
    nombre: "CazéTV 4K",
    sitio: "https://futbol-libres.su/",
  },
  CazéTV: {
    nombre: "CazéTV",
    sitio: "https://futbol-libres.su/",
  },
};

/** Busca un canal por nombre exacto o parcial */
export function buscarCanal(nombre: string): CanalInfo | undefined {
  return canalesRegistro[nombre] ?? Object.values(canalesRegistro).find(
    (c) => nombre.toLowerCase().includes(c.nombre.toLowerCase())
  );
}
