import type { ReactNode } from "react";

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string | undefined;
  children: (describedBy: string | undefined) => ReactNode;
}

/** Label, optional hint and error message wired to one control. */
export function Field({ id, label, hint, error, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-display font-semibold">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-small">
          {hint}
        </p>
      )}
      {children(describedBy)}
      {error && (
        <p id={errorId} className="flex items-start gap-2 font-semibold">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            className="mt-1 shrink-0"
          >
            <circle cx="8" cy="8" r="7" fill="currentColor" />
            <path
              d="M8 4v5M8 11v1.5"
              stroke="var(--color-orange)"
              strokeWidth="2"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export const controlClass =
  "min-h-12 w-full border-2 border-ink bg-paper px-4 py-3 text-body text-ink " +
  "aria-invalid:border-4 aria-invalid:shadow-[inset_8px_0_0_var(--color-orange)]";
