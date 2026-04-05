import { useState } from "react";
import { phones, accessories } from "../data/data";
import ProductCard from "./ProductCard";

// On prend 2 téléphones, 2 écouteurs, 2 chargeurs depuis data.js
const popularProducts = [
  phones.find((p) => p.id === 1),
  phones.find((p) => p.id === 2),
  accessories.find((p) => p.id === 101),
  accessories.find((p) => p.id === 102),
  accessories.find((p) => p.id === 104),
  accessories.find((p) => p.id === 105),
].filter(Boolean);

export default function PopularProducts() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Produits Populaires</h2>
          <a href="/telephones" className="text-sm font-semibold text-[#2ECC40] hover:underline">
            Voir tout →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}