import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, MessageCircle, Heart, Share2, Shield, Truck, RotateCcw } from "lucide-react";
import { phones, accessories, promoProducts } from "../data/data";

const allProducts = [...phones, ...accessories, ...promoProducts];

function formatPrice(price) {
  return price.toLocaleString("fr-FR") + " FCFA";
}

const etatConfig = {
  scelle:   { label: "Scellé",   color: "#2ECC40", bg: "#2ECC40/10" },
  venu:     { label: "Venu",     color: "#3B82F6", bg: "#3B82F6/10" },
  occasion: { label: "Occasion", color: "#F59E0B", bg: "#F59E0B/10" },
};

const tabContent = {
  description: (p) => (
    <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
      <p>{p.name} est un {p.category === "telephones" ? "smartphone" : "accessoire"} de marque <strong className="text-gray-900">{p.brand}</strong>.</p>
      {p.type && <p>Système : <strong className="text-gray-900">{p.type === "ios" ? "Apple iOS" : "Android"}</strong></p>}
      {p.etat && <p>État : <strong className="text-gray-900">{etatConfig[p.etat]?.label || p.etat}</strong> — {
        p.etat === "scelle" ? "Produit neuf, jamais ouvert, dans son emballage d'origine." :
        p.etat === "venu"   ? "Produit neuf, sorti de boîte pour vérification, jamais utilisé." :
        "Produit en très bon état, fonctionnel, légères traces d'usage possibles."
      }</p>}
      <p>Disponible chez <strong className="text-gray-900">SAM GSM</strong>, votre boutique de confiance à Parakou, Bénin.</p>
    </div>
  ),
  caracteristiques: (p) => (
    <div className="space-y-2">
      {[
        { label: "Marque",     val: p.brand },
        { label: "Modèle",     val: p.name },
        { label: "Catégorie",  val: p.category },
        { label: "État",       val: etatConfig[p.etat]?.label || "—" },
        { label: "Système",    val: p.type ? (p.type === "ios" ? "Apple iOS" : "Android") : "—" },
        { label: "Garantie",   val: "Garantie constructeur incluse" },
      ].map((row) => (
        <div key={row.label} className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
          <span className="text-gray-500">{row.label}</span>
          <span className="font-semibold text-gray-900">{row.val}</span>
        </div>
      ))}
    </div>
  ),
  garantie: () => (
    <div className="space-y-4 text-sm text-gray-600">
      <div className="flex gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
        <Shield size={18} className="text-[#2ECC40] flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-gray-900 mb-1">Garantie constructeur</p>
          <p>Tous nos produits sont couverts par la garantie officielle du fabricant.</p>
        </div>
      </div>
      <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <Truck size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-gray-900 mb-1">Livraison rapide</p>
          <p>Livraison à Parakou sous 24h. Dans tout le Bénin sous 48h.</p>
        </div>
      </div>
      <div className="flex gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
        <RotateCcw size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-gray-900 mb-1">Retour & échange</p>
          <p>En cas de problème à la réception, contactez-nous immédiatement sur WhatsApp.</p>
        </div>
      </div>
    </div>
  ),
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === Number(id));

  const [tab, setTab]           = useState("description");
  const [qty, setQty]           = useState(1);
  const [added, setAdded]       = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Produit introuvable.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl bg-[#2ECC40] text-white font-bold">
          Retour
        </button>
      </div>
    );
  }

  const etat = etatConfig[product.etat];
  const similar = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMsg = encodeURIComponent(
    `Bonjour SAM GSM ! Je suis intéressé(e) par : *${product.name}* à ${formatPrice(product.price)}. Est-il disponible ?`
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 hover:text-[#2ECC40] transition-colors font-medium">
            <ArrowLeft size={15} />
            Retour
          </button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-3xl overflow-hidden aspect-square border border-gray-100 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
                onError={(e) => {
                  e.target.src = `https://placehold.co/600x600/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;
                }}
              />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-full">
                  -{product.discount}%
                </div>
              )}
              {etat && (
                <div
                  className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full border"
                  style={{ color: etat.color, background: `${etat.color}18`, borderColor: `${etat.color}40` }}
                >
                  {etat.label}
                </div>
              )}
            </div>
          </div>

          {/* Infos */}
          <div className="space-y-6">
            {/* Marque + nom */}
            <div>
              <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">{product.brand}</p>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">{product.name}</h1>
            </div>

            {/* Prix */}
            <div className="flex items-end gap-4">
              <span className="text-4xl font-black text-[#2ECC40]">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {etat && (
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold border"
                  style={{ color: etat.color, background: `${etat.color}12`, borderColor: `${etat.color}30` }}
                >
                  {etat.label}
                </span>
              )}
              {product.type && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                  {product.type === "ios" ? "Apple iOS" : "Android"}
                </span>
              )}
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                En stock
              </span>
            </div>

            {/* Quantité */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Quantité :</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg font-bold transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                  added
                    ? "bg-green-50 text-[#2ECC40] border-2 border-[#2ECC40]"
                    : "bg-[#2ECC40] text-white hover:bg-[#27AE60] hover:shadow-xl hover:shadow-[#2ECC40]/30 active:scale-95"
                }`}
              >
                <ShoppingCart size={18} />
                {added ? "Ajouté au panier !" : "Ajouter au panier"}
              </button>

              <a
                href={`https://wa.me/22901947754 60?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg active:scale-95"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white" }}
              >
                <MessageCircle size={18} />
                Commander sur WhatsApp
              </a>
            </div>

            {/* Actions secondaires */}
            <div className="flex gap-3">
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  wishlisted
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <Heart size={15} className={wishlisted ? "fill-red-500" : ""} />
                {wishlisted ? "Sauvegardé" : "Sauvegarder"}
              </button>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:border-gray-300 transition-all duration-200"
              >
                <Share2 size={15} />
                Partager
              </button>
            </div>

            {/* Infos livraison */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2.5">
              {[
                { icon: Truck,   color: "#3B82F6", text: "Livraison à Parakou sous 24h" },
                { icon: Shield,  color: "#2ECC40", text: "Produit 100% authentique garanti" },
                { icon: MessageCircle, color: "#25D366", text: "Support WhatsApp 7j/7" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
                    <Icon size={15} style={{ color: item.color }} className="flex-shrink-0" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-gray-200 mb-8">
            {[
              { key: "description",      label: "Description" },
              { key: "caracteristiques", label: "Caractéristiques" },
              { key: "garantie",         label: "Garantie" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all duration-200 ${
                  tab === t.key
                    ? "border-[#2ECC40] text-[#2ECC40]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="max-w-2xl">
            {tabContent[tab](product)}
          </div>
        </div>

        {/* Produits similaires */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produits similaires</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((p) => (
                <div
                  key={p.id}
                  onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0, 0); }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = `https://placehold.co/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(p.name)}`; }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{p.brand}</p>
                    <p className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">{p.name}</p>
                    <p className="text-[#2ECC40] font-black text-sm">{formatPrice(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}