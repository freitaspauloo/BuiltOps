"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function getCarouselDirection(from: number, to: number, count: number): -1 | 0 | 1 {
  if (from === to || count <= 1) return 0;
  const forward = wrapIndex(from + 1, count) === to;
  return forward ? 1 : -1;
}

export function getSlideRole(
  index: number,
  active: number,
  count: number,
): "active" | "prev" | "next" | "hidden" {
  if (count === 1) return index === active ? "active" : "hidden";
  if (index === active) return "active";
  if (index === wrapIndex(active - 1, count)) return "prev";
  if (index === wrapIndex(active + 1, count)) return "next";
  return "hidden";
}

export function useCarouselA11y(count: number, label: string) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<-1 | 0 | 1>(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");

  const goPrev = useCallback(() => {
    setActive((current) => {
      const next = wrapIndex(current - 1, count);
      setDirection(getCarouselDirection(current, next, count));
      return next;
    });
  }, [count]);

  const goNext = useCallback(() => {
    setActive((current) => {
      const next = wrapIndex(current + 1, count);
      setDirection(getCarouselDirection(current, next, count));
      return next;
    });
  }, [count]);

  const goTo = useCallback(
    (index: number) => {
      setActive((current) => {
        const next = wrapIndex(index, count);
        setDirection(getCarouselDirection(current, next, count));
        return next;
      });
    },
    [count],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (count <= 1) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [count, goPrev, goNext],
  );

  useEffect(() => {
    setAnnouncement(`${label} ${active + 1} of ${count}`);
  }, [active, count, label]);

  return {
    active,
    direction,
    goPrev,
    goNext,
    goTo,
    onKeyDown,
    regionRef,
    announcement,
    regionProps: {
      ref: regionRef,
      role: "region" as const,
      "aria-roledescription": "carousel",
      "aria-label": label,
      tabIndex: 0,
      onKeyDown,
    },
  };
}
