import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function formatPrice(p) {
  return p.toLocaleString("fr-FR") + " FCFA";
}

const etatConfig = {
  scelle:   { label: "Scellé",   color: "#2ECC40" },
  venu:     { label: "Venu",     color: "#3B82F6" },
  occasion: { label: "Occasion", color: "#F59E0B" },
};

export default function ProductCard({ product, isWishlisted, onToggleWishlist }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const etat = product.etat ? etatConfig[product.etat] : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    onToggleWishlist?.();
  };

  return (
    <div
      onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0, 0); }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = `https://placehold.co/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`; }}
        />
        <button onClick={handleWishlist} className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200">
          <Heart size={15} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}
        {etat && !product.discount && (
          <div className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full border"
            style={{ color: etat.color, background: `${etat.color}18`, borderColor: `${etat.color}40` }}>
            {etat.label}
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">{product.brand}</p>
        <h3 className="font-bold text-gray-900 text-sm mb-3 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#2ECC40] font-bold">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-gray-400 text-xs line-through">{formatPrice(product.oldPrice)}</span>}
        </div>
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            added ? "bg-green-50 text-[#2ECC40] border border-[#2ECC40]" : "bg-[#2ECC40] text-white hover:bg-[#27AE60] hover:shadow-lg active:scale-95"
          }`}
        >
          <ShoppingCart size={15} />
          {added ? "Ajouté !" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}