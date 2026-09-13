"use client";

import { useEffect, useState } from "react";

type ArchiveEntry = {
  code: string;
  title: string;
  summary: string;
  status: string;
};

interface ArchiveRitualsProps {
  entries: ArchiveEntry[];
}

export function ArchiveRituals({ entries }: ArchiveRitualsProps) {
  const [active, setActive] = useState<ArchiveEntry | null>(null);
  const [fractured, setFractured] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.dataset.dossierOpen = active ? "true" : "false";
    return () => {
      delete document.body.dataset.dossierOpen;
    };
  }, [active]);

  return (
    <>
      <div className="archive-ritual-list">
        {entries.map((entry, index) => (
          <button
            type="button"
            className="archive-ritual-card"
            key={entry.code}
            onClick={() => setActive(entry)}
            style={{ "--archive-delay": `${index * 45}ms` } as React.CSSProperties}
          >
            <span className="archive-ritual-card__code">{entry.code}</span>
            <span className="archive-ritual-card__seal" aria-hidden="true"><i /></span>
            <span className="archive-ritual-card__copy">
              <small>{entry.status}</small>
              <strong>{entry.title}</strong>
              <span>{entry.summary}</span>
            </span>
            <span className="archive-ritual-card__action">romper lacre ↗</span>
          </button>
        ))}
      </div>

      <section className={`archive-dossier ${active ? "archive-dossier--open" : ""}`} aria-hidden={!active}>
        <button className="archive-dossier__backdrop" type="button" aria-label="Fechar dossiê" onClick={() => setActive(null)} />
        <article className="archive-dossier__paper" role="dialog" aria-modal="true" aria-label={active ? `Dossiê ${active.title}` : "Dossiê"}>
          <div className="archive-dossier__rail" aria-hidden="true">
            <span>ARQUIVO</span>
            <span>INJORN</span>
          </div>
          <div className="archive-dossier__seal" aria-hidden="true"><span>{active?.code ?? "I"}</span></div>
          <p className="kicker">Documento liberado aos jogadores</p>
          <h3>{active?.title}</h3>
          <div className="archive-dossier__rule" aria-hidden="true"><i /><i /><i /></div>
          <p>{active?.summary}</p>
          <dl>
            <div><dt>Procedência</dt><dd>{active?.status}</dd></div>
            <div><dt>Registro</dt><dd>{active?.code}</dd></div>
          </dl>
          <button type="button" className="archive-dossier__close" onClick={() => setActive(null)}>Fechar registro</button>
        </article>
      </section>

      <section className={`truth-fracture ${fractured ? "truth-fracture--open" : ""}`} aria-labelledby="truth-fracture-title">
        <div className="truth-fracture__official">
          <p className="kicker">Versão oficial</p>
          <h3 id="truth-fracture-title">Migarazur, o Prisma da Vontade Divina</h3>
          <p>
            Os sete arcanjos teriam unido voluntariamente suas essências numa única manifestação divina para proteger o reino.
          </p>
          <button type="button" onClick={() => setFractured(true)} aria-expanded={fractured}>
            Romper o selo
          </button>
        </div>
        <div className="truth-fracture__scar" aria-hidden="true"><i /><i /><i /></div>
        <div className="truth-fracture__discovered" aria-hidden={!fractured}>
          <p className="kicker">Descoberto pelo grupo</p>
          <h3>Por trás do vitral</h3>
          <p>
            A Dissonância revelou que Migarazur funciona como um receptáculo que mantém sete consciências angelicais aprisionadas e que a magia religiosa de Injorn está ligada à extração desse poder.
          </p>
          <button type="button" onClick={() => setFractured(false)}>Recompor a versão oficial</button>
        </div>
      </section>
    </>
  );
}
