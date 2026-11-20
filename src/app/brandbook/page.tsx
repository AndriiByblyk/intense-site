import type { Metadata } from "next";
import { v } from "@/components/sites/intense/assetVersion";
import { IntenseLogo } from "@/components/sites/intense/IntenseLogo";

export const metadata: Metadata = {
  title: "INTENSE — брендбук",
  robots: { index: false, follow: false },
};

const B = "/sites/intense/brand";

const COLORS = [
  { name: "Ink", hex: "#0B0A07", role: "Основний фон, текст на світлому", ratio: "17.2 : 1 з Paper" },
  { name: "Paper", hex: "#F1EFE9", role: "Текст на темному, світлі поверхні", ratio: "17.2 : 1 з Ink" },
  { name: "Gold", hex: "#B8A46C", role: "Акцент на темному: ≡, CTA, активні стани", ratio: "8.1 : 1 з Ink" },
  { name: "Gold light", hex: "#D8C58E", role: "Наведення, світловий відблиск", ratio: "11.6 : 1 з Ink" },
  { name: "Bronze", hex: "#8F5336", role: "Акцент на світлому (замість Gold)", ratio: "5.3 : 1 з Paper" },
];

const STICKERS = [
  { file: "01-round-wordmark", name: "Круглий знак", use: "аватар, наліпка на пакет і папку" },
  { file: "02-ring-gold", name: "Кільце", use: "запечатування конверта, подарункові пакети" },
  { file: "03-mark-square", name: "Знак ≡", use: "ноутбук, телефон, футляр для брекетів" },
  { file: "04-pill-smile", name: "Smile 360°", use: "після консультації, у картку пацієнта" },
  { file: "05-pill-light", name: "Усмішка INTENSE", use: "дитяча наліпка після візиту" },
  { file: "06-tag-gold", name: "Dental Clinic", use: "коробки, сертифікати, пакети з ґаджетами" },
];

const LOGOS = [
  { file: "logo-lockup-paper-gold", label: "Темний фон", bg: "#0B0A07" },
  { file: "logo-lockup-ink-bronze", label: "Світлий фон", bg: "#F1EFE9" },
  { file: "logo-lockup-ink", label: "На золотому / фото", bg: "#B8A46C" },
];

