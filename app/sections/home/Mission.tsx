import { Container, Section } from "~/components/layout";
import { Eyebrow, Heading, Photo } from "~/components/ui";
import { home } from "~/content/home";
import { photos } from "~/content/photos";
import type { Tone } from "~/lib/tones";
import { SectionHeader } from "../shared";

const tones: readonly Tone[] = ["cream", "green"];

export function Mission() {
  const { mission } = home;
  return (
    <Section labelledBy="mission-heading" className="pb-section">
      <SectionHeader id="mission-heading" number={1} intro={mission.intro} />
      <Container>
        <ul className="grid gap-gutter md:grid-cols-2">
          {mission.sides.map((side, i) => {
            const photo = photos[side.photo];
            return (
              <li
                key={side.label}
                data-tone={tones[i] ?? "paper"}
                className="flex flex-col [clip-path:polygon(0_0,calc(100%-3rem)_0,100%_3rem,100%_100%,0_100%)]"
              >
                <Photo
                  picture={photo.picture}
                  alt=""
                  sizes="(min-width: 48rem) 45vw, 100vw"
                  className="aspect-[3/2]"
                />
                <div className="p-gutter py-10">
                  <Eyebrow>{side.label}</Eyebrow>
                  <Heading level={3} className="mt-4 max-w-[18ch] text-h3">
                    {side.heading}
                  </Heading>
                  <p className="mt-4 max-w-[44ch]">{side.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
