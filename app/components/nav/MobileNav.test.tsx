import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { navCta, primaryNav } from "~/content/nav";
import { MobileNav } from "./MobileNav";

function setup() {
  const Page = () => (
    <>
      <MobileNav />
      <main data-inert-with-menu="">
        <a href="#x">Page link</a>
      </main>
    </>
  );
  const Stub = createRoutesStub(
    ["/", ...primaryNav.map((l) => l.to)].map((path) => ({
      path,
      Component: Page,
    })),
  );
  render(<Stub initialEntries={["/"]} />);
  return {
    user: userEvent.setup(),
    toggle: screen.getByRole("button", { name: "Menu" }),
  };
}

describe("MobileNav", () => {
  it("starts closed with the toggle describing its state", () => {
    const { toggle } = setup();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens a modal dialog, focuses inside it and makes the page inert", async () => {
    const { user, toggle } = setup();
    await user.click(toggle);

    const dialog = screen.getByRole("dialog", { name: "Site menu" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", dialog.id);
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    expect(screen.getByRole("main", { hidden: true })).toHaveProperty(
      "inert",
      true,
    );

    for (const link of [...primaryNav, navCta]) {
      expect(
        screen.getAllByRole("link", { name: link.label }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("traps focus: Tab wraps from last to first and Shift+Tab back", async () => {
    const { user, toggle } = setup();
    await user.click(toggle);

    const close = screen.getByRole("button", { name: "Close" });
    const last = screen.getByRole("link", { name: navCta.label });
    expect(close).toHaveFocus();

    await user.tab({ shift: true });
    expect(last).toHaveFocus();

    await user.tab();
    expect(close).toHaveFocus();
  });

  it("closes on Escape and returns focus to the toggle", async () => {
    const { user, toggle } = setup();
    await user.click(toggle);
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("main")).toHaveProperty("inert", false);
  });

  it("closes with the Close button", async () => {
    const { user, toggle } = setup();
    await user.click(toggle);
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
    expect(toggle).toHaveFocus();
  });

  it("closes after following a link", async () => {
    const { user, toggle } = setup();
    await user.click(toggle);
    await user.click(screen.getByRole("link", { name: "About" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });
});
