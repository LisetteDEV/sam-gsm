import { useEffect, useRef, useState } from "react";
import { Smartphone, Shield, Zap, Headphones, Package, Tablet } from "lucide-react";

const categories = [
  { id: "iphones",     label: "iPhones",      icon: Smartphone, color: "#007AFF" },
  { id: "android",     label: "Android",       icon: Tablet,     color: "#2ECC40" },
  { id: "coques",      label: "Coques",        icon: Shield,     color: "#FF6B35" },
  { id: "chargeurs",   label: "Chargeurs",     icon: Zap,        color: "#F59E0B" },
  { id: "ecouteurs",   label: "Écouteurs",     icon: Headphones, color: "#8B5CF6" },
  { id: "accessoires", label: "Accessoires",   icon: Package,    color: "#EC4899" },
];

export default function Categories() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">

        {/* Titre */}
        <div
          className="text-center mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/10 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-4">
            Catalogue
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Nos Catégories</h2>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center overflow-hidden cursor-pointer"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                  transition: `opacity 0.5s ease, transform 0.5s ease`,
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                {/* Fond coloré au hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${cat.color}12 0%, ${cat.color}06 100%)`,
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Icône */}
                <div
                  className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${cat.color}18`,
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15) rotate(4deg)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
                >
                  <Icon size={28} style={{ color: cat.color }} strokeWidth={1.5} />
                </div>

                <span className="relative z-10 font-bold text-sm text-gray-700 group-hover:text-gray-900" style={{ transition: "color 0.2s" }}>
                  {cat.label}
                </span>

                {/* Trait coloré bas */}
                <div
                  className="absolute bottom-0 left-1/2 h-0.5 rounded-full"
                  style={{
                    background: cat.color,
                    width: "0%",
                    transform: "translateX(-50%)",
                    transition: "width 0.3s ease",
                  }}
                  ref={el => {
                    if (el) {
                      el.parentElement.addEventListener("mouseenter", () => el.style.width = "60%");
                      el.parentElement.addEventListener("mouseleave", () => el.style.width = "0%");
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}