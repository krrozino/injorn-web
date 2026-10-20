"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  canonicalKingdomMap,
  initialAtlasLayers,
  latLngToNormalized,
  normalizedToLatLng,
} from "@/content/atlas";
import type { NormalizedCoordinate } from "@/types/atlas";
import { AtlasPlacesDirectory, publicPlaces } from "@/components/atlas/AtlasPlacesDirectory";
import { atlasPanOptions, atlasFitOptions } from "@/components/atlas/atlasMotion";

export default function AtlasMapInner() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const placesLayerRef = useRef<L.LayerGroup | null>(null);
  const focusReturnRef = useRef<HTMLElement | null>(null);
  const wasFullscreenRef = useRef(false);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showPlaces, setShowPlaces] = useState(true);
  const [placeQuery, setPlaceQuery] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const layers = initialAtlasLayers.map((layer) =>
    layer.id === "places" ? { ...layer, visible: showPlaces } : layer
  );
  const [cursorCoords, setCursorCoords] = useState<NormalizedCoordinate | null>(null);
  const [pinnedCoords, setPinnedCoords] = useState<NormalizedCoordinate | null>(null);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0);

  const width = canonicalKingdomMap.width;
  const height = canonicalKingdomMap.height;

  // Recentraliza a visão nas dimensões totais da arte canônica
  const handleRecenter = useCallback(() => {
    if (!mapInstanceRef.current) return;
    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [height, width],
    ];
    mapInstanceRef.current.fitBounds(bounds, {
      ...atlasFitOptions(window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    });
  }, [height, width]);

  // Controles de zoom acessíveis
  const handleZoomIn = useCallback(() => {
    mapInstanceRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    mapInstanceRef.current?.zoomOut();
  }, []);

  // O modo foco não desmonta o Leaflet e mantém catálogo e mapa no mesmo frame.
  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((value) => !value);
  }, []);

  const handleSelectPlace = useCallback((id: string) => {
    const place = publicPlaces.find((entry) => entry.id === id);
    if (!place) return;
    setSelectedPlaceId(place.id);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    mapInstanceRef.current?.panTo(normalizedToLatLng(place.geometry), atlasPanOptions(reduceMotion));
  }, []);

  // Revalidar o tamanho após o layout mudar, restaurando o foco no retorno.
  useEffect(() => {
    if (wasFullscreenRef.current === isFullscreen) return;
    wasFullscreenRef.current = isFullscreen;
    if (isFullscreen) {
      focusReturnRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement : null;
      fullscreenButtonRef.current?.focus({ preventScroll: true });
    } else {
      focusReturnRef.current?.focus({ preventScroll: true });
      focusReturnRef.current = null;
    }
    const timer = window.setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
      handleRecenter();
    }, 320);
    return () => window.clearTimeout(timer);
  }, [isFullscreen, handleRecenter]);

  // Copia as coordenadas para a área de transferência com tratamento de Promise
  const handleCopyCoords = useCallback((coord: NormalizedCoordinate) => {
    const text = `x: ${coord.x.toFixed(4)}, y: ${coord.y.toFixed(4)}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopyNotice("Copiado!");
          setTimeout(() => setCopyNotice(null), 2000);
        })
        .catch(() => {
          setCopyNotice("Erro ao copiar");
          setTimeout(() => setCopyNotice(null), 2000);
        });
    } else {
      setCopyNotice("Indisponível");
      setTimeout(() => setCopyNotice(null), 2000);
    }
  }, []);

  // Inicialização do Leaflet com CRS.Simple e suporte a mobile
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [height, width],
    ];

    // Limites de deslocamento com margem elástica para navegação confortável
    const maxBounds: L.LatLngBoundsExpression = [
      [-height * 0.35, -width * 0.35],
      [height * 1.35, width * 1.35],
    ];

    // minZoom: -3.5 permite escala mínima de 2^-3.5 (~0.088x), acomodando telas de 320 px e 390 px com folga
    const map = L.map(mapContainerRef.current, {
      crs: L.CRS.Simple,
      minZoom: -3.5,
      maxZoom: 2.5,
      zoomSnap: 0.1,
      zoomDelta: 0.5,
      attributionControl: false,
      zoomControl: false,
      maxBounds: maxBounds,
      maxBoundsViscosity: 0.85,
      keyboard: true,
    });

    // Sobreposição da imagem cartográfica aprovada
    const overlay = L.imageOverlay(canonicalKingdomMap.imageSrc, bounds, {
      interactive: true,
      alt: "Mapa canônico do Reino de Injorn",
    });
    overlay.addTo(map);
    placesLayerRef.current = L.layerGroup().addTo(map);

    // Enquadra a arte completa inicialmente com padding responsivo
    map.fitBounds(bounds, {
      padding: [12, 12],
      animate: false,
    });

    setZoomLevel(Number(map.getZoom().toFixed(2)));

    // Rastreamento de coordenadas com requestAnimationFrame para evitar jank
    let rafId: number | null = null;
    const onMouseMove = (event: L.LeafletMouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const norm = latLngToNormalized(event.latlng.lat, event.latlng.lng, width, height);
        setCursorCoords(norm);
      });
    };
    map.on("mousemove", onMouseMove);

    // Fixa coordenada ao clicar (útil para auditoria cartográfica e anotações M1)
    map.on("click", (event: L.LeafletMouseEvent) => {
      if (
        event.latlng.lat < 0 || event.latlng.lat > height ||
        event.latlng.lng < 0 || event.latlng.lng > width
      ) return;
      const norm = latLngToNormalized(event.latlng.lat, event.latlng.lng, width, height);
      setPinnedCoords(norm);
    });

    map.on("zoomend", () => {
      setZoomLevel(Number(map.getZoom().toFixed(2)));
    });

    mapInstanceRef.current = map;

    // Observer para redimensionamento de janela ou rotação mobile
    const handleResize = () => mapInstanceRef.current?.invalidateSize();
    window.addEventListener("resize", handleResize);
    // O modo foco muda a área disponível sem necessariamente disparar resize na janela.
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      map.remove();
      placesLayerRef.current = null;
      mapInstanceRef.current = null;
    };
  }, [height, width]);

  // Criar apenas marcadores com texto já publicado e posição revisável.
  useEffect(() => {
    const layer = placesLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    if (!showPlaces) return;

    const needle = placeQuery.trim().toLocaleLowerCase("pt-BR");
    for (const place of publicPlaces) {
      if (!place.label.toLocaleLowerCase("pt-BR").includes(needle)) continue;
      const selected = place.id === selectedPlaceId;
      L.circleMarker(normalizedToLatLng(place.geometry), {
        radius: selected ? 10 : 7,
        color: selected ? "#ffffff" : "#f2dfae",
        weight: selected ? 3 : 2,
        fillColor: selected ? "#e6cc8d" : "#b78d4f",
        fillOpacity: 0.92,
        className: "atlas-place-marker",
      })
        .bindTooltip(place.label, { direction: "top", opacity: 0.96, offset: [0, -7] })
        .on("click", (event) => {
          L.DomEvent.stopPropagation(event);
          setSelectedPlaceId(place.id);
        })
        .addTo(layer);
    }
  }, [placeQuery, selectedPlaceId, showPlaces]);

  // Esc e Tab funcionam inclusive quando o foco está no campo de busca do catálogo.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const frame = frameRef.current;
      const activeElement = document.activeElement;
      const isAtlasFocused = Boolean(
        isFullscreen || (frame && activeElement && frame.contains(activeElement))
      );

      if (e.key === "Escape" && isAtlasFocused) {
        if (isDrawerOpen) {
          e.preventDefault();
          setIsDrawerOpen(false);
          return;
        }
        if (isFullscreen) {
          e.preventDefault();
          setIsFullscreen(false);
          return;
        }
      }

      if (!isAtlasFocused) return;

      // Uma camada fixa modal não pode deixar o Tab alcançar elementos atrás dela.
      if (isFullscreen && e.key === "Tab" && frame) {
        const selectors = 'button:not(:disabled), input:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])';
        const focusables = Array.from(frame.querySelectorAll<HTMLElement>(selectors)).filter(
          (element) => element.getClientRects().length > 0 &&
            !element.closest('[aria-hidden="true"]')
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (first && last) {
          if (!activeElement || !frame.contains(activeElement)) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
        return;
      }

      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) return;

      if (e.key === "0" || e.key === "Home") {
        e.preventDefault();
        handleRecenter();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        handleToggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRecenter, handleZoomIn, handleZoomOut, handleToggleFullscreen, isDrawerOpen, isFullscreen]);

  const activeCoord = pinnedCoords || cursorCoords;

  return (
    <>
    <div
      ref={frameRef}
      className={`atlas-viewer-frame ${
        isFullscreen ? "atlas-viewer-frame--fullscreen" : ""
      }`}
      role={isFullscreen ? "dialog" : "region"}
      aria-modal={isFullscreen ? true : undefined}
      aria-label="Atlas Vivo de Injorn — Mapa Canônico"
      tabIndex={-1}
    >
      {/* Ornamentos de canto */}
      <div className="atlas-corner-ornament atlas-corner-ornament--tl" aria-hidden="true" />
      <div className="atlas-corner-ornament atlas-corner-ornament--tr" aria-hidden="true" />
      <div className="atlas-corner-ornament atlas-corner-ornament--bl" aria-hidden="true" />
      <div className="atlas-corner-ornament atlas-corner-ornament--br" aria-hidden="true" />

      {/* Barra de Ferramentas Superior */}
      <div className="atlas-toolbar">
        <div className="atlas-brand-badge">
          <span className="atlas-brand-badge__mark" aria-hidden="true">
            ✦
          </span>
          <span>Reino de Injorn · Canônico</span>
        </div>

        <div className="atlas-control-group">
          <button
            type="button"
            className="atlas-btn"
            onClick={handleZoomIn}
            aria-label="Aproximar mapa (+)"
            title="Aproximar (+)"
          >
            <span className="atlas-btn__icon" aria-hidden="true">+</span>
          </button>
          <button
            type="button"
            className="atlas-btn"
            onClick={handleZoomOut}
            aria-label="Afastar mapa (-)"
            title="Afastar (-)"
          >
            <span className="atlas-btn__icon" aria-hidden="true">-</span>
          </button>
          <button
            type="button"
            className="atlas-btn"
            onClick={handleRecenter}
            aria-label="Recentralizar visualização do mapa (0)"
            title="Recentralizar (0)"
          >
            <span className="atlas-btn__icon" aria-hidden="true">⌖</span>
          </button>
          <button
            type="button"
            className={`atlas-btn ${isDrawerOpen ? "atlas-btn--active" : ""}`}
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            aria-expanded={isDrawerOpen}
            aria-controls="atlas-layer-drawer"
            aria-label="Camadas cartográficas e legenda"
            title="Camadas e legenda"
          >
            <span className="atlas-btn__icon" aria-hidden="true">📜</span>
          </button>
          <button
            ref={fullscreenButtonRef}
            type="button"
            className={`atlas-btn ${isFullscreen ? "atlas-btn--active" : ""}`}
            onClick={handleToggleFullscreen}
            aria-label={
              isFullscreen
                ? "Sair do modo foco (Esc)"
                : "Modo foco em tela cheia (F)"
            }
            title={isFullscreen ? "Sair do foco (Esc)" : "Modo foco (F)"}
          >
            <span className="atlas-btn__icon" aria-hidden="true">
              {isFullscreen ? "✕" : "⛶"}
            </span>
          </button>
        </div>
      </div>

      {/* Container Leaflet */}
      <div
        ref={mapContainerRef}
        className="atlas-map-container"
        tabIndex={0}
        role="application"
        aria-label="Área interativa do mapa. Clique ou use tab para focar. Setas do teclado movimentam o mapa. Gestos de toque e pinça em mobile."
      />

      {/* Gaveta / Drawer de Camadas e Legenda */}
      {isDrawerOpen && (
        <aside
          id="atlas-layer-drawer"
          className="atlas-drawer"
          aria-label="Legenda e camadas cartográficas"
        >
          <div className="atlas-drawer__header">
            <h3 className="atlas-drawer__title">Camadas do Atlas</h3>
            <button
              type="button"
              className="atlas-drawer__close"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Fechar painel de camadas"
            >
              ✕
            </button>
          </div>

          <p className="atlas-drawer__desc" style={{ fontSize: "0.8125rem", color: "rgba(230,204,141,0.75)" }}>
            Apenas camadas de registros canônicos são exibidas. Coordenadas fictícias e rotas não confirmadas em mesa permanecem fora deste mapa.
          </p>

          <ul className="atlas-layer-list">
            {layers.map((layer) => (
              <li
                key={layer.id}
                className={`atlas-layer-item ${
                  layer.visible ? "atlas-layer-item--active" : ""
                }`}
              >
                <div className="atlas-layer-item__heading">
                  <span className="atlas-layer-item__label">
                    <span aria-hidden="true">{layer.visible ? "●" : "○"}</span>
                    {layer.label}
                  </span>
                  {layer.badge && (
                    <span
                      className={`atlas-layer-item__badge ${
                        layer.visible ? "atlas-layer-item__badge--active" : ""
                      }`}
                    >
                      {layer.badge}
                    </span>
                  )}
                  {layer.locked && (
                    <span className="atlas-layer-item__badge atlas-layer-item__badge--active">
                      Canônico
                    </span>
                  )}
                </div>
                <p className="atlas-layer-item__desc">{layer.description}</p>
              </li>
            ))}
          </ul>

          <div className="atlas-meta-specs">
            <div>
              <span className="atlas-meta-spec__label">Dimensões Originais</span>
              <span className="atlas-meta-spec__val">1448 × 1086 px</span>
            </div>
            <div>
              <span className="atlas-meta-spec__label">Sistema Local</span>
              <span className="atlas-meta-spec__val">CRS.Simple [0..1]</span>
            </div>
            <div>
              <span className="atlas-meta-spec__label">Formato do Asset</span>
              <span className="atlas-meta-spec__val">WebP 86 (489 KB)</span>
            </div>
            <div>
              <span className="atlas-meta-spec__label">Nível de Zoom</span>
              <span className="atlas-meta-spec__val">
                {zoomLevel} ({Math.round((2 ** zoomLevel) * 100)}%)
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* Inspetor de Coordenadas Normalizadas [0, 1] */}
      {activeCoord && (
        <div className="atlas-inspector-badge" aria-live="polite">
          <span>
            {pinnedCoords ? "Fixado" : "Cursor"}: <strong>X: {activeCoord.x.toFixed(4)}</strong> ·{" "}
            <strong>Y: {activeCoord.y.toFixed(4)}</strong>
          </span>
          <button
            type="button"
            onClick={() => handleCopyCoords(activeCoord)}
            title="Copiar coordenadas normalizadas"
            aria-label="Copiar coordenadas normalizadas"
          >
            {copyNotice || "Copiar"}
          </button>
          {pinnedCoords && (
            <button
              type="button"
              onClick={() => setPinnedCoords(null)}
              title="Desafixar ponto"
              aria-label="Desafixar coordenadas"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Barra de Rodapé com Atalhos de Navegação */}
      <footer className="atlas-viewer-footer">
        <div className="atlas-viewer-footer__shortcuts">
          <span>
            Pan: <kbd>Arrastar</kbd> ou <kbd>Setas</kbd>
          </span>
          <span>
            Zoom: <kbd>+</kbd> / <kbd>-</kbd> ou <kbd>Scroll</kbd>
          </span>
          <span>
            Recentralizar: <kbd>0</kbd>
          </span>
          <span>
            Foco: <kbd>F</kbd>
          </span>
          <span>
            Atalhos ativos com foco no Atlas
          </span>
        </div>
        <span>Atlas Vivo · M0 Cartografia Canônica</span>
      </footer>
    <AtlasPlacesDirectory
      query={placeQuery}
      onQueryChange={setPlaceQuery}
      showPlaces={showPlaces}
      onTogglePlaces={() => setShowPlaces((value) => !value)}
      selectedId={selectedPlaceId}
      isFullscreen={isFullscreen}
      onSelect={handleSelectPlace}
      onClear={() => setSelectedPlaceId(null)}
    />
    </div>
    </>
  );
}
