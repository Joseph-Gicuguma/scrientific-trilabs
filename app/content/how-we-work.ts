import type { PageSeo, SectionIntro, Step } from "./types";

export const howWeWork = {
  seo: {
    title: "How we work",
    description:
      "How a Tri-Lab Scientific engagement runs: discovery, scope and alignment, strategy and execution, progress and communication, then recommendations and next steps.",
  } satisfies PageSeo,

  intro: {
    eyebrow: "How we work",
    heading: "Clarity at every step.",
    body: "A practical, collaborative approach tailored to your market, portfolio and objectives, from understanding the opportunity to building the right strategy and moving towards execution.",
  } satisfies SectionIntro,

  stepsHeading: "Engagement steps",
  steps: [
    {
      title: "Discovery",
      body: "We start by understanding your portfolio, target market, objectives and the challenge you are trying to solve. We then determine where Tri-Lab can add value and what the engagement should cover.",
    },
    {
      title: "Scope & Alignment",
      body: "Where appropriate, we put confidentiality arrangements in place before reviewing sensitive technical or commercial information. We then agree the scope, deliverables, responsibilities and approach.",
    },
    {
      title: "Strategy & Execution",
      body: "We bring together market intelligence, local expertise and commercial insight to address the agreed objectives. Depending on the engagement, this may include market assessment, regulatory strategy, route-to-market development, partner engagement or commercial execution.",
    },
    {
      title: "Progress & Communication",
      body: "You stay informed throughout the engagement. We provide agreed updates, highlight key findings and developments, surface risks or decisions that require your input, and keep the work moving towards the agreed objectives.",
    },
    {
      title: "Recommendations & Next Steps",
      body: "We conclude with clear findings, recommendations and practical next steps that your team can use to make decisions and move forward.",
    },
  ] satisfies readonly Step[],

  closing:
    "A clear process. Tailored to your market. Focused on what comes next.",

  cta: {
    heading: "Start with a discovery call.",
    body: "Tell us what you offer, where you want to grow, and what you are trying to achieve. We'll give you an honest view of where we can add value, and what the right next step looks like.",
    action: { label: "Book a discovery call", to: "/contact" },
  },
} as const;
