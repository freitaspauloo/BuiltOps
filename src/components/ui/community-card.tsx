import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CommunityStage, SimilarCommunity } from "@/lib/types/community";
import {
  communityCardCtas,
  communityCardStageDotClass,
  communityCardStageLabels,
} from "@/lib/community-card-stages";
import { Button } from "@/components/ui/button";
import { Home, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";

function CommunityCardStageDot({ stage }: { stage: CommunityStage }) {
  return (
    <span
      className={cn(
        "size-[7px] shrink-0 rounded-full",
        communityCardStageDotClass[stage],
      )}
      aria-hidden
    />
  );
}

function CommunityCardStatusTab({ stage }: { stage: CommunityStage }) {
  return (
    <span className="community-card-status-badge pointer-events-none absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 md:inline-flex">
      <CommunityCardStageDot stage={stage} />
      {communityCardStageLabels[stage]}
    </span>
  );
}

function CommunityCardMobileStatus({ stage }: { stage: CommunityStage }) {
  return (
    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white md:hidden">
      <CommunityCardStageDot stage={stage} />
      {communityCardStageLabels[stage]}
    </p>
  );
}

function CollectionBadge({
  label,
  variant = "default",
  compact = false,
}: {
  label: string;
  variant?: "pronto" | "originals" | "default";
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border font-medium text-white",
        "rounded-[var(--radius-control)]",
        compact ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs",
        variant === "pronto" && "community-collection-badge--pronto",
        variant === "originals" && "community-collection-badge--originals",
        variant === "default" && "community-collection-badge--default",
      )}
    >
      {label}
    </span>
  );
}

function CommunityCardActions({
  modelsHref,
  appointmentHref,
  stage,
  compact = false,
}: {
  modelsHref: string;
  appointmentHref: string;
  stage: CommunityStage;
  compact?: boolean;
}) {
  const ctas = communityCardCtas[stage];

  return (
    <div className={cn("space-y-1", !compact && "space-y-2")}>
      <Button
        href={modelsHref}
        variant="primary"
        size={compact ? "sm" : "md"}
        className={cn(
          compact ? "h-7 min-h-0 w-full px-3 py-0 text-[11px]" : "w-full",
        )}
      >
        {ctas.primary}
      </Button>
      <Link
        href={appointmentHref}
        className={cn(
          "block w-full text-center font-medium text-heading underline underline-offset-2",
          compact ? "text-[11px]" : "text-sm",
        )}
      >
        {ctas.secondary}
      </Link>
    </div>
  );
}

function CommunityCardSpec({
  icon: Icon,
  children,
  className,
}: {
  icon: typeof Home;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-muted", className)}>
      <Icon className="size-3 shrink-0" strokeWidth={2.25} aria-hidden />
      {children}
    </span>
  );
}

export function CommunityCard({ community }: { community: SimilarCommunity }) {
  const modelsHref = community.modelsHref ?? community.href;
  const appointmentHref = community.appointmentHref ?? community.href;
  const showSpecs = Boolean(community.homeTypes || community.sizeRange);
  const primaryCollection = community.collections?.[0];

  return (
    <article className="community-card flex flex-col md:h-full">
      <div className="p-3 md:p-2.5">
        <div className="flex items-stretch gap-1.5 md:block">
          <div
            className={cn(
              "relative shrink-0",
              "h-[10.8125rem] w-[10.5rem]",
              "md:aspect-[4/3] md:h-auto md:w-full",
            )}
          >
            <div className="relative size-full overflow-hidden rounded-[var(--radius-control)]">
              <Image
                src={community.image}
                alt={community.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 168px, (max-width: 1024px) 50vw, 33vw"
              />

              {primaryCollection ? (
                <div className="absolute left-2 top-2 md:hidden">
                  <CollectionBadge
                    label={primaryCollection.label}
                    variant={primaryCollection.variant}
                    compact
                  />
                </div>
              ) : null}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-3 pb-3 pt-8 md:from-black/75 md:via-black/40 md:pt-10">
                <h3 className="font-heading text-[0.9375rem] font-medium leading-tight text-white md:text-lg">
                  {community.name}
                </h3>

                <CommunityCardMobileStatus stage={community.stage} />

                <div className="mt-1 hidden md:block">
                  <p className="flex items-center gap-1 text-xs text-white/90">
                    <MapPin className="size-3 shrink-0" strokeWidth={2.25} aria-hidden />
                    {community.city}
                  </p>
                  {community.availabilitySummary ? (
                    <p className="mt-1 text-xs font-semibold text-white">
                      {community.availabilitySummary}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <CommunityCardStatusTab stage={community.stage} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 md:hidden">
            <div className="flex flex-col gap-0.5">
            {community.priceFrom ? (
              <p className="font-heading text-base font-bold leading-tight text-heading">
                {community.priceFrom}
              </p>
            ) : null}

            <CommunityCardSpec icon={MapPin} className="text-xs">
              {community.city}
            </CommunityCardSpec>

            {community.homeTypes ? (
              <CommunityCardSpec icon={Home} className="text-[11px]">
                {community.homeTypes}
              </CommunityCardSpec>
            ) : null}

            {community.sizeRange ? (
              <CommunityCardSpec icon={Home} className="text-xs">
                {community.sizeRange}
              </CommunityCardSpec>
            ) : null}

            {community.description ? (
              <p className="line-clamp-2 text-[10px] leading-snug text-body">
                {community.description}{" "}
                <Link
                  href={community.href}
                  className="font-medium text-heading underline underline-offset-2"
                >
                  more
                </Link>
              </p>
            ) : null}
            </div>

            <CommunityCardActions
              modelsHref={modelsHref}
              appointmentHref={appointmentHref}
              stage={community.stage}
              compact
            />
          </div>
        </div>
      </div>

      <div className="hidden flex-1 flex-col px-3 pb-3 pt-1 md:flex">
        {community.collections?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {community.collections.map((badge) => (
              <CollectionBadge
                key={badge.label}
                label={badge.label}
                variant={badge.variant}
              />
            ))}
          </div>
        ) : null}

        {community.priceFrom ? (
          <p className="mt-2 font-heading text-2xl font-bold leading-tight text-heading">
            {community.priceFrom}
          </p>
        ) : null}

        {community.description ? (
          <p className="mt-2 text-xs leading-relaxed text-body">
            {community.description}{" "}
            <Link
              href={community.href}
              className="font-medium text-heading underline underline-offset-2"
            >
              more
            </Link>
          </p>
        ) : null}

        {showSpecs ? (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            {community.homeTypes ? (
              <CommunityCardSpec icon={Home}>{community.homeTypes}</CommunityCardSpec>
            ) : null}
            {community.sizeRange ? (
              <CommunityCardSpec icon={Home}>{community.sizeRange}</CommunityCardSpec>
            ) : null}
          </div>
        ) : null}

        <div className="mt-auto pt-4">
          <CommunityCardActions
            modelsHref={modelsHref}
            appointmentHref={appointmentHref}
            stage={community.stage}
          />
        </div>
      </div>
    </article>
  );
}
