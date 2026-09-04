import type { MapPoint } from "@/lib/types/community";

/** Rendered as DOM marker backgrounds, so these stay on the palette tokens. */
export const AREA_MARKER_COLORS: Record<MapPoint["category"], string> = {
  community: "var(--color-primary)",
  sales: "var(--color-teal-mid)",
  school: "var(--color-nav)",
  park: "var(--color-forest)",
  shopping: "var(--color-body)",
  transit: "var(--color-accent)",
};
