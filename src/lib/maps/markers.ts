import type { MapPoint } from "@/lib/types/community";

export const AREA_MARKER_COLORS: Record<MapPoint["category"], string> = {
  community: "#002934",
  sales: "#4895a2",
  school: "#1ba1b7",
  park: "#2d6a4f",
  shopping: "#5a5250",
  transit: "#db6a1d",
};
