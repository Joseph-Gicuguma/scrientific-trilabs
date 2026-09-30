import { Container, Section } from "~/components/layout";
import { ButtonLink, Eyebrow, Heading, SectionNumber } from "~/components/ui";
import { processStages } from "~/content/process";

export function Process() {
  const { intro, steps, cta } = processStages;
  return (
    <Section tone="ink" labelledBy="process-heading" className="py-section">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionNumber value={3} size="h2" />
            {intro.eyebrow && (
              <Eyebrow className="mt-8">{intro.eyebrow}</Eyebrow>
            )}
            <Heading
              level={2}
              id="process-heading"
              className="mt-4 max-w-[16ch]"
            >
              {intro.heading}
            </Heading>
          </div>
          {intro.body && <p className="max-w-[34ch] text-lead">{intro.body}</p>}
        </div>

        <ol className="mt-16 grid grid-cols-1 border-t-2 border-(--block-fg) sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="border-b-2 border-(--block-fg) py-8 sm:pr-6 lg:border-r-2 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <SectionNumber value={i + 1} size="h2" className="text-orange" />
              <Heading level={3} className="mt-6">
                {step.title}
              </Heading>
              <p className="mt-3">{step.body}</p>
            </li>
          ))}
        </ol>

        <ButtonLink to={cta.to} variant="secondary" arrow className="mt-14">
          {cta.label}
        </ButtonLink>
      </Container>
    </Section>
  );
}
