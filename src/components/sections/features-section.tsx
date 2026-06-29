import type { Community } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell, cardSurfaceClass } from "@/components/ui/section";

export function FeaturesSection({
  data,
  siteVersion = "v2",
}: {
  data: NonNullable<Community["features"]>;
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="features" siteVersion={siteVersion}>
      <SectionHeaderSplit eyebrow="Builder" title={data.title} siteVersion={siteVersion} />
      <div className="grid gap-5 sm:grid-cols-2">
        {data.items.map((item) => (
          <article key={item.title} className={`${cardSurfaceClass(siteVersion)} p-7 md:p-8`}>
            <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body md:text-base">{item.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
