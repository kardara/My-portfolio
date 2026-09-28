import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage, type Language, type Localized } from "../contexts/LanguageContext";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { openCvViewer } from "../lib/events";

type Group = "navigate" | "projects" | "actions" | "settings" | "fun";

type Command = {
  id: string;
  /** What the visitor types, shown in mono */
  cmd: string;
  label: Localized;
  group: Group;
  keywords?: string;
  run: () => string[] | void;
};

const groupLabels: Record<Group, Localized> = {
  navigate: { en: "Navigate", fr: "Naviguer", ar: "التنقل" },
  projects: { en: "Projects", fr: "Projets", ar: "المشاريع" },
  actions: { en: "Actions", fr: "Actions", ar: "إجراءات" },
  settings: { en: "Settings", fr: "Réglages", ar: "الإعدادات" },
  fun: { en: "Easter eggs", fr: "Surprises", ar: "مفاجآت" },
};

const ui = {
  placeholder: { en: "Type a command or search…", fr: "Tapez une commande ou cherchez…", ar: "اكتب أمراً أو ابحث…" },
  empty: { en: "command not found. Try 'help'.", fr: "commande introuvable. Essayez 'help'.", ar: "الأمر غير موجود. جرّب 'help'." },
  hint: { en: "to run · Esc to close", fr: "pour exécuter · Échap pour fermer", ar: "للتنفيذ · Esc للإغلاق" },
};


