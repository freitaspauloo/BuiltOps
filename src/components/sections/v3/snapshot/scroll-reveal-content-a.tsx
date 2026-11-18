"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import type { AppIconType } from "@/lib/icons";
import { AppIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type ScrollRevealItem = {
  title: string;
  description: string;
  icon?: AppIconType;
};

type ScrollRevealContentAProps = React.ComponentProps<"div"> & {
  items: ScrollRevealItem[];
  eyebrow?: string;
  sectionTitle?: string;
};

/** Viewport height budget per feature step — lower = faster step changes while scrolling. */
const SCROLL_VH_PER_ITEM = 50;

const FEATURE_CARD_THEMES = [
  "v3-feature-card-primary",
  "v3-feature-card-accent",
  "v3-feature-card-green",
] as const;

function getActiveIndex(scrollProgress: number, count: number) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.max(0, Math.floor(scrollProgress * count)));
}

export function ScrollRevealContentA({
  items,
  eyebrow,
  sectionTitle,
  className,
  ...props
}: ScrollRevealContentAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const count = items.length;
  const scrollHeightVh = Math.max(count, 1) * SCROLL_VH_PER_ITEM;
  const activeIndex = getActiveIndex(scrollProgress, count);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setScrollProgress(value);
  });

  if (count === 0) return null;

  return (
    <div ref={containerRef} className={cn("relative", className)} {...props}>
      <div className="flex w-full">
        <div className="sticky top-[var(--nav-height,4rem)] h-[calc(100svh-var(--nav-height,4rem))] w-full">
          <div className="v3-feature-reveal-bleed relative h-full w-full overflow-hidden">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const theme = FEATURE_CARD_THEMES[index % FEATURE_CARD_THEMES.length];

              return (
                <article
                  key={item.title}
                  className={cn(
                    "v3-feature-reveal-card absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-[var(--ease-out-soft)]",
                    theme,
                    isActive
                      ? "translate-y-0 opacity-100"
                      : index < activeIndex
                        ? "-translate-y-3 opacity-0"
                        : "translate-y-3 opacity-0",
                  )}
                  aria-hidden={!isActive}
                >
                  <div className="hero-frame-sides flex max-w-3xl flex-col items-center justify-center px-6 py-28 text-center md:py-32">
                    {item.icon && (
                      <span className="v3-feature-reveal-icon mb-5 flex items-center justify-center md:mb-6">
                        <AppIcon icon={item.icon} size={28} className="text-white" />
                      </span>
                    )}
                    <h3 className="v3-feature-reveal-slide-title font-display font-medium leading-[1.02] tracking-tight whitespace-nowrap text-white">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80 md:mt-6 md:text-base">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}

            {(eyebrow || sectionTitle) && (
              <div className="v3-feature-reveal-header pointer-events-none absolute inset-x-0 top-0 z-10">
                <div className="hero-frame-sides pt-8 text-center md:pt-10">
                  {sectionTitle && (
                    <p className="v3-feature-reveal-eyebrow text-balance">{sectionTitle}</p>
                  )}
                  {eyebrow && !sectionTitle && (
                    <p className="v3-feature-reveal-eyebrow">{eyebrow}</p>
                  )}
                </div>
              </div>
            )}

            {count > 1 && (
              <div
                className="v3-feature-reveal-dots pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-2 pb-8 md:pb-10"
                aria-label={`Feature ${activeIndex + 1} of ${count}`}
              >
                {items.map((item, index) => (
                  <span
                    key={item.title}
                    className={cn(
                      "h-1.5 transition-all duration-300",
                      index === activeIndex ? "w-8 bg-white" : "w-1.5 bg-white/35",
                    )}
                    aria-hidden
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div aria-hidden style={{ height: `${scrollHeightVh}vh` }} className="w-px shrink-0" />
      </div>
    </div>
  );
}

export default ScrollRevealContentA;
