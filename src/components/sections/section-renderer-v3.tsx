import type { Community, SectionId } from "@/lib/types/community";
import { getOrderedSections, isSectionVisible } from "@/lib/sections/visibility";
import { StickyNav } from "./sticky-nav";
import { OverviewSection } from "./overview-section";
import { VisionSection } from "./vision-section";
import { QuickFactsBentoSection } from "./quick-facts-bento-section";
import { VideoSection } from "./video-section";
import { AreaMapSection } from "./area-map-section";
import { QuickMoveInSection } from "./quick-move-in-section";
import { DownloadsSection } from "./downloads-section";
import { PromotionsSection } from "./promotions-section";
import { SalesOfficeSection } from "./sales-office-section";
import { TimelineSection } from "./timeline-section";
import { DesignCentreSection } from "./design-centre-section";
import { EventsSection } from "./events-section";
import { SimilarCommunitiesSection } from "./similar-communities-section";
import { HeroSection } from "./v3/snapshot/hero-section";
import { GallerySection } from "./v3/snapshot/gallery-section";
import { AmenitiesSection } from "./v3/snapshot/amenities-section";
import { FeaturesSection } from "./v3/snapshot/features-section";
import { SitePlanSection } from "./v3/snapshot/site-plan-section";
import { FloorplansSection } from "./v3/snapshot/floorplans-section";
import { DesignRegistrationSection } from "./v3/snapshot/design-registration-section";
import { TestimonialsSection } from "./v3/snapshot/testimonials-section";
import { FaqSection } from "./v3/snapshot/faq-section";
import { RegistrationSection } from "./v3/snapshot/registration-section";

/** Frozen v3 Benchmark microsite (editorial redesign) — do not edit. */
function renderSection(community: Community, id: SectionId) {
  switch (id) {
    case "vision":
      return community.vision ? (
        <VisionSection data={community.vision} siteVersion="v3" />
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
          siteVersion="v3"
        />
      ) : null;
    case "quickFacts":
      if (!community.quickFacts?.facts.length) return null;
      if (community.overview) return null;
      return <QuickFactsBentoSection data={community.quickFacts} siteVersion="v3" />;
    case "salesOffice":
      return community.overview &&
        community.quickFacts?.facts.length &&
        community.salesOffice
        ? null
        : community.salesOffice
          ? <SalesOfficeSection data={community.salesOffice} siteVersion="v3" />
          : null;
    case "promotions":
      return community.promotions ? (
        <PromotionsSection promotions={community.promotions} siteVersion="v3" />
      ) : null;
    case "quickMoveIn":
      return community.quickMoveIn ? (
        <QuickMoveInSection homes={community.quickMoveIn} siteVersion="v3" />
      ) : null;
    case "floorplans":
      return community.floorplans ? (
        <FloorplansSection floorplans={community.floorplans} siteVersion="v3" />
      ) : null;
    case "sitePlan":
      return community.sitePlan ? (
        <SitePlanSection data={community.sitePlan} siteVersion="v3" />
      ) : null;
    case "video":
      return community.videoUrl && !community.gallery?.length ? (
        <VideoSection url={community.videoUrl} siteVersion="v3" />
      ) : null;
    case "gallery":
      return community.gallery?.length || community.videoUrl ? (
        <GallerySection
          images={community.gallery ?? []}
          videoUrl={community.videoUrl}
          siteVersion="v3"
        />
      ) : null;
    case "areaMap":
      return community.areaMap ? (
        <AreaMapSection data={community.areaMap} siteVersion="v3" />
      ) : null;
    case "amenities":
      return community.amenities ? (
        <AmenitiesSection
          data={community.amenities}
          siteVersion="v3"
          image={community.gallery?.[0]?.url ?? community.hero.heroImage}
        />
      ) : null;
    case "features":
      return community.features ? (
        <FeaturesSection
          data={community.features}
          images={(community.gallery ?? []).map((image) => image.url)}
          siteVersion="v3"
        />
      ) : null;
    case "downloads":
      return community.overview && community.downloads?.length ? null : community.downloads ? (
        <DownloadsSection downloads={community.downloads} siteVersion="v3" />
      ) : null;
    case "timeline":
      return community.timeline ? (
        <TimelineSection milestones={community.timeline} siteVersion="v3" />
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
        <DesignCentreSection data={community.designCentre} siteVersion="v3" />
      ) : null;
    case "testimonials":
      return community.testimonials ? (
        <TestimonialsSection items={community.testimonials} siteVersion="v3" />
      ) : null;
    case "events":
      return community.events ? (
        <EventsSection events={community.events} siteVersion="v3" />
      ) : null;
    case "faq":
      return community.faq ? (
        <FaqSection
          items={community.faq}
          image="/images/hero-benchmark-townhouse.png"
          siteVersion="v3"
        />
      ) : null;
    case "registration":
      return community.designCentre ? null : (
        <RegistrationSection data={community.registration} siteVersion="v3" />
      );
    case "similarCommunities":
      return community.similarCommunities ? (
        <SimilarCommunitiesSection
          communities={community.similarCommunities}
          siteVersion="v3"
        />
      ) : null;
    default:
      return null;
  }
}

export function SectionRendererV3({ community }: { community: Community }) {
  const ordered = getOrderedSections(community);
  const showHero = isSectionVisible(community, "hero");

  return (
    <>
      <StickyNav community={community} siteVersion="v3" />

      {showHero && <HeroSection data={community.hero} editorial />}

      <div className="relative z-10 bg-background">
        {ordered.map((id, index) => (
          <div key={id} className={index > 0 ? "v3-section-divider" : undefined}>
            {renderSection(community, id)}
          </div>
        ))}
      </div>
    </>
  );
}
