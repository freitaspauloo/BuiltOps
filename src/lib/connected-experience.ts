/**
 * Losani connected site experience — live lot availability platform.
 * Single source of truth for the external URL so every CTA stays in sync.
 */
export const CONNECTED_EXPERIENCE_URL =
  "https://losani-connected-site-experience.replit.app/";

/** Opens the portal compare-models grid (Anthony Jul 8). */
export const COMPARE_MODELS_URL = `${CONNECTED_EXPERIENCE_URL}?view=compare-models`;

/** Same origin — safe to embed in an iframe panel on the microsite. */
export const CONNECTED_EXPERIENCE_EMBED_URL = CONNECTED_EXPERIENCE_URL;

/** Deep link to a specific lot on the connected experience. */
export function connectedLotUrl(lotNumber?: string): string {
  if (!lotNumber) return CONNECTED_EXPERIENCE_URL;
  return `${CONNECTED_EXPERIENCE_URL}?lot=${encodeURIComponent(lotNumber)}`;
}
