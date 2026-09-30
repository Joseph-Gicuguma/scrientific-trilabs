import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { contact } from "~/content/contact";
import { submitToFormspree } from "~/lib/formspree";
import { ContactForm } from "./ContactForm";

const { errors, fields } = contact.form;
const ENDPOINT = "https://formspree.io/f/test";

function mockFetch(ok = true) {
  const fn = vi.fn(() =>
    Promise.resolve(new Response("{}", { status: ok ? 200 : 500 })),
  );
  vi.stubGlobal("fetch", fn);
  return fn;
}

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(fields.name.label), "Ada Lovelace");
  await user.type(
    screen.getByLabelText(fields.company.label),
    "Acme Diagnostics GmbH",
  );
  await user.type(
    screen.getByLabelText(fields.email.label),
    "ada@acme.example",
  );
  await user.type(screen.getByLabelText(fields.country.label), "Germany");
  await user.selectOptions(
    screen.getByLabelText(fields.productType.label),
    "Molecular diagnostics",
  );
  await user.type(
    screen.getByLabelText(fields.message.label),
    "We have a TB assay and want to register it in Kenya next year.",
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("labels every field", () => {
    render(<ContactForm endpoint={ENDPOINT} />);
    for (const field of Object.values(fields)) {
      expect(screen.getByLabelText(field.label)).toBeInTheDocument();
    }
  });

  it("shows an error for each missing field and does not submit", async () => {
    const fetch = mockFetch();
    const user = userEvent.setup();
    render(<ContactForm endpoint={ENDPOINT} />);

    await user.click(screen.getByRole("button", { name: contact.form.submit }));

    for (const message of [
      errors.name,
      errors.company,
      errors.emailRequired,
      errors.country,
      errors.productType,
      errors.messageShort,
    ]) {
      expect(await screen.findByText(message)).toBeInTheDocument();
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("marks invalid fields and links them to their error text", async () => {
    const user = userEvent.setup();
    render(<ContactForm endpoint={ENDPOINT} />);

    const email = screen.getByLabelText(fields.email.label);
    await user.type(email, "not-an-email");
    await user.tab();

    await waitFor(() => {
      expect(email).toHaveAttribute("aria-invalid", "true");
    });
    expect(email).toHaveAccessibleDescription(errors.emailInvalid);
  });

  it("moves focus to the first invalid field on submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm endpoint={ENDPOINT} />);
    await user.click(screen.getByRole("button", { name: contact.form.submit }));
    await waitFor(() => {
      expect(screen.getByLabelText(fields.name.label)).toHaveFocus();
    });
  });

  it("posts valid data to Formspree and shows a confirmation", async () => {
    const fetch = mockFetch();
    const user = userEvent.setup();
    render(<ContactForm endpoint={ENDPOINT} />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: contact.form.submit }));

    expect(
      await screen.findByText(contact.form.success.heading),
    ).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(ENDPOINT);
    const body = JSON.parse(init.body as string) as Record<string, string>;
    expect(body).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@acme.example",
      productType: "Molecular diagnostics",
    });
    expect(body).not.toHaveProperty("website");
  });

  it("tells the visitor when sending fails", async () => {
    mockFetch(false);
    const user = userEvent.setup();
    render(<ContactForm endpoint={ENDPOINT} />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: contact.form.submit }));
    expect(await screen.findByText(contact.form.failure)).toBeInTheDocument();
  });

  it("explains when no endpoint is configured", async () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const user = userEvent.setup();
    render(<ContactForm endpoint="" />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: contact.form.submit }));
    expect(
      await screen.findByText(contact.form.notConfigured),
    ).toBeInTheDocument();
    error.mockRestore();
  });

  it("prefills the message from the package the visitor came from", async () => {
    render(
      <ContactForm endpoint={ENDPOINT} defaultMessage="Market Snapshot: " />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText(fields.message.label)).toHaveValue(
        "Market Snapshot: ",
      );
    });
  });
});

describe("submitToFormspree honeypot", () => {
  it("drops submissions where the hidden field is filled", async () => {
    const fetch = vi.fn();
    const result = await submitToFormspree(
      ENDPOINT,
      { name: "bot", website: "http://spam.example" },
      fetch,
    );
    expect(result).toBe("spam");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns failed instead of throwing on network errors", async () => {
    const fetch = vi.fn(() => Promise.reject(new Error("offline")));
    expect(await submitToFormspree(ENDPOINT, { name: "x" }, fetch)).toBe(
      "failed",
    );
  });
});
