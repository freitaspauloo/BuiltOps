import type { Community, SectionId } from "@/lib/types/community";
import { getRenderedSections, isSectionVisible } from "@/lib/sections/visibility";
import { isAuditMicrositeVersion, parseMicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { HeroSection } from "./hero-section";
import { StickyNav } from "./sticky-nav";
import { OverviewSection } from "./overview-section";
import { VisionSection } from "./vision-section";
import { QuickFactsBentoSection } from "./quick-facts-bento-section";
import { VideoSection } from "./video-section";
import { GallerySection } from "./gallery-section";
import { AreaMapSection } from "./area-map-section";
import { AmenitiesSection } from "./amenities-section";
import { FeaturesSection } from "./features-section";
import { SitePlanSection } from "./site-plan-section";
import { FloorplansSection } from "./floorplans-section";
import { QuickMoveInSection } from "./quick-move-in-section";
import { PromotionsSection } from "./promotions-section";
import { SalesOfficeSection } from "./sales-office-section";
import { TimelineSection } from "./timeline-section";
import { DesignCentreSection } from "./design-centre-section";
import { VisitRegistrationSection } from "./visit-registration-section";
import { TestimonialsSection } from "./testimonials-section";
import { EventsSection } from "./events-section";
import { FaqSection } from "./faq-section";
import { RegistrationSection } from "./registration-section";
import { SimilarCommunitiesSection } from "./similar-communities-section";
import { SectionRendererV1 } from "./section-renderer-v1";
import { SectionRendererV2 } from "./section-renderer-v2";
import { SectionRendererV3 } from "./section-renderer-v3";
import { SectionRendererV6 } from "./section-renderer-v6";

function renderSection(community: Community, id: SectionId, siteVersion: MicrositeVersionId) {
  const isAudit = isAuditMicrositeVersion(siteVersion);
  const visitInRegistration = isAudit && community.registration && community.salesOffice;

  switch (id) {
    case "vision":
      return community.vision ? (
        <VisionSection data={community.vision} siteVersion={siteVersion} />
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
          siteVersion={siteVersion}
          layoutOverride={community.overviewLayoutOverride}
        />
      ) : null;
    case "quickFacts":
      if (!community.quickFacts?.facts.length) return null;
      if (community.overview) return null;
      return <QuickFactsBentoSection data={community.quickFacts} siteVersion={siteVersion} />;
    case "salesOffice":
      return community.overview &&
        community.quickFacts?.facts.length &&
        community.salesOffice
        ? null
        : community.salesOffice
          ? <SalesOfficeSection data={community.salesOffice} siteVersion={siteVersion} />
          : null;
    case "promotions":
      return community.promotions ? (
        <PromotionsSection promotions={community.promotions} siteVersion={siteVersion} />
      ) : null;
    case "quickMoveIn":
      return community.quickMoveIn ? (
        <QuickMoveInSection
          homes={community.quickMoveIn}
          siteVersion={siteVersion}
          hero={community.hero}
          downloads={community.downloads}
        />
      ) : null;
    case "floorplans":
      return community.floorplans ? (
        <FloorplansSection
          floorplans={community.floorplans}
          siteVersion={siteVersion}
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
          siteVersion={siteVersion}
          hero={community.hero}
          downloads={community.downloads}
        />
      ) : null;
    case "video":
      return community.videoUrl && !community.gallery?.length ? (
        <VideoSection url={community.videoUrl} siteVersion={siteVersion} />
      ) : null;
    case "gallery":
      return community.gallery?.length || community.videoUrl ? (
        <GallerySection
          images={community.gallery ?? []}
          videoUrl={community.videoUrl}
          siteVersion={siteVersion}
          hero={community.hero}
          downloads={community.downloads}
        />
      ) : null;
    case "areaMap":
      return community.areaMap ? (
        <AreaMapSection data={community.areaMap} siteVersion={siteVersion} />
      ) : null;
    case "amenities":
      return community.amenities ? (
        <AmenitiesSection
          data={community.amenities}
          siteVersion={siteVersion}
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
          siteVersion={siteVersion}
        />
      ) : null;
    case "downloads":
      return null;
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
        <FaqSection
          items={community.faq}
          image={community.hero.heroImage}
          siteVersion={siteVersion}
        />
      ) : null;
    case "registration":
      return visitInRegistration ? (
        <VisitRegistrationSection
          salesOffice={community.salesOffice!}
          registration={community.registration}
          contact={community.salesOffice?.team?.[0]}
          siteVersion={siteVersion}
        />
      ) : (
        <RegistrationSection data={community.registration} siteVersion={siteVersion} />
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

  if (siteVersion === "v1") {
    return <SectionRendererV1 community={community} />;
  }

  if (siteVersion === "v2") {
    return <SectionRendererV2 community={community} />;
  }

  if (siteVersion === "v3") {
    return <SectionRendererV3 community={community} />;
  }

  if (siteVersion === "v6" || siteVersion === "v6b") {
    return <SectionRendererV6 community={community} />;
  }

  const ordered = getRenderedSections(community);
  const showHero = isSectionVisible(community, "hero");

  return (
    <>
      <StickyNav community={community} siteVersion={siteVersion} />

      {showHero && (
        <HeroSection
          data={community.hero}
          downloads={community.downloads}
          editorial
          siteVersion={siteVersion}
          stage={community.stage}
        />
      )}

      <div className="relative z-10 bg-background">
        {ordered.map((id, index) => (
          <div key={id} className={index > 0 ? "v3-section-divider" : undefined}>
            {renderSection(community, id, siteVersion)}
          </div>
        ))}
      </div>
    </>
  );
}
