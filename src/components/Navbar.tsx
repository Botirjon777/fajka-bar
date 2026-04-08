import { useState, useEffect } from "react";
import { Menu, Phone } from "lucide-react";
import { cn } from "../lib/utils";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[90] transition-all duration-500 px-6 py-4",
        isScrolled ? "glass py-3 border-none shadow-2xl" : "bg-transparent py-6 border-none"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-2xl md:text-3xl font-serif font-black gold-gradient tracking-tighter italic">
            FAJKA BAR
          </span>
          <div className="h-4 w-[1px] bg-white/20 mx-2 hidden sm:block group-hover:bg-primary transition-colors" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 hidden sm:block">
            WARSZAWA
          </span>
        </a>

        <div className="flex items-center gap-4">
          <a
            href="tel:+123456789"
            className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all"
          >
            <Phone size={12} />
            +123 456 789
          </a>

          <button
            onClick={onMenuClick}
            className="flex items-center gap-3 bg-primary hover:bg-primary-hover text-black px-5 py-2.5 rounded-xl text-xs font-black transition-all transform hover:scale-105 shadow-lg shadow-primary/20 active:scale-95"
          >
            MENU
            <Menu size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </nav>
  );
}
