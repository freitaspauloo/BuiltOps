import type { MapPoint } from "@/lib/types/community";

export const AREA_MARKER_COLORS: Record<MapPoint["category"], string> = {
  community: "#8fa8c8",
  sales: "#db6a1d",
  school: "#6b5cae",
  park: "#2d6a4f",
  shopping: "#b8956b",
  transit: "#5b7a9e",
  winery: "#9b4d6b",
  dining: "#c97b4a",
};
