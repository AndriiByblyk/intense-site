"use client";

import { useEffect, useRef, useState } from "react";

// New Year · a real string of lights, edge to edge. Built in pixels for the
// width it actually has (so bulbs never stretch): the wire hangs in spans of
// ~210 px (~120 on phones) with slightly different sags, a twisted pair of
// wires, glass drop bulbs (SeasonDefs) that hang at the wire's angle plus a
// little play, and a warm halo under each bulb that breathes on its own
// rhythm. The shape is seeded, so it is the same on every visit; it is rebuilt
// only when the width changes. Nothing is built off season.
type Kind = "warm" | "amber" | "cream";
type Bulb = { x: number; y: number; r: number; k: Kind; tw: number; dl: number };
type Geo = { w: number; h: number; wire: string; hi: string; bulbs: Bulb[]; s: number };

const KINDS: Kind[] = ["warm", "amber", "warm", "cream", "amber", "warm", "cream"];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(w: number, seed: number): Geo {
  const R = rng(seed);
  const phone = w < 768;
  const s = phone ? 0.8 : 1; // bulb scale
  const spans = Math.max(2, Math.round(w / (phone ? 120 : 210)));
  const raw = Array.from({ length: spans }, () => 1 + (R() - 0.5) * 0.3);
  const sum = raw.reduce((a, b) => a + b, 0);
  const widths = raw.map((v) => (v / sum) * w);
  const step = phone ? 34 : 44;
  let x = 0;
  let wire = "M0 2";
  let hi = "M0 1.4";
  let maxSag = 0;
  const bulbs: Bulb[] = [];
  let n = 0;
  for (const sw of widths) {
    const sag = (phone ? 15 : 24) + R() * (phone ? 9 : 16);
    maxSag = Math.max(maxSag, sag);
    wire += ` Q ${(x + sw / 2).toFixed(1)} ${(2 + 2 * sag).toFixed(1)} ${(x + sw).toFixed(1)} 2`;
    hi += ` Q ${(x + sw / 2).toFixed(1)} ${(1.4 + 2 * sag - 0.8).toFixed(1)} ${(x + sw).toFixed(1)} 1.4`;
    const count = Math.max(2, Math.round(sw / step));
    for (let k = 0; k < count; k++) {
      const t = (k + 0.5) / count;
      const slope = (4 * sag * (1 - 2 * t)) / sw;
      const ang = (Math.atan(slope) * 180) / Math.PI;
      bulbs.push({
        x: x + t * sw,
        y: 2 + 4 * sag * t * (1 - t),
        r: ang * 0.55 + (R() - 0.5) * 18,
        k: KINDS[n++ % KINDS.length],
        tw: 2.2 + R() * 2.8,
        dl: -R() * 6,
      });
    }
    x += sw;
  }
  return { w, h: Math.ceil(maxSag + 2 + 22 * s + 14), wire, hi, bulbs, s };
}

export function Garland({ className = "", seed = 7 }: { className?: string; seed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset.season !== "ny" && !el.closest(".ny-preview")) return;
    let lastW = 0;
    const update = () => {
      const w = Math.round(el.clientWidth);
      if (!w || w === lastW) return;
      lastW = w;
      setGeo(build(w, seed));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [seed]);

  return (
    <div ref={ref} className={`ny-garland ${className}`} style={geo ? { height: geo.h } : undefined} aria-hidden="true">
      {geo && (
        <>
          {geo.bulbs.map((b, i) => {
            const a = (b.r * Math.PI) / 180;
            const d = 14 * geo.s; // glass centre below the socket
            return (
              <i
                key={i}
                className={`ny-glow ny-glow--${b.k}`}
                style={{ left: b.x - d * Math.sin(a), top: b.y + d * Math.cos(a), "--tw": `${b.tw}s`, "--dl": `${b.dl}s` } as React.CSSProperties}
              />
            );
          })}
          <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
            <path className="ny-garland__wire" d={geo.wire} />
            <path className="ny-garland__hi" d={geo.hi} />
            {geo.bulbs.map((b, i) => (
              <use
                key={i}
                href={`#ny-bulb-${b.k}`}
                x={-7 * geo.s}
                y={0}
                width={14 * geo.s}
                height={22 * geo.s}
                transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${b.r.toFixed(1)})`}
              />
            ))}
          </svg>
        </>
      )}
    </div>
  );
}
