import { Block, Grid, Section } from "~/components/layout";
import { Eyebrow, Heading, Photo, SectionNumber } from "~/components/ui";
import {
  eastAfricaFills,
  eastAfricaLabels,
  PLATE_MARKET_TONES,
  WellPlate,
} from "~/components/well-plate";
import { markets } from "~/content/markets";
import { photos } from "~/content/photos";
import { MarketLegend } from "../shared";

const fills = eastAfricaFills();
const annotations = eastAfricaLabels();
const legend = markets.items.map((m) => ({
  tone: PLATE_MARKET_TONES[m.code],
  label: m.name,
}));

export function Markets() {
  const { intro } = markets;
  const photo = photos.nairobiSkyline;
  return (
    <Section labelledBy="markets-heading">
      <Grid gap="none">
        <div className="relative isolate col-span-4 flex min-h-[34rem] flex-col justify-end md:col-span-7">
          <Photo
            picture={photo.picture}
            alt={photo.alt}
            sizes="(min-width: 48rem) 58vw, 100vw"
            className="absolute inset-0 -z-10"
          />
          <div data-tone="ink" className="p-gutter py-8 md:mr-[38%]">
            <SectionNumber value={5} size="h3" className="text-orange" />
            {intro.eyebrow && (
              <Eyebrow className="mt-6">{intro.eyebrow}</Eyebrow>
            )}
            <Heading
              level={2}
              id="markets-heading"
              size="h3"
              className="mt-3 text-[clamp(2rem,1.4rem+2vw,3.25rem)] leading-none"
            >
              {intro.heading}
            </Heading>
            {intro.body && (
              <p className="mt-4 max-w-[42ch] text-small">{intro.body}</p>
            )}
          </div>
        </div>

        <Block tone="paper" className="col-span-4 md:col-span-5">
          <figure>
            <WellPlate
              fills={fills}
              animate
              labels
              annotations={annotations}
              label="A 96-well plate with wells filled in to outline Ethiopia, Kenya, Uganda, Rwanda and Tanzania"
              size="100%"
            />
            <figcaption className="mt-8">
              <MarketLegend items={legend} />
            </figcaption>
          </figure>
        </Block>
      </Grid>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {markets.items.map((market) => (
          <li
            key={market.code}
            data-tone={market.tone}
            className="flex min-h-56 flex-col justify-between gap-8 p-gutter py-8"
          >
            <Heading level={3}>{market.name}</Heading>
            <dl>
              <dt className="font-display text-small font-semibold tracking-label uppercase">
                {markets.regulatorLabel}
              </dt>
              <dd className="mt-1">
                <abbr
                  title={market.regulator}
                  aria-hidden="true"
                  className="no-underline"
                >
                  {market.regulatorShort}
                </abbr>
                <span className="block text-small">{market.regulator}</span>
              </dd>
            </dl>
          </li>
        ))}
      </ul>
    </Section>
  );
}
