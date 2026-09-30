import { useState } from "react";
import { Button, Heading, TodoMark } from "~/components/ui";
import { contact } from "~/content/contact";
import { todo } from "~/content/types";

interface CalendlyEmbedProps {
  url?: string | undefined;
}

/**
 * Loads Calendly only when asked, so the page ships no third-party script
 * and no tracking until the visitor chooses to book.
 */
export function CalendlyEmbed({
  url = import.meta.env.VITE_CALENDLY_URL,
}: CalendlyEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const copy = contact.calendly;

  return (
    <div>
      <Heading level={2} size="h3">
        {copy.heading}
      </Heading>
      <p className="mt-4">{copy.body}</p>
      {!url ? (
        <p className="mt-6">
          <TodoMark item={todo(`${copy.missing} (set VITE_CALENDLY_URL)`)} />
        </p>
      ) : loaded ? (
        <iframe
          src={`${url}?hide_gdpr_banner=1`}
          title={copy.iframeTitle}
          className="mt-6 h-[42rem] w-full border-2 border-(--block-fg) bg-paper"
          loading="lazy"
        />
      ) : (
        <div className="mt-6 flex flex-col items-start gap-4">
          <Button
            onClick={() => {
              setLoaded(true);
            }}
          >
            {copy.load}
          </Button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {copy.open}
          </a>
        </div>
      )}
    </div>
  );
}
