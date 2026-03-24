import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { label: t("nav.home"), id: "home" },
    { label: t("nav.projects"), id: "projects" },
    { label: t("nav.skills"), id: "skills" },
    { label: t("nav.contact"), id: "contact" },
  ];

  return (
    <footer className="py-10 sm:py-12 border-t border-[var(--dev-border)] bg-[var(--dev-bg)] dev-text">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <p className="terminal-title text-xs dev-muted">
                exit --portfolio
              </p>
              <h3 className="text-xl sm:text-2xl font-bold dev-heading">
                Abdoulaye Zakaria Djerou
              </h3>
              <p className="dev-muted text-sm sm:text-base">
                {t("footer.profileSummary")}
              </p>
            </div>

            <div className="space-y-3">
              <p className="terminal-title text-xs dev-muted">
                {t("footer.quickLinksTag")}
              </p>
              <div className="flex flex-wrap gap-2">
                {footerLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() =>
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="px-3 py-1.5 rounded-lg border border-[var(--dev-border)] terminal-title text-xs dev-text hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="terminal-title text-xs dev-muted">
                {t("footer.directContactTag")}
              </p>
              <a
                href="mailto:azdjerou@gmail.com"
                className="block text-sm sm:text-base dev-text hover:text-[var(--color-primary)] transition-colors"
              >
                azdjerou@gmail.com
              </a>
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Portfolio%20Meeting%20with%20Abdoulaye%20Zakaria&details=Hi%20Abdoulaye%2C%20I%20would%20like%20to%20schedule%20a%20meeting%20from%20your%20portfolio.&location=Google%20Meet&add=azdjerou@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-[#0b1220] font-semibold text-sm"
              >
                {t("footer.scheduleMeeting")}
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--dev-border)] to-transparent"></div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="terminal-title dev-muted text-xs">
              © {currentYear} Abdoulaye Zakaria Djerou. {t("footer.rights")}
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300"
            >
              {t("footer.backToTop")}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
