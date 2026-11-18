import { Button } from "@/components/ui/button";

/** Optional CMS brochure CTA — secondary button at section footers. */
export function SectionBrochureLink({
  url,
  label = "Open Brochure",
  className,
}: {
  url: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={className ?? "mt-6"}>
      <Button
        variant="secondary"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-border bg-surface hover:bg-fog"
      >
        {label}
      </Button>
    </div>
  );
}
