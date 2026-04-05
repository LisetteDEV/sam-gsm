import { useRef, useEffect, useState } from "react";
import { Shield, Users, Award, Zap, Heart, MapPin, ArrowRight, ChevronDown, Phone } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedNumber({ val, suffix, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const timer = setInterval(() => {
      c += val / 60;
      if (c >= val) { setCount(val); clearInterval(timer); }
      else setCount(Math.floor(c));
    }, 1500 / 60);
    return () => clearInterval(timer);
  }, [inView, val]);
  return <span>{count}{suffix}</span>;
}

const stats = [
  { val: 5000,  suffix: "+",   label: "Clients satisfaits" },
  { val: 500,   suffix: "+",   label: "Produits disponibles" },
  { val: 3,     suffix: " ans", label: "D'expérience" },
  { val: 24,    suffix: "h",   label: "Délai livraison" },
];

const values = [
  { icon: Shield, color: "#2ECC40", title: "Authenticité",  desc: "Chaque produit vendu est 100% original, avec facture et garantie constructeur." },
  { icon: Heart,  color: "#EC4899", title: "Proximité",     desc: "Nous sommes béninois, nous comprenons les besoins de nos clients locaux." },
  { icon: Zap,    color: "#F59E0B", title: "Rapidité",      desc: "Livraison express à Parakou et dans tout le Bénin en 24 à 48h." },
  { icon: Award,  color: "#3B82F6", title: "Excellence",    desc: "Un service après-vente disponible 7j/7 pour vous accompagner." },
];

