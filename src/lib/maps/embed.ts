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

export function googleMapsUrl(point: MapPoint): string {
  const query = encodeURIComponent(`${point.lat},${point.lng} (${point.label})`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
