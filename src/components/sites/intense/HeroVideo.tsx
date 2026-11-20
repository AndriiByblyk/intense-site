"use client";

import { useEffect, useRef, useState } from "react";

const DIR = "/sites/intense/media/hero";
// The hero files keep their names between versions and are cached for 30 days,
// so every address carries this stamp: bump it whenever the files change.
const HERO_V = "20261120e";
const hv = (file: string) => `${DIR}/${file}?v=${HERO_V}`;

type Variant = "9x16-720" | "16x9-720" | "16x9";

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

// Pick the lightest file that still looks sharp on this screen:
//  - phones: portrait 720p
//  - computers: 1080p whenever the screen has the pixels for it, counted in
//    device pixels (a 1440 px MacBook window is 2880 of them; stretching a 720p
//    file over that was the main source of blur); 720p on small, low-memory,
//    data-saver or slow-connection setups
function pickVariant(): Variant {
  if (window.matchMedia("(max-width: 767px)").matches) return "9x16-720";
  const n = navigator as NavigatorExtras;
  const capable =
    (n.hardwareConcurrency ?? 4) >= 4 &&
    (n.deviceMemory ?? 8) >= 4 &&
    !n.connection?.saveData &&
    !/2g|3g/.test(n.connection?.effectiveType ?? "");
  const pixels = window.innerWidth * (window.devicePixelRatio || 1);
  return capable && pixels >= 1600 ? "16x9" : "16x9-720";
}

// 16.3 s silent loop: the clinic's vertical film IMG_6676. Phones get it as
// shot; the 16:9 files are a full-frame desktop cut of the same edit (made in
// ~/Downloads/intense/hero-6676-desktop): each shot reframed, two triptychs,
// the end card's logo kept right of the headline. Rendered without sources until mounted so a phone never
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
          {/* desktop files: AV1 is the sharpest per byte; browsers that can't play it skip to VP9, then H.264 */}
          {variant.startsWith("16x9") && (
            <source src={hv(`hero-${variant}-av1.mp4`)} type='video/mp4; codecs="av01.0.08M.08"' />
          )}
          <source src={hv(`hero-${variant}.webm`)} type="video/webm" />
          <source src={hv(`hero-${variant}.mp4`)} type="video/mp4" />
        </>
      )}
    </video>
  );
}
