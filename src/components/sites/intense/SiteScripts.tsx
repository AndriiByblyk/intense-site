"use client";

import { useEffect } from "react";

const BASE = "/sites/intense/theme";

// Forked theme scripts: modals, form helpers, card toggles (no sliders).
const SCRIPTS = [
  `${BASE}/js/site.js`,
  `${BASE}/js/theme.js`,
];

function load(src: string) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.async = false;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

export function SiteScripts({ version }: { version: string }) {
  useEffect(() => {
    if ((window as unknown as { __intenseInit?: boolean }).__intenseInit) return;
    (window as unknown as { __intenseInit?: boolean }).__intenseInit = true;

    (async () => {
      for (const src of SCRIPTS) await load(`${src}?v=${version}`);
      // The theme scripts bootstrap on DOMContentLoaded, which has already
      // fired by the time React hydrates — replay it once.
      window.dispatchEvent(new Event("DOMContentLoaded"));
    })().catch(console.error);

    // The original form posts to WordPress (Contact Form 7). There is no
    // backend in this clone yet, so keep forms from navigating away.
    const onSubmit = (e: Event) => {
      if ((e.target as HTMLElement).closest(".wpcf7")) e.preventDefault();
    };
    document.addEventListener("submit", onSubmit);
    return () => document.removeEventListener("submit", onSubmit);
  }, [version]);

  return null;
}
