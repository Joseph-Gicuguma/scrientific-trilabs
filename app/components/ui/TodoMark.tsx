import type { Pending } from "~/content/types";

/** Visible marker for content still to be supplied. Search the repo for todo( to list them all. */
export function TodoMark({ item }: { item: Pending }) {
  return (
    <span className="border-2 border-dashed border-current px-2 font-body text-small">
      TODO: {item.todo}
    </span>
  );
}
