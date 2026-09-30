import { Section } from "~/components/layout";
import { Heading } from "~/components/ui";
import { DEFAULT_MARKET_TONES } from "~/components/well-plate";
import { markets } from "~/content/markets";
import { SectionHeader } from "../shared";

export function Markets() {
  return (
    <Section labelledBy="markets-heading">
      <SectionHeader id="markets-heading" number={5} intro={markets.intro} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {markets.items.map((market) => (
          <li
            key={market.code}
            data-tone={DEFAULT_MARKET_TONES[market.code]}
            className="flex min-h-72 flex-col justify-between gap-10 p-gutter py-10"
          >
            <Heading level={3} className="text-h2 tracking-display">
              {market.name}
            </Heading>
            <dl>
              <dt className="font-display text-small font-semibold tracking-label uppercase">
                {markets.regulatorLabel}
              </dt>
              <dd className="mt-1">
                <abbr title={market.regulator} className="no-underline">
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
