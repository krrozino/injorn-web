"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function pageKind(pathname: string) {
  if (pathname.startsWith("/mundo")) return "atlas";
  if (pathname.startsWith("/personagens")) return "portraits";
  if (pathname.startsWith("/faccoes")) return "banners";
  if (pathname.startsWith("/bestiario")) return "beast";
  if (pathname.startsWith("/cronicas")) return "memory";
  if (pathname.startsWith("/arquivo")) return "archive";
  if (pathname.startsWith("/ecos")) return "echoes";
  return "crown";
}

export function InjornAmbientEffects() {
  const pathname = usePathname();
  const frame = useRef<number | null>(null);

  useEffect(() => {
    document.body.dataset.injornPage = pageKind(pathname);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;

    const onPointerMove = (event: PointerEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        root.style.setProperty("--injorn-pointer-x", `${event.clientX}px`);
        root.style.setProperty("--injorn-pointer-y", `${event.clientY}px`);
      });
    };

    const onScroll = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        root.style.setProperty("--injorn-scroll", `${Math.min(1, window.scrollY / max)}`);
      });
    };

    onScroll();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div className="injorn-ambient" aria-hidden="true">
      <div className="injorn-pointer-aura" />
      <div className="injorn-scroll-thread"><span /></div>
      <div className="injorn-page-glyph">
        <i /><i /><i /><i /><i /><i /><i />
        <strong>INJORN</strong>
      </div>
    </div>
  );
}
