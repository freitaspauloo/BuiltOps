import type { Floorplan, GalleryImage } from "@/lib/types/community";
import levels from "./benchmark-floorplan-levels.json";

export const benchmarkFloorplanLevels = levels as Record<string, GalleryImage[]>;

export function withFloorplanLevels(floorplans: Floorplan[]): Floorplan[] {
  return floorplans.map((plan) => ({
    ...plan,
    levelGallery: plan.levelGallery ?? benchmarkFloorplanLevels[plan.id],
  }));
}
