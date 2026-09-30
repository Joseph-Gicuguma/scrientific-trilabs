import type { SectionIntro, Step } from "./types";

/** The five-stage path shown on the home page. */
export const processStages = {
  intro: {
    eyebrow: "The path",
    heading: "Assess. Register. Partner. Launch. Grow.",
    body: "One route from first question to steady sales. Join at the stage you are at.",
  } satisfies SectionIntro,
  steps: [
    {
      title: "Assess",
      body: "Is the market right for your product? We find out, with evidence.",
    },
    {
      title: "Register",
      body: "Dossier, submission, performance testing and regulator queries.",
    },
    {
      title: "Partner",
      body: "The right distributor, vetted and contracted.",
    },
    {
      title: "Launch",
      body: "Opinion leaders, tenders and first orders.",
    },
    {
      title: "Grow",
      body: "Monthly reviews that keep sales moving.",
    },
  ] satisfies readonly Step[],
  cta: { label: "See how we work", to: "/how-we-work" },
} as const;
