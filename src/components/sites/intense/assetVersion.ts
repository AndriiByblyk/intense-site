// Build stamp appended to our own CSS/JS URLs (?v=…). Those files keep their
// names between deploys and are cached by the CDN, so without this a new
// deploy could keep serving the previous file for up to an hour.
// Pages are prerendered at build time, so this is fixed per deployment.
export const ASSET_V = (process.env.VERCEL_DEPLOYMENT_ID ?? Date.now().toString(36)).slice(-10);
export const v = (url: string) => `${url}?v=${ASSET_V}`;
