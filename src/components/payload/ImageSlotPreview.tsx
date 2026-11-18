"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormFields } from "@payloadcms/ui";

type Props = {
  path: string;
  mediaField?: string;
  urlField?: string;
  label?: string;
};

function joinPath(base: string, name: string) {
  if (!base) return name;
  const parent = base.includes(".") ? base.replace(/\.[^.]+$/, "") : "";
  return parent ? `${parent}.${name}` : name;
}

/**
 * Compact thumbnail for image slots — sits beside the upload field in a row.
 */
export default function ImageSlotPreview(props: Props) {
  const mediaField = props.mediaField || "media";
  const urlField = props.urlField?.trim() || "";
  const mediaPath = joinPath(props.path, mediaField);
  const urlPath = urlField ? joinPath(props.path, urlField) : "";

  const mediaValue = useFormFields(([fields]) => fields[mediaPath]?.value);
  const urlValue = useFormFields(([fields]) =>
    urlPath ? fields[urlPath]?.value : undefined,
  );

  const [resolvedUrl, setResolvedUrl] = useState<string>("");
  const [kind, setKind] = useState<"image" | "video" | "empty">("empty");

  const fallbackUrl = typeof urlValue === "string" ? urlValue.trim() : "";

  const mediaId = useMemo(() => {
    if (typeof mediaValue === "number" || typeof mediaValue === "string") return mediaValue;
    if (mediaValue && typeof mediaValue === "object" && "id" in mediaValue) {
      return (mediaValue as { id: string | number }).id;
    }
    return null;
  }, [mediaValue]);

  const mediaObjectUrl = useMemo(() => {
    if (mediaValue && typeof mediaValue === "object") {
      const doc = mediaValue as {
        url?: string;
        mimeType?: string;
        sizes?: Record<string, { url?: string }>;
      };
      return doc.sizes?.thumb?.url || doc.sizes?.card?.url || doc.url || "";
    }
    return "";
  }, [mediaValue]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (mediaObjectUrl) {
        if (!cancelled) {
          setResolvedUrl(mediaObjectUrl);
          setKind(mediaObjectUrl.match(/\.(mp4|webm|mov)(\?|$)/i) ? "video" : "image");
        }
        return;
      }

      if (mediaId != null) {
        try {
          const res = await fetch(`/api/media/${mediaId}?depth=0`, {
            credentials: "include",
          });
          if (!res.ok) throw new Error("media fetch failed");
          const doc = (await res.json()) as {
            url?: string;
            mimeType?: string;
            sizes?: Record<string, { url?: string }>;
          };
          const next = doc.sizes?.thumb?.url || doc.sizes?.card?.url || doc.url || "";
          if (!cancelled) {
            setResolvedUrl(next);
            setKind(
              doc.mimeType?.startsWith("video/") || next.match(/\.(mp4|webm|mov)(\?|$)/i)
                ? "video"
                : "image",
            );
          }
          return;
        } catch {
          // fall through
        }
      }

      if (fallbackUrl) {
        if (!cancelled) {
          setResolvedUrl(fallbackUrl);
          setKind(fallbackUrl.match(/\.(mp4|webm|mov)(\?|$)/i) ? "video" : "image");
        }
        return;
      }

      if (!cancelled) {
        setResolvedUrl("");
        setKind("empty");
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [mediaId, mediaObjectUrl, fallbackUrl]);

  const empty = kind === "empty" || !resolvedUrl;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 148,
        borderRadius: "0.5rem",
        border: "1px solid var(--theme-elevation-150)",
        background: "var(--theme-elevation-50)",
        overflow: "hidden",
      }}
      title={props.label || "Preview"}
    >
      <div
        style={{
          aspectRatio: "4 / 3",
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(135deg, var(--theme-elevation-100), var(--theme-elevation-50))",
          minHeight: 84,
        }}
      >
        {empty ? (
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--theme-elevation-600)",
              textAlign: "center",
              padding: "0.5rem",
              lineHeight: 1.3,
            }}
          >
            No image
          </span>
        ) : kind === "video" ? (
          <video
            src={resolvedUrl}
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolvedUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>
    </div>
  );
}
