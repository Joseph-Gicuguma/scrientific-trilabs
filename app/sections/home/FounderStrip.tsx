import { Container, Grid, Section } from "~/components/layout";
import {
  ButtonLink,
  Eyebrow,
  Heading,
  Portrait,
  SectionNumber,
} from "~/components/ui";
import { founder } from "~/content/founder";
import { home } from "~/content/home";

export function FounderStrip() {
  const { founderStrip: copy } = home;
  return (
    <Section labelledBy="founder-heading" className="py-section">
      <Container>
        <Grid className="items-center">
          <div className="col-span-4 md:col-span-5">
            <div data-tone="sage" className="p-4 md:p-6">
              <Portrait
                picture={founder.portrait}
                alt={founder.portraitAlt}
                sizes="(min-width: 48rem) 38vw, 100vw"
              />
            </div>
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <SectionNumber value={4} size="h2" />
            <Eyebrow className="mt-8">{copy.intro.eyebrow}</Eyebrow>
            <Heading
              level={2}
              id="founder-heading"
              className="mt-4 max-w-[14ch]"
            >
              {copy.intro.heading}
            </Heading>
            <p className="mt-8 font-display text-h3 font-bold tracking-tight">
              {founder.name}
            </p>
            <p className="font-display font-semibold">
              {founder.role}, Tri-Lab Scientific
            </p>
            <p className="mt-6 max-w-prose text-lead">{copy.body}</p>

            <p className="mt-10 font-display text-small font-semibold tracking-label uppercase">
              {copy.companiesLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2 border-t-2 border-ink pt-4">
              {founder.companies.map((company) => (
                <li
                  key={company}
                  className="font-display text-h3 font-bold tracking-tight"
                >
                  {company}
                </li>
              ))}
            </ul>

            <ButtonLink
              to={copy.cta.to}
              variant="secondary"
              arrow
              className="mt-10"
            >
              {copy.cta.label}
            </ButtonLink>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
