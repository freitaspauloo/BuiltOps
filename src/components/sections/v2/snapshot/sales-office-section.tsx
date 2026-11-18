import type { Community, SalesOffice } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AppIcon, UI_ICONS } from "@/lib/icons";

export function SalesOfficeVisitDetails({
  data,
  includeCta = true,
}: {
  data: SalesOffice;
  includeCta?: boolean;
}) {
  return (
    <div className="space-y-4 text-sm">
      <p className="flex gap-3">
        <AppIcon icon={UI_ICONS.mapPin} size={18} className="mt-0.5 shrink-0 text-primary" />
        {data.address}
      </p>
      <p className="flex gap-3">
        <AppIcon icon={UI_ICONS.phone} size={18} className="shrink-0 text-primary" />
        <a href={`tel:${data.phone}`} className="font-medium hover:underline">
          {data.phone}
        </a>
      </p>
      <p className="flex gap-3">
        <AppIcon icon={UI_ICONS.mail} size={18} className="shrink-0 text-primary" />
        <a href={`mailto:${data.email}`} className="hover:underline">
          {data.email}
        </a>
      </p>
      <div className="flex gap-3">
        <AppIcon icon={UI_ICONS.clock} size={18} className="mt-0.5 shrink-0 text-primary" />
        <ul className="text-muted">
          {data.hours.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
      {includeCta && <Button href="#registration">Book appointment</Button>}
    </div>
  );
}

export function SalesOfficeSection({
  data,
  siteVersion = "v2",
}: {
  data: NonNullable<Community["salesOffice"]>;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="salesOffice" siteVersion={siteVersion}>
      <SectionHeaderSplit eyebrow="Visit" title={data.title} siteVersion={siteVersion} />
      <div className="grid gap-10 lg:grid-cols-2">
        <SalesOfficeVisitDetails data={data} />
        {data.team?.map((member) => (
          <div key={member.name} className="archun-card p-6">
            <p className="font-bold">{member.name}</p>
            <p className="text-sm text-muted">{member.role}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
