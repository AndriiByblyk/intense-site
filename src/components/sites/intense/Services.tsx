import { IS_NY } from "./edition";
import { GoldDust } from "./season/GoldDust";
import { SectionMark } from "./motion/SectionMark";
import { rise } from "./motion/Rise";
import { Carousel } from "./Carousel";
import { SvcMorph } from "./SvcMorph";
import { CATEGORIES, EUR_NOTE, allItems, hasEur } from "./prices";

// Services, as on the reference card:
//  rest  — topic (title) on top, a short story about the service at the
//          bottom, photo in colour;
//  active (hover on desktop / tap on phones) — photo turns black-and-white and
//          the description is replaced by the same services with prices.
// Cards sit in the native Carousel; the theme script only toggles .is-open on tap.
export function Services() {
  return (
    <section id="section-services" className="services">
      <SvcMorph />
      {IS_NY && (
        <div className="ny-dust-wrap">
          <GoldDust />
        </div>
      )}
      {/* The INTENSE letters on the stone wall, in perspective: placed so the
          whole word reads above the cards (right-hand side on desktop, full
          width on phones) */}
      <div className="svc-sign" aria-hidden="true">
        <picture>
          <source media="(min-width: 971px)" srcSet="/sites/intense/clinic/bg-sign-desk.webp" />
          <img src="/sites/intense/clinic/bg-sign-wide.webp" alt="" decoding="async" />
        </picture>
      </div>
      <div className="container">
        <div className="services-inner">
          <div className="section-label" data-reveal>
            <SectionMark />
            <span>Напрями та вартість</span>
          </div>
          {/* desktop intro: fills the left side, the photo sits on the right */}
          <div className="svc-intro">
            <h2 className="svc-intro__title" data-reveal>{rise("Сім напрямів — одна команда")}</h2>
            <p className="svc-intro__lead">
              Від першої консультації до повної реабілітації. Наведіть на картку, щоб побачити ціни.
            </p>
          </div>
          <Carousel name="services" className="services__cards" nudge clickPeek morph label="Послуги та ціни">
            {CATEGORIES.map((c) => {
              const n = allItems(c).length;
              return (
                <div className="services__card svc" tabIndex={0} key={c.id} aria-label={`${c.title}: показати ціни`} data-reveal>
                  {/* Colour at rest; opening the card (hover / tap) reveals the
                      B/W version as a circle from the pointer. Both are separate
                      pre-darkened files, so no live CSS filter runs. (The class
                      names are layer names: .svc__bw is the base, .svc__color
                      the layer that opens on top.) */}
                  <img
                    decoding="async"
                    loading="lazy"
                    className="services__card-bg svc__bw"
                    src={`/sites/intense/clinic/${c.photo}-dim.webp`}
                    alt=""
                  />
                  <img
                    decoding="async"
                    loading="lazy"
                    className="services__card-bg svc__color"
                    src={`/sites/intense/clinic/${c.photo}-bw.webp`}
                    alt=""
                  />
                  <div className="svc__head">
                    <span className="svc__num">{c.num}</span>
                  </div>
                  <div className="svc__titlerow">
                    <h3 className="svc__title">
                      {rise(c.title)}
                      {/* M05 (New Year edition): the ≡ underline that draws when the card opens */}
                      {IS_NY && (
                        <span className="svc__bars" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                      )}
                    </h3>
                    {/* "tap" hint, first card only (as on the reference) */}
                    {c.id === CATEGORIES[0].id && (
                      <img
                        className="svc__tap"
                        src="/sites/intense/theme/images/card-tap.svg"
                        alt=""
                        width={34}
                        height={34}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="svc__bottom">
                    <p className="svc__desc">{c.desc}</p>

                    <div className="svc__prices">
                      {c.groups.map((g, gi) => (
                        <div className="svc__group" key={gi}>
                          {g.title && <p className="svc__gtitle">{g.title}</p>}
                          <ul>
                            {g.items.map((it, i) => (
                              <li key={i}>
                                <span className="svc__name">
                                  {it.name}
                                  {it.note && <small>{it.note}</small>}
                                </span>
                                <b>{it.price}</b>
                              </li>
                            ))}
                          </ul>
                          {g.note && <p className="svc__note">* {g.note}</p>}
                        </div>
                      ))}
                      {hasEur(c) && <p className="svc__note">* {EUR_NOTE}</p>}
                    </div>
                  </div>
                  <span className="sr-only">{n} позицій у прайсі</span>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
