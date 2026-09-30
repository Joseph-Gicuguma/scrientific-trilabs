import { Block, Grid, Section } from "~/components/layout";
import { ButtonLink, Heading, SectionNumber } from "~/components/ui";
import { servicesPage } from "~/content/packages";
import type { Package } from "~/content/types";

interface PackageSectionProps {
  pkg: Package;
  number: number;
}

const labelClass =
  "font-display text-small font-semibold tracking-label uppercase";

export function PackageSection({ pkg, number }: PackageSectionProps) {
  const { labels } = servicesPage;
  const headingId = `${pkg.slug}-heading`;
  return (
    <Section id={pkg.slug} labelledBy={headingId} className="scroll-mt-4">
      <Grid gap="none">
        <Block
          tone={pkg.tone}
          pad="large"
          className="col-span-4 flex flex-col justify-between gap-12 md:col-span-5"
        >
          <SectionNumber value={number} />
          <div>
            <Heading
              level={2}
              id={headingId}
              size="h2"
              className="max-w-[12ch]"
            >
              {pkg.name}
            </Heading>
            <p className="mt-6 text-lead">{pkg.summary}</p>
            <dl className="mt-10 border-t-2 border-(--block-fg) pt-4">
              <dt className={labelClass}>{labels.timeline}</dt>
              <dd className="mt-1 font-display text-h3 font-bold tracking-tight">
                {pkg.timeline}
              </dd>
            </dl>
          </div>
        </Block>

        <Block
          tone={pkg.tone === "paper" ? "cream" : "paper"}
          pad="large"
          className="col-span-4 md:col-span-7"
        >
          <Heading
            level={3}
            className="font-display text-body font-semibold tracking-label uppercase"
          >
            {labels.includes}
          </Heading>
          <ul className="mt-4 border-t-2 border-ink">
            {pkg.includes.map((item) => (
              <li
                key={item}
                className="flex gap-4 border-b-2 border-ink py-4 text-lead"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  width="14"
                  height="14"
                  className="mt-2 shrink-0"
                >
                  <circle cx="5" cy="5" r="4.2" fill="currentColor" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <Heading
                level={3}
                className="font-display text-body font-semibold tracking-label uppercase"
              >
                {labels.forWho}
              </Heading>
              <p className="mt-3">{pkg.forWho}</p>
            </div>
            <div>
              <Heading
                level={3}
                className="font-display text-body font-semibold tracking-label uppercase"
              >
                {labels.outcome}
              </Heading>
              <p className="mt-3">{pkg.outcome}</p>
            </div>
          </div>

          <ButtonLink
            to={`/contact?package=${pkg.slug}`}
            arrow
            className="mt-12"
            aria-label={`${labels.cta}: ${pkg.name}`}
          >
            {labels.cta}
          </ButtonLink>
        </Block>
      </Grid>
    </Section>
  );
}
