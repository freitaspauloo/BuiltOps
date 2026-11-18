import { PresentationNav } from "@/components/dev/presentation-nav";

export default function CommunitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PresentationNav />
      {children}
    </>
  );
}
