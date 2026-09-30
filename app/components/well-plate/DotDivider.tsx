import { cn } from "~/lib/cn";
import type { Tone } from "~/lib/tones";
import { WellPlate } from "./WellPlate";
import type { FillMap, WellId } from "./wells";

interface DotDividerProps {
  /** Number of wells in the strip. */
  count?: number;
  /** 1-based positions to fill, and their tones. */
  filled?: readonly (readonly [number, Tone])[];
  className?: string;
}

/** A single row of wells used as a quiet break between sections. */
export function DotDivider({
  count = 24,
  filled = [
    [1, "ink"],
    [2, "ink"],
    [3, "ink"],
  ],
  className,
}: DotDividerProps) {
  const fills: FillMap = Object.fromEntries(
    filled.map(([position, tone]) => [`A${position}` as WellId, tone]),
  );
  return (
    <div className={cn("py-6", className)}>
      <WellPlate rows={1} cols={count} fills={fills} size="100%" />
    </div>
  );
}
