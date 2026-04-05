import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { phones } from "../data/data";

const brands = ["Tous", "Apple", "Samsung", "Xiaomi", "Tecno", "Infinix"];
const types  = ["Tous", "iOS", "Android"];
const sorts  = [
  { label: "Pertinence",        val: "default" },
  { label: "Prix croissant",    val: "asc" },
  { label: "Prix décroissant",  val: "desc" },
];
const etats = ["Tous", "Scellé", "Venu", "Occasion"];

export default function Telephones() {
  const [brand, setBrand]       = useState("Tous");
  const [type, setType]         = useState("Tous");
  const [sort, setSort]         = useState("default");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [wishlist, setWishlist] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [etat, setEtat] = useState("Tous");

  const toggleWishlist = (id) =>
    setWishlist((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id]);

  const filtered = useMemo(() => {
    let list = [...phones];
    if (brand !== "Tous") list = list.filter((p) => p.brand === brand);
    if (type  !== "Tous") list = list.filter((p) => p.type === type.toLowerCase());
    if (etat !== "Tous") list = list.filter((p) => p.etat === etat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "asc")   list.sort((a, b) => a.price - b.price);
    if (sort === "desc")  list.sort((a, b) => b.price - a.price);
    return list;
  }, [brand, type, sort, maxPrice,etat]);

  const resetFilters = () => { setBrand("Tous"); setType("Tous"); setSort("default"); setMaxPrice(1000000);setEtat("Tous"); };
  const hasFilters = brand !== "Tous" || type !== "Tous" || sort !== "default" || maxPrice < 1000000 || etat !== "Tous";
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0a1a0a] via-[#0d2b12] to-[#061a15] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2ECC40]/15 text-[#2ECC40] text-xs font-semibold tracking-widest uppercase mb-4">
            Catalogue
          </span>
          <h1 className="text-4xl font-black text-white mb-3">Nos Téléphones</h1>
          <p className="text-white/50 text-base">iPhones et Androids disponibles , plus de  {phones.length} modèles en stock</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Barre filtres */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Marques */}
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  brand === b
                    ? "bg-[#2ECC40] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#2ECC40]/40"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          {/* État */}
<div className="flex flex-wrap gap-2">
  {etats.map((e) => (
    <button
      key={e}
      onClick={() => setEtat(e)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
        etat === e
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
      }`}
    >
      {e}
    </button>
  ))}
</div>

          <div className="flex-1" />

          {/* Type iOS/Android */}
          <div className="flex gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  type === t
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 outline-none cursor-pointer hover:border-[#2ECC40]/40"
            >
              {sorts.map((s) => <option key={s.val} value={s.val}>{s.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Reset */}
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
          <input
            type="range" min="50000" max="1000000" step="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="flex-1 accent-[#2ECC40]"
          />
          <span className="text-sm font-bold text-[#2ECC40] flex-shrink-0 min-w-[110px] text-right">
            {maxPrice.toLocaleString("fr-FR")} FCFA
          </span>
        </div>

        {/* Résultats */}
        <p className="text-sm text-gray-400 mb-6">
          <span className="font-bold text-gray-700">{filtered.length}</span> produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">Aucun produit trouvé</p>
            <button onClick={resetFilters} className="text-[#2ECC40] font-semibold text-sm hover:underline">
              Réinitialiser les filtres
            </button>
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