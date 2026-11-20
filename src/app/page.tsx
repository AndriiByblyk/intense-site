import type { Metadata, Viewport } from "next";
import { INDEXABLE, SITE, SITE_URL } from "./site";
import { CATEGORIES } from "@/components/sites/intense/prices";
import { Header } from "@/components/sites/intense/Header";
import { Hero } from "@/components/sites/intense/Hero";
import { About } from "@/components/sites/intense/About";
import { Services } from "@/components/sites/intense/Services";
import { Smile } from "@/components/sites/intense/Smile";
import { Team } from "@/components/sites/intense/Team";
import { Advice } from "@/components/sites/intense/Advice";
import { Footer } from "@/components/sites/intense/Footer";
import { Overlays } from "@/components/sites/intense/Overlays";
import { CallButton } from "@/components/sites/intense/CallButton";
import { SiteScripts } from "@/components/sites/intense/SiteScripts";
import { MotionObserver } from "@/components/sites/intense/motion/MotionObserver";

import { ASSET_V, v } from "@/components/sites/intense/assetVersion";

const THEME = "/sites/intense/theme";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  robots: INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0B0A07", colorScheme: "dark" };

// schema.org data for search engines: the clinic, its address, hours and services.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/#clinic`,
  name: SITE.name,
  url: `${SITE_URL}/`,
  description: SITE.description,
  image: `${SITE_URL}/opengraph-image.jpg`,
  logo: `${SITE_URL}/icon-512.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  hasMap: SITE.maps,
  sameAs: [SITE.instagram],
  openingHoursSpecification: SITE.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  medicalSpecialty: "Dentistry",
  availableService: CATEGORIES.map((c) => ({ "@type": "MedicalProcedure", name: c.title })),
  currenciesAccepted: "UAH",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <link rel="stylesheet" href={v(`${THEME}/css/reset.css`)} precedence="default" />
      <link rel="stylesheet" href={v(`${THEME}/css/style.css`)} precedence="default" />
      <link rel="stylesheet" href={v(`${THEME}/css/theme-style.css`)} precedence="default" />
      <link rel="stylesheet" href={v("/sites/intense/intense.css")} precedence="high" />
      <link rel="stylesheet" href={v("/sites/intense/motion.css")} precedence="high" />
      <link rel="stylesheet" href={v("/sites/intense/decor.css")} precedence="high" />
      <link rel="stylesheet" href={v("/sites/intense/season-ny.css")} precedence="high" />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Smile />
        <Team />
        <Advice />
      </main>
      <Footer />
      <Overlays />
      <CallButton />
      <SiteScripts version={ASSET_V} />
      <MotionObserver />
    </>
  );
}
