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
import CommandPalette from "./components/CommandPalette";
import ContactModal from "./components/ContactModal";
import CvViewer from "./components/CvViewer";
import Background3D from "./components/ui/Background3D";
import ScrollCubes from "./components/ui/ScrollCubes";

const Toasts = () => {
  const { theme } = useTheme();
  return <ToastContainer theme={theme} />;
};

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen app-surface">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-[#0b1220]"
            >
              Skip to content
            </a>
            <ScrollCubes />
            <Background3D />
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
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
