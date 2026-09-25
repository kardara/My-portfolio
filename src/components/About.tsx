import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Users,
  Brain,
  Target,
  Zap,
  Award,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

/* ── fade-in stagger helper ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: "easeOut", delay },
});

const About: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const strengths = [
    {
      icon: Code,
      titleKey: "about.strength1",
      descKey: "about.strength1Desc",
      gradient: "from-[#58a6ff] to-[#0284c7]",
      glow: "rgba(88,166,255,0.18)",
    },
    {
      icon: Users,
      titleKey: "about.strength2",
      descKey: "about.strength2Desc",
      gradient: "from-[#3fb950] to-[#15803d]",
      glow: "rgba(63,185,80,0.18)",
    },
    {
      icon: Brain,
      titleKey: "about.strength3",
      descKey: "about.strength3Desc",
      gradient: "from-[#e95420] to-[#dc2626]",
      glow: "rgba(233,84,32,0.18)",
    },
    {
      icon: Target,
      titleKey: "about.strength4",
      descKey: "about.strength4Desc",
      gradient: "from-[#f59e0b] to-[#e95420]",
      glow: "rgba(245,158,11,0.18)",
    },
  ];

  const stats = [
    {
      value: "10+",
      label: t("hero.projectsStat"),
      icon: GitBranch,
      color: "var(--color-primary)",
    },
    {
      value: "4",
      label: t("hero.activeRolesStat"),
      icon: TrendingUp,
      color: "var(--color-secondary)",
    },
    {
      value: "5",
      label: t("hero.certificationsStat"),
      icon: Award,
      color: "var(--color-accent)",
    },
  ];

  const achievements = [
    {
      icon: Zap,
      titleKey: "about.achievement1Title",
      descKey: "about.achievement1Desc",
      color: "var(--color-primary)",
    },
    {
      icon: Users,
      titleKey: "about.achievement2Title",
      descKey: "about.achievement2Desc",
      color: "var(--color-secondary)",
    },
    {
      icon: Brain,
      titleKey: "about.achievement3Title",
      descKey: "about.achievement3Desc",
      color: "var(--color-accent)",
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 md:py-28" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* ── Section Header ── */}
        <motion.div
          {...fadeUp()}
          animate={inView ? fadeUp().animate : {}}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="section-tag">about --profile</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold dev-heading mb-0">
            {t("about.title")}
          </h2>
          <div className="section-divider" />
          <p className="text-base sm:text-lg dev-muted max-w-2xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12 sm:mb-16">

          {/* Left: Bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="shell-panel card-glow p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 pb-4 border-b border-[var(--dev-border)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="terminal-title text-xs dev-muted ms-2">
                profile.md
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-base sm:text-lg dev-text leading-relaxed">
                {t("about.description")}
              </p>
              <div className="space-y-2.5 ps-4 border-s-2 border-[var(--color-primary)]/30">
                {[
                  "about.point1",
                  "about.point2",
                  "about.point3",
                  "about.point4",
                ].map((key) => (
                  <p key={key} className="dev-text text-sm leading-relaxed">
                    <span className="text-[var(--color-primary)] me-2 inline-block rtl:rotate-180">▸</span>
                    {t(key)}
                  </p>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[var(--dev-border)]">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="text-center p-3 rounded-xl border border-[var(--dev-border)] bg-[var(--dev-bg)]/50"
                >
                  <s.icon
                    size={18}
                    className="mx-auto mb-1.5"
                    style={{ color: s.color }}
                  />
                  <div
                    className="text-2xl font-bold"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <p className="text-xs dev-muted mt-0.5 leading-tight">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stack row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t("about.primaryStack"), value: t("about.stack") },
                { label: t("about.currentPositions"), value: t("about.roles") },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-[var(--dev-border)] bg-[var(--dev-bg)]/40"
                >
                  <div
                    className="text-xl font-bold mb-1 text-gradient-primary"
                  >
                    {item.value}
                  </div>
                  <p className="text-xs dev-muted leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Strength cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="shell-panel p-5 sm:p-6 rounded-2xl group transition-all duration-300"
                style={{
                  "--hover-glow": s.glow,
                } as React.CSSProperties}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${s.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <s.icon className="text-white" size={24} />
                </div>
                <h3 className="text-base font-bold dev-heading mb-2">
                  {t(s.titleKey)}
                </h3>
                <p className="dev-muted text-sm leading-relaxed">
                  {t(s.descKey)}
                </p>
                {/* Bottom accent */}
                <div
                  className={`mt-4 h-0.5 w-0 group-hover:w-full rounded-full bg-gradient-to-r ${s.gradient} transition-all duration-500`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Achievements row ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="shell-panel rounded-2xl p-6 sm:p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-7">
            <div className="w-9 h-9 bg-gradient-to-br from-[var(--color-primary)] to-[#0284c7] rounded-xl flex items-center justify-center shadow">
              <Award size={20} className="text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold dev-heading">
              {t("about.keyAchievements")}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.65 + i * 0.1 }}
                className="group flex gap-4 p-4 rounded-xl border border-[var(--dev-border)] bg-[var(--dev-bg)]/40 hover:border-[var(--color-primary)]/40 transition-all duration-300"
              >
                <div
                  className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${ach.color}18` }}
                >
                  <ach.icon size={18} style={{ color: ach.color }} />
                </div>
                <div>
                  <p className="dev-heading font-semibold text-sm mb-1">
                    {t(ach.titleKey)}
                  </p>
                  <p className="dev-muted text-xs sm:text-sm leading-relaxed">
                    {t(ach.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
