"use client";

import Image from "next/image";
import type { Community } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { AppIcon, getAmenityIcon } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";

function amenityId(title: string, index: number) {
  return `amenity-${index}-${title.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}`;
}

function AmenityAccordionIcon() {
  return (
    <span className="v3-amenity-accordion-icon relative ml-auto flex h-8 w-8 shrink-0 items-center justify-center border border-accent/35 text-accent">
      <Plus
        strokeWidth={1.5}
        className="absolute size-3.5 transition-all duration-200 ease-out group-data-[state=open]:rotate-90 group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0"
        aria-hidden
      />
      <Minus
        strokeWidth={1.5}
        className="absolute size-3.5 rotate-90 scale-75 opacity-0 transition-all duration-200 ease-out group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100"
        aria-hidden
      />
    </span>
  );
}

export function AmenitiesSection({
  data,
  image,
  siteVersion = "v3",
}: {
  data: NonNullable<Community["amenities"]>;
  image?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (siteVersion === "v3") {
    return (
      <SectionShell id="amenities" siteVersion={siteVersion} reveal={false}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className={cn(!image && "lg:col-span-2 lg:max-w-3xl")}>
            <SectionIntro
              label="Lifestyle"
              title={data.title}
              description="Everything that makes this neighbourhood worth calling home."
              showRule={false}
            />

            <Accordion
              type="single"
              collapsible
              defaultValue={amenityId(data.items[0]?.title ?? "item", 0)}
              className="mt-8 border-t border-border"
            >
              {data.items.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  value={amenityId(item.title, index)}
                  className="v3-amenity-item"
                >
                  <AccordionTrigger className="v3-amenity-trigger v3-accordion-trigger text-base sm:text-lg">
                    <span className="v3-amenity-icon" aria-hidden>
                      <AppIcon icon={getAmenityIcon(item.icon)} size={16} className="text-white" />
                    </span>
                    <span className="min-w-0 flex-1 font-medium group-data-[state=open]:font-semibold">
                      {item.title}
                    </span>
                    <AmenityAccordionIcon />
                  </AccordionTrigger>
                  <AccordionContent className="v3-amenity-content text-sm leading-relaxed text-body sm:text-base">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {image && (
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist lg:sticky lg:top-[calc(var(--nav-height,4rem)+2rem)]">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="amenities" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Lifestyle"
        title={data.title}
        description="Everything that makes this neighbourhood worth calling home."
        siteVersion={siteVersion}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {data.items.map((item) => (
          <article key={item.title} className="card-interactive p-7 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center bg-primary-muted text-primary">
                <AppIcon icon={getAmenityIcon(item.icon)} size={20} />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-body md:text-base">{item.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
