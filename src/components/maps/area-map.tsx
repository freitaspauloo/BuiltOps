"use client";

import dynamic from "next/dynamic";
import type { MapPoint } from "@/lib/types/community";

type AreaMapProps = {
  points: MapPoint[];
  focusedPoint: MapPoint;
  showAll: boolean;
  onSelectPoint: (id: string) => void;
};

const InteractiveAreaMap = dynamic(
  () =>
    import("@/components/maps/interactive-area-map").then((module) => module.InteractiveAreaMap),
  {
    ssr: false,
    loading: () => <div className="area-map-leaflet h-full w-full animate-pulse bg-white/5" />,
  },
);

export function AreaMap(props: AreaMapProps) {
  return <InteractiveAreaMap {...props} />;
}
