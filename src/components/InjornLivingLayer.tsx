"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { InjornDiscoveryLayer } from "@/components/InjornDiscoveryLayer";

function dispatchFor(pathname: string) {
  if (pathname.startsWith("/arquivo")) return "ARQUIVO CIVIL · ACESSO REGISTRADO";
  if (pathname.startsWith("/faccoes")) return "CIRCULAÇÃO DE PANFLETOS · SOB OBSERVAÇÃO";
  if (pathname.startsWith("/bestiario")) return "REGISTRO DE CAMPO · NÃO HOMOLOGADO";
  if (pathname.startsWith("/cronicas")) return "CRÔNICA PÚBLICA · TRECHO LIBERADO";
  if (pathname.startsWith("/mundo")) return "ATLAS DO REINO · CONSULTA AUTORIZADA";
  if (pathname.startsWith("/personagens")) return "GALERIA PÚBLICA · IDENTIDADES REGISTRADAS";
  return "ARQUIVO PÚBLICO DE INJORN";
}

export function InjornLivingLayer() {
  const pathname = usePathname();
  const [lens, setLens] = useState(false);
  const [dispatchPath, setDispatchPath] = useState<string | null>(null);
  const [anomalyPath, setAnomalyPath] = useState<string | null>(null);
  const fired = useRef({ path: pathname, dispatch: false, anomaly: false });
  const dispatchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anomalyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dispatchVisible = dispatchPath === pathname;
  const anomalyVisible = anomalyPath === pathname;

  useEffect(() => {
    fired.current = { path: pathname, dispatch: false, anomaly: false };
    if (dispatchTimer.current) clearTimeout(dispatchTimer.current);
    if (anomalyTimer.current) clearTimeout(anomalyTimer.current);
  }, [pathname]);

  useEffect(() => {
    document.body.dataset.dissonance = lens ? "true" : "false";
    return () => {
      delete document.body.dataset.dissonance;
    };
  }, [lens]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, window.scrollY / max);

      if (!fired.current.dispatch && progress > 0.16) {
        fired.current.dispatch = true;
        setDispatchPath(pathname);
        dispatchTimer.current = setTimeout(
          () => setDispatchPath((current) => (current === pathname ? null : current)),
          reduced ? 1000 : 3200,
        );
      }

      const canDisturb = pathname.startsWith("/mundo") || pathname.startsWith("/cronicas");
      if (canDisturb && !fired.current.anomaly && progress > 0.68) {
        fired.current.anomaly = true;
        setAnomalyPath(pathname);
        anomalyTimer.current = setTimeout(
          () => setAnomalyPath((current) => (current === pathname ? null : current)),
          reduced ? 700 : 2200,
        );
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (dispatchTimer.current) clearTimeout(dispatchTimer.current);
      if (anomalyTimer.current) clearTimeout(anomalyTimer.current);
    };
  }, [pathname]);

  return (
    <>
      <div className="injorn-living-layer">
        <button
          type="button"
          className={`dissonance-toggle ${lens ? "dissonance-toggle--active" : ""}`}
          aria-pressed={lens}
          onClick={() => setLens((value) => !value)}
        >
          <span className="dissonance-toggle__sigil" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
          <span>
            <small>Lente da Dissonância</small>
            <strong>{lens ? "Leitura de procedência ativa" : "Inspecionar procedência"}</strong>
          </span>
        </button>

        <div className={`dissonance-lens ${lens ? "dissonance-lens--active" : ""}`} aria-hidden="true">
          <div className="dissonance-lens__scan" />
          <div className="dissonance-lens__legend">
            <span><i className="is-official" />Fonte estatal</span>
            <span><i className="is-observed" />Observado</span>
            <span><i className="is-discovered" />Descoberto</span>
            <span><i className="is-rumor" />Rumor</span>
          </div>
        </div>

        <aside className={`royal-dispatch ${dispatchVisible ? "royal-dispatch--show" : ""}`} aria-hidden={!dispatchVisible}>
          <span className="royal-dispatch__seal" aria-hidden="true">VII</span>
          <div><small>COMUNICADO DO REINO</small><strong>{dispatchFor(pathname)}</strong></div>
          <i aria-hidden="true" />
        </aside>

        <div className={`vael-anomaly ${anomalyVisible ? "vael-anomaly--show" : ""}`} aria-hidden="true">
          <span className="vael-anomaly__edge vael-anomaly__edge--top" />
          <span className="vael-anomaly__edge vael-anomaly__edge--bottom" />
          <div className="vael-anomaly__signal"><small>SINAL FORA DO ARQUIVO</small><strong>VAEL KARUN</strong><span>memória residual detectada</span></div>
        </div>
      </div>
      <InjornDiscoveryLayer />
    </>
  );
}
