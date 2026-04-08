import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 scale-105">
        <img
          src="/images/hero.webp"
          alt="Lounge Atmosphere"
          className="w-full h-full object-cover grayscale opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-bg-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] opacity-80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-8 bg-primary/40" />
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span className="text-primary uppercase tracking-[0.8em] text-[10px] font-black">
              WARSZAWA · ŻURAWIA 22
            </span>
            <div className="h-px w-8 bg-primary/40" />
          </div>

          <h1 className="text-7xl md:text-[140px] font-serif font-black text-white mb-8 leading-[0.85] tracking-tighter italic">
            Fajka
            <br />
            <span className="gold-gradient">Bar.</span>
          </h1>

          <p className="text-lg md:text-2xl text-white/40 mb-14 max-w-xl mx-auto font-light leading-relaxed uppercase tracking-widest px-4">
            Prestiż, klimat i najlepsza szisza w sercu stolicy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="#menu"
              className="w-full sm:w-auto bg-primary text-black px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
            >
              SPRAWDŹ MENU
            </a>
            <a
              href="#location"
              className="text-white/40 hover:text-primary transition-colors font-black uppercase text-xs tracking-[0.3em] py-2 border-b-2 border-transparent hover:border-primary/30"
            >
              LOCALIZACJA
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
