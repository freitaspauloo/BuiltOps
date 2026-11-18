import Image from "next/image";
import type { ReactNode } from "react";
import { CommunityCard } from "@/components/ui/community-card";
import { ModelCard } from "@/components/ui/model-card";
import {
  communityCardStageDotClass,
  communityCardStageLabels,
} from "@/lib/community-card-stages";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { CommunityStage } from "@/lib/types/community";
import {
  communityShowcaseFixtures,
  modelShowcaseFixtures,
} from "./design-card-fixtures";

function ShowcaseBlock({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card-surface p-6 md:p-8", className)}>
      <p className="v3-section-label mb-1">{title}</p>
      {description ? <p className="mb-6 text-sm text-body">{description}</p> : <div className="mb-6" />}
      {children}
    </div>
  );
}

function MobileFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted">{label}</p>
      <div className="mx-auto w-full max-w-[22rem]">{children}</div>
    </div>
  );
}

function StageDot({ stage }: { stage: CommunityStage }) {
  return (
    <span
      className={cn("size-[7px] shrink-0 rounded-full", communityCardStageDotClass[stage])}
      aria-hidden
    />
  );
}

function StageTagRow() {
  const stages: CommunityStage[] = ["available", "coming_soon", "future"];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {stages.map((stage) => (
        <span key={stage} className="community-card-status-badge !relative !left-auto !top-auto !translate-x-0">
          <StageDot stage={stage} />
          {communityCardStageLabels[stage]}
        </span>
      ))}
    </div>
  );
}

function CollectionBadgeTag({
  label,
  variant,
}: {
  label: string;
  variant: "pronto" | "originals" | "default" | "special-offers";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border px-3 py-1 text-xs font-medium text-white",
        "rounded-[var(--radius-control)]",
        variant === "pronto" && "community-collection-badge--pronto",
        variant === "originals" && "community-collection-badge--originals",
        variant === "default" && "community-collection-badge--default",
        variant === "special-offers" && "community-collection-badge--special-offers",
      )}
    >
      {label}
    </span>
  );
}

