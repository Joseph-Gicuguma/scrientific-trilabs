import type { HTMLAttributes } from "react";
import { cn } from "~/lib/cn";

interface GridProps extends HTMLAttributes<HTMLElement> {
  /** "gutter" for text layouts; "none" for colour blocks that butt together. */
  gap?: "gutter" | "none";
  as?: "div" | "ul" | "ol";
}

/** The 12-column grid. Four columns on small screens, twelve from md. */
export function Grid({
  gap = "gutter",
  as: Tag = "div",
  className,
  ...props
}: GridProps) {
  return (
    <Tag
      className={cn(
        "grid grid-cols-4 md:grid-cols-12",
        gap === "gutter" && "gap-x-gutter gap-y-10",
        className,
      )}
      {...props}
    />
  );
}