const faqs = [
  {
    q: "Vos produits sont-ils originaux ?",
    a: "Oui, tous nos produits sont 100% originaux et authentiques. Nous travaillons directement avec des fournisseurs certifiés. Chaque produit est accompagné de sa facture et de sa garantie constructeur.",
  },
  {
    q: "Livrez-vous en dehors de Parakou ?",
    a: "Absolument ! Nous livrons dans tout le Bénin. Pour Parakou et ses environs, la livraison est express (24h). Pour les autres villes, comptez 24 à 48h selon la localité.",
  },
  {
    q: "Quels sont les modes de paiement acceptés ?",
    a: "Nous acceptons le paiement via MTN Mobile Money, Moov Money ainsi que le paiement en espèces directement en boutique. Le paiement à la livraison est aussi disponible pour Parakou.",
  },
  {
    q: "Proposez-vous une garantie sur les produits ?",
    a: "Oui. Tous nos téléphones bénéficient de la garantie constructeur (généralement 12 mois). En cas de panne ou de défaut, contactez-nous directement sur WhatsApp et nous trouverons une solution rapide.",
  },
  {
    q: "Comment passer une commande ?",
    a: "Vous pouvez commander directement sur notre site, par WhatsApp au +229 01 94 77 54 60, ou venir en boutique à Parakou, Banikanni sur les pavés quittant le Campus pour le marché Rose Croix, juste en face du restaurant Chez Le Roi.",
  },
  {
    q: "Peut-on visiter votre boutique physique ?",
    a: "Bien sûr ! Notre boutique est ouverte du lundi au samedi de 8h à 20h. Nous sommes situés à Parakou, Banikanni sur les pavés quittant le Campus pour le marché Rose Croix, juste en face du restaurant Chez Le Roi. Vous y trouverez tous nos produits exposés.",
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-[#2ECC40]/40 shadow-md" : "border-gray-100"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-bold text-gray-900 text-sm sm:text-base">{faq.q}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-[#2ECC40] rotate-180" : "bg-gray-100"}`}>
          <ChevronDown size={16} className={open ? "text-white" : "text-gray-500"} />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function APropos() {
  const [heroRef,   heroIn]   = useInView(0.1);
  const [storyRef,  storyIn]  = useInView(0.1);
  const [statsRef,  statsIn]  = useInView(0.2);
  const [valRef,    valIn]    = useInView(0.1);
  const [faqRef,    faqIn]    = useInView(0.1);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #0d2b12 60%, #061a15 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#2ECC40 1px, transparent 1px), linear-gradient(90deg, #2ECC40 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#2ECC40]/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 rounded-full bg-[#1ABC9C]/10 blur-3xl" />

        <div
          ref={heroRef}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/15 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-5">
            Qui sommes-nous
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5">
            À propos de <span className="text-[#2ECC40]">SAM GSM</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Votre boutique de confiance pour les téléphones et accessoires de qualité à Parakou, Bénin.
          </p>
          <div className="flex items-center justify-center gap-2 mt-5 text-white/40 text-sm">
            <MapPin size={14} className="text-[#2ECC40]" />
            Parakou (Banikanni) , Bénin 🇧🇯
          </div>
        </div>
      </div>

      {/* Notre histoire */}
      <section ref={storyRef} className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div style={{ opacity: storyIn ? 1 : 0, transform: storyIn ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/10 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-5">
              Notre histoire
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              La référence téléphonie <br /> à Parakou
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                <strong className="text-gray-900">SAM GSM</strong> est une boutique spécialisée dans la vente de téléphones portables et d'accessoires de qualité. Depuis notre création, nous nous sommes imposés comme la référence en matière de téléphonie à Parakou.
              </p>
              <p>
                Nous sommes situés à <strong className="text-gray-900">Parakou, Banikanni</strong>, sur les pavés quittant le Campus pour le marché Rose Croix, juste en face du restaurant <strong className="text-gray-900">Chez Le Roi</strong>. Un emplacement stratégique, facilement accessible.
              </p>
              <p>
                Notre engagement est simple : vous proposer des produits <strong className="text-gray-900">100% authentiques</strong> aux meilleurs prix, avec un service client disponible et à l'écoute. Que vous cherchiez un iPhone, un Android ou un simple accessoire, vous trouverez votre bonheur chez SAM GSM.
              </p>
            </div>

            {/* Adresse card */}
            <div className="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2ECC40]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={18} className="text-[#2ECC40]" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">Notre adresse</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Parakou/ Banikanni , pavés quittant le Campus <br />
                  pour le marché Rose Croix, en face du restaurant <br />
                  <span className="font-semibold text-gray-700">Chez Le Roi</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2ECC40] text-white font-bold text-sm hover:bg-[#27AE60] transition-all duration-200 hover:shadow-lg">
                Nous contacter <ArrowRight size={15} />
              </a>
              
            </div>
          </div>

          {/* Visuel */}
          <div
            className="relative"
            style={{ opacity: storyIn ? 1 : 0, transform: storyIn ? "translateX(0)" : "translateX(40px)", transition: "all 0.7s ease 0.2s" }}
          >
            <div className="relative w-full aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d2b12, #0a1a0a)" }}>
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#2ECC40 1px, transparent 1px), linear-gradient(90deg, #2ECC40 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-[#2ECC40] font-black text-4xl">SAM</span>
                  <span className="text-white font-black text-4xl">GSM</span>
                </div>
                <span className="text-white/40 text-xs">Parakou, Bénin 🇧🇯</span>
                <div className="w-full space-y-3 mt-4">
                  {[
                    {  text: "Téléphones originaux" },
                    {  text: "Accessoires de qualité" },
                    {  text: "Livraison rapide" },
                    {  text: "Garantie constructeur" },
                    {  text: "Mobile Money accepté" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC40] flex-shrink-0" />
                      <span className="text-white/70 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm"
                style={{ opacity: statsIn ? 1 : 0, transform: statsIn ? "translateY(0)" : "translateY(30px)", transition: `all 0.5s ease ${i * 100}ms` }}
              >
                <div className="text-4xl font-black text-[#2ECC40] mb-2">
                  <AnimatedNumber val={s.val} suffix={s.suffix} inView={statsIn} />
                </div>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section ref={valRef} className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-14" style={{ opacity: valIn ? 1 : 0, transform: valIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/10 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-4">
            Ce qui nous guide
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Nos valeurs</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="group p-7 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ opacity: valIn ? 1 : 0, transform: valIn ? "translateY(0)" : "translateY(30px)", transition: `all 0.5s ease ${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: `${v.color}15` }}>
                  <Icon size={22} style={{ color: v.color }} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="text-center mb-14"
            style={{ opacity: faqIn ? 1 : 0, transform: faqIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/10 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-4">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Questions fréquentes</h2>
            <p className="text-gray-500 text-sm">Tout ce que vous devez savoir sur SAM GSM</p>
          </div>

          <div
            className="space-y-3"
            style={{ opacity: faqIn ? 1 : 0, transform: faqIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.2s" }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>

          {/* CTA sous la FAQ */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm mb-4">Vous n'avez pas trouvé votre réponse ?</p>
            <a
              href="https://wa.me/22901947754 60"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              💬 Posez-nous sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à commander ?</h2>
          <p className="text-gray-500 mb-8">Découvrez notre catalogue de smartphones et accessoires au meilleur prix.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/telephones" className="px-8 py-4 rounded-xl bg-[#2ECC40] text-white font-bold hover:bg-[#27AE60] hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
              Voir les téléphones <ArrowRight size={16} />
            </a>
            <a href="/contact" className="px-8 py-4 rounded-xl border border-gray-200 text-gray-700 font-bold hover:border-gray-300 hover:shadow-sm transition-all duration-200">
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}