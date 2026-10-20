import { Block, Grid, Section } from "~/components/layout";
import { ButtonLink, Heading, Photo } from "~/components/ui";
import { WellPlate } from "~/components/well-plate";
import type { PhotoAsset } from "~/content/photos";
import type { NavLink } from "~/content/types";

interface CtaBlockProps {
  id: string;
  heading: string;
  body: string;
  action: NavLink;
  /** Shown beside the orange block. Without one, an ink block with a filling plate. */
  photo?: PhotoAsset;
}

/** Closing call to action: a big orange block beside a photo or a filling plate. */
export function CtaBlock({ id, heading, body, action, photo }: CtaBlockProps) {
  return (
    <Section labelledBy={id}>
      <Grid gap="none">
        <Block tone="orange" pad="large" className="col-span-4 md:col-span-7">
          <Heading level={2} id={id} className="max-w-[14ch]">
            {heading}
          </Heading>
          <p className="mt-8 max-w-prose text-lead">{body}</p>
          <ButtonLink to={action.to} arrow className="mt-10">
            {action.label}
          </ButtonLink>
        </Block>
        {photo ? (
          <div className="relative col-span-4 min-h-80 md:col-span-5">
            <Photo
              picture={photo.picture}
              alt=""
              sizes="(min-width: 48rem) 42vw, 100vw"
              className="absolute inset-0"
            />
          </div>
        ) : (
          <Block
            tone="ink"
            pad="large"
            className="col-span-4 hidden items-center md:col-span-5 md:flex"
          >
            <WellPlate
              rows={8}
              cols={6}
              fills={{ D3: "orange", D4: "green", E3: "cream" }}
              size="100%"
            />
          </Block>
        )}
      </Grid>
    </Section>
  );
}
