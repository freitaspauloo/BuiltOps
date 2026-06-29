"use client";

import type { Community } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { Pill } from "@/components/ui/pill";
import { getAreaCategoryPillIcon } from "@/lib/icons";

function projectPoint(
  lat: number,
  lng: number,
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
) {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 80 + 10;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 80 + 10;
  return { x, y };
}

export function AreaMapSection({
  data,
  siteVersion = "v2",
}: {
  data: NonNullable<Community["areaMap"]>;
  siteVersion?: MicrositeVersionId;
}) {
  const lats = data.points.map((p) => p.lat);
  const lngs = data.points.map((p) => p.lng);
  const bounds = {
    minLat: Math.min(...lats) - 0.008,
    maxLat: Math.max(...lats) + 0.008,
    minLng: Math.min(...lngs) - 0.012,
    maxLng: Math.max(...lngs) + 0.012,
  };

  const communityPoint = data.points.find((p) => p.category === "community") ?? data.points[0];

  return (
    <SectionShell id="areaMap" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Location"
        title={data.title}
        description="Schools, parks, shopping, and wine country amenities nearby."
        siteVersion={siteVersion}
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden border border-border bg-primary-muted/30">
          <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Area map">
            <defs>
              <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(14,91,114,0.08)" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#map-grid)" />
            <rect x="8" y="12" width="84" height="76" fill="rgba(255,255,255,0.55)" stroke="rgba(14,91,114,0.15)" strokeWidth="0.5" />
            {data.points.map((point) => {
              const { x, y } = projectPoint(point.lat, point.lng, bounds);
              const isCommunity = point.id === communityPoint.id;
              return (
                <g key={point.id}>
                  {isCommunity && (
                    <circle cx={x} cy={y} r="4.5" fill="rgba(14,91,114,0.15)" />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isCommunity ? 2.2 : 1.6}
                    fill={isCommunity ? "#0e5b72" : "#4895a2"}
                    stroke="#ffffff"
                    strokeWidth="0.6"
                  />
                  <text
                    x={x + 3}
                    y={y + 1}
                    fontSize="3"
                    fill="#0c1417"
                    className="font-body"
                  >
                    {point.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <ul className="space-y-3">
          {data.points.map((point) => (
            <li key={point.id} className="flex items-center justify-between gap-4 border-b border-border py-3">
              <span className="text-sm font-medium">{point.label}</span>
              <Pill icon={getAreaCategoryPillIcon(point.category)} className="capitalize">
                {point.category}
              </Pill>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
