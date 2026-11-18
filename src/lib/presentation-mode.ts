/** Portal-embedded vs standalone landing page (Chris Jul 8 alignment). */
export type PresentationMode = "portal" | "landing";

export function parsePresentationMode(
  value: string | null | undefined,
): PresentationMode {
  if (value === "portal" || value === "embed") return "portal";
  return "landing";
}

/** Inventory widgets hidden in portal — already shown in the left grid. */
export const PORTAL_HIDDEN_SECTIONS = new Set([
  "floorplans",
  "quickMoveIn",
  "promotions",
]);

export function isSectionHiddenForPresentation(
  sectionId: string,
  mode: PresentationMode,
): boolean {
  return mode === "portal" && PORTAL_HIDDEN_SECTIONS.has(sectionId);
}
