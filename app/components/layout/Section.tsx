import type { HTMLAttributes } from "react";
import { cn } from "~/lib/cn";
import type { Tone } from "~/lib/tones";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  /** id of the heading that names this section. */
  labelledBy?: string;
}

/** A full-bleed page band. Put a Container or a row of Blocks inside. */
export function Section({
  tone,
  labelledBy,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={cn("relative", className)}
      {...props}
    />
  );
}
