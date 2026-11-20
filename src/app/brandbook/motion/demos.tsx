"use client";

import { useEffect, useRef, useState } from "react";

// Brandbook demos for the motion system. Each demo plays the first time it is
// on screen and again on "Повторити": the stage is re-mounted (so keyframe
// animations restart) and every [data-reveal] inside gets .is-in two frames
// later (so transitions run from their hidden state).
export function Replay({ children, className = "", label = "Повторити" }: { children: React.ReactNode; className?: string; label?: string }) {
  const [k, setK] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("mo-ready");
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (k === 0) {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            io.disconnect();
            setK(1);
          }
        },
        { threshold: 0.45 },
      );
      io.observe(el);
      return () => io.disconnect();
    }
    let r1 = 0;
    const r0 = requestAnimationFrame(() => {
      r1 = requestAnimationFrame(() => el.querySelectorAll("[data-reveal]").forEach((n) => n.classList.add("is-in")));
    });
    return () => {
      cancelAnimationFrame(r0);
      cancelAnimationFrame(r1);
    };
  }, [k]);

  return (
    <div className={`bbm-demo ${className}`} ref={ref}>
      <div className="bbm-stage" key={k}>
        {children}
      </div>
      <button type="button" className="bbm-replay" onClick={() => setK((x) => x + 1)}>
        <span aria-hidden="true">↻</span> {label}
      </button>
    </div>
  );
}

/** M05: a direction card that opens on hover (desktop) or tap (phones). */
export function CardDemo({ num, title }: { num: string; title: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" className={`bbm-card${open ? " is-open" : ""}`} onClick={() => setOpen((o) => !o)} aria-pressed={open}>
      <span className="svc__num">{num}</span>
      <span className="svc__title bbm-card__title" data-reveal>
        {title}
        <span className="svc__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </span>
      <span className="bbm-card__hint">{open ? "Натисніть, щоб закрити" : "Наведіть або натисніть"}</span>
    </button>
  );
}

/** M06: the booking field, button, error nudge and the drawn ✓. */
export function BookingDemo({ title }: { title: React.ReactNode }) {
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="bk__card bbm-bk" data-reveal>
      <div className="bk__label">
        <span className="bk__mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        Запис на прийом
      </div>
      <h3 className="bk__title bbm-bk__title">{title}</h3>
      {done ? (
        <div className="bk__done" role="status">
          <span className="bk__done-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
              <path pathLength={1} d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="bk__done-title">Дякуємо, заявку прийнято</p>
          <button type="button" className="bk__again" onClick={() => setDone(false)}>
            Назад до форми
          </button>
        </div>
      ) : (
        <form className="bk__form" noValidate onSubmit={(e) => e.preventDefault()}>
          <div className={`bk__field${error ? " is-error" : ""}`}>
            <label htmlFor="bbm-name">Ім’я та прізвище</label>
            <input id="bbm-name" type="text" placeholder="Клацніть сюди — лінія намалюється" onInput={() => setError(false)} />
            {error && <span className="bk__err">Вкажіть, як до вас звертатися</span>}
          </div>
          <button type="button" className="bk__submit" onClick={() => setDone(true)}>
            <span>Запланувати консультацію</span>
            <span className="bk__submit-arrow" aria-hidden="true">
              →
            </span>
          </button>
          <div className="bbm-bk__tools">
            <button type="button" onClick={() => { setError(false); requestAnimationFrame(() => setError(true)); }}>
              Показати помилку
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
