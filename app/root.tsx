// Inlined into <head> so first paint needs no extra request for CSS.
import styles from "./styles/app.css?inline";
import interTightLatin from "@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2?url";

import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { Container } from "./components/layout";
import { SiteFooter, SiteHeader } from "./components/nav";
import { Heading, SkipLink } from "./components/ui";
import { organizationSchema } from "./lib/schema";

// Headlines render in this file; fetch it before the stylesheet asks for it.
export const links: Route.LinksFunction = () =>
  [interTightLatin].map((href) => ({
    rel: "preload",
    href,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  }));

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f5c8bc" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          // Static, build-time data; no user input reaches this.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </head>
      <body>
        <SkipLink />
        <SiteHeader />
        <main
          id="main"
          tabIndex={-1}
          data-inert-with-menu=""
          className="outline-none"
        >
          {children}
        </main>
        <SiteFooter />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  return (
    <Container className="py-section">
      <Heading level={1}>
        {is404 ? "Page not found" : "Something went wrong"}
      </Heading>
      {import.meta.env.DEV && error instanceof Error && (
        <pre className="mt-8 overflow-x-auto text-small">{error.stack}</pre>
      )}
    </Container>
  );
}
