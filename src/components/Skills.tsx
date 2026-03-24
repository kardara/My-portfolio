import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Code2, Database, Zap, CheckCircle, Flame } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "220px 0px -80px 0px",
  });

  const skillLogoSlug: Record<string, string> = {
    JavaScript: "javascript",
    TypeScript: "typescript",
    React: "react",
    "Next.js": "nextdotjs",
    "Node.js": "nodedotjs",
    Express: "express",
    NestJS: "nestjs",
    Java: "openjdk",
    "C#": "csharp",
    ".NET": "dotnet",
    Blazor: "blazor",
    Razor: "dotnet",
    Python: "python",
    "Spring Boot": "springboot",
    Hibernate: "hibernate",
    Maven: "apachemaven",
    HTML5: "html5",
    CSS3: "css3",
    "Tailwind CSS": "tailwindcss",
    "Responsive Design": "css3",
    PostgreSQL: "postgresql",
    MongoDB: "mongodb",
    Firebase: "firebase",
    Supabase: "supabase",
    "SQL Server": "microsoftsqlserver",
    "Git/GitHub": "github",
    Docker: "docker",
    Postman: "postman",
    "VS Code": "visualstudiocode",
    IntelliJ: "intellijidea",
    Netlify: "netlify",
    Vercel: "vercel",
    Render: "render",
  };

  const getInitials = (value: string) => {
    const cleaned = value.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    if (!cleaned) return "SK";
    const parts = cleaned.split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  };

  const skillCategories = [
    {
      titleKey: "skills.languages",
      icon: Code2,
      accentColor: "#10b981",
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "NestJS",
        "Java",
        "C#",
        ".NET",
        "Blazor",
        "Razor",
        "Python",
        "Spring Boot",
        "Hibernate",
        "Maven",
      ],
    },
    {
      titleKey: "skills.webUI",
      descKey: "skills.webUIDesc",
      icon: Zap,
      accentColor: "#f97316",
      skills: ["HTML5", "CSS3", "Tailwind CSS", "Responsive Design"],
    },
    {
      titleKey: "skills.databases",
      descKey: "skills.databasesDesc",
      icon: Database,
      accentColor: "#0284c7",
      skills: ["PostgreSQL", "MongoDB", "Firebase", "Supabase", "SQL Server"],
    },
    {
      titleKey: "skills.tools",
      descKey: "skills.toolsDesc",
      icon: Award,
      accentColor: "#f59e0b",
      skills: [
        "Git/GitHub",
        "Docker",
        "Postman",
        "VS Code",
        "IntelliJ",
        "Netlify",
        "Vercel",
        "Render",
      ],
    },
  ];

  const certifications = [
    { key: "skills.cert1" },
    { key: "skills.cert2" },
    { key: "skills.cert3" },
    { key: "skills.cert4" },
    { key: "skills.cert5" },
  ];

  const softSkills = [
    { key: "skills.skill1", icon: "👥" },
    { key: "skills.skill2", icon: "🤝" },
    { key: "skills.skill3", icon: "🧩" },
    { key: "skills.skill4", icon: "⚡" },
    { key: "skills.skill5", icon: "👀" },
    { key: "skills.skill6", icon: "💬" },
    { key: "skills.skill7", icon: "🌍" },
  ];

  return (
    <section id="skills" ref={ref} className="py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="terminal-title text-xs dev-muted mb-3">
            skills --stack
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold dev-heading mb-4">
            {t("skills.title")}
          </h2>
          <div className="h-1 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary)]/60 mx-auto mb-6 w-20 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl dev-muted max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        {/* Animated Skill Rows */}
        <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            const rowItems = [...category.skills, ...category.skills];
            const isEven = categoryIndex % 2 === 0;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.15 }}
                className="shell-panel rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className="px-4 sm:px-6 pt-4 sm:pt-5 pb-2 flex items-center gap-2 sm:gap-3"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="p-2 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${category.accentColor}, ${category.accentColor}40)`,
                    }}
                  >
                    <IconComponent
                      className="text-white"
                      size={24}
                      style={{ color: category.accentColor }}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold dev-heading">
                      {t(category.titleKey)}
                    </h3>
                  </div>
                </div>

                <div className="skills-marquee-row relative overflow-hidden py-4 sm:py-5">
                  <div className="absolute left-0 top-0 h-full w-8 sm:w-16 bg-gradient-to-r from-[var(--dev-panel)] to-transparent z-10" />
                  <div className="absolute right-0 top-0 h-full w-8 sm:w-16 bg-gradient-to-l from-[var(--dev-panel)] to-transparent z-10" />
                  <div
                    className={`skills-marquee-track ${isEven ? "skills-marquee-left" : "skills-marquee-right"}`}
                    style={
                      inView
                        ? { animationDuration: `${28 + categoryIndex * 3}s` }
                        : { animationPlayState: "paused" }
                    }
                  >
                    {rowItems.map((skill, skillIndex) => {
                      const logoSlug = skillLogoSlug[skill];
                      return (
                        <motion.div
                          key={`${category.titleKey}-${skillIndex}-${skill}`}
                          className="group flex items-center gap-2 sm:gap-3 min-w-[160px] sm:min-w-[200px] px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[var(--dev-panel)]/70 transition-all duration-300"
                          style={{
                            boxShadow: "0 10px 22px rgba(0, 0, 0, 0.10)",
                          }}
                          whileHover={{ y: -4, scale: 1.03 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          <div
                            className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden"
                            style={{
                              backgroundColor: `${category.accentColor}18`,
                            }}
                          >
                            <span className="text-xs font-bold terminal-title dev-muted">
                              {getInitials(skill)}
                            </span>
                            {logoSlug && (
                              <motion.img
                                src={`https://cdn.simpleicons.org/${logoSlug}`}
                                alt={`${skill} logo`}
                                loading="lazy"
                                className="absolute inset-1.5 sm:inset-2 w-7 h-7 sm:w-8 sm:h-8 object-contain"
                                whileHover={{ rotate: 8, scale: 1.08 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";
                                }}
                              />
                            )}
                          </div>
                          <span className="text-sm sm:text-base font-semibold dev-text whitespace-nowrap group-hover:text-[var(--dev-heading)] transition-colors duration-300">
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

        {/* Soft Skills & Certifications Section */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="shell-panel rounded-2xl overflow-hidden"
          >
            <div
              className="px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 border-b border-[var(--dev-border)]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(255,255,255,0))",
              }}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #a855f740)",
                }}
              >
                <Flame className="text-[#a855f7]" size={24} />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold dev-heading">
                {t("skills.softSkills")}
              </h3>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 gap-3">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[var(--dev-border)] hover:border-[#a855f7] transition-all duration-300 group cursor-default"
                >
                  <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                    📜
                  </span>
                  <span className="text-sm sm:text-base font-semibold dev-text flex-1">
                    {t(skill.key)}
                  </span>
                  <CheckCircle
                    size={16}
                    className="text-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications - Professional Badge Style */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="shell-panel rounded-2xl overflow-hidden"
          >
            <div
              className="px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 border-b border-[var(--dev-border)]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(34, 197, 94, 0.1), rgba(255,255,255,0))",
              }}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #22c55e40)",
                }}
              >
                <Award className="text-[#22c55e]" size={24} />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold dev-heading">
                {t("skills.certifications")}
              </h3>
            </div>
            <div className="p-4 sm:p-6 space-y-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.08 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="group relative flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-r from-[#22c55e]/10 to-transparent rounded-xl border border-[var(--dev-border)] hover:border-[#22c55e] transition-all duration-300 cursor-default"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-5 w-5 rounded-full bg-[#22c55e]/30 group-hover:bg-[#22c55e]/50 transition-colors duration-300">
                      <CheckCircle size={14} className="text-[#22c55e]" />
                    </div>
                  </div>
                  <span className="dev-text font-medium text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                    {t(cert.key)}
                  </span>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 bg-[#22c55e] pointer-events-none transition-opacity duration-300"></div>
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
