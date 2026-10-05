import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

/** Tint of the cubes per section; colour transitions are handled by CSS (see `transition` below). */
const sectionTint: Record<string, string> = {
  home: "var(--color-primary)",
  about: "var(--color-secondary)",
  now: "var(--color-secondary)",
  journey: "var(--color-accent)",
  projects: "var(--color-primary)",
  skills: "var(--color-secondary)",
  testimonials: "var(--color-accent)",
  contact: "var(--color-primary)",
};

const useActiveSection = () => {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const els = Object.keys(sectionTint)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
};

const faces = ["rotateY(0deg)", "rotateY(180deg)", "rotateY(90deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"];

type CubeProps = {
  size: number;
  /** position in % of the viewport */
  x: number;
  y: number;
  /** how many full turns over the whole page */
  turns: number;
  /** vertical drift in px over the whole page (parallax) */
  drift: number;
  progress: MotionValue<number>;
  className?: string;
};

const Cube: React.FC<CubeProps> = ({ size, x, y, turns, drift, progress, className = "" }) => {
  const rotateX = useTransform(progress, [0, 1], [-20, -20 + 360 * turns * 0.6]);
  const rotateY = useTransform(progress, [0, 1], [30, 30 + 360 * turns]);
  const translateY = useTransform(progress, [0, 1], [0, drift]);

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, y: translateY, transformStyle: "preserve-3d" }}
    >
      <motion.div className="relative w-full h-full" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {faces.map((f) => (
          <div
            key={f}
            className="absolute inset-0 border border-current"
            style={{
              transform: `${f} translateZ(${size / 2}px)`,
              background: "color-mix(in srgb, currentColor 3%, transparent)",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

/**
 * Quiet wireframe cubes behind the page that turn and drift with the scroll. They stay hidden
 * in the hero (which has the particle cloud) and fade in once you scroll past it.
 */
const ScrollCubes: React.FC = () => {
  const reduce = useReducedMotion();
  const active = useActiveSection();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 22, mass: 0.8 });
  const [vh, setVh] = useState(() => window.innerHeight);
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const opacity = useTransform(scrollY, [vh * 0.4, vh * 0.9], [0, 1]);
  const turns = (n: number) => (reduce ? 0 : n);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none overflow-hidden"
      style={{ opacity, color: sectionTint[active], transition: "color 1.2s ease", perspective: 1100 }}
    >
      <div className="absolute inset-0 opacity-[0.16] dark:opacity-[0.2]" style={{ transformStyle: "preserve-3d" }}>
        <Cube size={150} x={84} y={14} turns={turns(0.8)} drift={-220} progress={progress} />
        <Cube size={70} x={4} y={30} turns={turns(-1.1)} drift={-360} progress={progress} />
        <Cube size={110} x={6} y={72} turns={turns(0.6)} drift={-160} progress={progress} className="hidden md:block" />
        <Cube size={48} x={90} y={62} turns={turns(-1.4)} drift={-420} progress={progress} className="hidden md:block" />
        <Cube size={90} x={80} y={86} turns={turns(1)} drift={-260} progress={progress} className="hidden lg:block" />
      </div>
    </motion.div>
  );
};

export default ScrollCubes;
