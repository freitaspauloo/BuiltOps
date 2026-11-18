"use client";

import Image from "next/image";
import Link from "next/link";
import type {
  CommunityOverview,
  CommunityStage,
  DownloadAsset,
  OverviewLayoutVariant,
  QuickFacts,
  SalesOffice,
} from "@/lib/types/community";
import { isAuditMicrositeVersion, isEditorialVersion, isV6MicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionBrochureLink } from "@/components/ui/section-brochure-link";
import { V5OverviewMetricsBand } from "./overview-metrics-band";
import { V5OverviewLayouts } from "./v5-overview-layouts";
import { V3MetricsBand, getMetricsBandFacts, getV5MetricsBandFacts } from "./quick-facts-bento-section";
import { DownloadPills } from "./download-pills";
import { SalesOfficeVisitDetails, SalesTeamContact } from "./sales-office-section";

type OverviewSectionProps = {
  data: CommunityOverview;
  quickFacts?: QuickFacts;
  salesOffice?: SalesOffice;
  downloads?: DownloadAsset[];
  videoUrl?: string;
  videoPoster?: string;
  contact?: { name: string; role: string; image?: string };
  stage?: CommunityStage;
  siteVersion?: MicrositeVersionId;
  layoutOverride?: OverviewLayoutVariant;
};

const shellClass =
  "scroll-mt-[var(--nav-height,4.25rem)] scroll-pb-24 bg-background pb-14 pt-6 md:pb-20 md:pt-8 lg:pb-24 hero-frame-sides";

