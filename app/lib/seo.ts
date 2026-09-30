import type { MetaDescriptor } from "react-router";
import { site } from "~/content/site";

export const SITE_URL = __SITE_URL__;

/** Absolute URL for a site path. The root keeps its slash; other paths drop a trailing one. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  const clean = withSlash.length > 1 ? withSlash.replace(/\/$/, "") : withSlash;
  return `${SITE_URL}${clean}`;
}

export const DEFAULT_OG_IMAGE = {
  path: "/og/default.png",
  width: 1200,
  height: 630,
  alt: "Tri-Lab Scientific: a 96-well plate with wells filled to outline East Africa",
} as const;

export interface PageMetaInput {
  /** Page title without the site name. Omit on the home page. */
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: { path: string; width: number; height: number; alt: string };
  noindex?: boolean;
  /** Extra tags, e.g. article:published_time. */
  extra?: MetaDescriptor[];
}

/** Title, description, canonical link, Open Graph and Twitter tags for a route. */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  extra = [],
}: PageMetaInput): MetaDescriptor[] {
  const fullTitle = title
    ? `${title} | ${site.name}`
    : `${site.name}: ${site.tagline}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.path);
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: "en_GB" },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: String(image.width) },
    { property: "og:image:height", content: String(image.height) },
    { property: "og:image:alt", content: image.alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    ...extra,
  ];
}

/** A JSON-LD block for the `meta` export. */
export function jsonLd(data: Record<string, unknown>): MetaDescriptor {
  return { "script:ld+json": data };
}
