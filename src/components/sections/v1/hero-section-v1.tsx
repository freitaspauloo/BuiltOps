import Image from "next/image";
import type { CommunityHero } from "@/lib/types/community";

/** v1 — community name only over photography */
export function HeroSectionV1({ data }: { data: CommunityHero }) {
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

        <div className="relative z-10 flex min-h-[min(82svh,880px)] flex-col items-center justify-center px-6">
          <h1 className="headline-hero">{data.communityName}</h1>
        </div>
      </div>
    </section>
  );
}
