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

export default function AtlasMapInner() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const placesLayerRef = useRef<L.LayerGroup | null>(null);

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
      padding: [12, 12],
      animate: true,
    });
  }, [height, width]);

  // Controles de zoom acessíveis
  const handleZoomIn = useCallback(() => {
    mapInstanceRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    mapInstanceRef.current?.zoomOut();
  }, []);

  // Alterna o modo foco / expansão da tela
  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          handleRecenter();
        }
      }, 200);
      return next;
    });
  }, [handleRecenter]);

  const handleSelectPlace = useCallback((id: string) => {
    const place = publicPlaces.find((entry) => entry.id === id);
    if (!place) return;
    setSelectedPlaceId(place.id);
    mapInstanceRef.current?.panTo(normalizedToLatLng(place.geometry), {
      animate: true,
      duration: 0.35,
    });
  }, []);

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
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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

  // Teclas de atalho contextuais (restritas ao foco do Atlas ou modo tela cheia)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar se o usuário estiver digitando em campo de texto
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Escape sempre fecha gaveta aberta ou tela cheia
      if (e.key === "Escape") {
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
          return;
        }
        if (isFullscreen) {
          setIsFullscreen(false);
          setTimeout(() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.invalidateSize();
              handleRecenter();
            }
          }, 200);
          return;
        }
      }

      // Atalhos de navegação somente ativos com foco dentro do Atlas ou em tela cheia
      const activeElement = document.activeElement;
      const isAtlasFocused =
        isFullscreen ||
        (frameRef.current !== null &&
          activeElement !== null &&
          frameRef.current.contains(activeElement));

      if (!isAtlasFocused) return;

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
      role="region"
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
    </div>
    <AtlasPlacesDirectory
      query={placeQuery}
      onQueryChange={setPlaceQuery}
      showPlaces={showPlaces}
      onTogglePlaces={() => setShowPlaces((value) => !value)}
      selectedId={selectedPlaceId}
      onSelect={handleSelectPlace}
      onClear={() => setSelectedPlaceId(null)}
    />
    </>
  );
}
