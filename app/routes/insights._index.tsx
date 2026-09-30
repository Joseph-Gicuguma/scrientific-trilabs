import { Link } from "react-router";
import { Container, Section } from "~/components/layout";
import { Heading } from "~/components/ui";
import { insightsPage } from "~/content/insights";
import { formatDate } from "~/lib/insights";
import { listInsights } from "~/lib/insights.server";
import { pageMeta } from "~/lib/seo";
import { CtaBlock, PageHeader } from "~/sections/shared";
import type { Route } from "./+types/insights._index";

export function loader() {
  return { insights: listInsights() };
}

export function meta() {
  return pageMeta({ ...insightsPage.seo, path: "/insights" });
}

export default function Insights({ loaderData }: Route.ComponentProps) {
  const { insights } = loaderData;
  const { intro, empty, minuteRead, cta } = insightsPage;
  return (
    <>
      <PageHeader
        eyebrow={intro.eyebrow}
        heading={intro.heading}
        lead={intro.body}
      />

      <Section labelledBy="articles-heading" tone="paper" className="py-16">
        <Container>
          <h2 id="articles-heading" className="sr-only">
            {intro.eyebrow}
          </h2>
          {insights.length === 0 ? (
            <p>{empty}</p>
          ) : (
            <ol className="border-t-2 border-ink">
              {insights.map((article) => (
                <li
                  key={article.slug}
                  className="relative border-b-2 border-ink py-10"
                >
                  <article className="grid gap-4 md:grid-cols-12">
                    <p className="text-small md:col-span-3">
                      <time dateTime={article.date}>
                        {formatDate(article.date)}
                      </time>
                      <span className="block">
                        {minuteRead(article.readingMinutes)}
                      </span>
                    </p>
                    <div className="md:col-span-9">
                      <Heading level={3} className="text-h3">
                        <Link
                          to={`/insights/${article.slug}`}
                          className="after:absolute after:inset-0 hover:underline"
                        >
                          {article.title}
                        </Link>
                      </Heading>
                      <p className="mt-3 max-w-prose">{article.description}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </Section>

      <CtaBlock
        id="insights-cta-heading"
        heading={cta.heading}
        body={cta.body}
        action={cta.action}
      />
    </>
  );
}
