import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Check, Loader2, Send, X } from "lucide-react";
import { toast } from "react-toastify";
import { useLanguage } from "../contexts/LanguageContext";
import { profile } from "../data/profile";


const empty = { name: "", email: "", subject: "", message: "" };

const ContactModal: React.FC = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-contact-modal", onOpen);
    return () => window.removeEventListener("open-contact-modal", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => firstField.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mzzgjpzr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      toast.success(t("contact.success"), { position: "top-right" });
      window.setTimeout(() => {
        setOpen(false);
        setForm(empty);
        setStatus("idle");
      }, 1400);
    } catch (error) {
      console.error("Contact submission failed:", error);
      setStatus("idle");
      toast.error(t("contact.errorLater"), { position: "top-right" });
    }
  };

  const field = "w-full px-4 py-3 bg-surface border border-line dev-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
        >
          <button aria-label="Close" className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default" onClick={() => setOpen(false)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto border border-line bg-surface p-5 sm:p-8 shadow-2xl"
          >
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-4 end-4 p-2 border border-line dev-muted hover:text-primary hover:border-primary"
            >
              <X size={16} />
            </button>

            <div className="mb-6 pe-10">
              <p className="terminal-title text-xs dev-muted mb-2">
                <span className="text-secondary">$</span> {t("header.quickFormTag")}
              </p>
              <h3 id="contact-modal-title" className="text-2xl sm:text-3xl font-bold dev-heading mb-2">
                {t("contact.sendMessage")}
              </h3>
              <p className="dev-muted text-sm sm:text-base">{t("header.modalDescription")}</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-sm font-medium dev-muted mb-1.5">{t("contact.name")}</span>
                  <input ref={firstField} name="name" value={form.name} onChange={onChange} required autoComplete="name" className={field} placeholder={t("contact.placeholderName")} />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium dev-muted mb-1.5">{t("contact.email")}</span>
                  <input type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" className={field} placeholder={t("contact.placeholderEmail")} />
                </label>
              </div>
              <label className="block">
                <span className="block text-sm font-medium dev-muted mb-1.5">{t("contact.subject")}</span>
                <input name="subject" value={form.subject} onChange={onChange} required className={field} placeholder={t("contact.placeholderSubject")} />
              </label>
              <label className="block">
                <span className="block text-sm font-medium dev-muted mb-1.5">{t("contact.message")}</span>
                <textarea name="message" value={form.message} onChange={onChange} required rows={4} className={`${field} resize-none`} placeholder={t("contact.placeholderMessage")} />
              </label>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <motion.button
                  type="submit"
                  disabled={status !== "idle"}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-accent text-white font-semibold disabled:opacity-80"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-2"
                    >
                      {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : status === "sent" ? <Check size={18} /> : <Send size={18} className="rtl:-scale-x-100" />}
                      {status === "sent" ? t("contact.success") : t("contact.send")}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
                <a
                  href={profile.calendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-line bg-panel dev-heading font-semibold hover:border-secondary hover:text-secondary transition-colors"
                >
                  <CalendarPlus size={18} />
                  {t("header.scheduleMeeting")}
                </a>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ContactModal;
