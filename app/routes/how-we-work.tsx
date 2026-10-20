import { Container, Section } from "~/components/layout";
import { Heading, Photo, SectionNumber } from "~/components/ui";
import { howWeWork } from "~/content/how-we-work";
import { photos } from "~/content/photos";
import { pageMeta } from "~/lib/seo";
import { CtaBlock, PageHeader } from "~/sections/shared";

export function meta() {
  return pageMeta({ ...howWeWork.seo, path: "/how-we-work" });
}

export default function HowWeWork() {
  const { intro, stepsHeading, steps, closing, cta } = howWeWork;
  const photo = photos.labResearcher;
  return (
    <>
      <PageHeader
        eyebrow={intro.eyebrow}
        heading={intro.heading}
        lead={intro.body}
      />

      <Photo
        picture={photo.picture}
        alt=""
        sizes="100vw"
        className="aspect-[16/9] md:aspect-[21/8]"
        imgClassName="object-[center_30%]"
      />

      <Section tone="ink" labelledBy="steps-heading" className="py-section">
        <Container>
          <h2 id="steps-heading" className="sr-only">
            {stepsHeading}
          </h2>
          <ol className="border-t-2 border-(--block-fg)/20">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-x-gutter gap-y-3 border-b-2 border-(--block-fg)/20 py-10 md:grid-cols-12"
              >
                <SectionNumber
                  value={i + 1}
                  size="h2"
                  className="text-orange md:col-span-2"
                />
                <Heading level={3} className="md:col-span-4">
                  {step.title}
                </Heading>
                <p className="max-w-prose text-lead md:col-span-6">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <div data-tone="sage">
        <Container className="py-16 md:py-24">
          <p className="max-w-[22ch] font-display text-h2 font-bold tracking-display">
            {closing}
          </p>
        </Container>
      </div>

      <CtaBlock
        id="how-cta-heading"
        heading={cta.heading}
        body={cta.body}
        action={cta.action}
        photo={photos.officeCall}
      />
    </>
  );
}
