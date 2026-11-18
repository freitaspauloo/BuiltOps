"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { Lens } from "@/components/ui/lens";
import { cn } from "@/lib/utils/cn";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServer() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
}

export function CardPhotoLens({
  src,
  alt,
  aspectClass = "aspect-[4/3]",
  className,
  sizes = "(max-width: 768px) 50vw, 400px",
  imageClassName,
  zoomFactor = 1.35,
  lensSize = 140,
  enableLens = true,
  /** Use "top" when the image sits above card body copy (square bottom edge). */
  imageRadius = "all",
}: {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  sizes?: string;
  imageClassName?: string;
  zoomFactor?: number;
  lensSize?: number;
  enableLens?: boolean;
  imageRadius?: "all" | "top";
}) {
  const reducedMotion = usePrefersReducedMotion();
  const useLens = enableLens && !reducedMotion;
  const radiusClass =
    imageRadius === "top"
      ? "rounded-t-[var(--radius-card)] rounded-b-none"
      : "rounded-[var(--radius-card)]";

  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", imageClassName)}
      sizes={sizes}
    />
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-card",
        radiusClass,
        aspectClass,
        className,
      )}
    >
      {!useLens ? (
        <div className="relative h-full w-full">{image}</div>
      ) : (
        <Lens
          zoomFactor={zoomFactor}
          lensSize={lensSize}
          ariaLabel={`Zoom ${alt}`}
          className={cn("absolute inset-0 h-full w-full", radiusClass)}
        >
          <div className="relative h-full w-full">{image}</div>
        </Lens>
      )}
    </div>
  );
}
