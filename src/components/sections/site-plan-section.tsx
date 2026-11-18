"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import type { Community, Floorplan, SitePlanLot, SitePlanPhase } from "@/lib/types/community";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { cn } from "@/lib/utils/cn";
import { SitePlanSectionV4 } from "./site-plan-section-v4";
import { SitePlanSectionV5 } from "./site-plan-section-v5";

const statusColors: Record<string, string> = {
  available: "fill-primary/50 stroke-primary hover:fill-primary/70 focus-visible:fill-primary/70",
  sold: "fill-muted/30 stroke-subtle cursor-not-allowed",
  future: "fill-arches/25 stroke-arches/50 hover:fill-arches/35",
  hold: "fill-[#f0d264]/40 stroke-[#f0d264] hover:fill-[#f0d264]/55",
};

const legend = [
  { status: "available", label: "Available", dot: "bg-primary", dotV3: "bg-white" },
  { status: "sold", label: "Sold", dot: "bg-muted", dotV3: "bg-muted" },
  { status: "future", label: "Future release", dot: "bg-accent", dotV3: "bg-accent" },
  { status: "hold", label: "On hold", dot: "bg-[#f0d264]", dotV3: "bg-[#f0d264]" },
] as const;

function hasMapCoords(lot: SitePlanLot) {
  return lot.x != null && lot.y != null && lot.width != null && lot.height != null;
}

