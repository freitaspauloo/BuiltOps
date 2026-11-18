"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  communityHref,
  isFrozenMicrositeVersion,
  parseMicrositeVersion,
} from "@/lib/site-versions";

const FROZEN_LABELS: Record<string, string> = {
  v1: "Original ship (v1)",
  v2: "Pre-redesign microsite (v2)",
  v3: "Editorial redesign (v3)",
  v4: "Audit improvement pass (v4)",
  v5: "Jul 7 content pass (v5)",
  v6b: "v6 without inventory (v6b)",
};

export function FrozenVersionBanner() {
  const searchParams = useSearchParams();
  const version = parseMicrositeVersion(searchParams.get("version"));

  if (!isFrozenMicrositeVersion(version)) return null;

  return (
    <div className="border-b border-border bg-card/90 px-4 py-2 text-center text-xs text-body backdrop-blur-sm">
      <span className="font-medium text-foreground">
        {FROZEN_LABELS[version] ?? `Frozen snapshot (${version})`}
      </span>
      {" — archive only. "}
      <Link
        href={communityHref("benchmark")}
        className="font-medium text-primary underline-offset-2 hover:underline"
      >
        View production
      </Link>
    </div>
  );
}
