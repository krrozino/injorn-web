import type {
  GeoFeature,
  MapLayer,
  NormalizedCoordinate,
  WorldMap,
} from "@/types/atlas";

/**
 * Mapa canônico do Reino de Injorn (M0).
 *
 * Imagem original de 1448 × 1086 px, fornecida pelo mestre do universo.
 * Utiliza o asset WebP 86 preparado com base no arquivo canônico.
 */
export const canonicalKingdomMap: WorldMap = {
  id: "reino-de-injorn",
  title: "Reino de Injorn",
  imageSrc: "/maps/injorn-atlas-mapa-v1.webp",
  width: 1448,
  height: 1086,
  version: "1.0.0-m0",
  sha256: "3d08db349d2916e8d44bfb26914218ee0b6722860b6027d9c670edb71d39fc7e",
  description:
    "Mapa canônico e oficial do Reino de Injorn. Apresenta o relevo, litoral, florestas, fortalezas e divisas cartografadas pela Coroa.",
};

/**
 * Camadas cartográficas preparadas para o Atlas Vivo.
 *
 * Na versão M0, a base cartográfica é a única camada de imagem ativa.
 * As camadas vetoriais de lugares, regiões e rotas estão declaradas e
 * preparadas arquiteturalmente para receberem georreferência manual nas
 * fases M1 e M3, sem geração de dados fictícios.
 */
export const initialAtlasLayers: MapLayer[] = [
  {
    id: "base",
    label: "Base Cartográfica Canônica",
    description: "Arte cartográfica original aprovada de Injorn (1448 × 1086 px).",
    visible: true,
    count: 1,
    locked: true,
  },
  {
    id: "places",
    label: "Lugares e Fortalezas",
    description:
      "Pontos notáveis, cidades e fortalezas. Aguardando revisão manual de âncoras na fase M1.",
    visible: false,
    count: 0,
    badge: "M1 em breve",
  },
  {
    id: "regions",
    label: "Regiões e Fronteiras",
    description:
      "Polígonos delimitando províncias e territórios do reino. Aguardando marcação manual na fase M1.",
    visible: false,
    count: 0,
    badge: "M1 em breve",
  },
  {
    id: "routes",
    label: "Rotas da Jornada",
    description:
      "Trilhas dos aventureiros por ato e sessão. Aguardando validação de registros de mesa na fase M3.",
    visible: false,
    count: 0,
    badge: "M3 em breve",
  },
];

/**
 * Converte coordenadas normalizadas [0, 1] com origem no topo-esquerda
 * para coordenadas [lat, lng] no sistema CRS.Simple do Leaflet.
 *
 * No Leaflet CRS.Simple com bounds [[0, 0], [height, width]]:
 * - lat = 0 é a borda inferior, lat = height é a borda superior
 * - lng = 0 é a borda esquerda, lng = width é a borda direita
 */
export function normalizedToLatLng(
  coord: NormalizedCoordinate,
  width: number = canonicalKingdomMap.width,
  height: number = canonicalKingdomMap.height
): [number, number] {
  const lng = coord.x * width;
  const lat = (1 - coord.y) * height;
  return [lat, lng];
}

/**
 * Converte coordenadas [lat, lng] do Leaflet CRS.Simple para coordenadas
 * normalizadas [0, 1] com origem no topo-esquerda.
 */
export function latLngToNormalized(
  lat: number,
  lng: number,
  width: number = canonicalKingdomMap.width,
  height: number = canonicalKingdomMap.height
): NormalizedCoordinate {
  const x = Math.max(0, Math.min(1, lng / width));
  const y = Math.max(0, Math.min(1, 1 - lat / height));
  return {
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
  };
}

/**
 * Coleção de feições geográficas registradas.
 *
 * Conforme restrições estritas da Issue #4 e PLAYER_KNOWLEDGE_POLICY.md:
 * Não criar locais com coordenadas inventadas ou rotas simuladas.
 * A população desta lista ocorrerá exclusivamente via revisão manual em M1.
 */
export const canonicalFeatures: GeoFeature[] = [];
