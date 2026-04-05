import { useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!email.includes("@")) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #1A7A30 0%, #2ECC40 50%, #27AE60 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Restez informé
        </h2>
        <p className="text-white/80 mb-10 text-base">
          Inscrivez-vous pour recevoir nos offres exclusives et nouveautés.
        </p>

        {sent ? (
          <div className="flex items-center justify-center gap-2 text-white font-semibold text-lg">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
            Merci ! Vous êtes inscrit.
          </div>
        ) : (
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Votre email..."
              className="flex-1 px-6 py-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-white/60 outline-none focus:bg-white/25 focus:border-white/40 transition-all duration-200 text-sm"
            />
            <button
              onClick={handleSubmit}
              className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg"
            >
              <Send size={20} className="text-[#2ECC40]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}