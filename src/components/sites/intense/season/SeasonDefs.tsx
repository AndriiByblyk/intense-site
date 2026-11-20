// New Year · shared SVG drawings, put on the page once (their gradient ids
// must be unique): the glass bulb of the garlands and three glass baubles.
// Everything else references them with <use href="#…">.
export function SeasonDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        {/* ---- garland bulb: brass socket, glass drop, highlight ---- */}
        <linearGradient id="nyg-socket" x1="0" x2="1">
          <stop offset="0" stopColor="#3b3120" />
          <stop offset="0.45" stopColor="#a48a4e" />
          <stop offset="0.6" stopColor="#d9c38a" />
          <stop offset="1" stopColor="#4a3d22" />
        </linearGradient>
        <radialGradient id="nyg-warm" cx="45%" cy="62%" r="70%">
          <stop offset="0" stopColor="#fffdf2" />
          <stop offset="0.35" stopColor="#fbe7b0" />
          <stop offset="0.75" stopColor="#e2b862" />
          <stop offset="1" stopColor="#a87a2c" />
        </radialGradient>
        <radialGradient id="nyg-amber" cx="45%" cy="62%" r="70%">
          <stop offset="0" stopColor="#fff6d6" />
          <stop offset="0.35" stopColor="#f6cf7a" />
          <stop offset="0.75" stopColor="#d69a3a" />
          <stop offset="1" stopColor="#8c5c1c" />
        </radialGradient>
        <radialGradient id="nyg-cream" cx="45%" cy="62%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#f7f0dc" />
          <stop offset="0.8" stopColor="#d8c79c" />
          <stop offset="1" stopColor="#9d8a5c" />
        </radialGradient>
        {[
          ["warm", "nyg-warm"],
          ["amber", "nyg-amber"],
          ["cream", "nyg-cream"],
        ].map(([k, g]) => (
          <symbol key={k} id={`ny-bulb-${k}`} viewBox="-7 0 14 22" overflow="visible">
            <rect x="-2.6" y="0" width="5.2" height="6.4" rx="1" fill="url(#nyg-socket)" />
            <path d="M-2.6 2.2h5.2M-2.6 4.2h5.2" stroke="rgba(0,0,0,.35)" strokeWidth=".5" />
            <path d="M0 6C4.4 6 5.4 10.6 5 13.8 4.6 17.8 2.2 21 0 21-2.2 21-4.6 17.8-5 13.8-5.4 10.6-4.4 6 0 6Z" fill={`url(#${g})`} />
            <ellipse cx="-1.9" cy="11.4" rx="1" ry="2.6" fill="#fff" opacity=".8" />
            <ellipse cx="1.6" cy="17.2" rx="1.6" ry=".7" fill="#fff" opacity=".35" />
          </symbol>
        ))}

        {/* ---- baubles (viewBox 0 0 100 132: loop at the top, ball centre 50,84) ---- */}
        <linearGradient id="nyb-cap" x1="0" x2="1">
          <stop offset="0" stopColor="#5e4c22" />
          <stop offset="0.22" stopColor="#c9b073" />
          <stop offset="0.38" stopColor="#f4e5b8" />
          <stop offset="0.55" stopColor="#a68b4b" />
          <stop offset="0.8" stopColor="#e2cc8c" />
          <stop offset="1" stopColor="#4d3d18" />
        </linearGradient>
        <pattern id="nyb-ridges" width="3.2" height="20" patternUnits="userSpaceOnUse">
          <rect width="1.2" height="20" fill="rgba(0,0,0,.28)" />
        </pattern>
        <radialGradient id="nyb-rim" cx="50%" cy="50%" r="50%">
          <stop offset="0.72" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".42" />
        </radialGradient>
        <radialGradient id="nyb-spec" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nyb-gold" cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#fff8de" />
          <stop offset="0.16" stopColor="#f3dea2" />
          <stop offset="0.42" stopColor="#cfae62" />
          <stop offset="0.74" stopColor="#82652a" />
          <stop offset="1" stopColor="#2f2209" />
        </radialGradient>
        <radialGradient id="nyb-black" cx="36%" cy="30%" r="80%">
          <stop offset="0" stopColor="#7a705a" />
          <stop offset="0.2" stopColor="#2c2719" />
          <stop offset="0.6" stopColor="#0f0d08" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <radialGradient id="nyb-champ" cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#fffcf3" />
          <stop offset="0.25" stopColor="#efe4c8" />
          <stop offset="0.6" stopColor="#c4ad7a" />
          <stop offset="1" stopColor="#5f4e28" />
        </radialGradient>
        <pattern id="nyb-glitter" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r=".7" fill="#fff8e0" />
          <circle cx="9" cy="1.5" r=".5" fill="#fff" />
          <circle cx="6" cy="9" r=".8" fill="#f5e2a8" />
          <circle cx="12" cy="11" r=".5" fill="#fff8e0" />
          <circle cx="3.5" cy="12.5" r=".45" fill="#fff" />
        </pattern>
        <clipPath id="nyb-ballclip">
          <circle cx="50" cy="84" r="40" />
        </clipPath>
        {[
          ["gold", "nyb-gold", "rgba(255,255,255,.22)", "rgba(255,236,190,.55)"],
          ["black", "nyb-black", "rgba(216,197,142,.32)", "rgba(216,197,142,.7)"],
          ["champ", "nyb-champ", "rgba(255,255,255,.2)", "rgba(255,240,205,.5)"],
        ].map(([k, g, band, rim]) => (
          <symbol key={k} id={`ny-ball-${k}`} viewBox="0 0 100 132" overflow="visible">
            <ellipse cx="50" cy="15" rx="6.5" ry="8.5" fill="none" stroke="#c9b073" strokeWidth="1.8" />
            <rect x="39" y="22" width="22" height="16" rx="2.5" fill="url(#nyb-cap)" />
            <rect x="39" y="22" width="22" height="16" rx="2.5" fill="url(#nyb-ridges)" />
            <rect x="37.5" y="35.5" width="25" height="4" rx="2" fill="#8f7a45" />
            <circle cx="50" cy="84" r="40" fill={`url(#${g})`} />
            {k === "champ" && <circle cx="50" cy="84" r="40" fill="url(#nyb-glitter)" opacity=".55" />}
            <g clipPath="url(#nyb-ballclip)">
              {/* the window it reflects: a soft curved band */}
              <path d="M18 70C30 52 54 46 76 54 66 58 46 62 22 82Z" fill={band} />
              {/* rim light from below */}
              <path d="M30 112C46 124 72 120 86 100 80 118 52 128 30 112Z" fill={rim} />
            </g>
            <circle cx="50" cy="84" r="40" fill="url(#nyb-rim)" />
            <ellipse cx="35" cy="66" rx="10" ry="6.5" transform="rotate(-32 35 66)" fill="url(#nyb-spec)" />
            <circle cx="62" cy="58" r="2.2" fill="#fff" opacity=".7" />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