export function OverviewSection({
  data,
  quickFacts,
  salesOffice,
  downloads,
  videoUrl,
  videoPoster,
  contact,
  stage,
  siteVersion = "v3",
  layoutOverride,
}: OverviewSectionProps) {
  const paired = Boolean(quickFacts?.facts.length);
  const editorial = isEditorialVersion(siteVersion);
  const isAudit = isAuditMicrositeVersion(siteVersion);
  const isV5 = isV6MicrositeVersion(siteVersion);
  const layout: OverviewLayoutVariant =
    layoutOverride ?? data.layoutVariant ?? "a";
  // Sales-team / "Plan your visit" panel is only meaningful once the community
  // is selling. v3 preserves its original behaviour (always shown when present).
  const showVisit = Boolean(salesOffice) && (!isAudit || stage === "available");

  if (!paired) {
    return (
      <section id="overview" className={shellClass}>
        {editorial ? (
          <SectionIntro label="Overview" title={data.title} showRule={false} titleSerif />
        ) : (
          <>
            <p className="eyebrow">Overview</p>
            <h2 className="headline-section headline-serif max-w-3xl text-balance">{data.title}</h2>
          </>
        )}
        <p className="mt-5 max-w-3xl text-base leading-relaxed md:text-lg">
          <span className="font-semibold text-foreground">{data.introduction}</span>{" "}
          <span className="text-body">{data.description}</span>
        </p>
        {downloads && downloads.length > 0 && !isAudit && (
          <DownloadPills
            id="downloads"
            downloads={downloads}
            className="mt-8 max-w-5xl"
            siteVersion={siteVersion}
          />
        )}
      </section>
    );
  }

  if (editorial) {
    if (isV5 && quickFacts) {
      return (
        <section
          id="overview"
          className="section-padding scroll-mt-[var(--nav-height,4.25rem)] scroll-pb-24 bg-background !pt-12 md:!pt-16 lg:!pt-20"
        >
          <div className="container-wide min-w-0 max-w-full">
            <V5OverviewLayouts
              data={data}
              facts={quickFacts.facts}
              variant={data.overviewSectionLayout ?? "bento-poster"}
            />

            {data.brochureUrl && (
              <SectionBrochureLink
                url={data.brochureUrl}
                label={data.brochureLabel ?? "Open Brochure"}
                className="mt-10 md:mt-14"
              />
            )}

            {downloads && downloads.length > 0 && !isAudit && (
              <DownloadPills
                id="downloads"
                downloads={downloads}
                className="mt-10 md:mt-14"
                siteVersion={siteVersion}
              />
            )}
          </div>
        </section>
      );
    }

    const metricsBand = quickFacts ? (
      <div
        id="quickFacts"
        className="scroll-mt-[var(--nav-height,4rem)]"
      >
        {isV5 ? (
          <V5OverviewMetricsBand
            facts={getV5MetricsBandFacts(quickFacts)}
            variant="spotlight"
          />
        ) : (
          <V3MetricsBand facts={getMetricsBandFacts(quickFacts)} />
        )}
      </div>
    ) : null;

    const descriptionPanel = (
      <div className="v3-panel flex h-full flex-col">
        <p className="v3-panel-label">Description</p>
        <div className="flex-1">
          <p className="max-w-xl text-base leading-relaxed md:text-lg">
            <span className="font-semibold text-foreground">{data.introduction}</span>{" "}
            <span className="text-body">{data.description}</span>
          </p>
        </div>

        <div className="mt-auto pt-8">
          {(contact || videoUrl) && !isAudit && (
            <div className="flex items-end justify-between gap-4">
              {contact && (
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-mist md:h-12 md:w-12">
                    {contact.image && (
                      <Image
                        src={contact.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground md:text-base">
                      {contact.name}
                    </p>
                    <p className="truncate text-xs text-muted md:text-sm">{contact.role}</p>
                  </div>
                </div>
              )}

              {videoUrl && (
                <Link
                  href="#video"
                  className="group relative h-20 w-28 shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-mist md:h-24 md:w-32"
                  aria-label="Watch community video"
                >
                  {videoPoster && (
                    <Image
                      src={videoPoster}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="128px"
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/30">
                    <AppIcon
                      icon={UI_ICONS.play}
                      size={28}
                      className="fill-white text-white drop-shadow-sm"
                    />
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    );

    const visitPanel =
      showVisit && salesOffice ? (
        <div
          id="salesOffice"
          className="v3-panel flex h-full flex-col scroll-mt-[var(--nav-height,4rem)]"
        >
          <p className="v3-panel-label">Visit us</p>
          <h3 className="headline-section-v3 max-w-md text-2xl md:text-3xl">
            {salesOffice.title ?? "Plan your visit"}
          </h3>

          {isAudit && contact && (
            <div className="mt-6 md:mt-8">
              <SalesTeamContact contact={contact} />
            </div>
          )}

          <div className={cn("flex-1", (!isAudit || !contact) && "mt-6 md:mt-8")}>
            <SalesOfficeVisitDetails data={salesOffice} includeCta={false} />
          </div>
          <div className="mt-auto pt-8">
            <Button href="#registration">Book Appointment</Button>
          </div>
        </div>
      ) : null;

    const metricsBeforeGrid = isAudit && layout === "a" && metricsBand;
    const metricsAfterGrid =
      metricsBand &&
      ((isAudit && (layout === "b" || layout === "c")) || (!isAudit && layout !== "d"));

    return (
      <section
        id="overview"
        className={cn(
          "scroll-mt-[var(--nav-height,4.25rem)] scroll-pb-24 bg-background pb-14 pt-6 md:pb-20 md:pt-8 lg:pb-24",
          isAudit ? "px-6 md:px-10 lg:px-16" : shellClass,
          "!pt-4 md:!pt-5",
        )}
      >
        <div className={cn(isAudit && "container-wide min-w-0 max-w-full")}>
        <SectionIntro label="Overview" title={data.title} showRule={false} titleSerif />

        {metricsBeforeGrid && <div className="mb-6 md:mb-10 lg:mb-14">{metricsBand}</div>}

        {layout === "c" ? (
          <div className="space-y-10 lg:space-y-14">
            {descriptionPanel}
            {metricsBand}
            {visitPanel}
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-10 lg:items-stretch lg:gap-16",
              showVisit && "lg:grid-cols-2",
            )}
          >
            {descriptionPanel}
            {layout === "d" && metricsBand ? (
              <div className="flex flex-col gap-10">
                {visitPanel}
                {metricsBand}
              </div>
            ) : (
              visitPanel
            )}
          </div>
        )}

        {metricsAfterGrid && (
          <div className="mt-10 md:mt-14">{metricsBand}</div>
        )}

        {data.brochureUrl && (
          <SectionBrochureLink
            url={data.brochureUrl}
            label={data.brochureLabel ?? "Open Brochure"}
            className="mt-10 md:mt-14"
          />
        )}

        {downloads && downloads.length > 0 && !isAudit && (
          <DownloadPills
            id="downloads"
            downloads={downloads}
            className="mt-10 md:mt-14"
            siteVersion={siteVersion}
          />
        )}
        </div>
      </section>
    );
  }

  return (
    <section id="overview" className={cn(shellClass, "!pt-4 md:!pt-5")}>
      <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
        <article className="card-surface flex h-full min-h-[22rem] flex-col p-6 md:min-h-[26rem] md:p-8 lg:p-10">
          <p className="card-label">Overview</p>
          <h2 className="headline-section">Description</h2>
          <p className="mt-4 text-sm leading-relaxed text-body md:text-base">
            <span className="font-semibold text-foreground">{data.introduction}</span>{" "}
            {data.description}
          </p>

          {(contact || videoUrl) && (
            <div className="mt-auto flex items-end justify-between gap-4 pt-8 md:gap-6 md:pt-10">
              {contact && (
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-mist md:h-12 md:w-12">
                    {contact.image && (
                      <Image
                        src={contact.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground md:text-base">
                      {contact.name}
                    </p>
                    <p className="truncate text-xs text-muted md:text-sm">{contact.role}</p>
                  </div>
                </div>
              )}

              {videoUrl && (
                <Link
                  href="#video"
                  className="group relative h-20 w-28 shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-mist md:h-24 md:w-32"
                  aria-label="Watch community video"
                >
                  {videoPoster && (
                    <Image
                      src={videoPoster}
                      alt=""
                      fill
                      className="carousel-slide-hover object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="128px"
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/30">
                    <AppIcon
                      icon={UI_ICONS.play}
                      size={28}
                      className="fill-white text-white drop-shadow-sm"
                    />
                  </span>
                </Link>
              )}
            </div>
          )}
        </article>

        <article
          id="salesOffice"
          className="card-surface flex h-full min-h-[22rem] flex-col p-6 md:min-h-[26rem] md:p-8 lg:p-10"
        >
          <p className="card-label">Visit us</p>
          <h2 className="headline-section">
            {salesOffice?.title ?? "Plan your visit"}
          </h2>

          {salesOffice && (
            <>
              <div className="mt-6 flex-1 md:mt-8">
                <SalesOfficeVisitDetails data={salesOffice} includeCta={false} />
              </div>
              <div className="mt-auto flex items-end pt-8 md:pt-10">
                <Button href="#registration">Book Appointment</Button>
              </div>
            </>
          )}
        </article>
      </div>

      {downloads && downloads.length > 0 && !isAudit && (
        <DownloadPills
          id="downloads"
          downloads={downloads}
          className="mt-4 md:mt-5 lg:mt-6"
          siteVersion={siteVersion}
        />
      )}
    </section>
  );
}
