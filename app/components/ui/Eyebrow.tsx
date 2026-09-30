import type { HTMLAttributes } from "react";
import { cn } from "~/lib/cn";

/** Small uppercase label that sits above a heading. */
export function Eyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-display text-small font-semibold tracking-label uppercase",
        className,
      )}
      {...props}
    />
  );
}
