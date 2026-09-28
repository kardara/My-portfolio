import type { Localized } from "../contexts/LanguageContext";

/** Update this whenever the list below changes. */
export const nowUpdated: Localized = {
  en: "September 2026",
  fr: "septembre 2026",
  ar: "سبتمبر 2026",
};

export type NowItem = {
  label: Localized;
  text: Localized;
  icon: "build" | "teach" | "learn" | "ship";
};

export const nowItems: NowItem[] = [
  {
    icon: "build",
    label: { en: "Building", fr: "Je construis", ar: "أبني" },
    text: {
      en: "Web platforms at ChadNova, as lead engineer.",
      fr: "Des plateformes web chez ChadNova, en tant que lead engineer.",
      ar: "منصات ويب في ChadNova بصفتي المهندس الرئيسي.",
    },
  },
  {
    icon: "teach",
    label: { en: "Teaching", fr: "J'enseigne", ar: "أدرّس" },
    text: {
      en: "Web Technology & Internet at AUCA.",
      fr: "Technologies web & Internet à l'AUCA.",
      ar: "تقنيات الويب والإنترنت في AUCA.",
    },
  },
  {
    icon: "ship",
    label: { en: "Shipping", fr: "Je livre", ar: "أُطلق" },
    text: {
      en: "Websites for businesses back home in Chad.",
      fr: "Des sites pour des entreprises au Tchad.",
      ar: "مواقع لشركات في بلدي تشاد.",
    },
  },
  {
    icon: "learn",
    label: { en: "Exploring", fr: "J'explore", ar: "أستكشف" },
    text: {
      en: "Embedded systems and BLE, and moving toward cybersecurity.",
      fr: "Les systèmes embarqués et le BLE, en route vers la cybersécurité.",
      ar: "الأنظمة المدمجة وBLE، في طريقي نحو الأمن السيبراني.",
    },
  },
];
