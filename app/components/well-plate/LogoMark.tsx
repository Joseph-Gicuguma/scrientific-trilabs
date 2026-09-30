import { WellPlate } from "./WellPlate";

interface LogoMarkProps {
  size?: number | string;
  /** Use on ink blocks: the third well turns cream so it stays visible. */
  inverse?: boolean;
  className?: string;
}

/** Three filled wells: the "Tri" in Tri-Lab. Decorative; pair it with the wordmark. */
export function LogoMark({
  size = 36,
  inverse = false,
  className,
}: LogoMarkProps) {
  return (
    <WellPlate
      rows={1}
      cols={3}
      fills={{ A1: "green", A2: "orange", A3: inverse ? "cream" : "ink" }}
      empty="none"
      size={size}
      {...(className ? { className } : {})}
    />
  );
}
