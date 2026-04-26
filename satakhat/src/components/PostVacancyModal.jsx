import { useState } from "react";
import { X, PlusCircle } from "lucide-react";

const FLAT_TYPES = ["3BHK 3 Washroom", "3BHK 2 Washroom", "2BHK 2 Washroom"];

const PREFERRED_OPTIONS = [
  { value: "non_smoker", label: "🚭 Non-smoker" },
  { value: "non_drinker", label: "🚫 Non-drinker" },
  { value: "vegetarian", label: "🥦 Vegetarian" },
];

function generateDeleteCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function Label({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-gray-500 mb-1">
      {children} {required && <span className="text-red-400">*</span>}
    </label>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      {children}
    </select>
  );
}

export default function PostVacancyModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    property: "",
    gender: "",
    rent: "",
    flat_type: "",
    floor: "",
    maintenance: "",
    maintenance_included: false,
    brokerage: "",
    no_brokerage: false,
    preferred: [],
    comments: "",
    poster_name: "",
    poster_phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const togglePreferred = (value) => {
    setForm((prev) => ({
      ...prev,
      preferred: prev.preferred.includes(value)
        ? prev.preferred.filter((p) => p !== value)
        : [...prev.preferred, value],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.property) e.property = "Select a property";
    if (!form.gender) e.gender = "Select gender allowed";
    if (!form.rent) e.rent = "Enter rent amount";
    if (!form.flat_type) e.flat_type = "Select flat type";
    if (!form.floor) e.floor = "Enter floor number";
    if (!form.maintenance_included && !form.maintenance)
      e.maintenance = "Enter maintenance or check included";
    if (!form.no_brokerage && !form.brokerage)
      e.brokerage = "Enter brokerage or check no brokerage";
    if (!form.poster_name.trim()) e.poster_name = "Enter your name";
    if (!form.poster_phone.trim()) e.poster_phone = "Enter your phone number";
    if (form.poster_phone && !/^\d{10}$/.test(form.poster_phone))
      e.poster_phone = "Enter a valid 10-digit number";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setLoading(true);

    const delete_code = generateDeleteCode();

    const payload = {
      property: form.property,
      gender: form.gender,
      rent: parseInt(form.rent),
      flat_type: form.flat_type,
      floor: parseInt(form.floor),
      maintenance: form.maintenance_included ? 0 : parseInt(form.maintenance),
      maintenance_included: form.maintenance_included,
      brokerage: form.no_brokerage ? 0 : parseInt(form.brokerage),
      no_brokerage: form.no_brokerage,
      preferred: form.preferred,
      comments: form.comments.trim(),
      poster_name: form.poster_name.trim(),
      poster_phone: form.poster_phone.trim(),
      delete_code,
    };

    try {
      const { supabase } = await import("../lib/supabase");
      const { error } = await supabase.from("vacancies").insert([payload]);
      if (error) throw error;
      onSuccess(delete_code);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full max-w-lg z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-indigo-500" />
            <h2 className="text-base font-bold text-gray-800">
              Post a Vacancy
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {/* Property + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Property</Label>
              <Select
                value={form.property}
                onChange={(e) => set("property", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Estancia">Estancia</option>
                <option value="Abode">Abode</option>
                <option value="Akshaya">Akshaya</option>
              </Select>
              {errors.property && (
                <p className="text-xs text-red-500 mt-1">{errors.property}</p>
              )}
            </div>
            <div>
              <Label required>Gender Allowed</Label>
              <Select
                value={form.gender}
                onChange={(e) => set("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </Select>
              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* Flat Type + Floor */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Flat Type</Label>
              <Select
                value={form.flat_type}
                onChange={(e) => set("flat_type", e.target.value)}
              >
                <option value="">Select</option>
                {FLAT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
              {errors.flat_type && (
                <p className="text-xs text-red-500 mt-1">{errors.flat_type}</p>
              )}
            </div>
            <div>
              <Label required>Floor</Label>
              <Input
                type="number"
                placeholder="e.g. 4"
                min={1}
                value={form.floor}
                onChange={(e) => set("floor", e.target.value)}
              />
              {errors.floor && (
                <p className="text-xs text-red-500 mt-1">{errors.floor}</p>
              )}
            </div>
          </div>

          {/* Rent */}
          <div>
            <Label required>Rent per Month (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 12000"
              value={form.rent}
              onChange={(e) => set("rent", e.target.value)}
            />
            {errors.rent && (
              <p className="text-xs text-red-500 mt-1">{errors.rent}</p>
            )}
          </div>

          {/* Maintenance */}
          <div>
            <Label required>Maintenance (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 1500"
              value={form.maintenance}
              disabled={form.maintenance_included}
              onChange={(e) => set("maintenance", e.target.value)}
            />
            <label className="flex items-center gap-2 mt-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={form.maintenance_included}
                onChange={(e) => set("maintenance_included", e.target.checked)}
                className="accent-indigo-500 w-4 h-4"
              />
              <span className="text-xs text-gray-500">Included in rent</span>
            </label>
            {errors.maintenance && (
              <p className="text-xs text-red-500 mt-1">{errors.maintenance}</p>
            )}
          </div>

          {/* Brokerage */}
          <div>
            <Label required>Brokerage (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 5000"
              value={form.brokerage}
              disabled={form.no_brokerage}
              onChange={(e) => set("brokerage", e.target.value)}
            />
            <label className="flex items-center gap-2 mt-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={form.no_brokerage}
                onChange={(e) => set("no_brokerage", e.target.checked)}
                className="accent-indigo-500 w-4 h-4"
              />
              <span className="text-xs text-gray-500">No brokerage</span>
            </label>
            {errors.brokerage && (
              <p className="text-xs text-red-500 mt-1">{errors.brokerage}</p>
            )}
          </div>

          {/* Preferred */}
          <div>
            <Label>Preferred Flatmate</Label>
            <div className="flex gap-2 flex-wrap mt-1">
              {PREFERRED_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => togglePreferred(opt.value)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                    form.preferred.includes(opt.value)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <Label>Comments</Label>
            <textarea
              placeholder="e.g. Available from May 1st, fully furnished, AC included..."
              value={form.comments}
              onChange={(e) => set("comments", e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Poster details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Your Name</Label>
              <Input
                type="text"
                placeholder="e.g. Riya S."
                value={form.poster_name}
                onChange={(e) => set("poster_name", e.target.value)}
              />
              {errors.poster_name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.poster_name}
                </p>
              )}
            </div>
            <div>
              <Label required>WhatsApp Number</Label>
              <Input
                type="tel"
                placeholder="10-digit number"
                value={form.poster_phone}
                maxLength={10}
                onChange={(e) => set("poster_phone", e.target.value)}
              />
              {errors.poster_phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.poster_phone}
                </p>
              )}
            </div>
          </div>

          {/* Submit error */}
          {errors.submit && (
            <p className="text-sm text-red-500 text-center">{errors.submit}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 active:scale-95 transition-all text-white font-semibold py-3 rounded-xl shadow text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            {loading ? "Posting..." : "Post Vacancy"}
          </button>
        </div>
      </div>
    </div>
  );
}
