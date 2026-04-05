import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { id: 1, name: "Kofi Mensah",    location: "Cotonou",        rating: 5, date: "Mars 2025",     text: "Très satisfait de mon iPhone 15 Pro acheté chez SAM GSM. Livraison en moins de 24h et le produit est 100% original. Je recommande vivement !", product: "iPhone 15 Pro", avatar: "KM", color: "#2ECC40" },
  { id: 2, name: "Aïcha Soulé",    location: "Porto-Novo",     rating: 5, date: "Février 2025",  text: "Service impeccable ! J'ai commandé mes AirPods Pro et ils sont arrivés le lendemain. L'équipe est très professionnelle et disponible sur WhatsApp.", product: "AirPods Pro 2", avatar: "AS", color: "#3B82F6" },
  { id: 3, name: "Didier Ahounou", location: "Abomey-Calavi",  rating: 5, date: "Janvier 2025",  text: "Meilleur rapport qualité-prix de Cotonou. Mon Samsung Galaxy S24 fonctionne parfaitement. Paiement Mobile Money très pratique.", product: "Samsung Galaxy S24", avatar: "DA", color: "#8B5CF6" },
  { id: 4, name: "Fatima Idrissou",location: "Parakou",        rating: 4, date: "Décembre 2024", text: "Bonne expérience d'achat, livraison rapide même depuis Parakou. Le chargeur GaN est excellent, je reviendrai sûrement.", product: "Chargeur 65W GaN", avatar: "FI", color: "#F59E0B" },
  { id: 5, name: "Roméo Dossou",   location: "Cotonou",        rating: 5, date: "Novembre 2024", text: "SAM GSM c'est la référence au Bénin. Produits authentiques, prix imbattables et service client au top. Toute ma famille achète ici.", product: "iPhone 14", avatar: "RD", color: "#EC4899" },
];

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill={s <= rating ? "#2ECC40" : "#e5e7eb"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [sectionRef, inView] = useInView();

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => dir === "next" ? (c === reviews.length - 1 ? 0 : c + 1) : (c === 0 ? reviews.length - 1 : c - 1));
      setAnimating(false);
    }, 250);
  };

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => go("next"), 5000);
    return () => clearInterval(t);
  }, [current]);

  const visible = [0, 1, 2].map((o) => reviews[(current + o) % reviews.length]);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Titre */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/10 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Avis Clients</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Stars rating={5} />
            <span className="font-bold text-gray-700">4.9/5</span>
            <span>· +500 avis vérifiés</span>
          </div>
        </div>

        {/* Cards desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
          {visible.map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className={`relative bg-gray-50 rounded-2xl p-6 border transition-all duration-500 ${
                i === 1
                  ? "border-[#2ECC40]/40 shadow-lg scale-105 bg-white"
                  : "border-gray-100 shadow-sm"
              } ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Guillemet décoratif */}
              <Quote size={32} className="text-[#2ECC40]/20 absolute top-4 right-4" />

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: review.color }}
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.location} · {review.date}</p>
                </div>
              </div>

              <Stars rating={review.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4">"{review.text}"</p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-gray-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC40]" />
                <span className="text-xs text-gray-500 font-medium">{review.product}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Card mobile */}
        <div className={`md:hidden mb-8 transition-all duration-300 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="relative bg-white rounded-2xl p-6 border border-[#2ECC40]/30 shadow-lg">
            <Quote size={32} className="text-[#2ECC40]/20 absolute top-4 right-4" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: reviews[current].color }}>
                {reviews[current].avatar}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{reviews[current].name}</p>
                <p className="text-gray-400 text-xs">{reviews[current].location} · {reviews[current].date}</p>
              </div>
            </div>
            <Stars rating={reviews[current].rating} />
            <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4">"{reviews[current].text}"</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC40]" />
              <span className="text-xs text-gray-500 font-medium">{reviews[current].product}</span>
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => go("prev")} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#2ECC40] hover:text-[#2ECC40] transition-all duration-200 shadow-sm active:scale-90">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-[#2ECC40]" : "w-2 h-2 bg-gray-200 hover:bg-gray-400"}`}
              />
            ))}
          </div>
          <button onClick={() => go("next")} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#2ECC40] hover:text-[#2ECC40] transition-all duration-200 shadow-sm active:scale-90">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}