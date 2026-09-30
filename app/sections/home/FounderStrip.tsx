import { Block, Grid, Section } from "~/components/layout";
import { ButtonLink, Eyebrow, Heading } from "~/components/ui";
import { founder } from "~/content/founder";
import { home } from "~/content/home";

export function FounderStrip() {
  const { founderStrip: copy } = home;
  return (
    <Section labelledBy="founder-heading">
      <Grid gap="none">
        <Block
          tone="sage"
          pad="large"
          className="col-span-4 flex flex-col justify-between gap-8 md:col-span-4"
        >
          <p
            className="font-dot text-numeral font-bold tabular-nums"
            aria-hidden="true"
          >
            {String(founder.yearsInIndustry).padStart(2, "0")}
          </p>
          <p className="max-w-[20ch] font-display text-h3 font-bold tracking-tight">
            <span className="sr-only">{founder.yearsInIndustry} </span>
            {copy.yearsLabel}
          </p>
        </Block>

        <Block tone="paper" pad="large" className="col-span-4 md:col-span-8">
          <Eyebrow>
            <span aria-hidden="true">04 </span>
            {copy.intro.eyebrow}
          </Eyebrow>
          <Heading level={2} id="founder-heading" className="mt-4 max-w-[16ch]">
            {copy.intro.heading}
          </Heading>
          <p className="mt-8 max-w-prose text-lead">{copy.body}</p>

          <ul className="mt-10 grid gap-x-8 border-t-2 border-ink sm:grid-cols-3">
            {founder.roles.map((role) => (
              <li
                key={role.organisation}
                className="border-b-2 border-ink py-5"
              >
                <p className="font-display text-h3 font-bold tracking-tight">
                  {role.organisation}
                </p>
                <p className="mt-1 text-small">{role.period}</p>
              </li>
            ))}
          </ul>

          <ButtonLink
            to={copy.cta.to}
            variant="secondary"
            arrow
            className="mt-10"
          >
            {copy.cta.label}
          </ButtonLink>
        </Block>
      </Grid>
    </Section>
  );
}
