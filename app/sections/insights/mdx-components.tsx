import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router";

/*
 * Styles for article bodies. Articles use ## and ### only; the page supplies the h1.
 */

function Anchor({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const className =
    "underline decoration-2 underline-offset-4 hover:decoration-4";
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

/** Editorial placeholder inside an article, e.g. facts still to confirm. */
function Todo({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 border-2 border-dashed border-ink p-5 text-small">
      <strong className="font-display tracking-label uppercase">TODO: </strong>
      {children}
    </aside>
  );
}

export const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-16 mb-6 text-h3 tracking-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-10 mb-4 text-lead font-bold" {...props}>
      {children}
    </h3>
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-5" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-6 flex list-disc flex-col gap-2 pl-6 marker:text-ink"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-6 flex list-decimal flex-col gap-2 pl-6" {...props} />
  ),
  a: Anchor,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-8 border-l-4 border-ink pl-6 text-lead"
      {...props}
    />
  ),
  Todo,
};
