import { Link, NavLink } from "react-router";
import { nav, navCta, primaryNav } from "~/content/nav";
import { site } from "~/content/site";
import { cn } from "~/lib/cn";
import { ButtonLink } from "../ui";
import { LogoMark } from "../well-plate";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header data-tone="blush" className="relative z-30">
      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-gutter py-4">
        <Link
          to="/"
          aria-label={nav.homeLabel}
          className="flex min-h-12 items-center gap-3 font-display text-body font-bold tracking-tight"
        >
          <LogoMark size={40} className="shrink-0" />
          <span>{site.name}</span>
        </Link>

        <nav aria-label={nav.primaryLabel} className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-4">
            {primaryNav.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex min-h-12 items-center px-2 font-display font-semibold underline-offset-8 hover:underline",
                      isActive && "underline decoration-2",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink to={navCta.to}>{navCta.label}</ButtonLink>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
