import type { CSSProperties } from "react";
import { cn } from "~/lib/cn";
import { toneVar, type Tone } from "~/lib/tones";
import {
  ROW_LETTERS,
  parseWellId,
  wellId,
  type FillMap,
  type WellId,
  type WellPosition,
} from "./wells";

const PITCH = 10;
const RADIUS = 3.9;
const LABEL_SPACE = 7;

export type WellSequence = "row" | "column" | readonly WellId[];

export interface WellPlateProps {
  /** Which wells are filled, and with which tone. */
  fills: FillMap;
  rows?: number;
  cols?: number;
  /** Rendered width as px or any CSS length. Height follows the plate ratio. */
  size?: number | string;
  /** Empty wells: an outline in the current text colour, or nothing. */
  empty?: "outline" | "none";
  /** Outline filled wells too, so light tones read on light backgrounds. */
  outlineFilled?: boolean;
  /** "Pipette" filled wells in one by one. Ignored under prefers-reduced-motion. */
  animate?: boolean;
  /** Fill order when animating. Wells missing from an explicit list go last. */
  sequence?: WellSequence;
  /** Delay before the first well fills, in ms. */
  delay?: number;
  /** Show row letters and column numbers, like a real plate. */
  labels?: boolean;
  /** Short text (two or three letters) drawn in place of an empty well. */
  annotations?: Readonly<Partial<Record<WellId, string>>>;
  /** Accessible description. Omit to mark the plate decorative. */
  label?: string;
  className?: string;
}

interface FilledWell extends WellPosition {
  id: WellId;
  tone: Tone;
}

function orderWells(wells: FilledWell[], sequence: WellSequence): FilledWell[] {
  if (sequence === "row") {
    return [...wells].sort((a, b) => a.row - b.row || a.col - b.col);
  }
  if (sequence === "column") {
    return [...wells].sort((a, b) => a.col - b.col || a.row - b.row);
  }
  const rank = new Map(sequence.map((id, index) => [id, index]));
  return [...wells].sort(
    (a, b) =>
      (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
      (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER),
  );
}

export function WellPlate({
  fills,
  rows = 8,
  cols = 12,
  size,
  empty = "outline",
  outlineFilled = false,
  animate = false,
  sequence = "row",
  delay = 0,
  labels = false,
  annotations = {},
  label,
  className,
}: WellPlateProps) {
  const filled: FilledWell[] = [];
  for (const [id, tone] of Object.entries(fills) as [
    WellId,
    Tone | undefined,
  ][]) {
    const pos = parseWellId(id);
    if (!tone || !pos || pos.row >= rows || pos.col >= cols) {
      if (import.meta.env.DEV) {
        console.warn(
          `WellPlate: ignoring well "${id}" outside ${rows}x${cols}`,
        );
      }
      continue;
    }
    filled.push({ id, tone, ...pos });
  }
  const ordered = orderWells(filled, sequence);

  const offset = labels ? LABEL_SPACE : 0;
  const width = offset + cols * PITCH;
  const height = offset + rows * PITCH;
  const centre = (index: number) => offset + index * PITCH + PITCH / 2;

  const decorative = label === undefined;
  const style = {
    width: size,
    height: "auto",
    "--plate-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("block max-w-full", className)}
      style={style}
      {...(decorative
        ? { "aria-hidden": true, focusable: false }
        : { role: "img", "aria-label": label })}
      data-testid="well-plate"
    >
      {labels && (
        <g
          aria-hidden="true"
          fill="currentColor"
          fontFamily="var(--font-body)"
          fontSize={3.4}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {Array.from({ length: cols }, (_, col) => (
            <text key={`c${col}`} x={centre(col)} y={LABEL_SPACE / 2}>
              {col + 1}
            </text>
          ))}
          {Array.from({ length: rows }, (_, row) => (
            <text key={`r${row}`} x={LABEL_SPACE / 2} y={centre(row)}>
              {ROW_LETTERS[row]}
            </text>
          ))}
        </g>
      )}

      {empty === "outline" && (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth={0.6}
          data-part="empty"
        >
          {Array.from({ length: rows * cols }, (_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            if (annotations[wellId(row, col)]) return null;
            return (
              <circle
                key={wellId(row, col)}
                cx={centre(col)}
                cy={centre(row)}
                r={RADIUS}
              />
            );
          })}
        </g>
      )}

      {Object.keys(annotations).length > 0 && (
        <g
          aria-hidden="true"
          data-part="annotations"
          fill="currentColor"
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize={4}
          letterSpacing={0.2}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {Object.entries(annotations).map(([id, text]) => {
            const pos = parseWellId(id);
            if (!pos || !text || pos.row >= rows || pos.col >= cols)
              return null;
            return (
              <text
                key={id}
                data-annotation={id}
                x={centre(pos.col)}
                y={centre(pos.row)}
              >
                {text}
              </text>
            );
          })}
        </g>
      )}

      <g data-part="filled">
        {ordered.map((well, index) => (
          <circle
            key={well.id}
            className="well-fill"
            data-well={well.id}
            data-tone-fill={well.tone}
            data-animate={animate ? "" : undefined}
            cx={centre(well.col)}
            cy={centre(well.row)}
            r={RADIUS}
            style={
              {
                fill: toneVar(well.tone),
                stroke: outlineFilled ? "currentColor" : "none",
                strokeWidth: 0.6,
                "--well-index": index,
              } as CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}
