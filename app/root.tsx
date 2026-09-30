import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource-variable/bitter/wght.css";
import "@fontsource-variable/doto/wght.css";
import "./styles/app.css";

import { MotionConfig } from "motion/react";
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

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f5c8bc" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* "user" disables transform animations when the visitor prefers reduced motion. */}
        <MotionConfig reducedMotion="user">
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
        </MotionConfig>
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
