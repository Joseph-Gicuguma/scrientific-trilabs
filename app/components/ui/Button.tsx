import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import { cn } from "~/lib/cn";

type Variant = "primary" | "secondary";

/*
 * Buttons take their colours from the enclosing block (--block-fg, --block-on-fg),
 * so a primary button is ink with cream text on light blocks and inverted on ink blocks.
 */
const base =
  "inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 font-display text-body font-semibold " +
  "border-2 border-(--block-fg) transition-colors duration-150 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-(--block-fg) text-(--block-on-fg) hover:bg-transparent hover:text-(--block-fg)",
  secondary:
    "bg-transparent text-(--block-fg) hover:bg-(--block-fg) hover:text-(--block-bg)",
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0"
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

interface CommonProps {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  arrow = false,
  className,
  children,
  ...props
}: CommonProps & LinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  arrow = false,
  className,
  children,
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
