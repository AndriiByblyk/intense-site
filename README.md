# INTENSE Dental Clinic — website

Website of INTENSE Dental Clinic, Uzhhorod (вул. Закарпатська, 22).

- Next.js 16 · React 19 · TypeScript · hosted on Vercel
- Production: https://intense-site-silk.vercel.app

## Develop

```bash
npm ci
npm run dev      # http://localhost:3000
npm run check    # lint + typecheck + production build
```

## Structure

| Path | What |
|---|---|
| `src/app/page.tsx` | the page |
| `src/components/sites/intense/` | sections: hero, about, services, gallery, team, booking, footer |
| `public/sites/intense/intense.css` | Intense styles (on top of the forked theme in `public/sites/intense/theme`) |
| `public/sites/intense/media/hero/` | hero loop (16:9 and 9:16, 1080p and 720p) |
| `src/app/brandbook/` | internal brand page (noindex) |

## Open items

- Booking form: connect a delivery channel (Telegram bot / email / CRM) — submissions are not sent yet.
- Footer: phone, email and Telegram are placeholders.
- Doctors' names and bios, case stories: placeholders until the clinic approves them.

Based on the MIT-licensed [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) (see `LICENSE`).
