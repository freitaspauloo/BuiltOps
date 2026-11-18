import type { DownloadAsset } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { cardSurfaceClass } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

export function DownloadPills({
  downloads,
  className,
  id,
  siteVersion = "v2",
}: {
  downloads: DownloadAsset[];
  className?: string;
  id?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (downloads.length === 0) return null;

  return (
    <div
      id={id}
      className={cn("grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6", className)}
    >
      {downloads.map((file) => (
        <a
          key={file.title}
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            cardSurfaceClass(siteVersion),
            "flex items-start gap-3 p-4 text-sm transition-colors md:p-5",
          )}
        >
          <AppIcon icon={UI_ICONS.file} size={20} className="mt-0.5 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="font-medium leading-snug text-foreground">{file.title}</p>
            <p className="mt-1 text-xs text-muted">{file.type}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
