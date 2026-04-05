import { useEffect, useRef, useState  } from "react";

export default function Hero() {
  const glowRef = useRef(null);
  function AnimatedStat({ val, suffix, label }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const duration = 1500;
    const steps = 60;
    const increment = val / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= val) { setCount(val); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, val]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-black text-[#2ECC40]">
        {count}{suffix}
      </div>
      <div className="text-xs text-white/40 mt-0.5">{label}</div>
    </div>
  );
}

  useEffect(() => {
    const handleMouse = (e) => {
      if (!glowRef.current) return;
      const { clientX, clientY } = e;
      glowRef.current.style.background = `radial-gradient(600px at ${clientX}px ${clientY}px, rgba(46,204,64,0.08), transparent 80%)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0a1a0a] via-[#0d2b12] to-[#061a15]">

      {/* Cursor glow effect */}
      <div ref={glowRef} className="pointer-events-none fixed inset-0 z-10 transition-all duration-300" />

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#2ECC40]/10 animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#2ECC40]/5 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#1ABC9C]/5 blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#2ECC40 1px, transparent 1px), linear-gradient(90deg, #2ECC40 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh] py-16">

          {/* Texte - Gauche */}
          <div className="space-y-8">
            
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">Votre</span>
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #2ECC40 0%, #1ABC9C 50%, #27AE60 100%)" }}>
                  Téléphone
                </span>
                <br />
                <span className="text-white">Idéal,</span>{" "}
                <span className="text-white/60">Livré</span>
                <br />
                <span className="text-white">Chez Vous</span>
              </h1>
            </div>

            <p className="text-lg text-white/60 leading-relaxed max-w-lg">
              Découvrez les derniers smartphones Android / iOS  et tous les accessoires de téléphone au meilleur prix au Bénin.{" "}
              <span className="text-white/80">Livraison rapide</span> à Parakou et dans tout le pays. Paiement Mobile Money accepté.
            </p>

            {/* Stats */}
<div className="flex gap-8">
  {[
    { val: 500, suffix: "+", label: "Modèles" },
    { val: 10,  suffix: "K+", label: "Clients" },
    { val: 48,  suffix: "h",  label: "Livraison" },
  ].map((s) => (
    <AnimatedStat key={s.label} {...s} />
  ))}
</div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/telephones?type=ios" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2ECC40] text-black font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(46,204,64,0.4)]">
                <span className="relative z-10">Explorer les iPhones</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a href="/telephones?type=android" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-2xl border border-white/20 hover:border-[#2ECC40]/60 hover:bg-[#2ECC40]/10 transition-all duration-300">
                Voir les Androids
              </a>
            </div>
          </div>

          {/* Image téléphone - Droite */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Halo */}
            <div className="absolute w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #2ECC40 0%, #1ABC9C 40%, transparent 70%)", animation: "pulse-glow 3s ease-in-out infinite" }} />



            {/* Téléphone flottant */}
            <div className="relative z-10" style={{ animation: "float 4s ease-in-out infinite" }}>

              {/* Ombre sous le tel */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full blur-xl opacity-40" style={{ background: "radial-gradient(ellipse, #2ECC40 0%, transparent 70%)", animation: "float-shadow 4s ease-in-out infinite" }} />

              {/* Mockup téléphone SVG — remplace par ton image quand tu l'as */}
              <div className="relative w-72 sm:w-80 lg:w-96">
                <img
                  src="/imgphone1.png"
                  alt="Smartphone - SAM GSM"
                  className="w-full h-auto object-contain"
                  style={{ filter: "drop-shadow(0 30px 60px rgba(46,204,64,0.3)) drop-shadow(0 0 40px rgba(0,0,0,0.5))" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    document.getElementById("phone-fallback").style.display = "flex";
                  }}
                />
                {/* Fallback affiché si l'image est absente */}
                <div
                  id="phone-fallback"
                  style={{ display: "none" }}
                  className="w-56 h-[440px] rounded-[44px] border-[6px] border-[#222] bg-[#0d0d0d] shadow-2xl flex-col items-center justify-center gap-3"
                >
                  <div className="w-24 h-5 rounded-full bg-[#1a1a1a] mb-4" />
                  <img src="/logo-sam-gsm.png" alt="SAM GSM" className="w-20 h-auto object-contain" onError={(e) => e.target.style.display = "none"} />
                  <span className="text-[#2ECC40] font-black text-2xl mt-2">SAM GSM</span>
                  <span className="text-white/30 text-xs">Bénin</span>
                  <div className="w-16 h-1 rounded-full bg-[#1a1a1a] mt-6" />
                </div>

                

               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L48 50C96 40 192 20 288 15C384 10 480 20 576 25C672 30 768 30 864 25C960 20 1056 10 1152 10C1248 10 1344 20 1392 25L1440 30V60H0Z" fill="white" fillOpacity="0.03" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-16px) rotate(1deg); }
          66%       { transform: translateY(-8px) rotate(-0.5deg); }
        }
        @keyframes float-shadow {
          0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.4; }
          50%       { transform: translateX(-50%) scaleX(0.8); opacity: 0.2; }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1);    opacity: 0.3; }
          50%       { transform: scale(1.15); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}