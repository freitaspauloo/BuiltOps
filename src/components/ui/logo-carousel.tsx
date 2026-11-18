"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

export interface CarouselItem {
  name: string;
  description?: string;
}

const SLOT_WIDTH = 280;
const SLOT_HEIGHT = 132;
const INITIAL_DELAY = 2500;
const SLOT_STAGGER = 150;
const CYCLE_INTERVAL = 3000;

type CarouselVariant = "muted" | "dark";

const variantStyles: Record<CarouselVariant, { name: string; description: string }> = {
  muted: {
    name: "text-foreground",
    description: "text-body",
  },
  dark: {
    name: "text-white",
    description: "text-white/72",
  },
};

function useSlotCount(): number {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mqLg.matches) setCount(3);
      else if (mqMd.matches) setCount(2);
      else setCount(1);
    };

    update();
    mqMd.addEventListener("change", update);
    mqLg.addEventListener("change", update);

    return () => {
      mqMd.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return count;
}

function useItemCycle(items: CarouselItem[], initialDelay: number, enabled: boolean) {
  const [step, setStep] = useState(0);
  const current = items[step % items.length];

  useEffect(() => {
    if (!enabled || items.length <= 1) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let startedAt = 0;
    let remaining = step === 0 ? initialDelay : CYCLE_INTERVAL;

    const schedule = (delay: number) => {
      remaining = delay;
      startedAt = Date.now();
      timeoutId = setTimeout(() => setStep((s) => s + 1), delay);
    };

    const pause = () => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
        timeoutId = null;
        remaining = Math.max(0, remaining - (Date.now() - startedAt));
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) pause();
      else schedule(remaining);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!document.hidden) schedule(remaining);

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled, items.length, step, initialDelay]);

  return { current, hasCycled: step > 0 };
}

function FeatureSlot({
  items,
  slotIndex,
  variant = "muted",
}: {
  items: CarouselItem[];
  slotIndex: number;
  variant?: CarouselVariant;
}) {
  const reducedMotion = useReducedMotion();
  const { current: item, hasCycled } = useItemCycle(
    items,
    INITIAL_DELAY + slotIndex * SLOT_STAGGER,
    items.length > 1,
  );
  const styles = variantStyles[variant];

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={item.name}
      className="flex items-center justify-center overflow-hidden px-2"
      style={{
        width: SLOT_WIDTH,
        height: SLOT_HEIGHT,
        marginBlock: -12,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={item.name}
          initial={
            !hasCycled
              ? false
              : reducedMotion
                ? { opacity: 0 }
                : { y: 20, opacity: 0, filter: "blur(8px)" }
          }
          animate={
            reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1, filter: "blur(0px)" }
          }
          exit={
            reducedMotion ? { opacity: 0 } : { y: -20, opacity: 0, filter: "blur(8px)" }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex w-full flex-col items-center justify-center text-center will-change-[filter] backface-hidden"
        >
          <p
            className={cn(
              "font-display text-2xl leading-tight tracking-tight md:text-[1.65rem]",
              styles.name,
            )}
          >
            {item.name}
          </p>
          {item.description && (
            <p className={cn("mt-2 max-w-[16rem] text-sm leading-relaxed", styles.description)}>
              {item.description}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function LogoCarousel({
  items,
  className,
  variant = "muted",
  ariaLabel = "Builder highlights",
}: {
  items: CarouselItem[];
  className?: string;
  variant?: CarouselVariant;
  ariaLabel?: string;
}) {
  const slotCount = useSlotCount();

  const slotItems = useMemo(() => {
    if (items.length === 0) return [];

    return Array.from({ length: Math.min(slotCount, items.length) }, (_, slot) =>
      items.filter((_, i) => i % Math.min(slotCount, items.length) === slot),
    );
  }, [items, slotCount]);

  if (items.length === 0) return null;

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("flex items-center justify-center gap-2 md:gap-4", className)}
    >
      {slotItems.map((slot, i) => (
        <FeatureSlot key={i} items={slot} slotIndex={i} variant={variant} />
      ))}
    </motion.div>
  );
}
