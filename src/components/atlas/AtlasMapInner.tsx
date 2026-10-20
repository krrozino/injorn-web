"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  canonicalKingdomMap,
  initialAtlasLayers,
  latLngToNormalized,
} from "@/content/atlas";
import type { NormalizedCoordinate } from "@/types/atlas";

export default function AtlasMapInner() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const layers = initialAtlasLayers;
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
      padding: [24, 24],
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
    setIsFullscreen((prev) => !prev);
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);
  }, []);

  // Copia as coordenadas para a área de transferência
  const handleCopyCoords = useCallback((coord: NormalizedCoordinate) => {
    const text = `x: ${coord.x.toFixed(4)}, y: ${coord.y.toFixed(4)}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopyNotice("Copiado!");
      setTimeout(() => setCopyNotice(null), 2000);
    }
  }, []);

  // Inicialização do Leaflet com CRS.Simple
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Se já houver instância, destruir antes de recriar
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [height, width],
    ];

    // Limites de deslocamento com margem confortável para ver todas as bordas
    const maxBounds: L.LatLngBoundsExpression = [
      [-height * 0.25, -width * 0.25],
      [height * 1.25, width * 1.25],
    ];

    const map = L.map(mapContainerRef.current, {
      crs: L.CRS.Simple,
      minZoom: -1.5,
      maxZoom: 2.5,
      zoomSnap: 0.25,
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

    // Enquadra a arte completa inicialmente
    map.fitBounds(bounds, {
      padding: [20, 20],
      animate: false,
    });

    setZoomLevel(map.getZoom());

    // Rastreia coordenadas ao mover o cursor sobre o mapa
    map.on("mousemove", (event: L.LeafletMouseEvent) => {
      const norm = latLngToNormalized(event.latlng.lat, event.latlng.lng, width, height);
      setCursorCoords(norm);
    });

    // Fixa coordenada ao clicar (útil para auditoria cartográfica e anotações M1)
    map.on("click", (event: L.LeafletMouseEvent) => {
      const norm = latLngToNormalized(event.latlng.lat, event.latlng.lng, width, height);
      setPinnedCoords(norm);
    });

    map.on("zoomend", () => {
      setZoomLevel(Number(map.getZoom().toFixed(2)));
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [height, width]);

  // Teclas de atalho para acessibilidade e navegação
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar se o usuário estiver digitando em campo de texto
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

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
      } else if (e.key === "Escape") {
        if (isDrawerOpen) setIsDrawerOpen(false);
        if (isFullscreen) {
          setIsFullscreen(false);
          setTimeout(() => mapInstanceRef.current?.invalidateSize(), 200);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRecenter, handleZoomIn, handleZoomOut, handleToggleFullscreen, isDrawerOpen, isFullscreen]);

  const activeCoord = pinnedCoords || cursorCoords;

  return (
    <div
      ref={frameRef}
      className={`atlas-viewer-frame ${
        isFullscreen ? "atlas-viewer-frame--fullscreen" : ""
      }`}
      role="region"
      aria-label="Atlas Vivo de Injorn — Mapa Canônico"
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
        aria-label="Área interativa do mapa. Use o mouse ou gestos de toque para mover e ampliar. Setas do teclado movimentam o mapa."
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
              <span className="atlas-meta-spec__label">Zoom Atual</span>
              <span className="atlas-meta-spec__val">{zoomLevel}x</span>
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
        </div>
        <span>Atlas Vivo · M0 Cartografia Canônica</span>
      </footer>
    </div>
  );
}
