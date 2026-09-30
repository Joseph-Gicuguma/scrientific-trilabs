import { createElement, type ComponentType, type ReactElement } from "react";
import type { Frontmatter } from "./insights.server";

/*
 * Articles are MDX files in app/content/insights. The file name is the slug.
 * Summaries and frontmatter validation live in insights.server.ts (build only);
 * this module holds what the browser needs: types and compiled article bodies.
 */

export interface InsightSummary extends Frontmatter {
  slug: string;
  readingMinutes: number;
}

const bodies = import.meta.glob<ComponentType>("../content/insights/*.mdx", {
  eager: true,
  import: "default",
});

/** The rendered MDX body for an article, or null if there is none. */
export function renderInsightBody(slug: string): ReactElement | null {
  const Body = bodies[`../content/insights/${slug}.mdx`];
  return Body ? createElement(Body) : null;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
