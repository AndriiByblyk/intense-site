import { GoldDust } from "./season/GoldDust";
import { Garland } from "./season/Garland";
import { rise } from "./motion/Rise";
import { IntenseLogo } from "./IntenseLogo";
import { MagneticButton } from "./MagneticButton";
import { NAV } from "./nav";

// Intense footer. Address and the facade photo link to the clinic's Google Maps
// place; hours are from that place. TODO: phone, email, Telegram, legal links — the user will
// supply them.
const MAPS = "https://maps.app.goo.gl/ChBApg1Pt53UEsAU9";
const INSTAGRAM = "https://www.instagram.com/intense.dental.clinic";

export function Footer() {
  return (
    <footer id="section-contacts" className="ifoot">
      <div className="ny-dust-wrap">
        <GoldDust />
      </div>
      <div className="container">
        {/* Desktop: an invitation with a big photo of the clinic's corner on top
            of the columns (phones keep the compact layout) */}
        <div className="ifoot__hero">
          <div className="ifoot__invite">
            <div className="ifoot__label">Приходьте знайомитися</div>
            <h2 className="ifoot__title" data-reveal>
              {rise("Чекаємо вас на")} <span className="ifoot__nb">{rise("Закарпатській, 22", 3)}</span>
            </h2>
            <p className="ifoot__lead">
              Запишіться заздалегідь — і лікар матиме час саме для вас: огляд, сканування та зрозумілий план лікування
              за один візит.
            </p>
            <div className="ifoot__actions">
              <MagneticButton>Запланувати візит</MagneticButton>
              <a className="ifoot__social" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                @intense.dental.clinic <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <a className="ifoot__photo" href={MAPS} target="_blank" rel="noopener noreferrer">
            <img
              src="/sites/intense/clinic/facade-foot-wide.webp"
              alt="Фасад клініки INTENSE на вул. Закарпатській, 22"
              loading="lazy"
              decoding="async"
              width={1200}
              height={900}
            />
            <span className="ifoot__photo-cap">
              <span>
                вул. Закарпатська, 22
                <small>Ужгород</small>
              </span>
              <span className="ifoot__photo-cta">
                Прокласти маршрут <span aria-hidden="true">↗</span>
              </span>
            </span>
          </a>
        </div>

        <div className="ifoot__grid">
          <div className="ifoot__col">
            <div className="ifoot__label">Навігація</div>
            <ul className="ifoot__nav">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ifoot__col">
            <div className="ifoot__label">Адреса</div>
            <p>
              <a href={MAPS} target="_blank" rel="noopener noreferrer">
                вул. Закарпатська, 22
                <br />
                Ужгород, 88000
              </a>
            </p>
            <dl className="ifoot__hours">
              <div>
                <dt>Пн–Пт</dt>
                <dd>9:00–19:00</dd>
              </div>
              <div>
                <dt>Сб</dt>
                <dd>9:00–17:00</dd>
              </div>
              <div>
                <dt>Нд</dt>
                <dd>вихідний</dd>
              </div>
            </dl>
          </div>
          <div className="ifoot__col">
            <div className="ifoot__label">Контакти</div>
            <p className="ifoot__todo">Телефон</p>
            <p className="ifoot__todo">Email</p>
            <p>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                Instagram <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
          {/* The clinic's corner: a compact photo that opens the place in Google Maps */}
          <a className="ifoot__place" href={MAPS} target="_blank" rel="noopener noreferrer">
            <img src="/sites/intense/clinic/facade-foot.webp" alt="Фасад клініки INTENSE на вул. Закарпатській, 22" loading="lazy" decoding="async" width={560} height={700} />
            <span className="ifoot__place-cta">
              Прокласти маршрут <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>

        <Garland className="ny-garland--foot" seed={29} />
        <a className="ifoot__mark" href="#top" aria-label="INTENSE — на початок" data-reveal>
          <IntenseLogo intro={false} tagline />
        </a>

        <div className="ifoot__bottom">
          <span>© {new Date().getFullYear()} INTENSE Dental Clinic</span>
          <span className="ifoot__todo">Політика конфіденційності</span>
        </div>
      </div>
    </footer>
  );
}
