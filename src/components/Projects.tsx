import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, ExternalLink, Github, Zap, BarChart3, Lock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const githubProfile = "https://github.com/kardara";
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillLogoSlug: Record<string, string> = {
    JavaScript: "javascript",
    TypeScript: "typescript",
    React: "react",
    "Next.js": "nextdotjs",
    "Node.js": "nodedotjs",
    Java: "openjdk",
    "C#": "csharp",
    ".NET": "dotnet",
    Blazor: "blazor",
    Python: "python",
    "Spring Boot": "springboot",
    Hibernate: "hibernate",
    Flutter: "flutter",
    Dart: "dart",
    HTML5: "html5",
    CSS3: "css3",
    "Tailwind CSS": "tailwindcss",
    PostgreSQL: "postgresql",
    MongoDB: "mongodb",
    Firebase: "firebase",
    MySQL: "mysql",
    SQLite: "sqlite",
    "Git/GitHub": "github",
    Docker: "docker",
    Postman: "postman",
    Swing: "java",
    "REST APIs": "fastapi",
    JDBC: "java",
    "CRUD Operations": "database",
    Notifications: "fastapi",
  };

  type Project = {
    titleKey: string;
    descKey: string;
    technologies: string[];
    status: "completed" | "development";
    complexity: "Intermediate" | "Advanced";
    image: string;
    highlightKeys: string[];
    github?: string;
    demo?: string;
    featured?: boolean;
    isPrivate?: boolean;
  };

  const complexityLabel = (c: Project["complexity"]) =>
    t(c === "Advanced" ? "projects.advanced" : "projects.intermediate");

  const projects: Project[] = [
    {
      titleKey: "projects.mytask",
      descKey: "projects.mytaskDesc",
      technologies: ["TypeScript", "React", "Java", "PostgreSQL"],
      status: "completed",
      complexity: "Advanced",
      image:
        "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/MyTaskMangement_BestSeller_Interview_Frontend",
      highlightKeys: [
        "projects.mytaskFeature1",
        "projects.mytaskFeature2",
        "projects.mytaskFeature3",
        "projects.mytaskFeature4",
      ],
    },
    {
      titleKey: "projects.kardara",
      descKey: "projects.kardaraDesc",
      technologies: ["Java", "Swing", "MySQL", "JDBC"],
      status: "completed",
      complexity: "Intermediate",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/Kardara-Stock-Management-System",
      highlightKeys: [
        "projects.kardaraFeature1",
        "projects.kardaraFeature2",
        "projects.kardaraFeature3",
        "projects.kardaraFeature4",
      ],
    },
    {
      titleKey: "projects.medireminder",
      descKey: "projects.medreminderDesc",
      technologies: ["Flutter", "Dart", "SQLite", "Notifications"],
      status: "completed",
      complexity: "Intermediate",
      image:
        "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlightKeys: [
        "projects.medireminderFeature1",
        "projects.medireminderFeature2",
        "projects.medireminderFeature3",
        "projects.medireminderFeature4",
      ],
    },
    {
      titleKey: "projects.aucalms",
      descKey: "projects.aucalmsDesc",
      technologies: ["Java", "Swing", "MySQL", "CRUD Operations"],
      status: "completed",
      complexity: "Intermediate",
      image: `${import.meta.env.BASE_URL}lms.png`,
      github: "https://github.com/kardara/auca-lms-testing",
      highlightKeys: [
        "projects.aucalmsFeature1",
        "projects.aucalmsFeature2",
        "projects.aucalmsFeature3",
        "projects.aucalmsFeature4",
      ],
    },
    {
      titleKey: "projects.aucaapp",
      descKey: "projects.aucaappDesc",
      technologies: ["TypeScript", "React", "Tailwind CSS", "REST APIs"],
      status: "completed",
      complexity: "Advanced",
      image: `${import.meta.env.BASE_URL}auca-logo.png`,
      github: "https://github.com/kardara/auca-online-application-fronend",
      highlightKeys: [
        "projects.aucaappFeature1",
        "projects.aucaappFeature2",
        "projects.aucaappFeature3",
        "projects.aucaappFeature4",
      ],
    },
    {
      titleKey: "projects.studentmgmt",
      descKey: "projects.studentmgmtDesc",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "PostCSS",
        "Context API",
        "Custom Hooks",
        "Service Layer",
        "Role-based Auth Guards",
      ],
      status: "completed",
      complexity: "Advanced",
      featured: true,
      image: `${import.meta.env.BASE_URL}auca-ims.png`,
      // repository is private
      isPrivate: true,
      highlightKeys: [
        "projects.studentmgmtFeature1",
        "projects.studentmgmtFeature2",
        "projects.studentmgmtFeature3",
        "projects.studentmgmtFeature4",
      ],
    },
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner":
        return {
          bg: "rgba(34, 197, 94, 0.1)",
          text: "#22c55e",
          border: "#22c55e",
        };
      case "Intermediate":
        return {
          bg: "rgba(88, 166, 255, 0.1)",
          text: "#58a6ff",
          border: "#58a6ff",
        };
      case "Advanced":
        return {
          bg: "rgba(233, 84, 32, 0.1)",
          text: "#e95420",
          border: "#e95420",
        };
      default:
        return {
          bg: "rgba(88, 166, 255, 0.1)",
          text: "#58a6ff",
          border: "#58a6ff",
        };
    }
  };

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 sm:py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-18"
        >
          <div className="section-tag">projects --showcase</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold dev-heading">
            {t("projects.title")}
          </h2>
          <div className="section-divider" />
          <p className="text-base sm:text-lg dev-muted max-w-2xl mx-auto leading-relaxed mb-5">
            {t("projects.subtitle")}
          </p>
          <motion.a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--dev-border)] bg-[var(--dev-panel)] text-sm terminal-title dev-text hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-200"
          >
            <Github size={15} /> {t("projects.githubProfile")}
          </motion.a>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <div className="shell-panel rounded-2xl overflow-hidden group">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-full overflow-hidden bg-[var(--dev-bg)]">
                  <img
                    src={featuredProject.image}
                    alt={t(featuredProject.titleKey)}
                    className="w-full h-full object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Featured Badge */}
                  <motion.div
                    initial={{ rotate: -12 }}
                    animate={{ rotate: 0 }}
                    className="absolute top-4 start-4"
                  >
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                      }}
                      className="px-4 py-2 rounded-lg text-white font-bold text-sm flex items-center gap-2 shadow-lg"
                    >
                      <Zap size={16} />
                      {t("projects.featured")}
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="terminal-title text-xs dev-muted mb-2">
                          project --featured
                        </p>
                        <h3 className="text-2xl sm:text-3xl font-bold dev-heading mb-2">
                          {t(featuredProject.titleKey)}
                        </h3>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                        style={{
                          background: getComplexityColor(
                            featuredProject.complexity,
                          ).bg,
                          color: getComplexityColor(featuredProject.complexity)
                            .text,
                          border: `1px solid ${getComplexityColor(featuredProject.complexity).border}`,
                        }}
                      >
                        {complexityLabel(featuredProject.complexity)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="dev-muted mb-6 leading-relaxed">
                      {t(featuredProject.descKey)}
                    </p>

                    {/* Key Highlights */}
                    <div className="mb-6">
                      <p className="text-xs font-bold dev-muted uppercase tracking-wider mb-3">
                        {t("projects.keyFeatures")}
                      </p>
                      <ul className="space-y-2">
                        {featuredProject.highlightKeys.map(
                          (highlightKey, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={inView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.1 + idx * 0.05 }}
                              className="flex items-start gap-2 text-sm dev-text"
                            >
                              <span className="text-[var(--color-primary)] font-bold mt-0.5">
                                ▸
                              </span>
                              {t(highlightKey)}
                            </motion.li>
                          ),
                        )}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-xs font-bold dev-muted uppercase tracking-wider mb-3">
                        {t("projects.techStack")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {featuredProject.technologies.map((tech, idx) => {
                          const logoSlug = skillLogoSlug[tech];
                          return (
                            <motion.div
                              key={idx}
                              whileHover={{ y: -4 }}
                              className="group relative"
                            >
                              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--dev-panel)]/70 border border-[var(--dev-border)] hover:border-[var(--color-primary)] transition-all duration-300">
                                {logoSlug && (
                                  <img
                                    src={`https://cdn.simpleicons.org/${logoSlug}`}
                                    alt={`${tech} logo`}
                                    className="w-4 h-4"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                )}
                                <span className="text-xs font-medium dev-text">
                                  {tech}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-[var(--dev-border)]">
                    {featuredProject.github && (
                      <motion.a
                        href={featuredProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary)]/20 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-medium hover:bg-[var(--color-primary)]/30 transition-all duration-300"
                      >
                        <Github size={16} /> {t("projects.source")}
                      </motion.a>
                    )}
                    {featuredProject.demo && (
                      <motion.a
                        href={featuredProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        <ExternalLink size={16} /> {t("projects.live")}
                      </motion.a>
                    )}
                    {featuredProject.isPrivate && (
                      <span className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-[var(--dev-border)] dev-muted rounded-lg text-sm terminal-title">
                        <Lock size={15} /> {t("projects.privateRepo")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects Grid */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold dev-heading mb-8 flex items-center gap-3">
            <BarChart3 size={24} /> {t("projects.other")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                whileHover={{ y: -8 }}
                className="shell-panel rounded-xl overflow-hidden group transition-all duration-300 flex flex-col"
              >
                {/* Image Header */}
                <div className="relative overflow-hidden h-40 sm:h-48 bg-[var(--dev-bg)] shrink-0">
                  <img
                    src={project.image}
                    alt={t(project.titleKey)}
                    className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--dev-bg)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Status & Complexity Badges */}
                  <div className="absolute top-3 end-3 flex flex-col items-end gap-2">
                    <div
                      className="px-2 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: getComplexityColor(project.complexity).bg,
                        color: getComplexityColor(project.complexity).text,
                        border: `1px solid ${getComplexityColor(project.complexity).border}`,
                      }}
                    >
                      {complexityLabel(project.complexity)}
                    </div>
                    {project.status === "development" ? (
                      <span className="px-2 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-medium rounded-full flex items-center gap-1 border border-[var(--color-accent)]">
                        <Clock size={10} />
                        {t("projects.inDevelopment")}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] text-xs font-medium rounded-full border border-[var(--color-secondary)]">
                        {t("projects.completed")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold dev-heading mb-2 line-clamp-2">
                      {t(project.titleKey)}
                    </h4>
                    <p className="dev-muted text-sm line-clamp-2 leading-relaxed">
                      {t(project.descKey)}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-bold dev-muted uppercase tracking-wider mb-2">
                      {t("projects.keyFeatures")}
                    </p>
                    <ul className="space-y-1.5">
                      {project.highlightKeys
                        .slice(0, 3)
                        .map((highlightKey, idx) => (
                          <li
                            key={idx}
                            className="text-xs sm:text-sm dev-text flex gap-2"
                          >
                            <span className="text-[var(--color-primary)]">
                              ▸
                            </span>
                            <span className="line-clamp-1">
                              {t(highlightKey)}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-bold dev-muted uppercase tracking-wider mb-2">
                      {t("projects.techStack")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => {
                        const logoSlug = skillLogoSlug[tech];
                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className="group/tech relative"
                            title={tech}
                          >
                            <div
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[var(--dev-panel)]/70 border border-[var(--dev-border)] flex items-center justify-center overflow-hidden hover:border-[var(--color-primary)] transition-all duration-300"
                              style={{
                                backgroundColor: `${
                                  [
                                    "var(--color-primary)",
                                    "var(--color-secondary)",
                                    "var(--color-accent)",
                                  ][idx % 3]
                                }20`,
                              }}
                            >
                              {logoSlug && (
                                <img
                                  src={`https://cdn.simpleicons.org/${logoSlug}`}
                                  alt={tech}
                                  className="w-4 h-4"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              )}
                            </div>
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--dev-bg)] border border-[var(--dev-border)] rounded text-xs dev-text opacity-0 group-hover/tech:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
                              {tech}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Links */}
                  {(project.github || project.demo || project.isPrivate) && (
                  <div className="flex gap-2 pt-4 border-t border-[var(--dev-border)] mt-auto">
                    {project.github ? (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[var(--color-primary)] hover:text-[#79c0ff] transition-colors py-2"
                      >
                        <Github size={14} /> {t("projects.source")}
                      </motion.a>
                    ) : project.isPrivate ? (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs dev-muted py-2">
                        <Lock size={13} /> {t("projects.privateRepo")}
                      </span>
                    ) : null}
                    {project.demo && (
                      <>
                        <div className="w-px bg-[var(--dev-border)]" />
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[var(--color-accent)] hover:text-[#ff6a33] transition-colors py-2"
                        >
                          <ExternalLink size={14} /> {t("projects.live")}
                        </motion.a>
                      </>
                    )}
                  </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
