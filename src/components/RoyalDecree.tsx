"use client";

import { useEffect, useState } from "react";

export function RoyalDecree() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.royalDecreeOpen = open ? "true" : "false";
    return () => {
      delete document.body.dataset.royalDecreeOpen;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="royal-doctrine__seal royal-decree-trigger"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="royal-doctrine__sun" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <strong>I</strong>
        </span>
        <span>REGISTRO DA COROA</span>
        <small>romper o lacre de leitura</small>
      </button>

      <div className={`royal-decree ${open ? "royal-decree--open" : ""}`} aria-hidden={!open}>
        <button
          type="button"
          className="royal-decree__backdrop"
          aria-label="Fechar decreto"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />

        <article className="royal-decree__document" role="dialog" aria-modal="true" aria-labelledby="royal-decree-title">
          <div className="royal-decree__rail royal-decree__rail--left" aria-hidden="true" />
          <div className="royal-decree__rail royal-decree__rail--right" aria-hidden="true" />
          <div className="royal-decree__seal" aria-hidden="true">
            <span>VII</span>
            <i />
          </div>
          <p className="royal-decree__eyebrow">ARQUIVO REAL · REGISTRO PÚBLICO</p>
          <h3 id="royal-decree-title">Por ordem da Coroa Solar</h3>
          <p className="royal-decree__lead">
            Injorn se apresenta como um reino de ordem, continuidade, fé e proteção. Seus monumentos,
            cerimônias e registros públicos sustentam essa imagem diante de seus cidadãos.
          </p>
          <div className="royal-decree__clause">
            <span>I</span>
            <p>Este documento representa a versão oficial do Estado. Não substitui aquilo que foi observado ou descoberto em sessão.</p>
          </div>
          <div className="royal-decree__clause">
            <span>II</span>
            <p>Informações públicas são preservadas com procedência visível para que propaganda, rumor e evidência não sejam tratados como a mesma coisa.</p>
          </div>
          <div className="royal-decree__signature">
            <span>REGISTRO HOMOLOGADO</span>
            <strong>INJORN</strong>
          </div>
          <button type="button" className="royal-decree__close" onClick={() => setOpen(false)}>
            recolher decreto
          </button>
        </article>
      </div>
    </>
  );
}
