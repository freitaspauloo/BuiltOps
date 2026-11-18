import type { MapPoint } from "@/lib/types/community";
import { centerFromPoints } from "@/lib/maps/embed";

export type MapPointDisplay = MapPoint & {
  displayLat: number;
  displayLng: number;
};

const CLUSTER_THRESHOLD = 0.00055;

function distance(a: MapPoint, b: MapPoint) {
  const dLat = a.lat - b.lat;
  const dLng = a.lng - b.lng;
  return Math.hypot(dLat, dLng);
}

function buildClusters(points: MapPoint[]): MapPoint[][] {
  const remaining = [...points];
  const clusters: MapPoint[][] = [];

  while (remaining.length > 0) {
    const seed = remaining.shift()!;
    const cluster = [seed];

    for (let i = remaining.length - 1; i >= 0; i -= 1) {
      const candidate = remaining[i];
      const inCluster = cluster.some((member) => distance(member, candidate) <= CLUSTER_THRESHOLD);
      if (inCluster) {
        cluster.push(candidate);
        remaining.splice(i, 1);
      }
    }

    clusters.push(cluster);
  }

  return clusters;
}

function spreadCluster(cluster: MapPoint[], zoom: number): MapPointDisplay[] {
  if (cluster.length === 1) {
    const point = cluster[0];
    return [{ ...point, displayLat: point.lat, displayLng: point.lng }];
  }

  const centroid = centerFromPoints(cluster);
  const radius = 0.00085 * Math.max(1.15, 15 - zoom);

  return cluster.map((point, index) => {
    const angle = (2 * Math.PI * index) / cluster.length - Math.PI / 4;
    return {
      ...point,
      displayLat: centroid.lat + radius * Math.sin(angle),
      displayLng: centroid.lng + radius * Math.cos(angle),
    };
  });
}

/** Fan out markers that share the same block when the map is zoomed out. */
export function layoutMarkerPositions(points: MapPoint[], zoom: number): MapPointDisplay[] {
  const spreadZoomThreshold = 15;

  if (zoom >= spreadZoomThreshold) {
    return points.map((point) => ({ ...point, displayLat: point.lat, displayLng: point.lng }));
  }

  return buildClusters(points).flatMap((cluster) => spreadCluster(cluster, zoom));
}
