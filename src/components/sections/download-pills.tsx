import Image from "next/image";
import type { DownloadAsset } from "@/lib/types/community";
import { isAuditMicrositeVersion, isEditorialVersion, isV5MicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { cardSurfaceClass } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

export function DownloadPills({
  downloads,
  className,
  id,
  siteVersion = "v3",
}: {
  downloads: DownloadAsset[];
  className?: string;
  id?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (downloads.length === 0) return null;

  if (isAuditMicrositeVersion(siteVersion)) {
    return (
      <div id={id} className={className}>
        <div className="scrollbar-hide -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 md:gap-5 md:pb-2">
          {downloads.map((file) => (
            <a
              key={file.title}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-[13rem] shrink-0 snap-start flex-col sm:w-[15rem]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-mist">
                {file.thumbnailUrl && (
                  <Image
                    src={file.thumbnailUrl}
                    alt=""
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="240px"
                  />
                )}
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-foreground/70 px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <AppIcon icon={UI_ICONS.file} size={14} className="text-white" aria-hidden />
                  Open
                </span>
              </div>
              <p className="mt-3 font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                {file.title}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted">{file.type}</p>
            </a>
          ))}
        </div>
      </div>
    );
  }

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
            isEditorialVersion(siteVersion) ? "v3-download-link group" : cardSurfaceClass(siteVersion),
            "flex items-start gap-3 p-4 text-sm md:p-5",
          )}
        >
          <AppIcon
            icon={UI_ICONS.file}
            size={20}
            className={cn(
              "mt-0.5 shrink-0 text-primary transition-colors",
              isEditorialVersion(siteVersion) && "group-hover:text-primary-hover",
            )}
          />
          <div className="min-w-0">
            <p
              className={cn(
                "font-medium leading-snug text-foreground",
                isEditorialVersion(siteVersion) && "transition-colors group-hover:text-primary",
              )}
            >
              {file.title}
            </p>
            <p className="mt-1 text-xs text-muted">{file.type}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
