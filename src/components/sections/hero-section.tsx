import Image from "next/image";
import Link from "next/link";
import { StatusLabel } from "@/components/ui/status-badge";
import type { CommunityHero } from "@/lib/types/community";

export function HeroSection({ data }: { data: CommunityHero }) {
  const meta = [data.city, data.priceFrom, data.homeTypes].filter(Boolean);

  return (
    <section id="hero" className="bg-transparent">
      <div className="hero-frame relative min-h-[min(82svh,880px)]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={data.heroImage}
            alt={data.communityName}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="hero-overlay-bottom absolute inset-0" />
        </div>

        <div className="relative z-10 flex min-h-[min(82svh,880px)] flex-col justify-end px-6 pb-14 md:px-10 md:pb-16 lg:pb-20">
          <div className="mx-auto w-full max-w-4xl text-center">
            <StatusLabel stage={data.statusBadge} inverse className="mb-5 block" />
            {meta.length > 0 && (
              <p className="mb-4 text-sm font-medium tracking-wide text-white/90 md:text-base">
                {meta.join(" · ")}
              </p>
            )}
            <h1 className="headline-hero">{data.communityName}</h1>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={data.primaryCta.href}
                className="inline-flex items-center bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                {data.primaryCta.label}
              </Link>
              {data.secondaryCta && (
                <Link
                  href={data.secondaryCta.href}
                  className="inline-flex items-center border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {data.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
