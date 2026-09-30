import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { nav, navCta, primaryNav } from "~/content/nav";
import { cn } from "~/lib/cn";
import { useFocusTrap } from "~/lib/use-focus-trap";

/** Elements outside the header that become inert while the menu is open. */
const INERT_SELECTOR = "[data-inert-with-menu]";
const DESKTOP_QUERY = "(min-width: 48rem)";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const { pathname } = useLocation();

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useFocusTrap(panelRef, open, close);

  // Close on navigation.
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  // Close if the viewport grows to desktop, where the panel is hidden.
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  // Make the rest of the page inert and stop it scrolling behind the panel.
  useEffect(() => {
    if (!open) return;
    const outside = document.querySelectorAll<HTMLElement>(INERT_SELECTOR);
    outside.forEach((el) => {
      el.inert = true;
    });
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      outside.forEach((el) => {
        el.inert = false;
      });
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen(true);
        }}
        className="min-h-12 border-2 border-(--block-fg) px-4 font-display font-semibold"
      >
        {nav.menuOpen}
      </button>

      {open && (
        // Entry animation is CSS (.menu-panel), so no animation library ships on every page.
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={nav.menuLabel}
          data-tone="ink"
          className="menu-panel fixed inset-0 z-40 flex flex-col overflow-y-auto px-gutter pt-4 pb-10"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              className="min-h-12 border-2 border-(--block-fg) px-4 font-display font-semibold"
            >
              {nav.menuClose}
            </button>
          </div>
          <nav aria-label={nav.primaryLabel} className="mt-10">
            <ul className="flex flex-col gap-2">
              {[...primaryNav, navCta].map((link, i) => (
                <li key={`${link.to}-${i}`}>
                  <NavLink
                    to={link.to}
                    onClick={() => {
                      setOpen(false);
                    }}
                    className={({ isActive }) =>
                      cn(
                        "block py-2 font-display text-h2 tracking-display",
                        isActive &&
                          link !== navCta &&
                          "underline decoration-4 underline-offset-8",
                        link === navCta &&
                          "mt-8 text-h3 tracking-tight text-orange",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
