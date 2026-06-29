import type { DownloadAsset } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";
import { AppIcon, UI_ICONS } from "@/lib/icons";

export function DownloadsSection({
  downloads,
  siteVersion = "v2",
}: {
  downloads: DownloadAsset[];
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="downloads" siteVersion={siteVersion}>
      <SectionHeaderSplit eyebrow="Resources" title="Downloads" siteVersion={siteVersion} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {downloads.map((file) => (
          <a
            key={file.title}
            href={file.url}
            className={`${cardSurfaceClass(siteVersion)} flex items-start gap-3 p-5 text-sm`}
          >
            <AppIcon icon={UI_ICONS.file} size={20} className="mt-0.5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="font-medium">{file.title}</p>
              <p className="mt-1 text-xs text-muted">{file.type}</p>
            </div>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
