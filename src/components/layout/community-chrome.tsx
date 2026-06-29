/**
 * Hero shows a centered Losani logo; section nav lives in the bottom dock.
 * Only the light footer is rendered as page chrome.
 */
export function CommunityFooter() {
  return (
    <footer className="border-t border-border bg-transparent">
      <div className="container-wide px-6 py-16 md:px-10 lg:px-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-bold tracking-[0.18em] text-foreground">LOSANI</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Building exceptional communities across Southern Ontario for over four decades.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm">
            <div>
              <p className="mb-4 font-semibold text-foreground">Explore</p>
              <ul className="space-y-2.5 text-muted">
                <li><a href="#overview" className="transition-colors hover:text-foreground">Community</a></li>
                <li><a href="#floorplans" className="transition-colors hover:text-foreground">Home designs</a></li>
                <li><a href="#gallery" className="transition-colors hover:text-foreground">Gallery</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-semibold text-foreground">Connect</p>
              <ul className="space-y-2.5 text-muted">
                <li><a href="#registration" className="transition-colors hover:text-foreground">Register</a></li>
                <li><a href="#salesOffice" className="transition-colors hover:text-foreground">Visit us</a></li>
                <li><a href="#faq" className="transition-colors hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Losani Homes
        </p>
      </div>
    </footer>
  );
}
