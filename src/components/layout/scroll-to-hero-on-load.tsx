"use client";

import { useLayoutEffect } from "react";

/** Full reload / bfcache restore — always start at the hero (top of page). */
export function ScrollToHeroOnLoad() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToHero = () => {
      window.scrollTo(0, 0);
    };

    scrollToHero();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) scrollToHero();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
