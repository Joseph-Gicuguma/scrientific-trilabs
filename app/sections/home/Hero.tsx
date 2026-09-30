import { Block, Container, Grid, Section } from "~/components/layout";
import { ButtonLink, Eyebrow, Heading } from "~/components/ui";
import { eastAfricaFills, WellPlate } from "~/components/well-plate";
import { home } from "~/content/home";
import { MarketLegend } from "../shared";

const fills = eastAfricaFills();

export function Hero() {
  const { hero } = home;
  return (
    <Section labelledBy="hero-heading">
      <Container className="pt-10 pb-12 md:pt-16 md:pb-20">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <Heading level={1} id="hero-heading" className="mt-6 max-w-[15ch]">
          {hero.heading}
        </Heading>
      </Container>

      <Grid gap="none">
        <Block
          tone="orange"
          pad="large"
          className="col-span-4 flex flex-col justify-between gap-12 md:col-span-5"
        >
          <p className="max-w-[32ch] text-lead">{hero.body}</p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink to={hero.primaryCta.to} arrow>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink to={hero.secondaryCta.to} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </Block>

        <Block tone="paper" pad="large" className="col-span-4 md:col-span-7">
          <figure>
            <WellPlate
              fills={fills}
              animate
              delay={250}
              labels
              label={hero.plateLabel}
              size="100%"
            />
            <figcaption className="mt-8">
              <MarketLegend />
            </figcaption>
          </figure>
        </Block>
      </Grid>
    </Section>
  );
}