const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { toggleTheme, theme } = useTheme();
  const { tr, setLanguage } = useLanguage();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setOutput([]);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const nav = (id: string, cmd: string, label: Localized): Command => ({
      id: `nav-${id}`,
      cmd,
      label,
      group: "navigate",
      run: () => {
        close();
        scrollToId(id);
      },
    });
    const lang = (code: Language, name: string): Command => ({
      id: `lang-${code}`,
      cmd: `lang ${code}`,
      label: { en: `Switch to ${name}`, fr: `Passer en ${name}`, ar: `التبديل إلى ${name}` },
      group: "settings",
      keywords: "language langue لغة",
      run: () => {
        setLanguage(code);
        return [`✓ lang=${code}`];
      },
    });

    return [
      nav("home", "cd ~", { en: "Go to top", fr: "Retour en haut", ar: "العودة للأعلى" }),
      nav("about", "cd about", { en: "About me", fr: "À propos", ar: "نبذة عني" }),
      nav("journey", "cd journey", { en: "My journey", fr: "Mon parcours", ar: "مسيرتي" }),
      nav("projects", "cd projects", { en: "Projects", fr: "Projets", ar: "المشاريع" }),
      nav("skills", "cd skills", { en: "Skills", fr: "Compétences", ar: "المهارات" }),
      nav("contact", "cd contact", { en: "Contact", fr: "Contact", ar: "التواصل" }),

      ...projects.map<Command>((p) => ({
        id: `project-${p.id}`,
        cmd: `open ${p.id}`,
        label: { en: p.title, fr: p.title, ar: p.title },
        group: "projects",
        keywords: `${p.title} ${p.stack.join(" ")}`,
        run: () => {
          close();
          scrollToId("projects");
          window.dispatchEvent(new CustomEvent("open-project", { detail: p.id }));
        },
      })),

      {
        id: "cv",
        cmd: "cv",
        label: { en: "View my CV", fr: "Voir mon CV", ar: "عرض سيرتي الذاتية" },
        group: "actions",
        keywords: "resume download pdf",
        run: () => {
          window.setTimeout(() => {
            close();
            openCvViewer();
          }, 400);
          return ["✓ opening cv.pdf…"];
        },
      },
      {
        id: "email",
        cmd: "email",
        label: { en: "Copy my email address", fr: "Copier mon adresse e-mail", ar: "نسخ بريدي الإلكتروني" },
        group: "actions",
        keywords: "mail contact",
        run: () => {
          navigator.clipboard?.writeText(profile.email).catch(() => undefined);
          return [`✓ ${profile.email} → clipboard`];
        },
      },
      {
        id: "message",
        cmd: "message",
        label: { en: "Send me a message", fr: "M'envoyer un message", ar: "أرسل لي رسالة" },
        group: "actions",
        keywords: "contact form",
        run: () => {
          close();
          window.dispatchEvent(new Event("open-contact-modal"));
        },
      },
      {
        id: "meet",
        cmd: "meet",
        label: { en: "Book a meeting (Google Calendar)", fr: "Réserver un rendez-vous (Google Agenda)", ar: "حجز اجتماع (تقويم Google)" },
        group: "actions",
        keywords: "schedule calendar",
        run: () => {
          openUrl(profile.calendar);
          return ["→ calendar.google.com"];
        },
      },
      {
        id: "github",
        cmd: "github",
        label: { en: "Open GitHub", fr: "Ouvrir GitHub", ar: "فتح GitHub" },
        group: "actions",
        run: () => {
          openUrl(profile.github);
          return ["→ github.com/kardara"];
        },
      },
      {
        id: "linkedin",
        cmd: "linkedin",
        label: { en: "Open LinkedIn", fr: "Ouvrir LinkedIn", ar: "فتح LinkedIn" },
        group: "actions",
        run: () => {
          openUrl(profile.linkedin);
          return ["→ linkedin.com"];
        },
      },
      {
        id: "whatsapp",
        cmd: "whatsapp",
        label: { en: "Chat on WhatsApp", fr: "Discuter sur WhatsApp", ar: "الدردشة عبر واتساب" },
        group: "actions",
        run: () => {
          openUrl(profile.whatsapp);
          return ["→ wa.me"];
        },
      },

      {
        id: "theme",
        cmd: "theme",
        label: {
          en: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
          fr: theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre",
          ar: theme === "dark" ? "التبديل إلى المظهر الفاتح" : "التبديل إلى المظهر الداكن",
        },
        group: "settings",
        keywords: "dark light mode",
        run: () => {
          toggleTheme();
          return [`✓ theme=${theme === "dark" ? "light" : "dark"}`];
        },
      },
      lang("en", "English"),
      lang("fr", "Français"),
      lang("ar", "العربية"),

      {
        id: "whoami",
        cmd: "whoami",
        label: { en: "Who is this?", fr: "Qui est-ce ?", ar: "من أنا؟" },
        group: "fun",
        run: () => [
          "abdoulaye zakaria djerou (kardara)",
          "├─ software developer @ auca",
          "├─ msit student (ai/ml) @ cmu-africa",
          "├─ from n'djamena 🇹🇩 → kigali 🇷🇼",
          "└─ speaks: en · fr · ar",
        ],
      },
      {
        id: "hire",
        cmd: "sudo hire-me",
        label: { en: "You know you want to", fr: "Vous savez que vous en avez envie", ar: "أنت تعرف أنك تريد ذلك" },
        group: "fun",
        keywords: "hire job recruit",
        run: () => {
          window.setTimeout(() => {
            close();
            window.dispatchEvent(new Event("open-contact-modal"));
          }, 900);
          return ["[sudo] password for recruiter: ********", "✓ permission granted. opening a channel…"];
        },
      },
      {
        id: "help",
        cmd: "help",
        label: { en: "List everything I can do", fr: "Lister toutes les commandes", ar: "عرض كل الأوامر" },
        group: "fun",
        run: () => {
          setQuery("");
          return ["tip: type part of any command, ↑↓ to move, ↵ to run"];
        },
      },
      {
        id: "clear",
        cmd: "clear",
        label: { en: "Clear the output", fr: "Effacer la sortie", ar: "مسح المخرجات" },
        group: "fun",
        run: () => {
          setOutput([]);
        },
      },
    ];
  }, [close, setLanguage, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.cmd} ${tr(c.label)} ${c.label.en} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query, tr]);

  // Global shortcuts: ⌘K / Ctrl+K anywhere, "/" when not typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (c: Command | undefined) => {
    if (!c) {
      if (query.trim()) setOutput((o) => [...o, `$ ${query}`, tr(ui.empty)].slice(-12));
      return;
    }
    const result = c.run();
    if (result) setOutput((o) => [...o, `$ ${c.cmd}`, ...result].slice(-12));
    if (c.id !== "help") setQuery("");
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const exact = filtered.find((c) => c.cmd === query.trim().toLowerCase());
      run(exact ?? filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  let index = -1;
  const groups = (Object.keys(groupLabels) as Group[])
    .map((g) => ({ g, items: filtered.filter((c) => c.group === g) }))
    .filter(({ items }) => items.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            aria-label="Close"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm cursor-default"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-panel">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="terminal-title text-xs dev-muted ms-2" dir="ltr">
                kardara@portfolio: ~
              </span>
              <kbd className="ms-auto terminal-title text-[10px] dev-muted border border-line rounded px-1.5 py-0.5">
                esc
              </kbd>
            </div>

            {/* Output history */}
            {output.length > 0 && (
              <div className="px-4 pt-3 terminal-title text-xs space-y-0.5 max-h-36 overflow-y-auto" dir="ltr">
                {output.map((line, i) => (
                  <motion.div
                    key={`${i}-${line}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={line.startsWith("$") ? "dev-muted" : "text-secondary"}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Prompt */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
              <span className="terminal-title text-sm text-secondary">$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={tr(ui.placeholder)}
                spellCheck={false}
                autoComplete="off"
                aria-label={tr(ui.placeholder)}
                className="flex-1 bg-transparent outline-none terminal-title text-sm dev-heading placeholder:text-muted"
              />
            </div>

            {/* Commands */}
            <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2" role="listbox">
              {groups.length === 0 && (
                <p className="terminal-title text-xs dev-muted px-3 py-6 text-center">{tr(ui.empty)}</p>
              )}
              {groups.map(({ g, items }) => (
                <div key={g} className="mb-1">
                  <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.14em] dev-muted terminal-title">
                    {tr(groupLabels[g])}
                  </p>
                  {items.map((c) => {
                    index += 1;
                    const i = index;
                    const isActive = i === active;
                    return (
                      <button
                        key={c.id}
                        data-index={i}
                        role="option"
                        aria-selected={isActive}
                        onMouseMove={() => setActive(i)}
                        onClick={() => run(c)}
                        className="relative w-full flex items-center gap-3 px-3 py-2 rounded-lg text-start"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="palette-active"
                            className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/30"
                            transition={{ type: "spring", stiffness: 500, damping: 38 }}
                          />
                        )}
                        <span
                          className={`relative terminal-title text-xs min-w-[7.5rem] ${
                            isActive ? "text-primary" : "dev-muted"
                          }`}
                          dir="ltr"
                        >
                          {c.cmd}
                        </span>
                        <span className="relative text-sm dev-text truncate">{tr(c.label)}</span>
                        {isActive && (
                          <CornerDownLeft size={14} className="relative ms-auto text-primary shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border-t border-line terminal-title text-[10px] dev-muted">
              <kbd className="border border-line rounded px-1">↑↓</kbd>
              <kbd className="border border-line rounded px-1">↵</kbd>
              <span>{tr(ui.hint)}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
