import { listInsights } from "~/lib/insights.server";
import { STATIC_PATHS } from "~/lib/routes-list";
import { absoluteUrl } from "~/lib/seo";

export function loader() {
  const entries = [
    ...STATIC_PATHS.map((path) => ({
      loc: absoluteUrl(path),
      lastmod: undefined,
    })),
    ...listInsights().map((a) => ({
      loc: absoluteUrl(`/insights/${a.slug}`),
      lastmod: a.date,
    })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
