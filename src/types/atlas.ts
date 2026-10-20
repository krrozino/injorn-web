/**
 * Tipos e contratos de dados para o Atlas Vivo de Injorn.
 *
 * Segue a especificação base (docs/ATLAS_VIVO_V1.md) e a política
 * de conhecimento dos jogadores (docs/PLAYER_KNOWLEDGE_POLICY.md).
 *
 * Coordenadas são sempre normalizadas no intervalo [0, 1] com
 * origem no canto superior esquerdo (x: 0..1 da esquerda para a direita,
 * y: 0..1 do topo para a base). Não representam latitude/longitude terrestres.
 */

export interface NormalizedCoordinate {
  /** Posição horizontal no mapa, de 0 (borda esquerda) a 1 (borda direita). */
  x: number;
  /** Posição vertical no mapa, de 0 (topo) a 1 (base). */
  y: number;
}

export type GeoFeatureType = "marker" | "polygon" | "polyline";

export type KnowledgeStatus = "official" | "observed" | "discovered" | "rumor";

export interface GeoFeature {
  id: string;
  mapId: string;
  type: GeoFeatureType;
  /**
   * Ponto único para 'marker', lista de vértices para 'polygon' ou 'polyline'.
   */
  geometry: NormalizedCoordinate | NormalizedCoordinate[];
  label: string;
  summary?: string;
  status: KnowledgeStatus;
  category: "place" | "region" | "route" | "landmark";
  published: boolean;
}

export interface MapLayer {
  id: string;
  label: string;
  description: string;
  visible: boolean;
  count: number;
  badge?: string;
  locked?: boolean;
}

export interface WorldMap {
  id: string;
  title: string;
  imageSrc: string;
  width: number;
  height: number;
  version: string;
  sha256?: string;
  description: string;
  parentMapId?: string;
}

export interface MapViewportState {
  zoom: number;
  center: NormalizedCoordinate;
  bounds: {
    northWest: NormalizedCoordinate;
    southEast: NormalizedCoordinate;
  };
}
