import { Block, Grid, Section } from "~/components/layout";
import { ButtonLink, Heading } from "~/components/ui";
import { WellPlate } from "~/components/well-plate";
import { notFound } from "~/content/not-found";
import { pageMeta } from "~/lib/seo";

export function meta() {
  return pageMeta({ ...notFound.seo, path: "/404", noindex: true });
}

export default function NotFound() {
  return (
    <Section labelledBy="not-found-heading">
      <Grid gap="none">
        <Block pad="large" className="col-span-4 md:col-span-7">
          <p className="font-dot text-numeral font-bold" aria-hidden="true">
            {notFound.code}
          </p>
          <Heading
            level={1}
            id="not-found-heading"
            className="mt-8 max-w-[12ch] text-h2 md:text-h1"
          >
            {notFound.heading}
          </Heading>
          <p className="mt-8 max-w-prose text-lead">{notFound.body}</p>
          <h2 className="mt-12 font-display text-small font-semibold tracking-label uppercase">
            {notFound.linksHeading}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-4">
            {notFound.links.map((link, i) => (
              <li key={link.to}>
                <ButtonLink
                  to={link.to}
                  variant={i === 0 ? "primary" : "secondary"}
                >
                  {link.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Block>
        <Block tone="paper" pad="large" className="col-span-4 md:col-span-5">
          {/* Every well empty but one: the page you looked for. */}
          <WellPlate fills={{ D7: "orange" }} labels size="100%" />
        </Block>
      </Grid>
    </Section>
  );
}
