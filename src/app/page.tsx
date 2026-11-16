import type { Metadata } from "next";
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

import { ASSET_V, v } from "@/components/sites/intense/assetVersion";

const THEME = "/sites/intense/theme";

export const metadata: Metadata = {
  title: "INTENSE Dental Clinic",
  description: "INTENSE Dental Clinic — естетична і функціональна стоматологія з комплексним підходом до здоров’я пацієнтів.",
  robots: { index: false, follow: false }, // draft: keep out of search until content is final
  icons: { icon: "/sites/intense/brand/favicon.svg" },
};

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href={v(`${THEME}/css/reset.css`)} precedence="default" />
      <link rel="stylesheet" href={v(`${THEME}/css/style.css`)} precedence="default" />
      <link rel="stylesheet" href={v(`${THEME}/css/theme-style.css`)} precedence="default" />
      <link rel="stylesheet" href={v("/sites/intense/intense.css")} precedence="high" />
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
    </>
  );
}
