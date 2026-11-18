import type { Community, SectionId } from "@/lib/types/community";
import { getOrderedSections, isSectionVisible } from "@/lib/sections/visibility";
import { VisionSection } from "./v1/snapshot/vision-section";
import { QuickFactsSection } from "./v1/snapshot/quick-facts-section";
import { VideoSection } from "./v1/snapshot/video-section";
import { GallerySection } from "./v1/snapshot/gallery-section";
import { FeaturesSection } from "./v1/snapshot/features-section";
import { SitePlanSection } from "./v1/snapshot/site-plan-section";
import { FloorplansSection } from "./v1/snapshot/floorplans-section";
import { QuickMoveInSection } from "./v1/snapshot/quick-move-in-section";
import { DownloadsSection } from "./v1/snapshot/downloads-section";
import { PromotionsSection } from "./v1/snapshot/promotions-section";
import { SalesOfficeSection } from "./v1/snapshot/sales-office-section";
import { TimelineSection } from "./v1/snapshot/timeline-section";
import { DesignCentreSection } from "./v1/snapshot/design-centre-section";
import { TestimonialsSection } from "./v1/snapshot/testimonials-section";
import { EventsSection } from "./v1/snapshot/events-section";
import { FaqSection } from "./v1/snapshot/faq-section";
import { SimilarCommunitiesSection } from "./v1/snapshot/similar-communities-section";
import { HeroSectionV1 } from "./v1/hero-section-v1";
import { StickyNavV1 } from "./v1/sticky-nav-v1";
import { OverviewSectionV1 } from "./v1/overview-section-v1";
import { AmenitiesSectionV1 } from "./v1/amenities-section-v1";
import { AreaMapSectionV1 } from "./v1/area-map-section-v1";
import { RegistrationSectionV1 } from "./v1/registration-section-v1";

/** Frozen at git commit fb6212b — original Benchmark ship. Do not edit. */
function renderSection(community: Community, id: SectionId) {
  const siteVersion = "v1" as const;

  switch (id) {
    case "vision":
      return community.vision ? (
        <VisionSection data={community.vision} siteVersion={siteVersion} />
      ) : null;
    case "overview":
      return community.overview ? (
        <OverviewSectionV1
          data={community.overview}
          quickFacts={community.quickFacts}
          videoUrl={community.videoUrl}
          videoPoster={community.gallery?.[0]?.url ?? community.hero.heroImage}
          contact={community.salesOffice?.team?.[0]}
        />
      ) : null;
    case "quickFacts":
      return community.overview && community.quickFacts?.facts.length
        ? null
        : community.quickFacts
          ? <QuickFactsSection data={community.quickFacts} siteVersion={siteVersion} />
          : null;
    case "salesOffice":
      return community.salesOffice ? (
        <SalesOfficeSection data={community.salesOffice} siteVersion={siteVersion} />
      ) : null;
    case "promotions":
      return community.promotions ? (
        <PromotionsSection promotions={community.promotions} siteVersion={siteVersion} />
      ) : null;
    case "quickMoveIn":
      return community.quickMoveIn ? (
        <QuickMoveInSection homes={community.quickMoveIn} siteVersion={siteVersion} />
      ) : null;
    case "floorplans":
      return community.floorplans ? (
        <FloorplansSection floorplans={community.floorplans} siteVersion={siteVersion} />
      ) : null;
    case "sitePlan":
      return community.sitePlan ? (
        <SitePlanSection data={community.sitePlan} siteVersion={siteVersion} />
      ) : null;
    case "video":
      return community.videoUrl ? (
        <VideoSection url={community.videoUrl} siteVersion={siteVersion} />
      ) : null;
    case "gallery":
      return community.gallery ? (
        <GallerySection images={community.gallery} siteVersion={siteVersion} />
      ) : null;
    case "areaMap":
      return community.areaMap ? <AreaMapSectionV1 data={community.areaMap} /> : null;
    case "amenities":
      return community.amenities ? <AmenitiesSectionV1 data={community.amenities} /> : null;
    case "features":
      return community.features ? (
        <FeaturesSection data={community.features} siteVersion={siteVersion} />
      ) : null;
    case "downloads":
      return community.downloads ? (
        <DownloadsSection downloads={community.downloads} siteVersion={siteVersion} />
      ) : null;
    case "timeline":
      return community.timeline ? (
        <TimelineSection milestones={community.timeline} siteVersion={siteVersion} />
      ) : null;
    case "designCentre":
      return community.designCentre ? (
        <DesignCentreSection data={community.designCentre} siteVersion={siteVersion} />
      ) : null;
    case "testimonials":
      return community.testimonials ? (
        <TestimonialsSection items={community.testimonials} siteVersion={siteVersion} />
      ) : null;
    case "events":
      return community.events ? (
        <EventsSection events={community.events} siteVersion={siteVersion} />
      ) : null;
    case "faq":
      return community.faq ? (
        <FaqSection items={community.faq} siteVersion={siteVersion} />
      ) : null;
    case "registration":
      return <RegistrationSectionV1 data={community.registration} />;
    case "similarCommunities":
      return community.similarCommunities ? (
        <SimilarCommunitiesSection
          communities={community.similarCommunities}
          siteVersion={siteVersion}
        />
      ) : null;
    default:
      return null;
  }
}

export function SectionRendererV1({ community }: { community: Community }) {
  const ordered = getOrderedSections(community);

  return (
    <>
      <div className="hero-frame-sides min-w-0 max-w-full">
        <StickyNavV1 community={community} />
      </div>
      {isSectionVisible(community, "hero") && (
        <div className="hero-frame-inset min-w-0 max-w-full pt-0">
          <HeroSectionV1 data={community.hero} />
        </div>
      )}
      {ordered.map((id) => (
        <div key={id}>{renderSection(community, id)}</div>
      ))}
    </>
  );
}
