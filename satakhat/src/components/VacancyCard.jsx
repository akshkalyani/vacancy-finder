import {
  MapPin,
  Users,
  BedDouble,
  Layers,
  Wrench,
  BadgeDollarSign,
  Phone,
  Trash2,
  MessageCircle,
} from "lucide-react";

const GENDER_COLORS = {
  Male: "bg-blue-100 text-blue-700",
  Female: "bg-pink-100 text-pink-700",
  Any: "bg-purple-100 text-purple-700",
};

const PROPERTY_COLORS = {
  Estancia: "bg-emerald-100 text-emerald-700",
  Abode: "bg-orange-100 text-orange-700",
  Akshaya: "bg-cyan-100 text-cyan-700",
};

const PREFERRED_LABELS = {
  non_smoker: "🚭 Non-smoker",
  non_drinker: "🚫 Non-drinker",
  vegetarian: "🥦 Vegetarian",
};

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
      <div>
        <span className="text-xs text-gray-400">{label}</span>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default function VacancyCard({ vacancy, onDelete }) {
  const {
    property,
    gender,
    rent,
    flat_type,
    floor,
    maintenance,
    maintenance_included,
    brokerage,
    no_brokerage,
    preferred,
    comments,
    poster_name,
    poster_phone,
    created_at,
  } = vacancy;

  const postedDate = new Date(created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const whatsappMessage = encodeURIComponent(
    `Hi ${poster_name}, I saw your vacancy listing at ${property} on SRM Vacancies. Is it still available?`,
  );
  const whatsappLink = `https://wa.me/91${poster_phone}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${PROPERTY_COLORS[property] || "bg-gray-100 text-gray-600"}`}
          >
            {property}
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${GENDER_COLORS[gender] || "bg-gray-100 text-gray-600"}`}
          >
            {gender === "Any"
              ? "👥 Any"
              : gender === "Male"
                ? "♂ Male"
                : "♀ Female"}
          </span>
        </div>
        <span className="text-xs text-gray-400">{postedDate}</span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-4" />

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-3">
        <InfoRow
          icon={BadgeDollarSign}
          label="Rent / month"
          value={`₹${rent?.toLocaleString("en-IN")}`}
        />
        <InfoRow icon={BedDouble} label="Flat Type" value={flat_type} />
        <InfoRow
          icon={Layers}
          label="Floor"
          value={`${floor}${floor === 1 ? "st" : floor === 2 ? "nd" : floor === 3 ? "rd" : "th"} Floor`}
        />
        <InfoRow
          icon={Wrench}
          label="Maintenance"
          value={
            maintenance_included
              ? "Included in rent"
              : `₹${maintenance?.toLocaleString("en-IN")}/mo`
          }
        />
        <InfoRow
          icon={MapPin}
          label="Brokerage"
          value={
            no_brokerage
              ? "No Brokerage 🎉"
              : `₹${brokerage?.toLocaleString("en-IN")}`
          }
        />
        <InfoRow
          icon={Users}
          label="Preferred"
          value={
            preferred && preferred.length > 0
              ? preferred.map((p) => PREFERRED_LABELS[p] || p).join(", ")
              : "No preference"
          }
        />
      </div>

      {/* Comments */}
      {comments && (
        <div className="mx-4 mb-3 bg-gray-50 rounded-xl px-3 py-2">
          <p className="text-xs text-gray-400 mb-0.5">Comments</p>
          <p className="text-sm text-gray-700 leading-snug">{comments}</p>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-100 mx-4" />

      {/* Footer — Poster + Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">{poster_name}</p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Phone className="w-3 h-3" />
            {poster_phone}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>

          {/* Delete */}
          <button
            onClick={() => onDelete(vacancy)}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-2.5 py-2 rounded-xl transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
