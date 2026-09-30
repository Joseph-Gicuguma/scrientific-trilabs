import type { MarketCode } from "~/components/well-plate/maps/east-africa";
import type { Tone } from "~/lib/tones";
import type { SectionIntro } from "./types";

export interface Market {
  readonly code: MarketCode;
  readonly name: string;
  /** National regulator for IVDs and medical devices. */
  readonly regulator: string;
  readonly regulatorShort: string;
  /** Colour block in the markets row. Neighbours in the row never share a tone. */
  readonly tone: Tone;
}

export const markets = {
  intro: {
    eyebrow: "Markets",
    heading: "Five markets, one base in Nairobi.",
    body: "We work across the East African Community and Ethiopia. Each country has its own regulator, its own buyers and its own pace.",
  } satisfies SectionIntro,
  regulatorLabel: "Regulator",
  items: [
    {
      code: "KE",
      tone: "orange",
      name: "Kenya",
      regulator: "Pharmacy and Poisons Board",
      regulatorShort: "PPB",
    },
    {
      code: "ET",
      tone: "sage",
      name: "Ethiopia",
      regulator: "Ethiopian Food and Drug Authority",
      regulatorShort: "EFDA",
    },
    {
      code: "UG",
      tone: "ink",
      name: "Uganda",
      regulator: "National Drug Authority",
      regulatorShort: "NDA",
    },
    {
      code: "TZ",
      tone: "green",
      name: "Tanzania",
      regulator: "Tanzania Medicines and Medical Devices Authority",
      regulatorShort: "TMDA",
    },
    {
      code: "RW",
      tone: "cream",
      name: "Rwanda",
      regulator: "Rwanda Food and Drugs Authority",
      regulatorShort: "Rwanda FDA",
    },
  ] satisfies readonly Market[],
} as const;
