import type { Metadata } from "next";
import { v } from "@/components/sites/intense/assetVersion";
import { IntenseLogo } from "@/components/sites/intense/IntenseLogo";
import { SectionMark } from "@/components/sites/intense/motion/SectionMark";
import { rise } from "@/components/sites/intense/motion/Rise";
import { GoldDust } from "@/components/sites/intense/season/GoldDust";
import { BookingDemo, CardDemo, Replay } from "./demos";

export const metadata: Metadata = {
  title: "INTENSE — брендбук руху",
  robots: { index: false, follow: false },
};

type Spec = { k: string; v: string };

const TOKENS = [
  { name: "--ease-out", value: "cubic-bezier(.22, 1, .36, 1)", use: "усе, що з’являється: слова, лінії, картки" },
  { name: "--ease-io", value: "cubic-bezier(.65, 0, .35, 1)", use: "світло, що проходить; контур, що малюється" },
  { name: "--t-press", value: "140 мс", use: "відгук на натискання" },
  { name: "--t-ui", value: "240 мс", use: "зміна стану: лінія фокусу, підкреслення картки" },
  { name: "--t-reveal", value: "900 мс · 750 на телефоні", use: "поява блоку на екрані" },
  { name: "--t-light", value: "1300 мс", use: "відблиск на тексті чи кнопці" },
  { name: "--stagger", value: "45 мс між словами · 70 мс між картками", use: "черга появи" },
  { name: "--rise", value: "24 px · 16 на телефоні", use: "наскільки блок піднімається" },
];

const RULES = [
  "Нічого не підстрибує і не «пружинить»: клініка, а не ігровий застосунок.",
  "Нічого не крутиться в циклі, поки людина читає. Одна поява — і досить. Виняток — святкова тема, і то лише тихо.",
  "Ціни, телефони й текст, який читають, не рухаються.",
  "Тільки transform, opacity і clip-path: анімація не гальмує навіть на старому телефоні.",
  "Наведення курсора — тільки там, де є курсор. На телефоні той самий стан вмикається дотиком.",
  "Хто в налаштуваннях обрав «менше руху», бачить готові стани без переміщень.",
];

const ADAPT = [
  ["M01 Світло в заголовку", "Так само", "Так само, слова коротші — хвиля швидше доходить до кінця"],
  ["M02 Підпис блоку", "При появі на екрані", "Так само"],
  ["M03 Заголовки блоків", "Слова піднімаються на всю висоту", "Так само, 750 мс замість 900"],
  ["M04 Стрічки ≡", "Зсув ±32 px зі скролом", "Зсув ±18 px; у старих браузерах стрічка просто стоїть"],
  ["M05 Назви напрямів", "Підкреслення ≡ при наведенні", "Підкреслення при дотику (картка відкривається)"],
  ["M06 Запис", "Відблиск кнопки при появі й наведенні", "Відблиск лише при появі; натискання — стиснення 0.97"],
  ["M07 Логотип у футері", "Збирається, коли доскролили", "Так само"],
];

