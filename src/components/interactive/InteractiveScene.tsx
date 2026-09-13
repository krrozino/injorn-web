"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import type { InteractiveHotspot } from "@/lib/injorn-content";

interface InteractiveSceneProps {
  children: ReactNode;
  hotspots: InteractiveHotspot[];
  className?: string;
  ariaLabel: string;
}

export function InteractiveScene({
  children,
  hotspots,
  className = "",
  ariaLabel,
}: InteractiveSceneProps) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeHotspot = useMemo(
    () => hotspots.find((hotspot) => hotspot.id === activeId) ?? null,
    [activeId, hotspots],
  );

  function activate(hotspot: InteractiveHotspot) {
    setActiveId(hotspot.id);
  }

  function handleActivation(hotspot: InteractiveHotspot) {
    const touchLike = window.matchMedia("(hover: none)").matches;

    if (touchLike && activeId !== hotspot.id) {
      activate(hotspot);
      return;
    }

    router.push(hotspot.href);
  }

  return (
    <section
      className={`interactive-scene ${className}`.trim()}
      data-active-hotspot={activeId ?? undefined}
      aria-label={ariaLabel}
      onPointerLeave={() => setActiveId(null)}
    >
      <div className="interactive-scene__art">{children}</div>

      <div className="interactive-scene__layer" aria-label="Elementos investigáveis">
        {hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            className="interactive-hotspot"
            data-kind={hotspot.kind}
            data-interaction={hotspot.interaction}
            data-active={activeId === hotspot.id ? "true" : "false"}
            aria-label={`Investigar ${hotspot.label}`}
            style={{
              left: `${hotspot.bounds.left}%`,
              top: `${hotspot.bounds.top}%`,
              width: `${hotspot.bounds.width}%`,
              height: `${hotspot.bounds.height}%`,
              clipPath: hotspot.clipPath,
            }}
            onPointerEnter={() => activate(hotspot)}
            onFocus={() => activate(hotspot)}
            onBlur={() => setActiveId(null)}
            onClick={() => handleActivation(hotspot)}
          />
        ))}
      </div>

      {activeHotspot ? (
        <div
          className="interactive-tooltip"
          role="status"
          style={
            activeHotspot.tooltip
              ? {
                  left: `${activeHotspot.tooltip.left}%`,
                  top: `${activeHotspot.tooltip.top}%`,
                }
              : undefined
          }
        >
          <span>{activeHotspot.kind}</span>
          <strong>{activeHotspot.label}</strong>
          {activeHotspot.caption ? <small>{activeHotspot.caption}</small> : null}
          <em>Explorar ↗</em>
        </div>
      ) : null}
    </section>
  );
}
