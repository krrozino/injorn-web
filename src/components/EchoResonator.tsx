"use client";

import { useState } from "react";

const modes = [
  { id: "personagem", index: "I", title: "Leitmotiv", subtitle: "personagens", note: "Preparado para temas individuais quando a biblioteca oficial estiver fechada." },
  { id: "lugar", index: "II", title: "Paisagem", subtitle: "lugares", note: "Pensado para regiões, cidades, ruínas e espaços como Vael Karun." },
  { id: "evento", index: "III", title: "Memória", subtitle: "eventos", note: "Uma trilha pode acompanhar uma crônica sem começar a tocar sozinha." },
  { id: "cerimonia", index: "IV", title: "Cerimônia", subtitle: "rituais", note: "Cerimônias e solenidades podem ter assinatura sonora própria." },
];

export function EchoResonator() {
  const [active, setActive] = useState(0);
  const mode = modes[active];

  return (
    <section className={`memory-spindle ${active === 1 ? "memory-spindle--vael" : ""}`} aria-label="Mesa de ressonância de Injorn">
      <div className="memory-spindle__instrument" aria-hidden="true">
        <div className="memory-spindle__ring memory-spindle__ring--outer" />
        <div className="memory-spindle__ring memory-spindle__ring--middle" />
        <div className="memory-spindle__ring memory-spindle__ring--inner" />
        <div className="memory-spindle__axis memory-spindle__axis--x" />
        <div className="memory-spindle__axis memory-spindle__axis--y" />
        <div className="memory-spindle__flame"><i /><i /><strong>{mode.index}</strong></div>
        <div className="memory-spindle__echo"><i /><i /><i /></div>
      </div>

      <div className="memory-spindle__archive">
        <p className="kicker">Mesa de ressonância</p>
        <div className="memory-spindle__rail" role="list" aria-label="Canais sonoros planejados">
          {modes.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-pressed={index === active}
            >
              <span>{item.index}</span>
              <i aria-hidden="true" />
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </button>
          ))}
        </div>
      </div>

      <article className="memory-spindle__record" key={mode.id}>
        <div className="memory-spindle__glass" aria-hidden="true"><i /><i /><i /></div>
        <p className="kicker">Canal de eco · {mode.index}</p>
        <span className="memory-spindle__act">{mode.subtitle}</span>
        <h3>{mode.title}</h3>
        <p>{mode.note}</p>
        <div className="memory-spindle__footer">
          <span>prévia visual</span>
          <span>áudio ainda não integrado</span>
        </div>
      </article>
    </section>
  );
}
