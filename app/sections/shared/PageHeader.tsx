import type { ReactNode } from "react";
import { Container } from "~/components/layout";
import { Eyebrow, Heading } from "~/components/ui";

interface PageHeaderProps {
  eyebrow?: string;
  heading: string;
  lead?: string;
  children?: ReactNode;
}

/** The single h1 of an inner page, set large on the blush ground. */
export function PageHeader({
  eyebrow,
  heading,
  lead,
  children,
}: PageHeaderProps) {
  return (
    <Container className="pt-12 pb-16 md:pt-20 md:pb-24">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading level={1} className="mt-6 max-w-[16ch]">
        {heading}
      </Heading>
      {lead && <p className="mt-8 max-w-prose text-lead">{lead}</p>}
      {children}
    </Container>
  );
}
