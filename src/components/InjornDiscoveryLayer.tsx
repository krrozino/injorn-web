"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { EchoResonator } from "@/components/EchoResonator";
import { RedactedDossier } from "@/components/RedactedDossier";

export function InjornDiscoveryLayer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname !== "/arquivo" && pathname !== "/ecos") return null;

  const archive = pathname === "/arquivo";

  return (
    <>
      <button
        type="button"
        className="seven-gates-trigger"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="seven-gates-trigger__orbit" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
        <span>
          <small>{archive ? "ARQUIVO INTERDITADO" : "CÂMARA DE ECO"}</small>
          <strong>{archive ? "Examinar documento" : "Sintonizar ressonância"}</strong>
        </span>
      </button>

      <div className={`royal-decree ${open ? "royal-decree--open" : ""}`} aria-hidden={!open}>
        <button type="button" className="royal-decree__backdrop" aria-label="Fechar ritual" onClick={() => setOpen(false)} />
        <article className="royal-decree__document" role="dialog" aria-modal="true" aria-label={archive ? "Documento reconstruído" : "Mesa de ressonância"}>
          <button type="button" className="royal-decree__close" onClick={() => setOpen(false)}>recolher mecanismo</button>
          {archive ? <RedactedDossier /> : <EchoResonator />}
        </article>
      </div>
    </>
  );
}
