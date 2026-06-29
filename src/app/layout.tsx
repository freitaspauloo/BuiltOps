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
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-body antialiased">
        {process.env.NEXT_PUBLIC_SHOW_PREVIEW_NAV !== "false" && <PreviewNav />}
        {children}
      </body>
    </html>
  );
}
