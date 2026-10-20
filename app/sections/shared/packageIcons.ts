import {
  ChartNoAxesCombined,
  FileCheck2,
  Handshake,
  type LucideIcon,
  Route,
  ScanSearch,
} from "lucide-react";

/** One line icon per service, keyed by package slug. */
export const packageIcons: Record<string, LucideIcon> = {
  "market-snapshot": ScanSearch,
  "market-entry-assessment": Route,
  "market-access-regulatory-strategy": FileCheck2,
  "partner-route-to-market": Handshake,
  "commercial-market-development": ChartNoAxesCombined,
};
