import type { Tone } from "~/lib/tones";
import { plateFromAscii, type FillMap, type WellId } from "../wells";

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

/** One colour per country. Neighbours on the plate never share a tone. */
export const PLATE_MARKET_TONES: MarketTones = {
  ET: "sage",
  KE: "orange",
  UG: "ink",
  RW: "cream",
  TZ: "green",
};

/**
 * Empty wells beside each country that carry its code instead of an outline.
 * The script that draws the Open Graph image reads this object too.
 */
export const MARKET_LABEL_WELLS: Readonly<Record<MarketCode, WellId>> = {
  ET: "A9",
  UG: "C2",
  KE: "D9",
  RW: "F1",
  TZ: "G8",
};

const KEYS: Readonly<Record<string, MarketCode>> = {
  E: "ET",
  K: "KE",
  U: "UG",
  R: "RW",
  T: "TZ",
};

export function eastAfricaFills(
  tones: MarketTones = PLATE_MARKET_TONES,
): FillMap {
  const legend = Object.fromEntries(
    Object.entries(KEYS).map(([key, code]) => [key, tones[code]]),
  ) as Record<string, Tone>;
  return plateFromAscii(EAST_AFRICA_ART, legend);
}

/** Country codes keyed by the well they sit in, for WellPlate's `annotations`. */
export function eastAfricaLabels(): Readonly<Partial<Record<WellId, string>>> {
  return Object.fromEntries(
    Object.entries(MARKET_LABEL_WELLS).map(([code, well]) => [well, code]),
  );
}
