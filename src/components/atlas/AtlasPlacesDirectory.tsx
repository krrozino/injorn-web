"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";
import { publicPlaceRecordId } from "@/content/placeRecord";

import { knownPlaces } from "@/content/playerKnowledge";
import { canonicalFeatures } from "@/content/atlas";
import type { GeoFeature, NormalizedCoordinate } from "@/types/atlas";

export type PublicPlace = GeoFeature & { geometry: NormalizedCoordinate };

function isPublicPlace(feature: GeoFeature): feature is PublicPlace {
  return (
    feature.published &&
    feature.type === "marker" &&
    feature.category === "place" &&
    !Array.isArray(feature.geometry) &&
    knownPlaces.some((place) => place.name === feature.label)
  );
}

/** Apenas entidades aprovadas para a superfície pública. */
export const publicPlaces = canonicalFeatures.filter(isPublicPlace);

interface AtlasPlacesDirectoryProps {
  query: string;
  onQueryChange: (query: string) => void;
  showPlaces: boolean;
  onTogglePlaces: () => void;
  selectedId: string | null;
  isFullscreen: boolean;
  onSelect: (id: string) => void;
  onClear: () => void;
}

export function AtlasPlacesDirectory({
  query,
  onQueryChange,
  showPlaces,
  onTogglePlaces,
  selectedId,
  isFullscreen,
  onSelect,
  onClear,
}: AtlasPlacesDirectoryProps) {
  const catalogRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isFullscreen || !selectedId) return;
    // A ficha selecionada deve ficar visível até em telas de 320px.
    const catalog = catalogRef.current;
    const details = detailsRef.current;
    if (catalog && details) {
      const target = details.getBoundingClientRect().top - catalog.getBoundingClientRect().top;
      catalog.scrollTop += target - 12;
    }
  }, [isFullscreen, selectedId]);

  const filtered = publicPlaces.filter((place) =>
    place.label.toLocaleLowerCase("pt-BR").includes(query.trim().toLocaleLowerCase("pt-BR"))
  );
  const selectedFeature = publicPlaces.find((place) => place.id === selectedId);
  const selectedRecord = selectedFeature
    ? knownPlaces.find((place) => place.name === selectedFeature.label)
    : undefined;

  return (
    <section ref={catalogRef} className="atlas-places-catalog" aria-labelledby="atlas-places-title">
      <div className="atlas-places-catalog__heading">
        <div>
          <span className="atlas-places-catalog__kicker">Cartografia documentada · M1</span>
          <h2 id="atlas-places-title">Lugares do Reino</h2>
          <p>Selecione um marco para centralizá-lo no mapa e consultar seu registro público.</p>
        </div>
        <button className="atlas-places-toggle" type="button" onClick={onTogglePlaces} aria-pressed={showPlaces}>
          {showPlaces ? "Ocultar marcadores" : "Exibir marcadores"}
        </button>
      </div>
      <div className="atlas-places-catalog__body">
        <div className="atlas-places-directory">
          <label htmlFor="atlas-place-search">Encontrar um lugar</label>
          <input
            id="atlas-place-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar entre os locais mapeados…"
            autoComplete="off"
          />
          <div className="atlas-places-directory__list" aria-label="Lugares mapeados">
            {filtered.map((place) => {
              const record = knownPlaces.find((entry) => entry.name === place.label);
              return (
                <button
                  type="button"
                  key={place.id}
                  className={`atlas-place-entry ${selectedId === place.id ? "atlas-place-entry--selected" : ""}`}
                  aria-pressed={selectedId === place.id}
                  onClick={() => onSelect(place.id)}
                >
                  <strong>{place.label}</strong>
                  <span>{record?.kind ?? "Local do reino"}</span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="atlas-places-directory__empty">Nenhum marco publicado corresponde à busca.</p>
            )}
          </div>
          <p className="atlas-places-directory__notice">
            Outros registros, como Ponta da Luz, aguardam confirmação exata de sua posição no mapa.
          </p>
        </div>
        <article ref={detailsRef} className="atlas-place-detail" aria-live="polite">
          {selectedFeature && selectedRecord ? (
            <>
              <span className="atlas-places-catalog__kicker">Registro público · {selectedRecord.kind}</span>
              <KnowledgeStatus status={selectedRecord.status} />
              <h3>{selectedFeature.label}</h3>
              <p>{selectedRecord.summary}</p>
              <ul>{selectedRecord.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <div className="atlas-place-detail__actions">
                <button type="button" onClick={() => onSelect(selectedFeature.id)}>Centralizar no mapa</button>
                <Link href={`/mundo#${publicPlaceRecordId(selectedRecord.name)}`}>Abrir registro público no Mundo</Link>
                <button type="button" onClick={onClear}>Limpar seleção</button>
              </div>
            </>
          ) : (
            <>
              <span className="atlas-places-catalog__kicker">Atlas Vivo</span>
              <h3>Um reino para explorar</h3>
              <p>
                Estes marcos representam lugares já documentados publicamente em Injorn.
                A história do universo é maior do que os caminhos percorridos pelos aventureiros.
              </p>
              <p>As âncoras geográficas serão homologadas pelo mestre antes de irem à produção.</p>
            </>
          )}
        </article>
      </div>
    </section>
  );
}
