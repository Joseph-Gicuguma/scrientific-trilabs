import type { Package, PageSeo, SectionIntro } from "./types";

export const packages: readonly Package[] = [
  {
    slug: "market-snapshot",
    name: "Market Snapshot",
    tone: "orange",
    photo: "scientistMicroscope",
    tagline: "Know where the opportunity is before you invest.",
    summary:
      "A focused market assessment designed to give you an evidence-based view of a country's potential for your IVD or life-science portfolio.",
    detail:
      "We assess the market fundamentals that matter most, from diagnostic priorities and competitive dynamics to regulatory considerations, buyers and routes to market, so you can determine whether an opportunity warrants further investment and where to focus first.",
    includesLabel: "What we assess",
    includes: [
      {
        label: "Market opportunity",
        detail: "Market structure, demand drivers and commercial potential",
      },
      {
        label: "Diagnostic priorities",
        detail:
          "Disease areas, testing needs and relevant opportunities for your portfolio",
      },
      {
        label: "Regulatory landscape",
        detail: "Applicable regulatory pathways and key requirements",
      },
      {
        label: "Commercial landscape",
        detail:
          "Major buyers, procurement channels, competitors and routes to market",
      },
      {
        label: "Market feasibility",
        detail:
          "Key opportunities, barriers and considerations for market entry",
      },
    ],
    forWho: {
      lead: "Ideal for companies that are:",
      items: [
        "Exploring East Africa for the first time",
        "Comparing potential markets",
        "Assessing a new product or portfolio opportunity",
        "Seeking an informed basis for further investment",
      ],
    },
    outcome: [
      "A concise, decision-ready assessment of the market, highlighting where the opportunity lies, what to consider and what to do next.",
    ],
    closing: "Clarity before commitment.",
    cta: "Discuss your market opportunity",
  },
  {
    slug: "market-entry-assessment",
    name: "Market Entry Assessment",
    tone: "paper",
    photo: "sampleTubes",
    tagline: "Know how to enter before you commit.",
    summary:
      "A comprehensive assessment for companies that have identified a market opportunity and need a clear, evidence-based strategy for entering and establishing a presence.",
    detail:
      "We examine the healthcare and diagnostic landscape, market demand, funding and procurement dynamics, competition, regulatory requirements and commercial environment to determine where the opportunity lies, how the market works and what it will take to succeed.",
    includesLabel: "What we assess",
    includes: [
      {
        label: "Disease & testing landscape",
        detail: "Priority disease areas, testing needs and demand drivers",
      },
      {
        label: "Laboratory ecosystem",
        detail:
          "Laboratory infrastructure, testing capacity and where your portfolio fits",
      },
      {
        label: "Funding & procurement",
        detail:
          "Public financing, donor programmes, procurement structures, tenders and purchasing pathways",
      },
      {
        label: "Competitive landscape",
        detail: "Key competitors, portfolios, positioning and market dynamics",
      },
      {
        label: "Regulatory & market access",
        detail:
          "Applicable requirements, registration pathways and potential access considerations",
      },
      {
        label: "Commercial opportunity",
        detail:
          "Customer segments, channels, pricing considerations and route-to-market options",
      },
      {
        label: "Entry strategy",
        detail:
          "Recommended market-entry model, partnerships and commercial approach",
      },
      {
        label: "Risk & mitigation",
        detail:
          "Key market, regulatory, commercial and operational risks with practical mitigation strategies",
      },
    ],
    forWho: {
      body: "Companies that have identified a market as a potential priority and need the evidence, strategic direction and practical roadmap to move forward.",
      lead: "Ideal for leadership teams evaluating:",
      items: [
        "Market entry",
        "Portfolio expansion",
        "Country prioritization",
        "Investment decisions",
        "New commercial models",
        "Local partnership strategies",
      ],
    },
    outcome: [
      "A market-specific entry strategy that brings together the evidence, opportunities, risks and practical actions required to move from market assessment to execution.",
    ],
    closing:
      "A clear strategy. A defensible business case. A practical path forward.",
    cta: "Discuss your market opportunity",
  },
  {
    slug: "market-access-regulatory-strategy",
    name: "Market Access & Regulatory Strategy",
    tone: "green",
    photo: "paperwork",
    tagline: "Navigate the regulatory pathway with confidence.",
    summary:
      "Bringing an IVD or life-science product into a new market requires more than submitting a dossier. We help you understand the regulatory pathway, identify gaps early and coordinate the requirements needed to move your product towards market access.",
    detail:
      "Our support can span regulatory assessment, dossier preparation, submission coordination, performance testing and responses to regulatory queries, tailored to the product and market.",
    includesLabel: "What we support",
    includes: [
      {
        label: "Regulatory pathway assessment",
        detail: "Understand the applicable requirements and registration route",
      },
      {
        label: "Technical file & dossier review",
        detail: "Identify gaps and requirements before submission",
      },
      {
        label: "Dossier preparation",
        detail: "Support compilation and preparation of required documentation",
      },
      {
        label: "Registration coordination",
        detail: "Coordinate submissions and in-country regulatory processes",
      },
      {
        label: "Performance testing",
        detail: "Coordinate required local testing and relevant stakeholders",
      },
      {
        label: "Regulatory queries",
        detail: "Support responses and follow-up throughout the review process",
      },
      {
        label: "Market-access considerations",
        detail:
          "Identify regulatory and access requirements that may affect commercialisation",
      },
    ],
    forWho: {
      lead: "Manufacturers and international IVD or life-science companies that:",
      items: [
        "Are preparing to enter an East African market",
        "Need clarity on the applicable regulatory pathway",
        "Have an existing dossier that requires local adaptation or gap assessment",
        "Need in-country coordination for regulatory requirements",
        "Want to reduce avoidable delays and uncertainty during the registration process",
      ],
    },
    outcome: [
      "A clear regulatory pathway, an organised submission process and practical support through the requirements needed to progress your product towards market access.",
    ],
    closing: "From regulatory requirements to market readiness.",
    cta: "Discuss your regulatory needs",
    related: {
      label: "Read: Registering an IVD in Kenya",
      to: "/insights/kenya-ivd-registration-guide",
    },
  },
  {
    slug: "partner-route-to-market",
    name: "Partner & Route-to-Market Development",
    tone: "ink",
    photo: "warehouse",
    tagline: "Build the right route to market.",
    summary:
      "The right local partner can determine how effectively an IVD or life-science portfolio reaches customers, navigates procurement and develops long-term market presence.",
    detail:
      "Tri-Lab helps international companies identify, evaluate and engage potential distributors and commercial partners based on strategic fit, market coverage, technical capability, regulatory experience and commercial potential.",
    includesLabel: "What we support",
    includes: [
      {
        label: "Route-to-market assessment",
        detail:
          "Determine the most appropriate channel and commercial model for the market",
      },
      {
        label: "Partner identification",
        detail:
          "Develop a targeted pool of potential distributors and commercial partners",
      },
      {
        label: "Partner due diligence",
        detail:
          "Assess market coverage, portfolio fit, technical capabilities, regulatory experience, infrastructure and commercial capacity",
      },
      {
        label: "Partner evaluation",
        detail:
          "Compare candidates against agreed strategic and commercial criteria",
      },
      {
        label: "Introductions & engagement",
        detail:
          "Facilitate structured introductions and early-stage discussions",
      },
      {
        label: "Commercial negotiations",
        detail:
          "Support discussions around territories, portfolios, targets, responsibilities and commercial terms",
      },
      {
        label: "Onboarding & market planning",
        detail:
          "Develop practical plans for partner onboarding, portfolio activation and market development",
      },
    ],
    forWho: {
      lead: "International IVD and life-science companies that:",
      items: [
        "Are entering a new East African market",
        "Need to establish or strengthen their distribution network",
        "Are evaluating potential distributors",
        "Need to replace or diversify an existing channel",
        "Want a more structured approach to partner selection",
      ],
    },
    outcome: [
      "A qualified partner pipeline, a structured evaluation process and a clear route towards establishing the right commercial relationships for your market.",
      "Where appropriate, we continue through partner onboarding and market development to help turn the relationship into commercial activity.",
    ],
    closing:
      "The right partner. The right route. The right foundation for growth.",
    cta: "Discuss your partner strategy",
  },
  {
    slug: "commercial-market-development",
    name: "Commercial Market Development",
    tone: "cream",
    photo: "handshake",
    tagline: "Your team on the ground. Your strategy in motion.",
    summary:
      "Entering a market is only the beginning. Once your product is registered and the right partners are in place, sustained growth requires local relationships, market intelligence and consistent commercial activity.",
    detail:
      "Tri-Lab provides in-country commercial and market-development support to help international IVD and life-science companies build relationships, develop opportunities, support partners and stay close to what is happening in the market.",
    includesLabel: "What we support",
    includes: [
      {
        label: "Stakeholder & KOL engagement",
        detail:
          "Build relationships with relevant clinicians, laboratory leaders, health programmes and other decision-makers",
      },
      {
        label: "Tender & procurement readiness",
        detail:
          "Monitor relevant opportunities and support preparation for public and institutional procurement",
      },
      {
        label: "Distributor development",
        detail:
          "Review performance, identify opportunities and support joint market-development activities",
      },
      {
        label: "Market intelligence",
        detail:
          "Provide ongoing insight into competitors, customer needs, procurement dynamics and emerging opportunities",
      },
      {
        label: "Opportunity & pipeline development",
        detail: "Identify and develop relevant commercial opportunities",
      },
      {
        label: "Market representation",
        detail:
          "Provide an experienced local presence for meetings, events, partner engagement and market activities",
      },
      {
        label: "Strategic reporting",
        detail:
          "Regular reporting on opportunities, pipeline, market developments, risks and recommended actions",
      },
    ],
    forWho: {
      lead: "International IVD and life-science companies that:",
      items: [
        "Have an existing or planned presence in an East African market",
        "Have products ready for commercialisation",
        "Have local partners but need stronger market development",
        "Need local commercial representation without establishing a full local team",
        "Want to accelerate market development and strengthen their existing footprint",
      ],
    },
    outcome: [
      "A stronger local presence, better market visibility and consistent progress towards commercial growth.",
      "Tri-Lab becomes an extension of your team, bringing local relationships, market intelligence and commercial execution while keeping you informed and in control.",
    ],
    closing: "Local presence. Strategic execution. Measurable progress.",
    cta: "Discuss your market development needs",
  },
];

export function packageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export const servicesPage = {
  seo: {
    title: "Services",
    description:
      "Market Snapshot, Market Entry Assessment, Market Access & Regulatory Strategy, Partner & Route-to-Market Development and Commercial Market Development for IVD and life-science companies in East Africa.",
  } satisfies PageSeo,
  intro: {
    eyebrow: "How we can work together",
    heading: "Flexible support. One connected approach.",
    body: "Whether you need a focused market assessment or end-to-end support establishing and growing your presence in East Africa, our services can be engaged individually or combined into an end-to-end market development programme.",
  } satisfies SectionIntro,
  jumpNavLabel: "Services on this page",
  labels: {
    forWho: "Who it is for",
    outcome: "What you leave with",
  },
  pricing:
    "Every engagement is tailored to the product, market and objectives. Following an initial discovery conversation, we develop a scope of work and written proposal based on your specific requirements.",
} as const;
