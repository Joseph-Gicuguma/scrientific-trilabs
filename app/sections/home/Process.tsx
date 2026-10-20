import { Container, Grid, Section } from "~/components/layout";
import {
  ButtonLink,
  Eyebrow,
  Heading,
  Photo,
  SectionNumber,
} from "~/components/ui";
import { photos } from "~/content/photos";
import { processStages } from "~/content/process";

export function Process() {
  const { intro, steps, cta } = processStages;
  const photo = photos.paperwork;
  return (
    <Section tone="ink" labelledBy="process-heading">
      <Grid gap="none">
        <div className="relative col-span-4 min-h-80 md:col-span-12 md:min-h-[26rem] lg:col-span-5">
          <Photo
            picture={photo.picture}
            alt=""
            sizes="(min-width: 64rem) 42vw, 100vw"
            className="absolute inset-0"
          />
        </div>

        <Container className="col-span-4 py-section md:col-span-12 lg:col-span-7 lg:mx-0">
          <SectionNumber value={3} size="h2" />
          {intro.eyebrow && <Eyebrow className="mt-8">{intro.eyebrow}</Eyebrow>}
          <Heading level={2} id="process-heading" className="mt-4 max-w-[14ch]">
            {intro.heading}
          </Heading>
          {intro.body && (
            <p className="mt-6 max-w-[40ch] text-lead">{intro.body}</p>
          )}

          <ol className="mt-12 border-t-2 border-(--block-fg)/20">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[4rem_1fr] items-baseline gap-x-4 border-b-2 border-(--block-fg)/20 py-5 xl:grid-cols-[5rem_14rem_1fr]"
              >
                <SectionNumber
                  value={i + 1}
                  size="h3"
                  className="text-orange"
                />
                <h3 className="font-display text-lead font-bold">
                  {step.title}
                </h3>
                <p className="col-start-2 mt-1 xl:col-start-3 xl:mt-0">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <ButtonLink to={cta.to} variant="secondary" arrow className="mt-12">
            {cta.label}
          </ButtonLink>
        </Container>
      </Grid>
    </Section>
  );
}
