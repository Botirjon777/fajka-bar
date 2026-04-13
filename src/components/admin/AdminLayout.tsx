import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setShowScrollTop(mainRef.current.scrollTop > 400);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-row-reverse overflow-hidden">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-40 p-4 bg-primary text-black rounded-2xl shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all outline-hidden border border-white/10"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[320px] h-screen shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[320px] z-50"
            >
              <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen relative overflow-hidden">
        {/* Top bar for mobile only */}
        <header className="lg:hidden h-20 border-b border-white/5 flex flex-row-reverse items-center justify-between px-6 bg-bg-card/50 backdrop-blur-xl shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40 active:scale-95 transition-all"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-serif font-black italic tracking-tighter">
            FAJKA<span className="text-primary">ADMIN</span>
          </h2>
        </header>


        {/* Dynamic Page Content */}
        <main 
          ref={mainRef}
          className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

