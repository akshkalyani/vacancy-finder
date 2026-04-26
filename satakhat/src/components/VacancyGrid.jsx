import VacancyCard from "./VacancyCard";
import EmptyState from "./EmptyState";

export default function VacancyGrid({
  vacancies,
  loading,
  hasFilters,
  onDelete,
  onPostClick,
}) {
  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-pulse"
            >
              {/* Header skeleton */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>

              <div className="border-t border-gray-100 mx-4" />

              {/* Grid skeleton */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-3">
                {[...Array(6)].map((_, j) => (
                  <div key={j}>
                    <div className="h-3 w-16 bg-gray-200 rounded mb-1" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>

              {/* Comments skeleton */}
              <div className="mx-4 mb-3 bg-gray-50 rounded-xl px-3 py-2">
                <div className="h-3 w-12 bg-gray-200 rounded mb-1" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>

              <div className="border-t border-gray-100 mx-4" />

              {/* Footer skeleton */}
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-24 bg-gray-200 rounded-xl" />
                  <div className="h-8 w-8 bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!vacancies || vacancies.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <EmptyState hasFilters={hasFilters} onPostClick={onPostClick} />
      </div>
    );
  }

  // Vacancy count
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Result count */}
      <p className="text-sm text-gray-400 mb-4">
        Showing{" "}
        <span className="font-semibold text-gray-600">{vacancies.length}</span>{" "}
        vacanc{vacancies.length === 1 ? "y" : "ies"}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
