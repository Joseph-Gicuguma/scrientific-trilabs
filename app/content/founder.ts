import type { PictureSource } from "~/components/ui/Portrait";
import { todo, type Pending } from "./types";

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
  /*
   * Replace with an imagetools import once the photo exists, e.g.
   * import portrait from "~/assets/grace.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";
   */
  portrait: todo(
    "Black-and-white portrait of Grace, at least 1200px wide, in app/assets/",
  ) as PictureSource | Pending,
  portraitAlt: "Grace Wanjũgũ Kamau, founder of Tri-Lab Scientific",
} as const;
