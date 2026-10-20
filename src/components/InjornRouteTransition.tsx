"use client";

import { usePathname } from "next/navigation";

/**
 * Feedback de navegação discreto e não bloqueante.
 *
 * O Next.js gerencia links e histórico normalmente. Ao mudar a rota,
 * a marca visual é remontada, produzindo um acento breve sem atrasar
 * cliques, bloquear rolagem ou interceptar eventos globais.
 */
export function InjornRouteTransition() {
  const pathname = usePathname();

  return (
    <div key={pathname} className="injorn-route-hint" aria-hidden="true">
      <span className="injorn-route-hint__line" />
    </div>
  );
}
