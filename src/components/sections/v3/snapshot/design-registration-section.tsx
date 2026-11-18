import Image from "next/image";
import type { DesignCentre, RegistrationForm } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { RegistrationFormPanel } from "./registration-form";

export function DesignRegistrationSection({
  designCentre,
  registration,
  siteVersion = "v3",
}: {
  designCentre: DesignCentre;
  registration: RegistrationForm;
  backgroundImage?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (siteVersion === "v3") {
    return (
      <SectionShell id="registration" reveal={false}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <article
            id="designCentre"
            className="v3-panel scroll-mt-[var(--nav-height,4rem)]"
          >
            <SectionIntro
              label="Design centre"
              title={designCentre.title}
              description={designCentre.description}
              showRule={false}
              className="mb-0"
            />

            {designCentre.address && (
              <p className="mt-5 text-sm text-muted">{designCentre.address}</p>
            )}
            {designCentre.hours && (
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {designCentre.hours.map((hour) => (
                  <li key={hour}>{hour}</li>
                ))}
              </ul>
            )}

            <a
              href="#registration-form"
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              {designCentre.ctaLabel ?? "Book a design appointment"}
              <AppIcon icon={UI_ICONS.chevronRight} size={16} className="text-primary" aria-hidden />
            </a>

            {designCentre.image && (
              <div className="relative mt-10 aspect-[4/3] w-full max-w-md overflow-hidden bg-mist">
                <Image
                  src={designCentre.image}
                  alt={designCentre.title}
                  fill
                  className="object-cover object-left"
                  sizes="(max-width: 1024px) 100vw, 28rem"
                />
              </div>
            )}
          </article>

          <article id="registration-form" className="v3-form-inset scroll-mt-[var(--nav-height,4rem)]">
            <SectionIntro
              label="Register"
              title={registration.title}
              description={registration.description}
              showRule={false}
              className="mb-0"
            />

            <Separator className="my-8 bg-border" />

            <RegistrationFormPanel data={registration} variant="onCard" pinSubmitToBottom />
          </article>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="registration" className="bg-background">
      <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-5">
        <article
          id="designCentre"
          className="flex h-full min-h-[min(32rem,85vh)] scroll-mt-[var(--nav-height,4rem)] flex-col bg-card p-8 md:p-10 lg:p-12"
        >
          <div>
            <p className="card-label">Design centre</p>
            <h2 className="headline-section max-w-md text-balance">{designCentre.title}</h2>
            {designCentre.description && (
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                {designCentre.description}
              </p>
            )}
            {designCentre.address && (
              <p className="mt-5 text-sm text-muted">{designCentre.address}</p>
            )}
            {designCentre.hours && (
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {designCentre.hours.map((hour) => (
                  <li key={hour}>{hour}</li>
                ))}
              </ul>
            )}

            <a
              href="#registration-form"
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              {designCentre.ctaLabel ?? "Book a design appointment"}
              <AppIcon icon={UI_ICONS.chevronRight} size={16} className="text-primary" aria-hidden />
            </a>
          </div>

          {designCentre.image && (
            <div className="relative mt-auto aspect-[4/3] w-full max-w-md pt-8">
              <Image
                src={designCentre.image}
                alt={designCentre.title}
                fill
                className="object-cover object-left"
                sizes="(max-width: 1024px) 100vw, 28rem"
              />
            </div>
          )}
        </article>

        <article
          id="registration-form"
          className="flex h-full min-h-[min(32rem,85vh)] flex-col bg-card p-8 md:p-10 lg:p-12"
        >
          <header className="max-w-md">
            <p className="card-label">Register</p>
            <h2 className="headline-section text-balance">{registration.title}</h2>
            {registration.description && (
              <p className="mt-4 text-base leading-relaxed text-muted">
                {registration.description}
              </p>
            )}
          </header>

          <Separator className="my-8 bg-border" />

          <div className="flex min-h-0 flex-1 flex-col">
            <RegistrationFormPanel data={registration} variant="onCard" pinSubmitToBottom />
          </div>
        </article>
      </div>
    </SectionShell>
  );
}