export default function Brandbook() {
  return (
    <>
      <link rel="stylesheet" href={v("/sites/intense/theme/css/reset.css")} precedence="default" />
      <link rel="stylesheet" href={v("/sites/intense/intense.css")} precedence="default" />
      <link rel="stylesheet" href={v("/sites/intense/brandbook.css")} precedence="high" />

      <main className="bb">
        {/* cover */}
        <header className="bb__cover">
          <div className="bb__wrap">
            <p className="bb__eyebrow">Брендбук · v0.1 · чернетка</p>
            <div className="bb__cover-logo">
              <IntenseLogo tagline />
            </div>
            <nav className="bb__toc" aria-label="Зміст">
              {["Логотип", "Колір", "Шрифт", "Мотив ≡", "Рух", "Наліпки", "Тон голосу"].map((t, i) => (
                <a key={t} href={`#s${i + 1}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* 1 logo */}
        <section id="s1" className="bb__sec">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>01</span> Логотип</h2>
            <p className="bb__lead">
              Слово INTENSE, набране широким геометричним гротеском із великим розрядом. Дві літери «E»
              замінені на три горизонтальні смуги ≡ — це і є впізнаваний знак. Під ним — підпис
              DENTAL CLINIC.
            </p>
            <div className="bb__grid bb__grid--3">
              {LOGOS.map((l) => (
                <figure key={l.file} className="bb__card" style={{ background: l.bg }}>
                  <img src={`${B}/${l.file}.svg`} alt={`Логотип INTENSE Dental Clinic — ${l.label}`} />
                  <figcaption style={{ color: l.bg === "#0B0A07" ? "#F1EFE9" : "#0B0A07" }}>{l.label}</figcaption>
                </figure>
              ))}
            </div>

            <div className="bb__grid bb__grid--2 bb__mt">
              <div>
                <h3 className="bb__h3">Охоронне поле</h3>
                <div className="bb__clear">
                  <div className="bb__clear-box">
                    <img src={`${B}/logo-lockup-paper-gold.svg`} alt="" />
                  </div>
                </div>
                <p className="bb__note">
                  Навколо логотипа лишаємо порожнім не менше за висоту знака ≡ (X). Нічого не заходить
                  у це поле: ні текст, ні край макета.
                </p>
              </div>
              <div>
                <h3 className="bb__h3">Знак і мінімальні розміри</h3>
                <div className="bb__marks">
                  <div style={{ background: "#0B0A07" }}><img src={`${B}/mark-gold.svg`} alt="Знак ≡ золотий" /></div>
                  <div style={{ background: "#F1EFE9" }}><img src={`${B}/mark-bronze.svg`} alt="Знак ≡ бронзовий" /></div>
                  <div style={{ background: "#B8A46C" }}><img src={`${B}/mark-ink.svg`} alt="Знак ≡ чорний" /></div>
                  <div className="bb__round"><img src={`${B}/avatar-round.svg`} alt="Круглий аватар" /></div>
                </div>
                <ul className="bb__list">
                  <li>Повний логотип з підписом — від 120 px / 30 мм завширшки.</li>
                  <li>Без підпису DENTAL CLINIC — від 80 px / 20 мм.</li>
                  <li>Тільки знак ≡ — від 16 px / 5 мм (фавікон, аватар, наліпка).</li>
                </ul>
              </div>
            </div>

            <h3 className="bb__h3 bb__mt">Не можна</h3>
            <div className="bb__grid bb__grid--4 bb__donts">
              <div><span className="bb__x" style={{ transform: "scaleX(1.5)" }}><img src={`${B}/logo-wordmark-paper-gold.svg`} alt="" /></span><p>Розтягувати або стискати</p></div>
              <div><span className="bb__x" style={{ filter: "hue-rotate(160deg) saturate(3)" }}><img src={`${B}/logo-wordmark-paper-gold.svg`} alt="" /></span><p>Міняти кольори поза палітрою</p></div>
              <div><span className="bb__x" style={{ background: "#B8A46C" }}><img src={`${B}/logo-wordmark-paper-gold.svg`} alt="" /></span><p>Золоті смуги на золотому: зливаються</p></div>
              <div><span className="bb__x" style={{ background: "#F1EFE9" }}><img src={`${B}/logo-wordmark-paper-gold.svg`} alt="" /></span><p>Світле лого на світлому (2.1 : 1)</p></div>
            </div>
          </div>
        </section>

        {/* 2 colour */}
        <section id="s2" className="bb__sec bb__sec--light">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>02</span> Колір</h2>
            <p className="bb__lead">
              Чорне й тепле золото. Золото — тільки як акцент: смуги ≡, головна кнопка, активний стан. На
              світлому фоні золото втрачає контраст (2.1 : 1), тому там працює бронза, взята з вашого
              світлого логотипа.
            </p>
            <div className="bb__swatches">
              {COLORS.map((c) => (
                <div key={c.hex} className="bb__sw" style={{ background: c.hex, color: ["#0B0A07", "#8F5336"].includes(c.hex) ? "#F1EFE9" : "#0B0A07" }}>
                  <b>{c.name}</b>
                  <code>{c.hex}</code>
                  <span>{c.role}</span>
                  <small>{c.ratio}</small>
                </div>
              ))}
            </div>
            <p className="bb__note">
              Пропорція на макеті: Ink 70 %, Paper 20 %, Gold 8 %, решта — Gold light і Bronze. Фотографії
              клініки найкраще працюють чорно-білими, а в кольорі проявляються при взаємодії.
            </p>
          </div>
        </section>

        {/* 3 type */}
        <section id="s3" className="bb__sec">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>03</span> Шрифт</h2>
            <p className="bb__lead">
              Manrope — безкоштовний (OFL), має кирилицю, схожий на вашу сторінку в Instagram. Заголовки —
              Medium з трохи стиснутим трекінгом, дрібні підписи — Bold великими літерами з широким
              розрядом, як DENTAL CLINIC у логотипі.
            </p>
            <div className="bb__type">
              <div className="bb__type-row"><small>H1 · Medium 500 · −2 %</small><p style={{ fontSize: "clamp(32px,5vw,68px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Клініка естетичної та функціональної стоматології</p></div>
              <div className="bb__type-row"><small>H2 · Medium 500</small><p style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 500, lineHeight: 1.2 }}>Усмішка — це не про зуби, це про впевненість.</p></div>
              <div className="bb__type-row"><small>Текст · Regular 400 · 18/1.5</small><p style={{ fontSize: 18, lineHeight: 1.5, maxWidth: "60ch", color: "rgba(241,239,233,.75)" }}>Отримати максимально довготривалий результат стоматологічного здоров’я, естетики усмішки та задовольнити потреби будь-якого рівня.</p></div>
              <div className="bb__type-row"><small>Підпис · Bold 700 · +36 % · капс</small><p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.36em", textTransform: "uppercase" }}>Intense Dental Clinic</p></div>
            </div>
          </div>
        </section>

        {/* 4 motif */}
        <section id="s4" className="bb__sec bb__sec--light">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>04</span> Мотив ≡</h2>
            <p className="bb__lead">
              Три рівні смуги — і логотип, і узор, і іконка. Смуга завтовшки 0.1 висоти знака, відступ між
              ними втричі більший. Мотив повторюється вузькою стрічкою між блоками сайту, на пакетах і
              конвертах, і замінює маркер списку.
            </p>
            <div className="bb__motif">
              <div className="bb__pattern" aria-hidden="true" />
              <div className="bb__bullets">
                <p><i className="bb__b" /> Маркер списку</p>
                <p><i className="bb__b" /> Роздільник секцій</p>
                <p><i className="bb__b" /> Індикатор завантаження</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 motion */}
        <section id="s5" className="bb__sec">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>05</span> Рух</h2>
            <p className="bb__lead">Рух повільний і точний, як у лікаря: нічого не підстрибує й не мерехтить.</p>
            <div className="bb__grid bb__grid--3">
              <div className="bb__motion">
                <div className="bb__demo"><IntenseLogo /></div>
                <h4>Поява логотипа</h4>
                <p>Літери піднімаються з-під маски, смуги ≡ малюються зліва. 0.9 с, ease-out.</p>
              </div>
              <div className="bb__motion">
                <div className="bb__demo"><IntenseLogo intro={false} /></div>
                <h4>Наведення</h4>
                <p>Смуги по черзі стискаються й повертаються хвилею. 0.7 с. Наведіть курсор на логотип.</p>
              </div>
              <div className="bb__motion">
                <div className="bb__demo"><IntenseLogo compact intro={false} /></div>
                <h4>Згортання</h4>
                <p>При скролі шапки логотип стискається до знака ≡. 0.6 с, ease-in-out.</p>
              </div>
            </div>
            <ul className="bb__list bb__mt">
              <li>Криві: ease-out для появи, ease-in-out для змін стану. Тривалість 0.2–0.9 с.</li>
              <li>Золоте з’являється лише при дії: наведення, активна секція, таймер.</li>
              <li>Для prefers-reduced-motion анімація вимкнена, лишаються стани.</li>
            </ul>
            <p className="bb__note">
              <a href="/brandbook/motion" style={{ color: "var(--gold)", borderBottom: "1px solid currentColor" }}>
                Уся система руху сайту і новорічна тема →
              </a>
            </p>
          </div>
        </section>

        {/* 6 stickers */}
        <section id="s6" className="bb__sec bb__sec--light">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>06</span> Наліпки</h2>
            <p className="bb__lead">
              Для стоматології це доречно: наліпку дають дитині після візиту, кладуть у пакет з гігієнічним
              набором, запечатують нею конверт із планом лікування. Набір із шести форм: усе у векторі, текст
              переведений у криві, тож шрифт на друку не потрібен. Біла кайма — лінія висічки.
            </p>
            <div className="bb__stickers">
              {STICKERS.map((s, i) => (
                <a key={s.file} className="bb__stk" href={`${B}/stickers/${s.file}.svg`} download style={{ "--r": `${[-6, 5, -4, 3, -3, 6][i]}deg` } as React.CSSProperties}>
                  <img src={`${B}/stickers/${s.file}.svg`} alt={`Наліпка: ${s.name}`} />
                  <span><b>{s.name}</b>{s.use}</span>
                </a>
              ))}
            </div>
            <ul className="bb__list bb__mt">
              <li>Матеріал: біла вінілова плівка, глянцева або матова ламінація, висічка по білому контуру.</li>
              <li>Розміри: круглі 40–50 мм, «пігулки» 60×16 мм, квадрат 30 мм. Зберегти охоронне поле.</li>
              <li>Дитячу наліпку «Усмішка INTENSE» не друкувати з вашого золота на світлому — лише бронза.</li>
            </ul>
          </div>
        </section>

        {/* 7 voice */}
        <section id="s7" className="bb__sec">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>07</span> Тон голосу</h2>
            <p className="bb__lead">Спокійно, точно, без вигуків. Говоримо про результат і команду, а не про знижки.</p>
            <div className="bb__grid bb__grid--2">
              <div className="bb__voice bb__voice--yes">
                <h4>Так</h4>
                <p>«Клініка естетичної та функціональної стоматології з комплексним підходом до здоров’я пацієнтів.»</p>
                <p>«Отримати максимально довготривалий результат.»</p>
              </div>
              <div className="bb__voice bb__voice--no">
                <h4>Ні</h4>
                <p>«НАЙКРАЩІ ЦІНИ!!! Біла усмішка за 1 день!»</p>
                <p>«Ми безболісно і швидко зробимо все.» (обіцянки, яких не можна перевірити)</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bb__foot">
          <div className="bb__wrap">
            <img src={`${B}/logo-lockup-paper-gold.svg`} alt="INTENSE Dental Clinic" height={56} />
            <p>Файли: SVG у <code>/sites/intense/brand</code>. Версія 0.1, чернетка для обговорення.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
