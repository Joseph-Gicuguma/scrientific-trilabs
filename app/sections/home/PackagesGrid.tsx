import { Link } from "react-router";
import { Container, Section } from "~/components/layout";
import { Heading, Photo, SectionNumber } from "~/components/ui";
import { home } from "~/content/home";
import { packages } from "~/content/packages";
import { photos } from "~/content/photos";
import { SectionHeader } from "../shared";
import { packageIcons } from "../shared/packageIcons";

/** Card with its top-right corner clipped, echoing a cut sample label. */
const cardClip =
  "[clip-path:polygon(0_0,calc(100%-2.5rem)_0,100%_2.5rem,100%_100%,0_100%)]";

export function PackagesGrid() {
  const { packages: copy } = home;
  const photo = photos.sampleTubes;
  return (
    <Section labelledBy="packages-heading" className="pb-section">
      <SectionHeader id="packages-heading" number={2} intro={copy.intro} />
      <Container>
        <ul className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const Icon = packageIcons[pkg.slug];
            return (
              <li
                key={pkg.slug}
                data-tone={pkg.tone}
                className={`relative flex min-h-80 flex-col justify-between gap-10 p-gutter py-10 ${cardClip}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <SectionNumber value={i + 1} size="h3" />
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mr-8 size-10"
                    />
                  )}
                </div>
                <div>
                  <Heading level={3}>
                    <Link
                      to={`/services#${pkg.slug}`}
                      className="after:absolute after:inset-0 hover:underline"
                    >
                      {pkg.name}
                    </Link>
                  </Heading>
                  <p className="mt-4 max-w-[34ch]">{pkg.tagline}</p>
                </div>
              </li>
            );
          })}

          <li className="relative isolate flex min-h-80 flex-col justify-end">
            <Photo
              picture={photo.picture}
              alt=""
              sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw"
              className="absolute inset-0 -z-10"
            />
            <div data-tone="ink" className="p-gutter py-8">
              <Link
                to={copy.all.to}
                className="flex items-center justify-between gap-4 font-display text-h3 font-bold tracking-tight after:absolute after:inset-0 hover:underline"
              >
                {copy.all.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
