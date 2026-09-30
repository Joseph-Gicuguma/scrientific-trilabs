import { MDXProvider } from "@mdx-js/react";
import { Link } from "react-router";
import { Container } from "~/components/layout";
import { Eyebrow, Heading } from "~/components/ui";
import { insightsPage } from "~/content/insights";
import { site } from "~/content/site";
import { formatDate, renderInsightBody } from "~/lib/insights";
import { listInsights } from "~/lib/insights.server";
import { absoluteUrl, jsonLd, pageMeta } from "~/lib/seo";
import { mdxComponents } from "~/sections/insights/mdx-components";
import { CtaBlock } from "~/sections/shared";
import type { Route } from "./+types/insights.$slug";

export function loader({ params }: Route.LoaderArgs) {
  const article = listInsights().find((a) => a.slug === params.slug);
  if (!article) throw new Response("Not found", { status: 404 });
  return { article };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { article } = loaderData;
  const path = `/insights/${article.slug}`;
  return [
    ...pageMeta({
      title: article.title,
      description: article.description,
      path,
      type: "article",
      extra: [
        { property: "article:published_time", content: article.date },
        { property: "article:author", content: article.author },
      ],
    }),
    jsonLd({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      author: { "@type": "Person", name: article.author },
      publisher: { "@id": absoluteUrl("/#organization"), name: site.legalName },
      mainEntityOfPage: absoluteUrl(path),
    }),
  ];
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  const body = renderInsightBody(article.slug);
  const { back, byline, minuteRead, cta } = insightsPage;
  return (
    <>
      <article>
        <Container className="pt-12 pb-16 md:pt-20">
          <Link
            to="/insights"
            className="inline-flex min-h-12 items-center font-display font-semibold underline-offset-4 hover:underline"
          >
            <span aria-hidden="true">←&nbsp;</span>
            {back}
          </Link>
          <Eyebrow className="mt-10">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {" · "}
            {minuteRead(article.readingMinutes)}
          </Eyebrow>
          <Heading level={1} className="mt-6 max-w-[20ch] text-h2 md:text-h1">
            {article.title}
          </Heading>
          <p className="mt-8 max-w-prose text-lead">{article.description}</p>
          <p className="mt-6 font-display font-semibold">
            {byline} {article.author}
          </p>
        </Container>

        <div data-tone="paper" className="py-16">
          <Container>
            <div className="max-w-prose">
              <MDXProvider components={mdxComponents}>{body}</MDXProvider>
            </div>
          </Container>
        </div>
      </article>

      <CtaBlock
        id="article-cta-heading"
        heading={cta.heading}
        body={cta.body}
        action={cta.action}
      />
    </>
  );
}
