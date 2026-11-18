import { PresentationNav } from "@/components/dev/presentation-nav";

export default function ModelsLayout({
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
