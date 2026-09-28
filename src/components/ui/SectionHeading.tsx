import React from "react";
import { motion } from "framer-motion";

type Props = {
  /** Terminal-style command shown above the title, e.g. "projects --showcase" */
  command: string;
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

const word = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(6px)" },
  show: { opacity: 1, y: "0em", filter: "blur(0px)" },
};

const SectionHeading: React.FC<Props> = ({ command, title, subtitle, children }) => (
  <div className="text-center mb-12 sm:mb-16">
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="section-tag"
    >
      <span className="text-secondary">$</span> {command}
    </motion.div>

    <motion.h2
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.07 }}
      className="text-4xl sm:text-5xl md:text-6xl font-bold dev-heading tracking-tight"
      aria-label={title}
    >
      {title.split(" ").map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block me-[0.25em] last:me-0"
          aria-hidden="true"
        >
          {w}
        </motion.span>
      ))}
    </motion.h2>

    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="section-divider"
    />

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-base sm:text-lg dev-muted max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    {children}
  </div>
);

export default SectionHeading;
