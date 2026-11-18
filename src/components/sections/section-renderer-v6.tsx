import type { Community, SectionId } from "@/lib/types/community";
import { getRenderedSections, isSectionVisible } from "@/lib/sections/visibility";
import { HeroSection } from "./v6/snapshot/hero-section";
import { StickyNav } from "./v6/snapshot/sticky-nav";
import { OverviewSection } from "./v6/snapshot/overview-section";
import { VisionSection } from "./v6/snapshot/vision-section";
import { QuickFactsBentoSection } from "./v6/snapshot/quick-facts-bento-section";
import { VideoSection } from "./v6/snapshot/video-section";
import { GallerySection } from "./v6/snapshot/gallery-section";
import { AreaMapSection } from "./v6/snapshot/area-map-section";
import { AmenitiesSection } from "./v6/snapshot/amenities-section";
import { FeaturesSection } from "./v6/snapshot/features-section";
import { SitePlanSection } from "./v6/snapshot/site-plan-section";
import { FloorplansSection } from "./v6/snapshot/floorplans-section";
import { QuickMoveInSection } from "./v6/snapshot/quick-move-in-section";
import { PromotionsSection } from "./v6/snapshot/promotions-section";
import { SalesOfficeSection } from "./v6/snapshot/sales-office-section";
import { TimelineSection } from "./v6/snapshot/timeline-section";
import { DesignCentreSection } from "./v6/snapshot/design-centre-section";
import { TestimonialsSection } from "./v6/snapshot/testimonials-section";
import { EventsSection } from "./v6/snapshot/events-section";
import { FaqSection } from "./v6/snapshot/faq-section";
import { RegistrationSection } from "./v6/snapshot/registration-section";
import { SimilarCommunitiesSection } from "./v6/snapshot/similar-communities-section";

const V6 = "v6" as const;

function renderSection(community: Community, id: SectionId) {
  const visitInRegistration = Boolean(community.registration && community.salesOffice);

  switch (id) {
    case "vision":
      return community.vision ? (
        <VisionSection data={community.vision} siteVersion={V6} />
      ) : null;
    case "overview":
      return community.overview ? (
        <OverviewSection
          data={community.overview}
          quickFacts={community.quickFacts}
          salesOffice={visitInRegistration ? undefined : community.salesOffice}
          downloads={community.downloads}
          contact={visitInRegistration ? undefined : community.salesOffice?.team?.[0]}
          stage={community.stage}
          siteVersion={V6}
          layoutOverride={community.overviewLayoutOverride}
        />
      ) : null;
    case "quickFacts":
      if (!community.quickFacts?.facts.length) return null;
      if (community.overview) return null;
      return <QuickFactsBentoSection data={community.quickFacts} siteVersion={V6} />;
    case "salesOffice":
      return community.overview &&
        community.quickFacts?.facts.length &&
        community.salesOffice
        ? null
        : community.salesOffice
          ? <SalesOfficeSection data={community.salesOffice} siteVersion={V6} />
          : null;
    case "promotions":
      return community.promotions ? (
        <PromotionsSection promotions={community.promotions} siteVersion={V6} />
      ) : null;
    case "quickMoveIn":
      return community.quickMoveIn ? (
        <QuickMoveInSection
          homes={community.quickMoveIn}
          siteVersion={V6}
          hero={community.hero}
          downloads={community.downloads}
        />
      ) : null;
    case "floorplans":
      return community.floorplans ? (
        <FloorplansSection
          floorplans={community.floorplans}
          siteVersion={V6}
          hero={community.hero}
          downloads={community.downloads}
        />
      ) : null;
    case "sitePlan":
      return community.sitePlan ? (
        <SitePlanSection
          data={community.sitePlan}
          floorplans={community.floorplans}
          communityName={community.hero.communityName}
          siteVersion={V6}
          hero={community.hero}
          downloads={community.downloads}
        />
      ) : null;
    case "video":
      return community.videoUrl && !community.gallery?.length ? (
        <VideoSection url={community.videoUrl} siteVersion={V6} />
      ) : null;
    case "gallery":
      return community.gallery?.length || community.videoUrl ? (
        <GallerySection
          images={community.gallery ?? []}
          videoUrl={community.videoUrl}
          siteVersion={V6}
          hero={community.hero}
          downloads={community.downloads}
        />
      ) : null;
    case "areaMap":
      return community.areaMap ? (
        <AreaMapSection data={community.areaMap} siteVersion={V6} />
      ) : null;
    case "amenities":
      return community.amenities ? (
        <AmenitiesSection
          data={community.amenities}
          siteVersion={V6}
          image={
            community.amenities.lifestyleImages?.[0]?.url ??
            community.gallery?.[0]?.url ??
            community.hero.heroImage
          }
          secondaryImage={
            community.amenities.lifestyleImages?.[1]?.url ??
            community.gallery?.[1]?.url
          }
        />
      ) : null;
    case "features":
      return community.features ? (
        <FeaturesSection
          data={community.features}
          images={(community.gallery ?? []).map((image) => image.url)}
          siteVersion={V6}
        />
      ) : null;
    case "downloads":
      return null;
    case "timeline":
      return community.timeline ? (
        <TimelineSection milestones={community.timeline} siteVersion={V6} />
      ) : null;
    case "designCentre":
      return community.designCentre ? (
        <DesignCentreSection data={community.designCentre} siteVersion={V6} />
      ) : null;
    case "testimonials":
      return community.testimonials ? (
        <TestimonialsSection items={community.testimonials} siteVersion={V6} />
      ) : null;
    case "events":
      return community.events ? (
        <EventsSection events={community.events} siteVersion={V6} />
      ) : null;
    case "faq":
      return community.faq ? (
        <FaqSection
          items={community.faq}
          image={community.hero.heroImage}
          siteVersion={V6}
        />
      ) : null;
    case "registration":
      // Visit+registration lives in CommunityFooterV6 (navy closing band).
      if (visitInRegistration) return null;
      return community.registration ? (
        <RegistrationSection data={community.registration} siteVersion={V6} />
      ) : null;
    case "similarCommunities":
      return community.similarCommunities ? (
        <SimilarCommunitiesSection
          communities={community.similarCommunities}
          siteVersion={V6}
        />
      ) : null;
    default:
      return null;
  }
}

/** Fully detached v6 renderer — imports only from `./v6/snapshot/`. Do not import root sections.
 *  Also used for v6b (same design; inventory sections filtered in visibility).
 */
export function SectionRendererV6({ community }: { community: Community }) {
  const ordered = getRenderedSections(community);
  const showHero = isSectionVisible(community, "hero");

  return (
    <>
      <StickyNav community={community} siteVersion={V6} />

      {showHero && (
        <HeroSection
          data={community.hero}
          downloads={community.downloads}
          editorial
          siteVersion={V6}
          stage={community.stage}
        />
      )}

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
