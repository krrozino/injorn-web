"use client";

import { useMemo, useState } from "react";
import type { KnowledgeStatus as KnowledgeStatusType } from "@/content/playerKnowledge";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";

interface FigureRecord {
  name: string;
  role: string;
  titles: string[];
  summary: string;
  status: KnowledgeStatusType;
}

interface HeraldicGalleryProps {
  figures: FigureRecord[];
}

export function HeraldicGallery({ figures }: HeraldicGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const active = figures[activeIndex];
  const official = active?.status === "official";

  const monogram = useMemo(() => {
    if (!active) return "I";
    return active.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, [active]);

  if (!active) return null;

  function select(index: number) {
    setActiveIndex(index);
    setOpened(false);
  }

  return (
    <div className={`heraldic-gallery ${official ? "heraldic-gallery--official" : "heraldic-gallery--encounter"}`}>
      <div className="heraldic-gallery__index" role="list" aria-label="Figuras registradas">
        {figures.map((figure, index) => (
          <button
            type="button"
            role="listitem"
            key={figure.name}
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => select(index)}
            aria-pressed={index === activeIndex}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{figure.name}</strong>
              <small>{figure.role}</small>
            </div>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className={`heraldic-gallery__portrait ${opened ? "heraldic-gallery__portrait--open" : ""}`}>
        <div className="heraldic-gallery__arch" aria-hidden="true">
          <span className="heraldic-gallery__curtain heraldic-gallery__curtain--left" />
          <span className="heraldic-gallery__curtain heraldic-gallery__curtain--right" />
          <span className="heraldic-gallery__glass heraldic-gallery__glass--one" />
          <span className="heraldic-gallery__glass heraldic-gallery__glass--two" />
          <span className="heraldic-gallery__glass heraldic-gallery__glass--three" />
          <span className="heraldic-gallery__halo" />
          <strong>{monogram}</strong>
        </div>
        <button type="button" onClick={() => setOpened((value) => !value)} aria-expanded={opened}>
          {opened ? "fechar moldura" : "romper cortina"}
        </button>
      </div>

      <article className={`heraldic-gallery__dossier ${opened ? "heraldic-gallery__dossier--open" : ""}`} key={active.name}>
        <p className="kicker">{official ? "Galeria de Estado" : "Registro de encontro"}</p>
        <h3>{active.name}</h3>
        <span className="heraldic-gallery__role">{active.role}</span>
        <KnowledgeStatus status={active.status} />
        {active.titles.length ? (
          <div className="tag-row">
            {active.titles.map((title) => <span key={title}>{title}</span>)}
          </div>
        ) : null}
        <p>{active.summary}</p>
        <div className="heraldic-gallery__provenance">
          <span>{official ? "moldura oficial" : "arquivo de campo"}</span>
          <i />
          <span>{opened ? "leitura liberada" : "leitura velada"}</span>
        </div>
      </article>
    </div>
  );
}
