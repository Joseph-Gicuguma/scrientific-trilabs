import { Block, Container, Grid, Section } from "~/components/layout";
import { ButtonLink, Eyebrow, Heading, SectionNumber } from "~/components/ui";
import {
  DotDivider,
  eastAfricaFills,
  LogoMark,
  WellPlate,
} from "~/components/well-plate";
import { TONES } from "~/lib/tones";

// Development-only reference for the design system. Not built in production.
export function meta() {
  return [{ title: "Styleguide" }, { name: "robots", content: "noindex" }];
}

export default function Styleguide() {
  return (
    <>
      <Container className="py-16">
        <Eyebrow>Design system</Eyebrow>
        <Heading level={1} className="mt-4">
          Styleguide
        </Heading>
      </Container>

      <Section labelledBy="sg-tones">
        <Container>
          <Heading level={2} size="h3" id="sg-tones" className="mb-6">
            Tones
          </Heading>
        </Container>
        <Grid gap="none" as="ul">
          {TONES.map((tone) => (
            <Block
              key={tone}
              as="li"
              tone={tone}
              className="col-span-2 md:col-span-3 lg:col-span-2"
            >
              <p className="font-display text-h3 font-bold">{tone}</p>
              <p>Body text on {tone}.</p>
              <ButtonLink to="/styleguide" className="mt-6">
                Primary
              </ButtonLink>
            </Block>
          ))}
        </Grid>
      </Section>

      <Container>
        <DotDivider />
      </Container>

      <Section labelledBy="sg-type">
        <Container className="flex flex-col gap-8">
          <Heading level={2} size="h3" id="sg-type">
            Type
          </Heading>
          <p className="font-display text-h1 font-bold tracking-display">
            Sooner.
          </p>
          <p className="font-display text-h2 font-bold tracking-display">
            Registration in Kenya
          </p>
          <p className="font-display text-h3 font-bold">
            Market Entry Assessment
          </p>
          <p className="max-w-prose text-lead">
            Lead: Tri-Lab Scientific takes international IVD and life-science
            companies from market assessment to registration, partners and sales
            in East Africa.
          </p>
          <p className="max-w-prose">
            Body: Bitter at 18px with a 1.5 line height. Short sentences.
            Specific claims. Nothing invented.
          </p>
          <div className="flex gap-10">
            <SectionNumber value={1} />
            <SectionNumber value={5} />
          </div>
        </Container>
      </Section>

      <Grid gap="none" className="mt-16">
        <Block tone="paper" pad="large" className="col-span-4 md:col-span-6">
          <Heading level={2} size="h3" id="sg-plate">
            WellPlate
          </Heading>
          <WellPlate
            fills={eastAfricaFills()}
            animate
            labels
            label="A 96-well plate with wells filled to outline Ethiopia, Kenya, Uganda, Rwanda and Tanzania"
            size="100%"
            className="mt-8"
          />
        </Block>
        <Block tone="paper" pad="large" className="col-span-2 md:col-span-3">
          <LogoMark size={120} />
        </Block>
        <Block tone="ink" pad="large" className="col-span-2 md:col-span-3">
          <LogoMark size={120} inverse />
          <ButtonLink
            to="/styleguide"
            variant="secondary"
            arrow
            className="mt-10"
          >
            Secondary
          </ButtonLink>
        </Block>
      </Grid>
    </>
  );
}
