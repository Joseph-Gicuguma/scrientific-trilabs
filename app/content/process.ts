import type { SectionIntro, Step } from "./types";

/** The five-stage engagement in brief, for the home page. Full text in how-we-work.ts. */
export const processStages = {
  intro: {
    eyebrow: "How we work",
    heading: "Clarity at every step.",
    body: "A practical, collaborative approach tailored to your market, portfolio and objectives.",
  } satisfies SectionIntro,
  steps: [
    {
      title: "Discovery",
      body: "We start by understanding your portfolio, target market, objectives and the challenge you are trying to solve.",
    },
    {
      title: "Scope & Alignment",
      body: "We agree the scope, deliverables, responsibilities and approach.",
    },
    {
      title: "Strategy & Execution",
      body: "We bring together market intelligence, local expertise and commercial insight to address the agreed objectives.",
    },
    {
      title: "Progress & Communication",
      body: "You stay informed throughout the engagement.",
    },
    {
      title: "Recommendations & Next Steps",
      body: "Clear findings, recommendations and practical next steps that your team can use.",
    },
  ] satisfies readonly Step[],
  cta: { label: "See how we work", to: "/how-we-work" },
} as const;
