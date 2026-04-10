import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SplashScreen from "../components/SplashScreen";
import FloatingMenuButton from "../components/FloatingMenuButton";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { scrollYProgress } = useScroll();
  const { t } = useTranslation();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-primary selection:text-black">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-100 origin-left"
            style={{ scaleX }}
          />

          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <FloatingMenuButton />

          <main>
            <Hero />

            <Menu />

            {/* Atmosphere Section */}
            <section className="py-32 bg-black relative">
              <div className="absolute top-1/2 left-0 w-full h-[50%] bg-primary/5 blur-[120px] pointer-events-none" />

              <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="max-w-xl">
                  <h2 className="text-5xl md:text-7xl font-serif text-white italic font-black tracking-tighter mb-4">
                    {t("atmosphere.title")}
                    <span className="text-primary">.</span>
                  </h2>
                  <p className="text-white/40 text-lg uppercase tracking-widest font-bold">
                    {t("atmosphere.follow")}
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/fajka.bar"
                  className="text-primary hover:text-white transition-colors text-sm font-black border-b-2 border-primary pb-1 uppercase tracking-widest"
                >
                  {t("atmosphere.viewIg")}
                </a>
              </div>

              <div className="flex gap-8 px-6 overflow-x-auto no-scrollbar pb-12">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="min-w-[320px] md:min-w-[400px] aspect-4/5 bg-bg-card rounded-[3rem] border border-white/5 overflow-hidden group relative shadow-2xl"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=400&fit=crop`}
                      alt="Lounge Vibe"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-10 left-10 text-white font-serif italic text-2xl">
                      {t("atmosphere.vibe")} 0{i}.
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </main>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}
