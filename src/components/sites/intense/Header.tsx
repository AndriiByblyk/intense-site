"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IntenseLogo } from "./IntenseLogo";
import { openBooking } from "./booking";
import { NAV } from "./nav";


// Each label is rendered twice, stacked; on hover the stack rolls up one line.
function RollText({ children }: { children: string }) {
  return (
    <span className="roll" data-text={children}>
      <span className="roll__inner">{children}</span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // The header lives in the hero: it compacts a little as you start
  // scrolling, slides away once you're past ~480px and only comes back when
  // you return to the top (it no longer pops in on every scroll up).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const targets = NAV.map((n) => document.querySelector(n.href)).filter(
      (el): el is Element => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const setOrigin = useCallback(() => {
    const b = burgerRef.current?.getBoundingClientRect();
    if (!b || !panelRef.current) return;
    panelRef.current.style.setProperty("--cx", `${b.left + b.width / 2}px`);
    panelRef.current.style.setProperty("--cy", `${b.top + b.height / 2}px`);
  }, []);

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    document.documentElement.classList.remove("is-menu-open");
    if (returnFocus) burgerRef.current?.focus();
  }, []);

  const toggleMenu = () => {
    if (open) return closeMenu();
    setOrigin();
    setOpen(true);
    document.documentElement.classList.add("is-menu-open");
    requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>(".mmenu__link")?.focus({ preventScroll: true }),
    );
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    const onResize = () => window.innerWidth >= 1024 && closeMenu(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, closeMenu]);

  return (
    <>
      <header
        className={`ih${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}${open ? " is-open" : ""}`}
      >
        <div className="ih__bar container">
          <a className="ih__logo" href="#top" aria-label="INTENSE — на початок">
            <IntenseLogo compact={scrolled && !open} tagline />
          </a>

          <nav className="ih__nav" aria-label="Головне меню">
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`ih__link${active === n.href ? " is-active" : ""}`}
                    aria-current={active === n.href ? "true" : undefined}
                  >
                    <RollText>{n.label}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button type="button" className="ih__cta" onClick={openBooking}>
            <RollText>Запланувати візит</RollText>
            <span className="ih__cta-dot" aria-hidden="true" />
          </button>

          <button
            ref={burgerRef}
            type="button"
            className={`burger${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            onClick={toggleMenu}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`mmenu${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mmenu__inner container">
          <nav aria-label="Мобільне меню">
            <ol className="mmenu__list">
              {NAV.map((n, i) => (
                <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
                  <a
                    className="mmenu__link"
                    href={n.href}
                    onClick={() => closeMenu(false)}
                  >
                    <span className="mmenu__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mmenu__label">{n.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mmenu__foot" style={{ "--i": NAV.length } as React.CSSProperties}>
            <button
              type="button"
              className="mmenu__cta"
              onClick={() => {
                closeMenu(false);
                openBooking();
              }}
            >
              Запланувати візит
              <span aria-hidden="true">→</span>
            </button>
            <IntenseLogo intro={false} className="mmenu__mark" />
          </div>
        </div>
      </div>
    </>
  );
}
