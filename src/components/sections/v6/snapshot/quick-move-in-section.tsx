"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { QuickMoveInHome, CommunityHero, DownloadAsset } from "@/lib/types/community";
import {
  isAuditMicrositeVersion,
  isEditorialVersion,
  isV6MicrositeVersion,
  type MicrositeVersionId,
} from "@/lib/site-versions";
import { COMPARE_MODELS_URL } from "@/lib/connected-experience";
import { cn } from "@/lib/utils/cn";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import { QuickMoveInCard } from "./quick-move-in-card";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { getSpecPillIcons, AppIcon, UI_ICONS } from "@/lib/icons";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { useLandingInventoryCap } from "@/lib/hooks/use-landing-inventory-cap";

export function QuickMoveInSection({
  homes,
  siteVersion = "v3",
  hero: _hero,
  downloads: _downloads,
}: {
  homes: QuickMoveInHome[];
  siteVersion?: MicrositeVersionId;
  hero?: CommunityHero;
  downloads?: DownloadAsset[];
}) {
  const spec = getSpecPillIcons();
  const editorial = isEditorialVersion(siteVersion);
  const isAudit = isAuditMicrositeVersion(siteVersion);
  const isV5 = isV6MicrositeVersion(siteVersion);
  const [showAllHomes, setShowAllHomes] = useState(false);
  const reduceMotion = useReducedMotion();
  const inventoryCap = useLandingInventoryCap();

  const baseHomes = homes.slice(0, inventoryCap);
  const extraHomes = homes.slice(inventoryCap);
  const hasInventoryOverflow = isV5 && homes.length > inventoryCap;

  useEffect(() => {
    setShowAllHomes(false);
  }, [inventoryCap]);

  if (homes.length === 0) return null;

  if (isV5) {
    return (
      <SectionShell id="quickMoveIn" siteVersion={siteVersion} reveal={false}>
        <div className="mb-8 flex flex-col items-start gap-3 text-left md:mb-10">
          <ScrollReveal>
            <SectionIntro
              label="Inventory"
              title="Move-in ready homes"
              description="Available for immediate or near-term occupancy at Benchmark Towns."
              showRule={false}
              className="mb-0"
            />
          </ScrollReveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {baseHomes.map((home) => (
            <QuickMoveInCard key={home.id} home={home} />
          ))}
          <AnimatePresence initial={false}>
            {showAllHomes &&
              extraHomes.map((home, index) => (
                <motion.div
                  key={home.id}
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
                  <QuickMoveInCard home={home} />
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
              aria-expanded={showAllHomes}
              onClick={() => setShowAllHomes((open) => !open)}
            >
              {showAllHomes ? "Show less" : "Show all"}
              <AppIcon
                icon={UI_ICONS.chevronDown}
                size={16}
                className={cn(
                  "transition-transform duration-300 ease-out",
                  showAllHomes && "-rotate-180",
                )}
                aria-hidden
              />
            </Button>
          )}
          <Button href={COMPARE_MODELS_URL} variant="secondary" size="md">
            Compare models
          </Button>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="quickMoveIn" siteVersion={siteVersion} reveal={false}>
      {editorial ? (
        <SectionIntro
          label="Inventory"
          title="Move-in ready homes"
          description="Available for immediate or near-term occupancy at Benchmark Towns."
          showRule={false}
          className="mb-8 md:mb-10"
        />
      ) : (
        <SectionHeaderSplit
          eyebrow="Inventory"
          title="Move-in ready homes"
          description="Available for immediate or near-term occupancy."
          siteVersion={siteVersion}
        />
      )}
      {isAudit ? (
        <div className="flex flex-wrap justify-center gap-5">
          {homes.map((home) => (
            <article key={home.id} className="w-[min(88vw,18.125rem)]">
              <QuickMoveInCard home={home} />
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {homes.map((home) => (
            <article
              key={home.id}
              className={
                editorial
                  ? "overflow-hidden rounded-[var(--radius-card)] border border-border bg-background"
                  : `${cardSurfaceClass(siteVersion)} group overflow-hidden`
              }
            >
              <CardPhotoLens
                src={home.image}
                alt={home.address}
                aspectClass="aspect-[16/10]"
                imageRadius="top"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground">{home.address}</h3>
                <PillGroup size="sm" className="mt-3">
                  <Pill size="sm" icon={spec.moveIn}>
                    Quick move-in
                  </Pill>
                  <Pill size="sm" icon={spec.beds}>
                    {home.beds} beds
                  </Pill>
                  <Pill size="sm" icon={spec.baths}>
                    {home.baths} baths
                  </Pill>
                  <Pill size="sm" icon={spec.sqft}>
                    {home.sqft.toLocaleString()} sqft
                  </Pill>
                  <Pill size="sm" icon={spec.possession}>
                    {home.possessionDate}
                  </Pill>
                </PillGroup>
                <p className="mt-3 text-lg font-semibold text-foreground">{home.price}</p>
                <p className="mt-1 text-sm text-muted">Lot {home.lot}</p>
                <Button href="#registration" size="sm" className="mt-4 w-full">
                  Book showing
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
