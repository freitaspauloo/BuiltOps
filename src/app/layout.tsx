import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { PreviewNav } from "@/components/dev/preview-nav";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Losani Homes — BuiltOps",
  description: "Modular community microsite platform for Losani Homes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The draggable preview widget is a build tool, not part of the experience —
  // opt in explicitly rather than shipping it to every visitor.
  const showPreviewNav =
    process.env.NEXT_PUBLIC_SHOW_PREVIEW_NAV === "true" ||
    (process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_SHOW_PREVIEW_NAV !== "false");

  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-body antialiased">
        {showPreviewNav && <PreviewNav />}
        {children}
      </body>
    </html>
  );
}
