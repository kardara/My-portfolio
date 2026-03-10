import React from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  Mail,
  Linkedin,
  Github,
  Code2,
  Zap,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Hero: React.FC = () => {
  const { language } = useLanguage();

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Zakaria_CV.pdf";
    link.download = "CV-Abdoulaye-Zakaria-Djerou.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Unique Background with Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-300 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-10 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full opacity-15 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`space-y-8 ${language === "ar" ? "text-right" : "text-left"}`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"
            >
              <Zap size={16} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                Full-Stack Developer & Technical Leader
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 dark:text-white"
            >
              Abdoulaye <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Zakaria Djerou
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2"
            >
              <Code2
                size={28}
                className="text-indigo-600 dark:text-indigo-400"
              />
              Architecting Digital Solutions
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl"
            >
              Aspiring Full-Stack Developer & Teaching Assistant with strong
              expertise in building scalable web applications. Lead Software
              Engineer at ChadNova, passionate about mentoring teams, solving
              complex problems, and creating technology that makes an impact.
            </motion.p>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200 dark:border-gray-700"
            >
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  6+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Projects Built
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  30+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Skills Mastered
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  3
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Certifications
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get in Touch
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={20} />
                Download CV
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="flex gap-4 pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:azdjerou@gmail.com"
                title="Email"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <Mail size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/abdoulaye-zakaria-djerou-022613327"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/kardara"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <Github size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image with Modern Design */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{
                y: [0, -30, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Decorative Background Shapes */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-3xl transform -rotate-6"></div>

              {/* Profile Image */}
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                <img
                  src="/pic2.jpg"
                  alt="Abdoulaye Zakaria Djerou"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Tech Icons */}
              <motion.div
                animate={{ rotate: 360, y: [0, -20, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white dark:border-gray-800"
              >
                💻
              </motion.div>

              <motion.div
                animate={{ rotate: -360, y: [0, 20, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-white dark:border-gray-800"
              >
                🚀
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -right-12 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg border-4 border-white dark:border-gray-800"
              >
                ⚡
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400 dark:text-gray-600 cursor-pointer"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-sm mb-2 font-medium">Discover More</span>
            <ChevronDown
              size={28}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
