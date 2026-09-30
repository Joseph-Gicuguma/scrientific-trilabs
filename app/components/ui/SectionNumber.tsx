import { cn } from "~/lib/cn";

interface SectionNumberProps {
  value: number;
  size?: "numeral" | "h2" | "h3";
  className?: string;
}

/** Doto dot-matrix numeral, zero padded: 1 → "01". Decorative, so hidden from screen readers. */
export function SectionNumber({
  value,
  size = "numeral",
  className,
}: SectionNumberProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block font-dot font-bold tabular-nums",
        size === "numeral" && "text-numeral",
        size === "h2" && "text-h2",
        size === "h3" && "text-h3",
        className,
      )}
    >
      {String(value).padStart(2, "0")}
    </span>
  );
}
