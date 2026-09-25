import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  CalendarPlus,
  MessageSquare,
  Send,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const googleCalendarLink =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Portfolio%20Meeting%20with%20Abdoulaye%20Zakaria&details=Hi%20Abdoulaye%2C%20I%20would%20like%20to%20schedule%20a%20meeting%20from%20your%20portfolio.&location=Google%20Meet&add=azdjerou@gmail.com";

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };
    const handleScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isLangOpen) return;
    const close = (e: PointerEvent) => {
      if (!langMenuRef.current?.contains(e.target as Node)) setIsLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsLangOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [isLangOpen]);

  useEffect(() => {
    document.body.style.overflow = isContactModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactModalOpen]);

  useEffect(() => {
    const openModal = () => setIsContactModalOpen(true);
    window.addEventListener("open-contact-modal", openModal);
    return () => window.removeEventListener("open-contact-modal", openModal);
  }, []);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/mzzgjpzr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(t("contact.success"), { position: "top-right" });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsContactModalOpen(false);
      } else {
        toast.error(t("contact.error"), { position: "top-right" });
      }
    } catch (error) {
      console.error("Contact submission failed:", error);
      toast.error(t("contact.errorLater"), { position: "top-right" });
    }
  };

  const navItems = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    { key: "experience.title", href: "#experience" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.skills", href: "#skills" },
    { key: "nav.contact", href: "#contact" },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ar", label: "AR" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--dev-bg)]/85 backdrop-blur-md border-b border-[var(--dev-border)]"
          : "bg-[var(--dev-bg)]/40 md:bg-transparent border-b md:border-b-0 border-[var(--dev-border)]/30 md:border-0"
      }`}
    >
      <nav className="container mx-auto px-3 sm:px-6 py-2.5 sm:py-4">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavClick("#home")}
            className="terminal-title text-[11px] sm:text-sm md:text-base font-semibold dev-muted cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap min-w-0"
          >
            <span className="max-[430px]:hidden">
              <span style={{ color: "var(--color-accent)" }}>azd</span>
              <span className="dev-muted">@portfolio:</span>
              <span style={{ color: "var(--color-primary)" }}>~</span>
              <span style={{ color: "var(--color-secondary)" }}>$</span>
            </span>
            <span className="hidden max-[430px]:inline">
              <span style={{ color: "var(--color-accent)" }}>azd</span>
              <span style={{ color: "var(--color-secondary)" }}>$</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  whileHover={{ y: -2 }}
                  className="terminal-title text-sm transition-all duration-300"
                  style={
                    isActive
                      ? { color: "var(--color-primary)", fontWeight: "600" }
                      : {}
                  }
                >
                  {t(item.key)}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="h-0.5 rounded-full mt-1"
                      style={{ background: "var(--color-primary)" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Theme Toggle, Language Selector */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--dev-panel)] border border-[var(--dev-border)] dev-text text-xs terminal-title"
              >
                <MessageSquare size={15} />
                {t("header.quickContact")}
              </motion.button>
              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-secondary)] text-[#0b1220] font-semibold text-xs terminal-title"
              >
                <CalendarPlus size={15} />
                {t("header.schedule")}
              </motion.a>
            </div>

            {/* Language Selector */}
            <div ref={langMenuRef} className="relative hidden sm:block">
              <button
                onClick={() => setIsLangOpen((open) => !open)}
                aria-label={t("header.language")}
                aria-haspopup="menu"
                aria-expanded={isLangOpen}
                className="flex items-center gap-1 dev-text transition-colors hover:text-[var(--color-primary)]"
              >
                <Globe size={20} />
                <span className="text-sm font-medium">
                  {language.toUpperCase()}
                </span>
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full end-0 mt-2 min-w-[5rem] bg-[var(--dev-panel)] border border-[var(--dev-border)] rounded-lg shadow-lg overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        role="menuitem"
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`block w-full text-start px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#21262d] ${
                          language === lang.code
                            ? "text-[var(--color-primary)] font-semibold"
                            : "dev-text"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label={t("header.toggleTheme")}
              className="p-2 rounded-lg bg-[var(--dev-panel)] border border-[var(--dev-border)] dev-text"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t("header.menu")}
              aria-expanded={isMenuOpen}
              className="md:hidden p-2 rounded-lg bg-[var(--dev-panel)] border border-[var(--dev-border)] dev-text"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          className="md:hidden overflow-hidden bg-[var(--dev-bg)] border-t border-[var(--dev-border)]"
        >
          <div className="px-4 pt-4 pb-4 space-y-2">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.button
                  key={item.key}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-start px-3 py-2.5 rounded-lg transition-all duration-200 terminal-title font-medium`}
                  style={
                    isActive
                      ? {
                          backgroundColor: "var(--color-primary)",
                          color: "#0d1117",
                          fontWeight: "600",
                        }
                      : {
                          backgroundColor: "var(--dev-panel)",
                          color: "var(--dev-text)",
                          border: "1px solid var(--dev-border)",
                        }
                  }
                >
                  {t(item.key)}
                </motion.button>
              );
            })}
            <div className="pt-3 grid grid-cols-1 gap-2">
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setLanguage(lang.code)}
                    className="py-2 rounded-lg terminal-title text-sm font-semibold border transition-all duration-200"
                    style={
                      language === lang.code
                        ? {
                            backgroundColor: "var(--color-primary)",
                            color: "#0d1117",
                            borderColor: "var(--color-primary)",
                          }
                        : {
                            backgroundColor: "var(--dev-panel)",
                            color: "var(--dev-text)",
                            borderColor: "var(--dev-border)",
                          }
                    }
                  >
                    {lang.label}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[var(--dev-panel)] border border-[var(--dev-border)] terminal-title text-sm font-semibold dev-text transition-all duration-200 hover:bg-[var(--dev-border)]"
              >
                <MessageSquare size={16} />
                {t("header.quickContact")}
              </motion.button>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[var(--color-secondary)] text-[#0b1220] terminal-title text-sm font-semibold transition-all duration-200 hover:opacity-90"
              >
                <CalendarPlus size={16} />
                {t("header.scheduleMeeting")}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </nav>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isContactModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              >
                <button
                  aria-label="Close contact form"
                  className="absolute inset-0 bg-black/55"
                  onClick={() => setIsContactModalOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  className="relative w-full max-w-2xl shell-panel rounded-2xl p-5 sm:p-7"
                >
                  <button
                    aria-label="Close"
                    onClick={() => setIsContactModalOpen(false)}
                    className="absolute top-4 end-4 p-2 rounded-md border border-[var(--dev-border)] dev-muted hover:text-[var(--color-primary)]"
                  >
                    <X size={16} />
                  </button>

                  <div className="mb-5 sm:mb-6 pe-10">
                    <p className="terminal-title text-xs dev-muted mb-2">
                      {t("header.quickFormTag")}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold dev-heading mb-2">
                      {t("contact.sendMessage")}
                    </h3>
                    <p className="dev-muted text-sm sm:text-base">
                      {t("header.modalDescription")}
                    </p>
                  </div>

                  <form
                    onSubmit={handleContactSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium dev-muted mb-2">
                          {t("contact.name")}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 bg-[var(--dev-bg)] border border-[var(--dev-border)] rounded-lg dev-text"
                          placeholder={t("contact.placeholderName")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium dev-muted mb-2">
                          {t("contact.email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 bg-[var(--dev-bg)] border border-[var(--dev-border)] rounded-lg dev-text"
                          placeholder={t("contact.placeholderEmail")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium dev-muted mb-2">
                        {t("contact.subject")}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--dev-bg)] border border-[var(--dev-border)] rounded-lg dev-text"
                        placeholder={t("contact.placeholderSubject")}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium dev-muted mb-2">
                        {t("contact.message")}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-[var(--dev-bg)] border border-[var(--dev-border)] rounded-lg dev-text resize-none"
                        placeholder={t("contact.placeholderMessage")}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[var(--color-accent)] text-white font-semibold"
                      >
                        <Send size={18} />
                        {t("contact.send")}
                      </motion.button>
                      <motion.a
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        href={googleCalendarLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[var(--color-secondary)] text-[#0b1220] font-semibold"
                      >
                        <CalendarPlus size={18} />
                        {t("header.scheduleMeeting")}
                      </motion.a>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.header>
  );
};

export default Header;
