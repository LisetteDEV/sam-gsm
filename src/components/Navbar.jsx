import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, Menu, X, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";
import SearchModal from "./SearchModal";

const navLinks = [
  { label: "Accueil",      href: "/" },
  { label: "Téléphones",   href: "/telephones" },
  { label: "Accessoires",  href: "/accessoires" },
  { label: "Offres",       href: "/offres" },
  { label: "À propos",     href: "/a-propos" },
  { label: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const { itemCount, setDrawerOpen }  = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer menu mobile au changement de page
  const handleNav = () => setMenuOpen(false);

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-gray-100" : "bg-white border-b border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src="/logo.png"
                alt="SAM GSM"
                className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden items-center gap-1" style={{ display: "none" }}>
                <span className="text-[#2ECC40] font-black text-xl">SAM</span>
                <span className="text-gray-900 font-black text-xl">GSM</span>
              </div>
            </a>

            {/* Nav Desktop */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 group">
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#2ECC40] rounded-full transition-all duration-300 group-hover:w-4/5" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <a href="tel:+22901947754 60" className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2ECC40]/30 text-[#2ECC40] hover:bg-[#2ECC40]/10 transition-all duration-200 text-xs font-medium">
                <Phone size={12} />
                +229 01 94 77 54 60
              </a>
              <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 rounded-lg">
                <Search size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-[#ff6b6b] transition-colors duration-200 hover:bg-gray-100 rounded-lg">
                <Heart size={18} />
              </button>
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative p-2 text-gray-500 hover:text-[#2ECC40] transition-colors duration-200 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingCart size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#2ECC40] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-500">
                <Search size={20} />
              </button>
              <button onClick={() => setDrawerOpen(true)} className="relative p-2 text-gray-500 hover:text-[#2ECC40]">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#2ECC40] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={handleNav}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                <span className="text-[#2ECC40] text-xs">→</span>
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <a href="tel:+22901947754 60" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2ECC40]/10 text-[#2ECC40] font-medium text-sm">
                <Phone size={14} />
                +229 01 94 77 54 60
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
}