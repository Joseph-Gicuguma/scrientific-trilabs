import { Link } from "react-router";
import { Container } from "~/components/layout";
import { packages, servicesPage } from "~/content/packages";
import { pageMeta } from "~/lib/seo";
import { PackageSection } from "~/sections/services/PackageSection";
import { CtaBlock, PageHeader } from "~/sections/shared";
import { howWeWork } from "~/content/how-we-work";

export function meta() {
  return pageMeta({ ...servicesPage.seo, path: "/services" });
}

export default function Services() {
  const { intro, pricing, jumpNavLabel } = servicesPage;
  return (
    <>
      <PageHeader
        eyebrow={intro.eyebrow}
        heading={intro.heading}
        lead={intro.body}
      >
        <nav aria-label={jumpNavLabel} className="mt-12">
          <ol className="flex flex-wrap gap-3">
            {packages.map((pkg, i) => (
              <li key={pkg.slug}>
                <Link
                  to={`#${pkg.slug}`}
                  className="inline-flex min-h-12 items-center gap-2 border-2 border-ink px-4 font-display font-semibold hover:bg-ink hover:text-cream"
                >
                  <span className="font-dot" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {pkg.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </PageHeader>

      {packages.map((pkg, i) => (
        <PackageSection key={pkg.slug} pkg={pkg} number={i + 1} />
      ))}

      <Container className="py-16">
        <p className="max-w-prose text-lead">{pricing}</p>
      </Container>

      <CtaBlock
        id="services-cta-heading"
        heading={howWeWork.cta.heading}
        body={howWeWork.cta.body}
        action={howWeWork.cta.action}
      />
    </>
  );
}
