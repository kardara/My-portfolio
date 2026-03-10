import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Users, Brain, Target, Zap, Award } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const strengths = [
    {
      icon: Code,
      title: "Full-Stack Expertise",
      description:
        "Expert in modern JavaScript frameworks, backend technologies, and database design",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Team Leadership",
      description:
        "Lead Software Engineer with mentorship experience and Agile workflow expertise",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description:
        "Strong analytical skills with focus on scalable, reliable, and secure solutions",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: Target,
      title: "Community Focus",
      description:
        "Passionate about creating technology that serves and empowers communities",
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building bridges between ideas and innovation
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm an{" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  Aspiring Full-Stack Developer
                </span>{" "}
                and <span className="font-bold">Teaching Assistant</span> with
                deep expertise in building scalable web applications using
                modern JavaScript frameworks and backend technologies. Strong
                self-learning ability, adaptability, and cross-cultural
                experience.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                As a{" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  Lead Software Engineer at ChadNova
                </span>
                , I design and develop web-based platforms with focus on
                scalability, reliability, and security. I'm passionate about
                mentoring junior developers and aligning engineering decisions
                with organizational and community-oriented objectives.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                My teaching experience at AUCA allows me to stay current with
                industry best practices and effectively communicate complex
                concepts to diverse audiences. I'm comfortable working in Agile
                environments and contribute to projects that combine technical
                excellence with social impact.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Java, React, Node.js
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Primary Tech Stack
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  4 Roles
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Current Positions
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${strength.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <strength.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {strength.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-3xl p-12 border border-indigo-200 dark:border-indigo-800"
        >
          <div className="flex items-center gap-4 mb-8">
            <Award className="text-indigo-600 dark:text-indigo-400" size={32} />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Key Achievements
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                <Zap
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                6+ Projects Delivered
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Full-stack applications in production
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                <Users
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                Multiple Leadership Roles
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Community organizations & tech teams
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                <Brain
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                3+ Certifications
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Networking, design, and technical skills
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
