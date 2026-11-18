import type { CommunityEvent } from "@/lib/types/community";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { Button } from "@/components/ui/button";

export function EventsSection({
  events,
  siteVersion = "v3",
}: {
  events: CommunityEvent[];
  siteVersion?: MicrositeVersionId;
}) {
  if (events.length === 0) return null;

  const editorial = isEditorialVersion(siteVersion);

  return (
    <SectionShell id="events" siteVersion={siteVersion} reveal={false}>
      {editorial ? (
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <SectionIntro
            label="Calendar"
            title="Events"
            description="Sales centre hours, previews, and buyer sessions at Benchmark Towns."
            showRule={false}
            className="mb-0 lg:sticky lg:top-[calc(var(--nav-height,4rem)+1.5rem)] lg:self-start"
          />
          <div className="divide-y divide-border border-y border-border">
            {events.map((event) => (
              <article key={event.title} className="v3-list-row">
                <p className="text-sm text-muted">{event.date}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {event.description}
                </p>
                {event.location && (
                  <p className="mt-3 text-xs text-muted">{event.location}</p>
                )}
                <Button
                  href="#registration"
                  size="sm"
                  variant="secondary"
                  className="mt-6 border border-border bg-mist hover:bg-card-label"
                >
                  RSVP / book appointment
                </Button>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <>
          <SectionHeaderSplit
            eyebrow="Calendar"
            title="Events"
            description="Sales centre events, previews, and community happenings."
            siteVersion={siteVersion}
          />
          <div className="space-y-4">
          {events.map((event) => (
            <article key={event.title} className="card-surface p-6">
              <p className="text-sm text-muted">{event.date}</p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{event.title}</h3>
              <p className="mt-2 text-sm text-muted">{event.description}</p>
              {event.location && (
                <p className="mt-3 text-xs text-muted">{event.location}</p>
              )}
            </article>
          ))}
          </div>
        </>
      )}
    </SectionShell>
  );
}
