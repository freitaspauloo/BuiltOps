"use client";

import { useEffect, useLayoutEffect } from "react";

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Full reload / bfcache restore — always start at the hero (top of page). */
export function ScrollToHeroOnLoad() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollToTop();
  }, []);

  useEffect(() => {
    scrollToTop();

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      scrollToTop();
      raf2 = requestAnimationFrame(scrollToTop);
    });

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) scrollToTop();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
