"use client";

import { useEffect } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import type { MapPoint } from "@/lib/types/community";
import { AreaMapMarkerPin } from "@/components/maps/area-map-marker-pin";
import { centerFromPoints, googleMapsUrl } from "@/lib/maps/embed";

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

    const bounds = new google.maps.LatLngBounds();
    points.forEach((point) => bounds.extend({ lat: point.lat, lng: point.lng }));
    map.fitBounds(bounds, 56);

    if (!showAll) {
      map.panTo({ lat: focusedPoint.lat, lng: focusedPoint.lng });
      map.setZoom(14);
    }
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
  return (
    <AdvancedMarker
      position={{ lat: point.lat, lng: point.lng }}
      title={point.label}
      onClick={onSelect}
      zIndex={isFocused ? 30 : 10}
    >
      <AreaMapMarkerPin
        category={point.category}
        label={point.label}
        isFocused={isFocused}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      />
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
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-primary/10 px-6 text-center">
        <p className="text-sm font-medium text-foreground">Google Maps requires an API key</p>
        <p className="max-w-sm text-sm text-muted">
          Add <code className="text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to{" "}
          <code className="text-xs">.env.local</code> (enable Maps JavaScript API + Map Tiles), then restart the dev server.
        </p>
        <a
          href={googleMapsUrl(focusedPoint)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open area in Google Maps
        </a>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey} libraries={["marker"]}>
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
