import type { PageSeo } from "./types";

export const about = {
  seo: {
    title: "About",
    description:
      "Tri-Lab Scientific is led by Grace Wanjũgũ Kamau: nine years in sales and applications at Bruker and Hain Lifescience and consulting for Revvity, with an MPH in Epidemiology.",
  } satisfies PageSeo,
  eyebrow: "About",
  heading: "Built by someone who has done the work.",
  lead: "Tri-Lab Scientific is a Nairobi consultancy for international IVD and life-science companies entering East Africa.",
  story: [
    "Grace Wanjũgũ Kamau spent nine years selling, installing and supporting diagnostics across Sub-Saharan Africa, first with Hain Lifescience, then with Bruker, then as a consultant to Revvity.",
    "That work covered the whole chain: regulators, reference labs, distributors, tenders and the scientists who use the products every day.",
    "Tri-Lab Scientific puts that experience to work for companies with strong products that belong in East African labs.",
  ],
  careerHeading: "Career",
  educationHeading: "Education",
  valuesHeading: "How Grace works",
  values: [
    {
      title: "Plain answers",
      body: "If a market is wrong for your product, you will hear it early.",
    },
    {
      title: "Written down",
      body: "Weekly updates and a final report, so nothing lives only in someone's head.",
    },
    {
      title: "On the ground",
      body: "Based in Nairobi, working in the markets we advise on.",
    },
  ],
  cta: { label: "Book a discovery call", to: "/contact" },
} as const;
