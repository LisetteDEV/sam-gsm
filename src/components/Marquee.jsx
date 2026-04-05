import { useRef, useEffect } from "react";

const marqueeItems = [
  "Livraison rapide à Cotonou",
  "Produits 100% authentiques",
  "iPhone 15 Pro disponible",
  "Samsung Galaxy S24 en stock",
  "Paiement MTN & Moov Money accepté",
  "Service après-vente disponible",
  "Livraison dans tout le Bénin",
  "+10 000 clients satisfaits",
  "Appelez-nous : +229 01 94 77 54 60",
  "Garantie constructeur incluse",
  "Meilleurs prix garantis",
  "Accessoires originaux disponibles",
];

export default function Marquee() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    let x = 0;
    let raf;
    const step = () => {
      x -= 0.6;
      if (x <= -half) x = 0;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position: "relative", background: "#111", borderTop: "1px solid rgba(46,204,64,0.2)", borderBottom: "1px solid rgba(46,204,64,0.2)", padding: "10px 0", overflow: "hidden" }}>
      {/* Fondu gauche */}
      <div style={{ position: "absolute", inset: "0 auto 0 0", width: "80px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, #111, transparent)" }} />
      {/* Fondu droite */}
      <div style={{ position: "absolute", inset: "0 0 0 auto", width: "80px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, #111, transparent)" }} />

      <div ref={ref} style={{ display: "flex", width: "max-content", willChange: "transform" }}>
        {[...marqueeItems, ...marqueeItems].map((text, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0", padding: "0", flexShrink: 0 }}>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.65)", whiteSpace: "nowrap", padding: "0 32px", letterSpacing: "0.02em" }}>
              {text}
            </span>
            <span style={{ color: "#2ECC40", fontSize: "5px", display: "block", flexShrink: 0 }}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
}