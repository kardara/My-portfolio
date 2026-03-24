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
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const googleCalendarLink =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Portfolio%20Meeting%20with%20Abdoulaye%20Zakaria&details=Hi%20Abdoulaye%2C%20I%20would%20like%20to%20schedule%20a%20meeting%20from%20your%20portfolio.&location=Google%20Meet&add=azdjerou@gmail.com";

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: "azdjerou@gmail.com",
      href: "mailto:azdjerou@gmail.com",
    },
    {
      icon: WhatsApp,
      label: t("contact.whatsapp"),
      value: t("contact.whatsappValue"),
      href: "https://wa.me/250791375009?text=Hello%20Abdoulaye%2C%20I%20got%20your%20contact%20from%20your%20website",
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+250 791 375 009",
      href: "tel:+250791375009",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: t("contact.locationValue"),
      href: "https://www.google.com/maps/place/Kigali,+Rwanda/",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdoulaye-zakaria-djerou-022613327",
      color: "hover:text-[var(--color-primary)]",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/kardara",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:azdjerou@gmail.com",
      color: "hover:text-red-600",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="terminal-title text-xs dev-muted mb-3">
            contact --open-channel
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dev-heading mb-4">
            {t("contact.title")}
          </h2>
          <div className="h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/60 mx-auto mb-4 w-20 rounded-full"></div>
          <p
            className="text-base sm:text-lg md:text-xl font-medium mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            {t("contact.subtitle")}
          </p>
          <p className="text-base sm:text-lg dev-muted max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold dev-heading mb-5 sm:mb-6">
                {t("contact.infoTitle")}
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="shell-panel flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-primary), #0284c7)",
                      }}
                    >
                      <info.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm dev-muted font-medium">
                        {info.label}
                      </p>
                      <p className="dev-text font-semibold text-sm sm:text-base break-words">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold dev-heading mb-4">
                {t("contact.follow")}
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`w-12 h-12 bg-[var(--dev-panel)] border border-[var(--dev-border)] rounded-lg flex items-center justify-center dev-muted ${social.color} transition-all duration-300`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="shell-panel rounded-xl p-5 sm:p-8 space-y-5"
          >
            <h3 className="text-xl sm:text-2xl font-bold dev-heading">
              {t("contact.connectTitle")}
            </h3>
            <p className="dev-muted text-sm sm:text-base">
              {t("contact.actionsDescription")}
            </p>

            <div className="grid gap-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  window.dispatchEvent(new Event("open-contact-modal"))
                }
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[var(--dev-panel)] border border-[var(--dev-border)] dev-text font-semibold"
              >
                <MessageSquare size={18} />
                {t("header.quickContact")}
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[var(--color-secondary)] text-[#0b1220] font-semibold"
              >
                <CalendarPlus size={18} />
                {t("contact.scheduleGoogle")}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:azdjerou@gmail.com?subject=Portfolio%20Inquiry"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[var(--color-accent)] text-white font-semibold"
              >
                <Mail size={18} />
                {t("contact.sendEmailDirect")}
              </motion.a>
            </div>

            <div className="rounded-xl border border-[var(--dev-border)] p-4 bg-[var(--dev-panel)]/70">
              <p className="terminal-title text-xs dev-muted mb-3">
                {t("contact.availabilityTag")}
              </p>
              <div className="space-y-2 text-sm sm:text-base">
                <p className="dev-text flex items-center gap-2">
                  <Clock3 size={16} className="text-[var(--color-primary)]" />
                  {t("contact.weekdaysHours")}
                </p>
                <p className="dev-text flex items-center gap-2">
                  <WhatsApp
                    size={16}
                    className="text-[var(--color-secondary)]"
                  />
                  {t("contact.fastestResponse")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
