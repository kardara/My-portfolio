import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, MapPin, Badge } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: "Lead Software Engineer",
      company: "ChadNova",
      location: "Kigali, Rwanda",
      period: "Nov 2025 – Present",
      description:
        "Lead the design and development of web-based platforms with a focus on scalability, reliability, and security. Coordinate technical tasks, mentor junior developers, and align engineering decisions with organizational and community-oriented objectives.",
      highlights: [
        "Platform Architecture",
        "Team Leadership",
        "Technical Strategy",
      ],
      color: "from-[var(--color-primary)] to-[#0284c7]",
    },
    {
      title: "Teaching Assistant - Web Technology & Internet",
      company: "Adventist University of Central Africa (AUCA)",
      location: "Kigali, Rwanda",
      period: "Sep 2025 – Present",
      description:
        "Support undergraduate students in learning HTML, CSS, JavaScript, React, Tailwind CSS, and Spring Boot through practical exercises and full-stack projects. Assist in clarifying complex concepts, reviewing code, and introducing Agile workflows.",
      highlights: ["Full-Stack Education", "Code Review", "Mentorship"],
      color: "from-[var(--color-secondary)] to-[#15803d]",
    },
    {
      title: "Trainee & Volunteer Coach",
      company: "The Gym Rwanda",
      location: "Kigali, Rwanda",
      period: "2024 – Present",
      description:
        "Develop full-stack applications using React, Node.js, Express, and Tailwind CSS in collaborative team environments. Apply Agile practices such as sprint planning, task decomposition, documentation, and peer code reviews.",
      highlights: [
        "Full-Stack Development",
        "Agile Methodology",
        "Developer Coaching",
      ],
      color: "from-[#f97316] to-[var(--color-accent)]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="terminal-title text-xs dev-muted mb-3">experience --timeline</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold dev-heading mb-4">
            {t("experience.title") || "Professional Journey"}
          </h2>
          <div className="h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/60 mx-auto mb-4 w-20 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl dev-muted max-w-2xl mx-auto">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-5 sm:left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-secondary)] transform md:-translate-x-1/2"></div>

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative pl-14 sm:pl-24 md:pl-0 md:mb-12 ${index % 2 === 0 ? "md:ml-0 md:mr-auto md:pr-12 md:w-1/2" : "md:ml-auto md:mr-0 md:pl-12 md:w-1/2"}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 transform md:-translate-x-1/2 -translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${exp.color} shadow-lg flex items-center justify-center text-white border-4 border-white dark:border-gray-900 cursor-pointer`}
                  >
                    <Briefcase size={20} className="sm:w-6 sm:h-6" />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -8, shadow: "0 25px 50px rgba(0,0,0,0.2)" }}
                className="shell-panel rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border-l-4 border-transparent hover:border-[var(--color-primary)]"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold dev-heading mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-base sm:text-lg font-semibold" style={{color: 'var(--color-primary)'}}>
                        {exp.company}
                      </p>
                    </div>
                    <Badge
                      className="hidden sm:block" style={{color: 'var(--color-primary)'}}
                      size={24}
                    />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 dev-muted">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 dev-muted">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="dev-text mb-5 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm font-medium rounded-full"
                        style={{
                          background: 'rgba(88, 166, 255, 0.1)',
                          color: 'var(--color-primary)'
                        }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
