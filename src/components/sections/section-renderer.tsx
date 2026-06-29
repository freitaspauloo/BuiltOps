import type { Community, SectionId } from "@/lib/types/community";
import { getOrderedSections, isSectionVisible } from "@/lib/sections/visibility";
import { parseMicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { HeroSection } from "./hero-section";
import { StickyNav } from "./sticky-nav";
import { OverviewSection } from "./overview-section";
import { VisionSection } from "./vision-section";
import { QuickFactsSection } from "./quick-facts-section";
import { VideoSection } from "./video-section";
import { GallerySection } from "./gallery-section";
import { AreaMapSection } from "./area-map-section";
import { AmenitiesSection } from "./amenities-section";
import { FeaturesSection } from "./features-section";
import { SitePlanSection } from "./site-plan-section";
import { FloorplansSection } from "./floorplans-section";
import { QuickMoveInSection } from "./quick-move-in-section";
import { DownloadsSection } from "./downloads-section";
import { PromotionsSection } from "./promotions-section";
import { SalesOfficeSection } from "./sales-office-section";
import { TimelineSection } from "./timeline-section";
import { DesignCentreSection } from "./design-centre-section";
import { TestimonialsSection } from "./testimonials-section";
import { EventsSection } from "./events-section";
import { FaqSection } from "./faq-section";
import { RegistrationSection } from "./registration-section";
import { SimilarCommunitiesSection } from "./similar-communities-section";
import { HeroSectionV1 } from "./v1/hero-section-v1";
import { StickyNavV1 } from "./v1/sticky-nav-v1";
import { OverviewSectionV1 } from "./v1/overview-section-v1";
import { AmenitiesSectionV1 } from "./v1/amenities-section-v1";
import { AreaMapSectionV1 } from "./v1/area-map-section-v1";
import { RegistrationSectionV1 } from "./v1/registration-section-v1";

function renderSection(
  community: Community,
  id: SectionId,
  siteVersion: MicrositeVersionId,
) {
  switch (id) {
    case "vision":
      return community.vision ? (
        <VisionSection data={community.vision} siteVersion={siteVersion} />
      ) : null;
    case "overview":
      return community.overview ? (
        siteVersion === "v1" ? (
          <OverviewSectionV1
            data={community.overview}
            quickFacts={community.quickFacts}
            videoUrl={community.videoUrl}
            videoPoster={community.gallery?.[0]?.url ?? community.hero.heroImage}
            contact={community.salesOffice?.team?.[0]}
          />
        ) : (
          <OverviewSection
            data={community.overview}
            quickFacts={community.quickFacts}
            videoUrl={community.videoUrl}
            videoPoster={community.gallery?.[0]?.url ?? community.hero.heroImage}
            contact={community.salesOffice?.team?.[0]}
          />
        )
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
      return community.areaMap ? (
        siteVersion === "v1" ? (
          <AreaMapSectionV1 data={community.areaMap} />
        ) : (
          <AreaMapSection data={community.areaMap} siteVersion={siteVersion} />
        )
      ) : null;
    case "amenities":
      return community.amenities ? (
        siteVersion === "v1" ? (
          <AmenitiesSectionV1 data={community.amenities} />
        ) : (
          <AmenitiesSection data={community.amenities} siteVersion={siteVersion} />
        )
      ) : null;
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
      return siteVersion === "v1" ? (
        <RegistrationSectionV1 data={community.registration} />
      ) : (
        <RegistrationSection data={community.registration} />
      );
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

export function SectionRenderer({ community }: { community: Community }) {
  const siteVersion = parseMicrositeVersion(community.micrositeVersion);
  const ordered = getOrderedSections(community);
  const isV1 = siteVersion === "v1";

  return (
    <>
      <div className="hero-frame-sides min-w-0 max-w-full">
        {isV1 ? <StickyNavV1 community={community} /> : <StickyNav community={community} />}
      </div>
      {isSectionVisible(community, "hero") && (
        <div className="hero-frame-inset min-w-0 max-w-full pt-0">
          {isV1 ? <HeroSectionV1 data={community.hero} /> : <HeroSection data={community.hero} />}
        </div>
      )}
      {ordered.map((id) => (
        <div key={id}>{renderSection(community, id, siteVersion)}</div>
      ))}
    </>
  );
}
