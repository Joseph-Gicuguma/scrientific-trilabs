import { describe, expect, it } from "vitest";
import { absoluteUrl, pageMeta } from "./seo";

describe("absoluteUrl", () => {
  it("keeps the root slash and strips others", () => {
    expect(absoluteUrl("/")).toBe("https://www.example.com/");
    expect(absoluteUrl("/services/")).toBe("https://www.example.com/services");
    expect(absoluteUrl("about")).toBe("https://www.example.com/about");
    expect(absoluteUrl("https://x.test/a")).toBe("https://x.test/a");
  });
});

describe("pageMeta", () => {
  const tags = pageMeta({
    title: "Services",
    description: "D",
    path: "/services",
  });

  it("sets title, canonical and Open Graph", () => {
    expect(tags).toContainEqual({ title: "Services | Tri-Lab Scientific" });
    expect(tags).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: "https://www.example.com/services",
    });
    expect(tags).toContainEqual({
      property: "og:image",
      content: "https://www.example.com/og/default.png",
    });
  });

  it("only adds noindex when asked", () => {
    expect(tags.some((t) => "name" in t && t.name === "robots")).toBe(false);
    const hidden = pageMeta({ description: "D", path: "/404", noindex: true });
    expect(hidden).toContainEqual({ name: "robots", content: "noindex" });
  });
});
