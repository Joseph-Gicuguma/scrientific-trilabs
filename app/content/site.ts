import { todo, type MaybePending } from "./types";

export const site = {
  name: "Tri-Lab Scientific",
  legalName: "Tri-Lab Scientific Limited",
  tagline: "IVD and life-science market entry in East Africa",
  description:
    "Tri-Lab Scientific takes international IVD and life-science companies from market assessment to registration, partners and sales in East Africa.",
  founder: "Grace Wanjũgũ Kamau",
  location: {
    city: "Nairobi",
    country: "Kenya",
    countryCode: "KE",
  },
  email: todo("Contact email address") as MaybePending<string>,
  linkedin: todo("LinkedIn company page URL") as MaybePending<string>,
} as const;

export const footer = {
  contactHeading: "Contact",
  exploreHeading: "Explore",
  linkedinLabel: "LinkedIn",
} as const;
