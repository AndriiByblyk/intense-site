import { IS_NY } from "./edition";
import { Garland } from "./season/Garland";
import { HeroVideo } from "./HeroVideo";
import { MagneticButton } from "./MagneticButton";
import { GoldDust } from "./season/GoldDust";

// Hero copy condensed from the clinic's Instagram "Про нас" story.
const HEADLINE = "Естетична і функціональна стоматологія".split(" ");

export function Hero() {
  return (
    <>
      <section className="main ihero" id="top">
        <div className="container">
          <div className="main__inner">
            <div className="main-top">
              <div className="left ihero__left">
                {IS_NY && (
                  <p className="ihero__season">
                    <span className="ny-star" aria-hidden="true" />
                    З Різдвом і Новим роком
                  </p>
                )}
                <h1 className="ihero__title">
                  {HEADLINE.map((w, i) => (
                    <span
                      key={i}
                      className={`ihero__w${w === "і" ? " ihero__w--and" : ""}`}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <span>{w}</span>
                    </span>
                  )).flatMap((el, i) => (i === 0 ? [el] : [" ", el]))}
                </h1>
                <p className="ihero__sub">
                  Комплексний підхід до здоров’я кожного пацієнта. Плануємо кожен етап наперед — щоб результат був
                  передбачуваним і природним.
                </p>
              </div>
            </div>
            <div className="main-bottom">
              <div className="main__btns-container ihero__cta">
                <MagneticButton>Запланувати консультацію</MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="hero">
        <HeroVideo />
        <GoldDust />
        <Garland className="ny-garland--hero" seed={3} />
      </div>
    </>
  );
}
