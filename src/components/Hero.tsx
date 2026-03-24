import React from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  Mail,
  Linkedin,
  Github,
  Code2,
  Zap,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  const greetingPrefix = language === "en" ? "Hi, I'm" : t("hero.greeting");
  const fullName = t("hero.name");
  const fullHeadline = `${greetingPrefix} ${fullName}`;
  const [typedHeadline, setTypedHeadline] = React.useState("");

  React.useEffect(() => {
    setTypedHeadline("");
    let index = 0;
    const typingSpeed = 78;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedHeadline(fullHeadline.slice(0, index));

      if (index >= fullHeadline.length) {
        window.clearInterval(timer);
      }
    }, typingSpeed);

    return () => {
      window.clearInterval(timer);
    };
  }, [fullHeadline]);

  const greetingWithSpace = `${greetingPrefix} `;
  const typedGreeting = typedHeadline.slice(
    0,
    Math.min(typedHeadline.length, greetingWithSpace.length),
  );
  const typedName =
    typedHeadline.length > greetingWithSpace.length
      ? typedHeadline.slice(greetingWithSpace.length)
      : "";

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Zakaria_CV.pdf";
    link.download = "CV-Abdoulaye-Zakaria-Djerou.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-72px)] flex items-start justify-center relative overflow-hidden pt-8 sm:pt-10 md:pt-12"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(139,148,158,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(139,148,158,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
        <motion.div
          className="absolute top-12 -right-24 w-96 h-96 bg-gradient-to-br from-[#58a6ff] to-transparent rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 -left-20 w-72 h-72 bg-gradient-to-tr from-[#e95420] to-transparent rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`space-y-6 sm:space-y-8 ${language === "ar" ? "text-right" : "text-left"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--dev-border)] bg-[var(--dev-panel)] terminal-title"
            >
              <Zap size={16} className="text-[var(--color-secondary)]" />
              <span className="text-sm font-semibold dev-text">
                {t("hero.openRoles")}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight dev-heading"
            >
              <span>{typedGreeting}</span>
              <span className="bg-gradient-to-r from-[#58a6ff] via-[#79c0ff] to-[#3fb950] bg-clip-text text-transparent">
                {typedName}
              </span>
              <span className="type-cursor" aria-hidden="true">
                |
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="terminal-title text-base sm:text-lg md:text-xl dev-muted font-semibold flex items-center gap-2"
            >
              <Code2
                size={20}
                className="text-[var(--color-primary)] sm:w-6 sm:h-6"
              />
              {t("hero.title")}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-base sm:text-lg dev-text leading-relaxed max-w-xl"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="shell-panel px-4 sm:px-6 py-4 sm:py-5"
            >
              <p className="terminal-title text-sm dev-muted mb-4 terminal-dots">
                {t("hero.summaryLabel")}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
                    10+
                  </div>
                  <p className="text-sm dev-muted">{t("hero.projectsStat")}</p>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[var(--color-secondary)]">
                    3
                  </div>
                  <p className="text-sm dev-muted">
                    {t("hero.activeRolesStat")}
                  </p>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[var(--color-accent)]">
                    5+
                  </div>
                  <p className="text-sm dev-muted">
                    {t("hero.certificationsStat")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[var(--color-accent)] text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
              >
                {t("hero.cta")}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[#0d1117] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download size={20} />
                {t("hero.downloadCV")}
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="flex gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:azdjerou@gmail.com"
                title="Email"
                className="p-3 sm:p-4 bg-[var(--dev-panel)] border border-[var(--dev-border)] rounded-xl dev-muted hover:text-[#58a6ff] transition-all duration-300"
              >
                <Mail size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/abdoulaye-zakaria-djerou-022613327"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-3 sm:p-4 bg-[var(--dev-panel)] border border-[var(--dev-border)] rounded-xl dev-muted hover:text-[#58a6ff] transition-all duration-300"
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/kardara"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-3 sm:p-4 bg-[var(--dev-panel)] border border-[var(--dev-border)] rounded-xl dev-muted hover:text-[#58a6ff] transition-all duration-300"
              >
                <Github size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center mt-4 sm:mt-6 lg:mt-8"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="shell-panel p-4 sm:p-6 w-full max-w-sm sm:max-w-md"
            >
              <p className="terminal-title text-xs dev-muted mb-4 terminal-dots">
                {t("hero.systemStatus")}
              </p>
              <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[var(--dev-border)]">
                <img
                  src="/pic2.jpg"
                  alt="Abdoulaye Zakaria Djerou"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 terminal-title text-[11px] sm:text-xs">
                <div className="rounded-lg border border-[var(--dev-border)] bg-gray-100 dark:bg-[#0d1117] px-3 py-2 text-[var(--color-primary)]">
                  {t("hero.roleEngineer")}
                </div>
                <div className="rounded-lg border border-[var(--dev-border)] bg-gray-100 dark:bg-[#0d1117] px-3 py-2 text-[var(--color-secondary)]">
                  {t("hero.statusAvailable")}
                </div>
                <div className="rounded-lg border border-[var(--dev-border)] bg-gray-100 dark:bg-[#0d1117] px-3 py-2 text-[var(--color-accent)]">
                  {t("hero.locationLabel")}
                </div>
                <div className="rounded-lg border border-[var(--dev-border)] bg-gray-100 dark:bg-[#0d1117] px-3 py-2 dev-text">
                  {t("hero.focusLabel")}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center dev-muted cursor-pointer"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="terminal-title text-xs mb-2">
              {t("hero.scrollNext")}
            </span>
            <ChevronDown size={26} className="text-[var(--color-primary)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
