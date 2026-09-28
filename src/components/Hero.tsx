import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, Command, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage, type Localized } from "../contexts/LanguageContext";
import { profile, stats } from "../data/profile";
import Counter from "./ui/Counter";
import Magnetic from "./ui/Magnetic";
import { openCommandPalette, openCvViewer } from "../lib/events";

const roles: Localized[] = [
  { en: "Software Developer @ AUCA", fr: "Développeur logiciel @ AUCA", ar: "مطور برمجيات @ AUCA" },
  { en: "MSIT student @ CMU-Africa", fr: "Étudiant MSIT @ CMU-Africa", ar: "طالب ماجستير @ CMU-Africa" },
  { en: "Full-stack & backend engineer", fr: "Ingénieur full-stack & back-end", ar: "مهندس تطبيقات متكاملة وخوادم" },
  { en: "Java · Spring Boot · Next.js", fr: "Java · Spring Boot · Next.js", ar: "Java · Spring Boot · Next.js" },
];

const ui = {
  hi: { en: "Hi, I'm", fr: "Salut, je suis", ar: "مرحباً، أنا" },
  languagesStat: { en: "Languages spoken", fr: "Langues parlées", ar: "لغات أتحدثها" },
  explore: { en: "to explore", fr: "pour explorer", ar: "للاستكشاف" },
  terminal: { en: "Open terminal", fr: "Ouvrir le terminal", ar: "فتح الطرفية" },
  location: { en: "Kigali, Rwanda", fr: "Kigali, Rwanda", ar: "كيغالي، رواندا" },
  available: { en: "available", fr: "disponible", ar: "متاح" },
  viewCV: { en: "View CV", fr: "Voir le CV", ar: "عرض السيرة الذاتية" },
};

const nameWord = {
  hidden: { opacity: 0, y: "0.5em", rotateX: -40 },
  show: { opacity: 1, y: "0em", rotateX: 0 },
};

const RoleTicker: React.FC = () => {
  const { tr } = useLanguage();
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % roles.length), 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="terminal-title text-base sm:text-lg md:text-xl flex items-center gap-2 h-8 overflow-hidden" aria-live="polite">
      <span className="text-secondary">&gt;</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="dev-text whitespace-nowrap"
        >
          {tr(roles[i])}
        </motion.span>
      </AnimatePresence>
      <span className="type-cursor" aria-hidden="true">▍</span>
    </div>
  );
};

const PhotoCard: React.FC = () => {
  const { tr } = useLanguage();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), spring);
  const glare = useTransform(
    [rawX, rawY],
    ([x, y]) =>
      `radial-gradient(circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(255,255,255,0.12), transparent 55%)`,
  );

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ perspective: 1200 }} dir="ltr">
      <motion.div
        style={{ rotateX, rotateY }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          rawX.set((e.clientX - r.left) / r.width - 0.5);
          rawY.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          rawX.set(0);
          rawY.set(0);
        }}
        className="relative rounded-3xl p-[1px] bg-gradient-to-br from-primary/60 via-line to-secondary/60 shadow-2xl"
      >
        <div className="relative rounded-3xl overflow-hidden bg-panel">
          <img
            src={profile.photo}
            alt={profile.name}
            width={716}
            height={1000}
            className="w-full aspect-[4/5] object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: glare }} />
          <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur border border-line dev-text terminal-title text-xs">
            📍 {tr(ui.location)}
          </span>
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur border border-secondary/40 text-secondary terminal-title text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            {tr(ui.available)}
          </span>
        </div>
      </motion.div>

      {/* Floating terminal */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-12 -left-3 sm:-left-14 w-[14.5rem] sm:w-64 rounded-xl border border-line bg-surface/95 backdrop-blur shadow-2xl overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <span className="terminal-title text-[10px] dev-muted ms-1">zsh</span>
        </div>
        <div className="px-3 py-2.5 terminal-title text-[11px] leading-relaxed">
          {[
            ["$ whoami", "dev-muted"],
            ["developer · student · mentor", "dev-heading"],
            ["$ route", "dev-muted"],
            ["n'djamena 🇹🇩 → kigali 🇷🇼", "text-primary"],
            ["$ speaks", "dev-muted"],
            ["en · fr · ar", "text-secondary"],
          ].map(([line, cls], i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 + i * 0.18 }}
              className={cls}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Hero: React.FC = () => {
  const { t, tr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
  const words = profile.name.split(" ");
  const last = words[words.length - 1];

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-24">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(var(--dev-grid-soft)_1px,transparent_1px),linear-gradient(90deg,var(--dev-grid-soft)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-40 end-[-10%] w-[36rem] h-[36rem] rounded-full blur-3xl bg-primary/15" />
        <div className="absolute bottom-[-20%] start-[-10%] w-[30rem] h-[30rem] rounded-full blur-3xl bg-accent/10" />
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-20 lg:gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-sm"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-secondary ping-dot" />
                <span className="relative w-2 h-2 rounded-full bg-secondary" />
              </span>
              <span className="font-medium text-secondary">{t("hero.openRoles")}</span>
            </motion.div>

            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="terminal-title dev-muted text-base sm:text-lg mb-2"
              >
                {tr(ui.hi)}
              </motion.p>
              <motion.h1
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.09, delayChildren: 0.2 }}
                className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-tight dev-heading"
                style={{ perspective: 600 }}
                aria-label={profile.name}
              >
                {words.map((w, i) => (
                  <motion.span
                    key={w}
                    variants={nameWord}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-block ${w === last ? "" : "me-[0.25em]"}`}
                    aria-hidden="true"
                  >
                    {w}
                    {i === words.length - 1 && <span className="text-secondary">.</span>}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <RoleTicker />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-base sm:text-lg dev-text leading-relaxed max-w-xl"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow"
                >
                  {t("hero.cta")}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={openCvViewer}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-line bg-panel dev-heading font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  <FileText size={18} />
                  {tr(ui.viewCV)}
                </button>
              </Magnetic>
              <button
                onClick={openCommandPalette}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg dev-muted hover:text-ink text-sm transition-colors"
              >
                <span className="hidden sm:inline-flex items-center gap-1.5 terminal-title">
                  <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-line bg-panel text-xs" dir="ltr">
                    {isMac ? <Command size={11} /> : "Ctrl"} K
                  </kbd>
                  {tr(ui.explore)}
                </span>
                <span className="sm:hidden terminal-title">$ {tr(ui.terminal)}</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-5 border-t border-line max-w-xl"
            >
              {[
                { to: stats.projects, suffix: "+", label: t("hero.projectsStat"), color: "text-primary" },
                { to: stats.roles, label: t("hero.activeRolesStat"), color: "text-secondary" },
                { to: stats.languages, label: tr(ui.languagesStat), color: "text-accent" },
              ].map((s) => (
                <div key={s.label}>
                  <Counter to={s.to} suffix={s.suffix} className={`block text-3xl font-bold terminal-title ${s.color}`} />
                  <span className="text-xs dev-muted">{s.label}</span>
                </div>
              ))}
              <div className="flex gap-2 sm:ms-auto">
                {[
                  { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
                  { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
                  { href: profile.github, Icon: Github, label: "GitHub" },
                ].map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className="p-2.5 rounded-xl border border-line bg-panel dev-muted hover:text-primary hover:border-primary transition-colors"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pb-10 lg:pb-0"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <PhotoCard />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 dev-muted hover:text-primary terminal-title text-xs"
      >
        {t("hero.scrollNext")}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default Hero;
