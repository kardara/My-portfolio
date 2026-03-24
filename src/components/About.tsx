import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Users, Brain, Target, Zap, Award } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const strengths = [
    {
      icon: Code,
      title: "Full-Stack Expertise",
      description:
        "Expert in modern JavaScript frameworks, backend technologies, and database design",
      color: "from-[var(--color-primary)] to-[#0284c7]",
    },
    {
      icon: Users,
      title: "Team Leadership",
      description:
        "Lead Software Engineer with mentorship experience and Agile workflow expertise",
      color: "from-[var(--color-secondary)] to-[#15803d]",
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description:
        "Strong analytical skills with focus on scalable, reliable, and secure solutions",
      color: "from-[var(--color-accent)] to-[#dc2626]",
    },
    {
      icon: Target,
      title: "Community Focus",
      description:
        "Passionate about creating technology that serves and empowers communities",
      color: "from-[#f59e0b] to-[var(--color-accent)]",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="terminal-title text-xs dev-muted mb-3">about --profile</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold dev-heading mb-4">
            {t("about.title")}
          </h2>
          <div className="h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/60 mx-auto mb-4 w-20 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl dev-muted max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 shell-panel p-5 sm:p-8"
          >
            <div className="space-y-6">
              <p className="text-base sm:text-lg dev-text leading-relaxed">
                {t("about.description")}
              </p>

              <div className="space-y-3">
                <p className="dev-text">{t("about.point1")}</p>
                <p className="dev-text">{t("about.point2")}</p>
                <p className="dev-text">{t("about.point3")}</p>
                <p className="dev-text">{t("about.point4")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[var(--dev-border)]">
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, var(--color-primary), #0284c7)'}}>
                  Java, React, Node.js
                </div>
                <p className="text-sm dev-muted mt-2">
                  {t("about.primaryStack")}
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, var(--color-primary), #0284c7)'}}>
                  4 Roles
                </div>
                <p className="text-sm dev-muted mt-2">
                  {t("about.currentPositions")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="shell-panel p-5 sm:p-6 rounded-2xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${strength.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <strength.icon className="text-white" size={28} />
                </div>
                <h3 className="text-base sm:text-lg font-bold dev-heading mb-2">
                  {strength.title}
                </h3>
                <p className="dev-muted text-sm leading-relaxed">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="shell-panel rounded-3xl p-6 sm:p-8 md:p-12"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Award size={28} style={{color: 'var(--color-primary)'}} />
            <h3 className="text-2xl sm:text-3xl font-bold dev-heading">
              {t("about.keyAchievements")}
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
            <div className="space-y-2">
              <p className="dev-heading font-semibold flex items-center gap-2">
                <Zap
                  size={20}
                  style={{color: 'var(--color-primary)'}}
                />
                {t("about.achievement1Title")}
              </p>
              <p className="dev-muted text-sm">
                {t("about.achievement1Desc")}
              </p>
            </div>
            <div className="space-y-2">
              <p className="dev-heading font-semibold flex items-center gap-2">
                <Users
                  size={20}
                  style={{color: 'var(--color-primary)'}}
                />
                {t("about.achievement2Title")}
              </p>
              <p className="dev-muted text-sm">
                {t("about.achievement2Desc")}
              </p>
            </div>
            <div className="space-y-2">
              <p className="dev-heading font-semibold flex items-center gap-2">
                <Brain
                  size={20}
                  style={{color: 'var(--color-primary)'}}
                />
                {t("about.achievement3Title")}
              </p>
              <p className="dev-muted text-sm">
                {t("about.achievement3Desc")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
