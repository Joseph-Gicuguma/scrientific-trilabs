import { useSearchParams } from "react-router";
import { Block, Grid, Section } from "~/components/layout";
import { Eyebrow, Heading, TodoMark } from "~/components/ui";
import { contact } from "~/content/contact";
import { packageBySlug } from "~/content/packages";
import { site } from "~/content/site";
import { isPending } from "~/content/types";
import { pageMeta } from "~/lib/seo";
import { CalendlyEmbed } from "~/sections/contact/CalendlyEmbed";
import { ContactForm } from "~/sections/contact/ContactForm";

export function meta() {
  return pageMeta({ ...contact.seo, path: "/contact" });
}

const labelClass =
  "font-display text-small font-semibold tracking-label uppercase";

export default function Contact() {
  const [params] = useSearchParams();
  const pkg = packageBySlug(params.get("package") ?? "");
  const { details } = contact;

  return (
    <Section labelledBy="contact-heading">
      <Grid gap="none">
        <Block pad="large" className="col-span-4 md:col-span-7">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <Heading level={1} id="contact-heading" className="mt-6 max-w-[12ch]">
            {contact.heading}
          </Heading>
          <p className="mt-8 mb-12 max-w-prose text-lead">{contact.lead}</p>
          <ContactForm defaultMessage={pkg ? `${pkg.name}: ` : undefined} />
        </Block>

        <Block
          tone="ink"
          pad="large"
          className="col-span-4 flex flex-col gap-16 md:col-span-5"
        >
          <CalendlyEmbed />
          <div>
            <Heading level={2} size="h3">
              {details.heading}
            </Heading>
            <dl className="mt-6 flex flex-col gap-6">
              <div>
                <dt className={labelClass}>{details.emailLabel}</dt>
                <dd className="mt-1">
                  {isPending(site.email) ? (
                    <TodoMark item={site.email} />
                  ) : (
                    <a
                      href={`mailto:${site.email}`}
                      className="underline underline-offset-4"
                    >
                      {site.email}
                    </a>
                  )}
                </dd>
              </div>
              <div>
                <dt className={labelClass}>{details.locationLabel}</dt>
                <dd className="mt-1">
                  {site.location.city}, {site.location.country}
                </dd>
              </div>
              <div>
                <dt className={labelClass}>{details.linkedinLabel}</dt>
                <dd className="mt-1">
                  {isPending(site.linkedin) ? (
                    <TodoMark item={site.linkedin} />
                  ) : (
                    <a
                      href={site.linkedin}
                      className="underline underline-offset-4"
                      rel="me"
                    >
                      {details.linkedinLabel}
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </Block>
      </Grid>
    </Section>
  );
}
