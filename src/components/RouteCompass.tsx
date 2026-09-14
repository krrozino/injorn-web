"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import type { TravelRecord } from "@/content/travel";

const directionAngles: Record<string, number> = {
  Norte: 0,
  Nordeste: 45,
  Leste: 90,
  Sudeste: 135,
  Sul: 180,
  Sudoeste: 225,
  Oeste: 270,
  Noroeste: 315,
};

interface RouteCompassProps {
  records: TravelRecord[];
}

export function RouteCompass({ records }: RouteCompassProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = records[activeIndex];
  const allDirections = active.direction === "Todas as direções";
  const angle = directionAngles[active.direction] ?? 0;
  const isVael = active.destination.toLowerCase().includes("vael karun");

  const style = useMemo(
    () => ({ "--route-angle": `${angle}deg` } as CSSProperties),
    [angle],
  );

  return (
    <div
      className={`route-compass ${allDirections ? "route-compass--all" : ""} ${isVael ? "route-compass--vael" : ""}`}
      style={style}
    >
      <div className="route-compass__dial" aria-hidden="true">
        <span className="route-compass__ring route-compass__ring--outer" />
        <span className="route-compass__ring route-compass__ring--middle" />
        <span className="route-compass__ring route-compass__ring--inner" />
        <span className="route-compass__axis route-compass__axis--vertical" />
        <span className="route-compass__axis route-compass__axis--horizontal" />
        <span className="route-compass__cardinal route-compass__cardinal--n">N</span>
        <span className="route-compass__cardinal route-compass__cardinal--e">L</span>
        <span className="route-compass__cardinal route-compass__cardinal--s">S</span>
        <span className="route-compass__cardinal route-compass__cardinal--w">O</span>
        <span className="route-compass__ray" />
        <span className="route-compass__needle"><i /></span>
        <span className="route-compass__capital">INJORN</span>
        <span className="route-compass__echo"><i /><i /><i /></span>
      </div>

      <div className="route-compass__routes" aria-label="Rotas conhecidas">
        <p className="kicker">Selecione uma rota</p>
        <div className="route-compass__route-list">
          {records.map((record, index) => (
            <button
              type="button"
              key={record.destination}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{record.destination}</strong>
              <small>{record.direction}</small>
            </button>
          ))}
        </div>
      </div>

      <article className="route-compass__manifest" key={active.destination}>
        <p className="kicker">Rota aberta a partir da capital</p>
        <h3>{active.destination}</h3>
        <div className="route-compass__bearing">
          <span>Direção</span>
          <strong>{active.direction}</strong>
        </div>
        <dl>
          <div>
            <dt>A cavalo</dt>
            <dd>{active.horseback}</dd>
          </div>
          <div>
            <dt>A pé</dt>
            <dd>{active.onFoot}</dd>
          </div>
          <div>
            <dt>Distância</dt>
            <dd>{active.distance}</dd>
          </div>
        </dl>
        <p className="route-compass__warning">
          Estimativa de estrada conhecida. Clima, terreno, patrulhas e incidentes podem alterar o percurso.
        </p>
      </article>
    </div>
  );
}
