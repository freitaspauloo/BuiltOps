import Image from "next/image";
import type { Community, SalesOffice } from "@/lib/types/community";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AppIcon, UI_ICONS } from "@/lib/icons";

export function SalesTeamContact({
  contact,
  usePlaceholder = false,
}: {
  contact: { name: string; role: string; image?: string };
  usePlaceholder?: boolean;
}) {
  const showImage = contact.image && !usePlaceholder;

  return (
    <div className="mb-6 flex items-center gap-4 border-b border-border pb-6 md:mb-8 md:pb-8">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-mist md:h-20 md:w-20">
        {showImage ? (
          <Image
            src={contact.image!}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-fog text-muted">
            <AppIcon icon={UI_ICONS.user} size={28} aria-hidden />
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-base font-bold text-foreground md:text-lg">{contact.name}</p>
        <p className="mt-0.5 text-sm text-muted">{contact.role}</p>
      </div>
    </div>
  );
}

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
      {includeCta && <Button href="#registration">Book Appointment</Button>}
    </div>
  );
}

export function SalesOfficeSection({
  data,
  siteVersion = "v3",
}: {
  data: NonNullable<Community["salesOffice"]>;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="salesOffice" siteVersion={siteVersion} reveal={false} muted={isEditorialVersion(siteVersion)}>
      <SectionHeaderSplit eyebrow="Visit" title={data.title} siteVersion={siteVersion} />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className={isEditorialVersion(siteVersion) ? "v3-panel !border-t-0 !pt-0" : undefined}>
          <SalesOfficeVisitDetails data={data} />
        </div>
        {data.team?.map((member) => (
          <div
            key={member.name}
            className={isEditorialVersion(siteVersion) ? "v3-inset-panel" : "archun-card p-6"}
          >
            <p className="font-bold text-foreground">{member.name}</p>
            <p className="text-sm text-muted">{member.role}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
