// One place for the facts search engines and link previews read.
// SITE_URL: set NEXT_PUBLIC_SITE_URL in Vercel once the clinic's own domain is
// connected, so canonical links, the sitemap and share cards point there.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://intense-site-silk.vercel.app").replace(/\/$/, "");

// Only the production deployment of the clinic's site may be indexed; previews,
// local builds and the New Year edition (a copy of the same content on its own
// project) stay out of search. Its canonical links still point to SITE_URL.
export const INDEXABLE = process.env.VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_EDITION !== "ny";

export const SITE = {
  name: "INTENSE Dental Clinic",
  title: "INTENSE Dental Clinic — стоматологія в Ужгороді",
  description:
    "Естетична і функціональна стоматологія в Ужгороді: цифрова діагностика, лікування під мікроскопом, імплантація, ортодонтія, кераміка. Вул. Закарпатська, 22.",
  locale: "uk_UA",
  address: {
    street: "вул. Закарпатська, 22",
    city: "Ужгород",
    region: "Закарпатська область",
    postalCode: "88000",
    country: "UA",
  },
  maps: "https://maps.app.goo.gl/ChBApg1Pt53UEsAU9",
  instagram: "https://www.instagram.com/intense.dental.clinic",
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
    { days: ["Saturday"], opens: "09:00", closes: "17:00" },
  ],
} as const;
