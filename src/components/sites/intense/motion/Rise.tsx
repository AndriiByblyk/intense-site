// M03 · "Rising titles": a heading's words rise out of a mask when the heading
// (or the [data-reveal] element around it) enters the screen. Split on the
// server, so the text is complete in the HTML and for screen readers; the
// motion itself lives in /sites/intense/motion.css.
//
//   <h2 data-reveal>{rise("Сім напрямів — одна команда")}</h2>
//
// `start` continues the word count across several calls (a title built from
// two spans keeps one stagger).
export function rise(text: string, start = 0) {
  const words = text.split(" ");
  return words.flatMap((w, i) => {
    const el = (
      <span className="rw" key={`${start + i}-${w}`} style={{ "--i": start + i } as React.CSSProperties}>
        <span>{w}</span>
      </span>
    );
    return i === 0 ? [el] : [" ", el];
  });
}

/** Number of words in a phrase, to continue a stagger in the next rise() call. */
export const wordCount = (text: string) => text.split(" ").length;
