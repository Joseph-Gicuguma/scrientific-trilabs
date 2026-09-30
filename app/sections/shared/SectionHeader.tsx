import { Container, Grid } from "~/components/layout";
import { Eyebrow, Heading, SectionNumber } from "~/components/ui";
import type { SectionIntro } from "~/content/types";
import { cn } from "~/lib/cn";

interface SectionHeaderProps {
  intro: SectionIntro;
  id: string;
  number?: number;
  className?: string;
}

/** Section number in Doto on the left, eyebrow, heading and intro on the right. */
export function SectionHeader({
  intro,
  id,
  number,
  className,
}: SectionHeaderProps) {
  return (
    <Container className={cn("py-16 md:py-24", className)}>
      <Grid>
        {number !== undefined && (
          <div className="col-span-4 md:col-span-2">
            <SectionNumber value={number} size="h2" />
          </div>
        )}
        <div
          className={cn(
            "col-span-4",
            number !== undefined ? "md:col-span-10" : "md:col-span-12",
          )}
        >
          {intro.eyebrow && <Eyebrow>{intro.eyebrow}</Eyebrow>}
          <Heading level={2} id={id} className="mt-4 max-w-[18ch]">
            {intro.heading}
          </Heading>
          {intro.body && (
            <p className="mt-6 max-w-prose text-lead">{intro.body}</p>
          )}
        </div>
      </Grid>
    </Container>
  );
}
