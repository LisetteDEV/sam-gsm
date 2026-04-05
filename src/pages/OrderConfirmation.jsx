import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, MessageCircle, Home, Package } from "lucide-react";

function formatPrice(p) {
  return p.toLocaleString("fr-FR") + " FCFA";
}

export default function OrderConfirmation() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { orderNum, form, total } = state;
  const whatsappMsg = encodeURIComponent(
    `Bonjour SAM GSM ! Je viens de passer la commande *${orderNum}*.\nNom : ${form.prenom} ${form.nom}\nTéléphone : ${form.telephone}\nLivraison : ${form.quartier}, ${form.ville}\nMontant total : ${formatPrice(total)}`
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">

        {/* Card principale */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 text-center">

          {/* Icône succès */}
          <div className="w-24 h-24 rounded-full bg-[#2ECC40]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-[#2ECC40]" strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-2">Commande confirmée !</h1>
          <p className="text-gray-500 mb-6">
            Merci <strong className="text-gray-900">{form.prenom}</strong> ! Votre commande a bien été reçue.
          </p>

          {/* Numéro de commande */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2ECC40]/10 border border-[#2ECC40]/20 mb-8">
            <Package size={16} className="text-[#2ECC40]" />
            <span className="font-black text-[#2ECC40] tracking-wider">{orderNum}</span>
          </div>

          {/* Détails */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 text-left space-y-3 mb-8">
            {[
              { label: "Client",    val: `${form.prenom} ${form.nom}` },
              { label: "Téléphone", val: form.telephone },
              { label: "Livraison", val: `${form.quartier}, ${form.ville}` },
              { label: "Paiement",  val: form.paiement === "mtn" ? "MTN Mobile Money" : form.paiement === "moov" ? "Moov Money" : "Paiement à la livraison" },
              { label: "Total",     val: formatPrice(total), green: true },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">{row.label}</span>
                <span className={`font-bold ${row.green ? "text-[#2ECC40]" : "text-gray-900"}`}>{row.val}</span>
              </div>
            ))}
          </div>

          {/* Message info */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 text-left">
            <p className="text-blue-700 text-sm font-semibold mb-1">Prochaine étape</p>
            <p className="text-blue-600 text-sm">
              Notre équipe vous contactera au <strong>{form.telephone}</strong> pour confirmer et organiser la livraison.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <a
              href={`https://wa.me/22901947754 60?text=${whatsappMsg}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white" }}
            >
              <MessageCircle size={18} />
              Confirmer sur WhatsApp
            </a>
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 rounded-2xl border border-gray-200 text-gray-700 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Home size={18} />
              Retour à l'accueil
            </button>
          </div>
        </div>

        {/* Info bas */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Une question ? Appelez-nous au{" "}
          <a href="tel:+22901947754 60" className="text-[#2ECC40] font-semibold">+229 01 94 77 54 60</a>
        </p>
      </div>
    </div>
  );
}
