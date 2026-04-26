import { SlidersHorizontal, X } from "lucide-react";

const FLAT_TYPES = ["3BHK 3 Washroom", "3BHK 2 Washroom", "2BHK 2 Washroom"];

export default function FilterBar({ filters, onChange, onClear }) {
  const hasActiveFilters =
    filters.property || filters.gender || filters.flatType || filters.floor;

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
            Filter Vacancies
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/* Property */}
          <select
            value={filters.property}
            onChange={(e) => onChange("property", e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          >
            <option value="">All Properties</option>
            <option value="Estancia">Estancia</option>
            <option value="Abode">Abode</option>
            <option value="Akshaya">Akshaya</option>
          </select>

          {/* Gender */}
          <select
            value={filters.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          >
            <option value="">Any Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Any">Any</option>
          </select>

          {/* Flat Type */}
          <select
            value={filters.flatType}
            onChange={(e) => onChange("flatType", e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          >
            <option value="">All Flat Types</option>
            {FLAT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Floor */}
          <input
            type="number"
            placeholder="Floor no."
            value={filters.floor}
            min={1}
            onChange={(e) => onChange("floor", e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
