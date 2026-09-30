import type { Tone } from "~/lib/tones";
import { plateFromAscii, type FillMap } from "../wells";

export type MarketCode = "ET" | "KE" | "UG" | "RW" | "TZ";

/*
 * East Africa on a 96-well plate (8 rows x 12 columns).
 * Each column is about 1.6° of longitude from 29°E, each row about 3.4° of
 * latitude from 15°N. Deliberately rough: it should read as the region, not a map.
 *
 *   E Ethiopia   K Kenya   U Uganda   R Rwanda   T Tanzania
 */
export const EAST_AFRICA_ART = `
  ....EEEE....
  ...EEEEEE...
  ...EEEEEEEE.
  .UUKKKKK....
  RUUKKKKK....
  .TTTTTK.....
  .TTTTTT.....
  ...TTTT.....
`;

export type MarketTones = Readonly<Record<MarketCode, Tone>>;

/** Adjacent countries never share a tone. Green and sage are too close to sit side by side. */
export const DEFAULT_MARKET_TONES: MarketTones = {
  ET: "sage",
  KE: "orange",
  UG: "ink",
  RW: "cream",
  TZ: "green",
};

const KEYS: Readonly<Record<string, MarketCode>> = {
  E: "ET",
  K: "KE",
  U: "UG",
  R: "RW",
  T: "TZ",
};

export function eastAfricaFills(
  tones: MarketTones = DEFAULT_MARKET_TONES,
): FillMap {
  const legend = Object.fromEntries(
    Object.entries(KEYS).map(([key, code]) => [key, tones[code]]),
  ) as Record<string, Tone>;
  return plateFromAscii(EAST_AFRICA_ART, legend);
}
