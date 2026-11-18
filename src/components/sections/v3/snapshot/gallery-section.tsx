import type { GalleryImage } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { GalleryBentoGrid } from "./gallery-bento-grid";

export function GallerySection({
  images,
  videoUrl,
  siteVersion = "v3",
}: {
  images: GalleryImage[];
  videoUrl?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (images.length === 0 && !videoUrl) return null;

  return (
    <SectionShell id="gallery" siteVersion={siteVersion} reveal={false}>
      <SectionHeaderSplit
        eyebrow={videoUrl ? "Media" : "Gallery"}
        title={videoUrl ? "Video & gallery" : "Community gallery"}
        description={
          videoUrl
            ? "Watch the community video and browse interiors, exteriors, and neighbourhood."
            : "Interiors, exteriors, and neighbourhood."
        }
        siteVersion={siteVersion}
        showRule={false}
      />

      <GalleryBentoGrid images={images} videoUrl={videoUrl} />
    </SectionShell>
  );
}
