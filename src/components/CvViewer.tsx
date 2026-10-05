import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { asset, profile } from "../data/profile";

const ui = {
  title: { en: "Curriculum Vitae", fr: "Curriculum Vitae", ar: "السيرة الذاتية" },
  download: { en: "Download PDF", fr: "Télécharger le PDF", ar: "تحميل PDF" },
  openTab: { en: "Open in a new tab", fr: "Ouvrir dans un nouvel onglet", ar: "فتح في علامة تبويب جديدة" },
  close: { en: "Close", fr: "Fermer", ar: "إغلاق" },
  page: { en: "Page", fr: "Page", ar: "صفحة" },
};

const pages = Array.from({ length: profile.cvPages }, (_, i) => i + 1);
const FILE_NAME = "CV-Abdoulaye-Zakaria-Djerou.pdf";

const Page: React.FC<{ n: number; label: string }> = ({ n, label }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + n * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      data-page={n}
      className="relative w-full aspect-[210/297] overflow-hidden bg-white shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)] ring-1 ring-black/10"
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-slate-100 to-slate-200" />}
      <img
        src={asset(`cv/page-${n}.jpg`)}
        srcSet={`${asset(`cv/page-sm-${n}.jpg`)} 760w, ${asset(`cv/page-${n}.jpg`)} 1400w`}
        sizes="(min-width: 900px) 820px, 100vw"
        alt={`${label} ${n}`}
        width={1400}
        height={1980}
        loading={n === 1 ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`relative block w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </motion.div>
  );
};

const CvViewer: React.FC = () => {
  const { tr } = useLanguage();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setCurrent(1);
      setOpen(true);
    };
    window.addEventListener("open-cv-viewer", onOpen);
    return () => window.removeEventListener("open-cv-viewer", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => closeBtn.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /** The page whose top has passed the upper third of the viewer is the current one. */
  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const mark = el.getBoundingClientRect().top + el.clientHeight / 3;
    let page = 1;
    el.querySelectorAll<HTMLElement>("[data-page]").forEach((p) => {
      if (p.getBoundingClientRect().top <= mark) page = Number(p.dataset.page);
    });
    setCurrent(page);
  }, []);

  const iconBtn =
    "grid place-items-center w-9 h-9 shrink-0 border border-line bg-panel dev-muted hover:text-primary hover:border-primary transition-colors";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 lg:p-6"
        >
          <button
            aria-label={tr(ui.close)}
            tabIndex={-1}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-viewer-title"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 36 }}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
            className="relative flex flex-col w-full max-w-4xl h-[94dvh] sm:h-full border border-line bg-surface shadow-2xl overflow-hidden"
          >
            {/* Toolbar */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 border-b border-line">
              <div className="grid place-items-center w-9 h-9 shrink-0 bg-primary/15 text-primary">
                <FileText size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 id="cv-viewer-title" className="font-bold dev-heading leading-tight truncate">
                  {tr(ui.title)}
                </h3>
                <p className="terminal-title text-[11px] dev-muted truncate" dir="ltr">
                  {profile.name} · PDF
                </p>
              </div>

              <span
                className="hidden sm:inline-flex items-center terminal-title text-xs dev-muted px-2.5 py-1 border border-line"
                aria-live="polite"
              >
                {tr(ui.page)} {current} / {pages.length}
              </span>

              <a
                href={profile.cv}
                download={FILE_NAME}
                className="hidden sm:inline-flex items-center gap-2 h-9 px-3.5 bg-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Download size={16} />
                {tr(ui.download)}
              </a>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tr(ui.openTab)}
                title={tr(ui.openTab)}
                className={iconBtn}
              >
                <ExternalLink size={16} className="rtl:-scale-x-100" />
              </a>
              <button ref={closeBtn} onClick={() => setOpen(false)} aria-label={tr(ui.close)} className={iconBtn}>
                <X size={16} />
              </button>
            </div>

            {/* Pages */}
            <div
              ref={scroller}
              onScroll={onScroll}
              className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-panel/60 [background-image:radial-gradient(var(--dev-border)_1px,transparent_1px)] [background-size:18px_18px]"
            >
              <div className="mx-auto w-full max-w-[820px] px-3 py-4 sm:px-8 sm:py-8 space-y-4 sm:space-y-6">
                {pages.map((n) => (
                  <Page key={n} n={n} label={tr(ui.page)} />
                ))}
              </div>
            </div>

            {/* Download bar on phones */}
            <div className="sm:hidden flex items-center gap-3 p-3 border-t border-line bg-surface">
              <span className="terminal-title text-xs dev-muted shrink-0" aria-hidden="true">
                {current} / {pages.length}
              </span>
              <a
                href={profile.cv}
                download={FILE_NAME}
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 bg-accent text-white font-semibold"
              >
                <Download size={18} />
                {tr(ui.download)}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CvViewer;
