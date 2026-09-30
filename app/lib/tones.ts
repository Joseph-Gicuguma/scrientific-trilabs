export const TONES = [
  "blush",
  "green",
  "orange",
  "sage",
  "cream",
  "paper",
  "ink",
] as const;

export type Tone = (typeof TONES)[number];

/** CSS reference to a palette token, for SVG fills and inline styles. */
export function toneVar(tone: Tone): string {
  return `var(--color-${tone})`;
}
