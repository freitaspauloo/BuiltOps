"use client";

import { useEffect, useState } from "react";

export const LANDING_INVENTORY_CAP_DESKTOP = 8;
export const LANDING_INVENTORY_CAP_MOBILE = 3;

const MOBILE_MEDIA_QUERY = "(max-width: 639px)";

export function useLandingInventoryCap() {
  const [cap, setCap] = useState(LANDING_INVENTORY_CAP_DESKTOP);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MEDIA_QUERY);

    const syncCap = () => {
      setCap(media.matches ? LANDING_INVENTORY_CAP_MOBILE : LANDING_INVENTORY_CAP_DESKTOP);
    };

    syncCap();
    media.addEventListener("change", syncCap);
    return () => media.removeEventListener("change", syncCap);
  }, []);

  return cap;
}
