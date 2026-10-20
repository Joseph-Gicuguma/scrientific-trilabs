import portrait from "~/assets/grace-portrait.jpg?w=400;700;900&format=avif;webp;jpg&as=picture";
import type { PictureSource } from "~/components/ui/Portrait";
import type { Pending } from "./types";

export const founder = {
  name: "Grace Wanjũgũ Kamau",
  role: "Lead Consultant",
  yearsInIndustry: 9,
  companies: ["Bruker", "Hain Lifescience", "Revvity"],
  linkedin: "https://www.linkedin.com/in/grace-wanj%C5%ABg%C5%AB-kamau/",
  /** Black-and-white, 4:5, served as AVIF and WebP at 400, 700 and 900px wide. */
  portrait: portrait as PictureSource | Pending,
  portraitAlt: "Grace Wanjũgũ Kamau, smiling, in graduation robes",
} as const;
