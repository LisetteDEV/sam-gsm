import { useEffect, useRef, useState } from "react";
import { CheckCircle, Star, Truck, Headphones } from "lucide-react";

const items = [
  { icon: CheckCircle, stat: "100%", title: "Authenticité garantie", desc: "Tous nos produits sont 100% originaux", color: "#2ECC40" },
  { icon: Star,        stat: "5000+", title: "Meilleurs prix",        desc: "Prix compétitifs sur le marché béninois", color: "#F59E0B" },
  { icon: Truck,       stat: "24h",   title: "Livraison rapide",      desc: "Livré chez vous en 24-48h à Cotonou", color: "#3B82F6" },
  { icon: Headphones,  stat: "7j/7",  title: "SAV disponible",        desc: "Support client 7j/7 par WhatsApp", color: "#8B5CF6" },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedNumber({ target, inView }) {
  const [count, setCount] = useState(0);
  const isPercent = target.includes("%");
  const isPlus = target.includes("+");
  const isSlash = target.includes("j/");
  const num = parseInt(target.replace(/[^0-9]/g, ""));

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = num / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, num]);

  if (isSlash) return <span>{target}</span>;
  return <span>{count}{isPercent ? "%" : isPlus ? "+" : ""}</span>;
}

export default function WhyUs() {
  const [sectionRef, inView] = useInView();

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Titre */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/10 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-4">
            Nos engagements
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Pourquoi nous choisir ?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative flex flex-col items-center text-center gap-3 p-8 bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Fond coloré hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${item.color}08 0%, transparent 70%)` }} />

                {/* Icône avec cercle animé */}
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon size={28} style={{ color: item.color }} strokeWidth={1.5} />
                  </div>
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
                    style={{ border: `2px solid ${item.color}30` }}
                  />
                </div>

                {/* Chiffre animé */}
                <div className="text-3xl font-black" style={{ color: item.color }}>
                  <AnimatedNumber target={item.stat} inView={inView} />
                </div>

                <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>

                {/* Barre colorée bas */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: item.color }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}