import { Block, Container, Grid, Section } from "~/components/layout";
import { Heading, SectionNumber } from "~/components/ui";
import { howWeWork } from "~/content/how-we-work";
import { pageMeta } from "~/lib/seo";
import type { Tone } from "~/lib/tones";
import { CtaBlock, PageHeader, SectionHeader } from "~/sections/shared";

export function meta() {
  return pageMeta({ ...howWeWork.seo, path: "/how-we-work" });
}

/** Two rows of three. Green and sage never touch. */
const stepTones: readonly Tone[] = [
  "paper",
  "green",
  "cream",
  "orange",
  "ink",
  "sage",
];

export default function HowWeWork() {
  const { intro, stepsHeading, steps, regulatory, cta } = howWeWork;
  return (
    <>
      <PageHeader
        eyebrow={intro.eyebrow}
        heading={intro.heading}
        lead={intro.body}
      />

      <Section labelledBy="steps-heading">
        <h2 id="steps-heading" className="sr-only">
          {stepsHeading}
        </h2>
        <Grid gap="none" as="ol">
          {steps.map((step, i) => (
            <Block
              key={step.title}
              as="li"
              tone={stepTones[i] ?? "paper"}
              className="col-span-4 flex min-h-80 flex-col justify-between gap-10 md:col-span-6 lg:col-span-4"
            >
              <SectionNumber value={i + 1} size="h2" />
              <div>
                <Heading level={3}>{step.title}</Heading>
                <p className="mt-4 max-w-[38ch]">{step.body}</p>
              </div>
            </Block>
          ))}
        </Grid>
      </Section>

      <Section tone="ink" labelledBy="regulatory-heading">
        <SectionHeader id="regulatory-heading" intro={regulatory.intro} />
        <Container className="pb-section">
          <dl className="grid border-t-2 border-(--block-fg) md:grid-cols-2">
            {regulatory.items.map((item) => (
              <div
                key={item.title}
                className="border-b-2 border-(--block-fg) py-8 md:odd:pr-10 md:even:border-l-2 md:even:pl-10"
              >
                <dt className="font-display text-h3 font-bold tracking-tight">
                  {item.title}
                </dt>
                <dd className="mt-3 max-w-prose">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBlock
        id="how-cta-heading"
        heading={cta.heading}
        body={cta.body}
        action={cta.action}
      />
    </>
  );
}
