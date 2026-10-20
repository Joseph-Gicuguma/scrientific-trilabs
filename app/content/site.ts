import type { MaybePending } from "./types";

export const site = {
  name: "Tri-Lab Scientific",
  legalName: "Tri-Lab Scientific Limited",
  tagline: "IVD & life-science market access, strategy & growth in East Africa",
  description:
    "Tri-Lab Scientific helps international IVD and life-science companies assess, enter and grow in East African markets through evidence-led market strategy, regulatory navigation, partner development and in-country commercial execution.",
  founder: "Grace Wanjũgũ Kamau",
  location: {
    city: "Nairobi",
    country: "Kenya",
    countryCode: "KE",
  },
  email: "gracecugu1@gmail.com" as MaybePending<string>,
  linkedin:
    "https://www.linkedin.com/company/tri-lab-scientific-limited" as MaybePending<string>,
  /** Discovery-call booking page. VITE_CALENDLY_URL overrides it. */
  calendly: "https://calendly.com/gracecugu1/30min",
} as const;

export const footer = {
  contactHeading: "Contact",
  exploreHeading: "Explore",
  linkedinLabel: "LinkedIn",
} as const;
