import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Now from "./components/Now";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CommandPalette from "./components/CommandPalette";
import ContactModal from "./components/ContactModal";
import CvViewer from "./components/CvViewer";
import ScrollProgress from "./components/ui/ScrollProgress";

const BOOT_KEY = "portfolio-booted";

const hasBootedThisSession = () => {
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
};

/** Soft glow that follows the cursor (see #root::before in index.css). */
const usePointerGlow = () => {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let idle: number | undefined;
    const root = document.documentElement.style;
    const onMove = (e: PointerEvent) => {
      root.setProperty("--mouse-active", "1");
      window.clearTimeout(idle);
      idle = window.setTimeout(() => root.setProperty("--mouse-active", "0"), 900);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.setProperty("--mouse-x", `${e.clientX}px`);
        root.setProperty("--mouse-y", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
};

const Toasts = () => {
  const { theme } = useTheme();
  return <ToastContainer theme={theme} />;
};

function App() {
  const [showLoader, setShowLoader] = useState(() => !hasBootedThisSession());
  const [revealed, setRevealed] = useState(() => hasBootedThisSession());
  usePointerGlow();

  const handleReveal = useCallback(() => setRevealed(true), []);
  const handleBootComplete = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      // ignore
    }
    setShowLoader(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {showLoader && <LoadingScreen onReveal={handleReveal} onComplete={handleBootComplete} />}
      <ThemeProvider>
        <LanguageProvider>
          {revealed && (
            <div className="min-h-screen app-surface">
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-[#0b1220]"
              >
                Skip to content
              </a>
              <ScrollProgress />
              <Header />
              <main id="main">
                <Hero />
                <About />
                <Now />
                <Journey />
                <Projects />
                <Skills />
                <Testimonials />
                <Contact />
              </main>
              <Footer />
              <CommandPalette />
              <ContactModal />
              <CvViewer />
              <Toasts />
            </div>
          )}
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
