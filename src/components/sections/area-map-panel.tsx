"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { MapPoint } from "@/lib/types/community";
import { Button } from "@/components/ui/button";
import { AreaMap } from "@/components/maps/area-map";
import { SectionIntro } from "@/components/ui/section-intro";
import { AppIcon, getAreaCategoryPillIcon } from "@/lib/icons";
import {
  googleMapsDirectionsUrl,
  googleMapsUrl,
} from "@/lib/maps/embed";
import { AREA_MARKER_COLORS } from "@/lib/maps/markers";
import { cn } from "@/lib/utils/cn";

type AreaMapIntro = {
  label?: string;
  title: string;
  description?: string;
};

type AreaMapPanelProps = {
  points: MapPoint[];
  listVariant?: "v1" | "v2";
  variant?: "light" | "dark";
  /** v3 editorial: intro + nearby left, large map right */
  layout?: "default" | "editorial";
  intro?: AreaMapIntro;
};

function MapLinkBar({
  point,
  variant = "light",
}: {
  point: MapPoint;
  variant?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-10 flex flex-wrap gap-2 p-4 pt-12",
        variant === "dark"
          ? "v3-map-link-bar"
          : "bg-gradient-to-t from-foreground/80 via-foreground/45 to-transparent",
      )}
    >
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

function NearbyRow({
  point,
  isFocused,
  variant,
  onFocus,
}: {
  point: MapPoint;
  isFocused: boolean;
  variant: "light" | "dark";
  onFocus: () => void;
}) {
  return (
    <li>
      <div
        data-focused={isFocused ? "true" : "false"}
        className={cn(
          "flex items-center gap-2 py-3.5 md:py-4",
          variant === "dark" ? "v3-map-row" : "transition-colors",
          variant !== "dark" && isFocused && "bg-primary-muted/30",
        )}
      >
        <button
          type="button"
          onClick={onFocus}
          aria-pressed={isFocused}
          className="group flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center md:h-12 md:w-12">
            <span
              className="v3-map-list-icon flex h-9 w-9 items-center justify-center md:h-10 md:w-10"
              style={{ backgroundColor: AREA_MARKER_COLORS[point.category] }}
            >
              <AppIcon icon={getAreaCategoryPillIcon(point.category)} size={16} className="text-white" />
            </span>
          </span>
          <span className="min-w-0">
            <span
              className={cn(
                "v3-map-row-title block truncate text-sm font-medium md:text-base",
                variant !== "dark" && "text-foreground",
              )}
            >
              {point.label}
            </span>
            <span
              className={cn(
                "v3-map-row-meta block text-xs capitalize",
                variant !== "dark" && "text-muted",
              )}
            >
              {point.category}
            </span>
          </span>
        </button>
        <a
          href={googleMapsUrl(point)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${point.label} in Google Maps`}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center transition-colors",
            variant === "dark" ? "v3-map-external" : "text-primary hover:bg-primary-muted",
          )}
        >
          <ArrowUpRight size={18} strokeWidth={1.25} aria-hidden />
        </a>
      </div>
    </li>
  );
}

function ScrollableLocationList({
  points,
  focusedId,
  variant,
  onFocus,
}: {
  points: MapPoint[];
  focusedId: string | null;
  variant: "light" | "dark";
  onFocus: (id: string) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [thumb, setThumb] = useState({ top: 0, height: 0, show: false });

  useEffect(() => {
    const el = listRef.current;
    if (!el || variant !== "dark") return;

    const updateThumb = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight <= clientHeight + 1) {
        setThumb({ top: 0, height: 0, show: false });
        return;
      }

      const ratio = clientHeight / scrollHeight;
      const height = Math.max(clientHeight * ratio, 40);
      const maxTop = clientHeight - height;
      const top = maxTop <= 0 ? 0 : (scrollTop / (scrollHeight - clientHeight)) * maxTop;
      setThumb({ top, height, show: true });
    };

    updateThumb();
    el.addEventListener("scroll", updateThumb, { passive: true });
    const observer = new ResizeObserver(updateThumb);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateThumb);
      observer.disconnect();
    };
  }, [points.length, variant]);

  return (
    <div
      className={cn(
        "relative min-h-0",
        variant === "dark" ? "v3-map-list-scroll-wrap flex-1" : "max-h-80",
      )}
    >
      <ul
        ref={variant === "dark" ? listRef : undefined}
        className={cn(
          "divide-y",
          variant === "dark" ? "v3-map-list v3-map-list-scroll" : "divide-border/70 overflow-y-auto",
        )}
        role="list"
      >
        {points.map((point) => (
          <NearbyRow
            key={point.id}
            point={point}
            isFocused={focusedId === point.id}
            variant={variant}
            onFocus={() => onFocus(point.id)}
          />
        ))}
      </ul>

      {variant === "dark" && thumb.show && (
        <span
          className="v3-map-list-scroll-thumb"
          style={{ height: thumb.height, transform: `translateY(${thumb.top}px)` }}
          aria-hidden
        />
      )}
    </div>
  );
}

export function AreaMapPanel({
  points,
  listVariant = "v2",
  variant = "light",
  layout = "default",
  intro,
}: AreaMapPanelProps) {
  const communityPoint =
    points.find((p) => p.category === "community") ?? points[0];
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const focusedPoint = focusedId
    ? (points.find((p) => p.id === focusedId) ?? communityPoint)
    : communityPoint;

  const mapShowAll = focusedId === null;

  const toggleFocus = (pointId: string) => {
    setFocusedId((current) => (current === pointId ? null : pointId));
  };

  const mapBlock = (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)]",
        layout === "editorial"
          ? "aspect-[4/3] min-h-[280px] lg:aspect-auto lg:min-h-[min(72vh,760px)] lg:h-full"
          : "aspect-[5/4] lg:aspect-auto lg:min-h-full",
        variant === "dark" ? "v3-map-frame" : "bg-mist",
      )}
    >
      <AreaMap
        points={points}
        focusedPoint={focusedPoint}
        showAll={mapShowAll}
        onSelectPoint={toggleFocus}
      />
      <MapLinkBar point={focusedPoint} variant={variant} />
    </div>
  );

  const nearbyList = (
    <article
      className={cn(
        "flex min-h-0 flex-col",
        layout === "editorial" && "flex-1",
        variant === "dark"
          ? "v3-map-panel"
          : cn("card-surface", listVariant === "v2" && "p-6 md:p-8"),
      )}
    >
      {variant !== "dark" && (
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Nearby</h3>
        </div>
      )}

      <ScrollableLocationList
        points={points}
        focusedId={focusedId}
        variant={variant}
        onFocus={toggleFocus}
      />
    </article>
  );

  if (layout === "editorial") {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch lg:gap-10 xl:gap-14">
        <div className="flex min-h-0 flex-col gap-8 lg:max-h-[min(72vh,760px)]">
          {intro && (
            <SectionIntro
              label={intro.label}
              title={intro.title}
              description={intro.description}
              showRule={false}
            />
          )}
          {nearbyList}
        </div>
        {mapBlock}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-8">
      {mapBlock}
      {nearbyList}
    </div>
  );
}
