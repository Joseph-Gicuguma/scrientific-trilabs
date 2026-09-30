import type { NavLink } from "./types";

export const primaryNav: readonly NavLink[] = [
  { label: "Services", to: "/services" },
  { label: "How we work", to: "/how-we-work" },
  { label: "About", to: "/about" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];

export const navCta: NavLink = {
  label: "Book a discovery call",
  to: "/contact",
};

export const nav = {
  homeLabel: "Tri-Lab Scientific home",
  menuOpen: "Menu",
  menuClose: "Close",
  menuLabel: "Site menu",
  primaryLabel: "Primary",
  footerLabel: "Footer",
} as const;
