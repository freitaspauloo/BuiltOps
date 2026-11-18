import Image from "next/image";
import type { HomeModel, ModelAvailability } from "@/lib/types/model";
import { Button } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";
import { communityStageLabels } from "@/components/ui/status-badge";
import { communityHref } from "@/lib/site-versions";
import { cn } from "@/lib/utils/cn";
import { ModelLotFitCallout } from "@/components/models/model-lot-fit-callout";

const LOT_STATUS_LABELS: Record<string, string> = {
  available: "Available",
  hold: "On hold",
  sold: "Sold",
  future: "Future release",
};

function CommunityRow({
  availability,
  modelName,
  highlightLot,
}: {
  availability: ModelAvailability;
  modelName: string;
  highlightLot?: string;
}) {
  const isComingSoon = availability.stage === "coming_soon" || availability.stage === "future";

  return (
    <article className="card-surface grid gap-6 border border-border p-5 md:p-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] lg:items-start lg:gap-10">
      {availability.image && (
        <div className="relative aspect-[4/3] w-full max-w-[16rem] overflow-hidden rounded-[var(--radius-control)] bg-mist">
          <Image
            src={availability.image}
            alt={`${availability.communityName} streetscape`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 60vw, 256px"
          />
        </div>
      )}

      <div className="min-w-0">
        <span className="v3-panel-label block">{communityStageLabels[availability.stage]}</span>
        <h3 className="text-xl font-semibold text-foreground md:text-2xl">
          {availability.communityName}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {availability.city}
          {availability.priceFrom ? ` · ${modelName} ${availability.priceFrom}` : ""}
        </p>

        {availability.lots.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {availability.lots.map((lot) => {
              const isHighlighted = highlightLot === lot.lotNumber;
              const isActionable = lot.status === "available" || lot.status === "hold";

              const pillContent = (
                <>
                  <span className="font-semibold text-foreground">Lot {lot.lotNumber}</span>
                  {lot.price && <span> · {lot.price}</span>}
                  <span
                    className={cn(
                      "ml-1 text-xs uppercase tracking-wide",
                      lot.status === "available" ? "text-primary" : "text-muted",
                      isHighlighted && "text-white/85",
                    )}
                  >
                    {LOT_STATUS_LABELS[lot.status]}
                  </span>
                </>
              );

              if (!isActionable) {
                return (
                  <span
                    key={lot.lotNumber}
                    className="inline-flex items-center gap-1 rounded-[var(--radius-control)] border border-border bg-mist px-3.5 py-2 text-sm text-muted"
                  >
                    {pillContent}
                  </span>
                );
              }

              return (
                <a
                  key={lot.lotNumber}
                  href={lot.connectedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1 rounded-[var(--radius-control)] border px-3.5 py-2 text-sm transition-colors",
                    isHighlighted
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background text-foreground hover:border-primary",
                  )}
                  aria-label={`View Lot ${lot.lotNumber} at ${availability.communityName} on the connected experience`}
                >
                  {pillContent}
                </a>
              );
            })}
          </div>
        ) : (
          <p className="mt-5 text-sm text-body">
            {isComingSoon
              ? "Lot releases coming soon — register for first access to pricing and availability."
              : "Contact our sales team for current lot availability."}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
        {availability.lots.length > 0 ? (
          <Button
            href={availability.connectedUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            See live availability
          </Button>
        ) : (
          <Button href="#registration" size="sm">
            Book Appointment
          </Button>
        )}
        {availability.communitySlug && (
          <Button
            href={communityHref(availability.communitySlug)}
            variant="ghost"
            size="sm"
            className="text-heading underline"
          >
            Visit community page
          </Button>
        )}
      </div>
    </article>
  );
}

export function AvailableAtSection({
  model,
  highlightLot,
}: {
  model: HomeModel;
  highlightLot?: string;
}) {
  if (model.availableAt.length === 0) return null;

  const isTownhome = model.homeType === "townhome";
  const description = isTownhome
    ? `The ${model.name} is currently offered on the following blocks and lots. Availability updates in real time on our connected site experience.`
    : `The ${model.name} is currently offered on the following homesites. Availability updates in real time on our connected site experience.`;

  return (
    <SectionShell id="availableAt" siteVersion="v6" reveal={false}>
      <SectionIntro
        label="Available at"
        title={`Where you can build the ${model.name}`}
        description={description}
        showRule={false}
        className="mb-2 md:mb-4"
      />

      <ModelLotFitCallout homeType={model.homeType} className="mb-6 md:mb-8" />

      <div className="space-y-4">
        {model.availableAt.map((availability) => (
          <CommunityRow
            key={availability.communityName}
            availability={availability}
            modelName={model.name}
            highlightLot={highlightLot}
          />
        ))}
      </div>
    </SectionShell>
  );
}
