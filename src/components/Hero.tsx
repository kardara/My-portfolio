import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

/* ─── Particle Canvas ──────────────────────────────────────────── */
const ParticleCanvas: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth || canvas.clientWidth;
      canvas.height = canvas.offsetHeight || canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 28 : 48;
    type Pt = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const pts: Pt[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.45 + 0.08,
    }));

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88,166,255,${p.a})`;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(88,166,255,${0.11 * (1 - d / 95)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
};

/* ─── Hero ─────────────────────────────────────────────────────── */
const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  const greetingPrefix = language === "en" ? "Hi, I'm" : t("hero.greeting");
  const fullName = t("hero.name");
  const fullHeadline = `${greetingPrefix} ${fullName}`;
  const [typedHeadline, setTypedHeadline] = React.useState("");

  React.useEffect(() => {
    setTypedHeadline("");
    let index = 0;
    const typingSpeed = 78;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedHeadline(fullHeadline.slice(0, index));
      if (index >= fullHeadline.length) window.clearInterval(timer);
    }, typingSpeed);

    return () => window.clearInterval(timer);
  }, [fullHeadline]);

  const greetingWithSpace = `${greetingPrefix} `;
  const typedGreeting = typedHeadline.slice(
    0,
    Math.min(typedHeadline.length, greetingWithSpace.length)
  );
  const typedName =
    typedHeadline.length > greetingWithSpace.length
      ? typedHeadline.slice(greetingWithSpace.length)
      : "";

  /* 3-D card tilt ------------------------------------------------ */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 140, damping: 18 };
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [14, -14]),
    springCfg
  );
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-14, 14]),
    springCfg
  );
  const shineX = useTransform(rawX, [-0.5, 0.5], ["20%", "80%"]);
  const shineY = useTransform(rawY, [-0.5, 0.5], ["20%", "80%"]);

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleCardLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Zakaria_CV.pdf";
    link.download = "CV-Abdoulaye-Zakaria-Djerou.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-72px)] flex items-start justify-center relative overflow-hidden pt-8 sm:pt-10 md:pt-12"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <ParticleCanvas />

        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(139,148,158,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(139,148,158,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />

        <motion.div
          className="absolute top-12 -right-24 w-96 h-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(88,166,255,0.3) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-20 w-72 h-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(233,84,32,0.25) 0%, transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(63,185,80,0.07) 0%, transparent 65%)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-start max-w-6xl mx-auto">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`space-y-6 sm:space-y-8 ${language === "ar" ? "text-right" : "text-left"}`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--dev-border)] bg-[var(--dev-panel)] terminal-title"
            >
              <Zap size={16} className="text-[var(--color-secondary)]" />
              <span className="text-sm font-semibold dev-text">
                {t("hero.openRoles")}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight dev-heading"
            >
              <span>{typedGreeting}</span>
              <span className="bg-gradient-to-r from-[#58a6ff] via-[#79c0ff] to-[#3fb950] bg-clip-text text-transparent">
                {typedName}
              </span>
              <span className="type-cursor" aria-hidden="true">|</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="terminal-title text-base sm:text-lg md:text-xl dev-muted font-semibold flex items-center gap-2"
            >
              <Code2
                size={20}
                className="text-[var(--color-primary)] sm:w-6 sm:h-6"
              />
              {t("hero.title")}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-base sm:text-lg dev-text leading-relaxed max-w-xl"
            >
              {t("hero.description")}
            </motion.p>

            {/* Stats panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="shell-panel px-4 sm:px-6 py-4 sm:py-5"
            >
              <p className="terminal-title text-sm dev-muted mb-4 terminal-dots">
                {t("hero.summaryLabel")}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
                    10+
                  </div>
                  <p className="text-sm dev-muted">{t("hero.projectsStat")}</p>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[var(--color-secondary)]">
                    3
                  </div>
                  <p className="text-sm dev-muted">{t("hero.activeRolesStat")}</p>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[var(--color-accent)]">
                    5+
                  </div>
                  <p className="text-sm dev-muted">
                    {t("hero.certificationsStat")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[var(--color-accent)] text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
              >
                {t("hero.cta")}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[#0d1117] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download size={20} />
                {t("hero.downloadCV")}
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="flex gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              {[
                {
                  href: "mailto:azdjerou@gmail.com",
                  icon: <Mail size={20} className="sm:w-6 sm:h-6" />,
                  title: "Email",
                },
                {
                  href: "https://www.linkedin.com/in/abdoulaye-zakaria-djerou-022613327",
                  icon: <Linkedin size={20} className="sm:w-6 sm:h-6" />,
                  title: "LinkedIn",
                  external: true,
                },
                {
                  href: "https://github.com/kardara",
                  icon: <Github size={20} className="sm:w-6 sm:h-6" />,
                  title: "GitHub",
                  external: true,
                },
              ].map((link) => (
                <motion.a
                  key={link.title}
                  whileHover={{ scale: 1.18, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={link.href}
                  title={link.title}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="p-3 sm:p-4 bg-[var(--dev-panel)] border border-[var(--dev-border)] rounded-xl dev-muted hover:text-[#58a6ff] hover:border-[#58a6ff] transition-all duration-300"
                  style={{
                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — 3D card */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center mt-4 sm:mt-6 lg:mt-8"
          >
            {/* Float wrapper */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-sm sm:max-w-md"
              style={{ perspective: 1200 }}
            >
              {/* 3-D tilt card */}
              <motion.div
                style={{ rotateX, rotateY, transformOrigin: "center center" }}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                className="shell-panel p-4 sm:p-6 relative"
              >
                {/* Dynamic shine overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.07) 0%, transparent 55%)`,
                    zIndex: 5,
                  }}
                />

                <p className="terminal-title text-xs dev-muted mb-4 terminal-dots">
                  {t("hero.systemStatus")}
                </p>

                {/* Photo */}
                <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[var(--dev-border)]">
                  <img
                    src="/kardara.png"
                    alt="Abdoulaye Zakaria Djerou"
                    className="w-full h-full object-cover"
                  />
                  {/* Photo overlay gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 60%, rgba(88,166,255,0.1) 100%)",
                    }}
                  />
                </div>

                {/* Info tags */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 terminal-title text-[11px] sm:text-xs relative z-10">
                  {[
                    {
                      text: t("hero.roleEngineer"),
                      color: "var(--color-primary)",
                    },
                    {
                      text: t("hero.statusAvailable"),
                      color: "var(--color-secondary)",
                    },
                    {
                      text: t("hero.locationLabel"),
                      color: "var(--color-accent)",
                    },
                    { text: t("hero.focusLabel"), color: "var(--dev-text)" },
                  ].map((tag, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      className="rounded-lg border border-[var(--dev-border)] bg-gray-100 dark:bg-[#0d1117] px-3 py-2 transition-all duration-200"
                      style={{ color: tag.color }}
                    >
                      {tag.text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center dev-muted cursor-pointer"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="terminal-title text-xs mb-2">
              {t("hero.scrollNext")}
            </span>
            <ChevronDown size={26} className="text-[var(--color-primary)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
