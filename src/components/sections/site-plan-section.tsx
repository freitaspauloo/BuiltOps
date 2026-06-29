"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import type { Community, SitePlanLot } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { cn } from "@/lib/utils/cn";

const statusColors: Record<string, string> = {
  available: "fill-primary/50 stroke-primary hover:fill-primary/70 focus-visible:fill-primary/70",
  sold: "fill-muted/30 stroke-subtle cursor-not-allowed",
  future: "fill-arches/25 stroke-arches/50 hover:fill-arches/35",
  hold: "fill-body/20 stroke-subtle",
};

const legend = [
  { status: "available", label: "Available", dot: "bg-primary" },
  { status: "sold", label: "Sold", dot: "bg-muted" },
  { status: "future", label: "Future release", dot: "bg-accent" },
  { status: "hold", label: "On hold", dot: "bg-body/40" },
] as const;

export function SitePlanSection({
  data,
  siteVersion = "v2",
}: {
  data: NonNullable<Community["sitePlan"]>;
  siteVersion?: MicrositeVersionId;
}) {
  const [selected, setSelected] = useState<SitePlanLot | null>(null);
  const [zoom, setZoom] = useState(1);

  const selectLot = useCallback((lot: SitePlanLot) => {
    if (lot.status === "sold") return;
    setSelected(lot);
  }, []);

  return (
    <SectionShell id="sitePlan" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Site plan"
        title={data.title}
        description="Select a lot to view details."
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
        <div className="card-surface overflow-x-auto p-5">
          <div
            className="relative mx-auto aspect-[4/3] w-full min-w-0 max-w-full"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            <Image src={data.imageUrl} alt="Site plan" fill className="object-cover opacity-25" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" role="img" aria-label="Interactive lot map">
              {data.lots.map((lot) => {
                const isSelected = selected?.id === lot.id;
                const isSold = lot.status === "sold";
                return (
                  <rect
                    key={lot.id}
                    x={lot.x}
                    y={lot.y}
                    width={lot.width}
                    height={lot.height}
                    rx={0.5}
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
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}>
              Zoom in
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}>
              Zoom out
            </Button>
          </div>
        </div>
        <div className="card-surface p-6">
          {selected ? (
            <>
              <p className="text-sm text-muted">Lot {selected.lotNumber}</p>
              <span className="card-label mt-2 block capitalize">{selected.status}</span>
              {selected.price && <p className="mt-2 text-lg font-bold">{selected.price}</p>}
              {selected.floorplan && <p className="text-sm text-muted">{selected.floorplan}</p>}
              {selected.status === "available" && (
                <Button href="#registration" size="sm" className="mt-4 w-full">
                  Book showing
                </Button>
              )}
            </>
          ) : (
            <p className="text-sm text-muted">Select a lot on the map.</p>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
