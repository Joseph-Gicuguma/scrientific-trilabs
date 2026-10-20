import { Check } from "lucide-react";
import { Link } from "react-router";
import { Block, Grid, Section } from "~/components/layout";
import { ButtonLink, Heading, Photo, SectionNumber } from "~/components/ui";
import { servicesPage } from "~/content/packages";
import { photos } from "~/content/photos";
import type { Package } from "~/content/types";
import { packageIcons } from "../shared/packageIcons";

interface PackageSectionProps {
  pkg: Package;
  number: number;
}

const labelClass =
  "font-display text-body font-semibold tracking-label uppercase";

export function PackageSection({ pkg, number }: PackageSectionProps) {
  const { labels } = servicesPage;
  const headingId = `${pkg.slug}-heading`;
  const photo = photos[pkg.photo];
  const Icon = packageIcons[pkg.slug];
  return (
    <Section id={pkg.slug} labelledBy={headingId} className="scroll-mt-4">
      <Grid gap="none">
        {/* Stays in view on wide screens while the detail scrolls past. */}
        <div className="col-span-4 self-start md:sticky md:top-0 md:col-span-5">
          <Block
            tone={pkg.tone}
            className="flex flex-col gap-10 [clip-path:polygon(0_0,calc(100%-3rem)_0,100%_3rem,100%_100%,0_100%)]"
          >
            <div className="flex items-start justify-between gap-4">
              <SectionNumber value={number} size="h2" />
              {Icon && (
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mr-10 size-12"
                />
              )}
            </div>
            <div>
              <Heading
                level={2}
                id={headingId}
                className="max-w-[14ch] text-[clamp(2rem,1.3rem+2.4vw,3.5rem)] leading-none"
              >
                {pkg.name}
              </Heading>
              <p className="mt-6 font-display text-h3 font-bold tracking-tight">
                {pkg.tagline}
              </p>
            </div>
          </Block>
          <Photo
            picture={photo.picture}
            alt=""
            sizes="(min-width: 48rem) 42vw, 100vw"
            className="aspect-[16/10]"
          />
        </div>

        <Block
          tone={pkg.tone === "paper" ? "cream" : "paper"}
          pad="large"
          className="col-span-4 md:col-span-7"
        >
          <p className="max-w-prose text-lead">{pkg.summary}</p>
          <p className="mt-5 max-w-prose">{pkg.detail}</p>

          <h3 className={`mt-14 ${labelClass}`}>{pkg.includesLabel}</h3>
          <ul className="mt-4 grid gap-x-8 border-t-2 border-ink sm:grid-cols-2">
            {pkg.includes.map((item) => (
              <li
                key={item.label}
                className="flex gap-3 border-b-2 border-ink/15 py-4"
              >
                <Check
                  aria-hidden="true"
                  strokeWidth={2.5}
                  className="mt-1 size-5 shrink-0"
                />
                <div>
                  <p className="font-display font-bold">{item.label}</p>
                  <p className="mt-1 text-small">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className={labelClass}>{labels.forWho}</h3>
              {pkg.forWho.body && <p className="mt-3">{pkg.forWho.body}</p>}
              <p className="mt-3">{pkg.forWho.lead}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {pkg.forWho.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-2 shrink-0 rounded-full bg-current"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={labelClass}>{labels.outcome}</h3>
              {pkg.outcome.map((paragraph) => (
                <p key={paragraph} className="mt-3">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <p className="mt-14 max-w-[24ch] border-t-2 border-ink pt-8 font-display text-h3 font-bold tracking-tight">
            {pkg.closing}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink
              to={`/contact?package=${pkg.slug}`}
              arrow
              aria-label={`${pkg.cta}: ${pkg.name}`}
            >
              {pkg.cta}
            </ButtonLink>
            {pkg.related && (
              <Link
                to={pkg.related.to}
                className="font-display font-semibold underline underline-offset-4 hover:no-underline"
              >
                {pkg.related.label}
              </Link>
            )}
          </div>
        </Block>
      </Grid>
    </Section>
  );
}
