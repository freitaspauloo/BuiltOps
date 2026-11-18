"use client";

import dynamic from "next/dynamic";
import type { GalleryImage } from "@/lib/types/community";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "./gallery-lightbox-yarl.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

const plugins = [Zoom, Thumbnails, Captions, Counter];

export function GalleryLightboxYarl({
  images,
  index,
  open,
  onOpenChange,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (index: number) => void;
}) {
  const slides = images.map((image) => ({
    src: image.url,
    alt: image.alt,
    title: image.caption ?? image.alt,
  }));

  if (images.length === 0) return null;

  return (
    <Lightbox
      open={open}
      close={() => onOpenChange(false)}
      index={index}
      slides={slides}
      plugins={plugins}
      on={{
        view: ({ index: next }) => onNavigate(next),
      }}
      carousel={{
        preload: 2,
        padding: 0,
        spacing: "8px",
        imageFit: "contain",
        imageProps: {
          style: {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          },
        },
      }}
      animation={{ fade: 280, swipe: 280 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
      thumbnails={{
        position: "bottom",
        width: 120,
        height: 80,
        border: 0,
        borderRadius: 8,
        padding: 0,
        gap: 12,
        imageFit: "cover",
        vignette: false,
      }}
      captions={{
        showToggle: false,
        descriptionTextAlign: "center",
      }}
      styles={{
        container: {
          backgroundColor: "rgba(12, 20, 23, 0.97)",
          // CSS vars override button chrome (no white fills)
          ["--yarl__button_background_color" as string]: "transparent",
          ["--yarl__button_filter" as string]: "none",
          ["--yarl__color_button" as string]: "rgba(255,255,255,0.92)",
          ["--yarl__color_button_active" as string]: "#fff",
        },
        slide: { padding: 0 },
        captionsTitleContainer: {
          background: "linear-gradient(to top, rgba(12,20,23,0.75), transparent)",
          padding: "1.25rem 1rem 0.75rem",
        },
        captionsTitle: {
          fontSize: "0.9rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          textAlign: "center",
        },
        navigationPrev: {
          background: "transparent",
          filter: "none",
          padding: "1rem",
        },
        navigationNext: {
          background: "transparent",
          filter: "none",
          padding: "1rem",
        },
        thumbnailsContainer: {
          backgroundColor: "rgba(12, 20, 23, 0.92)",
          paddingTop: "0.75rem",
        },
        thumbnailsTrack: { paddingBottom: "0.75rem" },
      }}
      className="builtops-yarl"
    />
  );
}
