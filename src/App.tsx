import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let rafId = 0;
    let idleTimer: number | undefined;

    const setMouseActive = (value: "0" | "1") => {
      document.documentElement.style.setProperty("--mouse-active", value);
    };

    const updateMousePosition = (x: number, y: number) => {
      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      setMouseActive("1");
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setMouseActive("0"), 420);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateMousePosition(event.clientX, event.clientY);
      });
    };

    const handlePointerLeave = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      updateMousePosition(centerX, centerY);
      setMouseActive("0");
    };

    setMouseActive("0");
    handlePointerLeave();
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (idleTimer) window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      <ThemeProvider>
        <LanguageProvider>
          <div
            className="min-h-screen app-surface transition-colors duration-300"
            style={{
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          >
            <Header />
            <main>
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
