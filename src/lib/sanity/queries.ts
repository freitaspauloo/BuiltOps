export const communityBySlugQuery = `
  *[_type == "community" && slug.current == $slug][0] {
    "slug": slug.current,
    stage,
    micrositeVersion,
    sectionOrder,
    hero {
      communityName,
      statusBadge,
      city,
      priceFrom,
      homeTypes,
      heroImage,
      heroVideoUrl,
      "primaryCta": { "label": primaryCtaLabel, "href": "#registration" },
      "secondaryCta": select(defined(secondaryCtaLabel) => { "label": secondaryCtaLabel, "href": "#downloads" })
    },
    snapshot,
    vision,
    overview,
    quickFacts,
    videoUrl,
    gallery,
    areaMap,
    amenities,
    features,
    sitePlan,
    floorplans,
    quickMoveIn,
    downloads,
    promotions,
    salesOffice,
    timeline,
    designCentre,
    testimonials,
    events,
    faq,
    registration,
    similarCommunities
  }
`;

export const allCommunitiesQuery = `
  *[_type == "community"] | order(hero.communityName asc) {
    "slug": slug.current,
    stage,
    "name": hero.communityName,
    "city": hero.city,
    "priceFrom": hero.priceFrom,
    "image": hero.heroImage
  }
`;

export const homeModelBySlugQuery = `
  *[_type == "homeModel" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    homeType,
    collection,
    beds,
    baths,
    sqft,
    storeys,
    garage,
    priceFrom,
    estimatedPayment,
    paymentDisclaimer,
    heroImage,
    factSheetUrl,
    intro,
    description,
    elevations,
    floorLevels,
    floorplanPdfUrl,
    tourUrl,
    brochures,
    similarModels,
    availableAt,
    registration
  }
`;

export const allHomeModelSlugsQuery = `
  *[_type == "homeModel" && defined(slug.current)].slug.current
`;
