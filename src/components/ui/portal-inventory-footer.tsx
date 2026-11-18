import { COMPARE_MODELS_URL } from "@/lib/connected-experience";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { cn } from "@/lib/utils/cn";

/**
 * Landing-page inventory sections drive back to the portal compare / book flow.
 */
export function PortalInventoryFooter({
  className,
  compareLabel = "Compare models",
  bookLabel = "Book Appointment",
}: {
  className?: string;
  compareLabel?: string;
  bookLabel?: string;
}) {
  return (
    <div
      className={cn(
        "mt-10 flex flex-col gap-4 border-t border-border pt-8 md:mt-12 md:flex-row md:items-center md:justify-between md:pt-10",
        className,
      )}
    >
      <p className="max-w-md text-sm text-body">
        Preview homes assigned to this community. Open the connected platform to compare
        floorplans, check lot fit, and book a visit.
      </p>
      <CommunityCtaButtons
        primaryCta={{ label: compareLabel, href: COMPARE_MODELS_URL }}
        secondaryCta={{ label: bookLabel, href: "#registration" }}
        tone="light"
        size="md"
      />
    </div>
  );
}
