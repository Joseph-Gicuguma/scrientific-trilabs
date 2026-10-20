import type { Tone } from "~/lib/tones";
import type { PhotoKey } from "./photos";

/** Content that has not been supplied yet. Rendered as a visible TODO marker. */
export interface Pending {
  readonly todo: string;
}

export type MaybePending<T> = T | Pending;

export function todo(note: string): Pending {
  return { todo: note };
}

export function isPending(value: unknown): value is Pending {
  return typeof value === "object" && value !== null && "todo" in value;
}

export interface NavLink {
  readonly label: string;
  readonly to: string;
}

export interface PageSeo {
  /** Omit on the home page, which uses the site name and tagline. */
  readonly title?: string;
  readonly description: string;
}

export interface SectionIntro {
  readonly eyebrow?: string;
  readonly heading: string;
  readonly body?: string;
}

export interface Package {
  readonly slug: string;
  readonly name: string;
  readonly tone: Tone;
  /** Key into `photos` (see photos.ts). */
  readonly photo: PhotoKey;
  /** The promise in a few words, e.g. "Know how to enter before you commit." */
  readonly tagline: string;
  /** Opening paragraph. */
  readonly summary: string;
  /** Second paragraph: how we go about it. */
  readonly detail: string;
  /** "What we assess" or "What we support". */
  readonly includesLabel: string;
  readonly includes: readonly { label: string; detail: string }[];
  readonly forWho: {
    /** Optional sentence before the list. */
    readonly body?: string;
    readonly lead: string;
    readonly items: readonly string[];
  };
  /** One or more paragraphs. */
  readonly outcome: readonly string[];
  /** Short closing line, e.g. "Clarity before commitment." */
  readonly closing: string;
  /** Call-to-action label, e.g. "Discuss your market opportunity". */
  readonly cta: string;
  /** Optional further reading. */
  readonly related?: NavLink;
}

export interface Step {
  readonly title: string;
  readonly body: string;
}
