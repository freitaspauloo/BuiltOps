import type { MapPoint } from "@/lib/types/community";

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
): string {
  const query = label
    ? encodeURIComponent(`${center.lat},${center.lng} (${label})`)
    : `${center.lat},${center.lng}`;
  return `https://maps.google.com/maps?q=${query}&hl=en&z=${zoom}&output=embed`;
}

export function googleMapsUrl(point: MapPoint): string {
  const query = encodeURIComponent(`${point.lat},${point.lng} (${point.label})`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function googleMapsDirectionsUrl(point: MapPoint): string {
  const destination = encodeURIComponent(`${point.lat},${point.lng}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}
