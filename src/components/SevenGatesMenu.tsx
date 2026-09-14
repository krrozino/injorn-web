"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

const gates = [
  { label: "Mundo", href: "/mundo", sigil: "I", phrase: "Abrir o atlas" },
  { label: "Personagens", href: "/personagens", sigil: "II", phrase: "Abrir a galeria" },
  { label: "Faccoes", href: "/faccoes", sigil: "III", phrase: "Erguer estandartes" },
  { label: "Bestiario", href: "/bestiario", sigil: "IV", phrase: "Consultar registros" },
  { label: "Cronicas", href: "/cronicas", sigil: "V", phrase: "Reabrir memorias" },
  { label: "Arquivo", href: "/arquivo", sigil: "VI", phrase: "Romper lacres" },
  { label: "Ecos", href: "/ecos", sigil: "VII", phrase: "Escutar vestigios" },
];

export function SevenGatesMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.dataset.sevenGatesOpen = open ? "true" : "false";
    return () => {
      delete document.body.dataset.sevenGatesOpen;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`seven-gates-trigger ${open ? "seven-gates-trigger--open" : ""}`}
        aria-expanded={open}
        aria-controls="seven-gates-overlay"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="seven-gates-trigger__orbit" aria-hidden="true">
          {gates.map((gate) => <i key={gate.sigil} />)}
        </span>
        <span>
          <small>VII Portas</small>
          <strong>{open ? "Fechar astrolabio" : "Abrir astrolabio"}</strong>
        </span>
      </button>

      <section
        id="seven-gates-overlay"
        className={`seven-gates ${open ? "seven-gates--open" : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="seven-gates__backdrop"
          aria-label="Fechar astrolabio"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        />

        <div className="seven-gates__stage" role="dialog" aria-modal="true" aria-label="Astrolabio de navegacao de Injorn">
          <div className="seven-gates__rings" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="seven-gates__axes" aria-hidden="true"><i /><i /><i /><i /></div>

          <div className="seven-gates__core">
            <small>Arquivo Publico</small>
            <strong>VII</strong>
            <span>Escolha uma porta</span>
          </div>

          <nav className="seven-gates__nav" aria-label="Sete portas do arquivo">
            {gates.map((gate, index) => {
              const angle = -90 + index * (360 / gates.length);
              return (
                <Link
                  href={gate.href}
                  key={gate.href}
                  className="seven-gates__gate"
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  style={{
                    "--gate-angle": `${angle}deg`,
                    "--gate-counter-angle": `${-angle}deg`,
                    "--gate-delay": `${index * 55}ms`,
                  } as CSSProperties}
                >
                  <span className="seven-gates__gate-plate">
                    <span className="seven-gates__gate-sigil">{gate.sigil}</span>
                    <span className="seven-gates__gate-copy">
                      <strong>{gate.label}</strong>
                      <small>{gate.phrase}</small>
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <p className="seven-gates__caption">Navegacao ritual do arquivo publico de Injorn.</p>
        </div>
      </section>
    </>
  );
}
