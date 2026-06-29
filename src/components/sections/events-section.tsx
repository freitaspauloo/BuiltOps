import type { CommunityEvent } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeading, SectionShell } from "@/components/ui/section";

export function EventsSection({
  events,
  siteVersion = "v2",
}: {
  events: CommunityEvent[];
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="events" siteVersion={siteVersion}>      <SectionHeading eyebrow="Calendar" title="Events" />
      <div className="space-y-4">
        {events.map((event) => (
          <article key={event.title} className="card-surface p-6">
            <p className="text-sm text-muted">{event.date}</p>
            <h3 className="mt-1 text-lg font-bold">{event.title}</h3>
            <p className="mt-2 text-sm text-muted">{event.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
