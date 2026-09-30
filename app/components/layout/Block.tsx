import type { HTMLAttributes } from "react";
import { cn } from "~/lib/cn";
import type { Tone } from "~/lib/tones";

type BlockElement = "div" | "section" | "article" | "aside" | "li" | "header";

export interface BlockProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  as?: BlockElement;
  /** Inner padding. "none" when the block holds full-bleed media. */
  pad?: "default" | "large" | "none";
}

/**
 * A flat colour block. The tone sets background and text colour together
 * (see [data-tone] in app.css), so contrast is guaranteed by construction.
 */
export function Block({
  tone,
  as: Tag = "div",
  pad = "default",
  className,
  ...props
}: BlockProps) {
  return (
    <Tag
      data-tone={tone}
      className={cn(
        pad === "default" && "p-gutter py-12 md:py-16",
        pad === "large" && "p-gutter py-section",
        className,
      )}
      {...props}
    />
  );
}
