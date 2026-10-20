import { home } from "~/content/home";
import { photos } from "~/content/photos";
import { pageMeta } from "~/lib/seo";
import {
  FounderStrip,
  Hero,
  Markets,
  Mission,
  PackagesGrid,
  Process,
  Stats,
} from "~/sections/home";
import { CtaBlock } from "~/sections/shared";

export function meta() {
  return pageMeta({ description: home.seo.description, path: "/" });
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Mission />
      <PackagesGrid />
      <Process />
      <FounderStrip />
      <Markets />
      <CtaBlock
        id="final-cta-heading"
        heading={home.finalCta.heading}
        body={home.finalCta.body}
        action={home.finalCta.cta}
        photo={photos.officeCall}
      />
    </>
  );
}
