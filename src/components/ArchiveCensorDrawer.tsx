"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { RedactedDossier } from "@/components/RedactedDossier";

export function ArchiveCensorDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname !== "/arquivo") return null;

  return (
    <>
      <button type="button" className="archive-censor-trigger" onClick={() => setOpen(true)}>
        <span>ARQ-R</span>
        <strong>Documento censurado</strong>
        <small>raspar tinta</small>
      </button>
      <div className={`archive-censor-drawer ${open ? "archive-censor-drawer--open" : ""}`} aria-hidden={!open}>
        <button type="button" className="archive-censor-drawer__backdrop" aria-label="Fechar documento" onClick={() => setOpen(false)} />
        <div className="archive-censor-drawer__panel" role="dialog" aria-modal="true" aria-label="Documento censurado reconstruído">
          <button type="button" className="archive-censor-drawer__close" onClick={() => setOpen(false)}>recolher documento</button>
          <RedactedDossier />
        </div>
      </div>
    </>
  );
}
