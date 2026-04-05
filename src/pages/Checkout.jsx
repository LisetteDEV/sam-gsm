import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ChevronRight, ChevronLeft, MapPin, User, CreditCard, Check } from "lucide-react";

function formatPrice(p) {
  return p.toLocaleString("fr-FR") + " FCFA";
}

const LIVRAISON = 1500;

const steps = [
  { id: 1, label: "Informations",  icon: User },
  { id: 2, label: "Livraison",     icon: MapPin },
  { id: 3, label: "Paiement",      icon: CreditCard },
];

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    nom: "", prenom: "", telephone: "", email: "",
    ville: "", quartier: "", adresse: "",
    paiement: "mtn",
  });

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: null }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!form.nom.trim())       e.nom       = "Requis";
      if (!form.prenom.trim())    e.prenom    = "Requis";
      if (!form.telephone.trim()) e.telephone = "Requis";
    }
    if (step === 2) {
      if (!form.ville.trim())    e.ville    = "Requis";
      if (!form.quartier.trim()) e.quartier = "Requis";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const prev = () => setStep((s) => s - 1);

  const handleConfirm = () => {
    const orderNum = "SAM-" + Date.now().toString().slice(-6);
    clearCart();
    navigate("/order-confirmation", { state: { orderNum, form, total: total + LIVRAISON } });
  };

  const Field = ({ name, label, placeholder, type = "text", half }) => (
    <div className={half ? "" : "col-span-2 sm:col-span-1"}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => set(name, e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-[#2ECC40] focus:ring-2 focus:ring-[#2ECC40]/20 ${errors[name] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Votre panier est vide.</p>
        <button onClick={() => navigate("/telephones")} className="px-6 py-3 rounded-xl bg-[#2ECC40] text-white font-bold">
          Voir les produits
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">

        {/* Titre */}
        <h1 className="text-3xl font-black text-gray-900 mb-8 text-center">Finaliser la commande</h1>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done    = step > s.id;
            const active  = step === s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${done ? "bg-[#2ECC40] text-white" : active ? "bg-[#2ECC40] text-white shadow-lg shadow-[#2ECC40]/30" : "bg-gray-200 text-gray-400"}`}>
                    {done ? <Check size={16} /> : <Icon size={16} />}
                  </div>
                  <span className={`text-xs font-semibold ${active ? "text-[#2ECC40]" : "text-gray-400"}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 rounded-full transition-all duration-300 ${step > s.id ? "bg-[#2ECC40]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">

              {/* Étape 1 */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Vos informations</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field name="nom"       label="Nom"          placeholder="Votre nom" />
                    <Field name="prenom"    label="Prénom"       placeholder="Votre prénom" />
                    <Field name="telephone" label="Téléphone"    placeholder="+229 ..." type="tel" />
                    <Field name="email"     label="Email (optionnel)" placeholder="vous@email.com" type="email" />
                  </div>
                </div>
              )}

              {/* Étape 2 */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Adresse de livraison</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field name="ville"    label="Ville"    placeholder="Ex: Parakou" />
                    <Field name="quartier" label="Quartier" placeholder="Ex: Banikanni" />
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Précision (optionnel)</label>
                      <textarea
                        rows={3}
                        placeholder="Repère, description de l'adresse..."
                        value={form.adresse}
                        onChange={(e) => set("adresse", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#2ECC40] focus:ring-2 focus:ring-[#2ECC40]/20 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 3 */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Mode de paiement</h2>
                  <div className="space-y-3">
                    {[
                      { val: "mtn",      label: "MTN Mobile Money",   desc: "Paiement via MTN MoMo",          color: "#FFC107" },
                      { val: "moov",     label: "Moov Money",          desc: "Paiement via Moov Money",        color: "#0066CC" },
                      { val: "livraison",label: "Paiement à la livraison", desc: "Payez en espèces à la réception", color: "#2ECC40" },
                    ].map((opt) => (
                      <label
                        key={opt.val}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${form.paiement === opt.val ? "border-[#2ECC40] bg-[#2ECC40]/5" : "border-gray-100 hover:border-gray-200"}`}
                      >
                        <input type="radio" name="paiement" value={opt.val} checked={form.paiement === opt.val} onChange={() => set("paiement", opt.val)} className="hidden" />
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: form.paiement === opt.val ? "#2ECC40" : "#d1d5db" }}>
                          {form.paiement === opt.val && <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC40]" />}
                        </div>
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: opt.color }} />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{opt.label}</p>
                          <p className="text-gray-500 text-xs">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Récap commande */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="font-bold text-gray-900 text-sm mb-3">Récapitulatif</p>
                    <div className="space-y-1.5 text-sm text-gray-600">
                      <p><span className="text-gray-400">Nom :</span> {form.prenom} {form.nom}</p>
                      <p><span className="text-gray-400">Téléphone :</span> {form.telephone}</p>
                      <p><span className="text-gray-400">Livraison :</span> {form.quartier}, {form.ville}</p>
                      <p><span className="text-gray-400">Paiement :</span> {form.paiement === "mtn" ? "MTN MoMo" : form.paiement === "moov" ? "Moov Money" : "À la livraison"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button onClick={prev} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                    <ChevronLeft size={16} /> Retour
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={next} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2ECC40] text-white font-bold text-sm hover:bg-[#27AE60] transition-colors">
                    Continuer <ChevronRight size={16} />
                  </button>
                ) : (
                  <button onClick={handleConfirm} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2ECC40] text-white font-bold text-sm hover:bg-[#27AE60] transition-colors hover:shadow-lg">
                    <Check size={16} /> Confirmer la commande
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Résumé panier */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Votre commande</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1"
                        onError={(e) => { e.target.src = `https://placehold.co/48x48/f3f4f6/9ca3af?text=${item.brand}`; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">x{item.qty}</p>
                      <p className="text-xs font-bold text-[#2ECC40]">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Livraison</span>
                  <span>{formatPrice(LIVRAISON)}</span>
                </div>
                <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[#2ECC40]">{formatPrice(total + LIVRAISON)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
