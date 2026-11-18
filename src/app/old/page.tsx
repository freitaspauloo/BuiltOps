import Link from "next/link";
import {
  archiveCommunityHref,
  communityHref,
  micrositeVersions,
} from "@/lib/site-versions";

export default function OldArchiveIndexPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 font-body">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
        Archive
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground">Version playground</h1>
      <p className="mt-3 text-sm leading-relaxed text-body">
        Frozen microsite versions and design lab. Production lives at{" "}
        <Link href={communityHref("benchmark")} className="text-primary underline-offset-2 hover:underline">
          /communities/benchmark
        </Link>
        .
      </p>

      <section className="mt-10 space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Benchmark versions</h2>
        <ul className="divide-y divide-border rounded-[var(--radius-card)] border border-border">
          {micrositeVersions.map((version) => (
            <li key={version.id}>
              <Link
                href={archiveCommunityHref("benchmark", version.id)}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-fog"
              >
                <span>
                  <span className="font-medium text-foreground">{version.label}</span>
                  <span className="mt-0.5 block text-xs text-muted">{version.description}</span>
                </span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-muted">
                  {version.frozen ? "Frozen" : "Current"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8">
        <Link
          href="/old/design"
          className="text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          Design system lab →
        </Link>
      </p>
    </main>
  );
}
