import { PreviewNav } from "@/components/dev/preview-nav";

export default function OldArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {process.env.NEXT_PUBLIC_SHOW_PREVIEW_NAV !== "false" && <PreviewNav />}
      {children}
    </>
  );
}
