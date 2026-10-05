import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, MessageSquare, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage, type Language, type Localized } from "../contexts/LanguageContext";
import { openCommandPalette } from "../lib/events";
import { openContactModal } from "../lib/events";

const navItems: { id: string; label: Localized }[] = [
  { id: "about", label: { en: "About", fr: "À propos", ar: "نبذة" } },
  { id: "journey", label: { en: "Journey", fr: "Parcours", ar: "المسيرة" } },
  { id: "projects", label: { en: "Projects", fr: "Projets", ar: "المشاريع" } },
  { id: "skills", label: { en: "Skills", fr: "Compétences", ar: "المهارات" } },
  { id: "contact", label: { en: "Contact", fr: "Contact", ar: "التواصل" } },
];

const languages: { code: Language; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "ar", label: "AR", name: "العربية" },
];

const ui = {
  talk: { en: "Let's talk", fr: "Discutons", ar: "لنتحدث" },
  search: { en: "Search or run a command", fr: "Rechercher ou lancer une commande", ar: "ابحث أو نفّذ أمراً" },
};

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [langOpen, setLangOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, tr } = useLanguage();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      let current = "home";
      document.querySelectorAll("section[id]").forEach((s) => {
        if (s.getBoundingClientRect().top <= 160) current = s.id;
      });
      // "now" lives inside the about area
      setActive(current === "now" ? "about" : current === "testimonials" ? "skills" : current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = (e: PointerEvent) => !langRef.current?.contains(e.target as Node) && setLangOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  const pill = hovered ?? active;

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 pt-3"
    >
      <nav
        className={`mx-auto max-w-6xl flex items-center gap-2 px-3 sm:px-4 py-2 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-surface/80 backdrop-blur-xl border border-line shadow-lg shadow-black/5"
            : "bg-transparent border border-transparent"
        }`}
      >
        <button onClick={() => go("home")} className="terminal-title text-sm sm:text-base font-semibold whitespace-nowrap" dir="ltr" aria-label="Home">
          <span className="text-accent">azd</span>
          <span className="dev-muted max-[380px]:hidden">@portfolio:</span>
          <span className="text-primary">~</span>
          <span className="text-secondary">$</span>
          <span className="type-cursor !ms-0.5">_</span>
        </button>

        {/* Desktop nav with sliding pill */}
        <ul className="hidden md:flex items-center mx-auto" onMouseLeave={() => setHovered(null)}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative px-3.5 py-1.5 text-sm transition-colors ${
                  active === item.id ? "text-primary font-semibold" : "dev-text hover:text-heading"
                }`}
              >
                {pill === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative">{tr(item.label)}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2 ms-auto md:ms-0">
          <button
            onClick={openCommandPalette}
            aria-label={tr(ui.search)}
            title={tr(ui.search)}
            className="hidden sm:inline-flex items-center gap-2 h-9 px-2.5 border border-line bg-panel dev-muted hover:text-ink hover:border-primary/50 transition-colors"
          >
            <Search size={15} />
            <kbd className="terminal-title text-[10px] lg:inline hidden" dir="ltr">⌘K</kbd>
          </button>

          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-label={t("header.language")}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              className="inline-flex items-center gap-1 h-9 px-2.5 border border-line bg-panel dev-text hover:text-primary transition-colors"
            >
              <Globe size={16} />
              <span className="text-xs font-semibold terminal-title">{language.toUpperCase()}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full end-0 mt-2 w-40 p-1 bg-surface border border-line shadow-xl"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      role="menuitemradio"
                      aria-checked={language === l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-primary/10 ${
                        language === l.code ? "text-primary font-semibold" : "dev-text"
                      }`}
                    >
                      {l.name}
                      <span className="terminal-title text-[10px] dev-muted">{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleTheme}
            aria-label={t("header.toggleTheme")}
            className="relative grid place-items-center w-9 h-9 border border-line bg-panel dev-text hover:text-primary overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ y: 14, rotate: -90, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -14, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <motion.button
            onClick={openContactModal}
            className="hidden md:inline-flex items-center gap-2 h-9 px-3.5 bg-accent text-white text-sm font-semibold hover:opacity-90"
          >
            <MessageSquare size={15} />
            {tr(ui.talk)}
          </motion.button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t("header.menu")}
            aria-expanded={menuOpen}
            className="md:hidden grid place-items-center w-9 h-9 border border-line bg-panel dev-text"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-6xl mt-2 border border-line bg-surface/95 backdrop-blur-xl p-3 shadow-xl"
          >
            <motion.ul initial="hidden" animate="show" transition={{ staggerChildren: 0.04 }} className="space-y-1">
              {navItems.map((item, i) => (
                <motion.li key={item.id} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                  <button
                    onClick={() => go(item.id)}
                    className={`flex w-full items-center gap-3 px-3 py-3 text-start ${
                      active === item.id ? "bg-primary/10 text-primary font-semibold" : "dev-text"
                    }`}
                  >
                    <span className="terminal-title text-xs dev-muted">0{i + 1}</span>
                    {tr(item.label)}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-line">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openCommandPalette();
                }}
                className="inline-flex items-center justify-center gap-2 py-3 border border-line bg-panel dev-text text-sm terminal-title"
              >
                <Search size={15} /> $ terminal
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openContactModal();
                }}
                className="inline-flex items-center justify-center gap-2 py-3 bg-accent text-white text-sm font-semibold"
              >
                <MessageSquare size={15} /> {tr(ui.talk)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
