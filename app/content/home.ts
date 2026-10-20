import type { PageSeo, SectionIntro } from "./types";

export const home = {
  seo: {
    description:
      "Tri-Lab Scientific helps international IVD and life-science companies assess, enter and grow in Kenya, Ethiopia, Uganda, Tanzania and Rwanda, from market strategy and regulatory navigation to partners and in-country commercial execution.",
  } satisfies PageSeo,

  hero: {
    eyebrow:
      "IVD & life-science market access, strategy & growth in East Africa",
    heading: "Bringing the world's best diagnostics to East Africa.",
    tagline: "From market opportunity to commercial growth.",
    body: "Tri-Lab Scientific helps international IVD and life-science companies assess, enter and grow in East African markets through evidence-led market strategy, regulatory navigation, partner development and in-country commercial execution.",
    primaryCta: { label: "Book a discovery call", to: "/contact" },
    secondaryCta: { label: "Our services", to: "/services" },
  },

  stats: {
    label: "Tri-Lab Scientific in numbers",
    items: [
      { value: "9+", label: "years in IVD and life science across Africa" },
      { value: "5", label: "East African markets, one base in Nairobi" },
      { value: "5", label: "services, from first look to steady growth" },
      { value: "3", label: "global diagnostics companies in our experience" },
    ],
  },

  mission: {
    intro: {
      eyebrow: "Why we exist",
      heading: "One registration. Two sides of the story.",
    } satisfies SectionIntro,
    sides: [
      {
        label: "For IVD & life-science companies",
        heading: "A trusted partner on the ground.",
        body: "Entering and growing in East Africa requires more than a market report. You need local insight, relationships and someone who understands how the market works in practice.",
        photo: "handshake",
      },
      {
        label: "For East African healthcare systems",
        heading: "Connecting global innovation with local healthcare needs.",
        body: "Tri-Lab helps connect international companies with the markets, institutions, partners and stakeholders needed to bring quality healthcare solutions to East Africa.",
        photo: "labResearcher",
      },
    ],
  },

  packages: {
    intro: {
      eyebrow: "Services",
      heading: "Five ways to work with us.",
      body: "Engage our services individually or combine them into an end-to-end market development programme.",
    } satisfies SectionIntro,
    all: { label: "All services", to: "/services" },
  },

  founderStrip: {
    intro: {
      eyebrow: "Meet the lead consultant",
      heading: "Industry experience. Local insight. Practical execution.",
    } satisfies SectionIntro,
    body: "Grace brings 9+ years of experience across the IVD and life-science sector in Sub-Saharan Africa, spanning commercial strategy, diagnostics, applications support, market access and market development.",
    companiesLabel: "Industry experience with",
    cta: { label: "About Grace", to: "/about" },
  },

  finalCta: {
    heading: "Start with a discovery call.",
    body: "Tell us what you offer, where you want to grow, and what you are trying to achieve. We'll give you an honest view of where we can add value, and what the right next step looks like.",
    cta: { label: "Book a discovery call", to: "/contact" },
  },
} as const;
