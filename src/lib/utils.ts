import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatearFecha(fecha: string): string {
  const [y, m, d] = fecha.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
}

/** Formato completo: "Jueves 11 de Junio" */
export function formatFechaCompleta(
  dia: string,
  fecha: string
): string {
  return `${dia} ${formatearFecha(fecha)}`;
}

/** Para rango: "11 de Junio – 19 de Julio" */
export function formatRangoFechas(inicio: string, fin: string): string {
  return `${formatearFecha(inicio)} – ${formatearFecha(fin)}`;
}
