import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/services",
  "/how-we-work",
  "/about",
  "/insights",
  "/insights/kenya-ivd-registration-guide",
  "/contact",
];

for (const route of ROUTES) {
  test(`${route} renders, is labelled and passes axe`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Tri-Lab Scientific/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations,
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);

    expect(errors).toEqual([]);
  });
}

test("unknown URLs return a 404 page", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "This well is empty.",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex",
  );
});

test("home carries Organization JSON-LD", async ({ page }) => {
  await page.goto("/");
  const json = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();
  const data = JSON.parse(json ?? "{}") as Record<string, unknown>;
  expect(data["@type"]).toBe("Organization");
  expect(data.legalName).toBe("Tri-Lab Scientific Limited");
});

test("skip link moves focus to the main content", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Keyboard skip link is a desktop check");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("mobile menu opens, traps focus and closes with Escape", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "The menu button only shows on small screens");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu" });
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();

  for (let i = 0; i < 10; i++) await page.keyboard.press("Tab");
  const focusInside = await dialog.evaluate((el) =>
    el.contains(document.activeElement),
  );
  expect(focusInside).toBe(true);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("mobile menu navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The menu button only shows on small screens");
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Services" })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("the hero plate renders filled with no animation", async ({ page }) => {
    await page.goto("/");
    const well = page.locator('[data-well="E4"]').first();
    await expect(well).toBeVisible();
    const animation = await well.evaluate(
      (el) => getComputedStyle(el).animationName,
    );
    expect(animation).toBe("none");
  });
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  for (const route of ROUTES) {
    expect(xml).toContain(`${route === "/" ? "/" : route}</loc>`);
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
});
