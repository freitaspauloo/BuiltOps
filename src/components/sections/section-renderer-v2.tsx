import type { Community, SectionId } from "@/lib/types/community";
import { getOrderedSections, isSectionVisible } from "@/lib/sections/visibility";
import { HeroSection } from "./v2/snapshot/hero-section";
import { StickyNav } from "./v2/snapshot/sticky-nav";
import { OverviewSection } from "./v2/snapshot/overview-section";
import { VisionSection } from "./v2/snapshot/vision-section";
import { QuickFactsBentoSection } from "./v2/snapshot/quick-facts-bento-section";
import { VideoSection } from "./v2/snapshot/video-section";
import { GallerySection } from "./v2/snapshot/gallery-section";
import { AreaMapSection } from "./v2/snapshot/area-map-section";
import { AmenitiesSection } from "./v2/snapshot/amenities-section";
import { FeaturesSection } from "./v2/snapshot/features-section";
import { SitePlanSection } from "./v2/snapshot/site-plan-section";
import { FloorplansSection } from "./v2/snapshot/floorplans-section";
import { QuickMoveInSection } from "./v2/snapshot/quick-move-in-section";
import { DownloadsSection } from "./v2/snapshot/downloads-section";
import { PromotionsSection } from "./v2/snapshot/promotions-section";
import { SalesOfficeSection } from "./v2/snapshot/sales-office-section";
import { TimelineSection } from "./v2/snapshot/timeline-section";
import { DesignCentreSection } from "./v2/snapshot/design-centre-section";
import { DesignRegistrationSection } from "./v2/snapshot/design-registration-section";
import { TestimonialsSection } from "./v2/snapshot/testimonials-section";
import { EventsSection } from "./v2/snapshot/events-section";
import { FaqSection } from "./v2/snapshot/faq-section";
import { RegistrationSection } from "./v2/snapshot/registration-section";
import { SimilarCommunitiesSection } from "./v2/snapshot/similar-communities-section";

/** Frozen v2 Benchmark microsite — do not edit. */
function renderSection(community: Community, id: SectionId) {
  switch (id) {
    case "vision":
      return community.vision ? (
        <VisionSection data={community.vision} siteVersion="v2" />
      ) : null;
    case "overview":
      return community.overview ? (
        <OverviewSection
          data={community.overview}
          quickFacts={community.quickFacts}
          salesOffice={community.salesOffice}
          downloads={community.downloads}
          videoUrl={community.videoUrl}
          videoPoster={community.gallery?.[0]?.url ?? community.hero.heroImage}
          contact={community.salesOffice?.team?.[0]}
        />
      ) : null;
    case "quickFacts":
      return community.quickFacts?.facts.length ? (
        <QuickFactsBentoSection data={community.quickFacts} siteVersion="v2" />
      ) : null;
    case "salesOffice":
      return community.overview &&
        community.quickFacts?.facts.length &&
        community.salesOffice
        ? null
        : community.salesOffice
          ? <SalesOfficeSection data={community.salesOffice} siteVersion="v2" />
          : null;
    case "promotions":
      return community.promotions ? (
        <PromotionsSection promotions={community.promotions} siteVersion="v2" />
      ) : null;
    case "quickMoveIn":
      return community.quickMoveIn ? (
        <QuickMoveInSection homes={community.quickMoveIn} siteVersion="v2" />
      ) : null;
    case "floorplans":
      return community.floorplans ? (
        <FloorplansSection floorplans={community.floorplans} siteVersion="v2" />
      ) : null;
    case "sitePlan":
      return community.sitePlan ? (
        <SitePlanSection data={community.sitePlan} siteVersion="v2" />
      ) : null;
    case "video":
      return community.videoUrl && !community.gallery?.length ? (
        <VideoSection url={community.videoUrl} siteVersion="v2" />
      ) : null;
    case "gallery":
      return community.gallery?.length || community.videoUrl ? (
        <GallerySection
          images={community.gallery ?? []}
          videoUrl={community.videoUrl}
          siteVersion="v2"
        />
      ) : null;
    case "areaMap":
      return community.areaMap ? (
        <AreaMapSection data={community.areaMap} siteVersion="v2" />
      ) : null;
    case "amenities":
      return community.amenities ? (
        <AmenitiesSection data={community.amenities} siteVersion="v2" />
      ) : null;
    case "features":
      return community.features ? (
        <FeaturesSection data={community.features} siteVersion="v2" />
      ) : null;
    case "downloads":
      return community.overview && community.downloads?.length ? null : community.downloads ? (
        <DownloadsSection downloads={community.downloads} siteVersion="v2" />
      ) : null;
    case "timeline":
      return community.timeline ? (
        <TimelineSection milestones={community.timeline} siteVersion="v2" />
      ) : null;
    case "designCentre":
      return community.designCentre && community.registration ? (
        <DesignRegistrationSection
          designCentre={community.designCentre}
          registration={community.registration}
          backgroundImage={
            community.hero.heroImage ??
            community.designCentre.image ??
            community.gallery?.[0]?.url ??
            ""
          }
        />
      ) : community.designCentre ? (
        <DesignCentreSection data={community.designCentre} siteVersion="v2" />
      ) : null;
    case "testimonials":
      return community.testimonials ? (
        <TestimonialsSection items={community.testimonials} siteVersion="v2" />
      ) : null;
    case "events":
      return community.events ? (
        <EventsSection events={community.events} siteVersion="v2" />
      ) : null;
    case "faq":
      return community.faq ? (
        <FaqSection
          items={community.faq}
          image="/images/hero-benchmark-townhouse.png"
          siteVersion="v2"
        />
      ) : null;
    case "registration":
      return community.designCentre ? null : (
        <RegistrationSection data={community.registration} />
      );
    case "similarCommunities":
      return community.similarCommunities ? (
        <SimilarCommunitiesSection
          communities={community.similarCommunities}
          siteVersion="v2"
        />
      ) : null;
    default:
      return null;
  }
}

export function SectionRendererV2({ community }: { community: Community }) {
  const ordered = getOrderedSections(community);
  const showHero = isSectionVisible(community, "hero");

  return (
    <>
      <StickyNav community={community} />

      {showHero && (
        <HeroSection data={community.hero} quickFacts={community.quickFacts} />
      )}

      <div className="relative z-10 bg-background">
        {ordered.map((id) => (
          <div key={id}>{renderSection(community, id)}</div>
        ))}
      </div>
    </>
  );
}
