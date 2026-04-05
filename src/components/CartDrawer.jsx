import { useCart } from "../context/CartContext";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function formatPrice(p) {
  return p.toLocaleString("fr-FR") + " FCFA";
}

export default function CartDrawer() {
  const { items, removeFromCart, updateQty, total, itemCount, drawerOpen, setDrawerOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-[#2ECC40]" />
            <h2 className="font-bold text-gray-900 text-lg">Mon panier</h2>
            {itemCount > 0 && (
              <span className="w-6 h-6 rounded-full bg-[#2ECC40] text-white text-xs font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                <ShoppingCart size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Votre panier est vide</p>
              <button
                onClick={() => { setDrawerOpen(false); navigate("/telephones"); }}
                className="px-5 py-2.5 rounded-xl bg-[#2ECC40] text-white font-bold text-sm hover:bg-[#27AE60] transition-colors"
              >
                Voir les produits
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-2xl border border-gray-100 bg-gray-50">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => { e.target.src = `https://placehold.co/80x80/f3f4f6/9ca3af?text=${encodeURIComponent(item.brand)}`; }}
                  />
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.brand}</p>
                  <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                  <p className="text-[#2ECC40] font-black text-sm mt-1">{formatPrice(item.price)}</p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-[#2ECC40] transition-colors"
                    >
                      <Minus size={12} className="text-gray-600" />
                    </button>
                    <span className="w-6 text-center font-bold text-gray-900 text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-[#2ECC40] transition-colors"
                    >
                      <Plus size={12} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto w-7 h-7 rounded-lg bg-white border border-red-100 flex items-center justify-center hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={12} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-4 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Sous-total</span>
              <span className="font-black text-gray-900 text-lg">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-gray-400">Frais de livraison calculés à l'étape suivante</p>
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-2xl bg-[#2ECC40] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#27AE60] hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              Passer la commande
              <ArrowRight size={18} />
            </button>
            <a
              href={`https://wa.me/22901947754 60?text=${encodeURIComponent("Bonjour SAM GSM ! Je souhaite commander :\n" + items.map(i => `- ${i.name} x${i.qty} = ${formatPrice(i.price * i.qty)}`).join("\n") + `\nTotal : ${formatPrice(total)}`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white" }}
            >
              Commander via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}