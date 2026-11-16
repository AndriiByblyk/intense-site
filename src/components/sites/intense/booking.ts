// Bridge to the booking modal, which is still driven by the theme script
// (public/sites/intense/theme/js/site.js exposes window.intenseOpenModal).
type IntenseWindow = Window & { intenseOpenModal?: () => void };

export function openBooking() {
  const w = window as IntenseWindow;
  if (typeof w.intenseOpenModal === "function") {
    w.intenseOpenModal();
    return;
  }
  // Script not ready yet: fall back to the inline booking form.
  document.getElementById("section-booking")?.scrollIntoView({ behavior: "smooth" });
}
