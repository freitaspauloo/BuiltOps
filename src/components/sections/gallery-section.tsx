import type { GalleryImage, CommunityHero, DownloadAsset } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { isV5MicrositeVersion } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GalleryBentoGrid } from "./gallery-bento-grid";

export function GallerySection({
  images,
  videoUrl,
  siteVersion = "v3",
  hero: _hero,
  downloads: _downloads,
}: {
  images: GalleryImage[];
  videoUrl?: string;
  siteVersion?: MicrositeVersionId;
  hero?: CommunityHero;
  downloads?: DownloadAsset[];
}) {
  if (images.length === 0 && !videoUrl) return null;

  const header = (
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
      className="mb-8 md:mb-10"
    />
  );

  return (
    <SectionShell id="gallery" siteVersion={siteVersion} reveal={false}>
      {isV5MicrositeVersion(siteVersion) ? <ScrollReveal>{header}</ScrollReveal> : header}

      <GalleryBentoGrid images={images} videoUrl={videoUrl} />
    </SectionShell>
  );
}
