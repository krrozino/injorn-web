/**
 * Isola um painel modal dos outros controles da página.
 *
 * Percorre a ancestralidade do diálogo sem inativar seus controles internos,
 * mantendo o estado inert anterior de cada nó para restaurar no fechamento.
 * O CSS do modo foco trata apenas a aparência dos widgets externos.
 */
export function isolateOutsideAtlasDialog(dialog: HTMLElement, root: HTMLElement): () => void {
  const previous = new Map<HTMLElement, boolean>();
  let current: HTMLElement | null = dialog;

  while (current && current !== root) {
    const parent: HTMLElement | null = current.parentElement;
    if (!parent) break;

    for (const sibling of Array.from(parent.children)) {
      if (sibling === current || !(sibling instanceof HTMLElement)) continue;
      if (!previous.has(sibling)) previous.set(sibling, sibling.inert);
      sibling.inert = true;
    }
    current = parent;
  }

  return () => {
    for (const [element, inert] of previous) element.inert = inert;
  };
}
