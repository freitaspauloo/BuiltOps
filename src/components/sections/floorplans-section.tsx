"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Floorplan } from "@/lib/types/community";
import { withFloorplanLevels } from "@/lib/data/benchmark-floorplan-levels";
import { withFloorplanImages } from "@/lib/data/benchmark-floorplan-images";
import { isAuditMicrositeVersion, isEditorialVersion, isV5MicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { COMPARE_MODELS_URL } from "@/lib/connected-experience";
import { cn } from "@/lib/utils/cn";
import { ModelCard } from "@/components/ui/model-card";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import {
  CarouselNavButtons,
  HorizontalScrollTrack,
  useHorizontalScroll,
} from "@/components/ui/horizontal-scroll-track";
import { SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { Button } from "@/components/ui/button";
import { GalleryLightboxDialog } from "@/components/ui/gallery-lightbox";
import { Pill, PillGroup } from "@/components/ui/pill";
import { getSpecPillIcons, AppIcon, UI_ICONS } from "@/lib/icons";
import type { CommunityHero, DownloadAsset } from "@/lib/types/community";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { useLandingInventoryCap } from "@/lib/hooks/use-landing-inventory-cap";

function formatPhaseLabel(phase: string) {
  return phase.toUpperCase();
}

function floorplanAnchorId(planId: string) {
  return `floorplans-${planId}`;
}

function FloorplanCard({
  plan,
  siteVersion,
  onViewLevels,
}: {
  plan: Floorplan;
  siteVersion: MicrositeVersionId;
  onViewLevels?: () => void;
}) {
  const spec = getSpecPillIcons();
  const editorial = isEditorialVersion(siteVersion);
  const isAudit = isAuditMicrositeVersion(siteVersion);
  const isV5 = isV5MicrositeVersion(siteVersion);
  const hasLevels = Boolean(plan.levelGallery?.length);

  if (isAudit) {
    return (
      <article
        data-scroll-card
        id={floorplanAnchorId(plan.id)}
        className={cn(
          isV5MicrositeVersion(siteVersion) ? "h-full w-full" : "w-[min(88vw,18.125rem)] shrink-0 snap-start",
        )}
      >
        <ModelCard plan={plan} onExploreLevels={hasLevels ? onViewLevels : undefined} />
      </article>
    );
  }

  const cardBody = (
    <>
      <div className="v3-portfolio-tile relative">
        <CardPhotoLens
          src={plan.image}
          alt={plan.name}
          aspectClass="aspect-[4/3] h-full"
          enableLens={false}
          imageRadius="top"
        />
      </div>

      <div className="flex flex-1 flex-col border border-t-0 border-border p-5 md:p-6">
        <h3 className="text-lg font-semibold text-foreground md:text-xl">{plan.name}</h3>
        <p className="mt-2 text-base font-medium text-foreground">{plan.priceFrom}</p>

        <PillGroup size="sm" className="mt-4">
          {plan.phase && (
            <Pill size="sm" icon={spec.phase}>
              {formatPhaseLabel(plan.phase)}
            </Pill>
          )}
          <Pill size="sm" icon={spec.beds}>
            {plan.beds} beds
          </Pill>
          <Pill size="sm" icon={spec.baths}>
            {plan.baths} baths
          </Pill>
          <Pill size="sm" icon={spec.sqft}>
            {plan.sqft.toLocaleString()} sqft
          </Pill>
        </PillGroup>

        {isAudit && (
          <div
            className="mt-auto flex flex-wrap items-center gap-3 pt-5"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            role="presentation"
          >
            <Button size="sm" href="#registration">
              Inquire
            </Button>
            {hasLevels ? (
              <Button size="sm" variant="ghost" onClick={onViewLevels}>
                Floor plan
              </Button>
            ) : (
              plan.pdfUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  href={plan.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Floor plan (PDF)
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </>
  );

  if (editorial) {
    return (
      <article
        data-scroll-card
        id={isAudit ? floorplanAnchorId(plan.id) : undefined}
        className="v3-portfolio-card group shrink-0 snap-start text-left"
      >
        {cardBody}
      </article>
    );
  }

  return (
    <article
      data-scroll-card
      className={`${cardSurfaceClass(siteVersion)} group flex w-[min(88vw,24rem)] shrink-0 snap-start flex-col overflow-hidden sm:w-[26rem]`}
    >
      <CardPhotoLens src={plan.image} alt={plan.name} imageRadius="top" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
        <PillGroup size="sm" className="mt-3">
          {plan.phase && (
            <Pill size="sm" icon={spec.phase}>
              {plan.phase}
            </Pill>
          )}
          <Pill size="sm" icon={spec.beds}>
            {plan.beds} beds
          </Pill>
          <Pill size="sm" icon={spec.baths}>
            {plan.baths} baths
          </Pill>
          <Pill size="sm" icon={spec.sqft}>
            {plan.sqft.toLocaleString()} sqft
          </Pill>
        </PillGroup>
        <p className="mt-3 text-lg font-bold text-foreground">{plan.priceFrom}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Button size="sm" href="#registration">
            Inquire
          </Button>
          {plan.pdfUrl && (
            <Button size="sm" variant="ghost" href={plan.pdfUrl}>
              Floor plan
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function FloorplansSection({
  floorplans,
  siteVersion = "v3",
  hero: _hero,
  downloads: _downloads,
}: {
  floorplans: Floorplan[];
  siteVersion?: MicrositeVersionId;
  hero?: CommunityHero;
  downloads?: DownloadAsset[];
}) {
  const { trackRef, scrollPrev, scrollNext } = useHorizontalScroll();
  const [activePhase, setActivePhase] = useState<string>("all");
  const [showAllPlans, setShowAllPlans] = useState(false);
  const reduceMotion = useReducedMotion();
  const inventoryCap = useLandingInventoryCap();
  const isAudit = isAuditMicrositeVersion(siteVersion);
  const isV5 = isV5MicrositeVersion(siteVersion);

  const enrichedPlans = useMemo(() => {
    if (!isAudit) return floorplans;
    return withFloorplanLevels(withFloorplanImages(floorplans));
  }, [floorplans, isAudit]);

  const phases = useMemo(
    () =>
      Array.from(
        new Set(
          enrichedPlans
            .map((plan) => plan.phase)
            .filter((phase): phase is string => Boolean(phase)),
        ),
      ).sort(),
    [enrichedPlans],
  );

  const showPhaseTabs = isAudit && !isV5 && phases.length > 1;

  const filteredPlans =
    showPhaseTabs && activePhase !== "all"
      ? enrichedPlans.filter((plan) => plan.phase === activePhase)
      : enrichedPlans;

  const basePlans = filteredPlans.slice(0, inventoryCap);
  const extraPlans = filteredPlans.slice(inventoryCap);
  const hasInventoryOverflow = isV5 && filteredPlans.length > inventoryCap;

  const visiblePlans = filteredPlans;

  const [galleryPlanId, setGalleryPlanId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryPlan = useMemo(
    () => enrichedPlans.find((plan) => plan.id === galleryPlanId) ?? null,
    [galleryPlanId, enrichedPlans],
  );

  const openGallery = useCallback((planId: string) => {
    setLightboxIndex(0);
    setGalleryPlanId(planId);
  }, []);

  useEffect(() => {
    if (!isAudit) return;

    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      const fromHash = enrichedPlans.find((plan) => floorplanAnchorId(plan.id) === hash);
      if (fromHash?.levelGallery?.length) {
        setGalleryPlanId(fromHash.id);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [isAudit, enrichedPlans]);

  useEffect(() => {
    if (galleryPlanId && !enrichedPlans.some((plan) => plan.id === galleryPlanId)) {
      setGalleryPlanId(null);
    }
  }, [galleryPlanId, enrichedPlans]);

  useEffect(() => {
    setShowAllPlans(false);
  }, [activePhase, inventoryCap]);

  if (enrichedPlans.length === 0) return null;

  const navButtons =
    !isV5 && visiblePlans.length > 1 ? (
      <CarouselNavButtons
        onPrev={scrollPrev}
        onNext={scrollNext}
        prevLabel="Previous floorplan"
        nextLabel="Next floorplan"
      />
    ) : undefined;

  return (
    <SectionShell id="floorplans" siteVersion={siteVersion} reveal={false}>
      <div className="mb-8 flex flex-col items-center gap-3 text-center md:mb-10">
        <ScrollReveal>
          <SectionIntro
            label="Home designs"
            title="Floorplans & pricing"
            description="Browse floorplans and starting prices."
            showRule={false}
            className="mb-0"
          />
        </ScrollReveal>
        {navButtons}
        {showPhaseTabs && (
          <div
            className="flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Filter floorplans by phase"
          >
            {["all", ...phases].map((phase) => {
              const isActive = activePhase === phase;
              return (
                <button
                  key={phase}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActivePhase(phase)}
                  className={cn(
                    "rounded-[var(--radius-control)] border px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background text-body hover:border-primary hover:text-foreground",
                  )}
                >
                  {phase === "all" ? "All phases" : phase}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {isV5 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {basePlans.map((plan) => (
              <FloorplanCard
                key={plan.id}
                plan={plan}
                siteVersion={siteVersion}
                onViewLevels={() => openGallery(plan.id)}
              />
            ))}
            <AnimatePresence initial={false}>
              {showAllPlans &&
                extraPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    className="min-w-0"
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.28,
                      delay: reduceMotion ? 0 : index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <FloorplanCard
                      plan={plan}
                      siteVersion={siteVersion}
                      onViewLevels={() => openGallery(plan.id)}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {hasInventoryOverflow && (
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="gap-2"
                aria-expanded={showAllPlans}
                onClick={() => setShowAllPlans((open) => !open)}
              >
                {showAllPlans ? "Show less" : "Show all"}
                <AppIcon
                  icon={UI_ICONS.chevronDown}
                  size={16}
                  className={cn(
                    "transition-transform duration-300 ease-out",
                    showAllPlans && "-rotate-180",
                  )}
                  aria-hidden
                />
              </Button>
            )}
            <Button href={COMPARE_MODELS_URL} variant="primary" size="md">
              Compare models
            </Button>
          </div>
        </>
      ) : (
        <HorizontalScrollTrack trackRef={trackRef} bleedClassName="floorplans-carousel-bleed">
          {visiblePlans.map((plan) => (
            <FloorplanCard
              key={plan.id}
              plan={plan}
              siteVersion={siteVersion}
              onViewLevels={() => openGallery(plan.id)}
            />
          ))}
        </HorizontalScrollTrack>
      )}

      {isAudit && galleryPlan?.levelGallery && galleryPlan.levelGallery.length > 0 && (
        <GalleryLightboxDialog
          images={galleryPlan.levelGallery}
          index={lightboxIndex}
          open={galleryPlanId !== null}
          onOpenChange={(open) => {
            if (!open) setGalleryPlanId(null);
          }}
          onNavigate={setLightboxIndex}
        />
      )}

    </SectionShell>
  );
}
