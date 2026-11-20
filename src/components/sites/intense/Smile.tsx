import { Garland } from "./season/Garland";
import { Decor } from "./motion/Decor";
import { rise, wordCount } from "./motion/Rise";
import { CompareReveal } from "./CompareReveal";
import { Carousel } from "./Carousel";
import { CASES } from "./cases";

export function Smile() {
  return (
    <section id="section-smiles-gallery" className="smile">
      <div className="container">
        <div className="smile__inner">
          <Decor zone="smile" />
          <div className="section-label section-label-smile ismile__label" data-reveal>
            <span>Галерея усмішок</span>
            <img decoding="async" src="/sites/intense/theme/images/arrow-grey-bottom.svg" alt="" />
          </div>
          <h2 className="smile__title ismile__title" data-reveal>
            <span>{rise("Кожна усмішка —")}</span>{" "}
            <span>{rise("окремий проєкт.", wordCount("Кожна усмішка —"))}</span>
          </h2>
          <div className="ismile__lead">
            <p>
              Реальні пацієнти INTENSE до та після лікування. Кожну усмішку ми плануємо під обличчя, прикус і
              характер людини — а як саме, розповідає історія кейсу.
            </p>
            <p className="ismile__how">
              <span className="ismile__grip" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              Тягніть повзунок: «до» і «після»
            </p>
          </div>
          <Garland className="ny-garland--smile" seed={11} />
          <Carousel name="smile" centreStart={1} clickToFront ignore=".cmp__handle, .smile-slide__btn" label="Галерея усмішок">
            {CASES.map((c, i) => (
              <div className="smile-card" key={c.id}>
                <CompareReveal
                  before={`/sites/intense/cases/case-${c.id}-before.webp`}
                  after={`/sites/intense/cases/case-${c.id}-after.webp`}
                  alt={c.title}
                />
                {/* Case caption: over the photo's top-left on desktop, under it on phones */}
                <div className="smile-slide__text case-cap">
                  <span className="case-cap__num">{c.id}</span>
                  <strong className="case-cap__title">{c.title}</strong>
                  <span className="case-cap__text">{c.caption}</span>
                </div>
                {/* "Story" pill: gold ≡ mark, label, arrow. Opens the case story. */}
                <button type="button" className="smile-slide__btn case-btn" data-modal={`modal-history-${i + 1}`}>
                  <span className="case-btn__mark" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="case-btn__label">Історія кейсу</span>
                  <span className="case-btn__arrow" aria-hidden="true">→</span>
                </button>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
