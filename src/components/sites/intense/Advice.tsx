"use client";

import { IS_NY } from "./edition";
import { Ribbon } from "./season/Ornaments";
import { riseWords } from "./motion/Rise";
import { useState } from "react";
import { IntenseLogo } from "./IntenseLogo";

// Booking card before the footer. Own markup (bk-*) instead of the theme's
// contact-form classes, so the theme's form rules don't fight it.
// NOTE: there is no delivery channel yet — a valid form only shows the thank-you
// state. Connect it (Telegram bot / email / CRM) before relying on it.
const PURPOSES = [
  "Консультація",
  "Профілактика та пародонтологічне лікування",
  "Ортопедичне лікування",
  "Терапевтичне лікування",
  "Ендодонтичне лікування",
  "Ортодонтичне лікування",
  "Хірургічне лікування",
  "Обстеження та діагностика",
  "Лікування м’язової та суглобової дисфункції",
  "Не впевнений/-а, що саме мені потрібно",
];

type Errors = Partial<Record<"name" | "phone" | "purpose", string>>;

const PHONE_RE = /^\+?[\d\s()-]{9,18}$/;

export function Advice() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("full-name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const purpose = String(f.get("purpose") ?? "");
    const next: Errors = {};
    if (name.length < 2) next.name = "Вкажіть, як до вас звертатися";
    if (!PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 9) next.phone = "Перевірте номер телефону";
    if (!purpose) next.purpose = "Оберіть мету візиту";
    setErrors(next);
    const firstBad = (["name", "phone", "purpose"] as const).find((k) => next[k]);
    if (firstBad) {
      document.getElementById(`bk-${firstBad}`)?.focus();
      return;
    }
    e.currentTarget.reset();
    setSent(true);
  };

  const clear = (k: keyof Errors) => errors[k] && setErrors((x) => ({ ...x, [k]: undefined }));

  return (
    <section className="iadvice bk" id="section-booking">
      <div className="iadvice__ghost" aria-hidden="true">
        <IntenseLogo intro={false} />
      </div>
      <div className="container">
        <div className="bk__card" data-reveal>
          {IS_NY && <Ribbon className="ny-ribbon--bk" />}
          <div className="bk__intro">
            <div className="bk__label">
              <span className="bk__mark" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              Запис на прийом
            </div>
            <h2 className="bk__title">{riseWords("Запланувати консультацію")}</h2>
            <p className="bk__lead">
              Залиште ваші контактні дані — адміністратор INTENSE зателефонує, підбере зручний час і лікаря під ваш
              запит.
            </p>
          </div>

          <div className="bk__panel">
            {sent ? (
              <div className="bk__done" role="status">
                <span className="bk__done-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                    <path pathLength={1} d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="bk__done-title">Дякуємо, заявку прийнято</h3>
                <p className="bk__done-text">Адміністратор зателефонує вам у робочі години, щоб узгодити час візиту.</p>
                <button type="button" className="bk__again" onClick={() => setSent(false)}>
                  Заповнити ще раз
                </button>
              </div>
            ) : (
              <form className="bk__form" noValidate onSubmit={onSubmit} aria-label="Запис на консультацію">
                <div className={`bk__field${errors.name ? " is-error" : ""}`}>
                  <label htmlFor="bk-name">Ім’я та прізвище</label>
                  <input
                    id="bk-name"
                    name="full-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Як до вас звертатися"
                    maxLength={120}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "bk-name-err" : undefined}
                    onInput={() => clear("name")}
                  />
                  {errors.name && <span className="bk__err" id="bk-name-err">{errors.name}</span>}
                </div>
                <div className={`bk__field${errors.phone ? " is-error" : ""}`}>
                  <label htmlFor="bk-phone">Номер телефону</label>
                  <input
                    id="bk-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+380 __ ___ __ __"
                    maxLength={20}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "bk-phone-err" : undefined}
                    onInput={() => clear("phone")}
                  />
                  {errors.phone && <span className="bk__err" id="bk-phone-err">{errors.phone}</span>}
                </div>
                <div className="bk__field bk__field--select">
                  <label htmlFor="bk-doctor">Лікар</label>
                  <select id="bk-doctor" name="doctor" defaultValue="">
                    <option value="">Будь-який — підберемо</option>
                  </select>
                </div>
                <div className={`bk__field bk__field--select${errors.purpose ? " is-error" : ""}`}>
                  <label htmlFor="bk-purpose">Мета візиту</label>
                  <select
                    id="bk-purpose"
                    name="purpose"
                    required
                    defaultValue=""
                    aria-invalid={errors.purpose ? "true" : "false"}
                    aria-describedby={errors.purpose ? "bk-purpose-err" : undefined}
                    onChange={() => clear("purpose")}
                  >
                    <option value="" disabled>
                      Оберіть напрям
                    </option>
                    {PURPOSES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.purpose && <span className="bk__err" id="bk-purpose-err">{errors.purpose}</span>}
                </div>
                <button type="submit" className="bk__submit">
                  <span>Запланувати консультацію</span>
                  <span className="bk__submit-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
