import type { MapPoint } from "@/lib/types/community";
import { AREA_MARKER_COLORS } from "@/lib/maps/markers";

export type MapBounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export function boundsFromPoints(
  points: MapPoint[],
  padding = { lat: 0.008, lng: 0.012 },
): MapBounds {
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  return {
    minLat: Math.min(...lats) - padding.lat,
    maxLat: Math.max(...lats) + padding.lat,
    minLng: Math.min(...lngs) - padding.lng,
    maxLng: Math.max(...lngs) + padding.lng,
  };
}

export function boundsAroundPoint(
  point: MapPoint,
  span = { lat: 0.012, lng: 0.018 },
): MapBounds {
  return {
    minLat: point.lat - span.lat,
    maxLat: point.lat + span.lat,
    minLng: point.lng - span.lng,
    maxLng: point.lng + span.lng,
  };
}

export function centerFromPoints(points: MapPoint[]): { lat: number; lng: number } {
  const lat = points.reduce((sum, point) => sum + point.lat, 0) / points.length;
  const lng = points.reduce((sum, point) => sum + point.lng, 0) / points.length;
  return { lat, lng };
}

export function buildOsmEmbedUrl(
  bounds: MapBounds,
  marker?: { lat: number; lng: number },
): string {
  const params = new URLSearchParams({
    bbox: `${bounds.minLng},${bounds.minLat},${bounds.maxLng},${bounds.maxLat}`,
    layer: "mapnik",
  });
  if (marker) {
    params.set("marker", `${marker.lat},${marker.lng}`);
  }
  return `https://www.openstreetmap.org/export/embed.html?${params.toString()}`;
}

export function zoomFromBounds(bounds: MapBounds): number {
  const span = Math.max(bounds.maxLat - bounds.minLat, bounds.maxLng - bounds.minLng);
  if (span > 0.15) return 10;
  if (span > 0.08) return 11;
  if (span > 0.04) return 12;
  if (span > 0.02) return 13;
  if (span > 0.01) return 14;
  return 15;
}

export function buildGoogleMapsEmbedUrl(
  center: { lat: number; lng: number },
  zoom: number,
  label?: string,
  options?: { showMarker?: boolean },
): string {
  if (options?.showMarker === false) {
    return `https://maps.google.com/maps?q=&ll=${center.lat},${center.lng}&z=${zoom}&output=embed`;
  }

  const query = label
    ? encodeURIComponent(`${center.lat},${center.lng} (${label})`)
    : `${center.lat},${center.lng}`;
  return `https://maps.google.com/maps?q=${query}&hl=en&z=${zoom}&output=embed`;
}

export function buildGoogleStaticMapUrl(
  points: MapPoint[],
  focusedId: string | null,
  apiKey: string,
): string {
  const showAll = focusedId === null;
  const focusedPoint = points.find((point) => point.id === focusedId) ?? points[0];
  const bounds = showAll ? boundsFromPoints(points) : boundsAroundPoint(focusedPoint);
  const center = showAll ? centerFromPoints(points) : { lat: focusedPoint.lat, lng: focusedPoint.lng };
  const zoom = zoomFromBounds(bounds);
  const markerParams = points
    .map((point) => {
      const hex = AREA_MARKER_COLORS[point.category].replace("#", "");
      return `markers=color:0x${hex}|${point.lat},${point.lng}`;
    })
    .join("&");

  const params = new URLSearchParams({
    center: `${center.lat},${center.lng}`,
    zoom: String(zoom),
    size: "640x640",
    scale: "2",
    maptype: "roadmap",
    key: apiKey,
  });

  return `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}&${markerParams}`;
}

export function googleMapsUrl(point: MapPoint): string {
  const query = encodeURIComponent(`${point.lat},${point.lng} (${point.label})`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function googleMapsDirectionsUrl(point: MapPoint): string {
  const destination = encodeURIComponent(`${point.lat},${point.lng}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}
