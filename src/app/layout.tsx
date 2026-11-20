import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SITE_URL } from "./site";
import { IS_NY } from "@/components/sites/intense/edition";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// Every page (the 404 too) resolves share images against the site URL.
export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

// Root layout stays style-free: the pages load their own stylesheet set
// (see the <link precedence> tags in the pages).
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={manrope.variable} {...(IS_NY ? { "data-season": "ny" } : {})}>
      <body className="home page">{children}</body>
    </html>
  );
}
