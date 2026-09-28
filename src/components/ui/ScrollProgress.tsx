import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2px] z-[60] origin-left rtl:origin-right"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
      }}
    />
  );
};

export default ScrollProgress;
