import React from "react";
import { motion } from "framer-motion";
import { Hammer, Presentation, Rocket, Telescope } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { nowItems, nowUpdated, type NowItem } from "../data/now";

const icons: Record<NowItem["icon"], typeof Hammer> = {
  build: Hammer,
  teach: Presentation,
  ship: Rocket,
  learn: Telescope,
};

const ui = {
  title: { en: "What I'm doing now", fr: "Ce que je fais en ce moment", ar: "ما أفعله الآن" },
  updated: { en: "updated", fr: "mis à jour", ar: "آخر تحديث" },
};

const Now: React.FC = () => {
  const { tr } = useLanguage();

  return (
    <section id="now" className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="shell-panel !rounded-2xl p-5 sm:p-7"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
            <h2 className="text-xl sm:text-2xl font-bold dev-heading">
              <span className="terminal-title text-secondary me-2">~/now</span>
              {tr(ui.title)}
            </h2>
            <span className="terminal-title text-xs dev-muted">
              {tr(ui.updated)} {tr(nowUpdated)}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {nowItems.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <motion.div
                  key={item.label.en}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-xl border border-line bg-surface/50 p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-[#0b1220] transition-colors">
                      <Icon size={16} />
                    </span>
                    <span className="terminal-title text-xs uppercase tracking-wider dev-muted">{tr(item.label)}</span>
                  </div>
                  <p className="text-sm dev-text leading-relaxed">{tr(item.text)}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Now;
