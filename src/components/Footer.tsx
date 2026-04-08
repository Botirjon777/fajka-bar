import { Globe, MapPin, Phone, Share2 } from "lucide-react";

export default function Footer() {
  const hours = [
    { day: "Mon - Thu", time: "17:00 - 03:00" },
    { day: "Fri - Sat", time: "17:00 - 05:00" },
    { day: "Sun", time: "17:00 - 03:00" },
  ];

  return (
    <footer
      id="location"
      className="bg-black pt-32 pb-12 px-6 border-t border-white/5 relative z-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        {/* Brand & Social */}
        <div className="lg:col-span-4">
          <h3 className="text-4xl md:text-5xl font-serif font-black gold-gradient italic mb-6">
            FAJKA BAR.
          </h3>
          <p className="text-white/40 text-lg font-light leading-relaxed mb-10">
            A sanctuary for shisha enthusiasts in the heart of Warsaw. Elegance
            in every breath, excellence in every service.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/fajka.bar"
              target="_blank"
              rel="noreferrer"
              className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all border border-white/10"
            >
              <Globe size={24} />
            </a>
            <a
              href="#"
              className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all border border-white/10"
            >
              <Share2 size={24} />
            </a>
          </div>
        </div>

        {/* Location & Map */}
        <div className="flex flex-col gap-8">
          <div className="capitalize">
            <h4 className="text-primary font-black mb-8 uppercase tracking-[0.3em] text-[10px]">
              Location Info
            </h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-4 text-white/60 group cursor-pointer hover:text-white transition-colors">
                <MapPin size={24} className="text-primary mt-1 shrink-0" />
                <div className="text-xl font-serif leading-tight">
                  Żurawia 22, <br />
                  00-515 Warszawa <br />
                  <span className="text-[10px] text-primary/40 uppercase tracking-widest font-black mt-2 inline-block italic">
                    WARSAW CITY CENTER
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-4 text-white/60 group hover:text-white transition-colors">
                <Phone size={24} className="text-primary shrink-0" />
                <span className="text-xl font-serif">+48 123 456 789</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <h4 className="text-primary font-black mb-6 uppercase tracking-[0.3em] text-[10px]">
              Opening Hours
            </h4>
            <div className="space-y-4">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between items-center group max-w-xs transition-opacity hover:opacity-100 opacity-60"
                >
                  <span className="text-white/40 uppercase text-[10px] tracking-widest">
                    {h.day}
                  </span>
                  <div className="flex-1 border-b border-white/5 mx-4" />
                  <span className="text-lg font-serif text-white">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Żurawia+22+00-515+Warszawa"
            target="_blank"
            rel="noreferrer"
            className="group relative h-[300px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 glass hover:border-primary/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all">
                <MapPin size={32} />
              </div>
              <h4 className="text-2xl font-serif text-white mb-2 italic">
                Open in Google Maps
              </h4>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black">
                GET DIRECTIONS
              </p>
            </div>

            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 border border-white/10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <Share2 size={16} />
            </div>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.4em] text-white/20">
        <span>© {new Date().getFullYear()} FAJKA BAR WARSAW</span>
        <span className="font-serif italic text-primary/40 underline decoration-primary/20 underline-offset-4">
          ŻURAWIA 22, 00-515 WARSZAWA
        </span>
      </div>
    </footer>
  );
}
