"use client";

import dynamic from "next/dynamic";

const AtlasMapInner = dynamic(() => import("./AtlasMapInner"), {
  ssr: false,
  loading: () => (
    <div
      className="atlas-loading-placeholder"
      role="status"
      aria-label="Carregando cartografia canônica do Reino de Injorn"
    >
      <div className="atlas-loading-spinner" aria-hidden="true" />
      <p style={{ fontFamily: "var(--font-display), serif", fontSize: "1.1rem" }}>
        Desenrolando cartografia de Injorn...
      </p>
      <span style={{ fontSize: "0.8125rem", color: "rgba(230, 204, 141, 0.6)" }}>
        Base canônica 1448 × 1086 · CRS.Simple
      </span>
    </div>
  ),
});

export function AtlasMapViewer() {
  return <AtlasMapInner />;
}
