import type { Tone } from "~/lib/tones";

export const ROW_LETTERS = "ABCDEFGHIJKLMNOP";

/** A well address in plate notation: row letter + 1-based column, e.g. "C7". */
export type WellId = `${string}${number}`;

export type FillMap = Readonly<Partial<Record<WellId, Tone>>>;

export interface WellPosition {
  row: number;
  col: number;
}

export function wellId(row: number, col: number): WellId {
  const letter = ROW_LETTERS[row];
  if (letter === undefined) throw new RangeError(`Row ${row} out of range`);
  return `${letter}${col + 1}`;
}

export function parseWellId(id: string): WellPosition | null {
  const match = /^([A-P])(\d{1,2})$/.exec(id);
  if (!match?.[1] || !match[2]) return null;
  return { row: ROW_LETTERS.indexOf(match[1]), col: Number(match[2]) - 1 };
}

/**
 * Builds a fill map from a text drawing, one line per plate row.
 * Each character is a well: "." is empty, any other key is looked up in `legend`.
 *
 *   plateFromAscii(`
 *     ..KK
 *     .TT.
 *   `, { K: "orange", T: "green" })
 */
export function plateFromAscii(
  art: string,
  legend: Readonly<Record<string, Tone>>,
): FillMap {
  const rows = art
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const fills: Partial<Record<WellId, Tone>> = {};
  rows.forEach((line, row) => {
    // Drawings are plain ASCII, one character per well.
    for (let col = 0; col < line.length; col++) {
      const key = line.charAt(col);
      if (key === ".") continue;
      const tone = legend[key];
      if (!tone) throw new Error(`No tone in legend for "${key}"`);
      fills[wellId(row, col)] = tone;
    }
  });
  return fills;
}