/** Rental community card mock — Figma planned variant */
function RentalCommunityCardMock() {
  return (
    <article className="community-card flex h-full flex-col opacity-90">
      <div className="p-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-control)]">
          <Image
            src="https://www.losanihomes.com/wp-content/uploads/2026/01/LOSH-MENU-COMM-WCW-1024x983.png"
            alt="Rental community mock"
            fill
            className="object-cover"
            sizes="290px"
          />
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
            <span className="community-card-status-badge">
              <span className="size-[7px] shrink-0 rounded-full bg-sky-400" aria-hidden />
              For Rent
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-3 pb-3 pt-10">
            <h3 className="font-heading text-lg font-medium leading-tight text-white">
              Winona County West
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-white/90">
              Stoney Creek, ON
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-1">
        <p className="font-heading text-2xl font-bold leading-tight text-heading">From $2,400/mo</p>
        <p className="mt-2 text-xs leading-relaxed text-body">
          Townhome rentals with flexible lease terms — showcase mock only.
        </p>
        <div className="mt-auto space-y-2 pt-4">
          <Button variant="primary" size="md" className="w-full" disabled>
            View Rentals
          </Button>
          <Button variant="ghost" size="md" className="w-full text-heading underline" disabled>
            Schedule a Tour
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Rent model card mock — Figma planned variant */
function RentModelCardMock() {
  return (
    <article className="model-card flex h-full flex-col overflow-hidden bg-background opacity-90">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src="https://www.losanihomes.com/wp-content/uploads/2025/12/1501EF-ESPRIT-F1-768x477.webp"
          alt="Rent model mock"
          fill
          className="object-cover"
          sizes="290px"
        />
        <div className="absolute left-2.5 top-2.5">
          <CollectionBadgeTag label="For Rent" variant="default" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-2">
        <h3 className="font-heading text-lg font-medium leading-tight text-heading">Esprit Interior F1</h3>
        <p className="text-[10px] leading-snug text-muted">Townhome interior unit</p>
        <p className="text-sm font-bold leading-tight text-heading">Rent from $2,150/mo</p>
        <p className="text-xs text-muted">3 beds · 2.5 baths · 1,237 sqft</p>
        <div className="mt-auto space-y-1 pt-2">
          <Button variant="primary" size="sm" className="w-full" disabled>
            View Floorplan
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-full text-[13px] text-heading underline" disabled>
            Apply Now
          </Button>
        </div>
      </div>
    </article>
  );
}

function CommunityCardsShowcase() {
  return (
    <section id="community-cards" className="scroll-mt-28 space-y-8">
      <div className="mb-8">
        <p className="v3-section-label">Card library</p>
        <h2 className="headline-section-v3 text-balance">Community cards</h2>
        <p className="v3-section-dek mt-4 max-w-3xl">
          Production <code className="text-xs">CommunityCard</code> component scoped to v4/v5.
          Figma references: stage tags &amp; badges{" "}
          <code className="text-xs">181:619</code>, desktop{" "}
          <code className="text-xs">181:718</code>, mobile{" "}
          <code className="text-xs">181:820</code>.
        </p>
        <hr className="v3-hairline mt-6" aria-hidden />
      </div>

      <div data-microsite-version="v5" className="space-y-8">
        <ShowcaseBlock
          title="Stage tags"
          description="Photo-overlay status tabs — desktop top-center; mobile inline below title."
        >
          <StageTagRow />
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Collection badges"
          description="Photo badges for Pronto, Losani Originals, and planned Special Offers variant."
        >
          <div className="flex flex-wrap items-center gap-3">
            <CollectionBadgeTag label="Pronto Homes" variant="pronto" />
            <CollectionBadgeTag label="Losani Originals" variant="originals" />
            <CollectionBadgeTag label="Special Offers" variant="special-offers" />
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Desktop · 3-column grid"
          description="Full card layout at md+ breakpoint — badges below photo, specs and CTAs in card body."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {communityShowcaseFixtures.map((fixture) => (
              <div key={fixture.id} className="space-y-2">
                <p className="text-xs font-medium text-muted">{fixture.label}</p>
                <CommunityCard community={fixture.community} />
              </div>
            ))}
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Mobile · narrow frames"
          description="Cards in max-w-[22rem] frames — horizontal photo + stacked content layout."
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {communityShowcaseFixtures.map((fixture) => (
              <MobileFrame key={fixture.id} label={fixture.label}>
                <CommunityCard community={fixture.community} />
              </MobileFrame>
            ))}
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Planned variants"
          description="Figma designs not yet implemented in production components."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted">Rental community stage</p>
              <RentalCommunityCardMock />
            </div>
          </div>
        </ShowcaseBlock>
      </div>
    </section>
  );
}

function ModelCardsShowcase() {
  return (
    <section id="model-cards" className="scroll-mt-28 space-y-8">
      <div className="mb-8">
        <p className="v3-section-label">Card library</p>
        <h2 className="headline-section-v3 text-balance">Model cards</h2>
        <p className="v3-section-dek mt-4 max-w-3xl">
          Production <code className="text-xs">ModelCard</code> for buy-side floorplans.
          Figma reference: <code className="text-xs">204:3985</code> (buy/rent desktop &amp; mobile).
        </p>
        <hr className="v3-hairline mt-6" aria-hidden />
      </div>

      <div data-microsite-version="v5" className="space-y-8">
        <ShowcaseBlock
          title="Desktop · buy variations"
          description="Lot pill, interior without lot, Pronto badge, and custom subtitle variants."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modelShowcaseFixtures.map((fixture) => (
              <div key={fixture.id} className="space-y-2">
                <p className="text-xs font-medium text-muted">{fixture.label}</p>
                <ModelCard plan={fixture.plan} />
              </div>
            ))}
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Mobile · narrow frames"
          description="Same ModelCard component in mobile-width preview frames."
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {modelShowcaseFixtures.map((fixture) => (
              <MobileFrame key={fixture.id} label={fixture.label}>
                <ModelCard plan={fixture.plan} />
              </MobileFrame>
            ))}
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Planned variants"
          description="Rent-side model card — not implemented in ModelCard component."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted">Rent model card</p>
              <RentModelCardMock />
            </div>
          </div>
        </ShowcaseBlock>
      </div>
    </section>
  );
}

export function CardShowcase() {
  return (
    <>
      <CommunityCardsShowcase />
      <ModelCardsShowcase />
    </>
  );
}
