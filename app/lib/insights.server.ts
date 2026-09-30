import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { InsightSummary } from "./insights";

export const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(200),
  date: z.iso.date(),
  author: z.string().min(1),
  /** Placeholder content, still to be reviewed. */
  placeholder: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

/*
 * Build-time only (loaders run during prerender). Validates frontmatter and
 * reads each file from disk to estimate reading time.
 */

const frontmatters = import.meta.glob<unknown>("../content/insights/*.mdx", {
  eager: true,
  import: "frontmatter",
});

const INSIGHTS_DIR = path.resolve(process.cwd(), "app/content/insights");

function readingMinutes(slug: string): number {
  const source = readFileSync(path.join(INSIGHTS_DIR, `${slug}.mdx`), "utf8");
  const body = source.replace(/^---[\s\S]*?---/, "").replace(/<[^>]+>/g, " ");
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

let cache: InsightSummary[] | undefined;

/** All articles, newest first. Invalid frontmatter fails the build. */
export function listInsights(): InsightSummary[] {
  cache ??= Object.entries(frontmatters)
    .map(([file, frontmatter]) => {
      const slug = path.basename(file, ".mdx");
      const parsed = frontmatterSchema.safeParse(frontmatter);
      if (!parsed.success) {
        throw new Error(
          `Invalid frontmatter in ${slug}.mdx: ${parsed.error.message}`,
        );
      }
      return { ...parsed.data, slug, readingMinutes: readingMinutes(slug) };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}
