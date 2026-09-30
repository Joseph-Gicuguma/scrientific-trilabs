import type { PageSeo, SectionIntro } from "./types";

export const insightsPage = {
  seo: {
    title: "Insights",
    description:
      "Practical guides on registering and selling IVD and life-science products in Kenya, Ethiopia, Uganda, Tanzania and Rwanda.",
  } satisfies PageSeo,
  intro: {
    eyebrow: "Insights",
    heading: "Notes from the ground.",
    body: "Practical guides for export and regional managers planning East African launches.",
  } satisfies SectionIntro,
  empty: "No articles yet.",
  readMore: "Read the article",
  back: "All insights",
  minuteRead: (minutes: number) => `${minutes} min read`,
  byline: "By",
  cta: {
    heading: "Have a product in mind?",
    body: "We can tell you what this looks like for your product and your markets.",
    action: { label: "Book a discovery call", to: "/contact" },
  },
} as const;
