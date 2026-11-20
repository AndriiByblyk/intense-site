// New Year · a string of lights across the full width: a thin wire in
// scallops, warm bulbs along it that twinkle in turn. Rendered always, shown
// only in the season (season-ny.css). The wire is an SVG stretched to the
// width; the bulbs are HTML dots placed on the same curve, so they stay round
// at any width. A scallop is a quadratic curve, so the sag at t is 4·s·t(1−t).
const SCALLOPS = 7;
const SAG = 30;
const AT = [0.18, 0.5, 0.82];

export function Garland({ className = "" }: { className?: string }) {
  const w = 1000 / SCALLOPS;
  const wire = Array.from({ length: SCALLOPS }, (_, i) => `Q ${i * w + w / 2} ${SAG * 2} ${(i + 1) * w} 0`).join(" ");
  const bulbs = Array.from({ length: SCALLOPS }, (_, i) =>
    AT.map((t) => ({ x: ((i + t) / SCALLOPS) * 100, y: 4 * SAG * t * (1 - t) })),
  ).flat();
  return (
    <div className={`ny-garland ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 1000 ${SAG + 10}`} preserveAspectRatio="none">
        <path d={`M 0 0 ${wire}`} />
      </svg>
      {bulbs.map((b, k) => (
        <i key={k} style={{ left: `${b.x}%`, top: `${(b.y / (SAG + 10)) * 100}%`, "--k": k } as React.CSSProperties} />
      ))}
    </div>
  );
}

// New Year · a gold bauble on a thread, swaying a little.
export function Bauble({ className = "" }: { className?: string }) {
  return (
    <span className={`ny-bauble ${className}`} aria-hidden="true">
      <i className="ny-bauble__thread" />
      <i className="ny-bauble__cap" />
      <i className="ny-bauble__ball" />
    </span>
  );
}

// New Year · a gold ribbon across a corner with a small bow: the card as a gift.
export function Ribbon({ className = "" }: { className?: string }) {
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
