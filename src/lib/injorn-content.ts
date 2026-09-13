export type PublicEntityKind =
  | "character"
  | "artifact"
  | "location"
  | "faction"
  | "heraldry"
  | "document"
  | "chronicle"
  | "music";

export type InteractionLanguage =
  | "steel-glint"
  | "heraldic-trace"
  | "relic-pulse"
  | "parchment-lift"
  | "location-depth"
  | "character-focus"
  | "neutral-reveal";

export interface PublicEntitySummary {
  slug: string;
  kind: PublicEntityKind;
  title: string;
  eyebrow?: string;
  description: string;
  href: string;
}

export interface InteractiveHotspot {
  id: string;
  label: string;
  caption?: string;
  href: string;
  kind: PublicEntityKind;
  interaction: InteractionLanguage;
  /**
   * CSS clip-path value expressed in percentages, e.g.
   * polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%).
   * The geometry belongs to the artwork configuration, not the component.
   */
  clipPath: string;
  /** Bounding box in percentages relative to the scene. */
  bounds: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  tooltip?: {
    left: number;
    top: number;
  };
}
