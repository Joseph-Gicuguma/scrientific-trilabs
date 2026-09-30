export type SubmitResult = "sent" | "failed" | "not-configured" | "spam";

/**
 * Posts a form to Formspree as JSON. Returns a status, never throws.
 * A filled honeypot is treated as success-shaped spam: nothing is sent.
 */
export async function submitToFormspree(
  endpoint: string | undefined,
  values: Record<string, unknown> & { website?: string | undefined },
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  const { website, ...fields } = values;
  if (website) return "spam";
  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.error(
        "VITE_FORMSPREE_ENDPOINT is not set; the contact form cannot send.",
      );
    }
    return "not-configured";
  }
  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...fields, _subject: "Discovery call request" }),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
