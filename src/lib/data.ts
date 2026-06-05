import type { MundialData } from "@/types";

export const mundialData: MundialData = {
  torneo: {
    nombre: "Copa Mundial de la FIFA 2026",
    formato: "Fixture completo · Canales Chile y Brasil",
    fecha_inicio: "2026-06-11",
    fecha_final: "2026-07-19",
    sedes: ["Estados Unidos", "México", "Canadá"],
  },
  canales_por_pais: {
    Chile: {
      nota: "Chilevisión tiene los derechos exclusivos de TV abierta. DSports transmite los 104 partidos.",
      television_abierta: [
        {
          canal: "Chilevisión (CHV)",
          partidos: "52 partidos (incl. inauguración y final)",
        },
      ],
      television_pago: [
        { canal: "DSports (DirecTV)", partidos: "104 partidos (completo)" },
        { canal: "Disney+ Premium", partidos: "~30 partidos destacados" },
      ],
      youtube: [{ canal: "CHV YouTube", contenido: "Resúmenes y highlights" }],
    },
    Brasil: {
      nota: "CazéTV transmitirá los 104 partidos GRATIS en YouTube. TV Globo emitirá 52 encuentros.",
      television_abierta: [
        { canal: "TV Globo", partidos: "52 partidos (incl. todos de Brasil)" },
      ],
      television_pago: [{ canal: "SporTV", partidos: "55 partidos en 4K" }],
      youtube: [
        { canal: "CazéTV", partidos: "104 partidos EN VIVO — GRATIS" },
      ],
    },
  },
  fixture: {
    fase_grupos: [
      {
        fecha: "2026-06-11",
        dia: "Jueves",
        partidos: [
          {
            numero: 1,
            partido: "México vs. Sudáfrica",
            grupo: "A",
            hora_chile: "15:00",
            hora_brasil: "16:00",
            sede: "Estadio Azteca, CDMX",
            nota: "Partido inaugural",
            canales_chile: { abierta: ["CHV"], pago: ["DSports", "DGO"] },
            canales_brasil: { abierta: ["TV Globo"], youtube: ["CazéTV"] },
          },
          {
            numero: 2,
            partido: "Corea del Sur vs. Rep. Checa",
            grupo: "A",
            hora_chile: "22:00",
            hora_brasil: "23:00",
            sede: "Estadio Akron, Guadalajara",
            nota: "",
          },
        ],
      },
      {
        fecha: "2026-06-12",
        dia: "Viernes",
        partidos: [
          {
            numero: 3,
            partido: "Canadá vs. Bosnia",
            grupo: "B",
            hora_chile: "15:00",
            hora_brasil: "16:00",
            sede: "BMO Field, Toronto",
            nota: "",
          },
          {
            numero: 4,
            partido: "Estados Unidos vs. Paraguay",
            grupo: "D",
            hora_chile: "21:00",
            hora_brasil: "22:00",
            sede: "SoFi Stadium, Los Ángeles",
            nota: "",
          },
        ],
      },
      {
        fecha: "2026-06-13",
        dia: "Sábado",
        partidos: [
          {
            numero: 6,
            partido: "Brasil vs. Marruecos",
            grupo: "C",
            hora_chile: "18:00",
            hora_brasil: "19:00",
            sede: "MetLife Stadium, NJ",
            nota: "Partido de Brasil",
            canales_chile: { abierta: ["CHV"], pago: ["DSports"] },
            canales_brasil: { abierta: ["TV Globo"], youtube: ["CazéTV"] },
          },
        ],
      },
    ],
    fase_eliminatoria: [
      { fase: "Dieciseisavos", fecha: "01-05 Jul", partidos: "16 matches" },
      { fase: "Octavos", fecha: "07-10 Jul", partidos: "8 matches" },
      { fase: "Cuartos", fecha: "11-12 Jul", partidos: "4 matches" },
      { fase: "Semifinales", fecha: "14-15 Jul", partidos: "2 matches" },
      {
        fase: "Final",
        fecha: "19 Jul",
        partidos: "1 match",
        sede: "MetLife Stadium, NJ",
      },
    ],
  },
};
