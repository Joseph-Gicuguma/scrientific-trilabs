import portrait from "~/assets/grace-portrait.jpg?w=400;700;900&format=avif;webp;jpg&as=picture";
import type { PictureSource } from "~/components/ui/Portrait";
import type { Pending } from "./types";

export interface Role {
  readonly organisation: string;
  readonly title: string;
  readonly period: string;
  readonly detail: string;
}

export interface Qualification {
  readonly award: string;
  readonly institution: string;
}

export const founder = {
  name: "Grace Wanjũgũ Kamau",
  role: "Founder",
  yearsInIndustry: 9,
  companies: ["Bruker", "Hain Lifescience", "Revvity"],
  roles: [
    {
      organisation: "Revvity",
      title: "Consultant",
      period: "2024 to 2026",
      detail:
        "Market work for Revvity, including an Ethiopia market assessment.",
    },
    {
      organisation: "Bruker",
      title: "Sales and Applications Specialist",
      period: "2020 to 2024",
      detail: "Sales and applications support across Sub-Saharan Africa.",
    },
    {
      organisation: "Hain Lifescience",
      title: "Sales and Applications Specialist",
      period: "2018 to 2020",
      detail: "Sales and applications support across Sub-Saharan Africa.",
    },
  ] satisfies readonly Role[],
  education: [
    {
      award: "MPH in Epidemiology",
      institution: "Amref International University",
    },
    {
      award: "BSc Biochemistry",
      institution: "Technical University of Kenya",
    },
  ] satisfies readonly Qualification[],
  /** Black-and-white, 4:5, served as AVIF and WebP at 400, 700 and 900px wide. */
  portrait: portrait as PictureSource | Pending,
  portraitAlt: "Grace Wanjũgũ Kamau, smiling, in graduation robes",
} as const;
