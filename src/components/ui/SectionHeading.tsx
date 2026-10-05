import React from "react";
import { motion } from "framer-motion";

type Props = {
  /** Terminal-style command shown above the title, e.g. "projects --showcase" */
  command: string;
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

/** Section title block; fades up once as it enters the viewport. */
const SectionHeading: React.FC<Props> = ({ command, title, subtitle, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-12 sm:mb-16"
  >
    <div className="section-tag">
      <span className="text-secondary">$</span> {command}
    </div>

    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold dev-heading tracking-tight">{title}</h2>

    <div className="section-divider" />

    {subtitle && <p className="text-base sm:text-lg dev-muted max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
    {children}
  </motion.div>
);

export default SectionHeading;
