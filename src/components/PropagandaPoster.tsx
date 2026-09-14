"use client";

import { useState } from "react";

export function PropagandaPoster() {
  const [torn, setTorn] = useState(false);

  return (
    <div className={`propaganda-poster ${torn ? "propaganda-poster--torn" : ""}`}>
      <div className="propaganda-poster__truth">
        <p className="kicker">Por baixo da tinta</p>
        <h3>Procedência antes de certeza.</h3>
        <p>
          O arquivo não apaga a propaganda de Injorn. Ele mostra quem falou, o que foi observado e o que só apareceu depois que alguém decidiu investigar.
        </p>
        <span>ARQUIVO PÚBLICO · LEITURA CRÍTICA</span>
      </div>

      <div className="propaganda-poster__paper" aria-hidden={torn}>
        <div className="propaganda-poster__sun"><i /><i /><i /><i /><i /><i /><i /><strong>VII</strong></div>
        <small>EDITO DE CIRCULAÇÃO PÚBLICA</small>
        <strong className="propaganda-poster__slogan">ORDEM<br />FÉ<br />CONTINUIDADE</strong>
        <p>INJORN PERMANECE.</p>
        <span className="propaganda-poster__serial">CS · 136 · ARQ</span>
        <i className="propaganda-poster__tear propaganda-poster__tear--one" />
        <i className="propaganda-poster__tear propaganda-poster__tear--two" />
      </div>

      <button type="button" onClick={() => setTorn((value) => !value)} aria-pressed={torn}>
        <span>{torn ? "restaurar cartaz" : "rasgar propaganda"}</span>
        <i aria-hidden="true" />
      </button>
    </div>
  );
}
