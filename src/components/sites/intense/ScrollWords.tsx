"use client";

import { useEffect, useRef } from "react";

// Words that light up one after another as the heading scrolls through the
// screen. Split on the server.
//  - Modern browsers (Chrome/Android, Safari 26+): pure CSS scroll-driven
//    animation (`animation-timeline: view()`), so it works from the first
//    frame, before any JavaScript has loaded.
//  - Older browsers: words stay fully visible until hydration, then this
//    component drives the same effect with a small rAF scroll handler.
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (CSS.supports?.("animation-timeline: view()")) return; // CSS handles it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".sw__w"));
    const n = words.length;
    el.classList.add("sw--js");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts when the top reaches 85 % of the viewport, ends when the bottom reaches 55 %
      const p = Math.min(1, Math.max(0, (0.85 * vh - r.top) / (0.3 * vh + r.height)));
      const lit = p * n;
      for (let i = 0; i < n; i++) {
        words[i].style.setProperty("--a", Math.min(1, Math.max(0, lit - i)).toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const parts = text.split(" ");
  const n = parts.length;
  return (
    <h2 ref={ref} className={`sw ${className ?? ""}`} aria-label={text}>
      {parts.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="sw__w" style={{ "--p": i / n, "--q": 1 / n } as React.CSSProperties}>
            {w}
          </span>
          {i < n - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
