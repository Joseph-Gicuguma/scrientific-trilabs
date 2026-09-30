import type { PageSeo } from "./types";

export const productTypes = [
  "IVD reagents and test kits",
  "Diagnostic instruments",
  "Point-of-care tests",
  "Molecular diagnostics",
  "Life-science research products",
  "Other",
] as const;

export type ProductType = (typeof productTypes)[number];

export const contact = {
  seo: {
    title: "Contact",
    description:
      "Book a discovery call with Tri-Lab Scientific in Nairobi. Tell us about your IVD or life-science product and the East African markets you are considering.",
  } satisfies PageSeo,
  eyebrow: "Contact",
  heading: "Book a discovery call.",
  lead: "Tell us about your product and the markets you have in mind. We will reply to set up a call.",
  form: {
    heading: "Send us a note",
    fields: {
      name: { label: "Your name", autoComplete: "name" },
      company: { label: "Company", autoComplete: "organization" },
      email: { label: "Work email", autoComplete: "email" },
      country: {
        label: "Country you are based in",
        autoComplete: "country-name",
      },
      productType: {
        label: "Product type",
        placeholder: "Choose one",
      },
      message: {
        label: "Message",
        hint: "Your product, target markets and timelines, if you know them.",
      },
    },
    errors: {
      name: "Please enter your name.",
      company: "Please enter your company.",
      emailRequired: "Please enter your email address.",
      emailInvalid:
        "Please enter a valid email address, like name@company.com.",
      country: "Please enter your country.",
      productType: "Please choose a product type.",
      messageShort: "Please write at least 20 characters so we can prepare.",
      messageLong: "Please keep your message under 5000 characters.",
      summary: "Please fix the highlighted fields.",
    },
    submit: "Send message",
    submitting: "Sending",
    success: {
      heading: "Thank you. Your message is on its way.",
      body: "We will reply by email to arrange a discovery call.",
    },
    failure:
      "Sorry, your message did not send. Please try again, or email us directly.",
    notConfigured:
      "The contact form is not connected yet. Please email us directly.",
    privacy: "We use your details only to reply to you.",
    honeypotLabel: "Leave this field empty",
  },
  calendly: {
    heading: "Prefer to pick a time?",
    body: "Choose a slot for a discovery call directly in our calendar.",
    load: "Show the booking calendar",
    open: "Open the booking calendar in a new tab",
    iframeTitle: "Book a discovery call with Tri-Lab Scientific",
    missing: "Calendly booking link",
  },
  details: {
    heading: "Direct",
    emailLabel: "Email",
    locationLabel: "Location",
    linkedinLabel: "LinkedIn",
  },
} as const;
