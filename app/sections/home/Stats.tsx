import { Container, Section } from "~/components/layout";
import { home } from "~/content/home";

/** Number first in the DOM too, so screen readers hear "9+ years in…". */
export function Stats() {
  const { stats } = home;
  return (
    <Section tone="ink" labelledBy="stats-heading">
      <Container>
        <h2 id="stats-heading" className="sr-only">
          {stats.label}
        </h2>
        <ul className="grid grid-cols-2 border-t-2 border-(--block-fg)/20 lg:grid-cols-4">
          {stats.items.map((item) => (
            <li
              key={item.label}
              className="flex flex-col gap-3 border-b-2 border-(--block-fg)/20 py-10 pr-6 lg:border-b-0"
            >
              <span className="font-dot text-h1 font-bold text-orange tabular-nums">
                {item.value}
              </span>{" "}
              <span className="max-w-[22ch]">{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
