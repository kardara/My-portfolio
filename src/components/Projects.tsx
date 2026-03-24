import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Kardara Stock Management System",
      description:
        "A comprehensive Java-based stock control application with role-aware modules, inventory updates, and reporting support for day-to-day operations.",
      technologies: ["Java", "Swing", "MySQL", "JDBC"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara",
      demo: "#",
    },
    {
      title: "MediReminder",
      description:
        "A mobile medicine reminder app designed to improve treatment adherence through clear scheduling and local notification workflows.",
      technologies: ["Flutter", "Dart", "SQLite", "Notifications"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara",
      demo: "#",
    },
    {
      title: "MyTaskMangement BestSeller",
      description:
        "A full-stack task management platform with a TypeScript frontend and Java backend, built around maintainable workflows and clean architecture.",
      technologies: ["TypeScript", "React", "Java", "PostgreSQL"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/MyTaskMangement_BestSeller_Frontend",
      demo: "#",
    },
    {
      title: "AUCA Library Management System (IMS)",
      description:
        "Integrated library and inventory management system for AUCA. Manages book inventory, borrowing/returning, student records, and generates reports. Built with Java for robust backend operations.",
      technologies: ["Java", "Swing", "MySQL", "CRUD Operations"],
      status: "completed",
      image: "/auca-logo.png",
      github: "https://github.com/kardara/auca-lms-testing",
      demo: "#",
    },
    {
      title: "AUCA Online Application Portal",
      description:
        "A modern AUCA admissions web portal with TypeScript and React, enabling user-friendly online application experiences for prospective students.",
      technologies: ["TypeScript", "React", "Tailwind CSS", "REST APIs"],
      status: "completed",
      image: "/auca-logo.png",
      github: "https://github.com/kardara/auca-online-application-fronend",
      demo: "#",
    },
    {
      title: "Student Management System",
      description:
        "A full-stack academic management solution handling student data, enrollment, and records with frontend-backend coordination across dedicated repositories.",
      technologies: ["JavaScript", "React", "Java", "PostgreSQL"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/Student-management-system-frontend",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dev-heading mb-4">
            {t("projects.title")}
          </h2>
          <div className="h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/60 mx-auto mb-4 w-20 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl dev-muted max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="shell-panel rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-contain bg-[var(--dev-bg)] p-3 sm:p-4 transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  {project.status === "development" ? (
                    <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Clock size={12} />
                      {t("projects.inDevelopment")}
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-[var(--color-secondary)] text-white text-xs font-medium rounded-full">
                      {t("projects.completed")}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold dev-heading mb-3">
                  {project.title}
                </h3>
                <p className="dev-muted mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => {
                    // Alternate between professional developer colors (3-color scheme)
                    const colorStyles = [
                      {background: 'rgba(88, 166, 255, 0.1)', color: 'var(--color-primary)'},
                      {background: 'rgba(63, 185, 80, 0.1)', color: 'var(--color-secondary)'},
                      {background: 'rgba(233, 84, 32, 0.1)', color: 'var(--color-accent)'},
                      {background: 'rgba(88, 166, 255, 0.1)', color: 'var(--color-primary)'},
                    ];
                    const colorStyle = colorStyles[techIndex % colorStyles.length];
                    return (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 text-xs font-medium rounded-full`}
                        style={colorStyle}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--dev-border)]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-title inline-flex items-center gap-2 text-sm text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
                  >
                    <Github size={16} /> {t("projects.source")}
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-title inline-flex items-center gap-2 text-sm text-[#e95420] hover:text-[#ff6a33] transition-colors"
                  >
                    <ExternalLink size={16} /> {t("projects.live")}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
