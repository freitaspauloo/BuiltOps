"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function useCarouselA11y(count: number, label: string) {
  const [active, setActive] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");

  const goPrev = useCallback(() => {
    setActive((i) => wrapIndex(i - 1, count));
  }, [count]);

  const goNext = useCallback(() => {
    setActive((i) => wrapIndex(i + 1, count));
  }, [count]);

  const goTo = useCallback(
    (index: number) => {
      setActive(wrapIndex(index, count));
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
