export type MicrositeVersionId = "v1" | "v2";

export type MicrositeVersion = {
  id: MicrositeVersionId;
  label: string;
  description: string;
};

export const micrositeVersions: MicrositeVersion[] = [
  {
    id: "v1",
    label: "v1",
    description: "Initial Benchmark layout",
  },
  {
    id: "v2",
    label: "v2",
    description: "Polished design & interactions",
  },
];

export const DEFAULT_MICROSITE_VERSION: MicrositeVersionId = "v2";

export function communityHref(slug: string, version: MicrositeVersionId = DEFAULT_MICROSITE_VERSION) {
  return `/communities/${slug}?version=${version}`;
}

export function parseMicrositeVersion(value: string | null | undefined): MicrositeVersionId {
  if (value === "v1" || value === "v2") return value;
  return DEFAULT_MICROSITE_VERSION;
}

export const previewDestinations = [
  { id: "design", label: "Design system", href: "/design" },
] as const;
