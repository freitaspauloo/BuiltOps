import type { SitePlanLot, SitePlanPhase } from "@/lib/types/community";

/** Lot inventory mirrored from Losani Benchmark pricelist (Mar 2026). */
function lot(
  lotNumber: string,
  floorplan: string,
  price: string,
  sqft: string,
  status: SitePlanLot["status"] = "available",
): SitePlanLot {
  return {
    id: `lot-${lotNumber}`,
    lotNumber,
    status,
    floorplan,
    price,
    sqft,
  };
}

/**
 * Approximate overlay placement (viewBox 0 0 100 100) so the interactive marker
 * layer renders — an even grid, not an exact trace of the plan artwork.
 *
 * P2 (coordination): exact lot pin coordinates against the real plan artwork are
 * owned by Scott/Chris' interactive-map effort. Do NOT build a duplicate map
 * here — once their coordinate export lands, replace these approximate x/y values
 * with the authored ones and keep the same SitePlanLot shape.
 */
function withApproxCoords(
  lots: SitePlanLot[],
  { perRow, startX, startY }: { perRow: number; startX: number; startY: number },
): SitePlanLot[] {
  const width = 9;
  const height = 11;
  const gapX = 3;
  const gapY = 5;

  return lots.map((entry, index) => ({
    ...entry,
    x: startX + (index % perRow) * (width + gapX),
    y: startY + Math.floor(index / perRow) * (height + gapY),
    width,
    height,
  }));
}

const phase1Lots: SitePlanLot[] = withApproxCoords(
  [
    lot("79", "18' Esprit Enhanced End", "$650,900", "1,535"),
    lot("103", "Esprit Grande Enhanced End", "$588,900", "1,583", "sold"),
    lot("109", "16' Esprit Grande Enhanced End", "$614,900", "1,694"),
    lot("111", "Esprit Interior F2", "$512,900", "1,205", "sold"),
    lot("128", "Whitehaven Interior F3", "$610,900", "2,016"),
  ],
  { perRow: 5, startX: 20, startY: 66 },
);

const phase2Lots: SitePlanLot[] = withApproxCoords(
  [
    lot("19", "Esprit Interior F2", "$499,900", "1,205"),
    lot("20", "Esprit Interior F2", "$499,900", "1,205", "sold"),
    lot("21", "Esprit Interior F2", "$499,900", "1,205", "sold"),
    lot("23", "Esprit End", "$546,900", "1,281"),
    lot("36", "16' Esprit Enhanced End", "$609,900", "1,344"),
    lot("37", "16' Esprit Enhanced End", "$538,900", "1,344"),
    lot("39", "Esprit Interior F2", "$499,900", "1,205"),
    lot("40", "Esprit Interior F2", "$499,900", "1,205", "sold"),
    lot("41", "Esprit Interior F2", "$499,900", "1,205"),
    lot("42", "Esprit Interior F1", "$507,900", "1,237"),
    lot("43", "16' Esprit Enhanced End", "$599,900", "1,344"),
    lot("55", "Esprit Grande Interior F1", "$546,900", "1,519", "future"),
    lot("56", "Esprit Grande Interior F1", "$546,900", "1,519", "future"),
    lot("58", "Esprit Grande Enhanced End", "$590,900", "1,583", "future"),
    lot("133", "Whitehaven Interior F2", "$628,900", "2,016", "future"),
    lot("134", "Whitehaven Interior F3", "$628,900", "2,016", "future"),
    lot("135", "Whitehaven Interior F3", "$628,900", "2,016", "future"),
    lot("136", "Whitehaven Interior F3", "$628,900", "2,016", "future"),
    lot("137", "Whitehaven Interior F3", "$628,900", "2,016", "future"),
    lot("138", "Whitehaven Interior F2", "$628,900", "2,016", "future"),
  ],
  { perRow: 7, startX: 8, startY: 18 },
);

export const benchmarkSitePlanPhases: SitePlanPhase[] = [
  {
    id: "phase-1",
    label: "Phase 1",
    imageUrl: "/site-plans/benchmark/phase-1-desktop.webp",
    lots: phase1Lots,
  },
  {
    id: "phase-2",
    label: "Phase 2",
    imageUrl: "/site-plans/benchmark/phase-2-desktop.webp",
    lots: phase2Lots,
  },
];

export const benchmarkSitePlanLots: SitePlanLot[] = [...phase1Lots, ...phase2Lots];
