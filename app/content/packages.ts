import type { Package, PageSeo, SectionIntro } from "./types";

export const packages: readonly Package[] = [
  {
    slug: "market-snapshot",
    name: "Market Snapshot",
    tone: "orange",
    summary:
      "A two-week country brief that ends with a clear go or no-go view.",
    timeline: "2 weeks",
    timelineShort: "2 weeks",
    includes: [
      "Market overview for one country",
      "Testing priorities relevant to your product",
      "Regulatory pathway in outline",
      "Main buyers, channels and competitors",
      "A go or no-go recommendation, with the reasons",
    ],
    forWho:
      "Companies deciding whether East Africa deserves a closer look, or choosing which country to start in.",
    outcome: "A short, honest answer you can act on.",
  },
  {
    slug: "market-entry-assessment",
    name: "Market Entry Assessment",
    tone: "paper",
    summary:
      "A four to six week assessment of one market, from disease priorities to the right entry model.",
    timeline: "4 to 6 weeks",
    timelineShort: "4 to 6 weeks",
    includes: [
      "Disease priorities and testing demand",
      "Lab infrastructure and where your product fits",
      "Funding streams, public and donor",
      "Competitor landscape",
      "Tender calendar and buying process",
      "Regulatory pathway, step by step",
      "Recommended entry model",
      "Risk plan",
    ],
    forWho:
      "Companies that have decided to enter and need a plan they can take to their leadership team.",
    outcome: "A full entry plan with the evidence behind it.",
  },
  {
    slug: "regulatory-registration",
    name: "Regulatory Registration",
    tone: "green",
    summary:
      "From CSDT gap analysis to PPB approval, with performance testing and query responses handled.",
    timeline: "Scoped per product. The gap analysis sets the plan.",
    timelineShort: "Scoped per product",
    includes: [
      "CSDT gap analysis against your technical file",
      "Dossier preparation",
      "Submission to the Pharmacy and Poisons Board",
      "Coordination of in-country performance testing",
      "Responses to regulator queries",
    ],
    forWho:
      "Manufacturers with a product ready to register who want the dossier right the first time.",
    outcome: "A registered product, and a record of how it got there.",
  },
  {
    slug: "partner-search",
    name: "Partner Search & Onboarding",
    tone: "ink",
    summary:
      "We find, vet, negotiate with and contract the right distributor for your product.",
    timeline: "Agreed in the proposal, based on the market and product.",
    timelineShort: "Scoped per market",
    includes: [
      "Long list of distributors that fit your category",
      "Vetting: coverage, technical capability, storage and references",
      "Shortlist and introductions",
      "Support through negotiation",
      "Contract and onboarding plan",
    ],
    forWho:
      "Companies without a distributor, or with one that is not delivering.",
    outcome: "A signed partner who is set up to sell.",
  },
  {
    slug: "market-launch-retainer",
    name: "Market Launch Retainer",
    tone: "cream",
    summary:
      "An in-country commercial lead for your brand, reporting to you every month.",
    timeline: "Monthly retainer",
    timelineShort: "Monthly",
    includes: [
      "Relationships with key opinion leaders",
      "Tender readiness for KEMSA and county tenders",
      "Regular distributor performance reviews",
      "Monthly report on pipeline, tenders and risks",
    ],
    forWho:
      "Companies with a registered product and a distributor, who need someone in the room.",
    outcome: "Steady progress you can see, month by month.",
  },
];

export function packageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export const servicesPage = {
  seo: {
    title: "Services",
    description:
      "Five ways to work with Tri-Lab Scientific: Market Snapshot, Market Entry Assessment, Regulatory Registration, Partner Search and a Market Launch Retainer.",
  } satisfies PageSeo,
  intro: {
    eyebrow: "Services",
    heading: "Five packages. Use one, or follow the whole path.",
    body: "Each package stands on its own. Most clients start with a snapshot or an assessment, then move to registration and partners.",
  } satisfies SectionIntro,
  jumpNavLabel: "Packages on this page",
  labels: {
    includes: "What is included",
    timeline: "Timeline",
    forWho: "Who it is for",
    outcome: "What you leave with",
    cta: "Discuss this package",
  },
  pricing:
    "Every engagement is scoped to your product and market. We send a written proposal within 3 working days of the discovery call.",
} as const;
