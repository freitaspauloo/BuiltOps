"use client";

import { useRowLabel } from "@payloadcms/ui";

type MediaLike = {
  filename?: string | null;
  alt?: string | null;
  title?: string | null;
  url?: string | null;
  sizes?: Record<string, { url?: string | null } | null> | null;
};

function mediaThumbUrl(media: MediaLike | number | string | null | undefined): string {
  if (!media || typeof media !== "object") return "";
  return (
    media.sizes?.thumb?.url ||
    media.sizes?.card?.url ||
    media.url ||
    (media.filename ? `/media/${media.filename}` : "") ||
    ""
  );
}

function mediaLabel(media: MediaLike | number | string | null | undefined): string {
  if (!media || typeof media !== "object") return "";
  return media.title || media.alt || media.filename || "";
}

/** Gallery / elevation rows show a real thumbnail + label for every image. */
export default function MediaRowLabel() {
  const { data, rowNumber } = useRowLabel<{
    alt?: string;
    caption?: string;
    name?: string;
    url?: string;
    image?: string;
    media?: MediaLike | number | string;
    imageMedia?: MediaLike | number | string;
  }>();

  const media = data?.media || data?.imageMedia;
  const thumb =
    mediaThumbUrl(media) ||
    (typeof data?.url === "string" ? data.url : "") ||
    (typeof data?.image === "string" ? data.image : "");

  const label =
    data?.name ||
    data?.caption ||
    data?.alt ||
    mediaLabel(media) ||
    (thumb ? thumb.split("/").pop()?.split("?")[0] : "") ||
    `Image ${String(rowNumber).padStart(2, "0")}`;

  const hasAsset = Boolean(media || data?.url || data?.image || thumb);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span
        style={{
          width: 40,
          height: 28,
          borderRadius: 4,
          overflow: "hidden",
          background: hasAsset
            ? "linear-gradient(135deg,#1e3a5f,#334155)"
            : "var(--theme-elevation-150)",
          border: "1px solid var(--theme-elevation-200)",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
        }}
        aria-hidden
      >
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : null}
      </span>
      <span>{label}</span>
      {!hasAsset ? (
        <span style={{ opacity: 0.55, fontSize: "0.8em" }}>(empty)</span>
      ) : null}
    </span>
  );
}
