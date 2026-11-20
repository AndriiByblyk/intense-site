"use client";

import { useEffect } from "react";

// One IntersectionObserver for every [data-reveal] element on the page: it adds
// .is-in once, the first time the element is on screen, and never removes it
// (the page does not replay as you scroll back).
//
// The hidden "before" states in motion.css apply only under html.mo-ready,
// which this component sets. So without JavaScript, or with reduced motion,
// nothing is ever hidden. Elements that enter in the same frame (a row of
// cards) get a 70 ms stagger in their reading order through --d.
export function MotionObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window) || !els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        hits.forEach((e, i) => {
          const el = e.target as HTMLElement;
          if (hits.length > 1) el.style.setProperty("--d", `${i * 70}ms`);
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );

    // Elements already on screen at load are marked before the hidden state
    // switches on, so they never blink out and back in.
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > 0) el.classList.add("is-in");
      else io.observe(el);
    }
    root.classList.add("mo-ready");
    return () => io.disconnect();
  }, []);
  return null;
}
