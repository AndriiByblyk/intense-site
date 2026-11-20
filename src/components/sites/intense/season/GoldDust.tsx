"use client";

import { useEffect, useRef } from "react";

// N1 · New Year: slow gold dust over the hero film. A few dozen specks fall
// at 10–28 px/s, sway, and glint; three or four large soft out-of-focus ones
// give depth. Only while html[data-season="ny"] (or `force` in the brandbook).
//  - pre-rendered glow sprites, drawImage only (no shadowBlur per frame)
//  - pauses off screen and in background tabs; pixel ratio capped at 2
//  - reduced motion or data saver: one still frame of specks, no animation
type Speck = { x0: number; y: number; r: number; vy: number; sway: number; f: number; ph: number; tw: number; a: number; c: 0 | 1; soft: boolean };

export function GoldDust({ force = false }: { force?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (!force && document.documentElement.dataset.season !== "ny") return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    cv.classList.add("is-on");

    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || !!nav.connection?.saveData;

    // glow sprites: gold and paper, 64 px, drawn once
    const sprite = (rgb: string) => {
      const s = document.createElement("canvas");
      s.width = s.height = 64;
      const g = s.getContext("2d")!;
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, `rgba(${rgb},1)`);
      grd.addColorStop(0.18, `rgba(${rgb},0.85)`);
      grd.addColorStop(0.45, `rgba(${rgb},0.18)`);
      grd.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      return s;
    };
    const SPR = [sprite("216,197,142"), sprite("241,239,233")];

    let w = 0;
    let h = 0;
    let specks: Speck[] = [];
    const make = (y?: number): Speck => {
      const soft = Math.random() < 0.08;
      const r = soft ? 6 + Math.random() * 7 : 0.8 + Math.random() * 1.6;
      return {
        x0: Math.random() * w,
        y: y ?? Math.random() * h,
        r,
        vy: soft ? 6 + Math.random() * 6 : 10 + r * 9 + Math.random() * 6,
        sway: 6 + Math.random() * 14,
        f: 0.15 + Math.random() * 0.35,
        ph: Math.random() * Math.PI * 2,
        tw: 0.6 + Math.random() * 1.6,
        a: soft ? 0.12 + Math.random() * 0.1 : 0.5 + Math.random() * 0.4,
        c: Math.random() < 0.72 ? 0 : 1,
        soft,
      };
    };

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(20, Math.min(64, Math.round((w * h) / 24000)));
      specks = Array.from({ length: n }, () => make());
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of specks) {
        const x = s.x0 + Math.sin(t * s.f + s.ph) * s.sway;
        const glint = 0.55 + 0.45 * Math.sin(t * s.tw + s.ph * 2);
        ctx.globalAlpha = s.a * (s.soft ? 1 : glint);
        const d = s.r * (s.soft ? 2.2 : 7);
        ctx.drawImage(SPR[s.c], x - d / 2, s.y - d / 2, d, d);
      }
      ctx.globalAlpha = 1;
    };

    size();
    if (still) {
      draw();
      return;
    }

    let raf = 0;
    let last = 0;
    let visible = true;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      t += dt;
      for (const s of specks) {
        s.y += s.vy * dt;
        if (s.y - s.r * 6 > h) Object.assign(s, make(-12));
      }
      draw();
      raf = requestAnimationFrame(frame);
    };
    const run = () => {
      if (raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) run();
      else stop();
    });
    io.observe(cv);
    const onVis = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => size());
    ro.observe(cv);
    run();
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [force]);

  return <canvas ref={ref} className="ny-dust" aria-hidden="true" />;
}
