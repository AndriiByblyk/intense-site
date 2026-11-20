import { IS_NY } from "../edition";

// Fills for the dark empty grounds, drawn from the clinic's interior
// (brandbook: /brandbook/motion#decor). Purely decorative: aria-hidden, behind
// the content (z-index -1 inside an isolated host), styles in decor.css; the
// New Year variants are in season-ny.css.
//  D1 · Pendants  — the gold pendant lamps: a hairline cord, a short gold tube,
//                   warm light at the tip. Cords draw down when the zone arrives.
//                   New Year: beads of light along the cord, a star at the tip.
//  D2 · Stone     — the black stone of the reception wall, fading at the edges.
//                   New Year: fine gold specks on it.
//  D3 · Diamond   — the section mark's diamond, large, as one gold hairline
//                   that draws itself. New Year: a string of running lights.
//  D4 · Glow      — warm light on the ground, as from a lamp just off frame.

type Pendant = { x: string; len: number };

const ZONES: Record<"about" | "team" | "smile", { pendants?: Pendant[]; stone?: boolean; diamond?: boolean; glow: [string, string, number] }> = {
  about: { pendants: [{ x: "30%", len: 190 }, { x: "62%", len: 280 }], glow: ["48%", "72%", 460] },
  team: { pendants: [{ x: "22%", len: 230 }, { x: "44%", len: 330 }, { x: "68%", len: 190 }], stone: true, glow: ["42%", "70%", 560] },
  smile: { diamond: true, glow: ["34%", "52%", 620] },
};

const BEADS = [0.2, 0.36, 0.52, 0.68, 0.84];

export function Decor({ zone }: { zone: keyof typeof ZONES }) {
  if (!IS_NY) return null;
  const z = ZONES[zone];
  return (
    <div className={`dc dc--${zone}`} data-reveal aria-hidden="true">
      <span className="dc-glow" style={{ "--gx": z.glow[0], "--gy": z.glow[1], "--gs": `${z.glow[2]}px` } as React.CSSProperties} />
      {z.stone && <span className="dc-stone" />}
      {z.diamond && (
        <svg className="dc-dia" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="dc-dia__line" pathLength={1} d="M50 3 97 50 50 97 3 50Z" />
          <path className="dc-dia__lights" pathLength={1} d="M50 3 97 50 50 97 3 50Z" />
          <circle className="dc-dia__dot" cx="50" cy="50" r="1.1" />
        </svg>
      )}
      {z.pendants?.map((p, n) => (
        <span key={n} className="dc-pend" style={{ "--x": p.x, "--len": `${p.len}px`, "--n": n } as React.CSSProperties}>
          <span className="dc-pend__beads">
            {BEADS.map((t, k) => (
              <i key={k} style={{ "--t": t, "--k": k } as React.CSSProperties} />
            ))}
          </span>
          <span className="dc-pend__lamp" />
          <span className="dc-pend__light" />
          <span className="dc-pend__star" />
        </span>
      ))}
    </div>
  );
}
