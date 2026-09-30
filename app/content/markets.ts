import type { MarketCode } from "~/components/well-plate/maps/east-africa";
import type { SectionIntro } from "./types";

export interface Market {
  readonly code: MarketCode;
  readonly name: string;
  /** National regulator for IVDs and medical devices. */
  readonly regulator: string;
  readonly regulatorShort: string;
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
      name: "Kenya",
      regulator: "Pharmacy and Poisons Board",
      regulatorShort: "PPB",
    },
    {
      code: "ET",
      name: "Ethiopia",
      regulator: "Ethiopian Food and Drug Authority",
      regulatorShort: "EFDA",
    },
    {
      code: "UG",
      name: "Uganda",
      regulator: "National Drug Authority",
      regulatorShort: "NDA",
    },
    {
      code: "TZ",
      name: "Tanzania",
      regulator: "Tanzania Medicines and Medical Devices Authority",
      regulatorShort: "TMDA",
    },
    {
      code: "RW",
      name: "Rwanda",
      regulator: "Rwanda Food and Drugs Authority",
      regulatorShort: "Rwanda FDA",
    },
  ] satisfies readonly Market[],
} as const;
