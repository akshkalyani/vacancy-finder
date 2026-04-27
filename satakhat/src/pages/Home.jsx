import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import VacancyGrid from "../components/VacancyGrid";
import PostVacancyModal from "../components/PostVacancyModal";
import DeleteModal from "../components/DeleteModal";
import PostSuccess from "./PostSuccess";
import { supabase } from "../lib/supabase";
import Footer from "../components/Footer";

const INITIAL_FILTERS = {
  property: "",
  gender: "",
  flatType: "",
  floor: "",
};

export default function Home() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [deleteCode, setDeleteCode] = useState("");

  // ── Fetch vacancies ──────────────────────────────────────────
  const fetchVacancies = useCallback(async () => {
    setLoading(true);
    try {
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

      const { data, error } = await supabase
        .from("vacancies")
        .select(
          `
        id,
        property,
        gender,
        rent,
        deposit,
        flat_type,
        floor,
        furnishing_type,
        has_extra_costs,
        maintenance,
        maintenance_included,
        furnishings,
        brokerage,
        no_brokerage,
        preferred,
        comments,
        poster_name,
        poster_phone,
        created_at
      `,
        )
        .gte("created_at", sixtyDaysAgo.toISOString())
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVacancies(data || []);
    } catch (err) {
      console.error("Failed to fetch vacancies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchVacancies();
    })();
  }, [fetchVacancies]);

  // ── Filtered vacancies ───────────────────────────────────────
  const filtered = vacancies.filter((v) => {
    if (filters.property && v.property !== filters.property) return false;
    if (filters.gender && v.gender !== filters.gender) return false;
    if (filters.flatType && v.flat_type !== filters.flatType) return false;
    if (filters.floor && v.floor !== parseInt(filters.floor)) return false;
    return true;
  });

  const hasActiveFilters = Object.values(filters).some(Boolean);

  // ── Filter handlers ──────────────────────────────────────────
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilterClear = () => {
    setFilters(INITIAL_FILTERS);
  };

  // ── Post handlers ────────────────────────────────────────────
  const handlePostSuccess = (code) => {
    setDeleteCode(code);
    setShowPostModal(false);
    setShowSuccess(true);
  };

  const handleSuccessBack = () => {
    setShowSuccess(false);
    fetchVacancies();
  };

  // ── Delete handlers ──────────────────────────────────────────
  const handleDeleteClick = (vacancy) => {
    setSelectedVacancy(vacancy);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async (id, code) => {
    try {
      const { data, error } = await supabase.rpc("delete_vacancy_by_code", {
        vacancy_id: id,
        input_code: code,
      });

      if (error) throw error;

      if (!data) {
        console.error("Delete failed — code mismatch");
        return;
      }

      setShowDeleteModal(false);
      setSelectedVacancy(null);
      fetchVacancies();
    } catch (err) {
      console.error("Failed to delete vacancy:", err);
    }
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
    setSelectedVacancy(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onPostClick={() => setShowPostModal(true)} />

      {/* Filter bar */}
      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleFilterClear}
      />

      {/* Vacancy grid */}
      <VacancyGrid
        vacancies={filtered}
        loading={loading}
        hasFilters={hasActiveFilters}
        onDelete={handleDeleteClick}
        onPostClick={() => setShowPostModal(true)}
      />

      {/* Post vacancy modal */}
      {showPostModal && (
        <PostVacancyModal
          onClose={() => setShowPostModal(false)}
          onSuccess={handlePostSuccess}
        />
      )}

      {/* Delete modal */}
      {showDeleteModal && selectedVacancy && (
        <DeleteModal
          vacancy={selectedVacancy}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
        />
      )}

      {/* Post success screen */}
      {showSuccess && (
        <PostSuccess deleteCode={deleteCode} onBack={handleSuccessBack} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
