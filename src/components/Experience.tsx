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
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "Teaching Assistant - Web Technology & Internet",
      company: "Adventist University of Central Africa (AUCA)",
      location: "Kigali, Rwanda",
      period: "Sep 2025 – Present",
      description:
        "Support undergraduate students in learning HTML, CSS, JavaScript, React, Tailwind CSS, and Spring Boot through practical exercises and full-stack projects. Assist in clarifying complex concepts, reviewing code, and introducing Agile workflows.",
      highlights: ["Full-Stack Education", "Code Review", "Mentorship"],
      color: "from-purple-500 to-indigo-600",
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
      color: "from-blue-500 to-cyan-600",
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
    <section
      id="experience"
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t("experience.title") || "Professional Journey"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Crafting solutions that matter, one project at a time
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
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-blue-600 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative pl-24 md:pl-0 md:mb-12 ${index % 2 === 0 ? "md:ml-0 md:mr-auto md:pr-12 md:w-1/2" : "md:ml-auto md:mr-0 md:pl-12 md:w-1/2"}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 transform md:-translate-x-1/2 -translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${exp.color} shadow-lg flex items-center justify-center text-white border-4 border-white dark:border-gray-900 cursor-pointer`}
                  >
                    <Briefcase size={24} />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -8, shadow: "0 25px 50px rgba(0,0,0,0.2)" }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-transparent hover:border-indigo-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <Badge
                      className="text-indigo-600 dark:text-indigo-400"
                      size={24}
                    />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full"
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
