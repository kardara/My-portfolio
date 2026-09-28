import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: t("nav.home"), id: "home" },
    { label: t("nav.about"), id: "about" },
    { label: t("nav.journey"), id: "journey" },
    { label: t("nav.projects"), id: "projects" },
    { label: t("nav.skills"), id: "skills" },
    { label: t("nav.contact"), id: "contact" },
  ];

  const socials = [
    {
      icon: Github,
      href: "https://github.com/kardara",
      label: "GitHub",
      color: "hover:text-white",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/abdoulaye-zakaria-djerou-022613327",
      label: "LinkedIn",
      color: "hover:text-[#58a6ff]",
    },
    {
      icon: Mail,
      href: "mailto:azdjerou@gmail.com",
      label: "Email",
      color: "hover:text-[#e95420]",
    },
  ];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--dev-bg)" }}
    >
      {/* Gradient top border */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #58a6ff 30%, #3fb950 60%, transparent 100%)",
        }}
      />

      {/* Subtle background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(88,166,255,0.06) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* ── Main footer body ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-12 pb-8"
        >
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-10">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="terminal-title text-2xl font-bold">
                <span style={{ color: "#e95420" }}>azd</span>
                <span className="dev-muted">@portfolio:</span>
                <span style={{ color: "#58a6ff" }}>~</span>
                <span style={{ color: "#3fb950" }}>$</span>
              </div>
              <p className="dev-muted text-sm leading-relaxed max-w-xs">
                {t("footer.profileSummary")}
              </p>
              {/* Social links */}
              <div className="flex gap-3 pt-1">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center dev-muted border border-line bg-panel transition-all duration-200 ${s.color} hover:border-current`}
                  >
                    <s.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation column */}
            <div className="space-y-4">
              <p className="terminal-title text-xs dev-muted tracking-widest uppercase">
                {t("footer.quickLinksTag")}
              </p>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-start text-sm dev-muted hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs">
                      ›
                    </span>
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact column */}
            <div className="space-y-4">
              <p className="terminal-title text-xs dev-muted tracking-widest uppercase">
                {t("footer.directContactTag")}
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:azdjerou@gmail.com"
                  className="flex items-center gap-2 text-sm dev-muted hover:text-primary transition-colors"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  azdjerou@gmail.com
                </a>
                <motion.a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Portfolio%20Meeting%20with%20Abdoulaye%20Zakaria&details=Hi%20Abdoulaye%2C%20I%20would%20like%20to%20schedule%20a%20meeting%20from%20your%20portfolio.&location=Google%20Meet&add=azdjerou@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "var(--color-secondary)",
                    color: "#0b1220",
                  }}
                >
                  {t("footer.scheduleMeeting")}
                </motion.a>

                {/* Status indicator */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--color-secondary)" }}
                    />
                    <div
                      className="absolute inset-0 rounded-full ping-dot"
                      style={{ background: "var(--color-secondary)" }}
                    />
                  </div>
                  <span className="terminal-title text-xs dev-muted">
                    {t("footer.available")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="w-full h-px mb-7"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--dev-border), transparent)",
            }}
          />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="terminal-title dev-muted text-xs text-center sm:text-start">
              © {currentYear} Abdoulaye Zakaria Djerou.{" "}
              {t("footer.rights")}{" "}
            </p>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-line bg-panel dev-text hover:border-primary hover:text-primary transition-all duration-200"
            >
              <ArrowUp size={15} />
              {t("footer.backToTop")}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
