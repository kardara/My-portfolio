import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage, type Localized } from "../contexts/LanguageContext";
import { kindLabels, milestones, type MilestoneKind } from "../data/journey";
import SectionHeading from "./ui/SectionHeading";

const ui = {
  title: { en: "The Journey", fr: "Le parcours", ar: "المسيرة" },
  subtitle: {
    en: "From the Red Cross in N'Djamena to Carnegie Mellon University Africa in Kigali: one path, many languages.",
    fr: "De la Croix-Rouge à N'Djamena à Carnegie Mellon University Africa à Kigali : un chemin, plusieurs langues.",
    ar: "من الصليب الأحمر في نجامينا إلى جامعة كارنيغي ميلون أفريقيا في كيغالي: طريق واحد ولغات كثيرة.",
  },
  until: { en: "until 2022", fr: "jusqu'en 2022", ar: "حتى 2022" },
  since: { en: "since 2023", fr: "depuis 2023", ar: "منذ 2023" },
  now: { en: "now", fr: "actuel", ar: "حالياً" },
} satisfies Record<string, Localized>;

const kindStyle: Record<MilestoneKind, { color: string }> = {
  work: { color: "var(--color-primary)" },
  education: { color: "var(--color-secondary)" },
  community: { color: "var(--color-accent)" },
};

const ROUTE = "M 90 70 C 230 20, 330 210, 510 150";

