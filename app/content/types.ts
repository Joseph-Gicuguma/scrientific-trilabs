import type { Tone } from "~/lib/tones";

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
  /** One line for cards. */
  readonly summary: string;
  readonly timeline: string;
  /** Two or three words for cards. */
  readonly timelineShort: string;
  readonly includes: readonly string[];
  readonly forWho: string;
  readonly outcome: string;
}

export interface Step {
  readonly title: string;
  readonly body: string;
}
