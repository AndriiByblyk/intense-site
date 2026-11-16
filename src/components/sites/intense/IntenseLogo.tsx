type Props = {
  /** Collapse the wordmark into the ≡ monogram (used when the header shrinks). */
  compact?: boolean;
  /** Play the build-in animation on mount. */
  intro?: boolean;
  /** Show the "DENTAL CLINIC" line under the wordmark (full lockup). */
  tagline?: boolean;
  className?: string;
};

// INT≡NS≡ wordmark. Letters are live text (Manrope), each "E" is the brand's
// three gold bars. Motion:
//  - intro: letters rise out of a mask, bars draw in from the left, staggered
//  - hover: bars run a short wave
//  - compact: everything but the first ≡ folds away, leaving the monogram
const GLYPHS = ["I", "N", "T", "E", "N", "S", "E"] as const;

export function IntenseLogo({ compact = false, intro = true, tagline = false, className = "" }: Props) {
  let letterIndex = 0;
  return (
    <span
      className={`ilogo${compact ? " is-compact" : ""}${intro ? " is-intro" : ""}${tagline ? " has-tag" : ""} ${className}`}
      aria-label={tagline ? "INTENSE Dental Clinic" : "INTENSE"}
      role="img"
    >
      {GLYPHS.map((g, i) => {
        const delay = { "--i": letterIndex++ } as React.CSSProperties;
        if (g === "E") {
          const isMark = i === 3;
          return (
            <span
              key={i}
              className={`ilogo__e${isMark ? " ilogo__e--mark" : ""}`}
              style={delay}
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </span>
          );
        }
        return (
          <span key={i} className="ilogo__l" style={delay} aria-hidden="true">
            <span>{g}</span>
          </span>
        );
      })}
      {tagline && (
        <span className="ilogo__tag" aria-hidden="true">
          DENTAL CLINIC
        </span>
      )}
    </span>
  );
}
