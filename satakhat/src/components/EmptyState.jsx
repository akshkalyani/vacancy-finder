import { Building2, PlusCircle } from "lucide-react";

export default function EmptyState({ hasFilters, onPostClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Icon */}
      <div className="bg-indigo-50 rounded-full p-6 mb-5">
        <Building2 className="w-12 h-12 text-indigo-300" />
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        {hasFilters
          ? "No vacancies match your filters"
          : "No vacancies posted yet"}
      </h2>

      {/* Subtext */}
      <p className="text-sm text-gray-400 max-w-xs mb-6 leading-relaxed">
        {hasFilters
          ? "Try adjusting or clearing your filters to see more listings."
          : "Be the first to post a vacancy at Estancia / Abode / Akshaya. It only takes a minute!"}
      </p>

      {/* CTA */}
      {!hasFilters && (
        <button
          onClick={onPostClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow"
        >
          <PlusCircle className="w-4 h-4" />
          Post a Vacancy
        </button>
      )}
    </div>
  );
}
