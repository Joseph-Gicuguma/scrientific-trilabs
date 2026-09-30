import { Link } from "react-router";
import { Block, Container, Grid, Section } from "~/components/layout";
import { ButtonLink, Heading, SectionNumber } from "~/components/ui";
import { home } from "~/content/home";
import { packages } from "~/content/packages";
import { SectionHeader } from "../shared";

/** Poster-style spans: a wide row of two, then a row of three. */
const spans = [
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

export function PackagesGrid() {
  const { packages: copy } = home;
  return (
    <Section labelledBy="packages-heading">
      <SectionHeader id="packages-heading" number={2} intro={copy.intro} />
      <Grid gap="none" as="ul">
        {packages.map((pkg, i) => (
          <Block
            key={pkg.slug}
            as="li"
            tone={pkg.tone}
            className={`relative col-span-4 flex min-h-80 flex-col justify-between gap-10 ${spans[i] ?? ""}`}
          >
            <SectionNumber value={i + 1} size="h3" />
            <div>
              <Heading level={3}>
                <Link
                  to={`/services#${pkg.slug}`}
                  className="after:absolute after:inset-0 hover:underline"
                >
                  {pkg.name}
                </Link>
              </Heading>
              <p className="mt-4 max-w-[40ch]">{pkg.summary}</p>
              <p className="mt-6 font-display text-small font-semibold tracking-label uppercase">
                {pkg.timelineShort}
              </p>
            </div>
          </Block>
        ))}
      </Grid>
      <Container className="py-10">
        <ButtonLink to={copy.all.to} variant="secondary" arrow>
          {copy.all.label}
        </ButtonLink>
      </Container>
    </Section>
  );
}
