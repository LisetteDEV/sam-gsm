import { useState, useRef, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from "lucide-react";

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

const infos = [
  { icon: Phone,   label: "Téléphone",  value: "+229 01 94 77 54 60", href: "tel:+22901947754 60",       color: "#2ECC40" },
  { icon: Mail,    label: "Email",       value: "contact@samgsm.bj",   href: "mailto:contact@samgsm.bj", color: "#3B82F6" },
  { icon: MapPin,  label: "Adresse",    value: "Parakou, Bénin",       href: null,                        color: "#EC4899" },
  { icon: Clock,   label: "Horaires",   value: "Lun–Sam : 8h–20h",    href: null,                        color: "#F59E0B" },
];

export default function Contact() {
  const [heroRef, heroIn] = useInView(0.1);
  const [formRef, formIn] = useInView(0.1);
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.nom.trim())       e.nom = "Requis";
    if (!form.email.includes("@")) e.email = "Email invalide";
    if (!form.message.trim())   e.message = "Requis";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  };

  const Field = ({ name, label, type = "text", placeholder, rows }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={form[name]}
          onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: null })); }}
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all duration-200 focus:border-[#2ECC40] focus:ring-2 focus:ring-[#2ECC40]/20 ${errors[name] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: null })); }}
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-[#2ECC40] focus:ring-2 focus:ring-[#2ECC40]/20 ${errors[name] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #0d2b12 60%, #061a15 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#2ECC40 1px, transparent 1px), linear-gradient(90deg, #2ECC40 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#2ECC40]/10 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div
            style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/15 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-5">
              Contactez-nous
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              On est là pour <span className="text-[#2ECC40]">vous aider</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Une question sur un produit, une commande ou une livraison ? Notre équipe vous répond rapidement.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Infos + WhatsApp */}
          <div
            style={{ opacity: formIn ? 1 : 0, transform: formIn ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s ease 0.1s" }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Nos coordonnées</h2>
            <div className="space-y-4 mb-10">
              {infos.map((info) => {
                const Icon = info.icon;
                const content = (
                  <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${info.color}15` }}>
                      <Icon size={20} style={{ color: info.color }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{info.label}</p>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{info.value}</p>
                    </div>
                  </div>
                );
                return info.href ? (
                  <a key={info.label} href={info.href}>{content}</a>
                ) : (
                  <div key={info.label}>{content}</div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2290194775460"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <MessageCircle size={22} />
              <div>
                <div className="text-sm">Chattez sur WhatsApp</div>
                <div className="text-xs text-white/70 font-normal">Réponse en moins de 10 minutes</div>
              </div>
              <span className="ml-auto text-white/80">→</span>
            </a>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-gray-100 h-48 bg-gray-100 flex items-center justify-center">
              <iframe
                title="SAM GSM Parakou"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31659.87!2d2.6288!3d9.3372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1024f3b3b3b3b3b3%3A0x1234567890abcdef!2sParakou%2C+Benin!5e0!3m2!1sfr!2sbj!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div
            style={{ opacity: formIn ? 1 : 0, transform: formIn ? "translateX(0)" : "translateX(40px)", transition: "all 0.7s ease 0.2s" }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-20">
                <div className="w-20 h-20 rounded-full bg-[#2ECC40]/10 flex items-center justify-center">
                  <CheckCircle size={40} className="text-[#2ECC40]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message envoyé !</h3>
                <p className="text-gray-500 max-w-xs">Nous vous répondrons dans les plus brefs délais, généralement en moins de 2h.</p>
                <button onClick={() => { setSent(false); setForm({ nom: "", email: "", telephone: "", sujet: "", message: "" }); }} className="px-6 py-3 rounded-xl bg-[#2ECC40] text-white font-bold hover:bg-[#27AE60] transition-colors">
                  Nouveau message
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field name="nom"       label="Nom complet"   placeholder="entrez votre nom" />
                    <Field name="telephone" label="Téléphone"     placeholder="votre numéro de téléphone" type="tel" />
                  </div>
                  <Field name="email"   label="Email"   placeholder="votre email" type="email" />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sujet</label>
                    <select
                      value={form.sujet}
                      onChange={e => setForm(f => ({ ...f, sujet: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#2ECC40] focus:ring-2 focus:ring-[#2ECC40]/20 transition-all"
                    >
                      <option value="">Choisir un sujet...</option>
                      <option>Commande & livraison</option>
                      <option>Question sur un produit</option>
                      <option>Service après-vente</option>
                      <option>Paiement</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <Field name="message" label="Message" placeholder="Décrivez votre demande..." rows={5} />
                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-xl bg-[#2ECC40] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#27AE60] hover:shadow-lg hover:shadow-[#2ECC40]/30 active:scale-95 transition-all duration-200"
                  >
                    <Send size={16} />
                    Envoyer le message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}