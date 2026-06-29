import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";

export function VideoSection({
  url,
  siteVersion = "v2",
}: {
  url: string;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="video" siteVersion={siteVersion}>
      <SectionHeaderSplit eyebrow="Video" title="Community video" siteVersion={siteVersion} />
      <div className="aspect-video overflow-hidden border border-border">
        <iframe src={url} title="Community video" className="h-full w-full" allowFullScreen />
      </div>
    </SectionShell>
  );
}
