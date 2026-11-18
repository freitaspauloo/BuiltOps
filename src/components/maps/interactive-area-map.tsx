"use client";

import { useEffect, useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from "react-leaflet";
import type { MapPoint } from "@/lib/types/community";
import { AreaMapMarkerPin } from "@/components/maps/area-map-marker-pin";
import { boundsFromPoints, centerFromPoints } from "@/lib/maps/embed";
import { layoutMarkerPositions, type MapPointDisplay } from "@/lib/maps/marker-layout";
import "leaflet/dist/leaflet.css";
const CARTO_VOYAGER =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

type InteractiveAreaMapProps = {
  points: MapPoint[];
  focusedPoint: MapPoint;
  showAll: boolean;
  onSelectPoint: (id: string) => void;
};

function MapViewport({
  points,
  focusedPoint,
  showAll,
}: Pick<InteractiveAreaMapProps, "points" | "focusedPoint" | "showAll">) {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;

    if (showAll) {
      const bounds = boundsFromPoints(points);
      map.fitBounds(
        [
          [bounds.minLat, bounds.minLng],
          [bounds.maxLat, bounds.maxLng],
        ],
        { padding: [56, 56], maxZoom: 13 },
      );
      return;
    }

    map.flyTo([focusedPoint.lat, focusedPoint.lng], 14, { duration: 0.55 });
  }, [focusedPoint, map, points, showAll]);

  return null;
}

function useMapZoom() {
  const map = useMap();
  const [zoom, setZoom] = useState(map?.getZoom() ?? 12);

  useEffect(() => {
    if (!map) return;

    const update = () => setZoom(map.getZoom());
    update();
    map.on("zoomend", update);
    map.on("moveend", update);

    return () => {
      map.off("zoomend", update);
      map.off("moveend", update);
    };
  }, [map]);

  return zoom;
}

function MarkerLayer({
  points,
  focusedPoint,
  showAll,
  onSelectPoint,
}: InteractiveAreaMapProps) {
  const zoom = useMapZoom();
  const displayPoints = useMemo(() => layoutMarkerPositions(points, zoom), [points, zoom]);

  return (
    <>
      {displayPoints.map((point) => (
        <PointMarker
          key={point.id}
          point={point}
          isFocused={!showAll && point.id === focusedPoint.id}
          onSelect={() => onSelectPoint(point.id)}
          compact={zoom < 15}
        />
      ))}
    </>
  );
}

function PointMarker({
  point,
  isFocused,
  onSelect,
  compact = false,
}: {
  point: MapPointDisplay;
  isFocused: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const size = compact ? (isFocused ? 38 : 34) : isFocused ? 44 : 40;

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "area-map-leaflet-marker",
        html: renderToStaticMarkup(
          <AreaMapMarkerPin
            category={point.category}
            label={point.label}
            isFocused={isFocused}
            className={compact ? (isFocused ? "!h-[34px] !w-[34px]" : "!h-[30px] !w-[30px]") : undefined}
          />,
        ),
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      }),
    [compact, isFocused, point.category, point.label, size],
  );

  return (
    <Marker
      position={[point.displayLat, point.displayLng]}
      icon={icon}
      zIndexOffset={isFocused ? 1000 : 100}
      eventHandlers={{ click: onSelect }}
    />
  );
}

export function InteractiveAreaMap({
  points,
  focusedPoint,
  showAll,
  onSelectPoint,
}: InteractiveAreaMapProps) {
  const center = centerFromPoints(points);
  const initialBounds = boundsFromPoints(points);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={12}
      className="area-map-leaflet h-full w-full"
      zoomControl={false}
      attributionControl={false}
      maxBounds={[
        [initialBounds.minLat - 0.04, initialBounds.minLng - 0.06],
        [initialBounds.maxLat + 0.04, initialBounds.maxLng + 0.06],
      ]}
    >
      <TileLayer url={CARTO_VOYAGER} />
      <ZoomControl position="topleft" />
      <MapViewport points={points} focusedPoint={focusedPoint} showAll={showAll} />
      <MarkerLayer
        points={points}
        focusedPoint={focusedPoint}
        showAll={showAll}
        onSelectPoint={onSelectPoint}
      />
      <div className="area-map-attribution" aria-label="Map attribution">
        ©{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenStreetMap
        </a>{" "}
        contributors ©{" "}
        <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">
          CARTO
        </a>
      </div>
    </MapContainer>
  );
}
