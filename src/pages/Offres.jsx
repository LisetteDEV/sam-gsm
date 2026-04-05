import { useState, useMemo } from "react";
import { Tag, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { promoProducts } from "../data/data";

const cats = ["Tous", "Téléphones", "Écouteurs", "Chargeurs", "Coques", "Accessoires"];
const sorts = [
  { label: "Meilleure remise", val: "discount" },
  { label: "Prix croissant",   val: "asc" },
  { label: "Prix décroissant", val: "desc" },
];

export default function Offres() {
  const [cat, setCat]       = useState("Tous");
  const [sort, setSort]     = useState("discount");
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) =>
    setWishlist((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id]);

  const filtered = useMemo(() => {
    let list = [...promoProducts];
    if (cat !== "Tous") {
      const map = {
        "Téléphones": "telephones",
        "Écouteurs":  "ecouteurs",
        "Chargeurs":  "chargeurs",
        "Coques":     "coques",
        "Accessoires":"accessoires",
      };
      list = list.filter((p) => p.category === map[cat]);
    }
    if (sort === "asc")      list.sort((a, b) => a.price - b.price);
    if (sort === "desc")     list.sort((a, b) => b.price - a.price);
    if (sort === "discount") list.sort((a, b) => b.discount - a.discount);
    return list;
  }, [cat, sort]);

  const maxDiscount  = Math.max(...promoProducts.map((p) => p.discount));
  const totalSavings = promoProducts.reduce((acc, p) => acc + (p.oldPrice - p.price), 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #1a4a20 50%, #0d2b12 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#2ECC40 1px, transparent 1px), linear-gradient(90deg, #2ECC40 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#2ECC40]/15 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/15 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-6">
            Promotions
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Découvrez nos <span className="text-[#2ECC40]">promotions</span> en cours
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Des offres sélectionnées sur nos meilleurs produits , stocks limités, profitez-en vite.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  cat === c
                    ? "bg-[#2ECC40] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#2ECC40]/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 outline-none cursor-pointer"
            >
              {sorts.map((s) => <option key={s.val} value={s.val}>{s.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { label: "Produits en promo",   val: promoProducts.length },
            { label: "Remise maximale",     val: maxDiscount + "%" },
            { label: "Économies possibles", val: totalSavings.toLocaleString("fr-FR") + " FCFA" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Tag size={14} className="text-[#2ECC40]" />
              <span className="text-xs text-gray-500">{s.label}</span>
              <span className="font-black text-gray-900 text-sm">{s.val}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-400 mb-6">
          <span className="font-bold text-gray-700">{filtered.length}</span> offre{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucune offre dans cette catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={() => toggleWishlist(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}