"use client";

import { useMemo, useState } from "react";
import type { KnowledgeStatus as KnowledgeStatusType } from "@/content/playerKnowledge";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";

interface MemoryChapter {
  act: string;
  title: string;
  text: string;
  status: KnowledgeStatusType;
}

interface MemorySpindleProps {
  chapters: MemoryChapter[];
}

export function MemorySpindle({ chapters }: MemorySpindleProps) {
  const [activeIndex, setActiveIndex] = useState(Math.max(0, chapters.length - 1));
  const active = chapters[activeIndex];
  const isVael = useMemo(
    () => `${active?.title ?? ""} ${active?.text ?? ""}`.toLowerCase().includes("vael karun"),
    [active],
  );

  if (!active) return null;

  return (
    <div className={`memory-spindle ${isVael ? "memory-spindle--vael" : ""}`}>
      <div className="memory-spindle__instrument" aria-hidden="true">
        <span className="memory-spindle__ring memory-spindle__ring--outer" />
        <span className="memory-spindle__ring memory-spindle__ring--middle" />
        <span className="memory-spindle__ring memory-spindle__ring--inner" />
        <span className="memory-spindle__axis memory-spindle__axis--x" />
        <span className="memory-spindle__axis memory-spindle__axis--y" />
        <div className="memory-spindle__flame">
          <i />
          <i />
          <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
        </div>
        <div className="memory-spindle__echo"><i /><i /><i /></div>
      </div>

      <div className="memory-spindle__archive">
        <p className="kicker">Fuso de memória</p>
        <div className="memory-spindle__rail" role="list" aria-label="Memórias registradas da campanha">
          {chapters.map((chapter, index) => (
            <button
              type="button"
              role="listitem"
              key={`${chapter.act}-${chapter.title}`}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i aria-hidden="true" />
              <strong>{chapter.title}</strong>
              <small>{chapter.act}</small>
            </button>
          ))}
        </div>
      </div>

      <article className="memory-spindle__record" key={`${active.act}-${active.title}`}>
        <div className="memory-spindle__glass" aria-hidden="true"><i /><i /><i /></div>
        <p className="kicker">Memória reconstituída</p>
        <span className="memory-spindle__act">{active.act}</span>
        <h3>{active.title}</h3>
        <KnowledgeStatus status={active.status} />
        <p>{active.text}</p>
        <div className="memory-spindle__footer">
          <span>REGISTRO {String(activeIndex + 1).padStart(2, "0")}</span>
          <span>{isVael ? "sinal instável" : "memória preservada"}</span>
        </div>
      </article>
    </div>
  );
}
