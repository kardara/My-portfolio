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
  icon: "build" | "teach" | "learn" | "ship" | "study";
};

export const nowItems: NowItem[] = [
  {
    icon: "study",
    label: { en: "Studying", fr: "J'étudie", ar: "أدرس" },
    text: {
      en: "MSIT at Carnegie Mellon University Africa, specializing in AI & machine learning.",
      fr: "Le MSIT à Carnegie Mellon University Africa, spécialisation IA & apprentissage automatique.",
      ar: "ماجستير تقنية المعلومات في جامعة كارنيغي ميلون أفريقيا، بتخصص الذكاء الاصطناعي وتعلم الآلة.",
    },
  },
  {
    icon: "build",
    label: { en: "Building", fr: "Je construis", ar: "أبني" },
    text: {
      en: "University information systems at AUCA, as a software developer.",
      fr: "Les systèmes d'information de l'AUCA, en tant que développeur logiciel.",
      ar: "أنظمة المعلومات الجامعية في AUCA بصفتي مطور برمجيات.",
    },
  },
  {
    icon: "learn",
    label: { en: "Sharpening", fr: "J'approfondis", ar: "أطوّر" },
    text: {
      en: "Advanced Java, concurrency and system design with The Gym × MaibornWolff.",
      fr: "Java avancé, concurrence et conception de systèmes avec The Gym × MaibornWolff.",
      ar: "Java المتقدم والتزامن وتصميم الأنظمة مع The Gym × MaibornWolff.",
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
];
