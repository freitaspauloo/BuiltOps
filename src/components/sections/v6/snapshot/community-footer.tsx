import Image from "next/image";
import type { ReactNode } from "react";
import { LosaniLogo } from "@/components/ui/losani-logo";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import type { Community, RegistrationForm, SalesOffice } from "@/lib/types/community";
import { RegistrationFormPanel } from "./registration-form";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/losani-homes/" },
  { label: "Instagram", href: "https://www.instagram.com/losanihomesltd/" },
  { label: "Facebook", href: "https://www.facebook.com/losanihomes" },
] as const;

const finePrintLink =
  "text-xs text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";

/** Same horizontal rhythm as SectionShell — page padding + 1320 content. */
function FooterFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="container-wide min-w-0 max-w-full">{children}</div>
    </div>
  );
}

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
      <p className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-white/55">
        <AppIcon icon={icon} size={14} className="text-white/70" aria-hidden />
        {label}
      </p>
      <div className="text-sm leading-relaxed text-white/90">{children}</div>
    </div>
  );
}

function SalesTeamContact({
  contact,
}: {
  contact: { name: string; role: string; image?: string };
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-white/10">
        {contact.image ? (
          <Image
            src={contact.image}
            alt=""
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-white/60">
            <AppIcon icon={UI_ICONS.user} size={20} aria-hidden />
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-white">{contact.name}</p>
        <p className="text-xs text-white/60">{contact.role}</p>
      </div>
    </div>
  );
}

function FooterBooking({
  salesOffice,
  registration,
  contact,
}: {
  salesOffice: SalesOffice;
  registration: RegistrationForm;
  contact?: { name: string; role: string; image?: string };
}) {
  return (
    <div
      id="registration"
      className="community-footer-booking scroll-mt-[var(--nav-height,4rem)]"
    >
      <FooterFrame className="section-padding !pb-12 md:!pb-14 lg:!pb-16">
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-14">
          <aside className="min-w-0 space-y-6 lg:max-w-lg">
            <div className="space-y-3">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/55">
                Visit us
              </p>
              <h2 className="headline-section-v3 text-white">{registration.title}</h2>
              {registration.description ? (
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  {registration.description}
                </p>
              ) : null}
            </div>

            <div
              id="salesOffice"
              className="scroll-mt-[var(--nav-height,4rem)] space-y-5 border-t border-white/15 pt-6"
            >
              {contact ? <SalesTeamContact contact={contact} /> : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <ContactTile icon={UI_ICONS.mapPin} label="Address">
                  {salesOffice.address}
                </ContactTile>

                <ContactTile icon={UI_ICONS.phone} label="Phone">
                  <a
                    href={`tel:${salesOffice.phone}`}
                    className="font-medium text-white hover:underline"
                  >
                    {salesOffice.phone}
                  </a>
                </ContactTile>

                <ContactTile icon={UI_ICONS.mail} label="Email">
                  <a
                    href={`mailto:${salesOffice.email}`}
                    className="text-white/90 hover:underline"
                  >
                    {salesOffice.email}
                  </a>
                </ContactTile>

                <ContactTile icon={UI_ICONS.clock} label="Hours">
                  <ul className="space-y-0.5 text-white/70">
                    {salesOffice.hours.map((hour) => (
                      <li key={hour}>{hour}</li>
                    ))}
                  </ul>
                </ContactTile>
              </div>
            </div>
          </aside>

          <div className="community-footer-form min-w-0 w-full rounded-[var(--radius-card)] bg-white p-5 text-foreground shadow-[0_18px_50px_rgb(0_0_0_/_0.22)] md:p-6 lg:p-8">
            <RegistrationFormPanel data={registration} variant="default" layout="split" />
          </div>
        </div>
      </FooterFrame>
    </div>
  );
}

function FooterLegal() {
  return (
    <div className="community-footer-legal border-t border-white/12">
      <FooterFrame className="px-6 py-8 md:px-10 md:py-10 lg:px-16">
        <div className="flex justify-center">
          <LosaniLogo
            href="https://www.losanihomes.com"
            inverse
            className="footer-wordmark h-10 w-auto sm:h-12"
          />
        </div>
      </FooterFrame>

      <FooterFrame className="border-t border-white/10 px-6 py-5 md:px-10 md:py-6 lg:px-16">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 md:gap-x-5">
          <a
            href="https://www.losanihomes.com/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className={finePrintLink}
          >
            Privacy Policy
          </a>
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={finePrintLink}
            >
              {label}
            </a>
          ))}
        </div>
      </FooterFrame>
    </div>
  );
}

export function CommunityFooter({ community }: { community?: Community } = {}) {
  const salesOffice = community?.salesOffice;
  const registration = community?.registration;
  const showBooking = Boolean(salesOffice && registration);
  const contact = salesOffice?.team?.[0];

  return (
    <footer className="community-footer text-white">
      {showBooking && salesOffice && registration ? (
        <FooterBooking
          salesOffice={salesOffice}
          registration={registration}
          contact={contact}
        />
      ) : null}
      <FooterLegal />
    </footer>
  );
}
