import { Block, Container, Grid, Section } from "~/components/layout";
import { ButtonLink, Eyebrow, Heading, Portrait } from "~/components/ui";
import { about } from "~/content/about";
import { founder } from "~/content/founder";
import { site } from "~/content/site";
import { absoluteUrl, jsonLd, pageMeta } from "~/lib/seo";
import type { Tone } from "~/lib/tones";

export function meta() {
  return [
    ...pageMeta({ ...about.seo, path: "/about" }),
    jsonLd({
      "@context": "https://schema.org",
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      worksFor: { "@id": absoluteUrl("/#organization"), name: site.legalName },
      alumniOf: founder.education.map((e) => ({
        "@type": "CollegeOrUniversity",
        name: e.institution,
      })),
    }),
  ];
}

const valueTones: readonly Tone[] = ["green", "cream", "orange"];

export default function About() {
  return (
    <>
      <Section labelledBy="about-heading">
        <Grid gap="none">
          <Block
            tone="paper"
            pad="large"
            className="order-2 col-span-4 md:order-1 md:col-span-5"
          >
            <Portrait
              picture={founder.portrait}
              alt={founder.portraitAlt}
              priority
            />
            <p className="mt-6 font-display text-h3 font-bold tracking-tight">
              {founder.name}
            </p>
            <p>
              {founder.role}, {site.legalName}
            </p>
          </Block>
          <Block
            pad="large"
            className="order-1 col-span-4 md:order-2 md:col-span-7"
          >
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <Heading
              level={1}
              id="about-heading"
              className="mt-6 max-w-[14ch] text-h2 md:text-h1"
            >
              {about.heading}
            </Heading>
            <p className="mt-10 max-w-prose text-lead">{about.lead}</p>
            <div className="mt-8 flex max-w-prose flex-col gap-5">
              {about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Block>
        </Grid>
      </Section>

      <Section tone="ink" labelledBy="career-heading" className="py-section">
        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-7">
              <Heading level={2} id="career-heading">
                {about.careerHeading}
              </Heading>
              <ol className="mt-10 border-t-2 border-(--block-fg)">
                {founder.roles.map((role) => (
                  <li
                    key={role.organisation}
                    className="grid gap-2 border-b-2 border-(--block-fg) py-6 sm:grid-cols-[10rem_1fr]"
                  >
                    <p className="font-dot text-h3 font-bold">{role.period}</p>
                    <div>
                      <Heading level={3}>{role.organisation}</Heading>
                      <p className="mt-1 font-display font-semibold">
                        {role.title}
                      </p>
                      <p className="mt-2">{role.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <Heading level={2} id="education-heading">
                {about.educationHeading}
              </Heading>
              <ul className="mt-10 border-t-2 border-(--block-fg)">
                {founder.education.map((q) => (
                  <li
                    key={q.award}
                    className="border-b-2 border-(--block-fg) py-6"
                  >
                    <Heading level={3}>{q.award}</Heading>
                    <p className="mt-2">{q.institution}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section labelledBy="values-heading">
        <Container className="py-16 md:py-24">
          <Heading level={2} id="values-heading">
            {about.valuesHeading}
          </Heading>
        </Container>
        <Grid gap="none" as="ul">
          {about.values.map((value, i) => (
            <Block
              key={value.title}
              as="li"
              tone={valueTones[i] ?? "paper"}
              pad="large"
              className="col-span-4"
            >
              <Heading level={3}>{value.title}</Heading>
              <p className="mt-4 max-w-[30ch] text-lead">{value.body}</p>
            </Block>
          ))}
        </Grid>
      </Section>

      <Container className="py-16">
        <ButtonLink to={about.cta.to} arrow>
          {about.cta.label}
        </ButtonLink>
      </Container>
    </>
  );
}
