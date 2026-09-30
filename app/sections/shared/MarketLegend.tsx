import { cn } from "~/lib/cn";
import { toneVar, type Tone } from "~/lib/tones";

interface LegendItem {
  readonly tone: Tone;
  readonly label: string;
}

/** Key for a well plate: one well swatch per item. */
export function MarketLegend({
  items,
  className,
}: {
  items: readonly LegendItem[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-x-8 gap-y-2", className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2 text-small">
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className="shrink-0"
          >
            <circle
              cx="7"
              cy="7"
              r="6"
              style={{ fill: toneVar(item.tone) }}
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
