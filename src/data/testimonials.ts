import type { Localized } from "../contexts/LanguageContext";

export type Testimonial = {
  quote: Localized;
  name: string;
  role: string;
  /** Optional link to the person's LinkedIn or site */
  href?: string;
};

/**
 * Real quotes only. The Testimonials section stays hidden while this list is empty.
 * Good sources: students you assisted at AUCA, ChadNova teammates, The Gym peers,
 * or the owners of Haggar Royal / Complexe Agro-pastoral.
 *
 * Example shape:
 * {
 *   quote: { en: "…", fr: "…", ar: "…" },
 *   name: "Jane Doe",
 *   role: "Student, AUCA",
 *   href: "https://www.linkedin.com/in/…",
 * },
 */
export const testimonials: Testimonial[] = [];
