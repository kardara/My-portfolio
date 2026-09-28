import React from "react";
import { motion } from "framer-motion";
import { Brain, Code, HeartHandshake, Languages, Target, Users } from "lucide-react";
import { useLanguage, type Localized } from "../contexts/LanguageContext";
import SectionHeading from "./ui/SectionHeading";
import Spotlight from "./ui/Spotlight";

const ui = {
  beyond: { en: "Beyond the keyboard", fr: "Au-delà du clavier", ar: "بعيداً عن لوحة المفاتيح" },
  languages: { en: "Languages I work in", fr: "Langues de travail", ar: "اللغات التي أعمل بها" },
  fluent: { en: "Fluent", fr: "Courant", ar: "بطلاقة" },
  beginner: { en: "Beginner", fr: "Débutant", ar: "مبتدئ" },
  stack: { en: "Daily stack", fr: "Stack quotidienne", ar: "أدواتي اليومية" },
};

const community: { role: Localized; org: string; period: string }[] = [
  { role: { en: "Secretary General", fr: "Secrétaire général", ar: "الأمين العام" }, org: "Beri Bour Community in Rwanda", period: "2023–25" },
  { role: { en: "General Advisor", fr: "Conseiller général", ar: "المستشار العام" }, org: "AEESTR Executive Bureau", period: "2024–25" },
  { role: { en: "Treasurer", fr: "Trésorier", ar: "أمين الصندوق" }, org: "AC-DEV · Rwanda section", period: "2024–" },
  { role: { en: "Lead organizer", fr: "Organisateur principal", ar: "المنظم الرئيسي" }, org: "Chadian Independence Day", period: "2025" },
];

const spoken: { name: string; level: number; label: keyof typeof ui }[] = [
  { name: "English", level: 0.95, label: "fluent" },
  { name: "Français", level: 0.95, label: "fluent" },
  { name: "العربية", level: 0.95, label: "fluent" },
  { name: "Español", level: 0.25, label: "beginner" },
];

const stack = ["React", "TypeScript", "Next.js", "Node.js", "Java", "Spring Boot", "Flutter", "PostgreSQL"];

const strengths = [
  { icon: Code, titleKey: "about.strength1", descKey: "about.strength1Desc", color: "var(--color-primary)" },
  { icon: Users, titleKey: "about.strength2", descKey: "about.strength2Desc", color: "var(--color-secondary)" },
  { icon: Brain, titleKey: "about.strength3", descKey: "about.strength3Desc", color: "var(--color-accent)" },
  { icon: Target, titleKey: "about.strength4", descKey: "about.strength4Desc", color: "#f59e0b" },
];

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const About: React.FC = () => {
  const { t, tr } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <SectionHeading command="cat ./about.md" title={t("about.title")} subtitle={t("about.subtitle")} />

        <div className="grid lg:grid-cols-5 gap-5 sm:gap-6">
          {/* Bio */}
          <motion.div {...rise} transition={{ duration: 0.6 }} className="lg:col-span-3 lg:row-span-2 shell-panel !rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-2 pb-4 mb-5 border-b border-line">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="terminal-title text-xs dev-muted ms-2">about.md</span>
            </div>
            <p className="text-lg sm:text-xl dev-heading leading-relaxed mb-6">{t("about.description")}</p>
            <ul className="space-y-3 mb-8">
              {["about.point1", "about.point2", "about.point3", "about.point4"].map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex gap-3 text-sm sm:text-base dev-text"
                >
                  <span className="text-secondary terminal-title shrink-0">0{i + 1}</span>
                  {t(key)}
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto">
              <p className="terminal-title text-[11px] uppercase tracking-wider dev-muted mb-3">{tr(ui.stack)}</p>
              <div className="flex flex-wrap gap-2">
                {stack.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="px-3 py-1 rounded-lg text-xs font-medium border border-line bg-surface/60 dev-text"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div {...rise} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-2 shell-panel !rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Languages size={18} className="text-primary" />
              <h3 className="font-bold dev-heading">{tr(ui.languages)}</h3>
            </div>
            <div className="space-y-3.5">
              {spoken.map((l, i) => (
                <div key={l.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="dev-heading font-medium">{l.name}</span>
                    <span className="terminal-title text-xs dev-muted">{tr(ui[l.label])}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-line/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.level * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary rtl:bg-gradient-to-l"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community */}
          <motion.div {...rise} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 shell-panel !rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <HeartHandshake size={18} className="text-accent" />
              <h3 className="font-bold dev-heading">{tr(ui.beyond)}</h3>
            </div>
            <ul className="space-y-3">
              {community.map((c) => (
                <li key={c.org} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold dev-heading">{tr(c.role)}</p>
                    <p className="text-xs dev-muted">{c.org}</p>
                  </div>
                  <span className="terminal-title text-[11px] text-accent shrink-0 mt-0.5">{c.period}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Strengths */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-5 sm:mt-6">
          {strengths.map((s, i) => (
            <motion.div key={s.titleKey} {...rise} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Spotlight color={s.color} className="h-full rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-[color:var(--spot)]">
                <div
                  className="relative w-10 h-10 rounded-xl grid place-items-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)`, color: s.color }}
                >
                  <s.icon size={20} />
                </div>
                <h3 className="relative font-bold dev-heading mb-1.5">{t(s.titleKey)}</h3>
                <p className="relative text-sm dev-muted leading-relaxed">{t(s.descKey)}</p>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
