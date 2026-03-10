import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "MyTaskMangement BestSeller",
      description:
        "A full-stack task management application with intuitive UI and robust backend. Frontend built with modern React/TypeScript components, backend with Java handling complex business logic and database operations.",
      technologies: ["TypeScript", "React", "Java", "PostgreSQL"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/MyTaskMangement_BestSeller_Frontend",
      demo: "#",
    },
    {
      title: "Student Management System",
      description:
        "Comprehensive full-stack solution for managing student records, enrollment, and academic progress. Features role-based access control, data validation, and real-time updates across frontend and backend.",
      technologies: ["JavaScript", "React", "Java", "PostgreSQL"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/Student-management-system-frontend",
      demo: "#",
    },
    {
      title: "AUCA Online Application Portal",
      description:
        "Modern web application for AUCA university's online application system. Built with TypeScript and React, provides seamless user experience for prospective students to apply and track their applications.",
      technologies: ["TypeScript", "React", "Tailwind CSS", "API Integration"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/auca-online-application-fronend",
      demo: "#",
    },
    {
      title: "AUCA Library Management System (IMS)",
      description:
        "Integrated library and inventory management system for AUCA. Manages book inventory, borrowing/returning, student records, and generates reports. Built with Java for robust backend operations.",
      technologies: ["Java", "Swing", "MySQL", "CRUD Operations"],
      status: "completed",
      image: "/lms.png",
      github: "https://github.com/kardara/auca-lms-testing",
      demo: "#",
    },
    {
      title: "React VanLife - Travel Showcase",
      description:
        "A modern React application showcasing van rental listings with filtering, sorting, and detailed view pages. Demonstrates strong component architecture, state management, and responsive design principles.",
      technologies: ["React", "JavaScript", "React Router", "CSS"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/3408356/pexels-photo-3408356.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/react-scrimba-vanlife",
      demo: "#",
    },
    {
      title: "StudyBuddy - Collaborative Learning",
      description:
        "Full-stack collaborative learning platform built with .NET and modern web technologies. Enables students to collaborate, share resources, and track learning progress with real-time updates.",
      technologies: ["TypeScript", "React", ".NET", "SQL Server"],
      status: "completed",
      image:
        "https://images.pexels.com/photos/6238128/pexels-photo-6238128.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "https://github.com/kardara/Studybuddy-Frontend-G1-.Net",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("projects.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical skills and creative problem-solving
            through real-world applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  {project.status === "development" ? (
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Clock size={12} />
                      {t("projects.inDevelopment")}
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                      Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => {
                    // Alternate between different developer colors
                    const colors = [
                      "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200",
                      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
                      "bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200",
                      "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
                    ];
                    const colorClass = colors[techIndex % colors.length];
                    return (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 ${colorClass} text-xs font-medium rounded-full`}
                      >
                        {tech}
                      </span>
                    );
                  })}
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
