"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = { before: string; after: string; alt: string };

const REST = 7; // % of the "before" photo left peeking at rest

// The "there is something underneath" nudge is shared by all cases and kept
// short: it plays twice in total, only on the centred (active) case, and stops
// for good as soon as a visitor touches any compare slider.
const MAX_HINTS = 2;
const HINT_GAP = 6500; // ms between the two nudges
const hintState = { played: 0, last: 0, dismissed: false };

// Before/after reveal that starts on the finished smile. Only a thin sliver of
// the "before" shows at the left edge; every few seconds while on screen the
// divider nudges in and back (twice, centred case only) to hint there is
// something underneath.
//  - reveal only by grabbing the centre handle (the bars) and dragging it,
//    with a mouse, finger or pen; the photo itself does nothing on hover
//    (the handle is marked swiper-no-swiping, so the slider doesn't move)
//  - keyboard: the handle is a slider (←/→, Home/End)
export function CompareReveal({ before, after, alt }: Props) {
  const [pos, setPos] = useState(REST);
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const posFromX = useCallback((clientX: number) => {
    const r = rootRef.current?.getBoundingClientRect();
    if (!r) return REST;
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
  }, []);

  // Nudge: only while this case is visible AND the centred/active slide,
  // twice overall, never again after the visitor has used a slider.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    let since = 0; // when this case became visible + active
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    let off: number | undefined;
    const tick = () => {
      if (hintState.dismissed || hintState.played >= MAX_HINTS) return window.clearInterval(timer);
      const active = el.closest(".car__slide")?.classList.contains("is-active");
      if (!visible || !active) {
        since = 0;
        return;
      }
      const now = Date.now();
      if (!since) since = now;
      if (now - since < 900 || now - hintState.last < HINT_GAP) return;
      hintState.last = now;
      hintState.played += 1;
      setHint(true);
      off = window.setTimeout(() => setHint(false), 1400);
    };
    const timer = window.setInterval(tick, 400);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
      window.clearTimeout(off);
    };
  }, []);

  const dismissHint = () => {
    hintState.dismissed = true;
    setHint(false);
  };

  const shown = dragging || engaged ? pos : hint ? REST + 16 : REST;

  return (
    <div
      ref={rootRef}
      className={`cmp${dragging ? " is-dragging" : ""}${engaged ? " is-engaged" : ""}`}
      style={{ "--pos": `${shown}%` } as React.CSSProperties}
    >
      <img className="cmp__img cmp__img--after" src={after} alt={`${alt} — після`} loading="lazy" decoding="async" draggable={false} />
      <div className="cmp__before" aria-hidden="true">
        <img className="cmp__img" src={before} alt="" loading="lazy" decoding="async" draggable={false} />
      </div>

      <div className="cmp__line" aria-hidden="true" />
      <button
        type="button"
        className="cmp__handle swiper-no-swiping"
        role="slider"
        aria-label="Порівняти до і після"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(shown)}
        aria-valuetext={`показано «до» на ${Math.round(shown)}%`}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.currentTarget.setPointerCapture(e.pointerId);
          dismissHint();
          setDragging(true);
          setEngaged(true);
        }}
        onPointerMove={(e) => {
          if (dragging) setPos(posFromX(e.clientX));
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 20 : 5;
          let next: number | null = null;
          if (e.key === "ArrowRight") next = pos + step;
          if (e.key === "ArrowLeft") next = pos - step;
          if (e.key === "Home") next = 0;
          if (e.key === "End") next = 100;
          if (next === null) return;
          e.preventDefault();
          dismissHint();
          setEngaged(true);
          setPos(Math.min(100, Math.max(0, next)));
        }}
      >
        <span className="cmp__grip">
          <i />
          <i />
          <i />
        </span>
      </button>
    </div>
  );
}
