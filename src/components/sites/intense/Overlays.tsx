import { CASES } from "./cases";

export function Overlays() {
  return (
    <>
<div className="modal-bg" id="modal">
    <div className="modal">
      <div className="wpcf7 no-js" id="wpcf7-f50-o2" lang="en-US" dir="ltr" data-wpcf7-id={50}>
        <div className="screen-reader-response"><p role="status" aria-live="polite" aria-atomic="true" /> <ul /></div>
        <form method="post" className="wpcf7-form init" aria-label="Contact form" noValidate data-status="init">
          
          <div className="form">
            <div className="form__content">
              <h3 className="form__title">
                <span>Запланувати</span>
                <span>консультацію</span>
              </h3>
              <div className="row-data">
                <input size={40} maxLength={400} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" placeholder="Ім’я та прізвище" defaultValue="" type="text" name="full-name" />
              </div>
              <div className="row-data">
                <input size={40} maxLength={400} className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel" aria-required="true" aria-invalid="false" placeholder="Номер телефону" defaultValue="" type="tel" name="phone" />
              </div>
              <div className="row-data">
                <div className="select-wrapper">
                  <select className="wpcf7-form-control wpcf7-select" aria-invalid="false" name="doctor"><option value="">Вибір лікаря</option><option value="Будь-який лікар">Будь-який лікар — підберемо</option></select>
                </div>
              </div>
              <div className="row-data">
                <div className="select-wrapper">
                  <select className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required" aria-required="true" aria-invalid="false" name="purpose"><option value="">Мета Вашого візиту</option><option value="Консультація">Консультація</option><option value="Профілактика та парадонтологічне лікування">Профілактика та парадонтологічне лікування</option><option value="Ортопедичне лікування">Ортопедичне лікування</option><option value="Терапевтичне лікування">Терапевтичне лікування</option><option value="Ендодонтичне лікування">Ендодонтичне лікування</option><option value="Ортодонтичне лікування">Ортодонтичне лікування</option><option value="Хірургічне лікування">Хірургічне лікування</option><option value="Обстеження та діагностика">Обстеження та діагностика</option><option value="Лікування м'язової та суглобової дисфункції">Лікування м'язової та суглобової дисфункції</option><option value="Не впевнений/-а, що саме мені потрібно">Не впевнений/-а, що саме мені потрібно</option></select>
                </div>
              </div>
              <div className="form__btns">
                <div className="group-btns">
                  <button className="group-btns__text-btn" type="submit">
                    Запланувати консультацію
                  </button>
                  <button type="submit" className="group-btns__img-btn">
                    <img src="/sites/intense/theme/images/arrow-top-black.svg" alt="arrow-top" />
                  </button>
                </div>
              </div>
            </div>
          </div><div className="wpcf7-response-output" aria-hidden="true" />
        </form>
      </div>
      <div className="modal-close" id="modal-close" />
    </div>
  </div><div className="modal-bg" id="modal-success">
    <div className="modal success-modal">
      <div className="modal-close" id="modal-success-close" />
      <div className="success-modal__content">
        <h3 className="success-modal__title">
          <span>Дякуємо</span>
          <span>за довіру</span>
        </h3>
        <div className="success-modal__text">
          <img src="/sites/intense/theme/images/mark.svg" alt="link" />
          <span>Наш Менеджер зв’яжеться з вами,</span>
          <span className="text-opacity">щоб підібрати зручний час консультації.</span>
        </div>
      </div>
    </div>
  </div>
  {CASES.map((c, i) => (
    <div className="modal-bg" id={`modal-history-${i + 1}`} key={c.id}>
      <div className="modal history-modal">
        <div className="modal-close modal-history-close" />
        <div className="history-modal__content">
          <h3 className="history-modal__title">{c.title}</h3>
          <div className="history-modal__scroll-wrapper">
            <div className="history-modal__text">
              <div className="history-modal__block history-modal__block--todo">
                <div className="history-modal__block-label">
                  <span>історія кейсу</span>
                </div>
                <p>Текст кейсу потрібно узгодити з клінікою.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
  </>
  );
}
