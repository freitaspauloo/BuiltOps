import { cn } from "@/lib/utils/cn";

export function SectionIntro({
  label,
  title,
  description,
  className,
  showRule = true,
  titleSerif = false,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  showRule?: boolean;
  titleSerif?: boolean;
}) {
  return (
    <div className={cn("v3-section-intro", className)}>
      {label && <p className="v3-section-label">{label}</p>}
      <h2 className={cn("headline-section-v3 text-balance", titleSerif && "headline-serif")}>
        {title}
      </h2>
      {description && <p className="v3-section-dek">{description}</p>}
      {showRule && <hr className="v3-hairline" aria-hidden />}
    </div>
  );
}
