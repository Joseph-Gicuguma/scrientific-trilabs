import type { PageSeo } from "./types";

export const about = {
  seo: {
    title: "About",
    description:
      "Tri-Lab Scientific is a Nairobi-based advisory firm helping international IVD and life-science companies assess, enter and grow in East African markets, led by Grace Wanjũgũ Kamau.",
  } satisfies PageSeo,
  eyebrow: "About",
  heading: "Built on experience. Focused on East Africa.",
  lead: "Tri-Lab Scientific is a Nairobi-based advisory firm helping international IVD and life-science companies assess, enter and grow in East African markets.",
  consultantHeading: "Meet the Lead Consultant",
  story: [
    "Grace brings 9+ years of experience across the IVD and life-science sector in Sub-Saharan Africa, spanning commercial strategy, diagnostics, applications support, market access and market development.",
    "Her industry experience includes work with Hain Lifescience, Bruker and Revvity, supporting international diagnostics businesses across diverse African healthcare markets.",
    "This experience has provided first-hand insight into the realities of market access and commercialisation, from regulatory pathways and laboratory networks to distributors, procurement, tenders, healthcare institutions and key decision-makers.",
    "At Tri-Lab, that experience is brought together with local market knowledge to help international companies make informed decisions, build the right partnerships and turn market opportunity into sustainable commercial growth.",
  ],
  closing: "Industry experience. Local insight. Practical execution.",
  companiesLabel: "Industry experience with",
  linkedinLabel: "Grace on LinkedIn",
  cta: { label: "Book a discovery call", to: "/contact" },
} as const;
