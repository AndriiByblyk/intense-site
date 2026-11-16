import { ScrollWords } from "./ScrollWords";
import { AboutCards } from "./AboutCards";

export function About() {
  return (
    <section id="section-about-us" className="about-us">
      <div className="container">
        <div className="about-us__head">
          <div className="section-label">
            <img decoding="async" src="/sites/intense/theme/images/mark.svg" alt="" />
            <span>Філософія INTENSE</span>
          </div>
          <ScrollWords
            className="about-us__title"
            text="В INTENSE ми спершу слухаємо, потім плануємо і лише тоді лікуємо. Цифрова діагностика, мікроскоп і злагоджена команда — щоб ваша усмішка виглядала природно й залишалася здоровою."
          />
        </div>
        <AboutCards />
      </div>
    </section>
  );
}
