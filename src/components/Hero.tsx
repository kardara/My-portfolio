import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Command, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage, type Localized } from "../contexts/LanguageContext";
import { profile } from "../data/profile";
import { openCommandPalette, openCvViewer } from "../lib/events";
import { shapeNames } from "./ui/stageShapes";

const roles: Localized[] = [
  { en: "Software Developer @ AUCA", fr: "Développeur logiciel @ AUCA", ar: "مطور برمجيات @ AUCA" },
  { en: "MSIT student @ CMU-Africa", fr: "Étudiant MSIT @ CMU-Africa", ar: "طالب ماجستير @ CMU-Africa" },
  { en: "Full-stack & backend engineer", fr: "Ingénieur full-stack & back-end", ar: "مهندس تطبيقات متكاملة وخوادم" },
  { en: "Java · Spring Boot · Next.js", fr: "Java · Spring Boot · Next.js", ar: "Java · Spring Boot · Next.js" },
];

const ui = {
  hi: { en: "Hi, I'm", fr: "Salut, je suis", ar: "مرحباً، أنا" },
  explore: { en: "to explore", fr: "pour explorer", ar: "للاستكشاف" },
  terminal: { en: "Open terminal", fr: "Ouvrir le terminal", ar: "فتح الطرفية" },
  location: { en: "Kigali, Rwanda", fr: "Kigali, Rwanda", ar: "كيغالي، رواندا" },
  viewCV: { en: "View CV", fr: "Voir le CV", ar: "عرض السيرة الذاتية" },
};

/** How long each role line (and its matching 3D symbol) stays up. */
const TICK_MS = 2800;

/** Shared clock for the role ticker and the 3D stage; `advance` steps both and restarts the timer. */
const useHeroTick = () => {
  const [tick, setTick] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setTick((n) => n + 1), TICK_MS);
    return () => window.clearTimeout(id);
  }, [tick, reduce]);
  return { tick, advance: () => setTick((n) => n + 1) };
};

const RoleTicker: React.FC<{ tick: number }> = ({ tick }) => {
  const { tr } = useLanguage();
  const i = tick % roles.length;

  return (
    <div className="terminal-title text-base sm:text-lg md:text-xl flex items-center gap-2 h-8 overflow-hidden" aria-live="polite">
      <span className="text-secondary">&gt;</span>
      {/* old line slides out while the new one slides in, in step with the 3D morph */}
      <span className="relative inline-flex items-center h-8">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={i}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="dev-text whitespace-nowrap"
          >
            {tr(roles[i])}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="type-cursor" aria-hidden="true">▍</span>
    </div>
  );
};

/** Elements whose clicks should not morph the 3D (text you might select, links, the photo). */
/** Who I am at a glance: what a recruiter checks first. */
const credentials: { value: string; label: Localized }[] = [
  { value: "CMU-Africa", label: { en: "MSIT · AI & machine learning", fr: "MSIT · IA & apprentissage automatique", ar: "ماجستير · الذكاء الاصطناعي" } },
  { value: "AUCA", label: { en: "Software Developer", fr: "Développeur logiciel", ar: "مطور برمجيات" } },
  { value: "EN · FR · AR", label: { en: "Working languages", fr: "Langues de travail", ar: "لغات العمل" } },
];

const STAGE_IGNORE = "a, button, input, textarea, select, label, kbd, img, p, h1, span";

const PhotoCard: React.FC = () => {
  const { tr } = useLanguage();

  return (
    <div className="relative w-full max-w-sm mx-auto" dir="ltr">
      <div className="relative p-[1px] bg-gradient-to-br from-primary/60 via-line to-secondary/60 shadow-2xl">
        <div className="relative overflow-hidden bg-panel">
          <img
            src={profile.photo}
            alt={profile.name}
            width={716}
            height={1000}
            className="w-full aspect-[4/5] object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 px-2.5 py-1 bg-surface/80 backdrop-blur border border-line dev-text terminal-title text-xs">
            📍 {tr(ui.location)}
          </span>
        </div>
      </div>

      {/* Floating terminal */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute -bottom-12 -left-3 sm:-left-14 w-[14.5rem] sm:w-64 border border-line bg-surface/95 backdrop-blur shadow-2xl overflow-hidden"
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
          ].map(([line, cls]) => (
            <div key={line} className={cls}>
              {line}
            </div>
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
  const { tick, advance } = useHeroTick();
  const shapeIdx = tick % shapeNames.length;
  const shape = shapeNames[shapeIdx];
  const down = useRef({ x: 0, y: 0 });

  return (
    <section
      ref={sectionRef}
      id="home"
      data-stage-drag
      onPointerDown={(e) => (down.current = { x: e.clientX, y: e.clientY })}
      onClick={(e) => {
        // clicking empty space (not text, links or the photo) morphs the 3D; a drag also ends in a click, so skip those
        const moved = Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y);
        if (moved < 6 && !(e.target as Element).closest(STAGE_IGNORE)) advance();
      }}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-24"
    >
      {/* Stage for the background particle cloud (see Background3D): centred, behind the text and photo */}
      <div
        data-stage={shape}
        data-stage-main
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(88vw,560px)] aspect-square pointer-events-none"
      />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(var(--dev-grid-soft)_1px,transparent_1px),linear-gradient(90deg,var(--dev-grid-soft)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-40 end-[-10%] w-[36rem] h-[36rem] rounded-full blur-3xl bg-primary/15" />
        <div className="absolute bottom-[-20%] start-[-10%] w-[30rem] h-[30rem] rounded-full blur-3xl bg-accent/10" />
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-20 lg:gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-7">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
                className="terminal-title dev-muted text-base sm:text-lg mb-2"
              >
                {tr(ui.hi)}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-tight dev-heading"
              >
                {profile.name}
                <span className="text-secondary">.</span>
              </motion.h1>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <RoleTicker tick={tick} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="text-base sm:text-lg dev-text leading-relaxed max-w-xl"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow"
              >
                {t("hero.cta")}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>
              <button
                onClick={openCvViewer}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-line bg-panel dev-heading font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                <FileText size={18} />
                {tr(ui.viewCV)}
              </button>
              <button
                onClick={openCommandPalette}
                className="inline-flex items-center gap-2 px-3 py-2 dev-muted hover:text-ink text-sm transition-colors"
              >
                <span className="hidden sm:inline-flex items-center gap-1.5 terminal-title">
                  <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 border border-line bg-panel text-xs" dir="ltr">
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
              transition={{ delay: 0.24 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-5 border-t border-line max-w-xl"
            >
              {credentials.map((c) => (
                <div key={c.value}>
                  <span className="block text-base font-semibold dev-heading">{c.value}</span>
                  <span className="text-xs dev-muted">{tr(c.label)}</span>
                </div>
              ))}
              <div className="flex gap-2 basis-full">
                {[
                  { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
                  { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
                  { href: profile.github, Icon: Github, label: "GitHub" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="p-2.5 border border-line bg-panel dev-muted hover:text-primary hover:border-primary transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pb-10 lg:pb-0"
          >
            <PhotoCard />
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
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
