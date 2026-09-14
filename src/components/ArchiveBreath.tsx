"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const breaths = [
  { prefix: "/mundo", code: "ATLAS", title: "A tinta acompanha a rota.", detail: "linhas cartográficas em repouso" },
  { prefix: "/personagens", code: "GALERIA", title: "As molduras continuam olhando.", detail: "registro público em observação" },
  { prefix: "/faccoes", code: "ESTANDARTE", title: "O tecido permanece sob tensão.", detail: "forças conhecidas em movimento" },
  { prefix: "/bestiario", code: "CAMPO", title: "O registro ainda procura padrões.", detail: "observação sem extrapolação" },
  { prefix: "/cronicas", code: "MEMÓRIA", title: "Alguma coisa ainda ecoa no papel.", detail: "recomposição de lembrança" },
  { prefix: "/arquivo", code: "ACERVO", title: "A tinta não secou por completo.", detail: "procedência preservada" },
  { prefix: "/ecos", code: "RESSONÂNCIA", title: "Existe som mesmo antes da música.", detail: "canal latente" },
  { prefix: "/", code: "INJORN", title: "O arquivo respira.", detail: "VII luzes em vigília" },
];

export function ArchiveBreath() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const breath = useMemo(
    () => breaths.find((item) => item.prefix !== "/" && pathname.startsWith(item.prefix)) ?? breaths[breaths.length - 1],
    [pathname],
  );

  useEffect(() => {
    const showTimer = window.setTimeout(() => setVisible(true), 7200);
    const hideTimer = window.setTimeout(() => setVisible(false), 10100);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <aside className={`archive-breath ${visible ? "archive-breath--visible" : ""}`} aria-hidden={!visible}>
      <span className="archive-breath__sigil" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
      <div>
        <small>{breath.code}</small>
        <strong>{breath.title}</strong>
        <span>{breath.detail}</span>
      </div>
    </aside>
  );
}
