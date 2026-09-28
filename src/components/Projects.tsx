import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Lock,
  Star,
  X,
} from "lucide-react";
import { useLanguage, type Localized } from "../contexts/LanguageContext";
import { categoryLabels, projects, type Project, type ProjectCategory } from "../data/projects";
import SectionHeading from "./ui/SectionHeading";
import GitHubActivity from "./GitHubActivity";

const ui = {
  title: { en: "Selected Work", fr: "Projets choisis", ar: "أعمال مختارة" },
  subtitle: {
    en: "Client sites, university systems, and a hardware experiment or two. Open any card for the full story.",
    fr: "Sites clients, systèmes universitaires et quelques expériences matérielles. Ouvrez une carte pour l'histoire complète.",
    ar: "مواقع لعملاء وأنظمة جامعية وبعض التجارب على العتاد. افتح أي بطاقة لقراءة القصة كاملة.",
  },
  caseStudy: { en: "Read case study", fr: "Lire l'étude de cas", ar: "اقرأ دراسة الحالة" },
  challenge: { en: "The challenge", fr: "Le défi", ar: "التحدي" },
  approach: { en: "The approach", fr: "L'approche", ar: "النهج" },
  role: { en: "My role", fr: "Mon rôle", ar: "دوري" },
  highlights: { en: "Highlights", fr: "Points forts", ar: "أبرز النقاط" },
  stack: { en: "Built with", fr: "Technologies", ar: "التقنيات" },
  live: { en: "Visit live site", fr: "Voir le site", ar: "زيارة الموقع" },
  code: { en: "Source code", fr: "Code source", ar: "الشيفرة المصدرية" },
  private: { en: "Private repository", fr: "Dépôt privé", ar: "مستودع خاص" },
  featured: { en: "Featured", fr: "À la une", ar: "مميز" },
  close: { en: "Close", fr: "Fermer", ar: "إغلاق" },
  prev: { en: "Previous project", fr: "Projet précédent", ar: "المشروع السابق" },
  next: { en: "Next project", fr: "Projet suivant", ar: "المشروع التالي" },
} satisfies Record<string, Localized>;

const logoSlug: Record<string, string> = {
  React: "react",
  TypeScript: "typescript",
  "Next.js": "nextdotjs",
  Vite: "vite",
  "Framer Motion": "framer",
  "React Router": "reactrouter",
  "Tailwind CSS": "tailwindcss",
  "Radix UI": "radixui",
  Flutter: "flutter",
  Dart: "dart",
  Arduino: "arduino",
  "C++": "cplusplus",
  BLE: "bluetooth",
  Java: "openjdk",
  MySQL: "mysql",
  PHP: "php",
  JavaScript: "javascript",
  Bootstrap: "bootstrap",
  SQLite: "sqlite",
};

const TechChip: React.FC<{ name: string; small?: boolean }> = ({ name, small }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-md border border-line bg-surface/60 dev-text ${
      small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
    }`}
  >
    {logoSlug[name] && (
      <img
        src={`https://cdn.simpleicons.org/${logoSlug[name]}`}
        alt=""
        loading="lazy"
        className={small ? "w-3 h-3" : "w-3.5 h-3.5"}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    )}
    {name}
  </span>
);

