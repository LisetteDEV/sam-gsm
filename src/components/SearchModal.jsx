import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { phones, accessories, promoProducts } from "../data/data";

const allProducts = [...phones, ...accessories, ...promoProducts];

function formatPrice(p) {
  return p.toLocaleString("fr-FR") + " FCFA";
}

export default function SearchModal({ open, onClose }) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const inputRef              = useRef(null);
  const navigate              = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const found = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 8);
    setResults(found);
  }, [query]);

  const handleSelect = (product) => {
    onClose();
    navigate(`/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={20} className="text-[#2ECC40] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un téléphone, une marque..."
            className="flex-1 text-base outline-none text-gray-900 placeholder-gray-400"
          />
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Résultats */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query === "" && (
            <div className="px-5 py-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Recherches populaires</p>
              <div className="flex flex-wrap gap-2">
                {["iPhone 15", "Samsung Galaxy", "AirPods", "Chargeur", "Xiaomi", "Occasion"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium hover:bg-[#2ECC40]/10 hover:text-[#2ECC40] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query !== "" && results.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-gray-400">Aucun résultat pour <strong className="text-gray-700">"{query}"</strong></p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              <p className="px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                {results.length} résultat{results.length > 1 ? "s" : ""}
              </p>
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-1.5"
                      onError={(e) => { e.target.src = `https://placehold.co/48x48/f3f4f6/9ca3af?text=${encodeURIComponent(product.brand)}`; }}
                    />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.brand}</p>
                    <p className="font-bold text-gray-900 text-sm truncate">{product.name}</p>
                    <p className="text-[#2ECC40] font-bold text-sm">{formatPrice(product.price)}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-[#2ECC40] transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
