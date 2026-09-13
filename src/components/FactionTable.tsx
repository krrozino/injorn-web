"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";
import type { FactionRecord } from "@/content/factions";

interface FactionTableProps {
  factions: FactionRecord[];
}

export function FactionTable({ factions }: FactionTableProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = factions[activeIndex];
  const rotation = activeIndex * -(360 / factions.length);
  const style = {
    "--faction-rotation": `${rotation}deg`,
    "--faction-count": factions.length,
  } as CSSProperties;

  return (
    <section className="faction-table" style={style} aria-label="Mesa interativa das facções conhecidas">
      <div className="faction-table__stage">
        <div className="faction-table__orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="faction-table__ring">
          {factions.map((faction, index) => {
            const nodeStyle = { "--faction-angle": `${index * (360 / factions.length)}deg` } as CSSProperties;
            return (
              <button
                type="button"
                key={faction.name}
                className={`faction-table__node ${index === activeIndex ? "is-active" : ""}`}
                style={nodeStyle}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{faction.name}</strong>
              </button>
            );
          })}
        </div>
        <div className="faction-table__core" aria-hidden="true">
          <span>INJORN</span>
          <strong>VI</strong>
          <small>forças conhecidas</small>
        </div>
      </div>

      <article className="faction-table__manifest" key={active.name}>
        <p className="kicker">Estandarte selecionado</p>
        <div className="faction-table__manifest-head">
          <div>
            <span>{active.kind}</span>
            <h3>{active.name}</h3>
          </div>
          <KnowledgeStatus status={active.status} />
        </div>
        {active.aliases?.length ? (
          <div className="tag-row" aria-label={`Nomes conhecidos de ${active.name}`}>
            {active.aliases.map((alias) => <span key={alias}>{alias}</span>)}
          </div>
        ) : null}
        <p>{active.summary}</p>
        <div className="faction-table__intel">
          <span>Leitura do grupo</span>
          <p>{active.playerNote}</p>
        </div>
        <small className="faction-table__note">A posição no círculo é gráfica e não representa aliança, hierarquia ou proximidade política.</small>
      </article>
    </section>
  );
}
