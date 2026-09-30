import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Copy rules from the brief, enforced on every content file (TS and MDX).
const root = path.resolve(import.meta.dirname);
const BANNED = [
  "leverage",
  "seamless",
  "empower",
  "unlock",
  "cutting-edge",
  "revolutionize",
  "revolutionise",
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return files(full);
    return /\.(ts|mdx)$/.test(name) && !name.endsWith(".test.ts") ? [full] : [];
  });
}

describe.each(files(root).map((f) => [path.relative(root, f), f]))(
  "content/%s",
  (_name, file) => {
    const text = readFileSync(file, "utf8");

    it("has no em dashes", () => {
      expect(text).not.toContain("—");
    });

    it("avoids banned buzzwords", () => {
      const found = BANNED.filter((w) => new RegExp(`\\b${w}`, "i").test(text));
      expect(found).toEqual([]);
    });
  },
);
