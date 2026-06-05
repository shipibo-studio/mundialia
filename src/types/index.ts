export interface CanalDetail {
  canal: string;
  partidos?: string;
  contenido?: string;
  tipo?: string;
  plataforma_streaming?: string;
  resolucion?: string;
  nota?: string;
  url?: string;
  streaming_gratuito?: string;
  conductor?: string;
  productora?: string;
  derechos?: string;
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
  nota?: string;
}

export interface Partido {
  numero: number;
  partido: string;
  grupo: string;
  hora_chile: string;
  hora_brasil: string;
  sede: string;
  nota?: string;
  canales_chile?: MatchChannels;
  canales_brasil?: MatchChannels;
  canales_brasil_destacados?: MatchChannels;
}

export interface Jornada {
  jornada?: number;
  fecha?: string;
  dia?: string;
  nota?: string;
  partidos?: Partido[];
}

export interface FaseEliminatoriaDetail {
  fecha_inicio?: string;
  fecha_fin?: string;
  fecha?: string;
  total_partidos?: number;
  partidos?: string;
  sedes?: string[];
  sede?: string;
  nota?: string;
  hora_chile?: string;
  hora_brasil?: string;
  canales_chile?: MatchChannels;
  canales_brasil?: MatchChannels;
}

export interface FaseEliminatoria {
  dieciseisavos_de_final: FaseEliminatoriaDetail;
  octavos_de_final: FaseEliminatoriaDetail;
  cuartos_de_final: FaseEliminatoriaDetail;
  semifinales: FaseEliminatoriaDetail;
  tercer_puesto: FaseEliminatoriaDetail;
  final: FaseEliminatoriaDetail;
}

export interface Fixture {
  fase_grupos: Jornada[];
  fase_eliminatoria: FaseEliminatoria;
}

export interface Torneo {
  nombre: string;
  edicion?: number;
  formato: string;
  fecha_inicio: string;
  fecha_final: string;
  sedes: string[];
  partido_inaugural?: string;
  partido_final?: string;
}

export interface ResumenCanalDetail {
  [key: string]: string;
}

export interface ResumenCanalesPais {
  television_abierta: ResumenCanalDetail;
  television_pago: ResumenCanalDetail;
  youtube_streaming_gratuito?: ResumenCanalDetail;
}

export interface MundialData {
  torneo: Torneo;
  canales_por_pais: Record<string, CanalesPais>;
  fixture: Fixture;
  resumen_canales?: Record<string, ResumenCanalesPais>;
  fuentes?: string[];
  notas_generales?: string[];
}
