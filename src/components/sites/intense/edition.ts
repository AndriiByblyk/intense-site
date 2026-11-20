// Which site this build is. One codebase, two Vercel projects:
//  - intense-site      the clinic's site (default)
//  - intense-site-ny   the New Year edition: NEXT_PUBLIC_EDITION=ny on that
//                      project — the festive skin and the full motion system
//                      are on all the time, and it is never indexed.
// NEXT_PUBLIC_* is inlined at build time, so the regular build carries none of
// the festive markup.
export const IS_NY = process.env.NEXT_PUBLIC_EDITION === "ny";
