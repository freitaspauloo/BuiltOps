import Image from "next/image";
import type { ReactNode } from "react";
import type { RegistrationForm, SalesOffice } from "@/lib/types/community";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";
import { RegistrationFormPanel } from "./registration-form";

function ContactTile({
  icon,
  label,
  children,
}: {
  icon: typeof UI_ICONS.mapPin;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-muted">
        <AppIcon icon={icon} size={14} className="text-primary" aria-hidden />
        {label}
      </p>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function SalesTeamContactCompact({
  contact,
}: {
  contact: { name: string; role: string; image?: string };
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-mist">
        {contact.image ? (
          <Image
            src={contact.image}
            alt=""
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-fog text-muted">
            <AppIcon icon={UI_ICONS.user} size={20} aria-hidden />
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground">{contact.name}</p>
        <p className="text-xs text-muted">{contact.role}</p>
      </div>
    </div>
  );
}

function VisitContactSidebar({
  salesOffice,
  contact,
}: {
  salesOffice: SalesOffice;
  contact?: { name: string; role: string; image?: string };
}) {
  return (
    <div
      id="salesOffice"
      className="visit-registration-contact scroll-mt-[var(--nav-height,4rem)] mt-6 space-y-5 border-t border-border pt-6"
    >
      {contact ? <SalesTeamContactCompact contact={contact} /> : null}

      <ContactTile icon={UI_ICONS.mapPin} label="Address">
        {salesOffice.address}
      </ContactTile>

      <ContactTile icon={UI_ICONS.phone} label="Phone">
        <a href={`tel:${salesOffice.phone}`} className="font-medium hover:underline">
          {salesOffice.phone}
        </a>
      </ContactTile>

      <ContactTile icon={UI_ICONS.mail} label="Email">
        <a href={`mailto:${salesOffice.email}`} className="hover:underline">
          {salesOffice.email}
        </a>
      </ContactTile>

      <ContactTile icon={UI_ICONS.clock} label="Hours">
        <ul className="space-y-0.5 text-muted">
          {salesOffice.hours.map((hour) => (
            <li key={hour}>{hour}</li>
          ))}
        </ul>
      </ContactTile>
    </div>
  );
}

function VisitContactBand({
  salesOffice,
  contact,
}: {
  salesOffice: SalesOffice;
  contact?: { name: string; role: string; image?: string };
}) {
  return (
    <div
      id="salesOffice"
      className="scroll-mt-[var(--nav-height,4rem)] border-y border-border py-8 md:py-10"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:items-start lg:gap-12 xl:gap-16">
        {contact ? <SalesTeamContactCompact contact={contact} /> : null}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <ContactTile icon={UI_ICONS.mapPin} label="Address">
            {salesOffice.address}
          </ContactTile>

          <ContactTile icon={UI_ICONS.phone} label="Phone">
            <a href={`tel:${salesOffice.phone}`} className="font-medium hover:underline">
              {salesOffice.phone}
            </a>
          </ContactTile>

          <ContactTile icon={UI_ICONS.mail} label="Email">
            <a href={`mailto:${salesOffice.email}`} className="hover:underline">
              {salesOffice.email}
            </a>
          </ContactTile>

          <ContactTile icon={UI_ICONS.clock} label="Hours">
            <ul className="space-y-0.5 text-muted">
              {salesOffice.hours.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
          </ContactTile>
        </div>
      </div>
    </div>
  );
}

function EditorialVisitRegistration({
  salesOffice,
  registration,
  contact,
}: {
  salesOffice: SalesOffice;
  registration: RegistrationForm;
  contact?: { name: string; role: string; image?: string };
}) {
  return (
    <div className="visit-registration-split">
      <aside className="visit-registration-aside">
        <SectionIntro
          label="Visit us"
          title={registration.title}
          description={registration.description}
          showRule={false}
          className="mb-0"
        />
        <VisitContactSidebar salesOffice={salesOffice} contact={contact} />
      </aside>

      <div className="visit-registration-form">
        <RegistrationFormPanel data={registration} variant="default" layout="split" />
      </div>
    </div>
  );
}

export function VisitRegistrationSection({
  salesOffice,
  registration,
  contact,
  siteVersion = "v3",
}: {
  salesOffice: SalesOffice;
  registration: RegistrationForm;
  contact?: { name: string; role: string; image?: string };
  siteVersion?: MicrositeVersionId;
}) {
  const editorial = isEditorialVersion(siteVersion);

  if (editorial) {
    return (
      <SectionShell id="registration" siteVersion={siteVersion} reveal={false}>
        <article className="visit-registration-inset">
          <EditorialVisitRegistration
            salesOffice={salesOffice}
            registration={registration}
            contact={contact}
          />
        </article>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="registration" siteVersion={siteVersion}>
      <article className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-8 md:p-12 lg:p-14">
        <SectionIntro
          label="Visit us"
          title={registration.title}
          description={registration.description}
          showRule={false}
          className="mb-0 max-w-2xl"
        />
        <VisitContactBand salesOffice={salesOffice} contact={contact} />
        <div className="pt-8 md:pt-10">
          <RegistrationFormPanel data={registration} variant="default" />
        </div>
      </article>
    </SectionShell>
  );
}
