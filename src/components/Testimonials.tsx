import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { testimonials } from "../data/testimonials";
import SectionHeading from "./ui/SectionHeading";

const ui = {
  title: { en: "Kind Words", fr: "Ils en parlent", ar: "كلمات طيبة" },
  subtitle: {
    en: "From people I've built with, taught, and worked for.",
    fr: "De personnes avec qui j'ai construit, que j'ai formées, ou pour qui j'ai travaillé.",
    ar: "من أشخاص بنيت معهم ودرّستهم وعملت لديهم.",
  },
  prev: { en: "Previous", fr: "Précédent", ar: "السابق" },
  next: { en: "Next", fr: "Suivant", ar: "التالي" },
};

/** Hidden until src/data/testimonials.ts has entries. */
const Testimonials: React.FC = () => {
  const { tr } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [count, paused]);

  if (count === 0) return null;
  const t = testimonials[index];

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <SectionHeading command="cat reviews.log" title={tr(ui.title)} subtitle={tr(ui.subtitle)} />

        <div
          className="shell-panel !rounded-3xl p-6 sm:p-10 relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote size={40} className="text-primary/30 absolute top-6 start-6" />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative pt-8"
            >
              <blockquote className="text-lg sm:text-2xl dev-heading leading-relaxed font-medium">
                “{tr(t.quote)}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                {t.href ? (
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                    {t.name}
                  </a>
                ) : (
                  <span className="font-semibold dev-heading">{t.name}</span>
                )}
                <span className="dev-muted"> · {t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {count > 1 && (
            <div className="flex items-center gap-3 mt-8">
              <button
                aria-label={tr(ui.prev)}
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                className="p-2 rounded-full border border-line dev-text hover:border-primary hover:text-primary"
              >
                <ChevronLeft size={16} className="rtl:rotate-180" />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`${i + 1} / ${count}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-1.5 bg-line"}`}
                  />
                ))}
              </div>
              <button
                aria-label={tr(ui.next)}
                onClick={() => setIndex((i) => (i + 1) % count)}
                className="p-2 rounded-full border border-line dev-text hover:border-primary hover:text-primary"
              >
                <ChevronRight size={16} className="rtl:rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
