"use client";

import { useEffect, useRef, useState } from "react";

const DIR = "/sites/intense/media/hero";
// The hero files keep their names between versions and are cached for 30 days,
// so every address carries this stamp: bump it whenever the files change.
const HERO_V = "20261120a";
const hv = (file: string) => `${DIR}/${file}?v=${HERO_V}`;

type Variant = "9x16-720" | "16x9-720" | "16x9";

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

// Pick the lightest file that still looks right:
//  - phones: portrait 720p
//  - computers: landscape 720p (it sits under a dark overlay, so it holds up)
//  - full 1080p only on big screens of capable machines with a normal connection
function pickVariant(): Variant {
  if (window.matchMedia("(max-width: 767px)").matches) return "9x16-720";
  const n = navigator as NavigatorExtras;
  const strong =
    (n.hardwareConcurrency ?? 4) >= 8 &&
    (n.deviceMemory ?? 8) >= 8 &&
    !n.connection?.saveData &&
    !/2g|3g/.test(n.connection?.effectiveType ?? "");
  return strong && window.innerWidth >= 1600 ? "16x9" : "16x9-720";
}

// 16.3 s silent loop cut from the clinic's vertical film IMG_6676 (phones get
// it as shot; the landscape files are a centre 16:9 crop). Rendered without sources until mounted so a phone never
// downloads the landscape file; paused whenever the hero is off screen (so it
// stops costing CPU/GPU while you read the rest of the page); poster only for
// people who ask for reduced motion.
export function HeroVideo() {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [still, setStill] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Width only: an orientation query flips when the phone keyboard opens,
    // which used to swap (and reload) the video mid-page.
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setStill(reduce.matches);
      setVariant(pickVariant());
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Play only while visible.
  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [variant, still]);

  const poster = hv(`hero-${variant?.startsWith("9x16") ? "9x16" : "16x9"}.webp`);

  return (
    <video
      ref={ref}
      key={variant ?? "ssr"}
      className="hero-video"
      autoPlay={!still}
      muted
      loop
      playsInline
      preload={still ? "none" : "auto"}
      poster={poster}
    >
      {variant && !still && (
        <>
          <source src={hv(`hero-${variant}.webm`)} type="video/webm" />
          <source src={hv(`hero-${variant}.mp4`)} type="video/mp4" />
        </>
      )}
    </video>
  );
}
