/** Content that has not been supplied yet. Rendered as a visible TODO marker. */
export interface Pending {
  readonly todo: string;
}

export type MaybePending<T> = T | Pending;

export function todo(note: string): Pending {
  return { todo: note };
}

export function isPending(value: unknown): value is Pending {
  return typeof value === "object" && value !== null && "todo" in value;
}

export interface NavLink {
  readonly label: string;
  readonly to: string;
}
