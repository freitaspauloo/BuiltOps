"use client";

import { useEffect } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import type { MapPoint } from "@/lib/types/community";
import { AppIcon, getAreaCategoryPillIcon } from "@/lib/icons";
import { centerFromPoints, googleMapsUrl } from "@/lib/maps/embed";
import { AREA_MARKER_COLORS } from "@/lib/maps/markers";
import { cn } from "@/lib/utils/cn";

type GoogleAreaMapProps = {
  points: MapPoint[];
  focusedPoint: MapPoint;
  showAll: boolean;
  onSelectPoint: (id: string) => void;
};

function MapViewport({ points, focusedPoint, showAll }: Pick<GoogleAreaMapProps, "points" | "focusedPoint" | "showAll">) {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;

    const targetPoints = showAll ? points : [focusedPoint];
    const bounds = new google.maps.LatLngBounds();
    targetPoints.forEach((point) => bounds.extend({ lat: point.lat, lng: point.lng }));
    map.fitBounds(bounds, showAll ? 56 : 72);
  }, [focusedPoint, map, points, showAll]);

  return null;
}

function AreaMapMarker({
  point,
  isFocused,
  onSelect,
}: {
  point: MapPoint;
  isFocused: boolean;
  onSelect: () => void;
}) {
  const color = AREA_MARKER_COLORS[point.category];

  return (
    <AdvancedMarker
      position={{ lat: point.lat, lng: point.lng }}
      title={point.label}
      onClick={onSelect}
      zIndex={isFocused ? 30 : 10}
    >
      <button
        type="button"
        aria-label={point.label}
        aria-pressed={isFocused}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        className={cn(
          "flex h-10 w-10 items-center justify-center border-2 border-white shadow-[0_8px_24px_rgba(12,20,23,0.22)] transition-transform",
          isFocused ? "scale-110 ring-2 ring-white/90" : "hover:scale-105",
        )}
        style={{ backgroundColor: color }}
      >
        <AppIcon icon={getAreaCategoryPillIcon(point.category)} size={18} className="text-white" />
      </button>
    </AdvancedMarker>
  );
}

export function GoogleAreaMap({
  points,
  focusedPoint,
  showAll,
  onSelectPoint,
}: GoogleAreaMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "DEMO_MAP_ID";
  const defaultCenter = centerFromPoints(points);

  if (!apiKey) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-card px-6 text-center">
        <p className="text-sm font-medium text-foreground">Google Maps preview unavailable</p>
        <p className="max-w-xs text-sm text-muted">
          Add <code className="text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your{" "}
          <code className="text-xs">.env.local</code> file to enable the live map.
        </p>
        <a
          href={googleMapsUrl(focusedPoint)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open in Google Maps
        </a>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={13}
        mapId={mapId}
        gestureHandling="cooperative"
        disableDefaultUI
        zoomControl
        fullscreenControl
        className="h-full w-full"
        reuseMaps
      >
        <MapViewport points={points} focusedPoint={focusedPoint} showAll={showAll} />
        {points.map((point) => (
          <AreaMapMarker
            key={point.id}
            point={point}
            isFocused={!showAll && point.id === focusedPoint.id}
            onSelect={() => onSelectPoint(point.id)}
          />
        ))}
      </Map>
    </APIProvider>
  );
}
