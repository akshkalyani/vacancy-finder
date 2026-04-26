import { Building2, PlusCircle } from "lucide-react";

export default function Navbar({ onPostClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <Building2 className="text-indigo-600 w-7 h-7" />
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              SRM Vacancies
            </h1>
            <p className="text-xs text-gray-400 leading-tight">
              Estancia · Abode · Akshaya
            </p>
          </div>
        </div>

        {/* Post Button */}
        <button
          onClick={onPostClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white text-sm font-semibold px-4 py-2 rounded-xl shadow"
        >
          <PlusCircle className="w-4 h-4" />
          Post Vacancy
        </button>
      </div>
    </nav>
  );
}
