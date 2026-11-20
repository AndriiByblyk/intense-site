import { IS_NY } from "../edition";

// New Year · baubles for the bento cards and the gift ribbon for the booking
// card. The glass balls are drawn once in SeasonDefs and used here.
type Ball = { k: "gold" | "black" | "champ"; s: number; len: number; x: number };

// Per card: size (px), thread length (px) and distance from the card's right
// edge (px), kept clear of the ≡ mark in the corner. A cluster on the wide
// cards, a single ball on the narrow one.
const CLUSTERS: Ball[][] = [
  [
    { k: "gold", s: 80, len: 46, x: 96 },
    { k: "black", s: 54, len: 118, x: 178 },
  ],
  [{ k: "champ", s: 70, len: 64, x: 92 }],
  [
    { k: "black", s: 58, len: 40, x: 104 },
    { k: "gold", s: 88, len: 96, x: 182 },
    { k: "champ", s: 56, len: 58, x: 272 },
  ],
];

export function Baubles({ card }: { card: number }) {
  if (!IS_NY) return null;
  const balls = CLUSTERS[card] ?? [];
  return (
    <span className="ny-baubles" aria-hidden="true">
      {balls.map((b, i) => (
        <span
          key={i}
          className="ny-bauble"
          style={{ "--s": `${b.s}px`, "--len": `${b.len}px`, "--x": `${b.x}px`, "--n": i + card } as React.CSSProperties}
        >
          <i className="ny-bauble__thread" />
          <svg className="ny-bauble__ball" viewBox="0 0 100 132">
            <use href={`#ny-ball-${b.k}`} />
          </svg>
        </span>
      ))}
    </span>
  );
}

// A gold sash across the top-right corner with a bow: the card as a gift.
export function Ribbon({ className = "" }: { className?: string }) {
  if (!IS_NY) return null;
  return (
    <span className={`ny-ribbon ${className}`} aria-hidden="true">
      <i className="ny-ribbon__v" />
      <svg className="ny-ribbon__bow" viewBox="0 0 60 40" width="60" height="40">
        <path d="M30 20 C18 2 4 6 6 16 C8 26 22 24 30 20 Z" />
        <path d="M30 20 C42 2 56 6 54 16 C52 26 38 24 30 20 Z" />
        <path d="M30 20 L22 38 M30 20 L38 38" />
        <circle cx="30" cy="20" r="4" />
      </svg>
    </span>
  );
}
