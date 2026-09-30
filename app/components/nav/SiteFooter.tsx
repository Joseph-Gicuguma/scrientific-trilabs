import { Link } from "react-router";
import { nav, primaryNav } from "~/content/nav";
import { site } from "~/content/site";
import { isPending } from "~/content/types";
import { Container, Grid } from "../layout";
import { TodoMark } from "../ui";
import { LogoMark } from "../well-plate";

const linkClass = "underline-offset-4 hover:underline";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer data-tone="ink" data-inert-with-menu="" className="py-16">
      <Container>
        <Grid>
          <div className="col-span-4 md:col-span-5">
            <LogoMark size={56} inverse />
            <p className="mt-6 font-display text-h3 font-bold tracking-tight">
              {site.legalName}
            </p>
            <p className="mt-2">
              {site.location.city}, {site.location.country}
            </p>
          </div>

          <nav
            aria-label={nav.footerLabel}
            className="col-span-2 md:col-span-3"
          >
            <ul className="flex flex-col gap-2">
              {primaryNav.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 flex flex-col gap-2 md:col-span-4">
            {isPending(site.email) ? (
              <TodoMark item={site.email} />
            ) : (
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            )}
            {isPending(site.linkedin) ? (
              <TodoMark item={site.linkedin} />
            ) : (
              <a href={site.linkedin} className={linkClass} rel="me">
                LinkedIn
              </a>
            )}
          </div>
        </Grid>

        <p className="mt-16 text-small">
          © {year} {site.legalName}
        </p>
      </Container>
    </footer>
  );
}
