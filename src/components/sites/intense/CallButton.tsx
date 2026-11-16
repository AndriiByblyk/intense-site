"use client";

import { useEffect, useRef, useState } from "react";
import { openBooking } from "./booking";

// TODO: clinic phone number — when set, a direct "call" link appears in the panel.
const PHONE: { href: string; label: string } | null = null;

const WAIT = 30; // seconds promised in the window

// Our own tooth outline (80×92): crown + two roots.
const TOOTH =
  "M40 10C33 10 28 6 20 8 10 10.5 6 20 7 31c1 11 8 18 11 29 3 12 4 24 12 24 6 0 6-16 10-16s4 16 10 16c8 0 9-12 12-24 3-11 10-18 11-29 1-11-3-20.5-13-23-8-2-13 2-20 2Z";

// Floating quick-call: a tooth-shaped button with a handset inside, gold light
// running along the contour; click opens the "we'll call you in 30 seconds"
// window; after sending, a 30-second countdown ring.
export function CallButton() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [left, setLeft] = useState<number | null>(null); // countdown after submit
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Hint bubble once per session, 12 s after load, for 6 s.
  useEffect(() => {
    if (sessionStorage.getItem("intense-call-hint")) return;
    const show = window.setTimeout(() => {
      setHint(true);
      sessionStorage.setItem("intense-call-hint", "1");
    }, 12000);
    const hide = window.setTimeout(() => setHint(false), 18000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (left === null) inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, left]);

  // Phones: keep the panel just above the on-screen keyboard. The layout
  // viewport doesn't shrink when the keyboard opens, the visual one does.
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const vv = window.visualViewport;
    const panel = panelRef.current;
    if (!open || !vv || !panel) return;
    const place = () => {
      const covered = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
      panel.style.setProperty("--kb", `${Math.round(covered)}px`);
    };
    place();
    vv.addEventListener("resize", place);
    vv.addEventListener("scroll", place);
    return () => {
      vv.removeEventListener("resize", place);
      vv.removeEventListener("scroll", place);
      panel.style.setProperty("--kb", "0px");
    };
  }, [open]);

  // Countdown.
  useEffect(() => {
    if (left === null || left <= 0) return;
    const t = window.setTimeout(
      () => setLeft((s) => (s === null ? s : s - 1)),
      1000,
    );
    return () => window.clearTimeout(t);
  }, [left]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = inputRef.current?.value ?? "";
    if (!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){9,14}(\s*)?$/.test(v)) {
      setError(true);
      inputRef.current?.focus();
      return;
    }
    // TODO: send the number to the clinic (Binotel GetCall / Telegram / CRM) — no backend yet.
    setError(false);
    setLeft(WAIT);
  };

  const close = () => {
    setOpen(false);
    btnRef.current?.focus();
  };

  const mmss = (s: number) => `00:${String(s).padStart(2, "0")}`;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`qcall${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="qcall-panel"
        aria-label={
          open ? "Закрити форму дзвінка" : "Передзвонимо за 30 секунд"
        }
        onClick={() => {
          setOpen((o) => !o);
          setHint(false);
        }}
      >
        <svg className="qcall__tooth" viewBox="0 0 80 92" aria-hidden="true">
          <path className="qcall__body" d={TOOTH} />
          <path className="qcall__run" d={TOOTH} pathLength={100} />
          <g transform="translate(22.7 20.5) scale(1.35)">
            <g className="qcall__phone">
              <path
                d="M6.6 3.5h2.3l1.4 4.1-2 1.4a12 12 0 0 0 6.7 6.7l1.4-2 4.1 1.4v2.3c0 1.1-.9 2-2 2C10.8 19.4 4.6 13.2 4.6 5.5c0-1.1.9-2 2-2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <g className="qcall__close">
            <path
              d="M32 28l16 16M48 28 32 44"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </button>

      <div
        className={`qcall__hint${hint && !open ? " is-on" : ""}`}
        aria-hidden="true"
      >
        Передзвонимо за 30 секунд?
      </div>

      <div
        id="qcall-panel"
        ref={panelRef}
        className={`qpanel${open ? " is-open" : ""}`}
        role="dialog"
        aria-label="Передзвонимо за 30 секунд"
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          className="qpanel__close"
          aria-label="Закрити"
          onClick={close}
        >
          <i />
          <i />
        </button>

        {left === null ? (
          <form className="qpanel__form" onSubmit={submit} noValidate>
            <div className="qpanel__head">
              <span className="qpanel__timer" aria-hidden="true">
                <svg viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="20" />
                </svg>
                <b>30</b>
                <small>сек</small>
              </span>
              <div>
                <p className="qpanel__title">Передзвонимо за 30 секунд</p>
                <p className="qpanel__desc">
                  Залиште номер — адміністратор INTENSE зателефонує вам сам.
                </p>
              </div>
            </div>
            <div className={`qpanel__field${error ? " is-error" : ""}`}>
              <label className="sr-only" htmlFor="qcall-phone">
                Номер телефону
              </label>
              <input
                ref={inputRef}
                id="qcall-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+380 __ ___ __ __"
                aria-invalid={error}
                aria-describedby={error ? "qcall-err" : undefined}
                defaultValue="+380 "
                onFocus={(e) => {
                  const el = e.currentTarget;
                  if (!el.value.trim()) el.value = "+380 ";
                  requestAnimationFrame(() => el.setSelectionRange(el.value.length, el.value.length));
                }}
                onInput={(e) => {
                  // keep the +380 prefix: typing starts right after it
                  const el = e.currentTarget;
                  if (!el.value.startsWith("+380")) {
                    const rest = el.value.replace(/^\+?3?8?0?\s*/, "");
                    el.value = "+380 " + rest;
                  }
                  if (error) setError(false);
                }}
              />
              <button type="submit" className="qpanel__send">
                Чекаю дзвінка
              </button>
            </div>
            {error && (
              <span id="qcall-err" className="qpanel__err">
                Перевірте номер телефону
              </span>
            )}
            <div className="qpanel__more">
              {PHONE && (
                <a href={PHONE.href}>Або зателефонуйте: {PHONE.label}</a>
              )}
              <button
                type="button"
                className="qpanel__alt"
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
              >
                Записатися онлайн →
              </button>
            </div>
          </form>
        ) : (
          <div className="qpanel__wait" aria-live="polite">
            <span
              className={`qpanel__timer is-running${left === 0 ? " is-done" : ""}`}
              style={{ "--p": (WAIT - left) / WAIT } as React.CSSProperties}
              aria-hidden="true"
            >
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="20" />
                <circle
                  className="qpanel__timer-run"
                  cx="22"
                  cy="22"
                  r="20"
                  pathLength={100}
                />
              </svg>
              <b>{left}</b>
              <small>сек</small>
            </span>
            {left > 0 ? (
              <p>
                <b>Вже телефонуємо.</b> Тримайте телефон поруч — {mmss(left)}
              </p>
            ) : (
              <p>
                <b>Дякуємо!</b> Якщо дзвінок ще не надійшов, адміністратор
                зателефонує найближчим часом.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
