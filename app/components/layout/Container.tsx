import type { HTMLAttributes } from "react";
import { cn } from "~/lib/cn";

/** Centres content at the site max width with the fluid side gutter. */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-site px-gutter", className)}
      {...props}
    />
  );
}
