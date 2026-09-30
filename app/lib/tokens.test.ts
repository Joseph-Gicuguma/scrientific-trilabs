import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { AA_BODY, contrastRatio } from "./contrast";
import { TONES } from "./tones";

// Reads the shipped stylesheet so the test checks what actually renders.
const css = readFileSync(
  path.resolve(import.meta.dirname, "../styles/app.css"),
  "utf8",
);

const palette = Object.fromEntries(
  [...css.matchAll(/--color-([a-z]+):\s*(#[0-9a-f]{6});/gi)].map((m) => [
    m[1],
    m[2],
  ]),
) as Record<string, string>;

function tonePair(tone: string): { bg: string; fg: string } {
  const rule = new RegExp(`\\[data-tone="${tone}"\\]\\s*\\{([^}]*)\\}`).exec(
    css,
  )?.[1];
  if (!rule) throw new Error(`No [data-tone="${tone}"] rule in app.css`);
  const read = (prop: string) => {
    const token = new RegExp(
      `--block-${prop}:\\s*var\\(--color-([a-z]+)\\)`,
    ).exec(rule)?.[1];
    const hex = token ? palette[token] : undefined;
    if (!hex) throw new Error(`Tone ${tone} has no resolvable --block-${prop}`);
    return hex;
  };
  return { bg: read("bg"), fg: read("fg") };
}

describe("design tokens", () => {
  it("defines every brand colour", () => {
    expect(palette).toMatchObject({
      blush: "#f5c8bc",
      green: "#57b56a",
      orange: "#ee7d3e",
      sage: "#6db57e",
      cream: "#f2fbdd",
      ink: "#111111",
      paper: "#ffffff",
    });
  });

  it.each(TONES)("tone %s meets WCAG AA for body text", (tone) => {
    const { bg, fg } = tonePair(tone);
    expect(contrastRatio(bg, fg)).toBeGreaterThanOrEqual(AA_BODY);
  });

  it.each(["green", "orange", "sage"])(
    "tone %s uses ink text, never white or cream",
    (tone) => {
      expect(tonePair(tone).fg).toBe(palette.ink);
    },
  );

  it.each(TONES)("primary buttons on tone %s meet WCAG AA", (tone) => {
    // --block-on-fg is set on :root and overridden per tone where needed.
    const scope = (selector: string) =>
      new RegExp(`${selector}\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? "";
    const onFg = /--block-on-fg:\s*var\(--color-([a-z]+)\)/;
    const token =
      onFg.exec(scope(`\\[data-tone="${tone}"\\]`))?.[1] ??
      onFg.exec(scope(":root"))?.[1];
    const text = token ? palette[token] : undefined;
    expect(text).toBeDefined();
    expect(contrastRatio(tonePair(tone).fg, text ?? "")).toBeGreaterThanOrEqual(
      AA_BODY,
    );
  });
});

describe("contrastRatio", () => {
  it("matches known WCAG values", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#111111", "#57b56a")).toBeCloseTo(7.39, 2);
    expect(contrastRatio("#f2fbdd", "#6db57e")).toBeCloseTo(2.29, 2);
  });
});
