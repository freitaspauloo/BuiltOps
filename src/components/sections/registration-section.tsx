import type { RegistrationForm } from "@/lib/types/community";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { RegistrationFormPanel } from "./registration-form";

export function RegistrationSection({
  data,
  siteVersion = "v3",
}: {
  data: RegistrationForm;
  siteVersion?: MicrositeVersionId;
}) {
  if (isEditorialVersion(siteVersion)) {
    return (
      <SectionShell id="registration" siteVersion={siteVersion} reveal={false}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <SectionIntro
            label="Register"
            title={data.title}
            description={data.description}
            className="mb-0 lg:sticky lg:top-[calc(var(--nav-height,4rem)+1.5rem)] lg:self-start"
          />

          <div className="v3-form-inset">
            <RegistrationFormPanel data={data} variant="onCard" />
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="registration">
      <div className="grid w-full gap-8 bg-card p-8 md:p-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:p-14">
        <header className="max-w-md lg:pt-2">
          <p className="card-label block">Register</p>
          <h2 className="headline-section">{data.title}</h2>
          {data.description && (
            <p className="mt-5 text-base leading-relaxed text-muted">{data.description}</p>
          )}
        </header>

        <div className="flex flex-col lg:border-l lg:border-border lg:pl-14">
          <Separator className="mb-8 lg:hidden" />
          <RegistrationFormPanel data={data} variant="onCard" />
        </div>
      </div>
    </SectionShell>
  );
}
