import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { accessories } from "../data/data";

const cats  = ["Tous", "Écouteurs", "Chargeurs", "Coques", "Accessoires"];
const brands = ["Tous", "Apple", "Samsung", "Anker", "Baseus", "JBL", "Spigen", "OtterBox", "Belkin"];
const sorts  = [
  { label: "Pertinence",       val: "default" },
  { label: "Prix croissant",   val: "asc" },
  { label: "Prix décroissant", val: "desc" },
  { label: "Promotions",       val: "promo" },
];

export default function Accessoires() {
  const [cat, setCat]           = useState("Tous");
  const [brand, setBrand]       = useState("Tous");
  const [sort, setSort]         = useState("default");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) =>
    setWishlist((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id]);

  const filtered = useMemo(() => {
    let list = [...accessories];
    if (cat   !== "Tous") list = list.filter((p) => p.category === cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    if (brand !== "Tous") list = list.filter((p) => p.brand === brand);
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "asc")   list.sort((a, b) => a.price - b.price);
    if (sort === "desc")  list.sort((a, b) => b.price - a.price);
    if (sort === "promo") list = list.filter((p) => p.discount);
    return list;
  }, [cat, brand, sort, maxPrice]);

  const resetFilters = () => { setCat("Tous"); setBrand("Tous"); setSort("default"); setMaxPrice(200000); };
  const hasFilters = cat !== "Tous" || brand !== "Tous" || sort !== "default" || maxPrice < 200000;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0a1a0a] via-[#0d2b12] to-[#061a15] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/15 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-4">
            Accessoires
          </span>
          <h1 className="text-4xl font-black text-white mb-3">Nos Accessoires</h1>
          <p className="text-white/50 text-base">Coques, chargeurs, écouteurs et plus de {accessories.length} produits disponibles</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mb-5">
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

        {/* Barre filtres */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  brand === b
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {b}
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
          {hasFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1 px-3 py-2 rounded-full text-sm text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
              <X size={14} /> Réinitialiser
            </button>
          )}
        </div>

        {/* Filtre prix */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8 flex items-center gap-4">
          <SlidersHorizontal size={16} className="text-[#2ECC40] flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-700 flex-shrink-0">Prix max :</span>
          <input type="range" min="5000" max="200000" step="5000" value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="flex-1 accent-[#2ECC40]"
          />
          <span className="text-sm font-bold text-[#2ECC40] flex-shrink-0 min-w-[110px] text-right">
            {maxPrice.toLocaleString("fr-FR")} FCFA
          </span>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          <span className="font-bold text-gray-700">{filtered.length}</span> produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">Aucun produit trouvé</p>
            <button onClick={resetFilters} className="text-[#2ECC40] font-semibold text-sm hover:underline">Réinitialiser les filtres</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product}
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
