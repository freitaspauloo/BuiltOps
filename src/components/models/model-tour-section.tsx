"use client";

import { useState } from "react";
import Image from "next/image";
import type { HomeModel } from "@/lib/types/model";
import { Button } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";
import { AppIcon, UI_ICONS } from "@/lib/icons";

export function ModelTourSection({ model }: { model: HomeModel }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SectionShell id="tour" siteVersion="v6" reveal={false}>
      <SectionIntro
        label="Virtual tour"
        title={`Walk the ${model.name}`}
        description={
          model.tourUrl
            ? "Step inside from anywhere — explore the full interior in 3D."
            : "An interactive 3D walkthrough is on its way. Book a private showing to tour the model in person."
        }
        showRule={false}
        className="mb-6 md:mb-8"
      />

      {model.tourUrl ? (
        <>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-foreground md:aspect-video">
            <iframe
              src={model.tourUrl}
              title={`${model.name} virtual tour`}
              className="absolute inset-0 h-full w-full border-0"
              allow="fullscreen; xr-spatial-tracking"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={() => setExpanded(true)}>
              Open full screen
            </Button>
          </div>

          {expanded ? (
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-foreground"
              role="dialog"
              aria-modal="true"
              aria-label={`${model.name} virtual tour`}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-sm font-medium text-white">{model.name} — 3D tour</p>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-white transition-colors hover:bg-white/10"
                  aria-label="Close tour"
                >
                  <AppIcon icon={UI_ICONS.close} size={20} />
                </button>
              </div>
              <iframe
                src={model.tourUrl}
                title={`${model.name} virtual tour full screen`}
                className="min-h-0 flex-1 border-0"
                allow="fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          ) : null}
        </>
      ) : (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-mist">
          <Image
            src={model.heroImage}
            alt={`${model.name} exterior rendering`}
            fill
            className="object-cover object-center opacity-60"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-foreground/35 px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/85">
              3D tour coming soon
            </p>
            <Button href="#registration" variant="hero" size="lg">
              Book an in-person tour
            </Button>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
