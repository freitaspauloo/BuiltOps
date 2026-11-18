"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { HomeModel } from "@/lib/types/model";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { ModelKeyStats } from "@/components/models/model-key-stats";
import { cn } from "@/lib/utils/cn";

export function ModelHero({ model }: { model: HomeModel }) {
  const isDetached = model.homeType === "detached";
  const elevations = useMemo(
    () => (isDetached ? model.elevations : model.elevations.slice(0, 1)),
    [isDetached, model.elevations],
  );

  const [activeElevation, setActiveElevation] = useState(0);
  const activeImage = elevations[activeElevation]?.image ?? model.heroImage;
  const showElevationPicker = isDetached && elevations.length > 1;
  const active = elevations[activeElevation];

  return (
    <section
      id="hero"
      aria-label={`${model.name} hero`}
      className="border-b border-border bg-background"
    >
      <div className="container-wide grid gap-6 px-6 py-6 md:grid-cols-2 md:items-start md:gap-10 md:px-10 md:py-10 lg:gap-14 lg:px-16 lg:py-12">
        <div className="min-w-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist rounded-[var(--radius-card)]">
            <Image
              key={activeImage}
              src={activeImage}
              alt={active?.name ? `${model.name} — ${active.name}` : model.name}
              fill
              className="object-cover object-center transition-opacity duration-300"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {showElevationPicker ? (
            <div className="mt-4" role="group" aria-label="Choose elevation">
              <div className="flex gap-3 overflow-x-auto px-1 py-1 [-webkit-overflow-scrolling:touch] sm:gap-4">
                {elevations.map((elevation, index) => {
                  const selected = index === activeElevation;
                  return (
                    <button
                      key={elevation.id}
                      type="button"
                      onClick={() => setActiveElevation(index)}
                      className={cn(
                        "group flex w-[4.75rem] shrink-0 flex-col items-center gap-2 sm:w-[5.5rem]",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      )}
                      aria-label={`Show ${elevation.name} elevation`}
                      aria-pressed={selected}
                    >
                      <span
                        className={cn(
                          "relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-sm)] bg-mist transition-[opacity,box-shadow] duration-200",
                          selected
                            ? "opacity-100 shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_var(--color-primary)]"
                            : "opacity-45 group-hover:opacity-80",
                        )}
                      >
                        <Image
                          src={elevation.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="88px"
                        />
                      </span>
                      <span
                        className={cn(
                          "text-center text-[11px] font-medium leading-tight sm:text-xs",
                          selected ? "text-foreground" : "text-muted",
                        )}
                      >
                        {elevation.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-5 md:pt-1 lg:gap-6">
          {model.collection ? (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {model.collection}
            </p>
          ) : null}

          <div>
            <h1 className="font-heading text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              {model.name}
            </h1>
            <p className="mt-3 hidden text-base leading-relaxed text-body md:block">{model.intro}</p>
          </div>

          <ModelKeyStats model={model} />

          <CommunityCtaButtons
            primaryCta={{ label: "Book Appointment", href: "#registration" }}
            secondaryCta={
              model.brochures?.length
                ? { label: "Download Brochure", href: "#floorplan" }
                : { label: "View Floorplan", href: "#floorplan" }
            }
            downloads={model.brochures}
            tone="light"
            size="sm"
          />
        </div>
      </div>
    </section>
  );
}