/** Stylised N'Djamena → Kigali route with a traveller that follows the path. */
const RouteMap: React.FC = () => {
  const { tr } = useLanguage();
  const ref = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const [point, setPoint] = useState({ x: 90, y: 70 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(progress, 1, { duration: reduce ? 0 : 2.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 });
    return () => controls.stop();
  }, [inView, progress, reduce]);

  useEffect(
    () =>
      progress.on("change", (v) => {
        const path = pathRef.current;
        if (!path) return;
        const p = path.getPointAtLength(v * path.getTotalLength());
        setPoint({ x: p.x, y: p.y });
      }),
    [progress],
  );

  const distance = useTransform(progress, (v) => `${Math.round(v * 2280).toLocaleString()} km`);

  return (
    <div className="shell-panel !rounded-2xl p-4 sm:p-6 mb-14" dir="ltr">
      <svg ref={ref} viewBox="0 0 600 230" className="w-full h-auto" role="img" aria-label="N'Djamena, Chad to Kigali, Rwanda, about 2,280 km">
        <defs>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="var(--dev-border)" />
          </pattern>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
        <rect width="600" height="230" fill="url(#dots)" opacity="0.7" rx="12" />

        <path d={ROUTE} fill="none" stroke="var(--dev-border)" strokeWidth="2" strokeDasharray="4 6" />
        <motion.path
          ref={pathRef}
          d={ROUTE}
          fill="none"
          stroke="url(#route)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />

        {[
          { x: 90, y: 70, city: "N'Djamena", country: "Tchad 🇹🇩", sub: tr(ui.until), color: "var(--color-accent)", anchor: "start" as const, dy: -40 },
          { x: 510, y: 150, city: "Kigali", country: "Rwanda 🇷🇼", sub: tr(ui.since), color: "var(--color-primary)", anchor: "end" as const, dy: 40 },
        ].map((c) => (
          <g key={c.city}>
            <motion.circle
              cx={c.x}
              cy={c.y}
              r="14"
              fill={c.color}
              opacity="0.18"
              animate={reduce ? undefined : { r: [10, 20, 10], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <circle cx={c.x} cy={c.y} r="6" fill={c.color} stroke="var(--dev-bg)" strokeWidth="2" />
            <text x={c.x + (c.anchor === "start" ? -8 : 8)} y={c.y + c.dy} textAnchor={c.anchor} className="terminal-title" fontSize="15" fontWeight="700" fill="var(--dev-heading)">
              {c.city}
            </text>
            <text x={c.x + (c.anchor === "start" ? -8 : 8)} y={c.y + c.dy + 17} textAnchor={c.anchor} className="terminal-title" fontSize="11" fill="var(--dev-muted)">
              {c.country} · {c.sub}
            </text>
          </g>
        ))}

        <circle cx={point.x} cy={point.y} r="5" fill="var(--dev-heading)" />
        <foreignObject x="250" y="186" width="120" height="30">
          <motion.div className="terminal-title text-xs text-center dev-muted">{distance}</motion.div>
        </foreignObject>
      </svg>
    </div>
  );
};

type Filter = "all" | MilestoneKind;

const Journey: React.FC = () => {
  const { tr } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const visible = milestones.filter((m) => filter === "all" || m.kind === filter);
  const filters: Filter[] = ["all", "work", "education", "community"];

  return (
    <section id="journey" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <SectionHeading command="git log --reverse --oneline" title={tr(ui.title)} subtitle={tr(ui.subtitle)} />

        <RouteMap />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => {
            const active = f === filter;
            const color = f === "all" ? "var(--dev-heading)" : kindStyle[f].color;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`relative px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  active ? "border-transparent" : "border-line dev-muted hover:text-ink"
                }`}
                style={active ? { color } : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="journey-filter"
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  {f !== "all" && <span className="w-2 h-2 rounded-full" style={{ background: kindStyle[f].color }} />}
                  {tr(kindLabels[f])}
                </span>
              </button>
            );
          })}
        </div>

        <div ref={listRef} className="relative">
          {/* track + scroll-linked fill */}
          <div className="absolute top-0 bottom-0 start-[7px] lg:start-1/2 w-px bg-line lg:-translate-x-1/2" />
          <motion.div
            className="absolute top-0 bottom-0 start-[7px] lg:start-1/2 w-[2px] origin-top lg:-translate-x-1/2"
            style={{
              scaleY: lineScale,
              background: "linear-gradient(180deg, var(--color-accent), var(--color-secondary) 45%, var(--color-primary))",
            }}
          />

          <motion.ol layout className="space-y-5 sm:space-y-8 lg:space-y-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((m, i) => {
                const { color } = kindStyle[m.kind];
                const right = i % 2 === 1;
                return (
                  <motion.li
                    key={`${m.period}-${m.org}`}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative ps-7 sm:ps-9 lg:ps-0 lg:grid lg:grid-cols-2 lg:gap-16"
                  >
                    {/* node */}
                    <div
                      className="absolute top-7 start-[1px] lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2 w-3.5 h-3.5 rounded-full border-[3px] border-surface z-10"
                      style={{ background: color, boxShadow: `0 0 0 1px ${color}` }}
                    />

                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`shell-panel !rounded-2xl p-4 sm:p-6 ${right ? "lg:col-start-2" : "lg:col-start-1 lg:text-end"}`}
                    >
                      <div className={`flex flex-wrap items-center gap-2 mb-2 terminal-title text-xs ${right ? "" : "lg:justify-end"}`}>
                        <span style={{ color }} className="font-semibold">{m.period}</span>
                        {m.current && (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-secondary/15 text-secondary text-[10px] uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            {tr(ui.now)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold dev-heading leading-snug">{tr(m.title)}</h3>
                      <p className="text-sm font-medium mb-2" style={{ color }}>{m.org}</p>
                      <p className="text-sm dev-text leading-relaxed">{tr(m.description)}</p>
                      {m.tags && (
                        <div className={`flex flex-wrap gap-1.5 mt-3 ${right ? "" : "lg:justify-end"}`}>
                          {m.tags.map((t) => (
                            <span
                              key={t.en}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                              style={{ color, borderColor: `color-mix(in srgb, ${color} 35%, transparent)`, background: `color-mix(in srgb, ${color} 8%, transparent)` }}
                            >
                              {tr(t)}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ol>
        </div>
      </div>
    </section>
  );
};

export default Journey;
