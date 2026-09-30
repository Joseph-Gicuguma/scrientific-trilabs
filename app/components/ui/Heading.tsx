import type { HTMLAttributes } from "react";
import { cn } from "~/lib/cn";

type Level = 1 | 2 | 3;
type Size = "h1" | "h2" | "h3";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: Level;
  /** Visual size, independent of the document outline. Defaults to the level. */
  size?: Size;
}

const sizeClass: Record<Size, string> = {
  h1: "text-h1 tracking-display",
  h2: "text-h2 tracking-display",
  h3: "text-h3 tracking-tight",
};

export function Heading({ level, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={cn("font-display", sizeClass[size ?? `h${level}`], className)}
      {...props}
    />
  );
}
