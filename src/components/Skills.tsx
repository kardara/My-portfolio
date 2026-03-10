import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Code2, Database, Zap } from "lucide-react";

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: Code2,
      color: "from-green-500 to-emerald-600",
      skills: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React" },
        { name: "Next.js" },
        { name: "Node.js" },
        { name: "Express" },
        { name: "Java" },
        { name: "C#" },
        { name: "Python" },
        { name: "Spring Boot" },
        { name: "Hibernate" },
        { name: "Maven" },
      ],
    },
    {
      title: "Web & UI Development",
      icon: Zap,
      color: "from-rose-500 to-pink-600",
      skills: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "Tailwind CSS" },
        { name: "Responsive Design" },
      ],
    },
    {
      title: "Databases & Cloud",
      icon: Database,
      color: "from-cyan-500 to-blue-600",
      skills: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Firebase" },
        { name: "Supabase" },
        { name: "SQL Server" },
      ],
    },
    {
      title: "Tools & Platforms",
      icon: Award,
      color: "from-amber-500 to-orange-600",
      skills: [
        { name: "Git/GitHub" },
        { name: "Docker" },
        { name: "Postman" },
        { name: "VS Code" },
        { name: "IntelliJ" },
        { name: "Netlify" },
        { name: "Vercel" },
        { name: "Render" },
      ],
    },
  ];

  const certifications = [
    "Cisco Networking Essentials",
    "Full Stack Development Training (React.js & Spring Boot)",
    "Graphic Design (Adobe Photoshop)",
    "Leadership & Team Management",
    "Red Cross Humanitarian Training",
  ];

  const softSkills = [
    "Leadership & Mentorship",
    "Team Coordination",
    "Problem Solving",
    "Agile Methodology",
    "Code Review",
    "Technical Communication",
    "Cross-cultural Collaboration",
  ];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            30+ technologies mastered across web, mobile, and backend
            development
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.15 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-200 dark:border-gray-600">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} shadow-lg`}
                  >
                    <IconComponent className="text-white" size={32} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {category.skills.length} technologies
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.15 + skillIndex * 0.03,
                      }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className={`group relative px-4 py-3 rounded-xl font-semibold text-white text-sm text-center cursor-default bg-gradient-to-r ${category.color} shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
                    >
                      <div className="relative z-10">{skill.name}</div>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Soft Skills & Certifications Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-violet-100 dark:border-violet-800/30"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600"
              >
                <Award className="text-white" size={28} />
              </motion.div>
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.03 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-emerald-100 dark:border-emerald-800/30"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600"
              >
                <Award className="text-white" size={28} />
              </motion.div>
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-xl border border-emerald-200 dark:border-emerald-700 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {cert}
                  </span>
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
