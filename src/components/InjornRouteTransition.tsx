"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionKind =
  | "crown"
  | "atlas"
  | "portraits"
  | "banners"
  | "beast"
  | "memory"
  | "archive"
  | "echoes";

type TransitionPhase = "idle" | "covering" | "revealing";

const transitionMeta: Record<TransitionKind, { eyebrow: string; title: string; sigil: string }> = {
  crown: { eyebrow: "Coroa de Injorn", title: "Retorno ao reino", sigil: "I" },
  atlas: { eyebrow: "Atlas do reino", title: "O mapa se abre", sigil: "✦" },
  portraits: { eyebrow: "Registro de nomes", title: "Os rostos respondem", sigil: "II" },
  banners: { eyebrow: "Forças em movimento", title: "Os estandartes se erguem", sigil: "III" },
  beast: { eyebrow: "Registro de campo", title: "A marca foi encontrada", sigil: "IV" },
  memory: { eyebrow: "Memória da campanha", title: "A crônica desperta", sigil: "V" },
  archive: { eyebrow: "Arquivo do reino", title: "O selo foi rompido", sigil: "VI" },
  echoes: { eyebrow: "Ecos de Injorn", title: "O mundo atravessa o silêncio", sigil: "VII" },
};

function kindForPath(pathname: string): TransitionKind {
  if (pathname.startsWith("/mundo")) return "atlas";
  if (pathname.startsWith("/personagens")) return "portraits";
  if (pathname.startsWith("/faccoes")) return "banners";
  if (pathname.startsWith("/bestiario")) return "beast";
  if (pathname.startsWith("/cronicas")) return "memory";
  if (pathname.startsWith("/arquivo")) return "archive";
  if (pathname.startsWith("/ecos")) return "echoes";
  return "crown";
}

export function InjornRouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const pendingHref = useRef<string | null>(null);
  const navigationTimer = useRef<number | null>(null);
  const releaseTimer = useRef<number | null>(null);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [kind, setKind] = useState<TransitionKind>(kindForPath(pathname));

  useEffect(() => {
    const body = document.body;
    body.dataset.injornTransition = phase;
    if (phase === "idle") {
      body.style.removeProperty("overflow");
    } else {
      body.style.overflow = "hidden";
    }

    return () => {
      body.style.removeProperty("overflow");
    };
  }, [phase]);

  useEffect(() => {
    if (pathname === previousPath.current) return;

    previousPath.current = pathname;
    pendingHref.current = null;
    setKind(kindForPath(pathname));
    setPhase("revealing");

    if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => setPhase("idle"), 1120);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (phase !== "idle") return;

      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.dataset.noTransition === "true" || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      event.preventDefault();
      const href = `${url.pathname}${url.search}${url.hash}`;
      pendingHref.current = href;

      const rect = anchor.getBoundingClientRect();
      const originX = event.clientX || rect.left + rect.width / 2;
      const originY = event.clientY || rect.top + rect.height / 2;
      document.documentElement.style.setProperty("--injorn-origin-x", `${originX}px`);
      document.documentElement.style.setProperty("--injorn-origin-y", `${originY}px`);
      document.documentElement.style.setProperty("--injorn-origin-w", `${Math.max(32, rect.width)}px`);
      document.documentElement.style.setProperty("--injorn-origin-h", `${Math.max(32, rect.height)}px`);

      setKind(kindForPath(url.pathname));
      setPhase("covering");

      if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
      navigationTimer.current = window.setTimeout(() => {
        router.push(href);
      }, 720);

      window.setTimeout(() => {
        if (pendingHref.current === href && window.location.pathname === pathname) {
          window.location.assign(href);
        }
      }, 2600);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, phase, router]);

  useEffect(() => {
    return () => {
      if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
      if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    };
  }, []);

  const meta = transitionMeta[kind];

  return (
    <div
      className={`injorn-transition injorn-transition--${kind}`}
      data-phase={phase}
      aria-hidden={phase === "idle"}
    >
      <div className="injorn-transition__origin-burst" aria-hidden="true"><span /><i /><i /><i /></div>
      <div className="injorn-transition__veil" />
      <div className="injorn-transition__panel injorn-transition__panel--left"><span /></div>
      <div className="injorn-transition__panel injorn-transition__panel--right"><span /></div>

      <div className="injorn-transition__geometry" aria-hidden="true">
        <i className="injorn-transition__ring injorn-transition__ring--outer" />
        <i className="injorn-transition__ring injorn-transition__ring--inner" />
        <i className="injorn-transition__axis injorn-transition__axis--v" />
        <i className="injorn-transition__axis injorn-transition__axis--h" />
      </div>

      <div className="injorn-transition__slashes" aria-hidden="true">
        <i /><i /><i />
      </div>

      <div className="injorn-transition__core">
        <span className="injorn-transition__eyebrow">{meta.eyebrow}</span>
        <div className="injorn-transition__sigil" aria-hidden="true">
          <span>{meta.sigil}</span>
          <i /><i /><i /><i /><i /><i /><i />
        </div>
        <strong>{meta.title}</strong>
        <small>INJORN · ARQUIVO VIVO</small>
      </div>

      <div className="injorn-transition__progress" aria-hidden="true"><span /></div>
      <span className="sr-only" role="status" aria-live="polite">
        {phase === "covering" ? `Abrindo ${meta.eyebrow}` : ""}
      </span>
    </div>
  );
}