function LotPicker({
  lots,
  selected,
  onSelect,
  className,
  onGreenBand = false,
}: {
  lots: SitePlanLot[];
  selected: SitePlanLot | null;
  onSelect: (lot: SitePlanLot) => void;
  className?: string;
  onGreenBand?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {lots.map((lot) => {
        const isSelected = selected?.id === lot.id;
        const isSold = lot.status === "sold";
        return (
          <button
            key={lot.id}
            type="button"
            disabled={isSold}
            onClick={() => onSelect(lot)}
            className={cn(
              "border rounded-[var(--radius-control)] px-3 py-2 text-left text-sm transition-colors",
              isSelected
                ? onGreenBand
                  ? "border-white bg-white text-foreground"
                  : "border-primary bg-primary/15 text-inherit"
                : onGreenBand
                  ? "border-white/25 bg-white/5 hover:border-white/40 hover:bg-white/10"
                  : "border-subtle bg-white text-foreground hover:border-primary",
              isSold && "cursor-not-allowed opacity-50",
            )}
          >
            <span className="font-medium text-foreground">Lot {lot.lotNumber}</span>
            {lot.price && <span className="mt-0.5 block text-xs opacity-75">{lot.price}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function SitePlanSection({
  data,
  floorplans,
  communityName,
  siteVersion = "v3",
  hero,
  downloads,
}: {
  data: NonNullable<Community["sitePlan"]>;
  floorplans?: Floorplan[];
  communityName?: string;
  siteVersion?: MicrositeVersionId;
  hero?: Community["hero"];
  downloads?: Community["downloads"];
}) {
  if (siteVersion === "v5") {
    return (
      <SitePlanSectionV5
        data={data}
        communityName={communityName}
      />
    );
  }

  if (siteVersion === "v4") {
    return (
      <SitePlanSectionV4
        data={data}
        floorplans={floorplans}
        communityName={communityName}
      />
    );
  }

  const phases = data.phases ?? [];
  const [activePhaseId, setActivePhaseId] = useState(phases[0]?.id ?? "default");
  const [selected, setSelected] = useState<SitePlanLot | null>(null);
  const [zoom, setZoom] = useState(1);

  const activePhase: SitePlanPhase | null = useMemo(() => {
    if (!phases.length) return null;
    return phases.find((phase) => phase.id === activePhaseId) ?? phases[0];
  }, [activePhaseId, phases]);

  const activeLots = activePhase?.lots ?? data.lots;
  const activeImage = activePhase?.imageUrl ?? data.imageUrl;
  const aspectRatio = data.aspectRatio ?? "16 / 9";
  const mappableLots = activeLots.filter(hasMapCoords);
  const planLabel = communityName ?? data.title;

  const selectLot = useCallback((lot: SitePlanLot) => {
    if (lot.status === "sold") return;
    setSelected(lot);
  }, []);

  const handlePhaseChange = useCallback((phaseId: string) => {
    setActivePhaseId(phaseId);
    setSelected(null);
    setZoom(1);
  }, []);

  const legendPills = (
    <PillGroup
      className={cn(
        "gap-2",
        isEditorialVersion(siteVersion) ? "flex flex-wrap justify-end" : "flex-wrap",
      )}
    >
      {legend.map((item) => (
        <Pill key={item.status}>
          <span
            className={cn("h-2 w-2 shrink-0", isEditorialVersion(siteVersion) ? item.dotV3 : item.dot)}
            aria-hidden
          />
          {item.label}
        </Pill>
      ))}
    </PillGroup>
  );

  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.6));

  const zoomControls =
    isEditorialVersion(siteVersion) ? (
      <div className="v3-site-plan-zoom absolute top-3 right-3 z-10 flex flex-col">
        <button type="button" onClick={zoomIn} aria-label="Zoom in" className="v3-site-plan-zoom-btn">
          <Plus size={18} strokeWidth={1.75} aria-hidden />
        </button>
        <button type="button" onClick={zoomOut} aria-label="Zoom out" className="v3-site-plan-zoom-btn">
          <Minus size={18} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    ) : (
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={zoomIn}>
          Zoom in
        </Button>
        <Button variant="secondary" size="sm" onClick={zoomOut}>
          Zoom out
        </Button>
      </div>
    );

  const mapBlock = (
    <div
      className={cn(
        isEditorialVersion(siteVersion)
          ? "v3-inset-panel scrollbar-hide relative flex min-h-[min(72vh,760px)] flex-col overflow-hidden p-5 md:p-6"
          : "card-surface scrollbar-hide overflow-x-auto p-5",
      )}
    >
      {isEditorialVersion(siteVersion) ? (
        <div
          className={cn(
            "mb-4 flex flex-wrap items-start gap-3",
            phases.length > 1 ? "justify-between" : "justify-end",
          )}
        >
          {phases.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => handlePhaseChange(phase.id)}
                  className={cn(
                    "rounded-[var(--radius-control)] border px-4 py-2 text-sm transition-colors",
                    activePhaseId === phase.id
                      ? "border-white bg-white text-foreground"
                      : "border-white/25 bg-white/5 text-white hover:border-white/40",
                  )}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          )}
          {legendPills}
        </div>
      ) : (
        phases.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {phases.map((phase) => (
              <button
                key={phase.id}
                type="button"
                onClick={() => handlePhaseChange(phase.id)}
                className={cn(
                  "border px-4 py-2 text-sm transition-colors",
                  activePhaseId === phase.id
                    ? "border-primary bg-primary text-white"
                    : "border-subtle bg-white hover:border-primary",
                )}
              >
                {phase.label}
              </button>
            ))}
          </div>
        )
      )}

      <div className={cn("relative flex-1", isEditorialVersion(siteVersion) && "min-h-0 overflow-auto")}>
        {isEditorialVersion(siteVersion) && zoomControls}
        <div
          className="relative mx-auto w-full min-w-0 max-w-full"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            aspectRatio,
          }}
        >
        <Image
          src={activeImage}
          alt={`${planLabel} site plan${activePhase ? ` — ${activePhase.label}` : ""}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {mappableLots.length > 0 && (
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" role="img" aria-label="Interactive lot map">
            {mappableLots.map((lot) => {
              const isSelected = selected?.id === lot.id;
              const isSold = lot.status === "sold";
              return (
                <rect
                  key={lot.id}
                  x={lot.x}
                  y={lot.y}
                  width={lot.width}
                  height={lot.height}
                  tabIndex={isSold ? -1 : 0}
                  role="button"
                  aria-label={`Lot ${lot.lotNumber}, ${lot.status}${lot.price ? `, ${lot.price}` : ""}`}
                  aria-pressed={isSelected}
                  className={cn(
                    "cursor-pointer stroke-[0.5] transition-[fill] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary",
                    statusColors[lot.status],
                    isSelected && "stroke-[1.2] fill-primary/65",
                  )}
                  onClick={() => selectLot(lot)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectLot(lot);
                    }
                  }}
                />
              );
            })}
          </svg>
        )}
        </div>
      </div>

      {!isEditorialVersion(siteVersion) && zoomControls}
    </div>
  );

  const matchedFloorplan =
    isEditorialVersion(siteVersion) && selected?.floorplan
      ? floorplans?.find(
          (plan) => plan.name.toLowerCase() === selected.floorplan?.toLowerCase(),
        )
      : undefined;

  const lotDetail = (
    <div className={isEditorialVersion(siteVersion) ? "v3-site-plan-detail" : "card-surface p-6"}>
      {selected ? (
        <>
          <p className="text-sm font-semibold text-foreground">Lot {selected.lotNumber}</p>
          <span
            className={cn(
              "mt-2 block capitalize",
              isEditorialVersion(siteVersion) ? "v3-panel-label" : "card-label mt-2 block",
            )}
          >
            {selected.status.replace("future", "future release")}
          </span>
          {selected.price && <p className="mt-2 text-lg font-bold text-foreground">{selected.price}</p>}
          {selected.sqft && <p className="text-sm text-muted">{selected.sqft} sq ft</p>}
          {selected.floorplan && <p className="text-sm text-muted">{selected.floorplan}</p>}
          {matchedFloorplan && (
            <a
              href="#floorplans"
              className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              View the {matchedFloorplan.name} floorplan
            </a>
          )}
          {selected.status === "available" && (
            <Button
              href="#registration"
              size="sm"
              variant={isEditorialVersion(siteVersion) ? "hero" : "primary"}
              className="mt-4 w-full"
            >
              Book showing
            </Button>
          )}
        </>
      ) : (
        <p className="text-sm text-muted">Select a lot below to view details.</p>
      )}
    </div>
  );

  const lotPicker = (
    <LotPicker
      lots={activeLots}
      selected={selected}
      onSelect={selectLot}
      onGreenBand={isEditorialVersion(siteVersion)}
      className="max-h-48 overflow-y-auto md:max-h-56"
    />
  );

  if (isEditorialVersion(siteVersion)) {
    return (
      <SectionShell id="sitePlan" siteVersion={siteVersion} reveal={false} className="v3-site-plan-band">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-stretch lg:gap-10 xl:gap-14">
          {mapBlock}
          <div className="flex flex-col gap-6 lg:gap-8">
            <SectionIntro
              label="Site plan"
              title={data.title}
              description={`Browse the official ${planLabel} layout and select a lot to view pricing.`}
              showRule={false}
            />
            <div className="v3-panel space-y-3">
              <p className="v3-panel-label">Available lots</p>
              {lotPicker}
            </div>
            {lotDetail}
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="sitePlan" siteVersion={siteVersion} reveal={false} muted>
      <SectionHeaderSplit
        eyebrow="Site plan"
        title={data.title}
        description="Browse the official layout and select a lot to view details."
        siteVersion={siteVersion}
      />
      <PillGroup className="mb-8">
        {legend.map((item) => (
          <Pill key={item.status}>
            <span className={cn("h-2 w-2 shrink-0", item.dot)} aria-hidden />
            {item.label}
          </Pill>
        ))}
      </PillGroup>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {mapBlock}
        <div className="space-y-6">
          <div className="card-surface p-4">
            <p className="card-label mb-3">Available lots</p>
            {lotPicker}
          </div>
          {lotDetail}
        </div>
      </div>
    </SectionShell>
  );
}
