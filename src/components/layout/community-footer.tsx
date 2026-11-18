import { LosaniLogo } from "@/components/ui/losani-logo";
import type { Community } from "@/lib/types/community";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/losani-homes/" },
  { label: "Instagram", href: "https://www.instagram.com/losanihomesltd/" },
  { label: "Facebook", href: "https://www.facebook.com/losanihomes" },
] as const;

const finePrintLink =
  "text-xs text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function CommunityFooter({ community: _community }: { community?: Community } = {}) {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="hero-frame-sides py-10 max-lg:py-8 md:py-12">
        <div className="flex justify-center">
          <LosaniLogo
            href="https://www.losanihomes.com"
            className="footer-wordmark h-10 w-auto sm:h-12"
          />
        </div>
      </div>

      <div className="hero-frame-sides border-t border-border py-6 max-lg:py-6 md:py-7">
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
      </div>
    </footer>
  );
}
