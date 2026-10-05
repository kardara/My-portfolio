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

/** Cube scale for the viewport width: smaller on phones and tablets so they stay in the margins. */
const cubeScale = (w: number) => (w < 640 ? 0.55 : w < 1024 ? 0.75 : 1);

/**
 * Quiet wireframe cubes behind the whole page, hero included, that turn and drift with the scroll.
 */
const ScrollCubes: React.FC = () => {
  const reduce = useReducedMotion();
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 22, mass: 0.8 });
  const [scale, setScale] = useState(() => cubeScale(window.innerWidth));
  useEffect(() => {
    const onResize = () => setScale(cubeScale(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const turns = (n: number) => (reduce ? 0 : n);
  const size = (px: number) => Math.round(px * scale);

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="fixed inset-0 -z-20 pointer-events-none overflow-hidden"
      style={{ color: sectionTint[active], transition: "color 1.2s ease", perspective: 1100 }}
    >
      <div className="absolute inset-0 opacity-[0.16] dark:opacity-[0.2]" style={{ transformStyle: "preserve-3d" }}>
        <Cube size={size(150)} x={82} y={12} turns={turns(0.8)} drift={-220} progress={progress} />
        <Cube size={size(70)} x={4} y={30} turns={turns(-1.1)} drift={-360} progress={progress} />
        <Cube size={size(110)} x={6} y={72} turns={turns(0.6)} drift={-160} progress={progress} />
        <Cube size={size(48)} x={88} y={58} turns={turns(-1.4)} drift={-420} progress={progress} />
        <Cube size={size(90)} x={78} y={86} turns={turns(1)} drift={-260} progress={progress} />
      </div>
    </motion.div>
  );
};

export default ScrollCubes;
