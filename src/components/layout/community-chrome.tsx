import Link from "next/link";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { AppIcon, SOCIAL_ICONS } from "@/lib/icons";
import type { CommunityHero } from "@/lib/types/community";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/losanihomes",
    icon: SOCIAL_ICONS.facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/losanihomesltd/",
    icon: SOCIAL_ICONS.instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/losani-homes/",
    icon: SOCIAL_ICONS.linkedin,
  },
] as const;

const footerLinkClass =
  "transition-colors text-white/75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Solid teal footer aligned to the framed page width.
 */
export function CommunityFooter({ hero }: { hero: CommunityHero }) {
  return (
    <footer className="bg-primary text-white">
      <div className="hero-frame-sides py-16 md:py-20">
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <p className="text-sm font-bold tracking-[0.18em]">LOSANI</p>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Building exceptional communities across Southern Ontario for over four decades.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/25 bg-white/10 transition-colors hover:bg-white/20"
                >
                  <AppIcon icon={icon} size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 text-sm sm:gap-16">
            <div>
              <p className="mb-4 font-semibold">Explore</p>
              <ul className="space-y-2.5">
                <li><Link href="#overview" className={footerLinkClass}>Community</Link></li>
                <li><Link href="#floorplans" className={footerLinkClass}>Home designs</Link></li>
                <li><Link href="#gallery" className={footerLinkClass}>Gallery</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-semibold">Connect</p>
              <ul className="space-y-2.5">
                <li><Link href="#registration" className={footerLinkClass}>Register</Link></li>
                <li><Link href="#salesOffice" className={footerLinkClass}>Visit us</Link></li>
                <li><Link href="#faq" className={footerLinkClass}>FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="lg:max-w-xs lg:pt-1">
            <p className="text-sm font-semibold">Book your private showing</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Tour model homes and connect with our Beamsville sales team.
            </p>
            <CommunityCtaButtons
              className="mt-6"
              primaryCta={hero.primaryCta}
              secondaryCta={hero.secondaryCta}
              tone="onPrimary"
            />          </div>
        </div>
      </div>
    </footer>
  );
}
