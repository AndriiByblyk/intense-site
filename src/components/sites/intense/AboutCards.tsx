"use client";

import { useEffect, useRef, useState } from "react";

type Card = { title: string; text: string; size: "wide" | "narrow" | "full" };

const CARDS: Card[] = [
  {
    title: "План, який ви бачите наперед",
    text: "Фотопротокол, цифрове сканування й огляд — і ще до початку лікування ви знаєте його етапи, терміни та вартість.",
    size: "wide",
  },
  {
    title: "Одна команда навколо вашої усмішки",
    text: "Терапевт, хірург, ортопед і ортодонт разом обговорюють ваш випадок, а лікування каналів і реставрації — виключно під мікроскопом.",
    size: "narrow",
  },
  {
    title: "Онлайн-консультація",
    text: "Живете в іншому місті чи хочете спершу порадитися? Надішліть фото усмішки й знімки — лікар перегляне їх і розповість про варіанти лікування ще до візиту.",
    size: "full",
  },
];

// Typographic bento: a wide and a narrow card, then the online consultation
// across the full width on desktop; one column on phones. Everything is always
// readable (no hidden content).
//  - cards rise in one after another when the grid enters the viewport
//  - desktop: a gold light follows the pointer inside the hovered card,
//    the outlined number fills with gold, the ≡ bars run
//  - phones (no hover): the card nearest the middle of the screen is "lit"
export function AboutCards() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [lit, setLit] = useState<number | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reveal = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          reveal.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    reveal.observe(grid);

    // touch screens: light the card crossing the middle band
    const touch = window.matchMedia("(hover: none)");
    let band: IntersectionObserver | null = null;
    const setupBand = () => {
      band?.disconnect();
      band = null;
      if (!touch.matches) return setLit(null);
      band = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => e.isIntersecting && setLit(Number((e.target as HTMLElement).dataset.i))),
        { rootMargin: "-45% 0px -45% 0px" },
      );
      grid.querySelectorAll<HTMLElement>(".abx__card").forEach((c) => band!.observe(c));
    };
    setupBand();
    touch.addEventListener("change", setupBand);
    return () => {
      reveal.disconnect();
      band?.disconnect();
      touch.removeEventListener("change", setupBand);
    };
  }, []);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={gridRef} className={`abx${shown ? " is-shown" : ""}`}>
      {CARDS.map((c, i) => (
        <article
          key={c.title}
          data-i={i}
          className={`abx__card abx__card--${c.size}${lit === i ? " is-lit" : ""}`}
          style={{ "--i": i } as React.CSSProperties}
          onPointerMove={onMove}
        >
          <span className="abx__glow" aria-hidden="true" />
          <div className="abx__top">
            <span className="abx__num">{String(i + 1).padStart(2, "0")}</span>
            <span className="abx__mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="abx__body">
            <h4 className="abx__title">{c.title}</h4>
            <p className="abx__text">{c.text}</p>
          </div>
          <span className="abx__ghost" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </article>
      ))}
    </div>
  );
}
