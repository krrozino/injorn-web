/**
 * Opções puras para navegação cartográfica.
 * O Leaflet não interpreta prefers-reduced-motion por conta própria.
 */
export function atlasPanOptions(reducedMotion: boolean): { animate: boolean; duration?: number } {
  return reducedMotion ? { animate: false } : { animate: true, duration: 0.35 };
}

export function atlasFitOptions(reducedMotion: boolean): { padding: [number, number]; animate: boolean } {
  return { padding: [12, 12], animate: !reducedMotion };
}
