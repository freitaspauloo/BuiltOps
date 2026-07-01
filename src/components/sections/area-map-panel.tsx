"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { MapPoint } from "@/lib/types/community";
import { Button } from "@/components/ui/button";
import { GoogleAreaMap } from "@/components/maps/google-area-map";
import { AppIcon, getAreaCategoryPillIcon } from "@/lib/icons";
import {
  boundsAroundPoint,
  boundsFromPoints,
  buildGoogleMapsEmbedUrl,
  centerFromPoints,
  googleMapsDirectionsUrl,
  googleMapsUrl,
  zoomFromBounds,
} from "@/lib/maps/embed";
import { AREA_MARKER_COLORS } from "@/lib/maps/markers";
import { cn } from "@/lib/utils/cn";

type AreaMapPanelProps = {
  points: MapPoint[];
  listVariant?: "v1" | "v2";
};

function GoogleMapsEmbed({
  embedUrl,
  label,
}: {
  embedUrl: string;
  label: string;
}) {
  return (
    <iframe
      key={embedUrl}
      title={`Google Maps — ${label}`}
      src={embedUrl}
      className="h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}

function MapLinkBar({ point }: { point: MapPoint }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap gap-2 bg-gradient-to-t from-foreground/80 via-foreground/45 to-transparent p-4 pt-12">
      <Button
        href={googleMapsUrl(point)}
        target="_blank"
        rel="noopener noreferrer"
        variant="hero"
        size="sm"
      >
        View on Google Maps
      </Button>
      <Button
        href={googleMapsDirectionsUrl(point)}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        size="sm"
        className="bg-white/90 hover:bg-white"
      >
        Get directions
      </Button>
    </div>
  );
}

export function AreaMapPanel({ points, listVariant = "v2" }: AreaMapPanelProps) {
  const communityPoint =
    points.find((p) => p.category === "community") ?? points[0];
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const hasGoogleMapsKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  const focusedPoint = focusedId
    ? (points.find((p) => p.id === focusedId) ?? communityPoint)
    : communityPoint;

  const showAll = focusedId === null;

  const embedUrl = useMemo(() => {
    if (showAll) {
      const bounds = boundsFromPoints(points);
      return buildGoogleMapsEmbedUrl(
        centerFromPoints(points),
        zoomFromBounds(bounds),
        "Benchmark Towns area",
      );
    }

    const bounds = boundsAroundPoint(focusedPoint);
    return buildGoogleMapsEmbedUrl(
      { lat: focusedPoint.lat, lng: focusedPoint.lng },
      zoomFromBounds(bounds),
      focusedPoint.label,
    );
  }, [focusedPoint, points, showAll]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
      <div className="relative aspect-[5/4] overflow-hidden bg-mist lg:aspect-square">
        {hasGoogleMapsKey ? (
          <GoogleAreaMap
            points={points}
            focusedPoint={focusedPoint}
            showAll={showAll}
            onSelectPoint={setFocusedId}
          />
        ) : (
          <GoogleMapsEmbed embedUrl={embedUrl} label={focusedPoint.label} />
        )}
        <MapLinkBar point={focusedPoint} />
      </div>

      <article className={cn("card-surface flex flex-col", listVariant === "v2" && "p-6 md:p-8")}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Nearby</h3>
          <button
            type="button"
            onClick={() => setFocusedId(null)}
            className={cn(
              "text-xs font-semibold uppercase tracking-wider transition-colors",
              showAll ? "text-primary" : "text-muted hover:text-foreground",
            )}
          >
            Show all
          </button>
        </div>

        <ul className="divide-y divide-border/70" role="list">
          {points.map((point) => {
            const isFocused = focusedId === point.id;

            return (
              <li key={point.id}>
                <div
                  className={cn(
                    "flex items-center gap-2 py-3.5 transition-colors md:py-4",
                    isFocused && "bg-primary-muted/30",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setFocusedId(point.id)}
                    aria-pressed={isFocused}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center md:h-10 md:w-10"
                      style={{ backgroundColor: AREA_MARKER_COLORS[point.category] }}
                    >
                      <AppIcon
                        icon={getAreaCategoryPillIcon(point.category)}
                        size={16}
                        className="text-white"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground md:text-base">
                        {point.label}
                      </span>
                      <span className="block text-xs capitalize text-muted">{point.category}</span>
                    </span>
                  </button>
                  <a
                    href={googleMapsUrl(point)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${point.label} in Google Maps`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center text-primary transition-colors hover:bg-primary-muted"
                  >
                    <ArrowUpRight size={18} strokeWidth={1.25} aria-hidden />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
}
