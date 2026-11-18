"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Floorplan } from "@/lib/types/community";
import { modelHref } from "@/lib/site-versions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

function formatPriceFrom(price: string) {
  const trimmed = price.trim();
  return /^from\b/i.test(trimmed) ? trimmed : `From ${trimmed}`;
}

function deriveLotLabel(name: string, lotLabel?: string) {
  if (lotLabel) return lotLabel;
  const match = name.match(/^(\d+'?)\s/);
  return match ? `${match[1]} lot` : undefined;
}

function deriveSubtitle(plan: Floorplan) {
  if (plan.subtitle) return plan.subtitle;
  if (/interior/i.test(plan.name)) return "Townhome interior unit";
  if (/end/i.test(plan.name)) return "Townhome end unit";
  return "Townhome";
}

function CollectionBadge({
  label,
  variant = "originals",
}: {
  label: string;
  variant?: "pronto" | "originals" | "default";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border px-2.5 py-0.5 text-xs font-semibold text-white",
        "rounded-[var(--radius-control)]",
        variant === "pronto" && "community-collection-badge--pronto",
        variant === "originals" && "community-collection-badge--originals",
        variant === "default" && "community-collection-badge--default",
      )}
    >
      {label}
    </span>
  );
}

function formatSqft(plan: Floorplan) {
  if (plan.sqftRange) return plan.sqftRange;
  return `${plan.sqft.toLocaleString()} sqft`;
}

export function ModelCard({
  plan,
  onExploreLevels,
  fromPath,
}: {
  plan: Floorplan;
  onExploreLevels?: () => void;
  /** Community path for deep-link back from model page — e.g. /communities/benchmark */
  fromPath?: string;
}) {
  const pathname = usePathname();
  const communityFrom =
    fromPath ?? (pathname.startsWith("/communities/") ? pathname : undefined);

  const collection = plan.collection ?? {
    label: "Losani Originals",
    variant: "originals" as const,
  };
  const lotLabel = deriveLotLabel(plan.name, plan.lotLabel);
  const subtitle = deriveSubtitle(plan);
  const tourHref = plan.tourHref ?? "#registration";
  const specs = `${plan.beds} beds · ${plan.baths} baths · ${formatSqft(plan)}`;

  const exploreHref = plan.modelSlug
    ? modelHref(plan.modelSlug, communityFrom ? { from: communityFrom } : undefined)
    : plan.pdfUrl ?? undefined;
  const exploreExternal = Boolean(plan.pdfUrl && !plan.modelSlug);

  return (
    <article className="model-card flex h-full flex-col overflow-hidden bg-background">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={plan.image}
          alt={plan.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 88vw, 290px"
        />
        <div className="absolute left-2.5 top-2.5">
          <CollectionBadge label={collection.label} variant={collection.variant} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-medium leading-tight text-heading">
            {plan.name.replace(/^\d+'?\s+/, "")}
          </h3>
          {lotLabel ? (
            <span className="model-card-lot-pill shrink-0">{lotLabel}</span>
          ) : null}
        </div>

        <p className="text-[11px] leading-snug text-muted sm:text-xs">{subtitle}</p>

        <p className="text-sm font-bold leading-tight text-heading">
          {formatPriceFrom(plan.priceFrom)}
        </p>

        <p className="text-xs text-muted">{specs}</p>

        <div className="mt-auto space-y-1.5 pt-3">
          {onExploreLevels ? (
            <Button variant="primary" size="sm" className="w-full" onClick={onExploreLevels}>
              Explore Model
            </Button>
          ) : exploreHref ? (
            <Button
              href={exploreHref}
              target={exploreExternal ? "_blank" : undefined}
              rel={exploreExternal ? "noopener noreferrer" : undefined}
              variant="primary"
              size="sm"
              className="w-full"
            >
              Explore Model
            </Button>
          ) : (
            <Button variant="primary" size="sm" className="w-full" disabled>
              Explore Model
            </Button>
          )}
          <Button
            href={tourHref}
            variant="ghost"
            size="sm"
            className="h-7 w-full text-[13px] text-heading underline"
          >
            Book a Tour
          </Button>
        </div>
      </div>
    </article>
  );
}
