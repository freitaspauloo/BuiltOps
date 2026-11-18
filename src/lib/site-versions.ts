export type MicrositeVersionId = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v6b";

export type MicrositeVersion = {
  id: MicrositeVersionId;
  label: string;
  description: string;
  /** When true, preserved for comparison only — do not modify its dedicated components. */
  frozen?: boolean;
};

/**
 * Production routes always render v6. Archive versions live under `/old`.
 * @see src/components/sections/v6/README.md
 */
export const micrositeVersions: MicrositeVersion[] = [
  {
    id: "v6",
    label: "v6",
    description: "Production microsite (also browsable in /old archive)",
  },
  {
    id: "v6b",
    label: "v6b",
    description: "Archive — v6 landing without inventory",
    frozen: true,
  },
  {
    id: "v5",
    label: "v5",
    description: "Jul 7 content pass — frozen snapshot",
    frozen: true,
  },
  {
    id: "v4",
    label: "v4",
    description: "Audit improvement pass — frozen snapshot",
    frozen: true,
  },
  {
    id: "v3",
    label: "v3",
    description: "Editorial redesign — frozen for comparison",
    frozen: true,
  },
  {
    id: "v2",
    label: "v2",
    description: "Pre-redesign Benchmark microsite — frozen for comparison",
    frozen: true,
  },
  {
    id: "v1",
    label: "v1",
    description: "Original ship (fb6212b) — frozen for comparison",
    frozen: true,
  },
];

export const DEFAULT_MICROSITE_VERSION: MicrositeVersionId = "v6";

/** Git commit that v1 was frozen from. */
export const V1_SNAPSHOT_COMMIT = "fb6212b";

export function isFrozenMicrositeVersion(version: MicrositeVersionId): boolean {
  return micrositeVersions.find((v) => v.id === version)?.frozen === true;
}

/** Editorial design language (v3+). */
export function isEditorialVersion(version: MicrositeVersionId): boolean {
  return (
    version === "v3" ||
    version === "v4" ||
    version === "v5" ||
    version === "v6" ||
    version === "v6b"
  );
}

/** Audit-era features (hero meta, metrics band, nav). */
export function isAuditMicrositeVersion(version: MicrositeVersionId): boolean {
  return version === "v4" || version === "v5" || version === "v6" || version === "v6b";
}

export function isV5MicrositeVersion(version: MicrositeVersionId): boolean {
  return version === "v5";
}

/** v6 design family — v6b shares components/CSS with v6. */
export function isV6MicrositeVersion(version: MicrositeVersionId): boolean {
  return version === "v6" || version === "v6b";
}

/**
 * DOM / CSS design token version. v6b reuses v6 styles via data-microsite-version="v6".
 */
export function designMicrositeVersion(version: MicrositeVersionId): MicrositeVersionId {
  return version === "v6b" ? "v6" : version;
}

/**
 * Landing duplicate of v6 with inventory sections removed (Scott):
 * model cards, lot inventory, move-in homes, promos, similar community cards.
 */
export const V6B_HIDDEN_INVENTORY_SECTIONS = new Set([
  "floorplans",
  "quickMoveIn",
  "sitePlan",
  "promotions",
  "similarCommunities",
]);

export function isInventoryHiddenForVersion(version: string | undefined): boolean {
  return version === "v6b";
}

/** Production community URL — always v6, no version query. */
export function communityHref(slug: string) {
  return `/communities/${slug}`;
}

/** Multi-version archive under `/old`. */
export function archiveCommunityHref(
  slug: string,
  version: MicrositeVersionId = DEFAULT_MICROSITE_VERSION,
) {
  return `/old/communities/${slug}?version=${version}`;
}

export function isMicrositeVersionId(value: string | null | undefined): value is MicrositeVersionId {
  return (
    value === "v1" ||
    value === "v2" ||
    value === "v3" ||
    value === "v4" ||
    value === "v5" ||
    value === "v6" ||
    value === "v6b"
  );
}

export function parseMicrositeVersion(value: string | null | undefined): MicrositeVersionId {
  if (isMicrositeVersionId(value)) return value;
  return DEFAULT_MICROSITE_VERSION;
}

export const previewDestinations = [
  { id: "design", label: "Design system", href: "/old/design" },
] as const;

export function modelHref(
  slug: string,
  params?: { from?: string; lot?: string },
) {
  const search = new URLSearchParams();
  if (params?.from) search.set("from", params.from);
  if (params?.lot) search.set("lot", params.lot);
  const query = search.toString();
  return `/models/${slug}${query ? `?${query}` : ""}`;
}

/** Seeded model pages surfaced in the preview switcher. */
export const modelPreviewLinks = [
  { slug: "esprit-end", label: "Esprit End", description: "Townhome model page (Benchmark)" },
  { slug: "marigold", label: "Marigold", description: "Detached model — elevation selector" },
] as const;
