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
    <section className={`echo-resonator echo-resonator--mode-${active + 1}`} aria-label="Mesa de ressonância de Injorn">
      <div className="echo-resonator__instrument">
        <div className="echo-resonator__ring echo-resonator__ring--one" />
        <div className="echo-resonator__ring echo-resonator__ring--two" />
        <div className="echo-resonator__needle" />
        <div className="echo-resonator__waves" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
        </div>
        <div className="echo-resonator__core">
          <small>RESSONÂNCIA</small>
          <strong>{mode.index}</strong>
          <span>{mode.title}</span>
        </div>
      </div>

      <div className="echo-resonator__panel">
        <p className="kicker">Mesa de ressonância</p>
        <h2>O arquivo também escuta.</h2>
        <p>Este instrumento ainda não reproduz músicas: ele antecipa como trilhas e leitmotivs poderão reagir ao contexto sem virar um player invasivo.</p>

        <div className="echo-resonator__modes" role="list" aria-label="Modos sonoros planejados">
          {modes.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-pressed={index === active}
            >
              <span>{item.index}</span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </div>
            </button>
          ))}
        </div>

        <div className="echo-resonator__readout" key={mode.id}>
          <span>CANAL {mode.index}</span>
          <strong>{mode.title}</strong>
          <p>{mode.note}</p>
        </div>
      </div>
    </section>
  );
}
