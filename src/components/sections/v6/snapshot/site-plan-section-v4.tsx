"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Maximize2, Minus, Plus, XIcon } from "lucide-react";
import type { Community, Floorplan, SitePlanLot, SitePlanPhase } from "@/lib/types/community";
import { findFloorplanForLot, withFloorplanImages } from "@/lib/data/benchmark-floorplan-images";
import { SectionShell } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const lotMarkerColors = {
  available: "#22c55e",
  availableSelected: "#16a34a",
  sold: "#c0392b",
} as const;

const lotStatusLabels: Record<SitePlanLot["status"], string> = {
  available: "Available",
  sold: "Sold",
  future: "Future release",
  hold: "On hold",
};

function compareLotNumbers(a: string, b: string) {
  const na = Number.parseInt(a, 10);
  const nb = Number.parseInt(b, 10);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return a.localeCompare(b);
}

/** Center point (0–100) of a lot's approximate overlay rect. */
function lotCenter(lot: SitePlanLot): { cx: number; cy: number } | null {
  if (lot.x == null || lot.y == null) return null;
  return {
    cx: lot.x + (lot.width ?? 0) / 2,
    cy: lot.y + (lot.height ?? 0) / 2,
  };
}

function PlanLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-foreground/92"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/15 px-4 py-3 md:px-6">
        <p className="text-sm font-medium text-white">{alt}</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            className="flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80"
            aria-label="Zoom out"
          >
            <Minus className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={zoomIn}
            className="flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80"
            aria-label="Zoom in"
          >
            <Plus className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80"
            aria-label="Close site plan"
          >
            <XIcon className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-4 md:p-8">
        <div
          className="mx-auto w-max origin-top transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="max-w-none" draggable={false} />
        </div>
      </div>
    </div>
  );
}

