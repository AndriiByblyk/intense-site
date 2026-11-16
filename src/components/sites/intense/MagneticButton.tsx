"use client";

import { useRef } from "react";
import { openBooking } from "./booking";

// Hero CTA. The button leans toward the pointer, a gold fill grows from the
// exact point the pointer entered, and the ≡ in the badge turns into an arrow.
// Plain click / keyboard behave like any button; motion is off under
// prefers-reduced-motion and on touch.
export function MagneticButton({ children }: { children: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setPoint = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
    return r;
  };

  const onMove = (e: React.PointerEvent) => {
    const r = setPoint(e);
    if (!r || !canHover()) return;
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    ref.current!.style.setProperty("--mx", `${dx * 10}px`);
    ref.current!.style.setProperty("--my", `${dy * 8}px`);
  };

  const onLeave = (e: React.PointerEvent) => {
    setPoint(e);
    ref.current?.style.setProperty("--mx", "0px");
    ref.current?.style.setProperty("--my", "0px");
  };

  return (
    <button
      ref={ref}
      type="button"
      className="mbtn"
      onPointerEnter={setPoint}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={openBooking}
    >
      <span className="mbtn__fill" aria-hidden="true" />
      <span className="mbtn__label">{children}</span>
      <span className="mbtn__badge" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
