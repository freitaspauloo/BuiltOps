import type { HomeModel } from "@/lib/types/model";
import { getModelNavSections } from "@/lib/model-nav";
import { CommunityFooter } from "@/components/sections/v6/snapshot/community-footer";
import { RegistrationSection } from "@/components/sections/registration-section";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";
import { ModelNav } from "./model-nav";
import { ModelHero } from "./model-hero";
import { ModelFloorplansSection } from "./model-floorplans-section";
import { ModelTourSection } from "./model-tour-section";
import { SimilarModelsSection } from "./similar-models-section";
import { AvailableAtSection } from "./available-at-section";

const SITE_VERSION = "v6" as const;

function ModelDescriptionSection({ model }: { model: HomeModel }) {
  return (
    <SectionShell id="overview" siteVersion={SITE_VERSION} reveal={false}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <SectionIntro
          label="Details"
          title={model.intro}
          className="mb-0"
          showRule={false}
        />
        <div className="space-y-5">
          {model.description.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="prose-editorial">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function ModelPage({
  model,
  fromParam,
  lotParam,
}: {
  model: HomeModel;
  fromParam?: string;
  lotParam?: string;
}) {
  const navSections = getModelNavSections(model);

  const sections = [
    <ModelDescriptionSection key="overview" model={model} />,
    <ModelFloorplansSection key="floorplan" model={model} />,
    <ModelTourSection key="tour" model={model} />,
    <SimilarModelsSection key="similarModels" model={model} fromParam={fromParam} />,
    <AvailableAtSection key="availableAt" model={model} highlightLot={lotParam} />,
    <RegistrationSection key="registration" data={model.registration} siteVersion={SITE_VERSION} />,
  ];

  return (
    <>
      <ModelNav
        sections={navSections}
        brochures={model.brochures}
      />

      <main className="relative bg-background">
        <ModelHero model={model} />
        {sections.map((section, index) => (
          <div key={section.key} className={index > 0 ? "v3-section-divider" : undefined}>
            {section}
          </div>
        ))}
      </main>

      <CommunityFooter />
    </>
  );
}
