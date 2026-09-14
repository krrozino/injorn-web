"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const folds = [
  { prefix: "/mundo", sigil: "I", office: "ATLAS REAL", title: "Verso cartográfico", line: "A margem também é parte do mapa.", note: "Rotas, lugares e cronologia pública deixam marcas até no verso do registro." },
  { prefix: "/personagens", sigil: "II", office: "GALERIA PÚBLICA", title: "Verso da moldura", line: "Todo retrato possui um enquadramento.", note: "O arquivo separa presença pública, encontro em campanha e informação ainda não liberada." },
  { prefix: "/faccoes", sigil: "III", office: "MESA DE PODER", title: "Verso do estandarte", line: "O tecido esconde as costuras do poder.", note: "Aqui só aparecem forças, nomes e sinais que já pertencem ao conhecimento dos jogadores." },
  { prefix: "/bestiario", sigil: "IV", office: "REGISTRO DE CAMPO", title: "Verso da ficha", line: "Nem todo rastro cabe na primeira leitura.", note: "A observação de campo permanece distinta de origem, estatística e segredo de mestre." },
  { prefix: "/cronicas", sigil: "V", office: "MEMÓRIA PÚBLICA", title: "Verso da memória", line: "O que aconteceu deixa pressão no papel.", note: "As crônicas terminam onde termina a sessão já jogada. O futuro não atravessa esta dobra." },
  { prefix: "/arquivo", sigil: "VI", office: "ACERVO CIVIL", title: "Verso do documento", line: "Procedência é parte do conteúdo.", note: "Registro oficial, observação, descoberta e rumor continuam visíveis como camadas diferentes." },
  { prefix: "/ecos", sigil: "VII", office: "MESA DE RESSONÂNCIA", title: "Verso do som", line: "Algumas memórias não precisam de palavras.", note: "A camada sonora permanece contextual e silenciosa até a biblioteca musical oficial estar fechada." },
];

export function PageFoldRitual() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const fold = folds.find((item) => pathname.startsWith(item.prefix));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!fold) return null;

  return (
    <div className={`page-fold ${open ? "page-fold--open" : ""}`}>
      <button
        type="button"
        className="page-fold__corner"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Fechar verso do registro" : "Puxar a dobra do registro"}
      >
        <span>{fold.sigil}</span>
        <i aria-hidden="true" />
      </button>

      <div className="page-fold__sheet" aria-hidden={!open}>
        <div className="page-fold__crease" aria-hidden="true" />
        <div className="page-fold__seal" aria-hidden="true"><span>{fold.sigil}</span><i /><i /><i /></div>
        <div className="page-fold__copy">
          <small>{fold.office}</small>
          <h2>{fold.title}</h2>
          <strong>{fold.line}</strong>
          <p>{fold.note}</p>
          <span>VERSO · ARQUIVO PÚBLICO DE INJORN</span>
        </div>
      </div>
    </div>
  );
}
