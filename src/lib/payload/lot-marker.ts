/** Map-overlay lot marker size presets (viewBox 0–100). */
export const LOT_MARKER_PRESETS = {
  sm: { width: 6, height: 8 },
  md: { width: 9, height: 11 },
  lg: { width: 12, height: 14 },
} as const;

export type LotMarkerSize = keyof typeof LOT_MARKER_PRESETS;

export const LOT_MARKER_SIZE_OPTIONS = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
] as const;

/** Resolve overlay width/height from a simple size preset (or legacy numbers). */
export function resolveLotDimensions(lot: {
  markerSize?: string | null;
  width?: number | null;
  height?: number | null;
}): { width: number; height: number } {
  const size = lot.markerSize as LotMarkerSize | undefined;
  if (size && LOT_MARKER_PRESETS[size]) {
    return LOT_MARKER_PRESETS[size];
  }
  if (typeof lot.width === "number" || typeof lot.height === "number") {
    return {
      width: typeof lot.width === "number" ? lot.width : LOT_MARKER_PRESETS.md.width,
      height: typeof lot.height === "number" ? lot.height : LOT_MARKER_PRESETS.md.height,
    };
  }
  return LOT_MARKER_PRESETS.md;
}

/** Pick nearest preset when exporting seed → CMS. */
export function nearestLotMarkerSize(width?: number, height?: number): LotMarkerSize {
  if (width == null && height == null) return "md";
  const w = width ?? LOT_MARKER_PRESETS.md.width;
  const h = height ?? LOT_MARKER_PRESETS.md.height;
  let best: LotMarkerSize = "md";
  let bestScore = Infinity;
  for (const key of Object.keys(LOT_MARKER_PRESETS) as LotMarkerSize[]) {
    const preset = LOT_MARKER_PRESETS[key];
    const score = Math.abs(preset.width - w) + Math.abs(preset.height - h);
    if (score < bestScore) {
      best = key;
      bestScore = score;
    }
  }
  return best;
}
