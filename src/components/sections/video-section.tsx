import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";

function embedUrl(url: string) {
  if (!url.includes("youtube.com/embed/")) return url;
  const [base, query = ""] = url.split("?");
  const params = new URLSearchParams(query);
  params.set("rel", "0");
  params.set("modestbranding", "1");
  return `${base}?${params.toString()}`;
}

export function VideoSection({
  url,
  siteVersion = "v2",
}: {
  url: string;
  siteVersion?: MicrositeVersionId;
}) {
  const src = embedUrl(url);

  return (
    <SectionShell id="video" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Video"
        title="Community video"
        description="Tour the neighbourhood, home designs, and lifestyle that define this community."
        siteVersion={siteVersion}
      />
      <div className="aspect-video overflow-hidden border border-border bg-card">
        <iframe
          src={src}
          title="Community video"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </SectionShell>
  );
}
