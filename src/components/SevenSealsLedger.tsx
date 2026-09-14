"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const folios = [
  { href: "/mundo", sigil: "I", label: "Mundo", office: "Atlas Real" },
  { href: "/personagens", sigil: "II", label: "Personagens", office: "Galeria Pública" },
  { href: "/faccoes", sigil: "III", label: "Facções", office: "Mesa de Poder" },
  { href: "/bestiario", sigil: "IV", label: "Bestiário", office: "Registro de Campo" },
  { href: "/cronicas", sigil: "V", label: "Crônicas", office: "Memória Pública" },
  { href: "/arquivo", sigil: "VI", label: "Arquivo", office: "Acervo Civil" },
  { href: "/ecos", sigil: "VII", label: "Ecos", office: "Mesa de Ressonância" },
];

function folioForPath(path: string) {
  return folios.find((folio) => path.startsWith(folio.href));
}

export function SevenSealsLedger() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visited, setVisited] = useState<string[]>(() => {
    const current = folioForPath(pathname);
    return current ? [current.href] : [];
  });

  useEffect(() => {
    const markPath = (path: string) => {
      const match = folioForPath(path);
      if (!match) return;
      setVisited((existing) => existing.includes(match.href) ? existing : [...existing, match.href]);
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      try {
        const destination = new URL(target.href, window.location.origin);
        if (destination.origin === window.location.origin) markPath(destination.pathname);
      } catch {
        // Ignore malformed or non-navigation anchors.
      }
    };

    const onPopState = () => markPath(window.location.pathname);
    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sealed = folios.filter((folio) => visited.includes(folio.href)).length;
  const complete = sealed === folios.length;

  return (
    <>
      <button type="button" className={`seven-seals-trigger ${complete ? "seven-seals-trigger--complete" : ""}`} aria-expanded={open} onClick={() => setOpen(true)}>
        <span className="seven-seals-trigger__seal" aria-hidden="true"><strong>{sealed}</strong><i /></span>
        <span><small>Livro das Sete Portas</small><strong>{complete ? "VII selos reconhecidos" : `${sealed}/7 áreas visitadas`}</strong></span>
      </button>

      <section className={`seven-seals ${open ? "seven-seals--open" : ""} ${complete ? "seven-seals--complete" : ""}`} aria-hidden={!open}>
        <button type="button" className="seven-seals__backdrop" aria-label="Fechar livro" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} />
        <div className="seven-seals__book" role="dialog" aria-modal="true" aria-label="Livro das Sete Portas de Injorn">
          <div className="seven-seals__spine" aria-hidden="true" />
          <button type="button" className="seven-seals__close" onClick={() => setOpen(false)}>fechar registro</button>

          <header className="seven-seals__heading">
            <div className="seven-seals__royal-mark" aria-hidden="true"><span>VII</span><i /><i /><i /><i /><i /><i /><i /></div>
            <div><p className="kicker">Registro de travessia</p><h2>Livro das Sete Portas</h2><p>Enquanto você percorre o arquivo, cada grande área recebe um selo cerimonial. É uma camada de navegação, não uma fonte de lore adicional.</p></div>
          </header>

          <div className="seven-seals__folio-grid" role="list" aria-label="Selos das sete áreas">
            {folios.map((folio, index) => {
              const isVisited = visited.includes(folio.href);
              const isCurrent = pathname.startsWith(folio.href);
              return (
                <Link href={folio.href} key={folio.href} role="listitem" className={`seven-seals__folio ${isVisited ? "is-sealed" : ""} ${isCurrent ? "is-current" : ""}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} style={{ "--seal-delay": `${index * 70}ms` } as CSSProperties}>
                  <span className="seven-seals__folio-number">{folio.sigil}</span>
                  <span className="seven-seals__folio-copy"><small>{folio.office}</small><strong>{folio.label}</strong><em>{isVisited ? "registro reconhecido" : "registro pendente"}</em></span>
                  <span className="seven-seals__stamp" aria-hidden="true"><i /><strong>{folio.sigil}</strong><small>{isVisited ? "SELADO" : "ABERTO"}</small></span>
                </Link>
              );
            })}
          </div>

          <div className="seven-seals__progress" aria-label={`${sealed} de 7 áreas visitadas`}><div>{folios.map((folio) => <i key={folio.href} className={visited.includes(folio.href) ? "is-sealed" : ""} />)}</div><span>{sealed}/7 · percurso reconhecido</span></div>

          {complete ? <div className="seven-seals__completion" role="status"><div className="seven-seals__completion-seal" aria-hidden="true"><span>VII</span>{folios.map((folio, index) => <i key={folio.href} style={{ "--seal-index": index } as CSSProperties} />)}</div><div><small>TRAVESSIA COMPLETA</small><strong>As Sete Portas reconheceram sua passagem.</strong><p>O arquivo não revela um segredo por isso; apenas transforma a navegação em uma cerimônia do próprio mundo.</p></div></div> : null}

          <footer className="seven-seals__footer"><span>REGISTRO DA SESSÃO DE NAVEGAÇÃO</span><span>ARQUIVO PÚBLICO · INJORN</span></footer>
        </div>
      </section>
    </>
  );
}
