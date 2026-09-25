import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const experiences = [
    {
      titleKey: "experience.lead",
      companyKey: "experience.chadnova",
      period: "Nov 2025 – Present",
      descriptionKey: "experience.leadDesc",
      highlightKeys: [
        "experience.arch",
        "experience.leadership",
        "experience.strategy",
      ],
      gradient: "from-[#58a6ff] to-[#0284c7]",
      borderColor: "#58a6ff",
      glowColor: "rgba(88,166,255,0.15)",
    },
    {
      titleKey: "experience.assistant",
      companyKey: "experience.auca",
      period: "Sep 2025 – Present",
      descriptionKey: "experience.assistantDesc",
      highlightKeys: [
        "experience.fullstack",
        "experience.codereview",
        "experience.mentorship",
      ],
      gradient: "from-[#3fb950] to-[#15803d]",
      borderColor: "#3fb950",
      glowColor: "rgba(63,185,80,0.15)",
    },
    {
      titleKey: "experience.trainee",
      companyKey: "experience.gym",
      period: "2024 – Present",
      descriptionKey: "experience.traineeDesc",
      highlightKeys: [
        "experience.fullstackdev",
        "experience.agile",
        "experience.codereview",
      ],
      gradient: "from-[#f97316] to-[#e95420]",
      borderColor: "#f97316",
      glowColor: "rgba(249,115,22,0.15)",
    },
    {
      titleKey: "experience.volunteer",
      companyKey: "experience.gym",
      period: "2025 – Present",
      descriptionKey: "experience.volunteerDesc",
      highlightKeys: [
        "experience.coaching",
        "experience.community",
        "experience.facilitation",
      ],
      gradient: "from-[#a855f7] to-[#7c3aed]",
      borderColor: "#a855f7",
      glowColor: "rgba(168,85,247,0.15)",
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* ── Section Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="section-tag">experience --timeline</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold dev-heading">
            {t("experience.title") || "Professional Journey"}
          </h2>
          <div className="section-divider" />
          <p className="text-base sm:text-lg dev-muted max-w-2xl mx-auto leading-relaxed">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Vertical growing line */}
          <div className="absolute start-5 sm:start-8 top-0 bottom-0 w-px overflow-hidden">
            {/* Track */}
            <div
              className="absolute inset-0"
              style={{ background: "var(--dev-border)" }}
            />
            {/* Fill */}
            <motion.div
              className="absolute inset-x-0 top-0"
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
              style={{
                background:
                  "linear-gradient(180deg, #58a6ff 0%, #3fb950 50%, #a855f7 100%)",
              }}
            />
          </div>

          <div className="space-y-10 sm:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.15,
                  ease: "easeOut",
                }}
                className="relative ps-16 sm:ps-24"
              >
                {/* ── Timeline node ── */}
                <div className="absolute start-0 sm:start-3 top-5 sm:top-6 flex items-center justify-center">
                  {/* Ping ring */}
                  <motion.div
                    className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full opacity-40"
                    style={{
                      background: `radial-gradient(circle, ${exp.borderColor}40, transparent)`,
                    }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: index * 0.4,
                    }}
                  />
                  {/* Icon dot */}
                  <div
                    className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${exp.gradient} flex items-center justify-center shadow-lg border-4 border-[var(--dev-bg)]`}
                  >
                    <Briefcase size={18} className="text-white" />
                  </div>
                </div>

                {/* ── Card ── */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="shell-panel rounded-2xl p-5 sm:p-6 md:p-7 overflow-hidden relative"
                  style={{
                    borderInlineStartWidth: 3,
                    borderInlineStartStyle: "solid",
                    borderInlineStartColor: exp.borderColor,
                  }}
                >
                  {/* Glow corner */}
                  <div
                    className="absolute top-0 start-0 w-48 h-48 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${exp.glowColor}, transparent 70%)`,
                    }}
                  />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold dev-heading mb-1">
                        {t(exp.titleKey)}
                      </h3>
                      <p
                        className="text-sm font-semibold terminal-title"
                        style={{ color: exp.borderColor }}
                      >
                        {t(exp.companyKey)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-row flex-wrap sm:flex-col sm:items-end gap-x-3 gap-y-1 text-xs dev-muted terminal-title">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {t("experience.location")}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="dev-text text-sm leading-relaxed mb-4">
                    {t(exp.descriptionKey)}
                  </p>

                  {/* Highlight tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlightKeys.map((key, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.15 + idx * 0.05 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: `${exp.borderColor}14`,
                          color: exp.borderColor,
                          border: `1px solid ${exp.borderColor}30`,
                        }}
                      >
                        <ArrowRight size={10} className="rtl:rotate-180" />
                        {t(key)}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
