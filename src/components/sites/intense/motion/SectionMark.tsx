// M02 · The section label's mark: the gold diamond with a point in the middle
// (the same drawing as theme/images/mark.svg), inline so it can draw itself.
// pathLength="1" lets the CSS draw the outline with one dash, whatever its size.
export function SectionMark() {
  return (
    <svg className="mk-dia" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path pathLength={1} d="M8 1.6 14.4 8 8 14.4 1.6 8Z" />
      <circle cx="8" cy="8" r="1.5" />
      {/* New Year: the diamond gives way to a four-point star (season-ny.css) */}
      <path className="mk-star" d="M8 0.6 9.7 6.3 15.4 8 9.7 9.7 8 15.4 6.3 9.7 0.6 8 6.3 6.3Z" />
    </svg>
  );
}
