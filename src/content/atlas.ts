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
  version: "1.1.0-m1",
  sha256: "3d08db349d2916e8d44bfb26914218ee0b6722860b6027d9c670edb71d39fc7e",
  description:
    "Mapa canônico e oficial do Reino de Injorn. Apresenta o relevo, litoral, florestas, fortalezas e divisas cartografadas pela Coroa.",
};

/**
 * Camadas cartográficas preparadas para o Atlas Vivo.
 *
 * Em M1, a base cartográfica e três âncoras visíveis e documentadas são ativas.
 * As demais camadas de regiões e rotas estão declaradas e
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
      "Três marcos cartográficos homologados pelo criador do mundo em 20/10/2026.",
    visible: true,
    count: 3,
    badge: "M1 · 3 pontos",
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
 * Pontos de M1 transcritos manualmente da imagem cartográfica canônica
 * (1448x1086 px); foram homologados pelo mestre em 20/10/2026.
 * O texto exibido no painel vem exclusivamente de knownPlaces (já público).
 *
 * Referências de píxel revisadas na arte:
 * - centro do castelo da Capital Injorn: (747, 453);
 * - construção principal de São Kael: (1290, 469);
 * - núcleo da fortaleza Vael Karun: (1069, 945).
 * Ponta da Luz exige apontamento explícito do mestre: NÃO atribuir ponto.
 * As coordenadas são proporcionais e independem da resolução do raster.
 */
export const canonicalFeatures: GeoFeature[] = [
  {
    id: "capital-injorn",
    mapId: canonicalKingdomMap.id,
    type: "marker",
    geometry: { x: 747 / 1448, y: 453 / 1086 },
    label: "Capital Injorn",
    status: "official",
    category: "place",
    published: true,
  },
  {
    id: "monasterio-sao-kael",
    mapId: canonicalKingdomMap.id,
    type: "marker",
    geometry: { x: 1290 / 1448, y: 469 / 1086 },
    label: "Monastério de São Kael",
    status: "observed",
    category: "place",
    published: true,
  },
  {
    id: "vael-karun",
    mapId: canonicalKingdomMap.id,
    type: "marker",
    geometry: { x: 1069 / 1448, y: 945 / 1086 },
    label: "Vael Karun",
    status: "discovered",
    category: "place",
    published: true,
  },
];
