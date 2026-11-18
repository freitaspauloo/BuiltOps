import type { DownloadAsset } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { DownloadPills } from "./download-pills";

export function DownloadsSection({
  downloads,
  siteVersion = "v3",
}: {
  downloads: DownloadAsset[];
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="downloads" siteVersion={siteVersion} reveal={false}>
      <SectionHeaderSplit eyebrow="Resources" title="Downloads" siteVersion={siteVersion} />
      <DownloadPills downloads={downloads} siteVersion={siteVersion} />
    </SectionShell>
  );
}
