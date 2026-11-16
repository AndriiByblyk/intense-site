"use client";

import { useEffect } from "react";

type Props = {
  /** id of the section whose cards morph */
  section?: string;
  /** the cards inside it */
  selector?: string;
};

// Card morph helper (services, doctors): keep --tx / --ty (the pointer's
// position as % of each card) up to date, so the second photo opens as a
// circle from where the card is entered or touched (a radial mask driven by
// the registered --svc-r, see intense.css "card morph"). With a mouse every
// card is updated while the pointer moves over the section, so the centre is
// already in place when the morph starts and only the radius animates; a
// touch or click sets it on the card being pressed.
export function SvcMorph({ section = "section-services", selector = ".svc" }: Props) {
  useEffect(() => {
    const root = document.getElementById(section);
    if (!root) return;
    const place = (card: HTMLElement, x: number, y: number) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--tx", `${(((x - r.left) / r.width) * 100).toFixed(1)}%`);
      card.style.setProperty("--ty", `${(((y - r.top) / r.height) * 100).toFixed(1)}%`);
    };
    let raf = 0;
    let last: PointerEvent | null = null;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!last) return;
        root.querySelectorAll<HTMLElement>(selector).forEach((c) => place(c, last!.clientX, last!.clientY));
      });
    };
    const onDown = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (card) place(card, e.clientX, e.clientY);
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerdown", onDown, { passive: true, capture: true });
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown, { capture: true });
      cancelAnimationFrame(raf);
    };
  }, [section, selector]);
  return null;
}
