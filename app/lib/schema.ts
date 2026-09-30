import { markets } from "~/content/markets";
import { site } from "~/content/site";
import { isPending } from "~/content/types";
import { absoluteUrl } from "./seo";

/** schema.org Organization for the root layout. Pending details are left out, not faked. */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    description: site.description,
    ...(isPending(site.email) ? {} : { email: site.email }),
    ...(isPending(site.linkedin) ? {} : { sameAs: [site.linkedin] }),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    areaServed: markets.items.map((m) => ({
      "@type": "Country",
      name: m.name,
    })),
    founder: { "@type": "Person", name: site.founder },
  };
}
