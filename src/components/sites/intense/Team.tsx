import { Decor } from "./motion/Decor";
import { SectionMark } from "./motion/SectionMark";
import { ScrollWords } from "./ScrollWords";
import { Carousel } from "./Carousel";

// Doctors only (sorted from "Фото лікарі + команда"; assistants, the
// administrator and group shots are not in this slider).
// Card: colour portrait + name/role. Tap/click opens it: the photo changes to
// a second shot (another pose, B/W) and the description slides up.
// TODO: real names, roles and descriptions — placeholders until the clinic
// sends them.
const DOCTORS = [
  { id: "1", name: "Ім’я Прізвище", role: "Лікар-стоматолог" },
  { id: "2", name: "Ім’я Прізвище", role: "Лікар-стоматолог" },
  { id: "3", name: "Ім’я Прізвище", role: "Лікар-стоматолог" },
  { id: "4", name: "Ім’я Прізвище", role: "Лікар-стоматолог" },
  { id: "5", name: "Ім’я Прізвище", role: "Лікар-стоматолог" },
];

const PLACEHOLDER_FACTS = ["Спеціалізація — додамо.", "Досвід — додамо.", "Освіта та курси — додамо."];

export function Team() {
  return (
    <section className="team" id="section-team">
      <div className="container">
        <div className="team__inner">
          <div className="team__top">
            <Decor zone="team" />
            <div className="section-label" data-reveal>
              <SectionMark />
              <span>Наші лікарі</span>
            </div>
            <ScrollWords
              className="team__title"
              text="Лікарі INTENSE працюють як одна команда: точність, естетика й відповідальність — на кожному етапі вашого лікування."
            />
          </div>
          <Carousel name="team" centreStart={2} morph clickToFront ignore=".dcard__book" label="Лікарі INTENSE">
            {DOCTORS.map((d, i) => (
              <article
                key={d.id}
                className="team-card dcard"
                tabIndex={0}
                role="button"
                aria-expanded="false"
                aria-label={`${d.name}, ${d.role}: показати опис`}
              >
                <img
                  className="dcard__img dcard__img--main"
                  src={`/sites/intense/team/doc-${d.id}.webp`}
                  alt={`${d.name}, ${d.role}`}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
                <img
                  className="dcard__img dcard__img--alt"
                  src={`/sites/intense/team/doc-${d.id}-alt.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="dcard__shade" aria-hidden="true" />
                <span className="dcard__toggle" aria-hidden="true">
                  <i />
                  <i />
                </span>
                <div className="dcard__body">
                  <p className="dcard__role">{d.role}</p>
                  <h4 className="dcard__name">{d.name}</h4>
                  <div className="dcard__more">
                    <div className="dcard__more-inner">
                      <ul className="dcard__facts">
                        {PLACEHOLDER_FACTS.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <button type="button" className="dcard__book">
                        Записатися до лікаря <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
