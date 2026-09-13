"use client";

import { useMemo, useState } from "react";
import styles from "./RedactedDossier.module.css";

const publicFragments = [
  {
    code: "P-01",
    label: "Padrão observado",
    text: "A temperatura influencia a progressão da crise, conforme sinais e registros já reunidos pelo grupo.",
  },
  {
    code: "P-02",
    label: "Conexão confirmada em jogo",
    text: "Documentos e testemunhos já encontrados conectam Gaspar e Lorde Valerius ao caso investigado pelos aventureiros.",
  },
  {
    code: "P-03",
    label: "Ocorrências conhecidas",
    text: "Ponta da Luz, São Kael e a capital aparecem no rastro já descoberto durante a campanha.",
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
    setRevealed((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }

  return (
    <div className={`${styles.dossier} ${complete ? styles.complete : ""}`}>
      <div className={styles.header}>
        <div>
          <p className="kicker">Arquivo interditado · versão já liberada</p>
          <h3>Dossiê reconstruído</h3>
        </div>
        <span>{complete ? "LEITURA RECONSTRUÍDA" : `${revealed.length}/3 FAIXAS LIDAS`}</span>
      </div>

      <div className={styles.paper}>
        <div className={styles.stamp} aria-hidden="true">RESTRITO</div>
        {fragments.map((fragment, index) => (
          <button
            key={fragment.code}
            type="button"
            className={`${styles.line} ${fragment.revealed ? styles.revealed : ""}`}
            onClick={() => toggle(index)}
            aria-pressed={fragment.revealed}
          >
            <span className={styles.code}>{fragment.code}</span>
            <span className={styles.copy}>
              <small>{fragment.label}</small>
              <strong>{fragment.text}</strong>
            </span>
            <span className={styles.ink} aria-hidden="true">
              <em>{fragment.revealed ? "reaplicar tinta" : "raspar tinta"}</em>
            </span>
          </button>
        ))}
      </div>

      <p className={styles.note}>
        A interação dramatiza somente informações já liberadas aos jogadores.
      </p>
    </div>
  );
}
