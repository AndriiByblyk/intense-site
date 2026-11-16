"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** CSS hook: `car--{name}` (sizes per breakpoint live in intense.css) */
  name: string;
  /** Slide to show first when the layout is centred (desktop galleries). */
  centreStart?: number;
  /** "Wants to swipe" nudge, twice, until the visitor moves the row. */
  nudge?: boolean;
  /** Clicking a side slide brings it to the front. */
  clickToFront?: boolean;
  /** Clicking the slide peeking in on the right moves one step. */
  clickPeek?: boolean;
  /** Selector inside a slide that must never trigger click-to-front. */
  ignore?: string;
  /** One card per swipe, and cards morph (scale, turn, dim) by their distance from the snap point. */
  morph?: boolean;
  className?: string;
  label: string;
  children: React.ReactNode;
};

// Native horizontal scroller (CSS scroll-snap) — works from the first paint,
// the finger drives it directly, nothing is rebuilt by a script after load.
// Layout per breakpoint comes from CSS variables on `.car--{name}`:
//   --pv   slides per view (fractional = the next one peeks in)
//   --gap  gap between slides
//   --c    1 = active slide centred (galleries on desktop), 0 = aligned left
// Arrows rewind at the ends; dots jump; the active slide gets `.is-active`;
// a `carousel:change` event bubbles from the root on every change.
export function Carousel({
  name,
  centreStart = 0,
  nudge = false,
  clickToFront = false,
  clickPeek = false,
  ignore,
  morph = false,
  className = "",
  label,
  children,
}: Props) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState<boolean[]>([]);
  const moved = useRef(false);
  const activeRef = useRef(0);

  const isCentred = () =>
    rootRef.current ? getComputedStyle(rootRef.current).getPropertyValue("--c").trim() === "1" : false;

  const slideEls = () => Array.from(railRef.current?.children ?? []) as HTMLElement[];

  const leftFor = useCallback((i: number) => {
    const track = trackRef.current;
    const el = slideEls()[i];
    if (!track || !el) return 0;
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    return isCentred()
      ? el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2
      : el.offsetLeft - pad;
  }, []);

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;
      const k = ((i % n) + n) % n;
      track.scrollTo({ left: leftFor(k), behavior: smooth ? "smooth" : "instant" });
    },
    [n, leftFor],
  );

  // Work out the active slide and which slides are fully on screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      // the nudge shifts the row visually; measure once it has finished
      if (railRef.current?.classList.contains("is-nudge")) return;
      const els = slideEls();
      const tr = track.getBoundingClientRect();
      const centred = isCentred();
      let best = 0;
      let bestD = Infinity;
      const vis: boolean[] = [];
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = centred ? Math.abs(r.left + r.width / 2 - (tr.left + tr.width / 2)) : Math.abs(r.left - tr.left - (parseFloat(getComputedStyle(track).paddingLeft) || 0));
        if (d < bestD) { bestD = d; best = i; }
        vis.push(r.left >= tr.left - 4 && r.right <= tr.right + 4);
      });
      setVisible(vis);
      if (best !== activeRef.current) {
        activeRef.current = best;
        setActive(best);
        rootRef.current?.dispatchEvent(new CustomEvent("carousel:change", { bubbles: true, detail: { index: best } }));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const onUser = () => (moved.current = true);
    // Swiping on past the last slide wraps round to the first one.
    let startX = 0;
    let startedAtEnd = false;
    const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startedAtEnd = atEnd();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = (e.changedTouches[0]?.clientX ?? startX) - startX;
      if (startedAtEnd && atEnd() && dx < -40) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      }
    };
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", measure);
    railRef.current?.addEventListener("animationend", measure);
    track.addEventListener("pointerdown", onUser, { passive: true });
    track.addEventListener("touchstart", onUser, { passive: true });
    track.addEventListener("wheel", onUser, { passive: true });
    const ro = new ResizeObserver(() => {
      onScroll();
    });
    ro.observe(track);
    // start position: centred galleries begin on `centreStart`
    if (isCentred() && centreStart) track.scrollTo({ left: leftFor(centreStart), behavior: "instant" });
    measure();
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", measure);
      railRef.current?.removeEventListener("animationend", measure);
      track.removeEventListener("pointerdown", onUser);
      track.removeEventListener("touchstart", onUser);
      track.removeEventListener("wheel", onUser);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [centreStart, leftFor]);

  // Morph: every frame the row moves, each slide gets --p, its signed distance
  // in slides from the snap point (centre, or the left edge), clamped to the
  // range that should morph; CSS turns it into scale / turn / dim. Left-aligned
  // rows showing several cards only morph the card leaving on the left.
  useEffect(() => {
    if (!morph) return;
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const els = slideEls();
      if (!els.length) return;
      // layout positions (offsetLeft), not boxes: the morph's own transform must not feed back
      const centred = isCentred();
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const x = track.scrollLeft;
      const pv = parseFloat(getComputedStyle(rootRef.current!).getPropertyValue("--pv")) || 1;
      const step = els.length > 1 ? els[1].offsetLeft - els[0].offsetLeft : els[0].offsetWidth;
      const hi = centred || pv < 1.5 ? 1 : 0;
      els.forEach((el) => {
        const off = centred
          ? el.offsetLeft + el.offsetWidth / 2 - x - track.clientWidth / 2
          : el.offsetLeft - pad - x;
        const p = Math.max(-1, Math.min(hi, off / step));
        el.style.setProperty("--p", p.toFixed(4));
        el.style.setProperty("--ap", Math.abs(p).toFixed(4));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(track);
    update();
    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [morph]);

  // The peeking card "wants to swipe": twice, then never again.
  useEffect(() => {
    if (!nudge) return;
    const root = rootRef.current;
    const rail = railRef.current;
    if (!root || !rail || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let count = 0;
    const timers: number[] = [];
    const play = () => {
      if (moved.current || count >= 2) return;
      count++;
      rail.classList.remove("is-nudge");
      void rail.offsetWidth;
      rail.classList.add("is-nudge");
      timers.push(
        window.setTimeout(() => {
          rail.classList.remove("is-nudge");
          rail.dispatchEvent(new Event("animationend"));
        }, 1500),
      );
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        timers.push(window.setTimeout(play, 700), window.setTimeout(play, 5200));
        io.disconnect();
      },
      { threshold: 0.55 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [nudge]);

  const onSlideClickCapture = (i: number) => (e: React.MouseEvent) => {
    if (i === activeRef.current) return;
    if (ignore && (e.target as HTMLElement).closest(ignore)) return;
    if (clickToFront || (clickPeek && i > activeRef.current && !visible[i])) {
      e.stopPropagation();
      e.preventDefault();
      moved.current = true;
      goTo(clickToFront ? i : activeRef.current + 1);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`car car--${name}${morph ? " car--morph" : ""} ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div ref={trackRef} className="car__track" tabIndex={-1}>
        <div ref={railRef} className="car__rail">
          {slides.map((child, i) => (
            <div
              key={i}
              className={`car__slide${i === active ? " is-active" : ""}${visible[i] ? " is-visible" : " is-partial"}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} з ${n}`}
              onClickCapture={onSlideClickCapture(i)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="car__nav">
        <button
          type="button"
          className="car__arrow"
          aria-label="Попередній"
          onClick={() => {
            moved.current = true;
            goTo(active - 1);
          }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" aria-hidden="true">
            <circle cx="25" cy="25" r="24.5" stroke="currentColor" strokeOpacity=".35" />
            <path d="M29 25H21m0 0 4-4m-4 4 4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="car__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`car__dot${i === active ? " is-active" : ""}`}
              aria-label={`Перейти до ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => {
                moved.current = true;
                goTo(i);
              }}
            />
          ))}
        </div>
        <button
          type="button"
          className="car__arrow"
          aria-label="Наступний"
          onClick={() => {
            moved.current = true;
            // left-aligned rows: once the last slide is fully shown, rewind
            const track = trackRef.current;
            const atEnd = track ? track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 : false;
            goTo(atEnd && !isCentred() ? 0 : active + 1);
          }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" aria-hidden="true">
            <circle cx="25" cy="25" r="24.5" stroke="currentColor" strokeOpacity=".35" />
            <path d="M21 25h8m0 0-4-4m4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
