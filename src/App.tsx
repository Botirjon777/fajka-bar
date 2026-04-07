import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { motion, useScroll, useSpring } from "framer-motion";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-primary selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main>
        <Hero />
        
        {/* About Section - Polish Accent */}
        <section id="about" className="py-32 px-6 bg-gradient-to-b from-bg-dark to-black overflow-hidden relative">
          <div className="absolute top-0 right-20 text-[200px] font-serif font-black text-white/[0.02] select-none pointer-events-none">
            FAJKA
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-8xl font-serif font-black gold-gradient mb-12 italic tracking-tighter">
                Premium Shisha<br />Experience.
              </h2>
              <p className="text-xl md:text-3xl text-white/60 font-light leading-relaxed mb-16 px-4">
                Zakochaj się w klimacie <span className="text-white font-medium italic">Żurawiej 22</span>. 
                Gdzie tradycja spotyka się z nowoczesnością w samym sercu Warszawy.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-y border-white/5 py-12">
                {[
                  { label: "Warszawa", sub: "LOCATION" },
                  { label: "Premium", sub: "TOBACCO" },
                  { label: "Exclusive", sub: "DRINKS" },
                  { label: "Lounge", sub: "VIBE" },
                ].map((stat, i) => (
                  <div key={i} className="text-center group">
                    <p className="text-primary text-2xl font-black uppercase tracking-tighter italic group-hover:scale-110 transition-transform">{stat.label}</p>
                    <p className="text-white/20 text-[10px] mt-2 uppercase tracking-[0.4em] font-bold">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Menu />

        {/* Atmosphere Section */}
        <section className="py-32 bg-black relative">
           <div className="absolute top-1/2 left-0 w-full h-[50%] bg-primary/5 blur-[120px] pointer-events-none" />
           
          <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-serif text-white italic font-black tracking-tighter mb-4">Atmosphere<span className="text-primary">.</span></h2>
              <p className="text-white/40 text-lg uppercase tracking-widest font-bold">Follow the smoke @fajka.bar</p>
            </div>
            <a 
              href="https://www.instagram.com/fajka.bar"
              className="text-primary hover:text-white transition-colors text-sm font-black border-b-2 border-primary pb-1 uppercase tracking-widest"
            >
              VIEW IG FEED
            </a>
          </div>
          
          <div className="flex gap-8 px-6 overflow-x-auto no-scrollbar pb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="min-w-[320px] md:min-w-[400px] aspect-[4/5] bg-bg-card rounded-[3rem] border border-white/5 overflow-hidden group relative shadow-2xl"
              >
                 <img 
                   src={`https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=400&fit=crop`} 
                   alt="Lounge Vibe"
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                 <div className="absolute bottom-10 left-10 text-white font-serif italic text-2xl">Vibe 0{i}.</div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
