import type { PageSeo, SectionIntro } from "./types";

export const home = {
  seo: {
    description:
      "Tri-Lab Scientific takes international IVD and life-science companies from market assessment to registration, partners and sales in Kenya, Ethiopia, Uganda, Tanzania and Rwanda.",
  } satisfies PageSeo,

  hero: {
    eyebrow: "IVD and life-science market entry, East Africa",
    heading: "The world's best diagnostics, in East African labs sooner.",
    body: "Tri-Lab Scientific takes international IVD and life-science companies from market assessment to registration, partners and sales in East Africa.",
    primaryCta: { label: "Book a discovery call", to: "/contact" },
    secondaryCta: { label: "See how we work", to: "/how-we-work" },
    plateLabel:
      "A 96-well plate with wells filled in to outline Ethiopia, Kenya, Uganda, Rwanda and Tanzania",
  },

  mission: {
    intro: {
      eyebrow: "Why we exist",
      heading: "One registration. Two sides of the story.",
    } satisfies SectionIntro,
    sides: [
      {
        label: "For diagnostics companies",
        heading: "A trusted partner on the ground.",
        body: "You get someone in Nairobi who knows the regulators, the labs, the tenders and the distributors. You stop guessing from a distance.",
      },
      {
        label: "For East African labs and patients",
        heading: "World-class tests, sooner.",
        body: "When good products register faster, labs get better tools for TB, HIV, AMR and more. Patients get answers earlier.",
      },
    ],
  },

  packages: {
    intro: {
      eyebrow: "Services",
      heading: "Five ways to work with us.",
    } satisfies SectionIntro,
    all: { label: "All services", to: "/services" },
  },

  founderStrip: {
    intro: {
      eyebrow: "Who you work with",
      heading: "Nine years inside the industry you sell in.",
    } satisfies SectionIntro,
    yearsLabel: "years inside Bruker, Hain Lifescience and Revvity",
    body: "Grace Wanjũgũ Kamau has sold, installed and supported diagnostics across Sub-Saharan Africa. She knows how products reach labs here because she has done it.",
    cta: { label: "About Grace", to: "/about" },
  },

  finalCta: {
    heading: "Planning an East African launch?",
    body: "Book a discovery call. We will talk through your product, your target markets and a sensible first step.",
    cta: { label: "Book a discovery call", to: "/contact" },
  },
} as const;
