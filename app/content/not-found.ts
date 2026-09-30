import type { PageSeo } from "./types";

export const notFound = {
  seo: {
    title: "Page not found",
    description: "The page you asked for does not exist or has moved.",
  } satisfies PageSeo,
  code: "404",
  heading: "This well is empty.",
  body: "The page you asked for does not exist or has moved.",
  linksHeading: "Try one of these",
  links: [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ],
} as const;
