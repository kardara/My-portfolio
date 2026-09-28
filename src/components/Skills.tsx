import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Award,
  Code2,
  Database,
  Zap,
  CheckCircle,
  Flame,
  Users,
  Handshake,
  Puzzle,
  Eye,
  MessageSquare,
  Globe,
  Rocket,
  Server,
} from "lucide-react";
import { useLanguage, type Localized } from "../contexts/LanguageContext";
import SectionHeading from "./ui/SectionHeading";

const Skills: React.FC = () => {
  const { t, tr } = useLanguage();
  const [manualScroll, setManualScroll] = useState(false);
  const [interactingRow, setInteractingRow] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "120px 0px -60px 0px",
  });

  const skillLogoSlug: Record<string, string> = {
    Java: "openjdk",
    JavaScript: "javascript",
    TypeScript: "typescript",
    Python: "python",
    "C#": "csharp",
    SQL: "postgresql",
    HTML: "html5",
    CSS: "css",
    React: "react",
    "Next.js": "nextdotjs",
    "Tailwind CSS": "tailwindcss",
    Vite: "vite",
    Axios: "axios",
    "React Router": "reactrouter",
    "Spring Boot": "springboot",
    "Spring Security": "springsecurity",
    "Spring Data JPA": "spring",
    Hibernate: "hibernate",
    "Java Servlets": "openjdk",
    "Node.js": "nodedotjs",
    "Express.js": "express",
    "ASP.NET": "dotnet",
    PostgreSQL: "postgresql",
    MySQL: "mysql",
    MongoDB: "mongodb",
    Firebase: "firebase",
    Supabase: "supabase",
    Flyway: "flyway",
    "Git/GitHub": "github",
    Docker: "docker",
    Linux: "linux",
    Maven: "apachemaven",
    "GitHub Actions": "githubactions",
    JWT: "jsonwebtokens",
    Postman: "postman",
    Vercel: "vercel",
    Netlify: "netlify",
  };

  const getInitials = (value: string) => {
    const cleaned = value.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    if (!cleaned) return "SK";
    const parts = cleaned.split(/\s+/);
    return parts.length === 1
      ? parts[0].slice(0, 2).toUpperCase()
      : `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  };

  const skillCategories: { title: Localized; icon: typeof Code2; accentColor: string; skills: string[] }[] = [
    {
      title: { en: "Programming Languages", fr: "Langages de programmation", ar: "لغات البرمجة" },
      icon: Code2,
      accentColor: "#10b981",
      skills: ["Java", "JavaScript", "TypeScript", "Python", "C#", "SQL", "HTML", "CSS"],
    },
    {
      title: { en: "Backend Development", fr: "Développement back-end", ar: "تطوير الخوادم" },
      icon: Server,
      accentColor: "#a855f7",
      skills: [
        "Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "Java Servlets",
        "REST APIs", "Node.js", "Express.js", "ASP.NET",
      ],
    },
    {
      title: { en: "Frontend Development", fr: "Développement front-end", ar: "تطوير الواجهات" },
      icon: Zap,
      accentColor: "#f97316",
      skills: ["React", "Next.js", "Tailwind CSS", "Vite", "Axios", "React Router", "Responsive Design"],
    },
    {
      title: { en: "Databases", fr: "Bases de données", ar: "قواعد البيانات" },
      icon: Database,
      accentColor: "#0284c7",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase", "Flyway", "jOOQ"],
    },
    {
      title: { en: "DevOps & Tools", fr: "DevOps & outils", ar: "DevOps والأدوات" },
      icon: Award,
      accentColor: "#f59e0b",
      skills: ["Git/GitHub", "Docker", "Linux", "Maven", "GitHub Actions", "JWT", "Postman", "Vercel", "Netlify"],
    },
  ];

  const certifications: Localized[] = [
    {
      en: "Advanced Java Backend & Software Architecture · The Gym × MaibornWolff",
      fr: "Back-end Java avancé & architecture logicielle · The Gym × MaibornWolff",
      ar: "تطوير الخوادم بـ Java المتقدم وهندسة البرمجيات · The Gym × MaibornWolff",
    },
    {
      en: "Full Stack Development Training (React.js & Spring Boot)",
      fr: "Formation développement full-stack (React.js & Spring Boot)",
      ar: "تدريب التطوير المتكامل (React.js وSpring Boot)",
    },
    { en: "Cisco Networking Essentials", fr: "Cisco Networking Essentials", ar: "أساسيات الشبكات من Cisco" },
    { en: "Leadership & Team Management", fr: "Leadership & gestion d'équipe", ar: "القيادة وإدارة الفرق" },
    { en: "Red Cross Humanitarian Training", fr: "Formation humanitaire de la Croix-Rouge", ar: "تدريب إنساني مع الصليب الأحمر" },
  ];

  const softSkills = [
    { key: "skills.skill1", Icon: Users },
    { key: "skills.skill2", Icon: Handshake },
    { key: "skills.skill3", Icon: Puzzle },
    { key: "skills.skill4", Icon: Rocket },
    { key: "skills.skill5", Icon: Eye },
    { key: "skills.skill6", Icon: MessageSquare },
    { key: "skills.skill7", Icon: Globe },
  ];

  return (
    <section id="skills" ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        <SectionHeading command="skills --list --all" title={t("skills.title")} subtitle={t("skills.subtitle")}>
          <div className="mt-5">
            <button
              onClick={() => setManualScroll((prev) => !prev)}
              className="terminal-title text-xs sm:text-sm px-4 py-2 rounded-lg border border-line bg-panel dev-text hover:border-primary transition-colors"
            >
              {manualScroll ? t("skills.autoScroll") : t("skills.manualScroll")}
            </button>
          </div>
        </SectionHeading>

        {/* ── Animated Skill Rows ── */}
        <div className="space-y-4 sm:space-y-5 mb-12 sm:mb-14">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            const rowItems = manualScroll
              ? category.skills
              : [...category.skills, ...category.skills];
            const isEven = categoryIndex % 2 === 0;
            const marqueeDuration = 34;
            const isPaused = manualScroll || interactingRow === categoryIndex;

            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: categoryIndex * 0.12 }}
                className="shell-panel rounded-2xl overflow-hidden card-glow"
              >
                {/* Row header */}
                <div className="px-5 sm:px-6 pt-4 pb-3 flex items-center gap-3 border-b border-line">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${category.accentColor}, ${category.accentColor}55)`,
                    }}
                  >
                    <IconComponent size={20} className="text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold dev-heading">
                    {tr(category.title)}
                  </h3>
                  <div className="ms-auto terminal-title text-xs dev-muted">
                    {category.skills.length} {t("skills.count")}
                  </div>
                </div>

                {/* Marquee/scroll area */}
                <div
                  className={`skills-marquee-row skills-marquee-scroll relative py-4 sm:py-5 overflow-x-auto ${manualScroll ? "cursor-grab active:cursor-grabbing" : "hover:cursor-grab"}`}
                  style={manualScroll ? { WebkitOverflowScrolling: "touch" } : {}}
                  onMouseEnter={() => !manualScroll && setInteractingRow(categoryIndex)}
                  onMouseLeave={() => !manualScroll && setInteractingRow(null)}
                  onPointerDown={() => setInteractingRow(categoryIndex)}
                  onPointerUp={() => !manualScroll && setInteractingRow(null)}
                  onPointerCancel={() => !manualScroll && setInteractingRow(null)}
                >
                  {!manualScroll && (
                    <>
                      <div className="absolute left-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-r from-panel to-transparent z-10 pointer-events-none" />
                      <div className="absolute right-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-l from-panel to-transparent z-10 pointer-events-none" />
                    </>
                  )}
                  <div
                    className={
                      manualScroll
                        ? "flex w-max gap-3 px-5"
                        : `skills-marquee-track ${isEven ? "skills-marquee-left" : "skills-marquee-right"}`
                    }
                    style={
                      manualScroll
                        ? undefined
                        : {
                            animationDuration: `${marqueeDuration}s`,
                            animationPlayState: isPaused ? "paused" : "running",
                          }
                    }
                  >
                    {rowItems.map((skill, skillIndex) => {
                      const logoSlug = skillLogoSlug[skill];
                      return (
                        <motion.div
                          key={`${category.title.en}-${skillIndex}`}
                          whileHover={{ y: -3, scale: 1.04 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2.5 min-w-[155px] sm:min-w-[185px] px-4 py-2.5 rounded-xl bg-panel/80 border border-line hover:border-primary/50 transition-colors duration-200"
                        >
                          {/* Icon box */}
                          <div
                            className="relative h-9 w-9 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                            style={{ background: `${category.accentColor}18` }}
                          >
                            <span className="text-xs font-bold terminal-title dev-muted">
                              {getInitials(skill)}
                            </span>
                            {logoSlug && (
                              <img
                                src={`https://cdn.simpleicons.org/${logoSlug}`}
                                alt={skill}
                                loading="lazy"
                                className="absolute inset-1.5 w-6 h-6 object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            )}
                          </div>
                          <span className="text-sm font-semibold dev-text whitespace-nowrap">
                            {skill}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Soft Skills & Certifications ── */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-7">

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="shell-panel rounded-2xl overflow-hidden card-glow"
          >
            {/* Header */}
            <div className="px-5 sm:px-6 py-4 flex items-center gap-3 border-b border-line"
              style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.08), transparent)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
                <Flame size={20} className="text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold dev-heading">
                {t("skills.softSkills")}
              </h3>
            </div>

            {/* Items */}
            <div className="p-5 sm:p-6 grid grid-cols-1 gap-2.5">
              {softSkills.map(({ key, Icon }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.06 }}
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-line hover:border-[#a855f7]/50 bg-surface/30 transition-all duration-250 cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-250"
                    style={{ background: "rgba(168,85,247,0.12)" }}>
                    <Icon size={16} style={{ color: "#a855f7" }} />
                  </div>
                  <span className="text-sm font-semibold dev-text flex-1">{t(key)}</span>
                  <CheckCircle
                    size={15}
                    className="text-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="shell-panel rounded-2xl overflow-hidden card-glow"
          >
            {/* Header */}
            <div className="px-5 sm:px-6 py-4 flex items-center gap-3 border-b border-line"
              style={{ background: "linear-gradient(90deg, rgba(34,197,94,0.08), transparent)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}>
                <Award size={20} className="text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold dev-heading">
                {t("skills.certifications")}
              </h3>
            </div>

            {/* Items */}
            <div className="p-5 sm:p-6 space-y-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.7 + index * 0.08 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="group flex items-start gap-3.5 p-4 rounded-xl border border-line hover:border-[#22c55e]/50 bg-surface/30 transition-all duration-250 cursor-default"
                >
                  {/* Numbered badge */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold terminal-title"
                    style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span className="dev-text font-medium text-sm leading-relaxed flex-1">
                    {tr(cert)}
                  </span>
                  <CheckCircle
                    size={15}
                    className="text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex-shrink-0 mt-0.5"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
