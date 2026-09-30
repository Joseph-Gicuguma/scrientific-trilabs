import { z } from "zod";
import { contact, productTypes } from "~/content/contact";

const { errors } = contact.form;

export const contactSchema = z.object({
  name: z.string().trim().min(1, errors.name).max(120),
  company: z.string().trim().min(1, errors.company).max(160),
  email: z
    .string()
    .trim()
    .min(1, errors.emailRequired)
    .pipe(z.email(errors.emailInvalid)),
  country: z.string().trim().min(1, errors.country).max(80),
  productType: z.enum(productTypes, { error: errors.productType }),
  message: z
    .string()
    .trim()
    .min(20, errors.messageShort)
    .max(5000, errors.messageLong),
  /** Honeypot. Real visitors never see or fill it. */
  website: z.string().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;
