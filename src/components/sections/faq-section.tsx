"use client";

import { useCallback, useRef } from "react";
import type { FaqItem } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionShell } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { AppIcon, UI_ICONS, getSectionIcon } from "@/lib/icons";

const CARD_GAP = 16;

export function FaqSection({
  items,
  siteVersion = "v2",
}: {
  items: FaqItem[];
  siteVersion?: MicrositeVersionId;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("article");
    const step = card ? card.offsetWidth + CARD_GAP : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  if (items.length === 0) return null;

  return (
    <SectionShell id="faq" siteVersion={siteVersion}>
      <ScrollReveal>
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="headline-section text-balance">Frequently Asked Questions</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-body md:text-lg">
              Find answers to common questions about the community, homes, and move-in process.
            </p>
          </div>

          {items.length > 1 && (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Previous questions"
                onClick={() => scrollByCard(-1)}
                className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
              >
                <AppIcon icon={UI_ICONS.chevronLeft} size={18} />
              </button>
              <button
                type="button"
                aria-label="Next questions"
                onClick={() => scrollByCard(1)}
                className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
              >
                <AppIcon icon={UI_ICONS.chevronRight} size={18} />
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08} y={40}>
        <div
          ref={trackRef}
          className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16"
        >
          {items.map((item) => (
            <article
              key={item.question}
              className="card-surface flex w-[min(85vw,22rem)] shrink-0 snap-start flex-col p-7 sm:w-[24rem] lg:w-[calc(33.333%-0.67rem)] lg:min-w-[18rem]"
            >
              <AppIcon icon={getSectionIcon("faq")} size={20} className="mb-5 text-primary" />
              <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">
                {item.question}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-body sm:text-base">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
