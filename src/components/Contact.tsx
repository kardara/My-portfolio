import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  CalendarPlus,
  Clock3,
  MessageSquare,
  Linkedin,
  Github,
  MessageCircle as WhatsApp,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const googleCalendarLink =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Scheduling%20Meeting%20with%20Abdoulaye%20Zakaria&details=Hi%20Abdoulaye%2C%20I%20would%20like%20to%20schedule%20a%20meeting%20with%20you%20if%20you%20are%20available.&location=Google%20Meet&add=azdjerou@gmail.com";

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: "azdjerou@gmail.com",
      href: "mailto:azdjerou@gmail.com",
      gradient: "from-[#e95420] to-[#dc2626]",
      glow: "rgba(233,84,32,0.15)",
    },
    {
      icon: WhatsApp,
      label: t("contact.whatsapp"),
      value: t("contact.whatsappValue"),
      href: "https://wa.me/250791375009?text=Hello%20Abdoulaye%2C%20I%20got%20your%20contact%20from%20your%20website",
      gradient: "from-[#3fb950] to-[#15803d]",
      glow: "rgba(63,185,80,0.15)",
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+250 791 375 009",
      href: "tel:+250791375009",
      gradient: "from-[#58a6ff] to-[#0284c7]",
      glow: "rgba(88,166,255,0.15)",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: t("contact.locationValue"),
      href: "https://www.google.com/maps/place/Kigali,+Rwanda/",
      gradient: "from-[#f59e0b] to-[#e95420]",
      glow: "rgba(245,158,11,0.15)",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdoulaye-zakaria-djerou-022613327",
      color: "#58a6ff",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/kardara",
      color: "var(--dev-heading)",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:azdjerou@gmail.com",
      color: "#e95420",
    },
  ];

  const actions = [
    {
      icon: MessageSquare,
      label: t("header.quickContact"),
      description: "Send a quick message",
      onClick: () => window.dispatchEvent(new Event("open-contact-modal")),
      style: "ghost",
    },
    {
      icon: CalendarPlus,
      label: t("contact.scheduleGoogle"),
      description: "Book a meeting slot",
      href: googleCalendarLink,
      style: "green",
    },
    {
      icon: Mail,
      label: t("contact.sendEmailDirect"),
      description: "Reach me directly",
      href: "mailto:azdjerou@gmail.com?subject=Portfolio%20Inquiry",
      style: "accent",
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* ── Section Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="section-tag">contact --open-channel</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold dev-heading">
            {t("contact.title")}
          </h2>
          <div className="section-divider" />
          <p
            className="text-lg font-semibold mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            {t("contact.subtitle")}
          </p>
          <p className="text-base dev-muted max-w-2xl mx-auto leading-relaxed">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">

          {/* ── Left: Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold dev-heading">
              {t("contact.infoTitle")}
            </h3>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="shell-panel group flex items-start gap-4 p-4 rounded-xl overflow-hidden relative transition-all duration-250"
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${info.glow}, transparent 70%)`,
                    }}
                  />
                  {/* Icon */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${info.gradient} shadow`}
                  >
                    <info.icon size={18} className="text-white" />
                  </div>
                  {/* Text */}
                  <div className="relative z-10 min-w-0">
                    <p className="text-xs dev-muted font-medium mb-0.5">{info.label}</p>
                    <p className="dev-text font-semibold text-sm break-words leading-tight">
                      {info.value}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="relative z-10 dev-muted group-hover:text-[var(--color-primary)] transition-colors ml-auto flex-shrink-0 mt-1"
                  />
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-sm font-semibold dev-muted mb-3 terminal-title uppercase tracking-wider">
                {t("contact.follow")}
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    whileHover={{ y: -4, scale: 1.12 }}
                    className="w-11 h-11 shell-panel rounded-xl flex items-center justify-center dev-muted transition-all duration-250"
                    style={{ "--link-color": s.color } as React.CSSProperties}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = s.color)
                    }
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "")}
                  >
                    <s.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 }}
              className="shell-panel rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "var(--color-secondary)" }}
                  />
                  <div
                    className="absolute inset-0 rounded-full ping-dot"
                    style={{ background: "var(--color-secondary)" }}
                  />
                </div>
                <p className="terminal-title text-xs dev-muted tracking-widest uppercase">
                  {t("contact.availabilityTag")}
                </p>
              </div>
              <div className="space-y-2">
                <p className="dev-text text-sm flex items-center gap-2">
                  <Clock3 size={14} className="text-[var(--color-primary)] flex-shrink-0" />
                  {t("contact.weekdaysHours")}
                </p>
                <p className="dev-text text-sm flex items-center gap-2">
                  <Zap size={14} className="text-[var(--color-secondary)] flex-shrink-0" />
                  {t("contact.fastestResponse")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Action panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="shell-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 pb-5 border-b border-[var(--dev-border)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="terminal-title text-xs dev-muted ml-2">
                connect.sh
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold dev-heading mb-2">
                {t("contact.connectTitle")}
              </h3>
              <p className="dev-muted text-sm leading-relaxed">
                {t("contact.actionsDescription")}
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 flex-1">
              {actions.map((action, i) => {
                const baseClass =
                  "w-full flex items-center gap-4 px-5 py-4 rounded-xl font-semibold text-sm transition-all duration-250 group";

                const styleMap: Record<string, string> = {
                  ghost:
                    "border border-[var(--dev-border)] bg-[var(--dev-panel)] dev-text hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
                  green:
                    "bg-[var(--color-secondary)] text-[#0b1220] hover:opacity-90",
                  accent:
                    "bg-[var(--color-accent)] text-white hover:opacity-90",
                };

                const inner = (
                  <>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          action.style === "ghost"
                            ? "rgba(88,166,255,0.1)"
                            : "rgba(255,255,255,0.15)",
                      }}
                    >
                      <action.icon size={18} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{action.label}</div>
                      <div
                        className="text-xs mt-0.5 opacity-70"
                      >
                        {action.description}
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                    />
                  </>
                );

                return action.onClick ? (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.onClick}
                    className={`${baseClass} ${styleMap[action.style]}`}
                  >
                    {inner}
                  </motion.button>
                ) : (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClass} ${styleMap[action.style]}`}
                  >
                    {inner}
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom note */}
            <p className="terminal-title text-xs dev-muted text-center border-t border-[var(--dev-border)] pt-5">
              $ response_time &lt; 24h &nbsp;·&nbsp; open_to_opportunities = true
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