/** Screenshot, or a generated cover for projects without one. */
const ProjectCover: React.FC<{ project: Project; className?: string }> = ({ project, className }) =>
  project.image ? (
    <img
      src={project.image}
      alt=""
      loading="lazy"
      className={`w-full h-full object-cover object-top ${className ?? ""}`}
    />
  ) : (
    <div
      className={`relative w-full h-full overflow-hidden ${className ?? ""}`}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, ${project.accent}55, transparent 60%), radial-gradient(90% 80% at 100% 100%, ${project.accent}33, transparent 60%), var(--dev-bg)`,
      }}
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(139,148,158,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(139,148,158,0.15)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 terminal-title" dir="ltr">
        <span className="text-[11px] dev-muted">~/projects/{project.id}</span>
        <span className="text-2xl sm:text-3xl font-bold" style={{ color: project.accent }}>
          {project.stack.slice(0, 2).join(" + ")}
        </span>
      </div>
    </div>
  );

const ProjectCard: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => {
  const { tr } = useLanguage();
  return (
    <motion.article
      layout
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={`group shell-panel !rounded-2xl flex flex-col cursor-pointer ${
        project.featured ? "lg:col-span-2" : ""
      }`}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
      tabIndex={0}
      role="button"
      aria-label={`${project.title}: ${tr(ui.caseStudy)}`}
    >
      <motion.div
        layoutId={`cover-${project.id}`}
        className={`relative overflow-hidden border-b border-line ${project.featured ? "h-52 sm:h-64" : "h-44"}`}
      >
        <ProjectCover
          project={project}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 start-3 inline-flex items-center gap-1 rounded-full bg-surface/80 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-secondary border border-secondary/40">
            <Star size={11} fill="currentColor" /> {tr(ui.featured)}
          </span>
        )}
        {project.demo && (
          <span className="absolute top-3 end-3 inline-flex items-center gap-1.5 rounded-full bg-surface/80 backdrop-blur px-2.5 py-1 text-[11px] terminal-title dev-text border border-line">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-secondary ping-dot" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-secondary" />
            </span>
            live
          </span>
        )}
      </motion.div>

      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
        <div className="flex items-center justify-between gap-3 terminal-title text-[11px] dev-muted">
          <span>{tr(project.context)}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold dev-heading leading-snug">{project.title}</h3>
        <p className="text-sm dev-muted leading-relaxed line-clamp-3">{tr(project.summary)}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.stack.slice(0, 4).map((s) => (
            <TechChip key={s} name={s} small />
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-line">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            {tr(ui.caseStudy)}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
            />
          </span>
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} · ${tr(ui.code)}`}
                className="p-2 rounded-lg dev-muted hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} · ${tr(ui.live)}`}
                className="p-2 rounded-lg dev-muted hover:text-secondary hover:bg-secondary/10 transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.isPrivate && (
              <span title={tr(ui.private)} className="p-2 dev-muted">
                <Lock size={15} />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const CaseStudy: React.FC<{
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ project, onClose, onPrev, onNext }) => {
  const { tr, language } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      const forward = language === "ar" ? "ArrowLeft" : "ArrowRight";
      const back = language === "ar" ? "ArrowRight" : "ArrowLeft";
      if (e.key === forward) onNext();
      if (e.key === back) onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNext, onPrev, language]);

  const sections = [
    { label: ui.challenge, body: project.problem },
    { label: ui.approach, body: project.solution },
    { label: ui.role, body: project.role },
  ].filter((s): s is { label: Localized; body: Localized } => Boolean(s.body));

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center sm:p-6">
      <motion.button
        aria-label={tr(ui.close)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.article
        layoutId={`card-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`cs-title-${project.id}`}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-line bg-surface shadow-2xl"
      >
        <motion.div layoutId={`cover-${project.id}`} className="relative h-56 sm:h-80 overflow-hidden">
          <ProjectCover project={project} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
        </motion.div>

        <div className="absolute top-3 end-3 flex gap-2">
          {[
            { label: ui.prev, icon: <ChevronLeft size={18} className="rtl:rotate-180" />, fn: onPrev },
            { label: ui.next, icon: <ChevronRight size={18} className="rtl:rotate-180" />, fn: onNext },
            { label: ui.close, icon: <X size={18} />, fn: onClose },
          ].map((b) => (
            <button
              key={b.label.en}
              onClick={b.fn}
              aria-label={tr(b.label)}
              className="p-2 rounded-full bg-surface/80 backdrop-blur border border-line dev-text hover:text-primary hover:border-primary transition-colors"
            >
              {b.icon}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.35 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          className="px-5 sm:px-10 pb-8 -mt-10 relative"
        >
          <p className="terminal-title text-xs dev-muted mb-2">
            {tr(project.context)} · {project.year}
          </p>
          <h3 id={`cs-title-${project.id}`} className="text-3xl sm:text-4xl font-bold dev-heading mb-4">
            {project.title}
          </h3>
          <p className="text-base sm:text-lg dev-text leading-relaxed mb-6">{tr(project.summary)}</p>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-[#0b1220] font-semibold text-sm hover:opacity-90"
              >
                <ExternalLink size={16} /> {tr(ui.live)}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-panel dev-text font-semibold text-sm hover:border-primary hover:text-primary"
              >
                <Github size={16} /> {tr(ui.code)}
              </a>
            )}
            {project.isPrivate && (
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-line dev-muted text-sm terminal-title">
                <Lock size={15} /> {tr(ui.private)}
              </span>
            )}
          </div>

          {sections.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {sections.map((s, i) => (
                <motion.div
                  key={s.label.en}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.07 } }}
                  className={`rounded-xl border border-line bg-panel p-4 ${
                    sections.length === 2 && i === 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <p className="terminal-title text-[11px] uppercase tracking-wider text-primary mb-2">
                    {tr(s.label)}
                  </p>
                  <p className="text-sm dev-text leading-relaxed">{tr(s.body)}</p>
                </motion.div>
              ))}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="terminal-title text-[11px] uppercase tracking-wider dev-muted mb-3">{tr(ui.highlights)}</p>
              <ul className="space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h.en} className="flex gap-2.5 text-sm dev-text">
                    <span className="text-secondary mt-0.5">▹</span>
                    {tr(h)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="terminal-title text-[11px] uppercase tracking-wider dev-muted mb-3">{tr(ui.stack)}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <TechChip key={s} name={s} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
};

type Filter = "all" | ProjectCategory;

const Projects: React.FC = () => {
  const { tr } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || p.category === filter),
    [filter],
  );
  const filters: Filter[] = ["all", "web", "mobile", "desktop"];
  const openProject = projects.find((p) => p.id === openId) ?? null;

  const step = useCallback(
    (delta: number) =>
      setOpenId((id) => {
        const i = projects.findIndex((p) => p.id === id);
        return projects[(i + delta + projects.length) % projects.length].id;
      }),
    [],
  );
  const close = useCallback(() => setOpenId(null), []);
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  // Opened from the command palette
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setFilter("all");
      window.setTimeout(() => setOpenId(id), 450);
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <SectionHeading command="ls ./projects --all" title={tr(ui.title)} subtitle={tr(ui.subtitle)} />

        {/* Filters */}
        <div className="flex justify-center mb-10">
          <div
            role="tablist"
            className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-2xl border border-line bg-panel"
          >
            {filters.map((f) => {
              const count = f === "all" ? projects.length : projects.filter((p) => p.category === f).length;
              const active = filter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active ? "text-[#0b1220]" : "dev-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-xl bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {tr(categoryLabels[f])} <span className="opacity-60 terminal-title text-xs">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <LayoutGroup>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 grid-flow-dense">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {openProject && (
              <CaseStudy key={openProject.id} project={openProject} onClose={close} onPrev={prev} onNext={next} />
            )}
          </AnimatePresence>
        </LayoutGroup>

        <GitHubActivity />
      </div>
    </section>
  );
};

export default Projects;
