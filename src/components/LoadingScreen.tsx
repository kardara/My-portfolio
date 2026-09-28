import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  /** Called as the overlay starts fading out */
  onReveal: () => void;
  onComplete: () => void;
}

const BOOT_SEQUENCE = [
  { text: "$ initializing portfolio v2.0...", delay: 80, color: "#3fb950" },
  { text: "> loading modules.................. [OK]", delay: 280 },
  { text: "> mounting components.............. [OK]", delay: 460 },
  { text: "> compiling assets................. [OK]", delay: 640 },
  { text: "> establishing connection.......... [OK]", delay: 820 },
  { text: "$ system online — welcome.", delay: 1000, color: "#58a6ff" },
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onReveal, onComplete }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_SEQUENCE.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleCount(i + 1);
          if (i === BOOT_SEQUENCE.length - 1) {
            timers.push(
              setTimeout(() => {
                setIsExiting(true);
                onReveal();
                timers.push(setTimeout(onComplete, 450));
              }, 300)
            );
          }
        }, line.delay)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [onReveal, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#0d1117" }}
        >
          {/* Animated glowing orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.18, 0.45, 0.18] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{
                top: "20%",
                left: "20%",
                width: 420,
                height: 420,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(88,166,255,0.28) 0%, transparent 70%)",
                filter: "blur(48px)",
              }}
            />
            <motion.div
              animate={{ scale: [1.25, 1, 1.25], opacity: [0.12, 0.3, 0.12] }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
              className="absolute"
              style={{
                bottom: "20%",
                right: "20%",
                width: 360,
                height: 360,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(63,185,80,0.22) 0%, transparent 70%)",
                filter: "blur(48px)",
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                height: 600,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(233,84,32,0.1) 0%, transparent 65%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-md px-6">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: -28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="text-center mb-10"
            >
              <div
                className="terminal-title font-bold mb-3"
                style={{ fontSize: "2.25rem" }}
              >
                <span style={{ color: "#e95420" }}>azd</span>
                <span style={{ color: "#484f58" }}>@portfolio:</span>
                <span style={{ color: "#58a6ff" }}>~</span>
                <span style={{ color: "#3fb950" }}>$</span>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="terminal-title text-xs"
                style={{ color: "#484f58", letterSpacing: "0.08em" }}
              >
                Abdoulaye Zakaria Djerou &nbsp;·&nbsp; Full Stack Developer
              </motion.p>
            </motion.div>

            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(22,27,34,0.98)",
                border: "1px solid #30363d",
                boxShadow:
                  "0 0 80px rgba(88,166,255,0.07), 0 24px 80px rgba(0,0,0,0.55)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  borderBottom: "1px solid #30363d",
                  background: "rgba(13,17,23,0.85)",
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#ff5f56" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#ffbd2e" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#27c93f" }}
                />
                <span
                  className="terminal-title text-xs ml-2"
                  style={{ color: "#484f58" }}
                >
                  portfolio.sh — bash
                </span>
              </div>

              {/* Terminal content */}
              <div
                className="p-5 space-y-3"
                style={{ minHeight: 175 }}
              >
                {BOOT_SEQUENCE.slice(0, visibleCount).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="terminal-title text-sm flex items-center gap-1"
                    style={{ color: line.color ?? "#c9d1d9" }}
                  >
                    <span>{line.text}</span>
                    {i === visibleCount - 1 &&
                      i < BOOT_SEQUENCE.length - 1 && (
                        <span className="type-cursor">|</span>
                      )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5"
            >
              <div
                className="flex justify-between terminal-title text-xs mb-2"
                style={{ color: "#484f58" }}
              >
                <span>Loading</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  100%
                </motion.span>
              </div>
              <div
                className="h-[2px] rounded-full overflow-hidden"
                style={{ background: "#21262d" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    background:
                      "linear-gradient(90deg, #58a6ff 0%, #3fb950 100%)",
                    boxShadow: "0 0 10px rgba(88,166,255,0.55)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
