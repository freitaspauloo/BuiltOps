"use client";

import { useMemo, useState } from "react";
import type { MapPoint } from "@/lib/types/community";
import { Pill } from "@/components/ui/pill";
import { getAreaCategoryPillIcon } from "@/lib/icons";
import {
  boundsAroundPoint,
  boundsFromPoints,
  buildOsmEmbedUrl,
  googleMapsUrl,
} from "@/lib/maps/embed";

type AreaMapPanelProps = {
  points: MapPoint[];
  listVariant?: "v1" | "v2";
};

export function AreaMapPanel({ points, listVariant = "v2" }: AreaMapPanelProps) {
  const communityPoint =
    points.find((p) => p.category === "community") ?? points[0];
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const focusedPoint = focusedId
    ? (points.find((p) => p.id === focusedId) ?? communityPoint)
    : communityPoint;

  const embedUrl = useMemo(() => {
    const bounds =
      focusedId === null
        ? boundsFromPoints(points)
        : boundsAroundPoint(focusedPoint);
    return buildOsmEmbedUrl(bounds, {
      lat: focusedPoint.lat,
      lng: focusedPoint.lng,
    });
  }, [focusedId, focusedPoint, points]);

  const listItemClass =
    listVariant === "v1"
      ? "flex w-full items-center justify-between gap-4 py-2 text-left transition-colors"
      : "flex w-full items-center justify-between gap-4 border-b border-border py-3 text-left transition-colors";

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden border border-border bg-card">
        <iframe
          key={embedUrl}
          title={`Map showing ${focusedPoint.label}`}
          src={embedUrl}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a
          href={googleMapsUrl(focusedPoint)}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm ring-1 ring-border transition-colors hover:bg-card"
        >
          Open in Google Maps
        </a>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setFocusedId(null)}
          className={`mb-4 text-xs font-medium uppercase tracking-wider transition-colors ${
            focusedId === null ? "text-primary" : "text-muted hover:text-foreground"
          }`}
        >
          Show all locations
        </button>
        <ul className="space-y-1" role="list">
          {points.map((point) => {
            const isFocused = focusedId === point.id;
            const isCommunity = point.id === communityPoint.id;
            return (
              <li key={point.id}>
                <button
                  type="button"
                  onClick={() => setFocusedId(point.id)}
                  aria-pressed={isFocused}
                  className={`${listItemClass} ${
                    isFocused ? "bg-primary-muted/25" : "hover:bg-primary-muted/10"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {isCommunity && (
                      <span
                        className="h-2 w-2 shrink-0 bg-primary"
                        aria-hidden
                      />
                    )}
                    <span className="truncate text-sm font-medium">{point.label}</span>
                  </span>
                  <Pill icon={getAreaCategoryPillIcon(point.category)} className="capitalize">
                    {point.category}
                  </Pill>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
