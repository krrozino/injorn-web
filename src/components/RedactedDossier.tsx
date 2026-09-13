"use client";

import { useMemo, useState } from "react";

const publicFragments = [
  {
    code: "P-01",
    label: "Padrão observado",
    text: "A temperatura influencia a progressão da Praga, conforme sinais e registros já reunidos pelo grupo.",
  },
  {
    code: "P-02",
    label: "Conexão confirmada em jogo",
    text: "Cartas, laboratórios e testemunhos ligam Gaspar e Lorde Valerius ao desenvolvimento e à disseminação deliberada da crise.",
  },
  {
    code: "P-03",
    label: "Ocorrências conhecidas",
    text: "Ponta da Luz, São Kael e a capital aparecem no rastro já descoberto da epidemia.",
  },
];

export function RedactedDossier() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const complete = revealed.length === publicFragments.length;

  const fragments = useMemo(
    () => publicFragments.map((fragment, index) => ({ ...fragment, revealed: revealed.includes(index) })),
    [revealed],
  );

  function toggle(index: number) {
    setRevealed((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  }

  return (
    <div className={`redacted-dossier ${complete ? "redacted-dossier--complete" : ""}`}>
      <div className="redacted-dossier__header">
        <div>
          <p className="kicker">Arquivo interditado · versão já liberada</p>
          <h3>Dossiê da Praga</h3>
        </div>
        <span>{complete ? "LEITURA RECONSTRUÍDA" : `${revealed.length}/3 FAIXAS LIDAS`}</span>
      </div>

      <div className="redacted-dossier__paper">
        <div className="redacted-dossier__stamp" aria-hidden="true">RESTRITO</div>
        {fragments.map((fragment, index) => (
          <button
            key={fragment.code}
            type="button"
            className={`redacted-line ${fragment.revealed ? "redacted-line--revealed" : ""}`}
            onClick={() => toggle(index)}
            aria-pressed={fragment.revealed}
          >
            <span className="redacted-line__code">{fragment.code}</span>
            <span className="redacted-line__copy">
              <small>{fragment.label}</small>
              <strong>{fragment.text}</strong>
            </span>
            <span className="redacted-line__ink" aria-hidden="true">
              <i /><i /><i /><i />
              <em>{fragment.revealed ? "reaplicar tinta" : "raspar tinta"}</em>
            </span>
          </button>
        ))}
      </div>

      <p className="redacted-dossier__note">
        A interação não revela material de mestre: apenas dramatiza informações que já pertencem ao conhecimento público dos jogadores.
      </p>
    </div>
  );
}
