import { Block, Grid, Section } from "~/components/layout";
import { Eyebrow, Heading } from "~/components/ui";
import { home } from "~/content/home";
import type { Tone } from "~/lib/tones";
import { SectionHeader } from "../shared";

const tones: readonly Tone[] = ["cream", "green"];

export function Mission() {
  const { mission } = home;
  return (
    <Section labelledBy="mission-heading">
      <SectionHeader id="mission-heading" number={1} intro={mission.intro} />
      <Grid gap="none">
        {mission.sides.map((side, i) => (
          <Block
            key={side.label}
            tone={tones[i] ?? "paper"}
            pad="large"
            className="col-span-4 md:col-span-6"
          >
            <Eyebrow>{side.label}</Eyebrow>
            <Heading
              level={3}
              className="mt-6 max-w-[16ch] text-h2 tracking-display"
            >
              {side.heading}
            </Heading>
            <p className="mt-8 max-w-prose text-lead">{side.body}</p>
          </Block>
        ))}
      </Grid>
    </Section>
  );
}
