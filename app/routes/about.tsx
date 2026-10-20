import { Block, Container, Grid, Section } from "~/components/layout";
import { ButtonLink, Eyebrow, Heading, Photo, Portrait } from "~/components/ui";
import { about } from "~/content/about";
import { founder } from "~/content/founder";
import { photos } from "~/content/photos";
import { site } from "~/content/site";
import { absoluteUrl, jsonLd, pageMeta } from "~/lib/seo";

export function meta() {
  return [
    ...pageMeta({ ...about.seo, path: "/about" }),
    jsonLd({
      "@context": "https://schema.org",
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      worksFor: { "@id": absoluteUrl("/#organization"), name: site.legalName },
      sameAs: [founder.linkedin],
    }),
  ];
}

export default function About() {
  const photo = photos.nairobiSkyline;
  return (
    <>
      <Section labelledBy="about-heading">
        <Container className="pt-12 pb-16 md:pt-20 md:pb-24">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <Heading
            level={1}
            id="about-heading"
            className="mt-6 max-w-[14ch] text-h2 md:text-h1"
          >
            {about.heading}
          </Heading>
          <p className="mt-10 max-w-prose text-lead">{about.lead}</p>
        </Container>
        <Photo
          picture={photo.picture}
          alt={photo.alt}
          priority
          sizes="100vw"
          className="aspect-[16/9] md:aspect-[21/8]"
        />
      </Section>

      <Section labelledBy="consultant-heading">
        <Grid gap="none">
          <Block tone="sage" pad="large" className="col-span-4 md:col-span-5">
            <Portrait
              picture={founder.portrait}
              alt={founder.portraitAlt}
              sizes="(min-width: 48rem) 36vw, 100vw"
            />
            <p className="mt-6 font-display text-h3 font-bold tracking-tight">
              {founder.name}
            </p>
            <p>
              {founder.role}, {site.name}
            </p>
            <a
              href={founder.linkedin}
              rel="me noopener"
              target="_blank"
              className="mt-4 inline-block font-display font-semibold underline underline-offset-4 hover:no-underline"
            >
              {about.linkedinLabel}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Block>
          <Block tone="paper" pad="large" className="col-span-4 md:col-span-7">
            <Heading level={2} id="consultant-heading" className="max-w-[14ch]">
              {about.consultantHeading}
            </Heading>
            <div className="mt-10 flex max-w-prose flex-col gap-5">
              {about.story.map((paragraph, i) => (
                <p key={paragraph} className={i === 0 ? "text-lead" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-12 font-display text-small font-semibold tracking-label uppercase">
              {about.companiesLabel}
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
          </Block>
        </Grid>
      </Section>

      <div data-tone="ink">
        <Container className="flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <p className="max-w-[18ch] font-display text-h2 font-bold tracking-display">
            {about.closing}
          </p>
          <ButtonLink to={about.cta.to} arrow className="shrink-0">
            {about.cta.label}
          </ButtonLink>
        </Container>
      </div>
    </>
  );
}
