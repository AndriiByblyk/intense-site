<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# INTENSE Dental Clinic — website

Single-page site for INTENSE Dental Clinic, Uzhhorod (вул. Закарпатська, 22). Ukrainian copy.

## Stack
- Next.js 16 (App Router, React 19, TypeScript strict), Tailwind v4 base
- The page is built from `src/components/sites/intense/*` on top of a forked theme in
  `public/sites/intense/theme` (CSS + `theme/js/site.js`); Intense styles live in `public/sites/intense/intense.css`
- `/brandbook` — internal brand page (noindex)
- Hosted on Vercel (project `intense-site`)

## Commands
- `npm run dev` — dev server
- `npm run check` — lint + typecheck + build

## Notes
- Hero video files keep their names: bump `HERO_V` in `HeroVideo.tsx` whenever they change (30-day CDN cache).
- The booking form has no delivery channel yet — submissions are not sent anywhere.
- Footer phone / email / Telegram are still placeholders.
