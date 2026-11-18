"use client";

import { useRowLabel } from "@payloadcms/ui";

const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  sold: "Sold",
  future: "Future",
  hold: "Hold",
};

const STATUS_COLOR: Record<string, string> = {
  available: "#16a34a",
  sold: "#94a3b8",
  future: "#2563eb",
  hold: "#d97706",
};

/** Lot rows: “Lot 79 — Available · Medium”. */
export default function LotRowLabel() {
  const { data, rowNumber } = useRowLabel<{
    lotNumber?: string;
    status?: string;
    markerSize?: string;
    price?: string;
  }>();

  const lot = data?.lotNumber ? `Lot ${data.lotNumber}` : `Lot ${String(rowNumber).padStart(2, "0")}`;
  const status = data?.status ? STATUS_LABEL[data.status] || data.status : "";
  const size =
    data?.markerSize === "sm"
      ? "Small"
      : data?.markerSize === "lg"
        ? "Large"
        : data?.markerSize
          ? "Medium"
          : "";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      {data?.status ? (
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: STATUS_COLOR[data.status] || "#94a3b8",
            flexShrink: 0,
          }}
          aria-hidden
        />
      ) : null}
      <strong>{lot}</strong>
      {status ? <span style={{ opacity: 0.7 }}>{status}</span> : null}
      {size ? <span style={{ opacity: 0.55, fontSize: "0.85em" }}>· {size}</span> : null}
      {data?.price ? <span style={{ opacity: 0.55, fontSize: "0.85em" }}>· {data.price}</span> : null}
    </span>
  );
}
