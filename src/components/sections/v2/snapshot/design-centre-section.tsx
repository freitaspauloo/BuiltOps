import type { DesignCentre } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import { SectionHeading, SectionShell } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function DesignCentreSection({
  data,
  siteVersion = "v2",
}: {
  data: DesignCentre;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="designCentre" muted siteVersion={siteVersion}>      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Design centre" title={data.title} description={data.description} className="mb-0" />
          {data.address && <p className="mt-4 text-sm text-muted">{data.address}</p>}
          {data.hours && (
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {data.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          <Button href="#registration" className="mt-6">
            {data.ctaLabel ?? "Book a design appointment"}
          </Button>
        </div>
        {data.image && (
          <CardPhotoLens
            src={data.image}
            alt={data.title}
            className="border border-border"
            lensSize={160}
          />
        )}
      </div>
    </SectionShell>
  );
}
