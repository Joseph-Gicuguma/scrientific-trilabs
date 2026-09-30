import { DEFAULT_MARKET_TONES } from "~/components/well-plate";
import { markets } from "~/content/markets";
import { cn } from "~/lib/cn";
import { toneVar } from "~/lib/tones";

/** Key for the East Africa plate: one well swatch per market. */
export function MarketLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}>
      {markets.items.map((market) => (
        <li key={market.code} className="flex items-center gap-2 text-small">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
            <circle
              cx="7"
              cy="7"
              r="6"
              style={{ fill: toneVar(DEFAULT_MARKET_TONES[market.code]) }}
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          {market.name}
        </li>
      ))}
    </ul>
  );
}
