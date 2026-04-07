import { motion } from "framer-motion";
import { Flame, Martini, Droplets, Zap, Beer, Sparkles, GlassWater, Wine } from "lucide-react";
import { cn } from "../lib/utils";

interface PriceOption {
  label: string;
  value: string;
}

interface MenuItemProps {
  name: string;
  price?: string;
  prices?: PriceOption[];
  desc?: string;
  image?: string;
}

const MenuItem = ({ name, price, prices, desc, image }: MenuItemProps) => (
  <div className="group flex items-center gap-4 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-lg">
    {image && (
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:border-primary transition-colors">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
    )}
    <div className="flex-1">
      <div className="flex justify-between items-baseline mb-1">
        <div className="flex flex-col">
          <h4 className="text-lg md:text-xl font-serif text-white group-hover:text-primary transition-colors pr-4">
            {name}
          </h4>
          {desc && <p className="text-white/40 text-[10px] italic font-light mt-1 max-w-[200px] md:max-w-xs">{desc}</p>}
        </div>

        <div className="flex-1 border-b border-dotted border-white/10 mx-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className={cn("flex flex-col items-end gap-1", prices && "translate-y-1")}>
          {price && <span className="text-primary font-black text-xl whitespace-nowrap">{price}</span>}
          {prices?.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-tighter text-white/40 font-bold">{p.label}</span>
              <span className="text-primary font-black text-lg md:text-xl whitespace-nowrap">{p.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <div className="sticky top-[64px] z-20 py-6 bg-bg-dark/95 backdrop-blur-3xl mb-8 border-b border-white/5">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
        {icon}
      </div>
      <h3 className="text-2xl md:text-5xl font-serif font-black text-white uppercase tracking-tighter italic">
        {title}
      </h3>
    </div>
  </div>
);

export default function Menu() {
  const shishaItems = ["Mix", "Mango", "Lemon", "Watermelon", "Blueberry", "Grape", "Lady Killer", "Fresh Banan", "Hawai", "Blue Ice", "Sandrella"];

  const shishaAlcohol = [
    { name: "Shisha with milk", price: "+15zł" },
    { name: "Shisha with wine", price: "+20zł" },
    { name: "Shisha with Vodka", price: "+15zł" },
    { name: "Shisha with Whisky", price: "+25zł" },
  ];

  const classicCocktails = [
    { name: "Sex on the Beach", price: "30zł", desc: "30ml wódka, 20ml likier brzoskwiniowy, sok pomarańczowy, grenadyna" },
    { name: "Sex on the Bar", price: "30zł", desc: "30ml Malibu, 30ml wódka, sok pomarańczowy, sok ananasowy, grenadyna" },
    { name: "Pornstar Martini", price: "35zł", desc: "45ml wódki waniliowej, 15ml likieru Passoa, syrop waniliowy, limonka" },
    { name: "Cosmopolitan", price: "30zł", desc: "40ml wódka, 15ml triple sec, 15ml sok z limonki, 30ml sok żurawinowy" },
    { name: "Blue Lagoon", price: "30zł", desc: "20ml wódka, 20ml tequila, 7 UP, blue curacao" },
    { name: "Mojito", price: "35zł", desc: "40ml białego rumu, cukier, limonka, mieta, woda gazowana" },
    { name: "Aperol", price: "30zł", desc: "Aperol spritz, Prosecco, Woda gazowana" },
    { name: "Jägerbomb", price: "30zł", desc: "50ml Jägermeister, black Energy" },
    { name: "Jäger Lagoon", price: "30zł", desc: "40ml Jäger, 7up, blue curacao" },
    { name: "Pina Colada", price: "30zł", desc: "30ml malibu, 20ml rum, sok ananasowy, mleko" },
    { name: "Orgasm", price: "30zł", desc: "20ml wódka, 20ml baileys, 15ml kahlua, mleko" },
    { name: "Blue Hawai", price: "30zł", desc: "30ml blue curacao, 40ml wódka, 60ml sok ananasowy" },
    { name: "After Sex", price: "30zł", desc: "30ml wódka, 20ml triple sec, 10ml syrop bananowy" },
    { name: "French Kiss", price: "30zł", desc: "Bartender's Special" },
    { name: "Long Island Ice Tea", price: "35zł" },
    { name: "Bombai", price: "35zł", desc: "Tequila, gin, rum, cytryna, tonic, grenadyna" },
    { name: "Black Russian", price: "25zł", desc: "40ml wódka, 20ml kahlua" },
    { name: "White Russian", price: "30zł", desc: "40ml wódka, 20ml kahlua, mleko" },
    { name: "Blue Mother Fucker", price: "35zł", desc: "Wódka, rum, gin, tequila, blue curacao" },
    { name: "Tequila Sunrise", price: "25zł", desc: "40ml tequila, sok pomarańczowy, grenadyna" },
    { name: "Gin & Tonic", price: "25zł", desc: "40ml Gin, Schweppes Tonic" },
    { name: "Cuba Libre", price: "25zł", desc: "50ml Rum, Limonka, Pepsi" },
  ];

  const shots = [
    { name: "Jäger 40ml", price: "15zł" },
    { name: "Tequila 40ml", price: "15zł" },
    { name: "Finlandia 40ml", price: "15zł" },
    { name: "Kamikaze", prices: [{ label: "1 shot", value: "7zł" }, { label: "10 shot", value: "50zł" }] },
    { name: "Soplica 40ml", price: "10zł" },
    { name: "Frankenstein 40ml", price: "15zł" },
    { name: "Sex on the beach Shot", prices: [{ label: "10 shot", value: "50zł" }] },
    { name: "Mad Dog", prices: [{ label: "1 shot", value: "15zł" }, { label: "4 shot", value: "52zł" }] },
  ];

  const fireShots = [
    { name: "Sambuka 40ml", price: "20zł" },
    { name: "B-52 40ml", price: "20zł", desc: "Irish Cream, Kahlua, Triple Sec" },
    { name: "B-53 40ml", price: "20zł", desc: "Irish Cream, Kahlua, Absinthe" },
    { name: "Absinthe 40ml", price: "20zł" },
    { name: "Hiroshima 40ml", price: "20zł" },
  ];

  const whiskey = [
    { name: "Jack Daniels 40ml", price: "30zł" },
    { name: "Chivas Regal 40ml", price: "30zł" },
    { name: "Jack Apple 40ml", price: "30zł" },
    { name: "Jack Fire 40ml", price: "30zł" },
    { name: "Jack Honey 40ml", price: "30zł" },
    { name: "Jameson 40ml", price: "30zł" },
    { name: "Red Label 40ml", price: "25zł" },
    { name: "Jim Beam 40ml", price: "25zł" },
    { name: "Ballantines 40ml", price: "25zł" },
  ];

  const beer = [
    { name: "Kasztelan Beczka 500ml", price: "15zł" },
    { name: "Brooklyn Beczka 500ml", price: "17zł" },
    { name: "Blanch 500ml", price: "22zł" },
    { name: "Bosman 500ml", price: "18zł" },
    { name: "Somersby", price: "18zł", desc: "Jabłko, Jeżyna, Mango, Arbuz" },
    { name: "Carlsberg 500ml", price: "18zł" },
    { name: "Blanch 330ml", price: "18zł" },
    { name: "Žatecký 500ml", price: "18zł" },
  ];

  const bottles = [
    { name: "Jack Daniels 700ml", price: "350zł", desc: "Apple, Honey, Fire" },
    { name: "Grants 700ml", price: "300zł" },
    { name: "Chivas 12y 700ml", price: "400zł" },
    { name: "Finlandia 500ml", price: "200zł" },
    { name: "Jäger 1L", price: "350zł" },
    { name: "Soplica 500ml", price: "140zł" },
    { name: "Wino 0.7L", price: "140zł", desc: "White and Red" },
  ];

  const beverages = [
    { name: "Pepsi, Pepsi Max 200ml", price: "13zł" },
    { name: "Mirinda, 7 UP 200ml", price: "13zł" },
    { name: "Woda gaz./niegaz 300ml", price: "10zł" },
    { name: "Black Energy", price: "10zł" },
    { name: "Redbull", price: "15zł" },
  ];

  return (
    <section id="menu" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-24">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-primary uppercase tracking-[0.6em] text-[10px] font-black mb-4 block">
          Signature Experience
        </motion.span>
        <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-6xl md:text-8xl font-serif font-black text-white italic tracking-tighter">
          Menu<span className="text-primary">.</span>
        </motion.h2>
      </div>

      <div id="shisha" className="mb-24">
        <SectionTitle title="SHISHA" icon={<Flame size={20} />} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {shishaItems.map((item) => (
            <MenuItem key={item} name={item} price="60zł" image="/images/hookah.png" />
          ))}
        </div>
      </div>

      <div id="shisha-alcohol" className="mb-24">
        <SectionTitle title="SHISHA + ALCOHOL" icon={<Sparkles size={20} />} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {shishaAlcohol.map((item) => (
            <MenuItem key={item.name} name={item.name} price={item.price} image="/images/hookah.png" />
          ))}
        </div>
      </div>

      <div id="shots" className="mb-24">
        <SectionTitle title="SHOTS" icon={<Zap size={20} />} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {shots.map((item) => (
            <MenuItem key={item.name} name={item.name} price={item.price} prices={item.prices} image="/images/drinks.png" />
          ))}
        </div>
      </div>

      <div id="fire-shots" className="mb-24">
        <SectionTitle title="FIRE SHOTS" icon={<Flame size={20} className="animate-pulse text-orange-500" />} />
        <div className="space-y-2">
          {fireShots.map((item) => (
            <MenuItem key={item.name} name={item.name} price={item.price} desc={item.desc} image="/images/drinks.png" />
          ))}
        </div>
      </div>

      <div id="cocktails" className="mb-24">
        <SectionTitle title="KLASYCZNE DRINKI" icon={<Martini size={20} />} />
        <div className="space-y-2">
          {classicCocktails.map((item) => (
            <MenuItem key={item.name} name={item.name} price={item.price} desc={item.desc} image="/images/drinks.png" />
          ))}
        </div>
      </div>

      <div id="whiskey" className="mb-24">
        <SectionTitle title="WHISKEY" icon={<GlassWater size={20} />} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {whiskey.map((item) => (
            <MenuItem key={item.name} name={item.name} price={item.price} image="/images/drinks.png" />
          ))}
        </div>
      </div>

      <div id="beer" className="mb-24">
        <SectionTitle title="PIWO" icon={<Beer size={20} />} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {beer.map((item) => (
            <MenuItem key={item.name} name={item.name} price={item.price} desc={item.desc} image="/images/drinks.png" />
          ))}
        </div>
      </div>

      <div id="bottles" className="mb-24">
        <SectionTitle title="BUTELKI" icon={<Wine size={20} />} />
        <div className="space-y-2">
          {bottles.map((item) => (
            <MenuItem key={item.name} name={item.name} price={item.price} desc={item.desc} image="/images/drinks.png" />
          ))}
        </div>
      </div>

      <div id="beverages" className="mb-24">
        <SectionTitle title="NAPOJE ZIMNE" icon={<Droplets size={20} />} />
        <div className="space-y-2">
          {beverages.map((item) => (
            <MenuItem key={item.name} name={item.name} price={item.price} image="/images/drinks.png" />
          ))}
        </div>
      </div>
    </section>
  );
}
