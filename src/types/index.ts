export interface CanalDetail {
  canal: string;
  partidos?: string;
  contenido?: string;
}

export interface CanalesPais {
  nota: string;
  television_abierta: CanalDetail[];
  television_pago: CanalDetail[];
  youtube: CanalDetail[];
}

export interface MatchChannels {
  abierta?: string[];
  pago?: string[];
  youtube?: string[];
}

export interface Partido {
  numero: number;
  partido: string;
  grupo: string;
  hora_chile: string;
  hora_brasil: string;
  sede: string;
  nota: string;
  canales_chile?: MatchChannels;
  canales_brasil?: MatchChannels;
}

export interface Jornada {
  fecha: string;
  dia: string;
  partidos: Partido[];
}

export interface FaseEliminatoria {
  fase: string;
  fecha: string;
  partidos: string;
  sede?: string;
}

export interface Fixture {
  fase_grupos: Jornada[];
  fase_eliminatoria: FaseEliminatoria[];
}

export interface Torneo {
  nombre: string;
  formato: string;
  fecha_inicio: string;
  fecha_final: string;
  sedes: string[];
}

export interface MundialData {
  torneo: Torneo;
  canales_por_pais: Record<string, CanalesPais>;
  fixture: Fixture;
}
