import Link from "next/link";
import { FooterLocalTime } from "@/components/layout/footer-local-time";
import { AppIcon, getSectionIcon } from "@/lib/icons";
import { getNavStructure, type NavGroupItem, type NavLinkItem } from "@/lib/sections/nav-groups";
import type { Community } from "@/lib/types/community";
import { cn } from "@/lib/utils/cn";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/losani-homes/" },
  { label: "Instagram", href: "https://www.instagram.com/losanihomesltd/" },
  { label: "Facebook", href: "https://www.facebook.com/losanihomes" },
] as const;

const GROUP_ICON_BG: Record<string, string> = {
  buy: "bg-accent",
  homes: "bg-primary",
  explore: "bg-teal-mid",
  community: "bg-emphasis",
  plan: "bg-teal-mid",
  help: "bg-primary-light",
};

const footerLink =
  "text-sm text-body transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const footerLinkStrong =
  "text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function FooterNavLink({ item }: { item: NavLinkItem }) {
  return (
    <div className="min-w-0 lg:min-w-[8.5rem]">
      <Link href={`#${item.id}`} className={cn(footerLinkStrong, "inline-block py-1 max-lg:py-0.5")}>
        {item.label}
      </Link>
    </div>
  );
}

function FooterNavGroup({ group }: { group: NavGroupItem }) {
  const iconBg = GROUP_ICON_BG[group.id] ?? "bg-primary";
  const useSubGrid = group.items.length > 3;

  return (
    <div
      className={cn(
        "min-w-0 lg:min-w-[8.5rem]",
        useSubGrid && "max-lg:col-span-2",
      )}
    >
      <p className="mb-3 text-sm font-medium text-foreground md:mb-4">{group.label}</p>
      <ul
        className={cn(
          "space-y-3",
          useSubGrid &&
            "max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-4 max-lg:gap-y-3 max-lg:space-y-0",
        )}
      >
        {group.items.map((item) => {
          const Icon = getSectionIcon(item.id);
          return (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={cn("group flex items-center gap-3 py-0.5 max-lg:py-1", footerLink)}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center md:h-10 md:w-10",
                    iconBg,
                  )}
                  aria-hidden
                >
                  <AppIcon icon={Icon} size={16} className="text-white" />
                </span>
                <span className="min-w-0 group-hover:text-foreground">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Editorial footer — AKER-inspired grid nav, oversized wordmark, fine-print bar.
 */
export function CommunityFooter({ community }: { community: Community }) {
  const nav = getNavStructure(community);
  const address = community.salesOffice?.address ?? community.hero.city;
  const showRegister = community.registration != null;
  const registerCta = community.hero.primaryCta;
  const secondaryCta = community.hero.secondaryCta;

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="hero-frame-sides border-b border-border py-8 md:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {(showRegister || secondaryCta) && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-6 lg:hidden">
              {showRegister && (
                <Link href={registerCta.href} className={footerLinkStrong}>
                  {registerCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className={footerLinkStrong}>
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}

          <div className="grid flex-1 grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 md:grid-cols-3 md:gap-x-10 md:gap-y-10 xl:grid-cols-4">
            {nav.map((item) =>
              item.type === "link" ? (
                <FooterNavLink key={item.id} item={item} />
              ) : (
                <FooterNavGroup key={item.id} group={item} />
              ),
            )}
          </div>

          {(showRegister || secondaryCta) && (
            <div className="hidden shrink-0 flex-col gap-3 lg:flex lg:items-end lg:pt-0.5">
              {showRegister && (
                <Link href={registerCta.href} className={footerLinkStrong}>
                  {registerCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className={footerLinkStrong}>
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="hero-frame-sides overflow-hidden pt-5 pb-1 max-lg:pt-4 md:pt-8 md:pb-2">
        <a
          href="https://www.losanihomes.com"
          className="footer-wordmark block font-display font-normal tracking-tight text-foreground transition-opacity hover:opacity-80"
          aria-label="Losani Homes"
        >
          Losani
        </a>
      </div>

      <div className="hero-frame-sides border-t border-border py-4 max-lg:py-5 md:py-5">
        <div className="flex flex-col gap-4 text-xs text-muted max-lg:gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 max-lg:gap-y-2.5 md:gap-x-5">
            <a
              href="https://www.losanihomes.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </a>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>

          {address && (
            <p className="max-w-full leading-relaxed max-lg:text-[11px] md:text-center">{address}</p>
          )}

          <p className="max-lg:text-[11px] lg:shrink-0">
            <FooterLocalTime />
          </p>
        </div>
      </div>
    </footer>
  );
}
