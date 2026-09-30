import { Container } from "~/components/layout";
import { DotDivider } from "~/components/well-plate";
import { home } from "~/content/home";
import { pageMeta } from "~/lib/seo";
import {
  FounderStrip,
  Hero,
  Markets,
  Mission,
  PackagesGrid,
  Process,
} from "~/sections/home";
import { CtaBlock } from "~/sections/shared";

export function meta() {
  return pageMeta({ description: home.seo.description, path: "/" });
}

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <PackagesGrid />
      <Process />
      <FounderStrip />
      <Markets />
      <Container>
        <DotDivider
          className="py-12"
          filled={[
            [1, "orange"],
            [2, "green"],
            [3, "ink"],
          ]}
        />
      </Container>
      <CtaBlock
        id="final-cta-heading"
        heading={home.finalCta.heading}
        body={home.finalCta.body}
        action={home.finalCta.cta}
      />
    </>
  );
}