export function SitePlanSectionV4({
  data,
  floorplans,
  communityName,
}: {
  data: NonNullable<Community["sitePlan"]>;
  floorplans?: Floorplan[];
  communityName?: string;
}) {
  const phases = data.phases ?? [];
  const [activePhaseId, setActivePhaseId] = useState(phases[0]?.id ?? "default");
  const [selected, setSelected] = useState<SitePlanLot | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activePhase: SitePlanPhase | null = useMemo(() => {
    if (!phases.length) return null;
    return phases.find((phase) => phase.id === activePhaseId) ?? phases[0];
  }, [activePhaseId, phases]);

  const activeLots = activePhase?.lots ?? data.lots;
  const activeImage = activePhase?.imageUrl ?? data.imageUrl;
  const aspectRatio = data.aspectRatio ?? "16 / 9";
  const planLabel = communityName ?? data.title;

  const sortedLots = useMemo(
    () => [...activeLots].sort((a, b) => compareLotNumbers(a.lotNumber, b.lotNumber)),
    [activeLots],
  );

  // Table lists purchasable and upcoming inventory only — sold lots appear as
  // red markers on the plan (no status column per the v4 audit).
  const tableLots = useMemo(
    () => sortedLots.filter((lot) => lot.status !== "sold"),
    [sortedLots],
  );

  // Only available (green) and sold (red) lots get clickable markers.
  const markerLots = useMemo(
    () =>
      activeLots
        .filter((lot) => lot.status === "available" || lot.status === "sold")
        .map((lot) => ({ lot, center: lotCenter(lot) }))
        .filter((entry): entry is { lot: SitePlanLot; center: { cx: number; cy: number } } =>
          entry.center !== null,
        ),
    [activeLots],
  );

  const firstSelectable = useMemo(
    () => tableLots[0] ?? null,
    [tableLots],
  );

  useEffect(() => {
    setSelected(firstSelectable);
  }, [activePhaseId, firstSelectable]);

  const handlePhaseChange = useCallback((phaseId: string) => {
    setActivePhaseId(phaseId);
    setLightboxOpen(false);
  }, []);

  const selectLot = useCallback((lot: SitePlanLot) => {
    if (lot.status === "sold") return;
    setSelected(lot);
  }, []);

  const resolvedFloorplans = useMemo(
    () => (floorplans ? withFloorplanImages(floorplans) : undefined),
    [floorplans],
  );

  const matchedFloorplan = selected?.floorplan
    ? findFloorplanForLot(resolvedFloorplans ?? [], selected.floorplan)
    : undefined;

  const planAlt = `${planLabel} site plan${activePhase ? ` — ${activePhase.label}` : ""}`;

  return (
    <SectionShell id="sitePlan" siteVersion="v4" reveal={false}>
      <SectionIntro
        label="Site plan"
        title={data.title}
        description={`Browse the official ${planLabel} layout and compare available lots.`}
        showRule={false}
        className="mb-8 md:mb-10"
      />

      {phases.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {phases.map((phase) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => handlePhaseChange(phase.id)}
              aria-pressed={activePhaseId === phase.id}
              className={cn(
                "rounded-[var(--radius-control)] border px-4 py-2.5 text-sm font-medium transition-colors",
                activePhaseId === phase.id
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-border bg-background text-body hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {phase.label}
            </button>
          ))}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <span className="flex items-center gap-2">
          <span
            className="h-3 w-3 border-2 border-white shadow-sm"
            style={{ backgroundColor: lotMarkerColors.available }}
            aria-hidden
          />
          Available — tap to view pricing
        </span>
        <span className="flex items-center gap-2">
          <span
            className="h-3 w-3 border border-white shadow-sm"
            style={{ backgroundColor: lotMarkerColors.sold }}
            aria-hidden
          />
          Sold
        </span>
      </div>

      <div className="relative border border-border bg-mist/40">
        <div className="relative w-full" style={{ aspectRatio }}>
          <Image
            src={activeImage}
            alt={planAlt}
            fill
            className="object-contain p-2 md:p-4"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />

          {markerLots.length > 0 && (
            <div className="pointer-events-none absolute inset-0">
              {markerLots.map(({ lot, center }) => {
                const isSelected = selected?.id === lot.id;
                const isSold = lot.status === "sold";
                return (
                  <button
                    key={lot.id}
                    type="button"
                    disabled={isSold}
                    aria-label={`Lot ${lot.lotNumber}, ${lotStatusLabels[lot.status]}${lot.price ? `, ${lot.price}` : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => selectLot(lot)}
                    style={{
                      left: `${center.cx}%`,
                      top: `${center.cy}%`,
                      backgroundColor: isSold
                        ? lotMarkerColors.sold
                        : isSelected
                          ? lotMarkerColors.availableSelected
                          : lotMarkerColors.available,
                    }}
                    className={cn(
                      "pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 border-2 border-white transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
                      isSold &&
                        "h-2.5 w-2.5 cursor-not-allowed opacity-80 shadow-[0_1px_4px_rgba(0,0,0,0.45)]",
                      !isSold &&
                        !isSelected &&
                        "h-2.5 w-2.5 cursor-pointer opacity-75 shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:h-3 hover:w-3 hover:opacity-100",
                      !isSold &&
                        isSelected &&
                        "z-20 h-4 w-4 cursor-pointer ring-2 ring-white ring-offset-1 ring-offset-[#22c55e] shadow-[0_2px_10px_rgba(0,0,0,0.45)]",
                    )}
                  />
                );
              })}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 right-3 flex items-center gap-2 border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-fog"
        >
          <Maximize2 className="size-4" strokeWidth={1.75} aria-hidden />
          Expand plan
        </button>
      </div>

      <div className="mt-10 md:mt-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted">Lot inventory</p>
            <p className="mt-1 text-sm text-body">
              {sortedLots.filter((l) => l.status === "available").length} available
              {sortedLots.some((l) => l.status === "future") &&
                ` · ${sortedLots.filter((l) => l.status === "future").length} future release`}
            </p>
          </div>
        </div>

        <div className="v4-site-plan-table-wrap overflow-x-auto border border-border">
          <table className="v4-site-plan-table w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card/60">
                <th className="px-4 py-3 font-medium text-muted">Lot</th>
                <th className="px-4 py-3 font-medium text-muted">Floorplan</th>
                <th className="px-4 py-3 font-medium text-muted">Sq ft</th>
                <th className="px-4 py-3 font-medium text-muted">Final price</th>
              </tr>
            </thead>
            <tbody>
              {tableLots.map((lot) => {
                const isSelected = selected?.id === lot.id;

                return (
                  <tr
                    key={lot.id}
                    data-selected={isSelected || undefined}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    onClick={() => selectLot(lot)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectLot(lot);
                      }
                    }}
                    className={cn(
                      "border-b border-border transition-colors last:border-b-0",
                      "cursor-pointer hover:bg-fog/80",
                      isSelected &&
                        "border-l-[3px] border-l-[#22c55e] bg-[#ecfdf3] hover:bg-[#ecfdf3]",
                    )}
                  >
                    <td className="px-4 py-3.5 font-semibold tabular-nums text-foreground">{lot.lotNumber}</td>
                    <td className="px-4 py-3.5 text-body">{lot.floorplan ?? "—"}</td>
                    <td className="px-4 py-3.5 tabular-nums text-body">{lot.sqft ?? "—"}</td>
                    <td className="px-4 py-3.5 font-medium tabular-nums text-foreground">{lot.price ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="mt-8 grid gap-6 border border-border bg-card/40 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,14rem)] md:p-8">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted">Selected lot</p>
                <h3 className="mt-1 text-2xl font-semibold text-foreground">Lot {selected.lotNumber}</h3>
                <p className="mt-1 text-sm capitalize text-body">
                  {lotStatusLabels[selected.status]}
                  {selected.floorplan ? ` · ${selected.floorplan}` : ""}
                </p>
              </div>
              {selected.price && (
                <div className="text-right">
                  <p className="text-xs font-medium tracking-wide text-muted">Final price</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
                    {selected.price}
                  </p>
                </div>
              )}
            </div>

            <dl className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
              {selected.sqft && (
                <div>
                  <dt className="text-xs font-medium text-muted">Size</dt>
                  <dd className="mt-1 font-medium tabular-nums text-foreground">{selected.sqft} sq ft</dd>
                </div>
              )}
              {selected.floorplan && (
                <div>
                  <dt className="text-xs font-medium text-muted">Floorplan</dt>
                  <dd className="mt-1 font-medium text-foreground">{selected.floorplan}</dd>
                </div>
              )}
              {activePhase && (
                <div>
                  <dt className="text-xs font-medium text-muted">Phase</dt>
                  <dd className="mt-1 font-medium text-foreground">{activePhase.label}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              {matchedFloorplan && (
                <Button
                  href={`#floorplans-${matchedFloorplan.id}`}
                  variant="secondary"
                  size="sm"
                  className="border border-border bg-mist hover:bg-card-label"
                >
                  View {matchedFloorplan.name} floorplan
                </Button>
              )}
              {selected.status === "available" && (
                <Button href="#registration" size="sm">
                  Book showing
                </Button>
              )}
              {selected.status === "future" && (
                <span className="group/tooltip relative inline-flex">
                  <Button
                    size="sm"
                    disabled
                    aria-describedby={`lot-${selected.id}-future-tooltip`}
                    className="cursor-not-allowed opacity-45 hover:bg-primary"
                  >
                    Book showing
                  </Button>
                  <span
                    id={`lot-${selected.id}-future-tooltip`}
                    role="tooltip"
                    className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-10 w-max max-w-[12rem] -translate-x-1/2 border border-border bg-foreground px-2.5 py-1.5 text-center text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
                  >
                    Future release
                  </span>
                </span>
              )}
            </div>
          </div>

          {matchedFloorplan && (
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-mist md:aspect-auto">
              <Image
                src={matchedFloorplan.image}
                alt={`${matchedFloorplan.name} floorplan`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 14rem"
              />
            </div>
          )}
        </div>
      )}

      {lightboxOpen && (
        <PlanLightbox src={activeImage} alt={planAlt} onClose={() => setLightboxOpen(false)} />
      )}
    </SectionShell>
  );
}
