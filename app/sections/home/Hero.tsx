import { Container } from "~/components/layout";
import { ButtonLink, Eyebrow, Heading, Photo } from "~/components/ui";
import { home } from "~/content/home";
import { photos } from "~/content/photos";

/*
 * Full-bleed photograph with an ink panel cut on a diagonal, edged in orange.
 * On small screens the photo sits above the panel instead of behind it.
 */
const panelClip = "md:[clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]";
const edgeClip = "md:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]";

export function Hero() {
  const { hero } = home;
  const photo = photos.labTeam;
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex flex-col md:min-h-[min(88vh,52rem)] md:flex-row"
    >
      <Photo
        picture={photo.picture}
        alt=""
        priority
        sizes="100vw"
        className="aspect-[4/3] md:absolute md:inset-0 md:-z-10 md:aspect-auto"
        imgClassName="object-[80%_center]"
      />

      <div
        aria-hidden="true"
        data-tone="orange"
        className={`absolute inset-y-0 left-0 -z-10 hidden w-[62%] md:block ${edgeClip}`}
      />
      <div
        data-tone="ink"
        className={`flex flex-col justify-center md:w-[60%] ${panelClip}`}
      >
        <Container className="py-14 md:mx-0 md:py-20 md:pr-[22%]">
          <Eyebrow className="text-orange">{hero.eyebrow}</Eyebrow>
          <Heading
            level={1}
            id="hero-heading"
            className="mt-6 text-[clamp(2.75rem,1.4rem+4.2vw,5.75rem)] leading-[0.95]"
          >
            {hero.heading}
          </Heading>
          <p className="mt-8 font-display text-h3 font-bold tracking-tight">
            {hero.tagline}
          </p>
          <p className="mt-4 max-w-[38ch] text-lead">{hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to={hero.primaryCta.to} arrow>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink to={hero.secondaryCta.to} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </section>
  );
}
