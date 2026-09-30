import type { PageSeo, SectionIntro, Step } from "./types";

export const howWeWork = {
  seo: {
    title: "How we work",
    description:
      "From discovery call to final report: how a Tri-Lab Scientific engagement runs, plus the Kenyan regulatory detail we handle, from CSDT dossiers to KEMSA tenders.",
  } satisfies PageSeo,

  intro: {
    eyebrow: "How we work",
    heading: "Clear steps. No surprises.",
    body: "Every engagement follows the same rhythm, so you always know what happens next and when.",
  } satisfies SectionIntro,

  stepsHeading: "Engagement steps",
  steps: [
    {
      title: "Discovery call",
      body: "We learn about your product, your target markets and your timelines. You learn how we work.",
    },
    {
      title: "NDA",
      body: "We sign a mutual non-disclosure agreement before you share technical files or commercial plans.",
    },
    {
      title: "Proposal in 3 working days",
      body: "A written proposal with scope, deliverables, timeline and fees. No surprises later.",
    },
    {
      title: "Kickoff",
      body: "We agree contacts, documents, milestones and how you want to hear from us.",
    },
    {
      title: "Weekly updates",
      body: "A short written update every week: what moved, what is blocked, what we need from you.",
    },
    {
      title: "Final report",
      body: "A clear record of findings, decisions and next steps that your team can use after we finish.",
    },
  ] satisfies readonly Step[],

  regulatory: {
    intro: {
      eyebrow: "Regulatory detail",
      heading: "What getting an IVD to market in Kenya involves.",
      body: "Kenya is our home market and often the first registration. These are the pieces we handle for you.",
    } satisfies SectionIntro,
    items: [
      {
        title: "CSDT dossier",
        body: "Kenya's Pharmacy and Poisons Board uses the Common Submission Dossier Template. We check your technical file against it, close the gaps and prepare the dossier.",
      },
      {
        title: "PPB PRIMS portal",
        body: "Applications go through PRIMS, the Board's online system. We prepare the submission, track it and handle correspondence.",
      },
      {
        title: "In-country performance testing",
        body: "Some IVDs need evaluation in a Kenyan laboratory before approval. We coordinate samples, timelines and results.",
      },
      {
        title: "KEBS",
        body: "Kenya Bureau of Standards requirements can apply when your product is imported. We check what applies before anything ships.",
      },
      {
        title: "KEMSA and county tenders",
        body: "KEMSA buys for national programmes, and county governments run their own tenders. We track both and get you ready to bid.",
      },
    ] satisfies readonly Step[],
  },

  cta: {
    heading: "Start with a discovery call.",
    body: "Tell us what you sell and where. We will tell you honestly whether and how we can help.",
    action: { label: "Book a discovery call", to: "/contact" },
  },
} as const;
