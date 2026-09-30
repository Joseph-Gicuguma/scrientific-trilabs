import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  eastAfricaFills,
  eastAfricaLabels,
  EAST_AFRICA_ART,
  MARKET_LABEL_WELLS,
} from "./maps/east-africa";
import { WellPlate } from "./WellPlate";
import { parseWellId, plateFromAscii, wellId } from "./wells";

function filledWells(container: HTMLElement) {
  return [...container.querySelectorAll<SVGCircleElement>("[data-well]")];
}

describe("WellPlate", () => {
  it("draws a standard 96-well plate by default", () => {
    const { container } = render(<WellPlate fills={{}} />);
    expect(
      container.querySelectorAll('[data-part="empty"] circle'),
    ).toHaveLength(96);
  });

  it("honours custom dimensions", () => {
    const { container } = render(<WellPlate fills={{}} rows={2} cols={5} />);
    expect(
      container.querySelectorAll('[data-part="empty"] circle'),
    ).toHaveLength(10);
  });

  it("fills wells with token colours, never raw values", () => {
    const { container } = render(
      <WellPlate fills={{ A1: "green", H12: "orange" }} />,
    );
    const wells = filledWells(container);
    expect(wells.map((w) => w.dataset.well)).toEqual(["A1", "H12"]);
    expect(wells[0]?.style.fill).toBe("var(--color-green)");
    expect(wells[1]?.style.fill).toBe("var(--color-orange)");
  });

  it("ignores wells outside the plate and warns in development", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { container } = render(
      <WellPlate
        rows={2}
        cols={2}
        fills={{ A1: "ink", C1: "ink", A3: "ink" }}
      />,
    );
    expect(filledWells(container).map((w) => w.dataset.well)).toEqual(["A1"]);
    expect(warn).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  it("is decorative unless given a label", () => {
    const { container, rerender } = render(<WellPlate fills={{}} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).toBeNull();

    rerender(<WellPlate fills={{}} label="Map of East Africa" />);
    expect(
      screen.getByRole("img", { name: "Map of East Africa" }),
    ).not.toHaveAttribute("aria-hidden");
  });

  it("orders the pipetting sequence by row, column or an explicit list", () => {
    const fills = { A2: "ink", B1: "ink", A1: "ink" } as const;
    const order = (el: HTMLElement) =>
      filledWells(el).map((w) => w.dataset.well);

    const { container, rerender } = render(<WellPlate fills={fills} animate />);
    expect(order(container)).toEqual(["A1", "A2", "B1"]);

    rerender(<WellPlate fills={fills} animate sequence="column" />);
    expect(order(container)).toEqual(["A1", "B1", "A2"]);

    rerender(<WellPlate fills={fills} animate sequence={["B1", "A2"]} />);
    expect(order(container)).toEqual(["B1", "A2", "A1"]);

    const wells = filledWells(container);
    expect(wells[2]?.style.getPropertyValue("--well-index")).toBe("2");
    expect(wells.every((w) => w.hasAttribute("data-animate"))).toBe(true);
  });

  it("does not mark wells for animation when animate is off", () => {
    const { container } = render(<WellPlate fills={{ A1: "ink" }} />);
    expect(filledWells(container)[0]).not.toHaveAttribute("data-animate");
  });

  it("draws annotations in place of empty wells", () => {
    const { container } = render(
      <WellPlate fills={{}} annotations={eastAfricaLabels()} />,
    );
    expect(
      container.querySelectorAll('[data-part="empty"] circle'),
    ).toHaveLength(96 - 5);
    const text = [...container.querySelectorAll("[data-annotation]")].map(
      (t) => t.textContent,
    );
    expect(text.sort()).toEqual(["ET", "KE", "RW", "TZ", "UG"]);
  });

  it("renders plate labels when asked", () => {
    const { container } = render(<WellPlate fills={{}} labels />);
    const text = [...container.querySelectorAll("text")].map(
      (t) => t.textContent,
    );
    expect(text).toContain("12");
    expect(text).toContain("H");
  });
});

describe("well helpers", () => {
  it("round-trips well ids", () => {
    expect(wellId(0, 0)).toBe("A1");
    expect(wellId(7, 11)).toBe("H12");
    expect(parseWellId("H12")).toEqual({ row: 7, col: 11 });
    expect(parseWellId("Z1")).toBeNull();
    expect(parseWellId("A")).toBeNull();
  });

  it("builds fill maps from text drawings", () => {
    expect(
      plateFromAscii("\n  .G\n  O.\n", { G: "green", O: "orange" }),
    ).toEqual({ A2: "green", B1: "orange" });
    expect(() => plateFromAscii("X", {})).toThrow(/legend/);
  });

  it("fits the East Africa map on a 96-well plate, one colour per market", () => {
    const rows = EAST_AFRICA_ART.trim().split("\n");
    expect(rows).toHaveLength(8);
    expect(rows.every((r) => r.trim().length === 12)).toBe(true);
    expect(new Set(Object.values(eastAfricaFills())).size).toBe(5);
  });

  it("puts each country label in an empty well on the plate", () => {
    const fills = eastAfricaFills();
    for (const well of Object.values(MARKET_LABEL_WELLS)) {
      expect(fills[well]).toBeUndefined();
      const pos = parseWellId(well);
      expect(pos && pos.row < 8 && pos.col < 12).toBe(true);
    }
  });
});
