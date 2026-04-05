import { Phone, Mail, MapPin } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Téléphones", href: "/telephones" },
  { label: "Accessoires", href: "/accessoires" },
  { label: "Offres", href: "/offres" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Coques & Protections", href: "#" },
  { label: "Chargeurs"},
  { label: "Écouteurs" },
  { label: "Accessoires" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#2ECC40]/20">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + description */}
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <span className="text-[#2ECC40] font-black text-2xl">SAM</span>
            <span className="text-white font-black text-2xl">GSM</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            Votre partenaire de confiance pour les smartphones et accessoires au Bénin.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h4 className="text-[#2ECC40] font-semibold text-sm">Navigation</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Catégories */}
        <div className="space-y-4">
          <h4 className="text-[#2ECC40] font-semibold text-sm">Catégories</h4>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.label}>
                <span className="text-white/50 text-sm">
                 {cat.label}
                </span>
                
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-[#2ECC40] font-semibold text-sm">Contact</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="tel:+22901947754 60"
                className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors duration-200"
              >
                <Phone size={14} className="text-[#2ECC40] flex-shrink-0" />
                +229 01 94 77 54 60
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@samgsm.bj"
                className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors duration-200"
              >
                <Mail size={14} className="text-[#2ECC40] flex-shrink-0" />
                contact@samgsm.bj
              </a>
            </li>
            <li className="flex items-center gap-2 text-white/50 text-sm">
              <MapPin size={14} className="text-[#2ECC40] flex-shrink-0" />
              Parakou, Bénin 🇧🇯
            </li>
          </ul>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="border-t border-white/5 py-5 text-center">
        <p className="text-white/30 text-sm">
          © 2026 SAM GSM . Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}