import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Globe } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Shisha", href: "#shisha" },
  { name: "Shots", href: "#shots" },
  { name: "Fire Shots", href: "#fire-shots" },
  { name: "Cocktails", href: "#cocktails" },
  { name: "Whiskey", href: "#whiskey" },
  { name: "Beer", href: "#beer" },
  { name: "Bottles", href: "#bottles" },
  { name: "Beverages", href: "#beverages" },
  { name: "Location", href: "#location" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[280px] sm:w-[350px] glass z-[101] shadow-2xl p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12 shrink-0">
              <span className="text-xl font-serif font-bold gold-gradient italic">FAJKABAR.</span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-5 mb-auto overflow-y-auto no-scrollbar pr-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="text-xl md:text-2xl font-serif text-white hover:text-primary transition-all flex items-center gap-4 group py-1"
                >
                  <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/10 space-y-6 shrink-0 mt-8">
              <div className="flex items-center gap-3 text-white/60">
                <Globe size={18} className="text-primary" />
                <span className="text-xs tracking-widest uppercase font-black">ŻURAWIA 22, WARSZAWA</span>
              </div>
              <a
                href="tel:+123456789"
                className="flex items-center justify-center gap-2 w-full bg-primary text-black py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all hover:scale-[1.02] shadow-xl shadow-primary/20"
              >
                <Phone size={14} />
                BOOK A TABLE
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