function Specs({ items }: { items: Spec[] }) {
  return (
    <dl className="bbm-spec">
      {items.map((s) => (
        <div key={s.k}>
          <dt>{s.k}</dt>
          <dd>{s.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Effect({ id, code, title, what, demo, specs }: { id: string; code: string; title: string; what: string; demo: React.ReactNode; specs: Spec[] }) {
  return (
    <article className="bbm-fx" id={id}>
      <div className="bbm-fx__head">
        <span className="bbm-fx__code">{code}</span>
        <h3 className="bbm-fx__title">{title}</h3>
        <p className="bbm-fx__what">{what}</p>
      </div>
      {demo}
      <Specs items={specs} />
    </article>
  );
}

const HERO_WORDS = "Естетична і функціональна стоматологія".split(" ");

export default function MotionBrandbook() {
  return (
    <>
      <link rel="stylesheet" href={v("/sites/intense/theme/css/reset.css")} precedence="default" />
      <link rel="stylesheet" href={v("/sites/intense/intense.css")} precedence="default" />
      <link rel="stylesheet" href={v("/sites/intense/brandbook.css")} precedence="high" />
      <link rel="stylesheet" href={v("/sites/intense/motion.css")} precedence="high" />
      <link rel="stylesheet" href={v("/sites/intense/season-ny.css")} precedence="high" />
      <link rel="stylesheet" href={v("/sites/intense/brandbook-motion.css")} precedence="high" />

      <main className="bb bbm">
        <header className="bb__cover bbm-cover">
          <div className="bb__wrap">
            <p className="bb__eyebrow">Брендбук · Рух · v1.0</p>
            <h1 className="bbm-cover__title">
              Світло,
              <br />а не рух
            </h1>
            <p className="bb__lead">
              Як сайт INTENSE оживає, не відволікаючи від головного. Кожен ефект ледь помітний сам по собі, а разом
              вони роблять сторінку живою — як світло на золотих літерах у клініці.
            </p>
            <div className="bbm-principles">
              <div><b>01</b><h4>Світло замість руху</h4><p>Золото з’являється як відблиск, що проходить один раз, — а не як миготіння.</p></div>
              <div><b>02</b><h4>Лінії малюють себе</h4><p>≡ і ромб будуються лініями зліва направо, як у логотипі.</p></div>
              <div><b>03</b><h4>Слова з-під маски</h4><p>Кожен розділ відкривається однаково: слова піднімаються з-під невидимої лінії.</p></div>
              <div><b>04</b><h4>Один раз — і досить</h4><p>Ефект грає, коли блок уперше з’являється, і більше не повторюється.</p></div>
            </div>
            <nav className="bb__toc bbm-toc" aria-label="Зміст">
              <a href="#tokens"><span>00</span>Токени</a>
              <a href="#m01"><span>M01</span>Заголовок hero</a>
              <a href="#m02"><span>M02</span>Підпис блоку</a>
              <a href="#m03"><span>M03</span>Заголовки</a>
              <a href="#m04"><span>M04</span>Стрічки ≡</a>
              <a href="#m05"><span>M05</span>Напрями</a>
              <a href="#m06"><span>M06</span>Запис</a>
              <a href="#m07"><span>M07</span>Футер</a>
              <a href="#adapt"><span>↔</span>Адаптація</a>
              <a href="#ny"><span>✦</span>Новий рік</a>
            </nav>
          </div>
        </header>

        {/* tokens */}
        <section id="tokens" className="bb__sec bb__sec--light">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>00</span> Токени</h2>
            <p className="bb__lead">
              Дві криві й кілька тривалостей на весь сайт. Нові ефекти беруть лише їх — тож рух скрізь має однаковий
              «почерк».
            </p>
            <div className="bbm-tokens">
              {TOKENS.map((t) => (
                <div key={t.name}>
                  <code>{t.name}</code>
                  <b>{t.value}</b>
                  <span>{t.use}</span>
                </div>
              ))}
            </div>
            <div className="bbm-curves" aria-hidden="true">
              <div><svg viewBox="0 0 100 100"><path d="M0 100 C22 0 36 0 100 0" /></svg><span>ease-out — швидкий старт, довгий м’який фініш</span></div>
              <div><svg viewBox="0 0 100 100"><path d="M0 100 C65 100 35 0 100 0" /></svg><span>ease-in-out — для світла, що проходить</span></div>
            </div>
          </div>
        </section>

        {/* effects */}
        <section className="bb__sec">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>M</span> Ефекти</h2>
            <p className="bb__lead">
              Сім ефектів — від першого екрана до футера. Кожен показаний наживо: натисніть «Повторити», щоб
              переглянути ще раз.
            </p>

            <Effect
              id="m01"
              code="M01"
              title="Світло в заголовку hero"
              what="Слова піднімаються (так було й раніше), а через секунду по них один раз проходить теплий відблиск — слово за словом, як світло по золотих літерах на стіні клініки."
              demo={
                <Replay className="bbm-demo--hero">
                  <h4 className="ihero__title bbm-hero">
                    {HERO_WORDS.map((w, i) => (
                      <span key={i} className={`ihero__w${w === "і" ? " ihero__w--and" : ""}`} style={{ "--i": i } as React.CSSProperties}>
                        <span>{w}</span>
                      </span>
                    )).flatMap((el, i) => (i === 0 ? [el] : [" ", el]))}
                  </h4>
                </Replay>
              }
              specs={[
                { k: "Коли", v: "Один раз після завантаження, через 1,45 с" },
                { k: "Тривалість", v: "1,3 с на слово, наступне — через 90 мс" },
                { k: "Крива", v: "--ease-io" },
                { k: "Навіщо", v: "Перший екран запам’ятовується, але текст лишається спокійним" },
                { k: "Менше руху", v: "Без відблиску, текст одразу на місці" },
              ]}
            />

            <Effect
              id="m02"
              code="M02"
              title="Підпис блоку"
              what="Ромб повертається на чверть і малює свій контур, крапка в центрі спалахує, і лише тоді проявляється назва блоку зліва направо."
              demo={
                <Replay>
                  <div className="section-label bbm-label" data-reveal>
                    <SectionMark />
                    <span>Напрями та вартість</span>
                  </div>
                </Replay>
              }
              specs={[
                { k: "Коли", v: "Блок уперше з’явився на екрані" },
                { k: "Тривалість", v: "Контур 0,8 с · крапка 0,5 с · текст 0,9 с" },
                { k: "Крива", v: "Контур --ease-io, решта --ease-out" },
                { k: "Навіщо", v: "Позначає початок нового розділу, як закладка" },
                { k: "Менше руху", v: "Ромб і текст одразу на місці" },
              ]}
            />

            <Effect
              id="m03"
              code="M03"
              title="Заголовки блоків"
              what="Слова заголовка піднімаються з-під невидимої лінії по черзі. Той самий жест, що в hero, тільки менший — тож кожен розділ відкривається однаково."
              demo={
                <Replay>
                  <h4 className="bbm-title" data-reveal>{rise("Кожна усмішка — окремий проєкт.")}</h4>
                </Replay>
              }
              specs={[
                { k: "Де", v: "«Сім напрямів», «Кожна усмішка», «Запланувати консультацію», «Чекаємо вас»" },
                { k: "Тривалість", v: "0,9 с, слова через 45 мс" },
                { k: "Крива", v: "--ease-out" },
                { k: "Не чіпаємо", v: "Великі цитати «Філософія» і «Лікарі» — вони вже загоряються словами при скролі" },
                { k: "Менше руху", v: "Заголовок одразу видно" },
              ]}
            />

            <Effect
              id="m04"
              code="M04"
              title="Стрічки ≡ між блоками"
              what="Візерунок ≡, що відділяє блоки, ледь зсувається проти скролу і стає яскравішим, коли проходить серединою екрана. Сторінка отримує глибину, а сам по собі нічого не рухається."
              demo={
                <div className="bbm-demo bbm-demo--strip">
                  <div className="bbm-strip" aria-hidden="true" />
                  <p className="bbm-demo__note">На сайті прив’язано до скролу і тихіше. Тут — яскравіше й у циклі, щоб було видно рух.</p>
                </div>
              }
              specs={[
                { k: "Коли", v: "Весь час, поки блок проходить екраном — точно за скролом" },
                { k: "Діапазон", v: "Зсув ±32 px, яскравість 0,22 → 0,6 → 0,22" },
                { k: "Як працює", v: "Анімація, прив’язана до скролу, без JavaScript" },
                { k: "Телефон", v: "Зсув ±18 px" },
                { k: "Менше руху / старі браузери", v: "Стрічка просто стоїть, як раніше" },
              ]}
            />

            <Effect
              id="m05"
              code="M05"
              title="Назви напрямів у картках"
              what="Коли ряд карток з’являється, назви піднімаються по черзі, картка за карткою. Коли картку відкривають, під назвою малюються три золоті риски — ≡ як підкреслення."
              demo={
                <Replay>
                  <div className="bbm-cards">
                    <CardDemo num="01" title={rise("Консультація")} />
                    <CardDemo num="02" title={rise("Пародонтологія", 1)} />
                    <CardDemo num="03" title={rise("Терапевтичне лікування", 2)} />
                  </div>
                </Replay>
              }
              specs={[
                { k: "Поява", v: "0,9 с, картки через 70 мс у порядку читання" },
                { k: "Відкриття", v: "Риски 240 мс, одна за одною через 40 мс; закриваються так само" },
                { k: "Крива", v: "--ease-out" },
                { k: "Навіщо", v: "Видно, яка картка відкрита, — ще до того, як прочитаєш ціни" },
                { k: "Телефон", v: "Риски з’являються від дотику, без наведення" },
              ]}
            />

            <Effect
              id="m06"
              code="M06"
              title="Запис на прийом"
              what="Картка запису піднімається, її значок ≡ малюється, слова заголовка виходять з-під маски, поля з’являються одне за одним. Фокус у полі — золота лінія малюється зліва. По кнопці раз проходить відблиск. Помилка — поле ледь «здригається». Після відправки галочка малює себе."
              demo={
                <Replay className="bbm-demo--bk">
                  <BookingDemo title={rise("Запланувати консультацію")} />
                </Replay>
              }
              specs={[
                { k: "Поява", v: "Картка 0,9 с · поля через 60 мс · відблиск кнопки через 1,2 с" },
                { k: "Фокус", v: "Лінія 240 мс --ease-out, перервна (можна швидко клацати між полями)" },
                { k: "Помилка", v: "Зсув 3 px, 320 мс, один раз + червона лінія" },
                { k: "Натискання", v: "Стиснення 0.97 за 140 мс" },
                { k: "Підтвердження", v: "Коло з’являється, галочка малюється 0,6 с" },
                { k: "Менше руху", v: "Без зсувів і відблиску; лінія фокусу з’являється одразу" },
              ]}
            />

            <Effect
              id="m07"
              code="M07"
              title="Логотип у футері"
              what="Великий INT≡NS≡ унизу будується, коли до нього доскролили: літери піднімаються, смуги малюються. Раніше це відбувалося під час завантаження, коли його ніхто не бачив."
              demo={
                <Replay className="bbm-demo--foot">
                  <span className="ifoot__mark bbm-foot" data-reveal>
                    <IntenseLogo intro={false} tagline />
                  </span>
                </Replay>
              }
              specs={[
                { k: "Коли", v: "Футер уперше з’явився на екрані" },
                { k: "Тривалість", v: "Літери 1 с через 70 мс · смуги 0,8 с · підпис через 0,7 с" },
                { k: "Крива", v: "--ease-out (ті самі кадри, що в логотипі шапки)" },
                { k: "Менше руху", v: "Логотип одразу зібраний" },
              ]}
            />
          </div>
        </section>

        {/* adaptation */}
        <section id="adapt" className="bb__sec bb__sec--light">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>↔</span> Адаптація</h2>
            <p className="bb__lead">
              Ті самі ефекти на телефоні й комп’ютері. Наведення замінюється дотиком, відстані коротші, а старі
              браузери просто показують готовий стан.
            </p>
            <div className="bbm-table" role="table">
              <div role="row" className="bbm-table__head"><span role="columnheader">Ефект</span><span role="columnheader">Комп’ютер</span><span role="columnheader">Телефон</span></div>
              {ADAPT.map((r) => (
                <div role="row" key={r[0]}><span role="cell">{r[0]}</span><span role="cell">{r[1]}</span><span role="cell">{r[2]}</span></div>
              ))}
            </div>
            <h3 className="bb__h3 bb__mt">Правила</h3>
            <ul className="bb__list">{RULES.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </section>

        {/* New Year */}
        <section id="ny" className="bb__sec">
          <div className="bb__wrap">
            <h2 className="bb__h"><span>✦</span> Новорічна тема</h2>
            <p className="bb__lead">
              Тимчасовий святковий стиль: ті самі чорний і золото, тільки з більшою кількістю світла. Жодних
              ялинок, шапок і сніговиків — свято відчувається, а клініка лишається клінікою.
            </p>

            <Replay className="bbm-demo--ny" label="Повторити">
              <div className="ny-preview bbm-ny">
                <div className="bbm-ny__photo" aria-hidden="true" />
                <GoldDust force />
                <div className="bbm-ny__top">
                  <span className="bbm-ny__logo"><IntenseLogo intro={false} tagline /></span>
                </div>
                <div className="bbm-ny__copy">
                  <p className="ihero__season"><span className="ny-star" aria-hidden="true" />З Різдвом і Новим роком</p>
                  <p className="bbm-ny__h">Естетична <span>і</span> функціональна стоматологія</p>
                </div>
                <div className="ny-strip bbm-ny__strip" aria-hidden="true" />
                <span className="ny-mark bbm-ny__mark" data-reveal><IntenseLogo intro={false} /></span>
              </div>
            </Replay>

            <div className="bbm-ny-list">
              <div><b>N1</b><h4>Золотий пил</h4><p>Над відео в hero повільно падають золоті іскри, деякі великі й розмиті — для глибини. Пауза, коли hero поза екраном або вкладка неактивна.</p></div>
              <div><b>N2</b><h4>Привітання</h4><p>Над заголовком — «З Різдвом і Новим роком» дрібним золотим капсом з чотирикутною зіркою, що тихо мерехтить.</p></div>
              <div><b>N3</b><h4>Золоті стрічки</h4><p>Сірі стрічки ≡ між блоками стають золотими й далі дихають разом зі скролом (M04).</p></div>
              <div><b>N4</b><h4>Гірлянда в логотипі</h4><p>Смуги ≡ у логотипі шапки по черзі ледь світяться, раз на шість секунд.</p></div>
              <div><b>N5</b><h4>Відблиск на футері</h4><p>Після того як великий логотип зібрався (M07), по літерах раз проходить світло.</p></div>
              <div><b>N6</b><h4>Тепла картка запису</h4><p>У картці запису з’являється друге золоте світіння в протилежному куті.</p></div>
            </div>

            <h3 className="bb__h3 bb__mt">Коли вмикається</h3>
            <ul className="bb__list">
              <li>Сама: з 15 грудня до 14 січня включно, за календарем відвідувача. Після 14 січня сайт сам повертається до звичайного вигляду.</li>
              {/* plain <a>, not <Link>: the season is read by the head script, which runs only on a full page load */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <li>Переглянути зараз: <a className="bbm-link" href="/?season=ny">відкрити сайт у святковому стилі</a> · <a className="bbm-link" href="/?season=off">вимкнути для себе</a> (діє до закриття вкладки).</li>
              <li>«Менше руху» і режим економії трафіку: іскри стоять на місці, зірка й гірлянда не мерехтять.</li>
            </ul>
          </div>
        </section>

        <footer className="bb__foot">
          <div className="bb__wrap">
            <img src="/sites/intense/brand/logo-lockup-paper-gold.svg" alt="INTENSE Dental Clinic" height={56} />
            <p>
              Код: <code>public/sites/intense/motion.css</code>, <code>season-ny.css</code>,{" "}
              <code>components/sites/intense/motion</code>. <a className="bbm-link" href="/brandbook">← Брендбук</a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
