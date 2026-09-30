import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Heading } from "~/components/ui";
import { contact, productTypes, type ProductType } from "~/content/contact";
import { submitToFormspree, type SubmitResult } from "~/lib/formspree";
import { controlClass, Field } from "./Field";
import { contactSchema, type ContactInput, type ContactValues } from "./schema";

interface ContactFormProps {
  endpoint?: string | undefined;
  /** Pre-selects a product type, e.g. from a query string. */
  defaultProductType?: ProductType | undefined;
  /** Prefills the message, e.g. with the package the visitor came from. */
  defaultMessage?: string | undefined;
}

export function ContactForm({
  endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT,
  defaultProductType,
  defaultMessage = "",
}: ContactFormProps) {
  const { form } = contact;
  const { fields } = form;
  const [status, setStatus] = useState<SubmitResult | "idle">("idle");
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      country: "",
      productType: defaultProductType ?? ("" as ProductType),
      message: "",
      website: "",
    },
  });

  // Applied after hydration so the prerendered HTML and first client render match.
  useEffect(() => {
    if (defaultMessage && !getValues("message"))
      setValue("message", defaultMessage);
  }, [defaultMessage, getValues, setValue]);

  useEffect(() => {
    if (
      status === "sent" ||
      status === "failed" ||
      status === "not-configured"
    ) {
      statusRef.current?.focus();
    }
  }, [status]);

  const onSubmit = async (values: ContactValues) => {
    const result = await submitToFormspree(endpoint, values);
    // Spam gets the same thank-you, so bots learn nothing.
    setStatus(result === "spam" ? "sent" : result);
  };

  if (status === "sent") {
    return (
      // "user": no movement for visitors who prefer reduced motion.
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          <motion.div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-ink bg-paper p-8 outline-none"
          >
            <Heading level={2} size="h3">
              {form.success.heading}
            </Heading>
            <p className="mt-4">{form.success.body}</p>
          </motion.div>
        </AnimatePresence>
      </MotionConfig>
    );
  }

  const errorMessage =
    status === "failed"
      ? form.failure
      : status === "not-configured"
        ? form.notConfigured
        : null;

  return (
    <form
      noValidate
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      aria-labelledby="contact-form-heading"
      className="flex flex-col gap-6"
    >
      <Heading level={2} size="h3" id="contact-form-heading">
        {form.heading}
      </Heading>

      <div ref={statusRef} tabIndex={-1} role="alert" className="outline-none">
        {errorMessage && (
          <p className="border-2 border-ink bg-paper p-4 font-semibold">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={fields.name.label} error={errors.name?.message}>
          {(describedBy) => (
            <input
              id="name"
              type="text"
              autoComplete={fields.name.autoComplete}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy}
              className={controlClass}
              {...register("name")}
            />
          )}
        </Field>
        <Field
          id="company"
          label={fields.company.label}
          error={errors.company?.message}
        >
          {(describedBy) => (
            <input
              id="company"
              type="text"
              autoComplete={fields.company.autoComplete}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={describedBy}
              className={controlClass}
              {...register("company")}
            />
          )}
        </Field>
        <Field
          id="email"
          label={fields.email.label}
          error={errors.email?.message}
        >
          {(describedBy) => (
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete={fields.email.autoComplete}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy}
              className={controlClass}
              {...register("email")}
            />
          )}
        </Field>
        <Field
          id="country"
          label={fields.country.label}
          error={errors.country?.message}
        >
          {(describedBy) => (
            <input
              id="country"
              type="text"
              autoComplete={fields.country.autoComplete}
              aria-invalid={errors.country ? true : undefined}
              aria-describedby={describedBy}
              className={controlClass}
              {...register("country")}
            />
          )}
        </Field>
      </div>

      <Field
        id="productType"
        label={fields.productType.label}
        error={errors.productType?.message}
      >
        {(describedBy) => (
          <select
            id="productType"
            aria-invalid={errors.productType ? true : undefined}
            aria-describedby={describedBy}
            className={controlClass}
            {...register("productType")}
          >
            <option value="" disabled>
              {fields.productType.placeholder}
            </option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        id="message"
        label={fields.message.label}
        hint={fields.message.hint}
        error={errors.message?.message}
      >
        {(describedBy) => (
          <textarea
            id="message"
            rows={6}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy}
            className={controlClass}
            {...register("message")}
          />
        )}
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">{form.honeypotLabel}</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" arrow disabled={isSubmitting}>
          {isSubmitting ? form.submitting : form.submit}
        </Button>
        <p className="text-small">{form.privacy}</p>
      </div>
    </form>
  );
}
